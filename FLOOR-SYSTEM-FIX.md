# Floor System Fix Instructions

> Executor: Termux Claude Code
> Priority: HIGH — must be done before or alongside LANDING-REDESIGN.md

---

## Problem Summary

The current floor system uses **tab-switching** (one floor visible at a time).
This hurts discoverability, SEO, and mobile UX for a landing page.

### What to change

Convert from **tab-based** to **scroll-based stacked floors**.
Keep the elevator panel as a **scroll-to navigation** (jump links).

---

## 1. CSS Changes — `/design/elevator-ui.css`

### Remove tab-switching, enable stacking

Replace:

```css
.floor-section {
  margin-left: 80px;
  min-height: 100vh;
  padding: 2rem;
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.floor-section.active {
  display: block;
  opacity: 1;
}
```

With:

```css
.floor-section {
  margin-left: 80px;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  display: block;
  opacity: 1;
  position: relative;
}
```

Remove the `.floor-section.active` rule entirely (no longer needed).

### Add floor background gradients

Add after the `.floor-section` rule:

```css
/* Floor visual separation — unique backgrounds */
#floor-lobby {
  background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%);
}

#floor-channels {
  background: linear-gradient(180deg, #0f0f0f 0%, #111111 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
}

#floor-studio {
  background: linear-gradient(180deg, #111111 0%, #1a1a1a 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
}

#floor-console {
  background: linear-gradient(180deg, #1a1a1a 0%, #252525 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
}

#floor-office {
  background: linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%);
  border-top: 1px solid rgba(255,107,53,0.1);
}
```

### Mobile: fix the mobile rule

Around line 1461 there is a mobile override for `.floor-section`.
Update it to remove any `display` toggling:

```css
@media (max-width: 768px) {
  .floor-section {
    margin-left: 0;
    padding: 1rem;
    padding-bottom: 80px; /* space for bottom elevator bar */
  }
}
```

### Scroll-reveal animation (optional enhancement)

```css
/* Fade-in on scroll */
.floor-section {
  animation: floorReveal 0.5s ease-out;
}

@keyframes floorReveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 2. JS Changes — `/design/elevator-system.js`

### Fix `navigateToFloor()` — scroll instead of toggle

Replace the current `navigateToFloor` function (lines 143-170):

```javascript
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

  // Scroll to floor section instead of toggling display
  const target = document.getElementById('floor-' + floorId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Update URL
  history.pushState(null, '', `#floor-${floorId}`);
}
```

### Add scroll spy — update elevator indicator on scroll

Add this new function and call it from `init()`:

```javascript
function setupScrollSpy() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const floorId = entry.target.id.replace('floor-', '');
        if (FLOORS[floorId]) {
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
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-10% 0px -60% 0px'
  });

  floorSections.forEach(section => observer.observe(section));
}
```

### Remove Tester from PERSONAS (line 28)

Delete this line:
```javascript
{ id: 'tester', name: 'Tester', icon: '🧪' },
```

### Initialization — show all floors on load

In the `init()` function, remove any code that hides non-active floors.
Instead, make sure all `.floor-section` elements are visible and call `setupScrollSpy()`.

Replace floor initialization logic with:
```javascript
// Show all floors (scroll-based, not tab-based)
floorSections.forEach(section => {
  section.style.display = 'block';
  section.style.opacity = '1';
});

// Set up scroll spy
setupScrollSpy();
```

---

## 3. Delete Dead Code

### `/design/floor-system.css` — DELETE THIS FILE

It is not referenced by `index.html`. It uses different class names (`.floor`, `.entrance`)
that don't match the HTML. It's a competing/older system causing confusion.

```bash
rm /home/user/parksy.kr/design/floor-system.css
```

---

## 4. index.html — Add `.active` to all floor sections

Currently only `#floor-lobby` has class `active`. Since we're switching to scroll-based,
ALL floor sections should be visible. But since we're removing the `.active` toggling from CSS,
this is handled automatically. Just ensure no JS is hiding them on load.

For the Office floor (B4), it should still be visible but show the lock screen by default.
The lock/unlock logic should remain — just don't hide the entire floor section.

---

## DO NOT CHANGE

- Elevator panel visual design
- Office unlock mechanism (code: "parksy")
- B2 Studio engines / PO Dispatch
- Link URLs
- Channel order

---

## Execution Order

1. Fix `elevator-ui.css` (remove tab-switching, add gradients)
2. Fix `elevator-system.js` (scroll-to + scroll spy + remove Tester)
3. Delete `floor-system.css`
4. Test: all 5 floors visible on scroll, elevator buttons scroll to floor
