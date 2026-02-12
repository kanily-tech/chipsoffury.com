# Pre-Game Checklist Tool: UI/UX Design Specification

---

## Layout Approach and Rationale

### Decision: Single scrolling page with collapsible accordion sections

**Not a stepped wizard.** Rationale:

1. **Consistency with chip calculator.** The chip distribution calculator is a single-page scroll tool. Hosts arriving from that tool expect the same pattern. A wizard would feel like a different product.

2. **Non-linear editing.** Hosts frequently jump between sections — changing the buy-in after adjusting rebuys, or going back to format after reviewing house rules. A wizard forces linear navigation. An accordion lets hosts click any section header at any time.

3. **Mobile scan-ability.** Research shows hosts send game details from their phone, often mid-commute. Collapsed section headers with one-line summaries act as a table of contents. The host can scan the full form state at a glance without scrolling through every field, then tap to expand only the section they need.

4. **Form fatigue mitigation.** Six sections with 30+ fields is overwhelming if shown at once. Accordion sections solve this by showing one expanded section at a time (on mobile) or two–three on desktop, while collapsed sections display their summary as a mini-confirmation ("Cash game | $0.25/$0.50 | $20–$100 buy-in").

5. **Output always visible.** A sticky output panel (sidebar on desktop, bottom bar on mobile) provides continuous feedback. This would be impossible in a wizard where each step takes the full viewport.

### Page Structure (top to bottom)

```
[Dark Hero — same pattern as chip calculator]
  Eyebrow: "Free Tool"
  H1: "Pre-Game Checklist Generator"
  Steps: 1. Pick format  2. Fill in details  3. Copy to group chat
  CTA: "Start Building" (scrolls to #checklist)

[Light Tool Section — #checklist]
  [Format Selector — always visible, not collapsible]
  [Accordion Section: Stakes & Buy-in]
  [Accordion Section: Rebuys]
  [Accordion Section: Money]
  [Accordion Section: House Rules]
  [Accordion Section: Logistics]

  [Output Panel — sticky sidebar on desktop, bottom sheet on mobile]
```

---

## Component Inventory

### 1. Hero Section

Reuse the exact `cof-lp-hero` pattern from the chip calculator:

- **Eyebrow label**: "Free Tool" — gold (#BFA24E), 0.78rem, 700 weight, 0.14em letter-spacing, uppercase, with leading dash decoration
- **H1**: "Pre-Game Checklist Generator" — var(--font-heading), clamp(2.2rem, 5.5vw, 3.6rem), 800 weight, -0.03em tracking, #F2EFE8
- **Steps list**: Ordered list with gold-bordered number circles (1.55rem diameter), #8FA894 text, #D6D1C4 bold
  - 1: **Pick your format** — cash game, tournament, or bounty
  - 2: **Fill in the details** — stakes, rebuys, house rules, logistics
  - 3: **Copy and share** — paste into your group chat
- **Subtitle/note**: "The URL saves your setup so you can reuse it next session." — 0.88rem, #6B7E6F
- **CTA button**: "Start Building" — #BFA24E bg, #091A12 text, 0.85rem 1.7rem padding, 10px radius, var(--font-heading)
- **Decorative circles**: Same `cof-lp-deco` pattern (gold-bordered circles at varying sizes/opacities)
- **Background**: #091A12 with radial-gradient accent

### 2. Format Selector (Always Visible)

A segmented control (not radio buttons) centered at the top of the form area. This is the master control that drives conditional visibility for all sections below.

- **Container**: Inline-flex, centered, border-radius 12px, border 1px solid #d7deea, background #f8fafc, padding 4px
- **Segments**: Three buttons — "Cash Game", "Tournament", "Bounty Tournament"
  - **Inactive**: transparent bg, #475569 text, 0.875rem, 600 weight, padding 0.5rem 1.25rem, border-radius 8px
  - **Active**: #fff bg, #0f172a text, 700 weight, box-shadow 0 1px 3px rgba(15,23,42,0.1), border 1px solid #d7deea
  - **Hover (inactive)**: background #f1f5f9
  - **Transition**: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease

Mobile: Full-width, segments share equal width via flex: 1. Font-size drops to 0.8rem. Padding drops to 0.4rem 0.5rem.

### 3. Accordion Section (Repeated x5)

Each form section uses this collapsible card pattern.

- **Outer container**: border 1px solid #dbe4f0, border-radius 12px, background #fff, margin-bottom 0.75rem, overflow hidden
- **Header (clickable)**: display flex, justify-content space-between, align-items center, padding 0.85rem 1rem, cursor pointer
  - **Left side**:
    - Section number badge: 1.4rem circle, border 1.5px solid rgba(15,118,110,0.3), color #0f766e, font-size 0.7rem, font-weight 700, margin-right 0.65rem
    - Section title: font-size 0.95rem, font-weight 700, color #1e293b
    - Summary text (when collapsed + has values): font-size 0.8rem, color #64748b, margin-left 0.5rem, truncated with ellipsis at 1 line
  - **Right side**:
    - Completion indicator (when section has valid data): 1.2rem circle, #ecfdf5 bg, #0f766e checkmark icon
    - Chevron: 1rem svg, #94a3b8, rotates 180deg when expanded, transition transform 0.2s ease
- **Header hover**: background #fafbfc
- **Body**: padding 0 1rem 1rem 1rem, overflow hidden
  - **Collapsed**: max-height 0, opacity 0, padding-bottom 0, transition max-height 0.25s ease, opacity 0.15s ease
  - **Expanded**: max-height 800px (generous upper bound), opacity 1, padding-bottom 1rem

**Mobile behavior**: Only one section expanded at a time. Tapping a new section collapses the current one. Desktop: Multiple sections can be open simultaneously.

### 4. Form Fields

#### 4a. Text Input
- **Label**: 0.875rem, #64748b, 700 weight, margin-bottom 0.2rem
- **Input**: border 1px solid #d7deea, border-radius 8px, background #fff, color #0f172a, padding 0.5rem 0.6rem, font-size 1rem, width 100%
- **Placeholder**: color #94a3b8
- **Focus**: border-color #0f766e, box-shadow 0 0 0 3px rgba(15,118,110,0.1), outline none
- **Error**: border-color #fca5a5, box-shadow 0 0 0 3px rgba(239,68,68,0.1)
- **Error message**: font-size 0.8rem, color #dc2626, margin-top 0.2rem, display flex, gap 0.25rem (with warning icon)
- **Helper text**: font-size 0.8rem, color #94a3b8, margin-top 0.2rem

#### 4b. Number Input (Currency)
Same as text input but with:
- **Prefix**: "$" symbol, inline, color #64748b, padding-left 0.6rem, position absolute inside input wrapper
- **Input padding-left**: 1.4rem (to accommodate "$")
- **-moz-appearance**: textfield (hide spin buttons, same as chip calculator)
- **font-variant-numeric**: tabular-nums

#### 4c. Select Dropdown
- **Same border/focus states as text input**
- **Appearance**: none (custom chevron via background SVG)
- **Background-image**: url(chevron-down svg), positioned right 0.6rem center, 0.75rem width
- **Padding-right**: 2rem (accommodate chevron)

#### 4d. Toggle Switch
Used for: Rebuys allowed, Add-on allowed, each house rule.
- **Track**: 2.5rem width, 1.4rem height, border-radius 999px, background #d1d5db (off) / #0f766e (on), transition background 0.2s ease
- **Knob**: 1.1rem circle, background #fff, box-shadow 0 1px 3px rgba(0,0,0,0.15), translate 0.15rem (off) / 1.25rem (on), transition transform 0.2s ease
- **Label**: inline, margin-left 0.5rem, font-size 0.875rem, color #334155, 600 weight
- **Accessibility**: role="switch", aria-checked, keyboard Space/Enter toggle
- **Focus**: box-shadow 0 0 0 3px rgba(15,118,110,0.2) on track

#### 4e. Multi-Select Chips (Payment Method)
Used for payment methods where multiple can be selected.
- **Container**: display flex, flex-wrap wrap, gap 0.4rem
- **Chip (unselected)**: border 1px solid #d7deea, background #f8fafc, color #475569, border-radius 999px, padding 0.3rem 0.75rem, font-size 0.875rem, 600 weight, cursor pointer
- **Chip (selected)**: border-color #0f766e, background #ecfdf5, color #0f766e, font-weight 700
- **Chip hover**: background #f1f5f9 (unselected), background #d1fae5 (selected)
- **Chip icon**: Small checkmark prepended when selected, 0.75rem

#### 4f. Time Picker
Native `<input type="time">` with same styling as text input. On mobile, this invokes the native time picker UI. On desktop, it shows the standard time input.

#### 4g. Date Picker
Native `<input type="date">` with same styling as text input.

#### 4h. Textarea
Same styling as text input, but:
- **Min-height**: 4rem
- **Resize**: vertical
- **Max-height**: 8rem

#### 4i. Repeatable Row (Custom Rules, Players)
- **Container**: display grid, gap 0.4rem
- **Row**: display flex, gap 0.4rem, align-items center
  - Text input (flex: 1)
  - Remove button: 1.75rem circle, border 1px solid #fed7aa, background #fff, color #c2410c, "X" icon, hover border-color #fdba74
- **Add button**: full-width, border 1px dashed #bac8dd, border-radius 10px, background #f8fbff, color #334155, font-size 0.875rem, 700 weight, padding 0.55rem, cursor pointer, hover background #f1f5f9
- **Max items text**: font-size 0.75rem, color #94a3b8, when near limit: color #dc2626

### 5. Output Panel

#### Desktop (>= 1024px): Sticky Sidebar

- **Layout**: CSS Grid, 2 columns — form area (minmax(0, 1fr)) | output panel (22rem)
- **Panel position**: position sticky, top 1.5rem, align-self start
- **Panel container**: border 1px solid #dbe4f0, border-radius 12px, background #fff, box-shadow 0 4px 16px rgba(15,23,42,0.06), overflow hidden
- **Panel header**: background #f8fafc, padding 0.75rem 1rem, border-bottom 1px solid #eef2f7
  - Title: "Preview" — font-size 0.875rem, 700 weight, #334155
  - Subtitle: "What your group chat will see" — font-size 0.75rem, #94a3b8
- **Preview body**: padding 1rem, max-height calc(100vh - 16rem), overflow-y auto
  - Text content: font-family monospace, font-size 0.8rem, color #1e293b, line-height 1.55, white-space pre-wrap
  - Empty state: centered, font-size 0.875rem, color #94a3b8, italic: "Pick a format to see your game summary here."
- **Action bar**: padding 0.75rem 1rem, border-top 1px solid #eef2f7, display grid, gap 0.5rem
  - Copy button (primary): full-width, background #0f766e, color #fff, font-size 0.875rem, 700 weight, border-radius 8px, padding 0.6rem, hover background #0d6357
  - Share link button (secondary): full-width, border 1px solid #d7deea, background #fff, color #334155, font-size 0.875rem, 700 weight, border-radius 8px, padding 0.5rem, hover background #f8fafc
  - Print button (tertiary, P1): same as share link but with printer icon

#### Mobile (< 1024px): Fixed Bottom Bar + Expandable Preview

- **Fixed bottom bar**: position fixed, bottom 0, left 0, right 0, z-index 50, background #fff, border-top 1px solid #dbe4f0, box-shadow 0 -4px 16px rgba(15,23,42,0.08), padding 0.75rem 1rem
- **Bar layout**: display flex, gap 0.5rem
  - Preview toggle button: flex-shrink 0, border 1px solid #d7deea, background #f8fafc, color #475569, border-radius 8px, padding 0.5rem 0.75rem, font-size 0.875rem
    - Shows "Preview" when collapsed, "Close" when expanded
    - Badge: character count or line count indicator
  - Copy button: flex 1, same as desktop primary
  - Share button: flex-shrink 0, icon-only (link icon), same size as preview toggle
- **Expanded preview (bottom sheet)**:
  - Slides up from bottom bar, max-height 60vh, border-radius 16px 16px 0 0
  - Drag handle: 2rem wide, 0.25rem height, border-radius 999px, background #d1d5db, centered, margin 0.5rem auto
  - Preview content: same styling as desktop preview body
  - Backdrop: rgba(0,0,0,0.3), tap to close
- **Page padding-bottom**: 5rem (to prevent content hidden behind fixed bar)

### 6. Shared-Link Banner

Displayed when the page loads with `#d=...` hash data.

- **Container**: background #ede9fe, border 1px solid #c4b5fd, border-radius 10px, padding 0.65rem 1rem, margin-bottom 0.75rem, display flex, align-items center, gap 0.5rem
- **Icon**: link icon, color #7c3aed, 1rem
- **Text**: "Loaded from a shared link. Edit anything to make it yours." — font-size 0.875rem, color #5b21b6
- **Dismiss button**: 1.25rem circle, color #7c3aed, hover background rgba(124,58,237,0.1), "X"

### 7. Copy Confirmation Toast

- **Container**: position fixed, top 1.5rem, left 50%, transform translateX(-50%), z-index 100
- **Style**: background #0f766e, color #fff, border-radius 10px, padding 0.6rem 1.2rem, font-size 0.875rem, 700 weight, box-shadow 0 10px 24px rgba(15,23,42,0.2)
- **Animation**: fade in + translateY(-8px) to translateY(0) over 0.2s, hold 2s, fade out + translateY(-8px) over 0.2s
- **Icon**: checkmark before text

---

## Responsive Breakpoints

### Mobile: < 640px
- Single column layout, full width
- Format selector: full width, equal segments
- Accordion: only one section open at a time
- Output: fixed bottom bar with expandable bottom sheet
- Form padding: 0.75rem 1rem
- Section fields: single column grid
- Touch targets: minimum 44x44px
- Font sizes: labels at 0.8rem, inputs at 1rem (16px to prevent iOS zoom)

### Tablet: 640px – 1023px
- Single column layout, max-width 40rem, centered
- Format selector: centered, auto-width
- Accordion: multiple sections can be open
- Output: same bottom bar approach as mobile (sidebar would be too cramped)
- Form padding: 1rem 1.25rem
- Section fields: 2-column grid for short fields (blinds SB/BB side by side, buy-in min/max side by side)

### Desktop: >= 1024px
- Two-column CSS Grid layout: form (1fr) | output panel (22rem)
- Max-width: 64rem (form + panel), centered
- Format selector: centered, auto-width
- Accordion: multiple sections can be open, all start expanded
- Output: sticky sidebar
- Form padding: 1rem 1.25rem
- Section fields: 2-column grid where appropriate

### Large Desktop: >= 1280px
- Same as desktop, output panel widens to 24rem
- Max-width: 72rem

---

## Color, Typography, and Spacing Tokens

### Colors (referencing existing site values)

| Token | Value | Usage |
|-------|-------|-------|
| Hero background | `#091A12` | Dark green hero section |
| Gold accent | `#BFA24E` | Eyebrow, CTA, decorative elements |
| Gold hover | `#CEAF5C` | CTA hover state |
| Cream text | `#F2EFE8` | Hero heading text |
| Muted hero text | `#8FA894` | Hero subtitle and steps |
| Tool background | `#EEEDEA` | Light section behind the form |
| Form panel bg | `#ffffff` | Card/panel backgrounds |
| Ink (primary text) | `#0f172a` | Headings, active tabs, input text |
| Secondary text | `#475569` | Labels, descriptions |
| Muted text | `#64748b` | Placeholder, helper text |
| Light muted | `#94a3b8` | Disabled text, empty states |
| Border | `#d7deea` | Input borders, card borders |
| Border light | `#eef2f7` | Dividers, subtle separators |
| Accent green | `#0f766e` | Active states, toggle on, focus rings, primary button |
| Accent green soft | `#ecfdf5` | Active backgrounds, completion indicators |
| Accent green hover | `#0d6357` | Primary button hover |
| Danger | `#dc2626` | Error text, validation |
| Danger soft | `#fff1f2` | Error backgrounds |
| Warning | `#92400e` | Warning text |
| Warning soft | `#fffbeb` | Warning backgrounds |
| Purple (link banner) | `#7c3aed` | Shared link UI accent |

### Typography

| Element | Font Family | Size | Weight | Tracking |
|---------|-------------|------|--------|----------|
| Hero H1 | var(--font-heading) [Poppins] | clamp(2.2rem, 5.5vw, 3.6rem) | 800 | -0.03em |
| Hero eyebrow | system (Inter) | 0.78rem | 700 | 0.14em |
| Hero steps | system (Inter) | 1rem | 400/600 | normal |
| Section heading | var(--font-heading) | 0.95rem | 700 | normal |
| Form label | system (Inter) | 0.875rem | 700 | normal |
| Form input | system (Inter) | 1rem | 400 | normal |
| Helper text | system (Inter) | 0.8rem | 400 | normal |
| Toggle label | system (Inter) | 0.875rem | 600 | normal |
| Section summary | system (Inter) | 0.8rem | 400 | normal |
| Preview text | monospace | 0.8rem | 400 | normal |
| Button text | system (Inter) | 0.875rem | 700 | normal |
| Chip text | system (Inter) | 0.875rem | 600/700 | normal |

### Spacing Scale

Uses the same 0.25rem base (4px) as the chip calculator:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem (4px) | Tight gaps, icon margins |
| sm | 0.5rem (8px) | Input padding, small gaps |
| md | 0.75rem (12px) | Section gaps, panel padding |
| lg | 1rem (16px) | Section body padding |
| xl | 1.5rem (24px) | Between sections |
| 2xl | 2rem (32px) | Hero content spacing |
| 3xl | 3rem (48px) | Hero section vertical padding |

---

## Interaction States

### Text Input / Number Input / Textarea / Select
| State | Border | Background | Shadow | Text Color |
|-------|--------|------------|--------|------------|
| Default | #d7deea | #fff | none | #0f172a |
| Hover | #b0c4c0 | #fff | none | #0f172a |
| Focus | #0f766e | #fff | 0 0 0 3px rgba(15,118,110,0.1) | #0f172a |
| Error | #fca5a5 | #fff1f2 | 0 0 0 3px rgba(239,68,68,0.1) | #0f172a |
| Disabled | #e2e8f0 | #f8fafc | none | #94a3b8 |

### Toggle Switch
| State | Track | Knob |
|-------|-------|------|
| Off | #d1d5db | #fff at left (translateX 0.15rem) |
| On | #0f766e | #fff at right (translateX 1.25rem) |
| Focus | + box-shadow 0 0 0 3px rgba(15,118,110,0.2) on track | — |
| Disabled off | #e2e8f0 | #f8fafc |
| Disabled on | #86cfc4 | #f8fafc |

### Multi-Select Chip
| State | Border | Background | Text |
|-------|--------|------------|------|
| Unselected | #d7deea | #f8fafc | #475569 |
| Unselected hover | #b0c4c0 | #f1f5f9 | #475569 |
| Selected | #0f766e | #ecfdf5 | #0f766e |
| Selected hover | #0d6357 | #d1fae5 | #0d6357 |
| Focus | + box-shadow 0 0 0 2px rgba(15,118,110,0.2) | — | — |

### Segmented Control (Format Selector)
| State | Border | Background | Text | Shadow |
|-------|--------|------------|------|--------|
| Inactive | transparent | transparent | #475569 | none |
| Inactive hover | transparent | #f1f5f9 | #334155 | none |
| Active | 1px solid #d7deea | #fff | #0f172a | 0 1px 3px rgba(15,23,42,0.1) |
| Focus | — | — | — | 0 0 0 2px rgba(15,118,110,0.2) |

### Accordion Header
| State | Background | Chevron |
|-------|------------|---------|
| Collapsed | transparent | pointing right (0deg) |
| Collapsed hover | #fafbfc | — |
| Expanded | transparent | pointing down (180deg) |
| Expanded hover | #fafbfc | — |

### Primary Button (Copy)
| State | Background | Text | Shadow |
|-------|------------|------|--------|
| Default | #0f766e | #fff | none |
| Hover | #0d6357 | #fff | 0 2px 8px rgba(15,118,110,0.3) |
| Active | #0a5048 | #fff | none |
| Disabled | #86cfc4 | #fff | none |
| Success (after copy) | #166534 | #fff | none, text changes to "Copied!" with checkmark |

### Secondary Button (Share Link)
| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | #d7deea | #fff | #334155 |
| Hover | #b0c4c0 | #f8fafc | #0f172a |
| Active | #0f766e | #ecfdf5 | #0f766e |
| Success | #7c3aed | #ede9fe | #5b21b6, text "Link Copied!" |

---

## Animation Specs

### Hero Entry
Same as chip calculator `cof-lp-up` keyframes:
```css
@keyframes cof-lp-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- Duration: 0.55s ease-out
- Stagger: 0.08s per child element (eyebrow, h1, steps, note, CTA)

### Format Selector Transition
When switching between Cash/Tournament/Bounty:
- Active indicator slides via transform: translateX. Use a shared underline/background element that moves, not three separate backgrounds toggling.
- Duration: 0.15s ease
- Field visibility change: **No animation on field show/hide** — instant swap. Animated field transitions cause layout shifts that feel janky on mobile forms. The accordion sections handle progressive disclosure; within a section, fields just appear/disappear.

### Accordion Expand/Collapse
```css
.section-body {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.2s ease;
}
.section-body.is-expanded {
  max-height: 800px; /* generous, actual height is auto */
  opacity: 1;
}
```
- Chevron rotation: `transition: transform 0.2s ease;`
- Summary text: fades in when collapsed, fades out when expanding — `transition: opacity 0.15s ease;`

### Copy/Share Confirmation Toast
```css
@keyframes toast-in {
  from { opacity: 0; transform: translate(-50%, -8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
@keyframes toast-out {
  from { opacity: 1; transform: translate(-50%, 0); }
  to { opacity: 0; transform: translate(-50%, -8px); }
}
```
- Enter: 0.2s ease-out
- Hold: 2s
- Exit: 0.2s ease-in
- Total lifecycle: 2.4s

### Mobile Bottom Sheet
```css
.preview-sheet {
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.preview-sheet.is-open {
  transform: translateY(0);
}
```
- Backdrop: opacity 0 to 0.3 over 0.2s

### Toggle Switch
- Track color: `transition: background 0.2s ease;`
- Knob position: `transition: transform 0.2s ease;`

### Scroll-to-section (when tapping collapsed section to expand)
- Browser smooth scroll: `scroll-behavior: smooth;` (already set in tailwind-full.css)
- Offset: `scroll-margin-top: 1rem;` on each section

---

## ASCII Wireframes

### Desktop Layout (>= 1024px)

```
+------------------------------------------------------------------+
|                        DARK HERO (#091A12)                        |
|                                                                    |
|   ── Free Tool                                                     |
|   Pre-Game Checklist Generator                                     |
|   (1) Pick your format                                             |
|   (2) Fill in the details                                          |
|   (3) Copy and share                                               |
|   URL saves your setup for next session.                           |
|   [ Start Building v ]                                             |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|  Light Background (#EEEDEA)                                        |
|  +------------------------------------------+  +--------------+   |
|  |      [ Cash Game | Tournament | Bounty ] |  |   PREVIEW    |   |
|  |                                          |  |              |   |
|  |  +--------------------------------------+|  | POKER NIGHT  |   |
|  |  | (1) Stakes & Buy-in         [v] [x]  ||  | — Sat Feb 15 |   |
|  |  |   Cash | $0.25/$0.50 | $20-$100      ||  |              |   |
|  |  +--------------------------------------+|  | Cash Game    |   |
|  |                                          |  | $0.25/$0.50  |   |
|  |  +--------------------------------------+|  | Buy-in:      |   |
|  |  | (2) Rebuys                   [>] [ ]  ||  | $20-$100     |   |
|  |  |   1 max, first 90 min                ||  |              |   |
|  |  +--------------------------------------+|  | ...          |   |
|  |                                          |  |              |   |
|  |  +--------------------------------------+|  |--------------+   |
|  |  | (3) Money                    [>] [ ]  ||  | What your    |   |
|  |  +--------------------------------------+|  | group chat   |   |
|  |                                          |  | will see     |   |
|  |  +--------------------------------------+|  |--------------+   |
|  |  | (4) House Rules              [>] [ ]  ||  |[Copy to      |   |
|  |  +--------------------------------------+|  | Clipboard]   |   |
|  |                                          |  |[Share Link]  |   |
|  |  +--------------------------------------+|  |[Print]       |   |
|  |  | (5) Logistics                [>] [ ]  ||  +--------------+   |
|  |  +--------------------------------------+|                      |
|  +------------------------------------------+                      |
+------------------------------------------------------------------+
```

### Desktop: Expanded Section Detail

```
+----------------------------------------------+
| (2) Rebuys                         [v] [check]|
|----------------------------------------------|
|                                               |
|  Rebuys allowed          [===O]  (toggle ON)  |
|                                               |
|  +-----------+  +------------------+          |
|  | Max rebuys|  | Rebuy window     |          |
|  | [  1    ] |  | [  90  ] min     |          |
|  +-----------+  +------------------+          |
|                                               |
|  Rebuy amount                                 |
|  [v Same as initial buy-in          ]         |
|                                               |
|  Rebuy condition (cash only)                  |
|  [v Below minimum buy-in            ]         |
|                                               |
|  Add-on allowed          [ O===]  (toggle OFF)|
|                                               |
+----------------------------------------------+
```

### Desktop: House Rules Section (Expanded)

```
+----------------------------------------------+
| (4) House Rules                    [v] [check]|
|----------------------------------------------|
|                                               |
|  [===O] Verbal bets are binding               |
|  [===O] No string betting                     |
|  [ O==] Single chip without decl. = call      |
|  [===O] Table stakes only                     |
|  [===O] No going south                        |
|  [===O] No lending or credit                  |
|  [===O] Buy from bank only                    |
|  [===O] One player to a hand                  |
|  [===O] Show one, show all                    |
|  [===O] Cards speak                           |
|  [ O==] Phones down in hand                   |
|  [ O==] Food off the felt                     |
|  [===O] Host decides disputes                 |
|  [ O==] Two decks with different backs        |
|  [ O==] Run it twice allowed     (cash only)  |
|  [ O==] Bomb pots every orbit    (cash only)  |
|  [ O==] 7-2 game                 (cash only)  |
|                                               |
|  CUSTOM RULES                                 |
|  +----------------------------------+ [x]     |
|  | No rabbit hunting                |         |
|  +----------------------------------+ [x]     |
|  | Straddles allowed UTG only       |         |
|  +----------------------------------+         |
|  [ + Add custom rule ........................]|
|                                               |
+----------------------------------------------+
```

### Mobile Layout (< 640px)

```
+---------------------------+
|     DARK HERO (#091A12)   |
|                           |
|  ── Free Tool             |
|  Pre-Game Checklist       |
|  Generator                |
|  (1) Pick your format     |
|  (2) Fill in details      |
|  (3) Copy and share       |
|  [ Start Building v ]     |
+---------------------------+

+---------------------------+
|  +-----+-------+-------+ |
|  |Cash | Tourn | Bounty| |
|  +-----+-------+-------+ |
|                           |
|  +---------------------+  |
|  |(1) Stakes & Buy-in  |  |
|  |  $0.25/$0.50, $20-  |  |
|  |  $100           [v] |  |
|  |                      | |
|  | Small blind          | |
|  | [$ 0.25         ]    | |
|  |                      | |
|  | Big blind            | |
|  | [$ 0.50         ]    | |
|  |                      | |
|  | Min buy-in           | |
|  | [$ 20           ]    | |
|  |                      | |
|  | Max buy-in           | |
|  | [$ 100          ]    | |
|  |                      | |
|  | Starting stack       | |
|  | [v 100 BB       ]    | |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  |(2) Rebuys       [>] |  |
|  |  1 max, 90 min      |  |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  |(3) Money        [>] |  |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  |(4) House Rules  [>] |  |
|  +---------------------+  |
|                           |
|  +---------------------+  |
|  |(5) Logistics    [>] |  |
|  +---------------------+  |
|                           |
|  (padding for bottom bar) |
|                           |
+=====FIXED BOTTOM BAR======+
| [Preview] [  Copy  ] [Lnk]|
+===========================+
```

### Mobile: Bottom Sheet Preview (Expanded)

```
+---------------------------+
|                           |
| (dimmed form content)     |
|                           |
+===========================+
|        ____               |  <-- drag handle
|                           |
| POKER NIGHT -- Sat Feb 15 |
|                           |
| Cash Game | $0.25/$0.50   |
| Buy-in: $20-$100         |
| (100 BB starting stack)   |
|                           |
| Rebuys: 1 max, first     |
| 90 min, same as buy-in   |
|                           |
| Banker: Mike              |
| Payment: Venmo, Cash      |
| Settle before you leave   |
|                           |
| House Rules:              |
| - Verbal bets binding     |
| - No string bets          |
| - Table stakes only       |
| ...                       |
+===========================+
| [Close]  [  Copy  ] [Lnk] |
+===========================+
```

---

## Output Panel Design

### Preview Rendering

The preview panel renders live as the host fills in fields. The text follows the exact output format from the spec (plain text optimized for group chats).

**Rendering rules:**
- Update on every `input`, `change`, or toggle event (debounced at 100ms for text inputs)
- Omit lines for empty/default-off fields (per spec)
- Use monospace font to approximate how the text will look in chat apps
- Soft word-wrap at panel width (no horizontal scroll)

**Visual treatment of the preview text:**
- Background: #f9fafb (very subtle gray)
- Padding: 1rem
- Border-radius: 8px (inside the panel body)
- Font: `"SF Mono", "Cascadia Code", "Consolas", monospace`
- Font-size: 0.8rem
- Line-height: 1.55
- Color: #1e293b

**Section headers in preview** (e.g., "POKER NIGHT", "House Rules:"):
- Same monospace font
- All-caps styling comes from the generated text itself, not CSS
- No special visual treatment — the preview is a plain text representation

### Empty State

When no meaningful data has been entered (just defaults), show:

```
+-------------------------------+
|                               |
|     [clipboard icon]          |
|                               |
|  Pick a format above to       |
|  start building your          |
|  game summary.                |
|                               |
+-------------------------------+
```

- Icon: 2rem, color #d1d5db
- Text: font-size 0.875rem, color #94a3b8, text-align center, line-height 1.5

### Action Buttons

Arranged vertically in the sidebar action bar, full-width:

**1. Copy to Clipboard (Primary)**
- Full-width, #0f766e bg, #fff text, border-radius 8px, padding 0.6rem
- Icon: clipboard icon before text
- Success state: background #166534, text "Copied!" with checkmark icon, reverts after 2s
- Uses `navigator.clipboard.writeText()` with fallback to `document.execCommand('copy')`

**2. Share Link (Secondary)**
- Full-width, #fff bg, #334155 text, border 1px solid #d7deea, border-radius 8px, padding 0.5rem
- Icon: link icon before text
- Success state: border-color #7c3aed, background #ede9fe, text "Link Copied!" color #5b21b6, reverts after 2s
- Generates URL hash, copies to clipboard

**3. Print (Tertiary, P1)**
- Same styling as share link
- Icon: printer icon before text
- Triggers `window.print()`

### URL Length Warning

When the generated shareable URL exceeds 2000 characters:

- **Container**: background #fffbeb, border 1px solid #f5dd9b, border-radius 8px, padding 0.5rem 0.75rem, margin-top 0.5rem
- **Text**: font-size 0.8rem, color #92400e
- **Message**: "Link may be too long for some apps. Try removing custom rules or player names."
- **Icon**: warning triangle, 0.875rem, color #92400e

---

## Print Stylesheet (P1)

```css
@media print {
  /* Hide everything except the output text */
  .cof-hero, .cof-format-selector, .cof-accordion,
  .cof-output-actions, .cof-bottom-bar, nav, footer,
  .cof-shared-banner { display: none !important; }

  /* Show the preview content full-page */
  .cof-output-panel {
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    border: none !important;
    box-shadow: none !important;
  }

  .cof-output-preview {
    font-size: 11pt;
    color: #000;
    line-height: 1.6;
  }

  /* Add branding footer */
  .cof-output-panel::after {
    content: "Generated at chipsoffury.com/pre-game-checklist";
    display: block;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    font-size: 9pt;
    color: #999;
    text-align: center;
  }
}
```

---

## Accessibility Summary

- All inputs have explicit `<label>` elements with `for` attributes
- Toggle switches: `<button role="switch" aria-checked="true/false">`
- Error messages linked via `aria-describedby` on the input
- Accordion sections: `<button aria-expanded="true/false">` on headers, `aria-controls` pointing to the body `id`
- Format selector: `role="radiogroup"` on container, `role="radio"` + `aria-checked` on each segment
- Copy/share confirmation: `<div aria-live="polite">` region
- Focus management: after toggling accordion, focus stays on the header button
- Tab order: follows visual order (format selector -> section 1 header -> section 1 fields -> section 2 header -> ...)
- Color contrast: all text/background combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables hero animations, accordion uses instant show/hide
