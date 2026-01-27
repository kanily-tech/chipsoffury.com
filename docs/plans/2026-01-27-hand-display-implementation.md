# Hand Display Widget Redesign - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the 2-player hand-display widget with a 6-seat table showing beginner-friendly positions and action history.

**Architecture:** WebC component with child `<seat>` elements. Flat/minimal visual design with rounded rectangle table. CSS uses BEM naming with Tailwind @apply.

**Tech Stack:** WebC, Tailwind CSS, Eleventy

---

## Task 1: Rewrite the hand-display.webc Component

**Files:**
- Modify: `_includes/components/hand-display.webc`

**Step 1: Replace component with new structure**

Replace the entire file with:

```html
<script webc:setup>
// Position display names for beginners
const positionLabels = {
  'sb': 'Small Blind',
  'bb': 'Big Blind',
  'early': 'Early',
  'middle': 'Middle',
  'late': 'Late',
  'dealer': 'Dealer'
};

// Parse seat elements from children
function parseSeats(children) {
  const seats = [];
  const seatOrder = ['sb', 'bb', 'early', 'middle', 'late', 'dealer'];

  // Create a map from the provided children
  const seatMap = {};
  if (children) {
    for (const child of children) {
      if (child.position) {
        seatMap[child.position] = child;
      }
    }
  }

  // Build seats array in fixed order
  for (const pos of seatOrder) {
    const seat = seatMap[pos];
    if (seat) {
      seats.push({
        position: pos,
        label: positionLabels[pos],
        stack: seat.stack || '0',
        cards: seat.cards || null,
        folded: seat.folded !== undefined,
        hero: seat.hero !== undefined
      });
    } else {
      // Empty seat
      seats.push({
        position: pos,
        label: positionLabels[pos],
        stack: '0',
        cards: null,
        folded: true,
        hero: false
      });
    }
  }
  return seats;
}

// Parse board cards
function parseBoard(boardStr) {
  if (!boardStr) return [];
  return boardStr.split(',').map(c => c.trim()).filter(c => c);
}

// Generate card HTML
function cardImg(card, isHoleCard = false) {
  const cls = isHoleCard ? 'hand-display__hole-card' : 'hand-display__board-card';
  if (card === 'back') {
    return `<img src="/images/cards/card_back.png" alt="Hidden" class="${cls}">`;
  }
  return `<img src="/images/cards/${card}.png" alt="${card}" class="${cls}">`;
}
</script>

<div class="hand-display" :class="'hand-display--' + street">
  <div class="hand-display__header">
    <span class="hand-display__street" @text="street.charAt(0).toUpperCase() + street.slice(1)"></span>
    <span class="hand-display__pot">Pot: $<span @text="pot"></span></span>
  </div>

  <div class="hand-display__table">
    <!-- Top row: SB and BB -->
    <div class="hand-display__row hand-display__row--top">
      <script webc:type="js">
      const seats = parseSeats($data.seats);
      const sb = seats.find(s => s.position === 'sb');
      const bb = seats.find(s => s.position === 'bb');

      function renderSeat(seat) {
        const foldedClass = seat.folded ? 'hand-display__seat--folded' : '';
        const heroClass = seat.hero ? 'hand-display__seat--hero' : '';
        const label = seat.hero ? `You (${seat.label})` : seat.label;

        let cardsHtml = '';
        if (seat.folded) {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        } else if (seat.cards === 'hidden') {
          cardsHtml = `<div class="hand-display__hole-cards">${cardImg('back', true)}${cardImg('back', true)}</div>`;
        } else if (seat.cards) {
          const cards = seat.cards.split(',').map(c => c.trim());
          cardsHtml = `<div class="hand-display__hole-cards">${cards.map(c => cardImg(c, true)).join('')}</div>`;
        } else {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        }

        return `
          <div class="hand-display__seat ${foldedClass} ${heroClass}">
            <div class="hand-display__seat-label">${label}</div>
            ${cardsHtml}
            <div class="hand-display__seat-stack">$${seat.stack}</div>
          </div>
        `;
      }

      renderSeat(sb) + renderSeat(bb);
      </script>
    </div>

    <!-- Middle row: Dealer, Board, Early -->
    <div class="hand-display__row hand-display__row--middle">
      <script webc:type="js">
      const seats = parseSeats($data.seats);
      const dealer = seats.find(s => s.position === 'dealer');

      function renderSeat(seat) {
        const foldedClass = seat.folded ? 'hand-display__seat--folded' : '';
        const heroClass = seat.hero ? 'hand-display__seat--hero' : '';
        const label = seat.hero ? `You (${seat.label})` : seat.label;

        let cardsHtml = '';
        if (seat.folded) {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        } else if (seat.cards === 'hidden') {
          cardsHtml = `<div class="hand-display__hole-cards">${cardImg('back', true)}${cardImg('back', true)}</div>`;
        } else if (seat.cards) {
          const cards = seat.cards.split(',').map(c => c.trim());
          cardsHtml = `<div class="hand-display__hole-cards">${cards.map(c => cardImg(c, true)).join('')}</div>`;
        } else {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        }

        return `
          <div class="hand-display__seat ${foldedClass} ${heroClass}">
            <div class="hand-display__seat-label">${label}</div>
            ${cardsHtml}
            <div class="hand-display__seat-stack">$${seat.stack}</div>
          </div>
        `;
      }

      renderSeat(dealer);
      </script>

      <!-- Board in center -->
      <div class="hand-display__board">
        <script webc:type="js">
        const boardCards = parseBoard(board);
        let html = '';

        // Flop (3 cards)
        html += '<div class="hand-display__board-group">';
        for (let i = 0; i < 3; i++) {
          if (boardCards[i]) {
            html += `<div class="hand-display__slot hand-display__slot--filled">${cardImg(boardCards[i])}</div>`;
          } else {
            html += '<div class="hand-display__slot hand-display__slot--empty"></div>';
          }
        }
        html += '</div>';

        // Turn
        html += '<div class="hand-display__board-group">';
        if (boardCards[3]) {
          html += `<div class="hand-display__slot hand-display__slot--filled">${cardImg(boardCards[3])}</div>`;
        } else {
          html += '<div class="hand-display__slot hand-display__slot--empty"></div>';
        }
        html += '</div>';

        // River
        html += '<div class="hand-display__board-group">';
        if (boardCards[4]) {
          html += `<div class="hand-display__slot hand-display__slot--filled">${cardImg(boardCards[4])}</div>`;
        } else {
          html += '<div class="hand-display__slot hand-display__slot--empty"></div>';
        }
        html += '</div>';

        html;
        </script>
      </div>

      <script webc:type="js">
      const seats = parseSeats($data.seats);
      const early = seats.find(s => s.position === 'early');

      function renderSeat(seat) {
        const foldedClass = seat.folded ? 'hand-display__seat--folded' : '';
        const heroClass = seat.hero ? 'hand-display__seat--hero' : '';
        const label = seat.hero ? `You (${seat.label})` : seat.label;

        let cardsHtml = '';
        if (seat.folded) {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        } else if (seat.cards === 'hidden') {
          cardsHtml = `<div class="hand-display__hole-cards">${cardImg('back', true)}${cardImg('back', true)}</div>`;
        } else if (seat.cards) {
          const cards = seat.cards.split(',').map(c => c.trim());
          cardsHtml = `<div class="hand-display__hole-cards">${cards.map(c => cardImg(c, true)).join('')}</div>`;
        } else {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        }

        return `
          <div class="hand-display__seat ${foldedClass} ${heroClass}">
            <div class="hand-display__seat-label">${label}</div>
            ${cardsHtml}
            <div class="hand-display__seat-stack">$${seat.stack}</div>
          </div>
        `;
      }

      renderSeat(early);
      </script>
    </div>

    <!-- Bottom row: Late and Middle -->
    <div class="hand-display__row hand-display__row--bottom">
      <script webc:type="js">
      const seats = parseSeats($data.seats);
      const late = seats.find(s => s.position === 'late');
      const middle = seats.find(s => s.position === 'middle');

      function renderSeat(seat) {
        const foldedClass = seat.folded ? 'hand-display__seat--folded' : '';
        const heroClass = seat.hero ? 'hand-display__seat--hero' : '';
        const label = seat.hero ? `You (${seat.label})` : seat.label;

        let cardsHtml = '';
        if (seat.folded) {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        } else if (seat.cards === 'hidden') {
          cardsHtml = `<div class="hand-display__hole-cards">${cardImg('back', true)}${cardImg('back', true)}</div>`;
        } else if (seat.cards) {
          const cards = seat.cards.split(',').map(c => c.trim());
          cardsHtml = `<div class="hand-display__hole-cards">${cards.map(c => cardImg(c, true)).join('')}</div>`;
        } else {
          cardsHtml = '<div class="hand-display__hole-cards hand-display__hole-cards--empty"></div>';
        }

        return `
          <div class="hand-display__seat ${foldedClass} ${heroClass}">
            <div class="hand-display__seat-label">${label}</div>
            ${cardsHtml}
            <div class="hand-display__seat-stack">$${seat.stack}</div>
          </div>
        `;
      }

      renderSeat(late) + renderSeat(middle);
      </script>
    </div>
  </div>

  <!-- Action log -->
  <div class="hand-display__actions" webc:if="actions">
    <span @text="actions"></span>
  </div>
</div>
```

**Step 2: Run the build to verify component compiles**

Run: `npm run build 2>&1 | head -50`
Expected: Build completes or shows specific errors to fix

**Step 3: Commit the component**

```bash
git add _includes/components/hand-display.webc
git commit -m "feat(hand-display): rewrite component for 6-seat table layout

- Add support for child <seat> elements
- Add beginner-friendly position labels
- Add action log display
- Restructure layout for 6-seat poker table"
```

---

## Task 2: Update CSS Styles

**Files:**
- Modify: `css/tailwind-full.css` (lines 1305-1470)

**Step 1: Replace hand-display styles**

Find the existing `.hand-display` section (starts around line 1308) and replace it entirely with:

```css
/* ===========================================
   Hand Display Component
   Clean, minimal 6-seat poker table
   =========================================== */

.hand-display {
  @apply rounded-2xl overflow-hidden my-6;
  background: #0f1419;
  max-width: 600px;
}

.hand-display__header {
  @apply flex justify-between items-center px-4 py-2.5;
  background: #1a2028;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hand-display__street {
  @apply text-xs font-bold uppercase tracking-widest;
  color: #6b7280;
  letter-spacing: 0.12em;
}

.hand-display__pot {
  @apply text-sm font-semibold px-3 py-1 rounded;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

/* ===== Table Area ===== */
.hand-display__table {
  @apply p-4;
  background: #1a4d32;
}

.hand-display__row {
  @apply flex justify-center items-center;
}

.hand-display__row--top {
  @apply justify-center gap-16 mb-3;
}

.hand-display__row--middle {
  @apply justify-between items-center px-2 mb-3;
}

.hand-display__row--bottom {
  @apply justify-center gap-16 mt-3;
}

/* ===== Seats ===== */
.hand-display__seat {
  @apply flex flex-col items-center;
  min-width: 70px;
}

.hand-display__seat--folded {
  @apply opacity-40;
}

.hand-display__seat--hero .hand-display__seat-label {
  color: #fbbf24;
  font-weight: 600;
}

.hand-display__seat-label {
  @apply text-xs font-medium mb-1.5;
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  text-align: center;
  white-space: nowrap;
}

.hand-display__hole-cards {
  @apply flex gap-0.5 mb-1.5;
  min-height: 42px;
}

.hand-display__hole-cards--empty {
  @apply opacity-0;
}

.hand-display__hole-card {
  width: 28px;
  height: auto;
  @apply rounded;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.hand-display__seat-stack {
  @apply text-xs font-medium px-2 py-0.5 rounded;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  font-variant-numeric: tabular-nums;
  font-size: 10px;
}

/* ===== Board ===== */
.hand-display__board {
  @apply flex justify-center items-center gap-1;
}

.hand-display__board-group {
  @apply flex gap-0.5;
}

.hand-display__slot {
  width: 36px;
  height: 50px;
  @apply rounded flex items-center justify-center;
}

.hand-display__slot--empty {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.1);
}

.hand-display__slot--filled {
  border: none;
  background: transparent;
}

.hand-display__board-card {
  width: 36px;
  height: auto;
  @apply rounded;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* ===== Action Log ===== */
.hand-display__actions {
  @apply px-4 py-2.5 text-xs;
  background: #141a21;
  color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  line-height: 1.5;
}

/* ===== Street Colors ===== */
.hand-display--preflop .hand-display__street { color: #60a5fa; }
.hand-display--flop .hand-display__street { color: #34d399; }
.hand-display--turn .hand-display__street { color: #fbbf24; }
.hand-display--river .hand-display__street { color: #f87171; }

/* ===== Responsive ===== */
@media (min-width: 480px) {
  .hand-display {
    max-width: 640px;
  }

  .hand-display__table {
    @apply p-6;
  }

  .hand-display__row--top,
  .hand-display__row--bottom {
    @apply gap-24;
  }

  .hand-display__seat {
    min-width: 80px;
  }

  .hand-display__seat-label {
    font-size: 11px;
  }

  .hand-display__hole-card {
    width: 34px;
  }

  .hand-display__slot {
    width: 44px;
    height: 62px;
  }

  .hand-display__board-card {
    width: 44px;
  }

  .hand-display__seat-stack {
    font-size: 11px;
  }
}
```

**Step 2: Run build to verify CSS compiles**

Run: `npm run build 2>&1 | head -30`
Expected: Build completes without CSS errors

**Step 3: Commit the styles**

```bash
git add css/tailwind-full.css
git commit -m "style(hand-display): update CSS for 6-seat table layout

- Flat minimal design, no felt texture
- Compact seats with smaller cards
- Action log styling
- Responsive breakpoints"
```

---

## Task 3: Update Hand 1 in Blog Post

**Files:**
- Modify: `posts/0016-beginner-poker-strategy-how-to-win.md`

**Step 1: Update all Hand 1 widgets (lines 572, 578, 584, 590)**

Replace the Hand 1 widgets with the new format. For each widget, we need to specify all 6 seats.

**Preflop (line 572):**
```html
<div>{% renderTemplate "webc" %}
<hand-display street="preflop" pot="3" board="" actions="Small Blind $1 → Big Blind $2 → Middle calls $2">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" stack="200" folded></seat>
  <seat position="middle" cards="hidden" stack="200"></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="as,ah" stack="200" hero></seat>
</hand-display>
{% endrenderTemplate %}</div>
```

**Flop (line 578):**
```html
<div>{% renderTemplate "webc" %}
<hand-display street="flop" pot="19" board="kd,7c,2s" actions="You raise $8 → Middle calls $8">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" stack="200" folded></seat>
  <seat position="middle" cards="hidden" stack="192"></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="as,ah" stack="192" hero></seat>
</hand-display>
{% endrenderTemplate %}</div>
```

**Turn (line 584):**
```html
<div>{% renderTemplate "webc" %}
<hand-display street="turn" pot="43" board="kd,7c,2s,5h" actions="You bet $12 → Middle calls">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" stack="200" folded></seat>
  <seat position="middle" cards="hidden" stack="180"></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="as,ah" stack="180" hero></seat>
</hand-display>
{% endrenderTemplate %}</div>
```

**River (line 590):**
```html
<div>{% renderTemplate "webc" %}
<hand-display street="river" pot="99" board="kd,7c,2s,5h,3d" actions="You bet $28 → Middle calls">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" stack="200" folded></seat>
  <seat position="middle" cards="ks,js" stack="152"></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="as,ah" stack="152" hero></seat>
</hand-display>
{% endrenderTemplate %}</div>
```

**Step 2: Run build and verify**

Run: `npm run build && npm start`
Expected: Site builds and Hand 1 displays correctly

**Step 3: Commit**

```bash
git add posts/0016-beginner-poker-strategy-how-to-win.md
git commit -m "content: update Hand 1 to use new 6-seat hand-display format"
```

---

## Task 4: Update Hand 2 in Blog Post

**Files:**
- Modify: `posts/0016-beginner-poker-strategy-how-to-win.md`

**Step 1: Update all Hand 2 widgets (lines 610, 616-628, 634-646, 656-668)**

Note: Hand 2 is a 3-way pot initially (EP raiser, one caller, hero on button). After flop bet, caller folds.

**Flop initial (line 610):**
```html
<div>{% renderTemplate "webc" %}
<hand-display street="flop" pot="21" board="ks,5s,2c" actions="Early raises $6 → Middle calls $6 → You call $6">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" cards="hidden" stack="174"></seat>
  <seat position="middle" cards="hidden" stack="174"></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="9s,8s" stack="174" hero></seat>
</hand-display>
{% endrenderTemplate %}</div>
```

**Flop after bet (lines 616-628):**
```html
{% renderTemplate "webc" %}
<hand-display street="flop" pot="35" board="ks,5s,2c" actions="Early bets $14 → Middle folds">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" cards="hidden" stack="160"></seat>
  <seat position="middle" stack="174" folded></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="9s,8s" stack="174" hero></seat>
</hand-display>
{% endrenderTemplate %}
```

**Turn (lines 634-646):**
```html
{% renderTemplate "webc" %}
<hand-display street="turn" pot="49" board="ks,5s,2c,4s" actions="You call $14">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" cards="hidden" stack="160"></seat>
  <seat position="middle" stack="174" folded></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="9s,8s" stack="160" hero></seat>
</hand-display>
{% endrenderTemplate %}
```

**River (lines 656-668):**
```html
{% renderTemplate "webc" %}
<hand-display street="river" pot="99" board="ks,5s,2c,4s,jd" actions="You bet $25 → Early calls">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" cards="kd,qd" stack="135"></seat>
  <seat position="middle" stack="174" folded></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="9s,8s" stack="135" hero></seat>
</hand-display>
{% endrenderTemplate %}
```

**Step 2: Run build and verify**

Run: `npm run build`
Expected: Site builds and Hand 2 displays correctly

**Step 3: Commit**

```bash
git add posts/0016-beginner-poker-strategy-how-to-win.md
git commit -m "content: update Hand 2 to use new 6-seat hand-display format"
```

---

## Task 5: Update Hand 3 in Blog Post

**Files:**
- Modify: `posts/0016-beginner-poker-strategy-how-to-win.md`

**Step 1: Update all Hand 3 widgets (lines 688-700, 710-722, 732-744)**

Note: Hand 3 hero is in "late" position (cutoff), villain in "early".

**Flop (lines 688-700):**
```html
{% renderTemplate "webc" %}
<hand-display street="flop" pot="15" board="qd,7c,3h" actions="Early raises $6 → You call $6">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" cards="hidden" stack="194"></seat>
  <seat position="middle" stack="200" folded></seat>
  <seat position="late" cards="qs,js" stack="194" hero></seat>
  <seat position="dealer" stack="200" folded></seat>
</hand-display>
{% endrenderTemplate %}
```

**Turn (lines 710-722):**
```html
{% renderTemplate "webc" %}
<hand-display street="turn" pot="35" board="qd,7c,3h,9s" actions="Early bets $10 → You call $10">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" cards="hidden" stack="184"></seat>
  <seat position="middle" stack="200" folded></seat>
  <seat position="late" cards="qs,js" stack="184" hero></seat>
  <seat position="dealer" stack="200" folded></seat>
</hand-display>
{% endrenderTemplate %}
```

**River (lines 732-744):**
```html
{% renderTemplate "webc" %}
<hand-display street="river" pot="85" board="qd,7c,3h,9s,2d" actions="Early bets $25 → You call $25">
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" cards="hidden" stack="159"></seat>
  <seat position="middle" stack="200" folded></seat>
  <seat position="late" cards="qs,js" stack="159" hero></seat>
  <seat position="dealer" stack="200" folded></seat>
</hand-display>
{% endrenderTemplate %}
```

**Step 2: Run build and verify**

Run: `npm run build`
Expected: Site builds and Hand 3 displays correctly

**Step 3: Commit**

```bash
git add posts/0016-beginner-poker-strategy-how-to-win.md
git commit -m "content: update Hand 3 to use new 6-seat hand-display format"
```

---

## Task 6: Visual QA and Final Adjustments

**Step 1: Start dev server and visually inspect**

Run: `npm start`

Check each hand display for:
- All 6 seats visible with correct positions
- Hero seat highlighted in gold
- Folded seats greyed out
- Cards displaying correctly
- Action log readable
- Responsive behavior on narrow viewport

**Step 2: Fix any visual issues**

Adjust CSS values in `css/tailwind-full.css` as needed for spacing, sizing, colors.

**Step 3: Final commit**

```bash
git add -A
git commit -m "fix(hand-display): visual polish and adjustments"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Rewrite hand-display.webc component |
| 2 | Update CSS styles |
| 3 | Update Hand 1 widgets |
| 4 | Update Hand 2 widgets |
| 5 | Update Hand 3 widgets |
| 6 | Visual QA and polish |
