# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chips of Fury is a marketing website for a poker mobile/web application. It's built as a static site using Eleventy (11ty) with Tailwind CSS and WebC components.

## Essential Commands

```bash
# Development server with hot reload (port 8080)
npm start

# Production build (outputs to _site/)
npm run build

# Deploy to Cloudflare (requires auth)
npx wrangler deploy
```

## Architecture Overview

### Tech Stack
- **Static Site Generator**: Eleventy (11ty) v3.1.1
- **CSS Framework**: Tailwind CSS v4.1.8 with @apply directives
- **Component System**: WebC for reusable UI components
- **Template Engine**: Nunjucks (primary), Markdown (blog posts)
- **Deployment**: Cloudflare Workers/Pages

### Key Architectural Decisions

1. **Tailwind CSS Compilation**: Automatic compilation integrated into Eleventy build process via `.eleventy.js:22-41`. The build hooks compile `css/tailwind-full.css` after HTML generation.

2. **Component Architecture**: WebC components in `_includes/components/` use inline Tailwind utilities (not @apply). Components are rendered using `{% renderTemplate "webc" %}` wrapper.

3. **Blog System**: Markdown posts in `posts/` directory use frontmatter and the `layouts/blog-post.html` layout. **Always invoke the `blog-writer` skill when writing or editing posts.**

### Directory Structure

```
_includes/
├── components/      # WebC components (*.webc)
└── layouts/         # Page layouts (base-tailwind.html is primary)

css/
├── tailwind-full.css    # Main Tailwind with @apply directives
├── chips-of-fury.webflow.css  # Legacy Webflow styles
└── normalize.css        # CSS reset

posts/               # Blog posts in Markdown
_site/              # Build output (gitignored)
```

### CSS Architecture

The project uses a hybrid Tailwind approach:
- **Semantic classes** defined in `css/tailwind-full.css` using @apply
- **Utility classes** used directly in templates and components
- Example semantic classes: `.hero-section`, `.btn-primary`, `.feature-card`

### Component Development

When creating new WebC components:
1. Place in `_includes/components/`
2. Use inline Tailwind utilities
3. Accept props via `@html` attributes
4. Render with `{% renderTemplate "webc" %}`

Example component structure:
```html
<div class="flex-none w-80 bg-indigo-200 rounded-3xl">
  <h3 @html="title"></h3>
  <p @html="description"></p>
</div>
```

### Important Configuration Files

- `.eleventy.js`: Core build configuration, Tailwind compilation hooks
- `wrangler.toml`: Cloudflare deployment settings
- `tailwind.config.js`: Tailwind configuration (if exists)

### Development Workflow

1. Changes to HTML/templates trigger Eleventy rebuild
2. CSS changes in `tailwind-full.css` trigger Tailwind recompilation
3. WebC component changes are watched automatically
4. Browser auto-reloads via Eleventy dev server

### Current Branch Structure

- Main branch: `master` (for PRs)
- Current branch: `release/v10`
- Clean working directory as of initialization