# Chips of Fury Website

A modern marketing website built with 11ty, Tailwind CSS v4, and WebC components for the Chips of Fury poker app.

## Tech Stack

- **Static Site Generator**: [Eleventy (11ty) v2.0.1](https://www.11ty.dev/)
- **Template Engine**: Nunjucks (primary), WebC (components)
- **CSS Framework**: [Tailwind CSS v4.1.8](https://tailwindcss.com/)
- **Component System**: [WebC](https://www.11ty.dev/docs/languages/webc/)
- **Build System**: 11ty with custom CSS compilation hooks
- **Fonts**: Inter + Poppins (Google Fonts)

## Project Architecture

### Build System

The project uses **Tailwind CSS with component classes** via the `@apply` directive:

- **Single compilation** (`css/tailwind-full.css`) - Complete Tailwind build with utility classes and semantic component classes

This approach allows for:
- Maintainable component classes for complex styling
- Full access to Tailwind utilities when needed
- Clean, semantic CSS class names

### CSS Architecture

```
css/
├── tailwind-full.css         # Complete Tailwind compilation with @apply directives
├── chips-of-fury.webflow.css # Legacy Webflow styles
├── webflow.css               # Webflow framework styles
└── normalize.css             # CSS reset
```

**Tailwind-full.css** contains semantic component classes like:
```css
.hero-section {
  /* Comprehensive comments explaining each utility */
  @apply bg-indigo-900 text-white relative;
}

.hero-section::after {
  /* Pseudo-element for background pattern overlay */
  content: '';
  position: absolute;
  /* ... detailed implementation */
}
```

### Component Architecture

#### WebC Components
Components are built using 11ty's WebC system with a **two-level architecture**:

```
_includes/components/
├── screenshot-card.webc          # Individual card component
└── screenshot-carousel.webc      # Container using multiple cards
```

#### Component Creation Pattern

1. **Create WebC file** in `_includes/components/`
2. **Use inline utility classes** (no `@apply` in components)
3. **Pass data via props** using `@html` attributes
4. **Compose components** within other components

**Example Component Structure:**
```html
<!-- screenshot-card.webc -->
<div class="flex-none w-80 snap-center bg-indigo-200 rounded-3xl shadow-xl p-2 transform hover:scale-105 transition-transform duration-300">
  <div class="w-full h-120 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 relative overflow-hidden">
    <div class="text-6xl" @html="icon"></div>
  </div>
  <div class="text-center mt-4 pb-4">
    <h3 class="font-semibold text-gray-900 mb-1" @html="title"></h3>
    <p class="text-sm text-gray-600" @html="description"></p>
  </div>
</div>
```

#### Component Usage

Components are rendered using the `{% renderTemplate "webc" %}` wrapper:

```html
{% renderTemplate "webc" %}
<screenshot-carousel 
  title="See It in Action" 
  subtitle="Experience the sleek interface and smooth gameplay">
</screenshot-carousel>
{% endrenderTemplate %}
```

### File Structure

```
├── _includes/
│   ├── components/           # WebC components
│   │   ├── screenshot-card.webc
│   │   └── screenshot-carousel.webc
│   └── layouts/             # Page layouts
│       ├── base.html        # Legacy Webflow layout
│       ├── base-tailwind.html # Modern Tailwind layout
│       └── blog-post.html   # Blog post layout
├── css/
│   ├── tailwind-full.css    # Complete Tailwind compilation with @apply directives
│   └── chips-of-fury.webflow.css # Legacy styles
├── images/
│   ├── bg/                  # Background images
│   │   └── bg_suit_tile.png
│   └── screenshots/         # App screenshots
├── posts/                   # Blog posts (Markdown)
├── index-new.html          # Modern homepage (Tailwind)
├── index.html              # Legacy homepage (Webflow)
├── blog.html               # Blog listing page
└── .eleventy.js            # 11ty configuration
```

## Development Workflow

### Build Commands

```bash
# Development server with auto-reload
npm run dev

# Production build
npm run build

# CSS compilation (manual)
npm run build:css
```

### Auto-compilation Features

The build system includes **automatic CSS compilation** triggered by:
- Changes to Tailwind CSS files
- WebC component modifications
- Template updates

**Watch Targets Configuration:**
```javascript
// .eleventy.js
eleventyConfig.addWatchTarget("css/tailwind-full.css");
```

### CSS Compilation Process

1. **File change detected** by 11ty watcher
2. **Tailwind compilation triggered** automatically
3. **Site regenerated** with updated styles
4. **Browser auto-reloads** via 11ty dev server

## Component Development Guidelines

### 1. Component Creation

- Create `.webc` files in `_includes/components/`
- Use descriptive, kebab-case naming
- Include props for dynamic content

### 2. Styling Approach

- **Use inline utility classes** within components
- **Avoid `@apply` directives** in WebC files
- **Comment complex utility combinations** for clarity

### 3. Component Composition

- **Break down complex UIs** into smaller components
- **Pass data via props** using `@html` attributes
- **Compose in parent templates** or other components

### 4. Prop Binding

```html
<!-- Static props -->
<my-component title="Static Title">

<!-- Dynamic props -->
<my-component :title="dynamicTitle">

<!-- HTML content -->
<my-component title="Title" @html="htmlContent">
```

## Font Loading Strategy

**Google Fonts Integration:**
```html
<!-- In base layout -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**CSS Custom Properties:**
```css
:root {
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

## Background Patterns

**Implementation Pattern:**
```css
.hero-section {
  @apply bg-indigo-900 text-white relative;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('/images/bg/bg_suit_tile.png');
  background-repeat: repeat;
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
}
```

## Performance Considerations

- **Minimal CSS** via utility-first approach
- **Component-based** architecture for reusability
- **Optimized images** with proper sizing
- **Font display: swap** for faster text rendering
- **Z-index layering** for proper visual hierarchy

## Legacy Support

The project maintains **dual templates** for migration:
- `index.html` - Original Webflow-based design
- `index-new.html` - Modern Tailwind-based design

This allows for **gradual migration** and **A/B testing** between designs.

## Best Practices

1. **Comment utility classes** extensively for maintainability
2. **Use semantic HTML** structure (h1, h2, etc.)
3. **Implement proper ARIA** labels for accessibility
4. **Test responsive** behavior across devices
5. **Optimize images** for web delivery
6. **Use consistent** spacing scales (Tailwind defaults)

## Development Server

**Local development:**
```bash
npm run dev
# Serves on http://localhost:8080
# Auto-reloads on file changes
# Compiles Tailwind CSS automatically
```

**Build output:**
```
_site/
├── index.html              # Generated static files
├── css/
│   └── tailwind-full.css   # Complete Tailwind compilation with @apply directives
└── images/                 # Optimized images
```

This architecture provides a **scalable**, **maintainable**, and **performant** foundation for the Chips of Fury marketing website while supporting both modern development practices and legacy compatibility. 