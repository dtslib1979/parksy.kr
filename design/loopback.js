// PARKSY Loopback Services — YouTube가 못 해주는 것
// BGM Player + KR Merit Quiz + Prompt Viewer + Webtoon Viewer
(function() {
  'use strict';

  // ── KR Merit Quiz Data ──────────────────────────────────────
  var KR_MERIT = {
    'bluff-liberal-arts': {
      label: '허세교양',
      en: 'Bluff Liberal Arts',
      desc: 'Korean culture of performing educated — do you have it?',
      color: '#ff6b35',
      questions: [
        { q: 'You cite a philosopher you\'ve never fully read, but the name sounds impressive.', a: true },
        { q: 'You explain a complex topic using jargon you learned 10 minutes ago.', a: true },
        { q: 'You admit you don\'t know something rather than improvise.', a: false },
        { q: 'You recommend a book you skimmed the Wikipedia summary of.', a: true },
        { q: 'You use English words mid-sentence to sound more global.', a: true }
      ]
    },
    'halfblood-language': {
      label: '하프블러드 어학',
      en: 'Half-blood Language',
      desc: 'You understand Korean — but only halfway. Which half is yours?',
      color: '#6baaff',
      questions: [
        { q: 'You understand what\'s being said but can\'t respond in Korean.', a: true },
        { q: 'You read Hangul aloud perfectly but have no idea what it means.', a: true },
        { q: 'You laugh at Korean jokes 3 seconds after everyone else.', a: true },
        { q: 'You translate Korean memes literally and wonder why they\'re funny.', a: true },
        { q: 'You fluently switch between Korean and your native language mid-sentence.', a: false }
      ]
    },
    'edit-obsession': {
      label: '편집평가강박',
      en: 'Edit Obsession',
      desc: 'Korean perfectionism — how deep does your edit obsession go?',
      color: '#a78bfa',
      questions: [
        { q: 'You re-read your message 3 times before sending it.', a: true },
        { q: 'You notice a typo in your sent message and it ruins your day.', a: true },
        { q: 'You evaluate other people\'s work even when no one asked.', a: true },
        { q: 'You have multiple saved drafts you\'ve never finished.', a: true },
        { q: 'You send things without proofreading. YOLO.', a: false }
      ]
    },
    'democracy-fantasy': {
      label: '민주주의 판타지',
      en: 'Democracy Fantasy',
      desc: 'Korean political discourse reads like a fantasy novel. Can you tell the difference?',
      color: '#34d399',
      questions: [
        { q: 'You believe one election will fix everything.', a: true },
        { q: 'You describe politicians using hero/villain archetypes.', a: true },
        { q: 'You think the people, united, can never be defeated — even by spreadsheets.', a: true },
        { q: 'You cite a candlelight protest as a historical turning point.', a: true },
        { q: 'You evaluate politics through policy details rather than narrative.', a: false }
      ]
    }
  };

  // ── Quiz Engine ──────────────────────────────────────────────
  function initQuiz(container, moduleKey) {
    var mod = KR_MERIT[moduleKey];
    if (!mod || !container) return;

    var state = { index: 0, score: 0 };

    function render() {
      if (state.index >= mod.questions.length) {
        showResult();
        return;
      }
      var q = mod.questions[state.index];
      container.innerHTML =
        '<div class="lb-quiz-progress">' +
          '<div class="lb-quiz-bar" style="width:' + (state.index / mod.questions.length * 100) + '%;background:' + mod.color + '"></div>' +
        '</div>' +
        '<div class="lb-quiz-q">' + (state.index + 1) + '/' + mod.questions.length + ' — ' + q.q + '</div>' +
        '<div class="lb-quiz-btns">' +
          '<button class="lb-quiz-btn" data-ans="true">Yes ✓</button>' +
          '<button class="lb-quiz-btn lb-quiz-btn-no" data-ans="false">No ✗</button>' +
        '</div>';
      container.querySelectorAll('.lb-quiz-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var ans = btn.dataset.ans === 'true';
          if (ans === q.a) state.score++;
          state.index++;
          render();
        });
      });
    }

    function showResult() {
      var pct = Math.round(state.score / mod.questions.length * 100);
      var label = pct >= 80 ? 'Full Korean' : pct >= 60 ? 'Half Korean' : pct >= 40 ? 'K-Adjacent' : 'Foreign Brain';
      container.innerHTML =
        '<div class="lb-quiz-result">' +
          '<div class="lb-quiz-score" style="color:' + mod.color + '">' + pct + '%</div>' +
          '<div class="lb-quiz-verdict">' + label + '</div>' +
          '<div class="lb-quiz-module">' + mod.en + '</div>' +
          '<button class="lb-quiz-retry">Retry</button>' +
        '</div>';
      container.querySelector('.lb-quiz-retry').addEventListener('click', function() {
        state.index = 0; state.score = 0; render();
      });
    }

    render();
  }

  // ── BGM Player ───────────────────────────────────────────────
  function initBGM(container, audioUrl) {
    if (!container) return;
    var audio = null;
    var playing = false;

    function render(state) {
      container.innerHTML =
        '<div class="lb-bgm">' +
          '<button class="lb-bgm-btn" id="lb-bgm-toggle">' +
            (state === 'playing' ? '⏸ Pause BGM' : '▶ Play BGM') +
          '</button>' +
          '<span class="lb-bgm-label">' + (audioUrl ? 'Lyria3 · AI Composed' : 'BGM — Coming Soon') + '</span>' +
        '</div>';
      var btn = container.querySelector('#lb-bgm-toggle');
      if (!audioUrl) { btn.disabled = true; return; }
      btn.addEventListener('click', function() {
        if (!audio) { audio = new Audio(audioUrl); audio.loop = true; }
        if (playing) { audio.pause(); playing = false; render('paused'); }
        else { audio.play(); playing = true; render('playing'); }
      });
    }
    render('paused');
  }

  // ── Webtoon Viewer ───────────────────────────────────────────
  function initWebtoon(container, tistoryUrl) {
    if (!container) return;
    if (!tistoryUrl) {
      container.innerHTML = '<div class="lb-coming"><span>🎨</span><span>Webtoon — Coming Soon</span><span class="lb-coming-sub">Tistory CDN will load here</span></div>';
      return;
    }
    container.innerHTML = '<iframe class="lb-webtoon-frame" src="' + tistoryUrl + '" loading="lazy" title="Webtoon"></iframe>';
  }

  // ── Prompt Viewer ────────────────────────────────────────────
  function initPrompts(container, prompts) {
    if (!container) return;
    if (!prompts || !prompts.length) {
      container.innerHTML = '<div class="lb-coming"><span>🤖</span><span>Prompts — Coming Soon</span><span class="lb-coming-sub">AI prompt chain will be published here</span></div>';
      return;
    }
    var html = '<div class="lb-prompts">';
    prompts.forEach(function(p, i) {
      html += '<div class="lb-prompt-item"><div class="lb-prompt-num">PROMPT ' + (i+1) + '</div><div class="lb-prompt-text">' + p + '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // ── Auto-init ────────────────────────────────────────────────
  window.ParksyLoopback = {
    initQuiz: initQuiz,
    initBGM: initBGM,
    initWebtoon: initWebtoon,
    initPrompts: initPrompts,
    KR_MERIT: KR_MERIT
  };

  // Auto-init elements with data attributes
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-loopback="quiz"]').forEach(function(el) {
      initQuiz(el, el.dataset.module);
    });
    document.querySelectorAll('[data-loopback="bgm"]').forEach(function(el) {
      initBGM(el, el.dataset.url || null);
    });
    document.querySelectorAll('[data-loopback="webtoon"]').forEach(function(el) {
      initWebtoon(el, el.dataset.url || null);
    });
    document.querySelectorAll('[data-loopback="prompts"]').forEach(function(el) {
      var raw = el.dataset.prompts;
      initPrompts(el, raw ? JSON.parse(raw) : null);
    });
  });
})();
