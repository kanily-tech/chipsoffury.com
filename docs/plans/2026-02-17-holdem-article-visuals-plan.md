# Texas Hold'em Article Visual Enhancements - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 8 visual elements to `learn/0021-texas-holdem-rules-beginner-guide.md` — one new WebC component, one existing component drop-in, and six inline HTML visuals using card PNGs and glossary-proven patterns.

**Architecture:** One new `<hand-flow>` WebC component for the step progress bar. All other visuals are inline HTML embedded directly in the article markdown, following the same flexbox + card image patterns used in `glossary/flop.md` and `glossary/preflop.md`. The `<hand-rankings>` component is a drop-in replacement for the text-only rankings list.

**Tech Stack:** WebC components, inline HTML with inline styles, Eleventy/Nunjucks `renderTemplate`, existing card PNGs at `/images/cards/`, existing CSS classes (`.poker-table`, `.poker-card--dim`, `.poker-card--highlight`).

**Design doc:** `docs/plans/2026-02-17-holdem-article-visuals-design.md`

**Reference files for inline HTML patterns:**
- `glossary/flop.md` — card images in flex rows, step sequences, labeled card groups
- `glossary/preflop.md` — pill badge step indicator with active highlight
- `glossary/hole-cards.md` — grid layout with card images

**Card image naming:** `/images/cards/{rank}{suit}.png` where rank = `2-10,j,q,k,a` and suit = `s,h,d,c`. Card back: `/images/cards/card_back.png`.

---

## Task 1: Create `<hand-flow>` WebC Component

**Files:**
- Create: `_includes/components/hand-flow.webc`
- Modify: `css/tailwind-full.css` (add component styles at end)

**Step 1: Create the WebC component**

Create `_includes/components/hand-flow.webc` with this content:

```html
<div class="hand-flow" :data-step="step">
  <div class="hand-flow__step" data-index="1">
    <span class="hand-flow__number">1.</span> Deal
  </div>
  <span class="hand-flow__arrow">→</span>
  <div class="hand-flow__step" data-index="2">
    <span class="hand-flow__number">2.</span> Preflop
  </div>
  <span class="hand-flow__arrow">→</span>
  <div class="hand-flow__step" data-index="3">
    <span class="hand-flow__number">3.</span> Flop
  </div>
  <span class="hand-flow__arrow">→</span>
  <div class="hand-flow__step" data-index="4">
    <span class="hand-flow__number">4.</span> Turn
  </div>
  <span class="hand-flow__arrow">→</span>
  <div class="hand-flow__step" data-index="5">
    <span class="hand-flow__number">5.</span> River
  </div>
  <span class="hand-flow__arrow">→</span>
  <div class="hand-flow__step" data-index="6">
    <span class="hand-flow__number">6.</span> Showdown
  </div>
</div>
```

**Step 2: Add CSS styles**

Add to end of `css/tailwind-full.css`:

```css
/* Hand Flow Progress Bar */
.hand-flow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.hand-flow__step {
  background: #f3f4f6;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #374151;
  white-space: nowrap;
}

.hand-flow__step .hand-flow__number {
  font-weight: 600;
}

.hand-flow__arrow {
  color: #9ca3af;
  font-size: 14px;
}

/* Active step highlight */
.hand-flow[data-step="1"] .hand-flow__step[data-index="1"],
.hand-flow[data-step="2"] .hand-flow__step[data-index="2"],
.hand-flow[data-step="3"] .hand-flow__step[data-index="3"],
.hand-flow[data-step="4"] .hand-flow__step[data-index="4"],
.hand-flow[data-step="5"] .hand-flow__step[data-index="5"],
.hand-flow[data-step="6"] .hand-flow__step[data-index="6"] {
  background: #ecfdf5;
  border: 1px solid #10b981;
  font-weight: 500;
}

/* Completed steps (before active) */
.hand-flow[data-step="2"] .hand-flow__step[data-index="1"],
.hand-flow[data-step="3"] .hand-flow__step[data-index="1"],
.hand-flow[data-step="3"] .hand-flow__step[data-index="2"],
.hand-flow[data-step="4"] .hand-flow__step[data-index="1"],
.hand-flow[data-step="4"] .hand-flow__step[data-index="2"],
.hand-flow[data-step="4"] .hand-flow__step[data-index="3"],
.hand-flow[data-step="5"] .hand-flow__step[data-index="1"],
.hand-flow[data-step="5"] .hand-flow__step[data-index="2"],
.hand-flow[data-step="5"] .hand-flow__step[data-index="3"],
.hand-flow[data-step="5"] .hand-flow__step[data-index="4"],
.hand-flow[data-step="6"] .hand-flow__step[data-index="1"],
.hand-flow[data-step="6"] .hand-flow__step[data-index="2"],
.hand-flow[data-step="6"] .hand-flow__step[data-index="3"],
.hand-flow[data-step="6"] .hand-flow__step[data-index="4"],
.hand-flow[data-step="6"] .hand-flow__step[data-index="5"] {
  background: #e5e7eb;
  color: #6b7280;
}
```

**Step 3: Verify component renders**

Run: `npm start` and visit a test page or add the component temporarily to the article. Verify the pill badges render with correct active highlighting.

**Step 4: Commit**

```bash
git add _includes/components/hand-flow.webc css/tailwind-full.css
git commit -m "feat: add hand-flow progress bar component"
```

---

## Task 2: Add Table Overview Diagram (Visual 1)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (replace lines 24-25)

**Step 1: Replace the Media Suggestion placeholder**

Replace lines 24-25 (the "Media Suggestion" block after "What Is Texas Hold'em?") with inline HTML showing a simplified poker table. Use card_back.png for face-down cards, face-up cards for community cards.

The HTML should show:
- A rounded container with green felt background (`background-color: #31661E; border: 2px solid #DDA54A; border-radius: 16px; padding: 24px;`)
- 4 player positions (top-left, top-right, bottom-left, bottom-right) each showing 2 face-down cards
- Center area with 5 face-up community cards
- "COMMUNITY CARDS" label in center, "YOU" label on one position
- Card images at ~40px height for players, ~50px for community

Pattern reference: See `glossary/flop.md` lines 7-14 for card image styling.

**Step 2: Verify visually**

Run dev server, navigate to the article, verify the table diagram renders correctly and is responsive on mobile.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: add table overview diagram to holdem article"
```

---

## Task 3: Add Blinds Diagram (Visual 2)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (replace lines 63-64)

**Step 1: Replace the Media Suggestion placeholder**

Replace lines 63-64 (the "Media Suggestion" block after "The Blinds" section) with inline HTML showing a simplified blinds diagram:

- Oval table shape (similar to table-positions component but simpler)
- 5 seats around the edge
- BTN seat with "D" dealer chip marker (white circle, bold)
- SB seat with "$1" label (highlighted)
- BB seat with "$2" label (highlighted)
- 2 other seats just showing generic "Player" labels (gray/dimmed)
- Clockwise arrow or "→ Action flows clockwise" text
- Use existing color scheme: blind positions in gray badges, amounts in emerald

Pattern reference: See `_includes/components/table-positions.webc` for the position marker styling approach, but simplify significantly — no position strategy labels, fewer seats.

**Step 2: Verify visually**

Check mobile and desktop rendering.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: add blinds position diagram to holdem article"
```

---

## Task 4: Add Hand Flow Progress Bars (Visual 3)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (replace lines 106-107, and add to each step section)

**Step 1: Replace the Media Suggestion and add flow bars**

Replace lines 106-107 (the "Media Suggestion" block) with:

```
<div>{% renderTemplate "webc" %}
<hand-flow step="1"></hand-flow>
{% endrenderTemplate %}</div>
```

Then add the same component at the beginning of each step section (after the ### heading), with the appropriate step number:

- Step 1 (The Deal, line ~109): `step="1"`
- Step 2 (Preflop, line ~115): `step="2"`
- Step 3 (The Flop, line ~131): `step="3"`
- Step 4 (The Turn, line ~143): `step="4"`
- Step 5 (The River, line ~153): `step="5"`
- Step 6 (Showdown, line ~163): `step="6"`

**Important:** Only include the flow bar at the top introduction and at step 1. For steps 2-6, include it right after the `### Step N` heading, before the body text. The introductory one (at lines 106-107) shows step 1 as active.

**Step 2: Verify**

Check all 6 step sections show the progress bar with the correct step highlighted. Verify wrapping on mobile.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: add hand flow progress bars to each step section"
```

---

## Task 5: Add Running Hand Example Cards (Visual 4)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (add to Steps 2-5 example sections)

**Step 1: Add card visuals to each street's example**

After each **Example:** paragraph in Steps 3-5, add inline HTML showing the developing hand. Also add hole card display at Step 2.

**Step 2 (Preflop) — after the step text, before the `---`:**

Show the hole cards being dealt:

```html
<div style="text-align: center; margin: 20px 0;">
<div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">Your hole cards</div>
<div style="display: flex; gap: 6px; justify-content: center;">
<img src="/images/cards/ks.png" alt="K♠" style="height: 60px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
<img src="/images/cards/qs.png" alt="Q♠" style="height: 60px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
</div>
</div>
```

**Step 3 (Flop) — after the Example paragraph:**

```html
<div style="margin: 20px 0; background: #f9fafb; border-radius: 12px; padding: 16px;">
<div style="text-align: center; margin-bottom: 12px;">
<div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">The Board</div>
<div style="display: flex; gap: 6px; justify-content: center;">
<img src="/images/cards/10s.png" alt="10♠" style="height: 56px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
<img src="/images/cards/jd.png" alt="J♦" style="height: 56px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
<img src="/images/cards/3s.png" alt="3♠" style="height: 56px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
</div>
</div>
<div style="border-top: 1px solid #e5e7eb; padding-top: 12px; text-align: center;">
<div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; margin-bottom: 8px;">Your Hand</div>
<div style="display: flex; gap: 6px; justify-content: center;">
<img src="/images/cards/ks.png" alt="K♠" style="height: 48px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
<img src="/images/cards/qs.png" alt="Q♠" style="height: 48px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
</div>
</div>
<div style="text-align: center; margin-top: 10px; font-size: 12px; color: #065f46; font-weight: 500;">Flush draw + straight draw</div>
</div>
```

**Step 4 (Turn) — after the Example paragraph:**

Same pattern but board shows 4 cards: 10♠ J♦ 3♠ + A♥ (turn card separated by a small gap). Label: "Straight! A-K-Q-J-10"

Cards for the board: `10s.png`, `jd.png`, `3s.png` then a `<div style="width: 8px;"></div>` spacer, then `ah.png`.

**Step 5 (River) — after the Example paragraph:**

Same pattern but board shows all 5 cards: 10♠ J♦ 3♠ | A♥ | 7♠. Label: "Flush! K♠ Q♠ 10♠ 7♠ 3♠"

Cards for the board: `10s.png`, `jd.png`, `3s.png`, spacer, `ah.png`, spacer, `7s.png`.

**Step 2: Verify progression**

Check that scrolling through the article shows the hand naturally developing with more cards appearing at each street.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: add running hand example card visuals to each street"
```

---

## Task 6: Add Showdown Comparison (Visual 5)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (replace lines 171-172)

**Step 1: Replace Media Suggestion with showdown visual**

Replace lines 171-172 with inline HTML showing a two-player showdown comparison:

Layout:
- Two side-by-side boxes (flex row, wrap on mobile)
- **Player 1 (left):** Shows hole cards K♠ Q♠, best hand "K♠ Q♠ 10♠ 7♠ 3♠", label "FLUSH", green WIN badge
- **Player 2 (right):** Shows hole cards J♥ J♣, best hand "J♥ J♣ J♦ A♥ 10♠" (if we use three jacks with the board), label "THREE OF A KIND"
- Use the same visual pattern as tie-breakers component

Actually, for simplicity and correctness with the running example board (10♠ J♦ 3♠ A♥ 7♠):
- **You:** K♠ Q♠ → Flush (K♠ Q♠ 10♠ 7♠ 3♠) → WIN
- **Opponent:** A♦ A♣ → Three of a Kind (A♦ A♣ A♥ J♦ 10♠)

Each box:
- Gray background, rounded, padded
- "YOUR HAND" / "OPPONENT" label at top (small caps)
- Hole cards row (small, 36px)
- Best 5-card hand row (larger, 44px)
- Hand name label (bold)
- WIN badge (emerald background, white text) on player 1 only

**Step 2: Verify**

Check rendering on mobile and desktop.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: add showdown comparison visual"
```

---

## Task 7: Replace Hand Rankings with Component (Visual 6)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (replace lines 178-196)

**Step 1: Replace text list with component**

Replace lines 178-196 (the numbered text-only hand rankings list plus the Media Suggestion) with:

```markdown
Your five-card hand falls into one of ten categories, ranked from strongest to weakest:

<div>
{% renderTemplate "webc" %}
<hand-rankings></hand-rankings>
{% endrenderTemplate %}
</div>

You'll naturally learn these as you play. Most apps display hand rankings during the game, so you won't be guessing at the table.

For a deeper breakdown with visual examples and memory tricks, see the [full hand rankings guide](/learn/poker-winning-hand-rankings/).
```

**Step 2: Verify**

Check the hand rankings component renders correctly in the article context. Verify card images load and the layout is responsive.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: replace text hand rankings with visual component"
```

---

## Task 8: Add Five-Card Selection Visual (Visual 7)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (add after the Example at line 206)

**Step 1: Add card selection visual**

After line 206 (the K♥ 3♦ example paragraph), add inline HTML:

Layout:
- All 7 available cards in a row
- Label each group: "YOUR CARDS" (K♥, 3♦) and "BOARD" (A♠ A♦ A♣ A♥ Q♠)
- Below, show the best 5-card hand with selected cards highlighted (border glow, slight lift) and unused cards dimmed (opacity 0.4)
- **Used cards:** A♠ A♦ A♣ A♥ K♥ (highlighted with `box-shadow: 0 0 0 2px #10b981`)
- **Unused cards:** 3♦, Q♠ (dimmed with `opacity: 0.4`)
- Label below: "Best hand: Four Aces, King kicker"

Card images at 48px height. Use the same flex row pattern.

**Step 2: Verify**

Check the highlight/dim contrast is clear and meaningful.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: add five-card selection visual with highlight/dim"
```

---

## Task 9: Add Kicker Example Visual (Visual 8)

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md` (add after the kicker Example at line 214)

**Step 1: Add kicker comparison visual**

After line 214 (the A♠ K♦ vs A♥ 9♣ example), add inline HTML:

Layout (two side-by-side boxes, similar to showdown in Task 6):
- **Shared board** across the top: A♣ 7♠ 5♦ 3♥ 2♠ (5 cards, centered)
- Below, two columns:
  - **You:** Hole cards A♠ K♦ → "Pair of Aces, K kicker" → K♦ highlighted with emerald border as the decisive kicker → WIN badge
  - **Opponent:** Hole cards A♥ 9♣ → "Pair of Aces, 9 kicker" → 9♣ normal/dimmed

The kicker card (K♦ for you, 9♣ for opponent) should be visually distinct — your K♦ gets the emerald highlight border, opponent's 9♣ stays normal.

**Step 2: Verify**

Check that the kicker concept is visually clear.

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "feat: add kicker example comparison visual"
```

---

## Task 10: Remove Remaining Media Suggestion Placeholders

**Files:**
- Modify: `learn/0021-texas-holdem-rules-beginner-guide.md`

**Step 1: Clean up**

Search for any remaining "**Media Suggestion:**" lines and remove them. There should be one remaining at lines 237-238 (FAQ accordion suggestion) and possibly at lines 272-273 (app screenshot suggestion). Remove these text placeholders.

**Step 2: Final visual review**

Run the dev server and scroll through the entire article. Check:
- All 8 visuals render correctly
- Card images load
- Mobile responsive (flex-wrap works)
- Flow bars progress correctly
- No broken HTML or layout issues
- Glossary terms still work (click a `[term](glossary:slug)` to verify modal opens)

**Step 3: Commit**

```bash
git add learn/0021-texas-holdem-rules-beginner-guide.md
git commit -m "chore: remove remaining media suggestion placeholders"
```

---

## Task Summary

| Task | Description | Effort |
|------|-------------|--------|
| 1 | Create `<hand-flow>` component + CSS | Medium |
| 2 | Table overview diagram | Medium |
| 3 | Blinds diagram | Medium |
| 4 | Hand flow progress bars (6 instances) | Low |
| 5 | Running hand card visuals (4 streets) | Medium |
| 6 | Showdown comparison | Low |
| 7 | Hand rankings component (drop-in) | Trivial |
| 8 | Five-card selection highlight | Low |
| 9 | Kicker example comparison | Low |
| 10 | Clean up remaining placeholders + final review | Trivial |
