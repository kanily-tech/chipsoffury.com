# Hand Display Widget V2 - Redesign

## Problem with V1

The initial implementation had several issues:
1. Dark theme didn't fit the article aesthetic
2. 6 seats was cluttered
3. Action log was horizontal and hard to read
4. Layout didn't match typical poker table perspective
5. No player bets shown
6. Pot was in the header, not on the table

## V2 Design

### Layout (5 players, hero at bottom)

```
┌──────────────────────────────────────────────────┐
│  PREFLOP                                         │
├──────────────────────────────────────────────────┤
│                                                  │
│      Small Blind          Big Blind              │
│        [cards]              [cards]              │
│         $199                 $198                │
│          ○$1                  ○$2                │
│                                                  │
│                   [BOARD]                        │
│              □ □ □   □   □                       │
│                                                  │
│                   Pot: $19                       │
│                                                  │
│   Late                                Middle     │
│  [cards] ○$0                       ○$8 [cards]  │
│   $200                                $200       │
│                                                  │
│                     ○$8                          │
│                  You (Dealer)                    │
│                    [cards]                       │
│                     $192                         │
│                                                  │
├──────────────────────────────────────────────────┤
│  Small Blind posts $1                            │
│  Big Blind posts $2                              │
│  Middle calls $2                                 │
│  You raise to $8                                 │
│  Middle calls                                    │
└──────────────────────────────────────────────────┘
```

### Visual Positions

5 fixed visual slots:
- **top-left**: First opponent clockwise from hero
- **top-right**: Second opponent clockwise
- **right**: Third opponent clockwise
- **left**: Fourth opponent clockwise (wraps around)
- **bottom**: Always the hero

### Position Rotation Logic

The component receives poker positions (sb, bb, middle, late, dealer) and rotates them so the hero is always at the bottom visually.

Example: If hero is Dealer in a 5-player game:
- Bottom (hero): Dealer → "You (Dealer)"
- Top-left: Small Blind
- Top-right: Big Blind
- Right: Middle
- Left: Late

Example: If hero is Late:
- Bottom (hero): Late → "You (Late)"
- Top-left: Dealer
- Top-right: Small Blind
- Right: Big Blind
- Left: Middle

### Bet Positions

Bets are placed towards the table center from each player:
- Top players: bet circle below their stack
- Side players: bet circle beside cards (towards center)
- Bottom player: bet circle above their cards

### Visual Styling

**Colors (light theme):**
- Table background: transparent (white page shows through)
- Text: dark gray (#374151)
- Hero label: gold/amber (#d97706)
- Folded players: muted gray, no cards
- Bet circles: subtle gray background (#f3f4f6)
- Pot text: slightly bolder

**Cards:**
- ~36-40px wide
- Hidden = card backs
- Folded = no cards shown

**Action log:**
- Light gray background strip
- One action per line
- Player names slightly bolder
- Vertical list format

**Dimensions:**
- Max width: 500-550px
- Generous whitespace
- No heavy borders or containers

### Component API

```html
<hand-display
  street="flop"
  pot="19"
  board="kd,7c,2s"
  seats='[
    {"position":"sb", "stack":"199", "bet":"1", "folded":true},
    {"position":"bb", "stack":"198", "bet":"2", "folded":true},
    {"position":"middle", "cards":"hidden", "stack":"192", "bet":"8"},
    {"position":"late", "stack":"200", "folded":true},
    {"position":"dealer", "cards":"as,ah", "stack":"192", "bet":"8", "hero":true}
  ]'
  actions='[
    "Small Blind posts $1",
    "Big Blind posts $2",
    "Middle calls $2",
    "You raise to $8",
    "Middle calls"
  ]'
>
</hand-display>
```

**Seat attributes:**
- `position`: sb, bb, middle, late, dealer
- `stack`: chip stack amount
- `cards`: comma-separated card codes, "hidden", or omit for folded
- `bet`: current bet amount (optional, omit if 0)
- `folded`: true if folded
- `hero`: true for the player's seat

**Component attributes:**
- `street`: preflop, flop, turn, river
- `pot`: total pot amount
- `board`: comma-separated board cards
- `seats`: JSON array of seat objects
- `actions`: JSON array of action strings

### Position Labels

| Position | Display Label |
|----------|---------------|
| sb | Small Blind |
| bb | Big Blind |
| middle | Middle |
| late | Late |
| dealer | Dealer |

Hero seat shows: "You (Position)" e.g., "You (Dealer)"

### Files to Change

1. `_includes/components/hand-display.webc` - Complete rewrite
2. `css/tailwind-full.css` - New light-theme styles
3. `posts/0016-beginner-poker-strategy-how-to-win.md` - Update all widget usages
