#!/usr/bin/env python3
"""
PARKSY.KR YouTube Multi-Channel Sync
api/v1/youtube.json의 5개 채널을 일괄 동기화

사용법:
    python scripts/youtube_sync.py [--api-key YOUR_KEY] [--max-results 50] [--dry-run]

환경 변수:
    YOUTUBE_API_KEY: YouTube Data API v3 키 (필수)
"""

import os
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError

REPO_ROOT = Path(__file__).parent.parent
API_DIR = REPO_ROOT / "api" / "v1"
DATA_DIR = REPO_ROOT / "data" / "youtube"
YOUTUBE_JSON = API_DIR / "youtube.json"
YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"


def fetch_channel_stats(channel_id: str, api_key: str) -> dict:
    """구독자 수 + uploads playlist ID"""
    url = (
        f"{YOUTUBE_API_BASE}/channels?"
        f"part=statistics,contentDetails&id={channel_id}&key={api_key}"
    )
    try:
        req = Request(url, headers={"User-Agent": "PARKSY-Sync/3.0"})
        with urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        if not data.get("items"):
            return {}
        item = data["items"][0]
        return {
            "subscribers": int(item.get("statistics", {}).get("subscriberCount", 0)),
            "videoCount": int(item.get("statistics", {}).get("videoCount", 0)),
            "uploadsPlaylist": item.get("contentDetails", {})
                                   .get("relatedPlaylists", {})
                                   .get("uploads")
        }
    except (HTTPError, URLError) as e:
        print(f"  [ERROR] stats 실패: {e}")
        return {}


def fetch_recent_videos(playlist_id: str, api_key: str, max_results: int = 20) -> list:
    """업로드 플레이리스트에서 최신 영상 가져오기"""
    url = (
        f"{YOUTUBE_API_BASE}/playlistItems?"
        f"part=snippet,contentDetails&maxResults={max_results}"
        f"&playlistId={playlist_id}&key={api_key}"
    )
    videos = []
    try:
        req = Request(url, headers={"User-Agent": "PARKSY-Sync/3.0"})
        with urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        for item in data.get("items", []):
            s = item.get("snippet", {})
            video_id = s.get("resourceId", {}).get("videoId")
            if not video_id:
                continue
            videos.append({
                "videoId": video_id,
                "title": s.get("title", ""),
                "description": s.get("description", "")[:300],
                "publishedAt": s.get("publishedAt"),
                "thumbnails": {
                    "default": s.get("thumbnails", {}).get("default", {}).get("url"),
                    "medium": s.get("thumbnails", {}).get("medium", {}).get("url"),
                    "high": s.get("thumbnails", {}).get("high", {}).get("url"),
                },
                "syncedAt": datetime.utcnow().isoformat() + "Z"
            })
    except (HTTPError, URLError) as e:
        print(f"  [ERROR] 영상 목록 실패: {e}")
    return videos


def sync_channel(channel_key: str, channel_data: dict, api_key: str, max_results: int, dry_run: bool) -> dict:
    """채널 하나 동기화, 업데이트된 channel_data 반환"""
    channel_id = channel_data.get("channelId")
    persona = channel_data.get("persona", channel_key)

    if not channel_id:
        print(f"  [SKIP] {persona} — channelId 없음 (YouTube Studio에서 입력 필요)")
        return channel_data

    print(f"  [{persona}] channelId={channel_id}")

    stats = fetch_channel_stats(channel_id, api_key)
    if not stats:
        print(f"  [WARN] {persona} stats 조회 실패")
        return channel_data

    subscribers = stats.get("subscribers", channel_data.get("subscribers", 0))
    print(f"    구독자: {subscribers:,}  영상수: {stats.get('videoCount', 0)}")

    videos = []
    if stats.get("uploadsPlaylist"):
        videos = fetch_recent_videos(stats["uploadsPlaylist"], api_key, max_results)
        print(f"    최신 영상 {len(videos)}개 가져옴")

    if dry_run:
        print(f"    [DRY-RUN] 저장 건너뜀")
        return channel_data

    updated = dict(channel_data)
    updated["subscribers"] = subscribers
    updated["videoCount"] = stats.get("videoCount", 0)
    updated["videos"] = videos
    updated["lastSynced"] = datetime.utcnow().isoformat() + "Z"

    # 채널별 상세 데이터를 data/youtube/{channel_key}.json 에도 저장
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    channel_file = DATA_DIR / f"{channel_key}.json"
    with open(channel_file, "w", encoding="utf-8") as f:
        json.dump({
            "channel": channel_key,
            "persona": persona,
            "channelId": channel_id,
            "subscribers": subscribers,
            "videoCount": stats.get("videoCount", 0),
            "lastSynced": updated["lastSynced"],
            "videos": videos
        }, f, indent=2, ensure_ascii=False)

    return updated


def main():
    parser = argparse.ArgumentParser(description="PARKSY YouTube 5채널 일괄 동기화")
    parser.add_argument("--api-key", help="YouTube API 키 (또는 YOUTUBE_API_KEY 환경변수)")
    parser.add_argument("--max-results", type=int, default=20, help="채널당 최대 영상 수")
    parser.add_argument("--dry-run", action="store_true", help="실제 저장 없이 테스트")
    parser.add_argument("--channel", help="특정 채널만 동기화 (예: musician)")
    args = parser.parse_args()

    api_key = args.api_key or os.environ.get("YOUTUBE_API_KEY")
    if not api_key:
        print("[ERROR] YOUTUBE_API_KEY 필요")
        sys.exit(1)

    if not YOUTUBE_JSON.exists():
        print(f"[ERROR] {YOUTUBE_JSON} 없음")
        sys.exit(1)

    with open(YOUTUBE_JSON, "r", encoding="utf-8") as f:
        youtube_data = json.load(f)

    channels = youtube_data.get("channels", {})
    if not channels:
        print("[ERROR] channels 없음")
        sys.exit(1)

    print("=" * 60)
    print("PARKSY YouTube Multi-Channel Sync")
    print("=" * 60)
    print(f"대상: {list(channels.keys())}")
    print(f"채널당 최대: {args.max_results}개 영상")
    if args.dry_run:
        print("[DRY-RUN 모드]")
    print()

    synced = 0
    skipped = 0

    for key, ch_data in channels.items():
        if args.channel and key != args.channel:
            continue
        updated_ch = sync_channel(key, ch_data, api_key, args.max_results, args.dry_run)
        channels[key] = updated_ch
        if updated_ch.get("lastSynced"):
            synced += 1
        else:
            skipped += 1

    if not args.dry_run:
        youtube_data["channels"] = channels
        youtube_data["meta"]["generatedAt"] = datetime.utcnow().isoformat() + "Z"
        youtube_data["meta"]["verifiedAt"] = datetime.utcnow().strftime("%Y-%m-%d")

        with open(YOUTUBE_JSON, "w", encoding="utf-8") as f:
            json.dump(youtube_data, f, indent=2, ensure_ascii=False)
        print(f"\n[OK] api/v1/youtube.json 업데이트 완료")

    print()
    print("=" * 60)
    print(f"완료 — 동기화: {synced}개, 건너뜀: {skipped}개")
    print("=" * 60)


if __name__ == "__main__":
    main()
