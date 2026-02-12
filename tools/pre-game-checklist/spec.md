# Pre-Game Checklist Tool: Product Specification

## Overview

A single-page interactive form on chipsoffury.com that walks a poker home game host through every pre-game decision — stakes, buy-in, rebuys, payment, house rules, timing, format, and player list — and produces a clean, copy-pasteable summary optimized for group chats. Consolidates the Pre-Game Checklist (learn/0017, lines 346-382) and House Rules Card (learn/0018, lines 298-337) into one unified flow.

**URL:** `/pre-game-checklist/`

---

## Feature List

### P0 — Must Have (Launch)

1. **Game Format selector** — Cash Game / Tournament / Bounty Tournament toggle that controls which fields appear.
2. **Stakes & Buy-in section** — Blinds, buy-in min/max, starting chips.
3. **Rebuys section** — Allowed toggle, max count, time window, amount.
4. **Money section** — Banker name, payment method, settle-up policy.
5. **House Rules section** — Toggleable preset rules with ability to add custom rules.
6. **Logistics section** — Date, start time, last buy-in time, hard stop, break schedule, location.
7. **Copy-to-clipboard output** — Formatted plain text optimized for group chat (WhatsApp, iMessage, Discord).
8. **Shareable link** — Full form state encoded in URL hash fragment so the link can be bookmarked or shared without a backend.
9. **Conditional field visibility** — Sections and fields show/hide based on game format selection.

### P1 — Nice to Have (Fast Follow)

10. **Print-friendly version** — A clean print stylesheet that renders the checklist as a one-page document.
11. **Player list with RSVP** — Optional section to list invited players and track confirmed/maybe/declined status.
12. **Blind schedule builder** — For tournaments: a simple blind level editor (level duration + blind amounts) with common presets.
13. **Inline micro-explainers** — Brief "why this matters" tooltips on key fields, linking back to the full articles.
14. **Save/load via localStorage** — Remember the host's last configuration so repeat sessions are one-click.

### P2 — Future

15. **Share-as-image** — Generate a styled card image (like the chip distribution calculator's share feature).
16. **Template library** — Pre-built configurations ("Casual Friday $20 game", "Serious Saturday $100 game", "Quick tournament").
17. **iCal export** — Generate a calendar event with the game details in the description.
18. **Integration with chip distribution calculator** — Auto-link to the chip calculator with buy-in and denomination values pre-filled.

---

## Input Fields

### Section 1: Game Format

| Field | ID | Type | Default | Placeholder | Validation | Formats |
|---|---|---|---|---|---|---|
| Game format | `format` | Radio/segmented control | `cash` | — | Required; one of `cash`, `tournament`, `bounty` | All |

**Interaction:** Selecting a format shows/hides fields across all other sections as noted in the "Formats" column below.

---

### Section 2: Stakes & Buy-in

| Field | ID | Type | Default | Placeholder | Validation | Formats |
|---|---|---|---|---|---|---|
| Small blind | `sb` | Number (currency) | `0.25` | `0.25` | > 0, max 2 decimal places | Cash |
| Big blind | `bb` | Number (currency) | `0.50` | `0.50` | > `sb`, max 2 decimal places | Cash |
| Minimum buy-in | `buyin_min` | Number (currency) | `20` | `20` | > 0 | Cash |
| Maximum buy-in | `buyin_max` | Number (currency) | `100` | `100` | >= `buyin_min` | Cash |
| Tournament buy-in | `tournament_buyin` | Number (currency) | `40` | `40` | > 0 | Tournament, Bounty |
| Bounty amount | `bounty_amount` | Number (currency) | `10` | `10` | > 0, < `tournament_buyin` | Bounty |
| Starting chips | `starting_chips` | Number | `10000` | `10,000` | > 0, integer | Tournament, Bounty |
| Starting stack (BB) | `starting_stack_bb` | Select | `100` | — | One of: 50, 80, 100, 150, 200 | Cash |
| Payout structure | `payout` | Select | `50/30/20` | — | Predefined options (see below) | Tournament, Bounty |

**Payout structure options:**
- Winner take all
- 70 / 30 (2 players paid)
- 50 / 30 / 20 (3 players paid)
- 40 / 25 / 20 / 15 (4 players paid)
- Custom (free text)

**Cash game helper text:** "Minimum buy-in is typically 50–100 big blinds. Maximum is usually 100–200 big blinds."

**Starting stack display (cash):** Show a computed read-only display: "Starting stack: [buyin_min / bb] – [buyin_max / bb] BB" so the host sees the relationship. Not an input — derived from buy-in and blind values.

---

### Section 3: Rebuys

| Field | ID | Type | Default | Placeholder | Validation | Formats |
|---|---|---|---|---|---|---|
| Rebuys allowed | `rebuys_allowed` | Toggle | `true` | — | — | Cash, Tournament, Bounty |
| Max rebuys | `rebuys_max` | Number | `1` | `1` | >= 1, integer; visible only if `rebuys_allowed` | Cash, Tournament, Bounty |
| Rebuy window | `rebuys_window` | Number (minutes) | `90` | `90` | > 0, integer; visible only if `rebuys_allowed` | Cash, Tournament, Bounty |
| Rebuy amount | `rebuys_amount` | Select | `same` | — | One of: `same` (same as initial buy-in), `custom` | Cash, Tournament, Bounty |
| Custom rebuy amount | `rebuys_custom_amount` | Number (currency) | — | `50` | > 0; visible only if `rebuys_amount` = `custom` | Cash, Tournament, Bounty |
| Rebuy condition (cash) | `rebuys_condition` | Select | `below_min` | — | One of: `below_min` (below min buy-in), `anytime` (any amount), `felted` (only when stacked) | Cash |
| Add-on allowed | `addon_allowed` | Toggle | `false` | — | — | Tournament, Bounty |
| Add-on amount | `addon_amount` | Number (currency) | `20` | `20` | > 0; visible only if `addon_allowed` | Tournament, Bounty |
| Add-on chips | `addon_chips` | Number | `5000` | `5,000` | > 0, integer; visible only if `addon_allowed` | Tournament, Bounty |

**Interaction:** Toggling "Rebuys allowed" off hides all rebuy sub-fields. Selecting "same as initial buy-in" hides the custom amount field.

---

### Section 4: Money

| Field | ID | Type | Default | Placeholder | Validation | Formats |
|---|---|---|---|---|---|---|
| Banker name | `banker` | Text | — | `e.g. Mike` | Optional but recommended (show hint) | All |
| Payment method | `payment_method` | Multi-select chips | `cash` | — | At least one selected; options: `cash`, `venmo`, `zelle`, `cashapp`, `other` | All |
| Other payment method | `payment_other` | Text | — | `e.g. PayPal` | Required if `other` selected | All |
| Settle-up policy | `settle_policy` | Select | `before_leave` | — | One of: `before_leave`, `same_night`, `next_day` | All |

**Settle-up policy labels:**
- `before_leave`: "Settle before you leave (recommended)"
- `same_night`: "Settle by end of night"
- `next_day`: "Settle by next day"

---

### Section 5: House Rules

A list of toggleable rules with sensible defaults. Each rule has an `id`, a display label, and a default on/off state.

#### Preset Rules

| Rule ID | Label | Default | Formats |
|---|---|---|---|
| `verbal_binding` | Verbal bets are binding | ON | All |
| `no_string_bets` | No string betting — announce or one motion | ON | All |
| `one_chip_call` | Single chip without declaration = call | OFF | All |
| `table_stakes` | Table stakes only (no reaching into wallets mid-hand) | ON | All |
| `no_going_south` | No going south (removing chips from play) | ON | All |
| `no_lending` | No lending or credit at the table | ON | All |
| `bank_only` | Buy chips from the bank only, not other players | ON | All |
| `one_player_hand` | One player to a hand — no coaching | ON | All |
| `show_one_show_all` | Show one, show all | ON | All |
| `cards_speak` | Cards speak — physical cards determine the winner | ON | All |
| `phones_down` | Phones down when you're in a hand | OFF | All |
| `food_off_felt` | Food off the felt | OFF | All |
| `host_decides` | Host has final say on disputes | ON | All |
| `two_decks` | Two decks with different backs | OFF | All |
| `run_it_twice` | Run it twice allowed (both players must agree) | OFF | Cash |
| `bomb_pots` | Bomb pots every orbit (5 BB ante, skip preflop) | OFF | Cash |
| `seven_two` | 7-2 game — win with 7-2 offsuit, collect bounty from each player | OFF | Cash |

#### Custom Rules

| Field | ID | Type | Default | Placeholder | Validation | Formats |
|---|---|---|---|---|---|---|
| Custom rules | `custom_rules` | Repeatable text input | Empty list | `e.g. No rabbit hunting` | Max 10 custom rules, each max 120 chars | All |

**Interaction:** Each preset rule is a labeled toggle switch. Custom rules are added via a text input with an "Add" button. Custom rules can be removed with an X button.

---

### Section 6: Logistics

| Field | ID | Type | Default | Placeholder | Validation | Formats |
|---|---|---|---|---|---|---|
| Game date | `date` | Date picker | Today | — | Must be today or future | All |
| Start time | `start_time` | Time picker | `19:00` | `7:00 PM` | Valid time | All |
| Last buy-in time | `last_buyin_time` | Time picker | `21:00` | `9:00 PM` | After `start_time` | All |
| Hard stop time | `hard_stop` | Time picker | `00:00` | `12:00 AM` | After `start_time` | All |
| Break schedule | `break_schedule` | Select | `every_90` | — | Options below | All |
| Location name | `location_name` | Text | — | `e.g. Mike's place` | Optional | All |
| Address | `location_address` | Text | — | `e.g. 123 Main St, Apt 4B` | Optional | All |
| Notes | `notes` | Textarea | — | `e.g. Street parking is free after 6 PM` | Optional, max 280 chars | All |

**Break schedule options:**
- `every_90`: "Every 90 minutes"
- `every_orbit`: "Every dealer button orbit"
- `every_60`: "Every 60 minutes"
- `no_breaks`: "No scheduled breaks"

---

### Section 7: Blind Schedule (Tournament/Bounty only) — P1

| Field | Type | Default | Validation |
|---|---|---|---|
| Level duration | Number (minutes) | `15` | 5–60, integer |
| Blind levels | Repeatable row: SB / BB / Ante | Preset based on starting chips | SB > 0, BB > SB, Ante >= 0 |

**Presets:**
- "Standard (15 min levels)" — 8 levels, no antes until level 5
- "Turbo (10 min levels)" — 8 levels, antes from level 3
- "Deep stack (20 min levels)" — 10 levels, no antes until level 6
- "Custom" — editable from blank

---

### Section 8: Players (P1)

| Field | ID | Type | Default | Placeholder | Validation | Formats |
|---|---|---|---|---|---|---|
| Player name | `players[].name` | Text | — | `Player name` | Required per row | All |
| RSVP status | `players[].rsvp` | Select | `invited` | — | One of: `confirmed`, `maybe`, `declined`, `invited` | All |

**Interaction:** Players are added via a repeatable row with an "Add player" button. Minimum 0, maximum 20 players. The player count (confirmed + maybe) is displayed as a summary.

---

## Output Formats

### 1. Copy-to-Clipboard (P0)

Plain text with Unicode formatting (bold via Unicode chars is unreliable across platforms; use ALL CAPS headers and simple ASCII formatting). Optimized for readability in mobile chat apps.

**Design principles:**
- Keep it short. Research shows hosts who send long messages don't get them read.
- Use line breaks generously — chat apps collapse dense text.
- Group related info on the same line where possible.
- Omit sections/fields the host left blank or at default-off.
- Include only rules toggled ON (don't list what's NOT in effect).

#### Example: Cash Game Output

```
POKER NIGHT — Sat, Feb 15

Cash Game | $0.25/$0.50 blinds
Buy-in: $20–$100 (100 BB starting stack)

Rebuys: 1 max, first 90 min, same as buy-in
Rebuy when below min buy-in

Banker: Mike
Payment: Venmo, Cash
Settle up before you leave

House Rules:
• Verbal bets are binding
• No string bets
• Table stakes only
• No going south
• No lending at the table
• Buy from the bank only
• One player to a hand
• Show one, show all
• Cards speak
• Host decides disputes (backup: Sarah)

Start: 7:00 PM | Last buy-in: 9:00 PM | Hard stop: Midnight
Breaks every 90 min
📍 Mike's place — 123 Main St, Apt 4B
Street parking is free after 6 PM

Players (6 confirmed):
✓ Mike, Sarah, Dave, Tom, Jess, Marcus
? Alex (maybe)
```

#### Example: Tournament Output

```
POKER NIGHT — Sat, Feb 15

Tournament | $40 buy-in | 10,000 chips
Payout: 50% / 30% / 20%

Rebuys: 1 max, first 60 min, same as buy-in
Add-on: $20 for 5,000 chips at first break

Banker: Mike
Payment: Venmo
Settle up before you leave

House Rules:
• Verbal bets are binding
• No string bets
• Table stakes only
• One player to a hand
• Host decides disputes

Start: 7:00 PM | Hard stop: 11:00 PM
Breaks every 90 min
📍 Mike's place

Players (8 confirmed):
✓ Mike, Sarah, Dave, Tom, Jess, Marcus, Lisa, Ray
```

#### Example: Bounty Tournament Output

```
POKER NIGHT — Sat, Feb 15

Bounty Tournament | $40 buy-in ($10 bounty) | 10,000 chips
Payout: 50% / 30% / 20% (from $30/player prize pool)

No rebuys

Banker: Mike
Payment: Cash
Settle up before you leave

House Rules:
• Verbal bets are binding
• No string bets
• One player to a hand
• Host decides disputes

Start: 7:00 PM
📍 Mike's place — 123 Main St
```

### 2. Shareable Link (P0)

Encode the entire form state in the URL hash fragment using a compact scheme.

**Encoding scheme:**
1. Serialize all non-default field values into a flat key-value object.
2. JSON-stringify the object.
3. Compress using `btoa()` (base64) — no external compression library needed for V1.
4. Append as `#d=<base64string>` to the page URL.

**Example URL:**
```
https://chipsoffury.com/pre-game-checklist/#d=eyJmIjoiYyIsInNiIjo...
```

**Behavior when loading a URL with hash data:**
- Parse the hash, decode base64, parse JSON.
- Populate all form fields from the decoded state.
- Show a subtle banner: "Loaded from shared link. Edit anything to make it yours."

**Key shortening map** (to reduce URL length):
```
format       → f    (c/t/b)
sb           → sb
bb           → bb
buyin_min    → bm
buyin_max    → bx
tournament_buyin → tb
bounty_amount    → ba
starting_chips   → sc
rebuys_allowed   → ra  (1/0)
rebuys_max       → rm
rebuys_window    → rw
rebuys_amount    → ry  (s=same, number=custom)
rebuys_condition → rc  (m=below_min, a=anytime, f=felted)
addon_allowed    → aa  (1/0)
addon_amount     → ad
addon_chips      → ac
banker           → bk
payment_method   → pm  (comma-sep: c,v,z,a,o)
payment_other    → po
settle_policy    → sp  (l=before_leave, n=same_night, d=next_day)
rules_off        → ro  (comma-sep IDs of preset rules turned OFF from default-ON)
rules_on         → rn  (comma-sep IDs of preset rules turned ON from default-OFF)
custom_rules     → cr  (pipe-separated)
date             → dt
start_time       → st
last_buyin_time  → lt
hard_stop        → hs
break_schedule   → bs  (90/o/60/n)
location_name    → ln
location_address → la
notes            → nt
players          → pl  (name:status, pipe-separated; status: c/m/d/i)
payout           → py
starting_stack_bb → sk
```

**Only include keys whose values differ from defaults.** This keeps URLs short for typical configurations.

**URL length considerations:** Most chat apps and browsers support URLs up to ~2000 characters. A fully populated form with 10 players and 5 custom rules should stay under 1500 characters with this scheme. If the URL exceeds 2000 characters, show a warning: "Link is too long for some apps. Try removing custom rules or player names to shorten it."

### 3. Print-Friendly Version (P1)

A `@media print` stylesheet that:
- Removes the form UI, site header/footer, and interactive elements.
- Renders the same content as the clipboard text but in a styled, single-page layout.
- Uses the site's brand colors (dark green/gold palette from the chip calculator).
- Includes a small "Generated at chipsoffury.com/pre-game-checklist" footer.
- Triggered by a "Print" button that calls `window.print()`.

---

## Edge Cases

### Format Switching

| Scenario | Behavior |
|---|---|
| User fills out cash game fields, then switches to tournament | Cash-only fields are hidden but values are preserved in memory. If user switches back, values reappear. Tournament-specific fields appear with defaults. |
| User has rebuys ON with 2 max, switches rebuys OFF | Sub-fields hide. Values preserved. Toggling back restores them. |
| User switches from tournament to bounty | All tournament fields stay. Bounty amount field appears with default. |

### Validation

| Scenario | Behavior |
|---|---|
| Big blind <= small blind | Inline error: "Big blind must be greater than small blind." Prevent copy/share until fixed. |
| Min buy-in > max buy-in | Inline error: "Maximum buy-in must be at least the minimum." |
| Bounty >= tournament buy-in | Inline error: "Bounty must be less than the total buy-in." |
| Last buy-in time before start time | Inline error: "Last buy-in time must be after start time." |
| All house rules toggled off | Allowed — the House Rules section simply doesn't appear in output. |
| No fields filled except format | Allowed — output shows only the format line and defaults. Copy still works. |
| URL hash is corrupt or invalid | Silently ignore, load page with defaults. Console warning for debugging. |
| URL hash exceeds 2000 chars | Show warning banner with suggestion to shorten. Copy and share still work. |

### Empty/Optional Fields

| Field | If Empty |
|---|---|
| Banker name | Omit "Banker:" line from output |
| Location name/address | Omit location line from output |
| Notes | Omit notes line from output |
| Players | Omit entire Players section from output |
| Custom rules | Only show preset rules that are ON |
| Last buy-in time | Omit from the timing line |
| Hard stop time | Omit from the timing line |

### Currency Formatting

- Always display currency with a `$` prefix.
- Sub-dollar amounts: use cents format (`$0.25`) not fraction format.
- Amounts >= $1 with no cents: no decimal (`$50`, not `$50.00`).
- Amounts >= $1 with cents: show two decimals (`$1.50`).
- Thousands: use comma separator (`$1,000`).

---

## Out of Scope

These are explicitly NOT part of this tool:

1. **Tournament clock/timer** — Existing tools (Poker Timer, HPTM, Blind Valet) do this well. We are pre-game only.
2. **End-of-night settlement calculator** — PokerSplit and similar tools handle this. Different problem space.
3. **Bankroll tracking** — Player-facing, session-over-session feature. Not a pre-game concern.
4. **User accounts or authentication** — All state is client-side (URL hash, localStorage). No backend, no database.
5. **Real-time RSVP / live updates** — The player list is a local planning tool for the host, not a shared live document.
6. **Payment processing** — We link to Venmo/Zelle/CashApp but do not integrate with them.
7. **Multi-table support** — Designed for a single-table home game (2–10 players).
8. **Chip denomination/distribution** — The existing chip distribution calculator handles this. P2 integration will deep-link to it.
9. **Game variant selection** — (Hold'em, Omaha, dealer's choice, etc.) Most home games are Hold'em. Variant selection adds complexity for minimal value. Hosts can add variant info via the Notes field or a custom rule.

---

## Interaction Notes

### Section Collapse/Expand

Each section (Stakes, Rebuys, Money, House Rules, Logistics, Players) is a collapsible card. All sections start expanded on desktop, collapsed on mobile except Game Format and Stakes. A completed section shows a green checkmark and a one-line summary when collapsed (e.g., "Cash game | $0.25/$0.50 | $20–$100 buy-in").

### Format-Conditional Field Visibility

| Section / Field | Cash | Tournament | Bounty |
|---|---|---|---|
| Small blind / Big blind | Show | Hide | Hide |
| Min / Max buy-in | Show | Hide | Hide |
| Starting stack (BB select) | Show | Hide | Hide |
| Tournament buy-in | Hide | Show | Show |
| Bounty amount | Hide | Hide | Show |
| Starting chips | Hide | Show | Show |
| Payout structure | Hide | Show | Show |
| Rebuy condition | Show | Hide | Hide |
| Add-on allowed/amount/chips | Hide | Show | Show |
| Blind schedule (P1) | Hide | Show | Show |
| Run it twice rule | Show | Hide | Hide |
| Bomb pots rule | Show | Hide | Hide |
| 7-2 game rule | Show | Hide | Hide |

### Output Panel

The output panel is a sticky sidebar on desktop (right side) and a fixed bottom bar on mobile with a "Copy" button. The panel shows a live-updating preview of the formatted text as the user fills in the form. This provides instant feedback and lets the host see exactly what their group chat message will look like.

**Buttons in the output panel:**
- "Copy to clipboard" (primary, prominent) — copies text, shows "Copied!" confirmation for 2 seconds.
- "Share link" (secondary) — generates URL with hash, copies to clipboard, shows "Link copied!" confirmation.
- "Print" (tertiary, P1) — triggers `window.print()`.

### Mobile Considerations

- Form is single-column on mobile.
- Output preview is hidden behind a "Preview" toggle or bottom sheet on mobile to save screen space.
- Copy button is always visible in a fixed bottom bar.
- Touch targets are minimum 44x44px.
- No horizontal scrolling.

### Accessibility

- All form fields have associated `<label>` elements.
- Toggle switches use `role="switch"` with `aria-checked`.
- Error messages are associated with fields via `aria-describedby`.
- Color is not the only indicator of state (icons + text accompany color changes).
- Keyboard navigable: tab order follows visual order, Enter/Space toggles switches.
- Copy confirmation is announced via `aria-live="polite"` region.

### Performance

- No external JS dependencies. Vanilla JS only (consistent with chip distribution calculator).
- No framework. DOM manipulation via vanilla JS.
- CSS via Tailwind utilities and semantic classes in `tailwind-full.css`.
- Total JS budget: < 15 KB minified.
- Page should score 95+ on Lighthouse performance.

### SEO

- Page title: "Free Poker Pre-Game Checklist Generator | Chips of Fury"
- Meta description: "Generate a shareable poker night checklist in seconds. Set stakes, buy-in, rebuys, house rules, and logistics — then copy-paste it into your group chat."
- H1: "Pre-Game Checklist Generator"
- Internal links to learn/0017 (buy-ins guide) and learn/0018 (house rules guide) from inline explainers.
- Structured data: `WebApplication` schema with `applicationCategory: "GameApplication"`.
