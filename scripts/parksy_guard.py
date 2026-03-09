#!/usr/bin/env python3
"""
parksy.kr Publisher Platform Guard v2.0
미디어 파이프라인 플랫폼을 위한 새로운 구조 검증
"""

import os
import sys
from pathlib import Path

# === 설정 ===

ROOT_WHITELIST = {
    # 기존 필수 파일
    "index.html",
    "README.md",
    "CLAUDE.md",
    "CNAME",
    ".nojekyll",
    ".gitignore",
    "favicon.ico",
    "favicon.svg",
    "robots.txt",
    "sitemap.xml",
    "feed.xml",
    # 바로가기 설치용 (SW 없음, standalone 전용)
    "manifest.json",
    "manifest.webmanifest",
    # 아키텍처/팩토리 문서
    "FACTORY.json",
    "ARCHITECTURE.md",
    # 이미지 에셋
    "Parksy.kr.png",
}

ALLOWED_DIRS = {
    # 기존 디렉토리
    "assets",
    "archive",
    "category",
    "docs",
    "backup",
    "scripts",
    ".github",
    # Publisher Platform 신규 디렉토리
    "platform",      # 플랫폼 코드 (Console + Frontend)
    "data",          # Repository as Database
    "api",           # 정적 API 엔드포인트
    # 운영 디렉토리
    "00_TRUTH",      # 진실 선언
    "commands",      # CLI 명령 모음
    "design",        # 디자인 에셋
    "inbox",         # 인박스
    "pipelines",     # 파이프라인 정의
    "po",            # 발주/PO
    "process",       # 프로세스 문서
    "specs",         # 명세서
    "output",        # 출력물
}

# 여전히 금지되는 항목들
FORBIDDEN_DIRS = {
    "__pycache__",
    "node_modules",
    ".cache",
    ".venv",
    "venv",
}

FORBIDDEN_FILES = {
    ".env",              # 비밀 정보
    ".env.local",
    "credentials.json",
}

# === 검사 함수 ===

def check_root_whitelist(root: Path) -> list[str]:
    """루트 화이트리스트 검사"""
    errors = []
    for item in root.iterdir():
        name = item.name
        if item.is_file():
            if name not in ROOT_WHITELIST:
                errors.append(f"❌ 루트 화이트리스트 위반: {name}")
        elif item.is_dir():
            if name not in ALLOWED_DIRS and not name.startswith("."):
                errors.append(f"❌ 허용되지 않은 루트 폴더: {name}/")
    return errors


def check_forbidden_dirs(root: Path) -> list[str]:
    """금지된 디렉토리 검사 (재귀)"""
    errors = []
    for dname in FORBIDDEN_DIRS:
        found = list(root.rglob(dname))
        for d in found:
            if d.is_dir():
                errors.append(f"❌ 금지 디렉토리: {d.relative_to(root)}/")
    return errors


def check_forbidden_files(root: Path) -> list[str]:
    """금지된 파일 검사 (비밀 정보 등)"""
    errors = []
    for fname in FORBIDDEN_FILES:
        found = list(root.rglob(fname))
        for f in found:
            if f.is_file():
                errors.append(f"❌ 금지 파일 (보안): {f.relative_to(root)}")
    return errors


def check_pyc_files(root: Path) -> list[str]:
    """*.pyc 파일 검사"""
    errors = []
    for f in root.rglob("*.pyc"):
        errors.append(f"❌ .pyc 파일 발견: {f.relative_to(root)}")
    return errors


def check_data_structure(root: Path) -> list[str]:
    """data/ 디렉토리 구조 검증"""
    errors = []
    data_dir = root / "data"

    if not data_dir.exists():
        return []  # data/ 없으면 패스 (아직 생성 전)

    required_subdirs = {"publications", "youtube", "spotify", "series", "config"}

    for subdir in required_subdirs:
        subpath = data_dir / subdir
        if not subpath.exists():
            # 경고만 (필수는 아님)
            pass

    # JSON 파일 유효성은 별도 검사
    return errors


def check_space_in_filename(root: Path) -> list[str]:
    """루트 레벨에서만 공백 포함 파일명 검사 (기존 콘텐츠는 허용)"""
    errors = []
    for item in root.iterdir():
        if " " in item.name:
            errors.append(f"❌ 공백 포함 파일명: {item.name}")
    return errors


# === 메인 ===

def main():
    root = Path(".")
    all_errors = []

    print("=" * 60)
    print("🛡️  parksy.kr Publisher Platform Guard v2.0")
    print("=" * 60)
    print()

    # 1. 루트 화이트리스트
    print("[1/5] 루트 화이트리스트 검사...")
    errs = check_root_whitelist(root)
    all_errors.extend(errs)
    print(f"      {'✅ PASS' if not errs else f'❌ {len(errs)} 위반'}")

    # 2. 금지 디렉토리
    print("[2/5] 금지 디렉토리 검사...")
    errs = check_forbidden_dirs(root)
    all_errors.extend(errs)
    print(f"      {'✅ PASS' if not errs else f'❌ {len(errs)} 위반'}")

    # 3. 금지 파일 (보안)
    print("[3/5] 보안 파일 검사...")
    errs = check_forbidden_files(root)
    all_errors.extend(errs)
    print(f"      {'✅ PASS' if not errs else f'❌ {len(errs)} 위반'}")

    # 4. .pyc 파일
    print("[4/5] .pyc 파일 검사...")
    errs = check_pyc_files(root)
    all_errors.extend(errs)
    print(f"      {'✅ PASS' if not errs else f'❌ {len(errs)} 위반'}")

    # 5. 공백 파일명
    print("[5/5] 공백 파일명 검사...")
    errs = check_space_in_filename(root)
    all_errors.extend(errs)
    print(f"      {'✅ PASS' if not errs else f'❌ {len(errs)} 위반'}")

    print()
    print("=" * 60)

    if all_errors:
        print("❌ FAILED - 위반 사항:")
        print()
        for e in all_errors:
            print(f"  {e}")
        print()
        print("위 항목들을 정리한 후 다시 실행하세요.")
        print("=" * 60)
        sys.exit(1)
    else:
        print("✅ ALL PASSED - Publisher Platform 규칙 준수")
        print("=" * 60)
        sys.exit(0)


if __name__ == "__main__":
    main()
