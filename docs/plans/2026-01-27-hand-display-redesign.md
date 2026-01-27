# Hand Display Widget Redesign

## Problem

The current `<hand-display>` widget fails beginners:

1. **Position abbreviations are cryptic** — "MP" means nothing to someone new to poker
2. **Pot amounts seem random** — No explanation of how $3 becomes $19
3. **Only 2 players shown** — Doesn't convey a full table where positions matter
4. **No action tracking** — Can't see what happened to build the pot

For a beginner-focused article meant to be a standout resource, the UI must teach, not assume knowledge.

## Solution

A redesigned `<hand-display>` component that shows:

1. A 6-seat table so beginners understand position context
2. Beginner-friendly position labels instead of jargon
3. An action log showing how the pot was built

## Visual Design

### Table Layout

- **Shape:** Rounded rectangle (matches Chips of Fury app aesthetic)
- **Style:** Flat, minimal, illustrative — no realistic felt texture
- **Seats:** 6 seats arranged around the perimeter
- **Cards:** Community cards centered; card images are the only "realistic" element
- **Dimensions:** Max width ~640px, responsive-friendly

### Seat Arrangement

```
        [Small Blind]     [Big Blind]
              ┌─────────────────┐
              │                 │
   [Dealer]   │   BOARD CARDS   │   [Early]
              │                 │
              └─────────────────┘
          [Late]           [Middle]
```

### Position Labels (Beginner-Friendly)

| Seat | Traditional | Beginner Label |
|------|-------------|----------------|
| UTG | Under the Gun | Early |
| HJ | Hijack | Middle |
| CO | Cutoff | Late |
| BTN | Button | Dealer (Best Seat) |
| SB | Small Blind | Small Blind |
| BB | Big Blind | Big Blind |

### Seat Display

Each seat shows (stacked vertically):
1. **Position label** — e.g., "Dealer (Best Seat)" or "Early"
2. **Hole cards** — Two cards (face up, face down, or none if folded)
3. **Stack amount** — e.g., "$200"

### Seat States

| State | Visual Treatment |
|-------|------------------|
| **Hero** | Highlighted with accent color/border, label shows "You (Position)", cards face-up |
| **Active opponent** | Normal styling, cards face-down until showdown |
| **Folded** | Greyed out/muted, no cards shown, stack dimmed |

### Action Log

Sits below the table. Shows pot-building actions in sequence:

```
Small Blind $1 → Big Blind $2 → Early folds → Middle calls $2 → You raise to $8 → Middle calls
```

**Visual treatment:**
- Small text, compact
- Actions separated by arrows (→)
- Your actions in bold or accent color
- Folds in muted grey
- Shows current street's actions (previous streets can be summarized)

## Component API

Uses child elements for seats — more readable than JSON attributes:

```html
<hand-display
  street="flop"
  pot="19"
  board="kd,7c,2s"
  actions="Small Blind $1 → Big Blind $2 → Early folds → Middle calls $2 → You raise to $8 → Middle calls"
>
  <seat position="sb" stack="199" folded></seat>
  <seat position="bb" stack="198" folded></seat>
  <seat position="early" stack="200" folded></seat>
  <seat position="middle" cards="hidden" stack="192"></seat>
  <seat position="late" stack="200" folded></seat>
  <seat position="dealer" cards="as,ah" stack="192" hero></seat>
</hand-display>
```

### Attributes

**`<hand-display>`:**
| Attribute | Required | Description |
|-----------|----------|-------------|
| `street` | Yes | "preflop", "flop", "turn", or "river" |
| `pot` | Yes | Current pot amount (number) |
| `board` | No | Community cards, comma-separated (e.g., "kd,7c,2s") |
| `actions` | No | Action sequence for display |

**`<seat>`:**
| Attribute | Required | Description |
|-----------|----------|-------------|
| `position` | Yes | "sb", "bb", "early", "middle", "late", "dealer" |
| `stack` | Yes | Chip stack amount (number) |
| `cards` | No | Hole cards (e.g., "as,ah") or "hidden" for face-down |
| `folded` | No | Boolean — seat has folded |
| `hero` | No | Boolean — this is the player's seat |

## File Changes

| File | Change |
|------|--------|
| `_includes/components/hand-display.webc` | Complete rewrite with new layout |
| `css/tailwind-full.css` | Update `.hand-display` styles for 6-seat layout |
| `posts/0016-beginner-poker-strategy-how-to-win.md` | Update all `<hand-display>` usages with new API |

## Out of Scope

- Animation/step-through functionality
- Responsive seat rearrangement (will use smaller sizing on mobile)
- Traditional position label toggle
