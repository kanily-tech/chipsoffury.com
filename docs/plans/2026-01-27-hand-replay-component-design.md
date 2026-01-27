# Hand Replay Component Design

## Problem

The "Putting It Together: Three Real Hands" section in the beginner poker strategy guide is too difficult for beginners:

- Advanced terminology without context (four-bet, loose-passive, dry board)
- Compressed reasoning that assumes range-based thinking
- Wall of text with no visual anchors
- Scenarios are intermediate-level, not beginner-level

## Solution

Create a visual hand-replay WebC component and rewrite the three hands to match the "Three Questions" decision framework taught earlier in the article.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary consumption | Mobile/web reading | Scrollable static content, no complex interactivity |
| Technical approach | New WebC component | Reusable across posts, maintainable |
| Visual style | Minimal/diagrammatic | Reduces cognitive load, focuses on learning |
| Progression | Stacked frames | Natural mobile scrolling, one street per visual block |
| Terminology | Simpler scenarios + glossary links | Links can repeat; readers shouldn't hunt backwards |
| Content framework | Maps to "Three Questions" | Reinforces earlier teaching |

## Visual Component Structure

Each frame shows one street:

```
┌─────────────────────────────────────────┐
│  POT: $37                               │
│                                         │
│         [card] [card] [card]            │
│         (community cards)               │
│                                         │
│   Villain                    YOU (BTN)  │
│   [back][back]               [card][card]│
│   $188                       $188       │
│                                         │
│  ─────────────────────────────────────  │
│  💭 "Thought bubble with beginner-      │
│  friendly reasoning..."                 │
│                                         │
│  ✓ Action taken                         │
│  → Result                               │
└─────────────────────────────────────────┘
```

### Key Elements

- **Pot size** prominent at top
- **Community cards** centered using actual card images
- **Two players only** (you vs. one opponent)
- **Hole cards** - yours visible, villain's show card backs
- **Stack sizes** in dollars (concrete for beginners)
- **Thought bubble** - beginner-appropriate reasoning
- **Action summary** - what happened

## Card Images

Located in `/images/cards/`:

| Card | Image path |
|------|------------|
| A♠ | `/images/cards/as.png` |
| K♥ | `/images/cards/kh.png` |
| Q♦ | `/images/cards/qd.png` |
| J♣ | `/images/cards/jc.png` |
| 10♠ | `/images/cards/10s.png` |
| Hidden | `/images/cards/card_back.png` |

Format: `{rank}{suit}.png` where rank is 2-10, a, j, q, k and suit is c, d, h, s.

## The Three New Scenarios

### Hand 1: "I'm Ahead — Bet for Value"

- **Your cards:** A♠ A♥
- **Position:** Button
- **Situation:** One caller preflop, dry flop K♦ 7♣ 2♠
- **Lesson:** When you have the best hand, bet to get paid
- **Outcome:** Villain calls with K♠J♠, you win with aces
- **Complexity:** Zero advanced concepts

### Hand 2: "I'm Drawing — Check the Math"

- **Your cards:** 9♠ 8♠
- **Position:** Button
- **Situation:** Flop K♠ 5♠ 2♣ gives you flush draw
- **Lesson:** Count outs, check pot odds, call only if math works
- **Outcome:** Call, hit flush on turn, win
- **Complexity:** Uses "multiply by 2" shortcut from article

### Hand 3: "I'm Behind — Save My Chips"

- **Your cards:** Q♠ J♠
- **Position:** Cutoff
- **Situation:** Flop middle pair, opponent bets every street increasing
- **Lesson:** One pair facing heavy aggression = probably beaten
- **Outcome:** Fold river, villain shows Q♥K♥ (better kicker)
- **Complexity:** No 4-bets, no range analysis

## Component Implementation

### Files to Create

| File | Purpose |
|------|---------|
| `_includes/components/hand-frame.webc` | Single street visualization |
| `_includes/components/hand-replay.webc` | Container for multiple frames |
| Styles in `css/tailwind-full.css` | Component styling |

### Component Usage

```html
{% renderTemplate "webc" %}
<hand-replay title="Hand 1: I'm Ahead — Bet for Value">
  <hand-frame
    street="preflop"
    pot="7"
    board=""
    your-cards="as,ah"
    villain-cards="hidden"
    your-stack="200"
    villain-stack="200"
    your-position="BTN"
    villain-position="MP"
    thought="Pocket aces — the best starting hand. I want to build a pot, not trap."
    action="You raise to $8"
    result="Villain calls">
  </hand-frame>

  <hand-frame
    street="flop"
    pot="19"
    board="kd,7c,2s"
    ...>
  </hand-frame>
</hand-replay>
{% endrenderTemplate %}
```

### Styling Approach

- CSS Grid for layout
- Actual PNG card images from `/images/cards/`
- Light background for thought bubble
- Responsive: already vertical, works on mobile
- Glossary links processed in thought attributes

## Content Writing

Use the blog-writer skill when writing:
- Setup text for each hand
- Thought bubble content
- Lesson callouts

Ensure beginner-friendly, natural language that avoids AI-sounding patterns.

## Success Criteria

1. A complete beginner can follow each hand without prior poker knowledge
2. Visual frames make the progression obvious
3. Thought bubbles model the decision framework from Step 3
4. Glossary links provide instant definitions for any jargon
5. Works well on mobile screens
