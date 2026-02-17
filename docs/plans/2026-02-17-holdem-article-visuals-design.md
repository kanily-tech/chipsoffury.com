# Texas Hold'em Beginner Guide - Visual Enhancements Design

**Date:** 2026-02-17
**Article:** `learn/0021-texas-holdem-rules-beginner-guide.md`
**Goal:** Transform the text-only article into a visually rich, interactive resource that stands out against all competitors.

## Competitive Context

Analyzed 9 top-ranking "how to play Texas Hold'em" articles. Key findings:
- Every competitor is text-heavy. Only 2/9 have sequential hand progression figures.
- 0/9 have inline glossary tooltips (we already do).
- 0/9 have animated/interactive card elements inline.
- 0/9 have progress indicators showing where you are in a hand.
- Only 1/9 (888poker) has an interactive walkthrough, and it's a separate app, not embedded in content.

## Approach

Component-rich interactive article. Reuse existing WebC components and card PNG assets where possible. Build one new component (`<hand-flow>`). Use inline HTML (glossary-proven patterns) for one-off visuals.

## Visual Elements

### 1. Table Overview Diagram
**Location:** After "What Is Texas Hold'em?" section (replaces Media Suggestion at line 24)
**Type:** Inline HTML
**Description:** Simplified bird's-eye poker table showing 4 player positions with face-down hole cards and 5 community cards face-up in the center. Uses existing `.poker-table` green felt styles and `/images/cards/card_back.png`. Labels: "YOUR HAND" on one position, "COMMUNITY CARDS" in center.
**Purpose:** Gives beginners an instant mental model before reading any text.

### 2. Blinds Diagram
**Location:** After "The Blinds" section (replaces Media Suggestion at line 63)
**Type:** Inline HTML
**Description:** Simplified 5-6 seat table showing BTN, SB ($1), BB ($2) positions highlighted with forced bet amounts. Other seats grayed out. Clockwise arrow showing rotation direction. Simpler than the full `<table-positions>` component (which has strategy labels too advanced for beginners).
**Purpose:** Visual explanation of blind structure and rotation.

### 3. Hand Flow Progress Bar (NEW COMPONENT)
**Location:** At each of the 6 steps in "How a Hand Plays Out" (first instance replaces Media Suggestion at line 107)
**Type:** New WebC component `<hand-flow>`
**Description:** Horizontal step indicator with pill badges:
`Deal -> Preflop -> Flop -> Turn -> River -> Showdown`
Accepts a `step` prop (1-6). Current step highlighted in emerald (same pattern as glossary preflop.md pill sequences). Appears at each sub-section, updating the highlighted step.
**Styling:** Reuse glossary pill badge pattern:
- Inactive: `background: #f3f4f6; border-radius: 6px; padding: 8px 12px`
- Active: `background: #ecfdf5; border: 1px solid #10b981`
- Arrow: `→` in `color: #9ca3af`
- Wrap on mobile (flex-wrap: wrap)
**Purpose:** Constant visual orientation. No competitor does this.

### 4. Running Hand Example Cards
**Location:** Steps 2-5 (Preflop, Flop, Turn, River sections)
**Type:** Inline HTML with card PNG images
**Description:** Shows the K-Q suited running example developing across streets:
- **Preflop:** K♠ Q♠ displayed as card images ("Your hand")
- **Flop:** Board: 10♠ J♦ 3♠ + hole cards below
- **Turn:** Board adds A♥ + hole cards
- **River:** Board adds 7♠ + hole cards
Uses `/images/cards/` PNGs (height: 50-60px) in flex rows with subtle shadow. Same inline HTML patterns as glossary/flop.md.
**Purpose:** Visual progression of the example hand that the text narrates.

### 5. Showdown Comparison
**Location:** After "Showdown" section (replaces Media Suggestion at line 171)
**Type:** Inline HTML
**Description:** Two-player showdown using tie-breakers visual pattern:
- Player 1: Best 5 cards -> "FLUSH" label -> WIN badge
- Player 2: Best 5 cards -> "TWO PAIR" label
Uses card PNGs and existing `.tb-decisive` / badge patterns.
**Purpose:** Concretely shows what a showdown looks like.

### 6. Hand Rankings Component
**Location:** Replaces the text-only hand rankings list (replaces Media Suggestion at line 195)
**Type:** Existing `<hand-rankings>` WebC component (drop-in)
**Description:** Already built. Shows all 10 hand types with card PNG examples, descriptions, and odds.
**Usage:** `{% renderTemplate "webc" %}<hand-rankings></hand-rankings>{% endrenderTemplate %}`
**Purpose:** Visual rankings with real card images instead of text-only list.

### 7. Five-Card Selection Highlight
**Location:** "Which Five Cards Do I Actually Use?" section
**Type:** Inline HTML
**Description:** Shows the K♥ 3♦ + A♠ A♦ A♣ A♥ Q♠ example:
- 7 cards displayed in a row
- Best 5 highlighted (border/glow): A♠ A♦ A♣ A♥ K♥
- Unused 2 dimmed (40% opacity via `.poker-card--dim`): 3♦, Q♠
- Label: "Best hand: Four Aces, King kicker"
**Purpose:** Visually demonstrates the card selection concept that confuses beginners.

### 8. Kicker Example
**Location:** "What's a Kicker?" sub-section
**Type:** Inline HTML
**Description:** Side-by-side comparison:
- You: A♠ K♦ -> Pair of Aces, K kicker (highlighted) -> WIN
- Opponent: A♥ 9♣ -> Pair of Aces, 9 kicker
- Shared board: A♣ 7♠ 5♦ 3♥ 2♠
**Purpose:** Concretely demonstrates how kickers break ties.

## Implementation Summary

| # | Visual | Type | Effort |
|---|--------|------|--------|
| 1 | Table Overview | Inline HTML | Medium |
| 2 | Blinds Diagram | Inline HTML | Medium |
| 3 | Hand Flow Progress Bar | New WebC component | Medium |
| 4 | Running Hand Cards | Inline HTML + card PNGs | Low |
| 5 | Showdown Comparison | Inline HTML | Low |
| 6 | Hand Rankings | Existing component (drop-in) | Trivial |
| 7 | Five-Card Selection | Inline HTML + existing CSS | Low |
| 8 | Kicker Example | Inline HTML | Low |

## Assets Required

- Card PNGs: Already exist at `/images/cards/` (all 52 cards + back)
- CSS: Existing `.poker-table`, `.poker-card`, `.poker-card--dim` styles
- Glossary pill patterns: Proven inline HTML from glossary/*.md
- New component: `<hand-flow>` in `_includes/components/hand-flow.webc`

## Notes

- All inline HTML follows the same patterns used in glossary term definitions (flexbox, card images, pill badges)
- The `<hand-flow>` component is the only new reusable piece; everything else is article-specific inline HTML
- Remove all "Media Suggestion" text placeholders when replacing with actual visuals
- The text-only hand rankings list (lines 178-191) gets fully replaced by the `<hand-rankings>` component
