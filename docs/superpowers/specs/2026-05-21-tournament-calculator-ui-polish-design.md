# Tournament Blinds Calculator — UI Polish

**Date:** 2026-05-21
**Scope:** `tools/tournament-blinds-calculator.md`, `css/tournament-blinds-calculator.css`, `js/tournament-blinds-page.js`

## Problem

Three concrete design issues on the calculator page:

1. **Opening stats look like inputs.** `Starting Depth` and `Blind Ratio` are styled as bordered, tinted boxes that nest inside the larger Opening Blinds block, creating "boxes within boxes." They should read as informational hints, not editable fields.
2. **The blind schedule breaks on mobile.** The current 640px breakpoint stacks each `<td>` into its own row, so every level becomes a seven-row vertical block. The result is unreadably tall on phones.
3. **Per-row "Break after" buttons dominate.** Every level row carries a full text pill labeled `Break after`, which visually competes with the actual schedule data — even though adding a break is a secondary action.

## Goals

- Quieter, scannable Game Setup block.
- A schedule that stays compact and readable at every breakpoint.
- A non-shouty affordance for inserting breaks.

## Non-goals

- Changing the underlying solver, calculations, or default break behavior.
- Adding any new fields, options, or persistence.
- Touching anything outside the calculator page.

---

## Fix 1 — Opening stats become hint text

**Markup** (`tools/tournament-blinds-calculator.md`):

Replace the existing `.tb-opening-stats` block plus the `.tb-field-note` paragraph with a single caption line under the Opening Blinds inputs:

```html
<p class="tb-opening-caption" aria-live="polite">
  <span><b>Starting Depth</b> <strong id="tb-start-depth">100 BB</strong></span>
  <span aria-hidden="true">·</span>
  <span><b>Blind Ratio</b> <strong id="tb-blind-ratio">2×</strong></span>
  <span aria-hidden="true">·</span>
  <span class="tb-opening-caption-hint">Prefilled from your stack</span>
</p>
```

**Styling** (`css/tournament-blinds-calculator.css`):

- Remove the `.tb-opening-stats`, `.tb-opening-stats div`, `.tb-opening-stats span`, `.tb-opening-stats strong`, and `.tb-field-note` rules (no other callers).
- Add `.tb-opening-caption`:
  - `display: flex; flex-wrap: wrap; gap: 0.5rem 0.6rem; align-items: baseline`
  - `margin: 0.75rem 0 0`
  - `color: var(--tb-sub)` (#475569), `font-size: 0.82rem`, `line-height: 1.45`
- `.tb-opening-caption b` — uppercase label, `color: #64748b`, `font-size: 0.7rem`, `font-weight: 800`, `letter-spacing: 0.06em`, `text-transform: uppercase`, `margin-right: 0.3rem`.
- `.tb-opening-caption strong` — `color: var(--tb-ink)`, `font-weight: 700`, no special font.
- `.tb-opening-caption-hint` — `color: #94a3b8`, italic optional but disabled for now.
- On mobile (≤640px) the flex wraps naturally; no special override needed.

**JS** — no changes to `renderOpeningStats()`; existing element IDs (`tb-start-depth`, `tb-blind-ratio`) remain.

---

## Fix 2 — Compact schedule at every breakpoint

### Desktop (>640px)

- Drop the standalone **Action** column. The break-insert affordance moves into the **Starts** cell as a trailing icon button.
- Update the `<thead>` row in `tools/tournament-blinds-calculator.md` to remove the `<th>Action</th>` cell.
- Adjust `.tb-table` `min-width` from `720px` down to `560px` (six columns instead of seven).
- The Starts `<td>` becomes a flex container with the formatted time on the left and the icon button on the right.

### Mobile (≤640px)

Switch the existing per-cell stack to a single-line flex layout per level row, with inputs styled to look like inline text until focused.

**CSS strategy** (replaces the current mobile block, lines 510–549):

```css
@media (max-width: 640px) {
  .tb-table {
    min-width: 0;
    font-size: 0.92rem;
  }
  .tb-table thead { display: none; }
  .tb-table tr {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.55rem;
    padding: 0.55rem 0.75rem;
    border-top: 1px solid #edf2f7;
  }
  .tb-table td {
    display: contents;          /* children flow into the tr flex */
  }
  .tb-table td::before { content: none; }   /* hide auto labels */

  /* Level cell shows "L4" */
  .tb-table td[data-label="Level"] {
    display: inline-flex;
    color: #64748b;
    font-weight: 800;
    letter-spacing: 0.04em;
    margin-right: 0.15rem;
  }
  .tb-table td[data-label="Level"]::before {
    content: "L";
    color: #94a3b8;
    margin-right: 0.05em;
  }

  /* Inputs look like text until focused */
  .tb-table input {
    width: auto;
    min-width: 2ch;
    border: 0;
    background: transparent;
    padding: 0.1rem 0.15rem;
    font-weight: 700;
    text-align: left;
    box-shadow: none;
    color: var(--tb-ink);
  }
  .tb-table input:focus {
    background: #f1f5f9;
    border-radius: 6px;
    box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.18);
  }

  /* Sized fields */
  .tb-table td[data-label="Small Blind"] input,
  .tb-table td[data-label="Big Blind"] input { width: 4.5ch; }
  .tb-table td[data-label="Ante"] input,
  .tb-table td[data-label="Duration"] input { width: 3.5ch; }

  /* CSS pseudo-separators / units */
  .tb-table td[data-label="Big Blind"]::before {
    content: "/";
    color: #94a3b8;
    margin-right: 0.1rem;
  }
  .tb-table td[data-label="Ante"]::before {
    content: "ante";
    color: #94a3b8;
    font-size: 0.78rem;
    margin-right: 0.15rem;
  }
  .tb-table td[data-label="Duration"]::after {
    content: "m";
    color: #94a3b8;
    margin-left: 0.05rem;
  }
  .tb-table td[data-label="Starts"] {
    color: #64748b;
    margin-left: auto;            /* push to row end */
  }
}
```

### Break rows

Break rows already use a different `renderBreakRow` and a `.tb-row-break` highlight. Same flex treatment applies; layout reads `☕ Break · [10]m · starts 1:12 · ✕`. The label input stays full-width — it'll wrap to its own line if needed on narrow phones, which is fine.

### Markup

The only change needed to `renderLevelRow` and `renderBreakRow` in `js/tournament-blinds-page.js` is removing the standalone Action `<td>` and merging the button into the Starts cell (see Fix 3 for the button markup).

---

## Fix 3 — ☕ icon button replaces "Break after"

**Icon** — Heroicons outline `cup-hot` (or hand-rolled equivalent: a steaming cup glyph at 20×20 viewBox), 16×16 rendered, `stroke-width="1.6"`, inlined SVG. Single shared `COFFEE_SVG` constant in `js/tournament-blinds-page.js` to avoid duplication. The "Remove" affordance on break rows becomes a 16×16 ✕ (`x-mark` outline) with the same button shell.

**Markup changes in `js/tournament-blinds-page.js`:**

```js
var COFFEE_SVG = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">…</svg>';
var CLOSE_SVG  = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">…</svg>';

function renderLevelRow(row) {
  return [
    '<tr>',
    '<td data-label="Level">' + row.level + '</td>',
    inputCell(row, 'smallBlind', 'Small Blind'),
    inputCell(row, 'bigBlind', 'Big Blind'),
    inputCell(row, 'ante', 'Ante'),
    inputCell(row, 'minutes', 'Duration'),
    '<td data-label="Starts"><div class="tb-starts-cell">' +
      '<span>' + formatClock(row.startsAtMinutes) + '</span>' +
      '<button type="button" class="tb-icon" data-action="insert-break" data-level="' + row.level + '" aria-label="Add break after level ' + row.level + '" title="Add break after">' + COFFEE_SVG + '</button>' +
    '</div></td>',
    '</tr>'
  ].join('');
}

function renderBreakRow(row) {
  return [
    '<tr class="tb-row-break">',
    '<td data-label="Level"><span class="tb-break-label">' + COFFEE_SVG + ' Break</span></td>',
    '<td data-label="Small Blind" colspan="3"><input type="text" value="' + row.label + '" data-row="' + row.id + '" data-field="label"></td>',
    '<td data-label="Duration"><input type="number" min="1" step="1" value="' + row.minutes + '" data-row="' + row.id + '" data-field="minutes"></td>',
    '<td data-label="Starts"><div class="tb-starts-cell">' +
      '<span>' + formatClock(row.startsAtMinutes) + '</span>' +
      '<button type="button" class="tb-icon tb-icon--danger" data-action="remove-row" data-row="' + row.id + '" aria-label="Remove break" title="Remove break">' + CLOSE_SVG + '</button>' +
    '</div></td>',
    '</tr>'
  ].join('');
}
```

Note: the markup drops the `<td>Action</td>` cell on both row types. The break row's `<td colspan="3">` stays as-is because the Ante column no longer carries its own cell — the colspan absorbs Big Blind + Ante like before.

**CSS additions** (`css/tournament-blinds-calculator.css`):

```css
.tb-starts-cell {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
}
.tb-icon {
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
  color: #94a3b8;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.12s, background 0.12s;
}
.tb-icon svg { width: 16px; height: 16px; }
.tb-icon:hover,
.tb-icon:focus-visible {
  color: var(--tb-teal);
  background: var(--tb-teal-soft);
  outline: 0;
}
.tb-icon--danger:hover,
.tb-icon--danger:focus-visible {
  color: #b91c1c;
  background: #fff1f2;
}
.tb-break-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #92400e;
  font-weight: 800;
}
.tb-break-label svg { width: 14px; height: 14px; }
```

Remove the now-unused `.tb-row-actions`, `.tb-mini`, and `.tb-mini--danger` rules (they have no other callers — verified by grep before deletion).

---

## Verification

1. **Visual check** on desktop (≥900px) — Opening Blinds block reads as one panel with caption underneath; schedule table fits without horizontal scroll; coffee icon appears flush right of Starts.
2. **Visual check** at 640px (mobile breakpoint) — Each level renders on a single flex row, possibly wrapping the Starts/icon to a new visual row only on the narrowest phones; tapping a number activates an inline input with a teal underline.
3. **Functional check** — Insert break, remove break, edit SB/BB/ante/duration still work identically. `renderTotal`, `renderWarnings`, and copy-schedule output remain unchanged (they don't depend on row markup).
4. **Existing tests** — `js/tournament-blinds.test.js` covers the solver, not the page wiring; no test changes needed. Run the file (if a runner is wired) to confirm no regression.
5. **Lighthouse / a11y spot-check** — Every icon button carries `aria-label`; the caption uses `aria-live="polite"` for stat updates.

## Out of scope (deferred)

- Sticky table header on long schedules.
- Drag-to-reorder breaks.
- A "preset" picker for break cadence (every 4 levels, every hour, etc.).
