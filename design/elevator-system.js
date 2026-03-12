/**
 * ═══════════════════════════════════════════════════════════════
 * ELEVATOR SYSTEM - Broadcasting Station Navigation
 * Vertical floor navigation with elevator panel mechanics
 * ═══════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // Configuration
  // ─────────────────────────────────────────────────────────────
  const FLOORS = {
    lobby: { level: '1F', name: 'Lobby', locked: false },
    channels: { level: 'B1', name: 'Channels', locked: false },
    studio: { level: 'B2', name: 'Studio', locked: false },
    console: { level: 'B3', name: 'Console', locked: false },
    office: { level: 'B4', name: 'Office', locked: true, code: '1126' }
  };

  const PERSONAS = [
    { id: 'philosopher', name: 'Philosopher', icon: '🤔' },
    { id: 'blogger', name: 'Blogger', icon: '📝' },
    { id: 'visualizer', name: 'Visualizer', icon: '🎨' },
    { id: 'musician', name: 'Musician', icon: '🎵' },
    { id: 'technician', name: 'Technician', icon: '🔧' },
    { id: 'tester', name: 'Tester', icon: '🧪' },
    { id: 'protocol', name: 'Protocol', icon: '📋' },
    { id: 'orbit', name: 'Orbit-Log', icon: '🌌' }
  ];

  const MERITS = [
    { id: 'bluff', name: 'Bluff', desc: 'Bold overstatement' },
    { id: 'halfblood', name: 'Halfblood', desc: 'Borderline view' },
    { id: 'aggro', name: 'Aggro', desc: 'Direct & aggressive' },
    { id: 'shaman', name: 'Shaman', desc: 'Mystical tone' }
  ];

  // ─────────────────────────────────────────────────────────────
  // B1 Schedule — 5 Channels × 25 Programs
  // ─────────────────────────────────────────────────────────────
  const SCHEDULE = [
    {
      ch: '01', id: 'philosopher', name: 'PHILOSOPHER TV', icon: '🤔',
      color: '#7b68ee', href: '/channel/philosopher/',
      programs: [
        { name: 'Commentary Series',  format: 'VIDEO',   merit: '민주주의판타지', desc: 'Deep takes on Korean social phenomena' },
        { name: 'Framing Lab',        format: 'VIDEO',   merit: '편집평가강박',   desc: 'How Korea constructs its worldview' },
        { name: 'Experiment Log',     format: 'TEXT',    merit: '하프블러드',     desc: 'Raw unfiltered thought experiments' },
        { name: 'Systems Thinking',   format: 'VIDEO',   merit: '허세교양',       desc: 'Complex ideas made navigable' },
        { name: 'Concert Notes',      format: 'TEXT',    merit: '민주주의판타지', desc: 'Live thinking in public' }
      ]
    },
    {
      ch: '02', id: 'blogger', name: 'BLOGGER TV', icon: '📝',
      color: '#4ecdc4', href: '/channel/blogger/',
      programs: [
        { name: 'Worldview Essays',   format: 'TEXT',    merit: '하프블러드',     desc: 'Perspectives from between two worlds' },
        { name: 'Daily Narrative',    format: 'TEXT',    merit: '편집평가강박',   desc: 'Obsessive daily documentation' },
        { name: 'Korean Classroom',   format: 'TEXT',    merit: '허세교양',       desc: 'Subjects only Koreans know' },
        { name: 'Half-Blood Letters', format: 'TEXT',    merit: '하프블러드',     desc: 'Code-switching as identity' },
        { name: 'Review Circuit',     format: 'TEXT',    merit: '민주주의판타지', desc: 'Collective taste decoded' }
      ]
    },
    {
      ch: '03', id: 'visualizer', name: 'VISUALIZER TV', icon: '🎨',
      color: '#ff6b35', href: '/channel/visualizer/',
      programs: [
        { name: 'Chalkboard Webtoon', format: 'WEBTOON', merit: '편집평가강박',   desc: 'Tistory-native illustrated series' },
        { name: 'Image Pipeline',     format: 'VIDEO',   merit: '편집평가강박',   desc: 'AI image generation process revealed' },
        { name: 'CAD Sessions',       format: 'VIDEO',   merit: '허세교양',       desc: 'Technical drawing as liberal art' },
        { name: 'Prompt → Visual',    format: 'VIDEO',   merit: '하프블러드',     desc: 'Full prompt chain published' },
        { name: 'Data Portrait',      format: 'VIDEO',   merit: '민주주의판타지', desc: 'Korean society in infographics' }
      ]
    },
    {
      ch: '04', id: 'musician', name: 'MUSICIAN TV', icon: '🎵',
      color: '#f4d35e', href: '/channel/musician/',
      programs: [
        { name: 'BGM Series',         format: 'AUDIO',   merit: '하프블러드',     desc: 'Ambient soundscapes for deep work' },
        { name: 'Lyria3 Studio',      format: 'AUDIO',   merit: '편집평가강박',   desc: 'AI composition workflow' },
        { name: 'Korean Soundscape',  format: 'AUDIO',   merit: '민주주의판타지', desc: 'The sonic identity of Korea' },
        { name: 'AI Playlist',        format: 'AUDIO',   merit: '허세교양',       desc: 'Curated by algorithm, approved by instinct' },
        { name: 'Score Breakdown',    format: 'VIDEO',   merit: '편집평가강박',   desc: 'Anatomy of a track, frame by frame' }
      ]
    },
    {
      ch: '05', id: 'technician', name: 'TECHNICIAN TV', icon: '🔧',
      color: '#95e1d3', href: '/channel/technician/',
      programs: [
        { name: 'Automation Diary',   format: 'VIDEO',   merit: '허세교양',       desc: 'Every pipeline documented live' },
        { name: 'Pipeline Docs',      format: 'TEXT',    merit: '편집평가강박',   desc: 'Technical specs, public by default' },
        { name: 'Behind the Scenes',  format: 'VIDEO',   merit: '하프블러드',     desc: 'The messy truth of solo production' },
        { name: 'Tool Reviews',       format: 'VIDEO',   merit: '허세교양',       desc: 'Only tools actually in use' },
        { name: 'DevLog',             format: 'TEXT',    merit: '민주주의판타지', desc: 'Public dev journal, no polish' }
      ]
    }
  ];

  const STORAGE_KEY = 'parksy-unlocked-floors';

  // ─────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────
  let currentFloor = 'lobby';
  let unlockedFloors = new Set(['lobby', 'channels', 'studio', 'console']);
  let selectedPersona = null;
  let selectedMerit = null;
  let lastOutput = '';

  // ─────────────────────────────────────────────────────────────
  // DOM Elements
  // ─────────────────────────────────────────────────────────────
  const elevatorBtns = document.querySelectorAll('.elevator-btn');
  const floorIndicator = document.querySelector('.current-floor');
  const floorSections = document.querySelectorAll('.floor-section');
  const quickCards = document.querySelectorAll('.quick-card[data-goto]');

  // ─────────────────────────────────────────────────────────────
  // Initialization
  // ─────────────────────────────────────────────────────────────
  function init() {
    loadUnlockedFloors();
    setupElevatorButtons();
    setupQuickAccess();
    setupCarousel();
    setupStudioWorkspace();
    setupOfficeUnlock();
    initSchedule();

    // Check URL hash
    const hash = window.location.hash.replace('#floor-', '');
    if (hash && FLOORS[hash] && (unlockedFloors.has(hash) || !FLOORS[hash].locked)) {
      navigateToFloor(hash);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Floor Unlock Management
  // ─────────────────────────────────────────────────────────────
  function loadUnlockedFloors() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.forEach(f => unlockedFloors.add(f));
      }
    } catch (e) {
      console.warn('Failed to load unlocked floors:', e);
    }
    updateElevatorButtons();
  }

  function saveUnlockedFloors() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedFloors]));
    } catch (e) {
      console.warn('Failed to save unlocked floors:', e);
    }
  }

  function unlockFloor(floorId) {
    unlockedFloors.add(floorId);
    saveUnlockedFloors();
    updateElevatorButtons();
    document.dispatchEvent(new CustomEvent('floorUnlocked', { detail: { floor: floorId } }));
  }

  function updateElevatorButtons() {
    elevatorBtns.forEach(btn => {
      const floorId = btn.dataset.floor;
      const floor = FLOORS[floorId];

      if (floor.locked && !unlockedFloors.has(floorId)) {
        btn.classList.add('locked');
        btn.querySelector('.btn-icon').textContent = '🔒';
      } else {
        btn.classList.remove('locked');
        // Restore original icon
        const icons = { lobby: '🏛️', channels: '📺', studio: '🎬', console: '🖥️', office: '📋' };
        btn.querySelector('.btn-icon').textContent = icons[floorId] || '📋';
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Elevator Navigation
  // ─────────────────────────────────────────────────────────────
  function setupElevatorButtons() {
    elevatorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const floorId = btn.dataset.floor;
        const floor = FLOORS[floorId];

        if (floor.locked && !unlockedFloors.has(floorId)) {
          // Scroll to locked floor to show lock screen
          navigateToFloor(floorId);
        } else {
          navigateToFloor(floorId);
        }
      });
    });
  }

  function navigateToFloor(floorId) {
    if (!FLOORS[floorId]) return;

    currentFloor = floorId;
    const floor = FLOORS[floorId];

    // Update indicator
    if (floorIndicator) {
      floorIndicator.textContent = floor.level;
    }

    // Update elevator buttons
    elevatorBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.floor === floorId);
    });

    // Show/hide floor sections
    floorSections.forEach(section => {
      const sectionId = section.id.replace('floor-', '');
      section.classList.toggle('active', sectionId === floorId);
    });

    // Update URL
    history.pushState(null, '', `#floor-${floorId}`);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─────────────────────────────────────────────────────────────
  // Quick Access Links
  // ─────────────────────────────────────────────────────────────
  function setupQuickAccess() {
    quickCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const goto = card.dataset.goto;
        if (goto && FLOORS[goto]) {
          e.preventDefault();
          navigateToFloor(goto);
        }
      });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // News Carousel
  // ─────────────────────────────────────────────────────────────
  function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 296; // 280px + 16px gap

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Studio Workspace
  // ─────────────────────────────────────────────────────────────
  function setupStudioWorkspace() {
    const personasGrid = document.querySelector('.selector-grid.personas');
    const meritsGrid = document.querySelector('.selector-grid.merits');
    const transformBtn = document.querySelector('.transform-btn');
    const transformInput = document.querySelector('.transform-input');
    const transformOutput = document.querySelector('.transform-output');
    const copyBtn = document.querySelector('[data-action="copy"]');
    const downloadBtn = document.querySelector('[data-action="download"]');
    const launchBtn = document.querySelector('[data-action="open-transform"]');
    const workspace = document.getElementById('transform-workspace');
    const closeBtn = document.querySelector('.workspace-close');

    if (!personasGrid || !meritsGrid) return;

    // Generate persona buttons
    PERSONAS.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'selector-btn';
      btn.dataset.persona = p.id;
      btn.innerHTML = `${p.icon} ${p.name}`;

      btn.addEventListener('click', () => {
        personasGrid.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedPersona = p;
        updateTransformButton();
      });

      personasGrid.appendChild(btn);
    });

    // Generate merit buttons
    MERITS.forEach(m => {
      const btn = document.createElement('button');
      btn.className = 'selector-btn';
      btn.dataset.merit = m.id;
      btn.innerHTML = `${m.name}`;

      btn.addEventListener('click', () => {
        meritsGrid.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMerit = m;
        updateTransformButton();
      });

      meritsGrid.appendChild(btn);
    });

    function updateTransformButton() {
      if (selectedPersona && selectedMerit && transformBtn) {
        transformBtn.disabled = false;
        transformBtn.textContent = `Transform as ${selectedPersona.name} × ${selectedMerit.name}`;
      }
    }

    // Transform button
    if (transformBtn) {
      transformBtn.addEventListener('click', () => {
        if (!selectedPersona || !selectedMerit || !transformInput) return;

        const input = transformInput.value.trim();
        if (!input) {
          transformOutput.innerHTML = '<p class="output-placeholder">Enter text to transform.</p>';
          return;
        }

        const transformed = transformText(input, selectedPersona, selectedMerit);
        lastOutput = transformed;
        transformOutput.innerHTML = `<p>${transformed.replace(/\n/g, '</p><p>')}</p>`;

        if (copyBtn) copyBtn.disabled = false;
        if (downloadBtn) downloadBtn.disabled = false;
      });
    }

    // Copy button
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        if (!lastOutput) return;
        try {
          await navigator.clipboard.writeText(lastOutput);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
        } catch (e) {
          console.error('Copy failed:', e);
        }
      });
    }

    // Download button
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        if (!lastOutput) return;

        const html = generateHTML(lastOutput, selectedPersona, selectedMerit);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `parksy-${selectedPersona.id}-${selectedMerit.id}-${Date.now()}.html`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // Launch workspace button
    if (launchBtn && workspace) {
      launchBtn.addEventListener('click', () => {
        workspace.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function transformText(text, persona, merit) {
    let transformed = text;

    // Persona prefix
    transformed = `[${persona.name}]: "${text}"`;

    // Merit style
    switch (merit.id) {
      case 'bluff':
        transformed = transformed.replace(/\./g, '... obviously.');
        break;
      case 'halfblood':
        transformed = `[From the borderline]\n\n${transformed}\n\n— watching from the edge`;
        break;
      case 'aggro':
        transformed = transformed.toUpperCase().replace(/\./g, '!');
        break;
      case 'shaman':
        transformed = `✦ ${transformed.split('.').join('.\n✦ ')}`;
        break;
    }

    return transformed;
  }

  function generateHTML(content, persona, merit) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${persona.name} × ${merit.name} | PARKSY Broadcasting</title>
  <style>
    body {
      background: #0a0a0a;
      color: #e8e8e8;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.8;
    }
    .meta {
      font-size: 0.8rem;
      color: #f4a261;
      margin-bottom: 2rem;
      font-family: monospace;
    }
    .content { white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="meta">${persona.name} × ${merit.name} | PARKSY Broadcasting</div>
  <div class="content">${content}</div>
</body>
</html>`;
  }

  // ─────────────────────────────────────────────────────────────
  // Office Unlock
  // ─────────────────────────────────────────────────────────────
  function setupOfficeUnlock() {
    const lockInput = document.querySelector('.lock-input');
    const lockSubmit = document.querySelector('.lock-submit');
    const lockScreen = document.getElementById('office-lock');
    const officeContent = document.querySelector('.office-content');
    const officeSection = document.getElementById('floor-office');

    if (!lockInput || !lockSubmit) return;

    // Check if already unlocked
    if (unlockedFloors.has('office')) {
      if (lockScreen) lockScreen.style.display = 'none';
      if (officeContent) officeContent.style.display = 'block';
      if (officeSection) officeSection.classList.remove('locked');
    }

    lockSubmit.addEventListener('click', attemptUnlock);
    lockInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlock();
    });

    function attemptUnlock() {
      const code = lockInput.value.toLowerCase().trim();

      if (code === FLOORS.office.code) {
        unlockFloor('office');

        if (lockScreen) lockScreen.style.display = 'none';
        if (officeContent) officeContent.style.display = 'block';
        if (officeSection) officeSection.classList.remove('locked');
      } else {
        lockInput.classList.add('shake');
        setTimeout(() => lockInput.classList.remove('shake'), 500);
        lockInput.value = '';
        lockInput.placeholder = 'Invalid code';
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  // PO Dispatch System (Flag/Placeholder)
  // ─────────────────────────────────────────────────────────────
  function setupPODispatch() {
    const openPOBtn = document.querySelector('[data-action="open-po"]');
    const poPanel = document.getElementById('po-panel');
    const poTypeBtns = document.querySelectorAll('.po-type-btn');
    const poPriorityBtns = document.querySelectorAll('.po-priority-btn');
    const dispatchBtn = document.querySelector('[data-action="dispatch"]');
    const saveDraftBtn = document.querySelector('[data-action="save-draft"]');

    let selectedType = null;
    let selectedPriority = 'normal';

    if (!poPanel) return;

    // Open PO Panel
    if (openPOBtn) {
      openPOBtn.addEventListener('click', () => {
        poPanel.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Type Selection
    poTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        poTypeBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedType = btn.dataset.type;
        updateDispatchButton();
      });
    });

    // Priority Selection
    poPriorityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        poPriorityBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPriority = btn.dataset.priority;
      });
    });

    function updateDispatchButton() {
      if (dispatchBtn) {
        // For now, keep disabled as system is pending
        // In future: dispatchBtn.disabled = !selectedType;
        dispatchBtn.disabled = true;
      }
    }

    // Save Draft (placeholder)
    if (saveDraftBtn) {
      saveDraftBtn.addEventListener('click', () => {
        const poData = collectPOData();
        console.log('PO Draft:', poData);
        alert('Draft saved locally. Full dispatch requires studio-engine setup.');
      });
    }

    // Dispatch (placeholder)
    if (dispatchBtn) {
      dispatchBtn.addEventListener('click', () => {
        const poData = collectPOData();
        console.log('PO Dispatch Request:', poData);
        alert('Dispatch pending. Connect studio-engine repository to enable.');
      });
    }

    function collectPOData() {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
      const seq = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

      return {
        id: `PO-${dateStr}-${seq}`,
        type: selectedType,
        priority: selectedPriority,
        channel: document.getElementById('po-channel')?.value || 'all',
        status: 'draft',
        created_at: now.toISOString(),
        payload: {
          title: document.getElementById('po-title')?.value || '',
          description: document.getElementById('po-payload')?.value || ''
        },
        target_repo: 'dtslib1979/studio-engine'
      };
    }
  }

  // Initialize PO System
  setupPODispatch();

  // ─────────────────────────────────────────────────────────────
  // B1 Schedule Renderer
  // ─────────────────────────────────────────────────────────────
  function initSchedule() {
    const grid = document.getElementById('sched-grid');
    const empty = document.getElementById('sched-empty');
    if (!grid) return;

    // Render channel blocks from SCHEDULE data
    grid.innerHTML = SCHEDULE.map(ch => `
      <div class="sched-ch-block" data-ch="${ch.ch}" data-open="true"
           style="border-color:${ch.color}22;">
        <div class="sched-ch-hd" style="border-left-color:${ch.color};"
             onclick="window.toggleSchedBlock(this.closest('.sched-ch-block'))">
          <span class="sched-ch-num" style="color:${ch.color};">${ch.ch}</span>
          <div class="sched-ch-meta">
            <span class="sched-ch-name">${ch.name}</span>
            <span class="sched-ch-cnt">${ch.programs.length} programs on air</span>
          </div>
          <span class="sched-ch-icon">${ch.icon}</span>
          <span class="sched-ch-caret">▾</span>
        </div>
        <div class="sched-prog-list">
          ${ch.programs.map(p => `
            <a href="${ch.href}" class="sched-prog-row"
               data-ch="${ch.ch}" data-format="${p.format}" data-merit="${p.merit}">
              <div class="sched-prog-text">
                <span class="sched-prog-name">${p.name}</span>
                <span class="sched-prog-desc">${p.desc}</span>
              </div>
              <div class="sched-badges">
                <span class="sched-fmt sched-fmt-${p.format}">${p.format}</span>
                <span class="sched-merit">${p.merit}</span>
              </div>
              <span class="sched-arrow">→</span>
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Filter state
    const activeFilters = { channel: 'all', format: 'all', merit: 'all' };

    function applyFilters() {
      let totalVisible = 0;

      document.querySelectorAll('.sched-ch-block').forEach(block => {
        const ch = block.dataset.ch;
        const chMatch = activeFilters.channel === 'all' || activeFilters.channel === ch;
        let blockVisible = false;

        block.querySelectorAll('.sched-prog-row').forEach(row => {
          const fmtMatch  = activeFilters.format === 'all' || row.dataset.format === activeFilters.format;
          const meritMatch = activeFilters.merit  === 'all' || row.dataset.merit  === activeFilters.merit;
          const visible = chMatch && fmtMatch && meritMatch;
          row.dataset.hidden = !visible;
          if (visible) { blockVisible = true; totalVisible++; }
        });

        block.dataset.hidden = !blockVisible;
        // Auto-open blocks that have visible programs after filtering
        if (blockVisible && activeFilters.channel !== 'all') {
          block.dataset.open = 'true';
        }
      });

      if (empty) empty.classList.toggle('visible', totalVisible === 0);
    }

    document.querySelectorAll('.sched-fbt').forEach(btn => {
      btn.addEventListener('click', function() {
        const type = this.dataset.filter;
        const val  = this.dataset.val;
        // Toggle active state within group
        document.querySelectorAll(`.sched-fbt[data-filter="${type}"]`)
          .forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeFilters[type] = val;
        applyFilters();
      });
    });
  }

  // Exposed globally for inline onclick on dynamically rendered elements
  window.toggleSchedBlock = function(block) {
    if (!block) return;
    block.dataset.open = block.dataset.open === 'true' ? 'false' : 'true';
  };

  // ─────────────────────────────────────────────────────────────
  // Handle Browser Navigation
  // ─────────────────────────────────────────────────────────────
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#floor-', '');
    if (hash && FLOORS[hash]) {
      navigateToFloor(hash);
    } else {
      navigateToFloor('lobby');
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Run
  // ─────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
