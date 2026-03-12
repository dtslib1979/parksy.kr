/**
 * CAVE Particles — Firefly system for PARKSY Broadcasting
 * Adapted from eae-univ Particles v2.0 for CAVE UI theme
 * Flame-colored embers floating in the dark cave
 */
(function() {
  'use strict';

  const CONFIG = {
    particleCount: 30,
    colors: [
      'rgba(255, 107, 53, 0.6)',   // flame-core
      'rgba(247, 147, 30, 0.5)',   // flame-edge
      'rgba(204, 68, 0, 0.4)',     // ember
      'rgba(244, 162, 97, 0.3)',   // broadcast-gold
    ],
    sizeRange: [1.5, 4],
    speedRange: [0.15, 0.4],
    glowRadius: 8,
    fps: 30
  };

  let canvas, ctx, particles = [], animId = null, running = false;
  let lastFrame = 0;
  const frameInterval = 1000 / CONFIG.fps;

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'cave-particles';
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none; z-index: 0;
      opacity: 0; transition: opacity 1.5s ease;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    ctx = canvas.getContext('2d');

    resize();
    createParticles();
    start();

    // Fade in
    requestAnimationFrame(() => { canvas.style.opacity = '1'; });

    // Responsive
    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    // Pause when hidden
    document.addEventListener('visibilitychange', () => {
      document.hidden ? pause() : start();
    });
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticles() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: rand(CONFIG.sizeRange[0], CONFIG.sizeRange[1]),
        vx: rand(-CONFIG.speedRange[1], CONFIG.speedRange[1]),
        vy: rand(-CONFIG.speedRange[1], CONFIG.speedRange[1]),
        color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: rand(0.01, 0.03)
      });
    }
  }

  function animate(ts) {
    if (!running) return;
    animId = requestAnimationFrame(animate);

    if (ts - lastFrame < frameInterval) return;
    lastFrame = ts;

    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      // Wrap around
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // Pulsing opacity
      const alpha = 0.3 + Math.sin(p.pulse) * 0.3;
      const size = p.size * (0.8 + Math.sin(p.pulse) * 0.2);

      // Glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * CONFIG.glowRadius);
      gradient.addColorStop(0, p.color.replace(/[\d.]+\)$/, alpha + ')'));
      gradient.addColorStop(0.4, p.color.replace(/[\d.]+\)$/, (alpha * 0.3) + ')'));
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(p.x, p.y, size * CONFIG.glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(/[\d.]+\)$/, (alpha + 0.2) + ')');
      ctx.fill();
    });
  }

  function start() {
    if (running) return;
    running = true;
    animId = requestAnimationFrame(animate);
  }

  function pause() {
    running = false;
    if (animId) cancelAnimationFrame(animId);
  }

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
