# Poker Table Animation Widget

Animated poker table widget for blog posts, based on the Flutter app's `InstructionalTable` component.

## Files

| File | Purpose |
|------|---------|
| `_includes/components/poker-table-holdem.webc` | WebC component with HTML + JS |
| `css/tailwind-full.css` | CSS classes (`.poker-table-*`, `.poker-card-*`) |
| `_includes/layouts/pillar-post.html` | Loads anime.js CDN |

## Architecture

### HTML Structure

```
poker-table-container
├── poker-table-extended (green table with gold border)
│   ├── community-cards wrapper
│   │   ├── poker-card[data-card="0..4"]  (5 community cards)
│   │   └── "COMMUNITY" label
│   ├── divider
│   └── hole-cards wrapper
│       ├── poker-card[data-hole="0..1"]  (2 hole cards)
│       └── "YOUR HAND" label
└── validation-badge ("✓ Allowed")
```

### JavaScript Animation Controller

The animation uses a **declarative step-based approach** (mirroring Flutter's `InstructionalAnimationSequence`):

```javascript
const steps = [
  { community: [], hole: [], duration: 400, showBadge: false },      // Reset
  { community: [0,2,3,4], hole: [1], duration: 2500, showBadge: true }, // Step 1
  { community: [], hole: [], duration: 800, showBadge: false },      // Reset
  // ... more steps
];
```

Each step defines:
- `community`: Array of card indices to highlight (0-4)
- `hole`: Array of hole card indices to highlight (0-1)
- `duration`: How long to stay in this state (ms)
- `showBadge`: Whether to show the validation badge

### Card States (CSS Classes)

| Class | Effect | Implemented |
|-------|--------|-------------|
| `.poker-card--highlight` | Yellow border (#ffe06c) + lift 5px | Yes |
| `.poker-card--dim` | Opacity 0.4 | Yes |
| `.poker-card--discard` | Rotate + translate (tilted) | **No** |
| `.poker-card--face-down` | Blue card back | Yes (CSS only) |
| `.poker-card--undealt` | Dashed border, transparent | Yes (CSS only) |

### Animation Flow

1. **IntersectionObserver** triggers animation when widget scrolls into view
2. `applyStep()` adds/removes CSS classes based on current step
3. `setTimeout()` advances to next step after duration
4. Loops infinitely through all steps

## Usage in Markdown

```markdown
<div class="not-prose">
{% renderTemplate "webc" %}
<poker-table-holdem></poker-table-holdem>
{% endrenderTemplate %}
</div>
```

The `not-prose` wrapper prevents markdown from adding `<p>` tags inside the HTML.

## Comparison to Flutter Implementation

| Feature | Flutter | Web |
|---------|---------|-----|
| Highlight animation | Yes | Yes |
| Dim animation | Yes | Yes |
| Discard animation | Yes | **Not yet** |
| Validation states (valid/invalid) | Yes | Partial (valid only) |
| Face-down cards | Yes | CSS ready, not used |
| Configurable cards | Yes (props) | Hardcoded |

## Adding Discard Animation

To add discard animation (for Pineapple variant):

### 1. Add CSS class

```css
.poker-card--discard {
  transform: translateY(-10px) rotate(-15deg);
  opacity: 0.5;
}
```

### 2. Add to step definition

```javascript
const steps = [
  { community: [], hole: [], discard: [], duration: 400, showBadge: false },
  { community: [], hole: [0,1], discard: [2], duration: 2500, showBadge: true },
];
```

### 3. Update applyStep()

```javascript
function applyStep(step) {
  // ... existing highlight/dim logic

  holeCards.forEach((card, i) => {
    const isDiscarded = step.discard && step.discard.includes(i);
    card.classList.toggle('poker-card--discard', isDiscarded);
  });
}
```

## Future Improvements

- [ ] Add discard animation for Pineapple variant
- [ ] Add "Not Allowed" validation state (red) for Omaha rules demo
- [ ] Make cards configurable via WebC props
- [ ] Add face-down → face-up reveal animation
- [ ] Create variants: `poker-table-omaha.webc`, `poker-table-pineapple.webc`
