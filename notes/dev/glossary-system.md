# Poker Glossary System

Interactive inline definitions for poker terms in blog posts. Terms display as highlighted text that opens a modal popup with the definition.

## Usage in Markdown

```markdown
destroys more [bankrolls](glossary:bankroll) than bad cards ever could.
```

The link text can differ from the slug:
```markdown
[your bankroll](glossary:bankroll)
```

## Creating a New Term

Create `glossary/<slug>.md`:

```markdown
---
term: Bankroll
---

Your total poker funds set aside specifically for playing.

- **Separate** from living expenses
- Supports full markdown including images
```

**Frontmatter:**
- `term` — Display name shown in modal header (falls back to filename slug)

**Body:** Full markdown content rendered as HTML in the popup.

## How It Works

### Build Pipeline

1. **`_data/glossary.js`** — Reads all `glossary/*.md` files, parses frontmatter, converts markdown to HTML, returns `{ slug: { term, content } }` object

2. **`.eleventy.js` transform** (line 146-158) — Converts `<a href="glossary:slug">` → `<span class="poker-term" data-term="slug">`

3. **`blog-post-tailwind.html`** — Embeds glossary data as JSON, provides modal HTML and `openPokerTermModal()` JS

### Runtime

Clicking a `.poker-term` span triggers `openPokerTermModal(element)` which:
1. Reads `data-term` attribute
2. Looks up definition in embedded glossary JSON
3. Populates and displays modal

## Files Involved

| File | Purpose |
|------|---------|
| `glossary/*.md` | Term definitions |
| `_data/glossary.js` | Processes MD → HTML at build |
| `.eleventy.js:146-158` | Transform for link syntax |
| `_includes/layouts/blog-post-tailwind.html` | Modal HTML + JS |
| `css/tailwind-full.css:1056-1285` | `.poker-term` and modal styles |

## Adding Support to a New Layout

If creating a new blog layout that needs glossary support:

1. Embed glossary data:
   ```html
   <script>window.glossaryTerms = {{ glossary | dump | safe }};</script>
   ```

2. Include modal HTML (copy from `blog-post-tailwind.html` lines 120-128)

3. Include the JS functions `openPokerTermModal` and `closePokerTermModal`

The Eleventy transform automatically converts glossary links in all HTML output.
