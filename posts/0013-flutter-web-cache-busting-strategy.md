---
title: "Content-Hashed Caching for Flutter Web (Without a Service Worker)"
date: 2025-08-04
description: "How we replaced Flutter Web's service worker with CDN-friendly, content-hashed caching."
devlogNumber: 8
tags: [ 'post', 'devlog', 'flutter', 'web' ]
author: Animesh
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/tokyo-night-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>

<script>hljs.highlightAll();</script>

### The Quest for Better Cache Busting

---

In our [previous post](/posts/why-we-removed-flutter-service-worker/), we discussed why we removed Flutter's service
worker due to its incompatibility with CDN caching. We implemented a simple timestamp-based cache-busting strategy that
worked well enough. But there are a few shortcomings to that:

- all JS files get cache busted, even the ones that have not changed. And there are quite a few files that are changed
  infrequently
- trying to append the cache busting query param in a post build step by find/replace was not fool-proof (see below)

The original service worker actually had one brilliant feature: content-based caching using MD5 hashes. Files were only
reloaded when their content changed, not on every deployment. We wanted that efficiency back, but
without [the service worker's CDN incompatibility](/posts/why-we-removed-flutter-service-worker/).

<br>

### The First Attempt: Post-Build String Replacement

---

We tried what seemed like the obvious solution: use sed/awk to replace asset URLs in the build output with cache-busted
versions. This quickly turned into a Frankenstein's monster of regex patterns and edge cases.

#### Why String Replacement Failed

**1. Minified Code Nightmare**

Flutter's production builds are heavily minified. Finding and replacing asset references in minified JavaScript is like
performing surgery with a chainsaw:

```javascript
// What we hoped to find:
loadScript("main.dart.js")

// What we actually got:
e.l("main.dart.js") || t(r + "main.dart.js", {q: 1}) && n.k(o.z())
```

**2. Ambiguous Asset Paths**

Flutter can load multiple versions of the same filename from different paths:

```javascript
// Which canvaskit.js is being loaded?
'canvaskit/chromium/canvaskit.js'
:
'8191e843020c',
    'canvaskit/canvaskit.js'
:
'728b2d477d9b',

// Runtime decision based on browser capabilities
const path = isChromium ? 'canvaskit/chromium/' : 'canvaskit/';
loadScript(path + 'canvaskit.js');  // Can't statically determine which one
```

**3. Dynamic URL Construction**

Assets are often loaded through computed paths that string replacement can't handle:

```javascript
// URLs built at runtime
const base = config.assetBase || './';
const file = modules[moduleId].file;
import(base + file);  // Impossible to predict statically
```

After creating an increasingly complex web of sed commands that still couldn't guarantee 100% accuracy, we realized we
were fighting the framework instead of working with it. The post-build approach was doomed because it tried to
reverse-engineer runtime behavior from static analysis.

<br>

### Why Simple Fetch Patching Doesn't Work

---

So we thought, "Let's be smarter—patch at runtime!" Our next instinct was to patch `fetch()` and call it a day. Flutter
loads files dynamically, so just intercept `fetch()`, right? Wrong.

Flutter uses at least four different ways to load resources:

- Dynamic imports for ES6 modules
- Script element creation for regular JavaScript
- `WebAssembly.compileStreaming()` for WASM files
- Service worker registration (if enabled)

Each mechanism requires its own patching strategy.

We found inspiration in [Discord's Embedded App SDK](https://github.com/discord/embedded-app-sdk). Their [
`patchUrlMappings.ts`](https://github.com/discord/embedded-app-sdk/blob/main/src/utils/patchUrlMappings.ts) showed us a
much more comprehensive patching strategy.

<br>

### Comprehensive Monkey Patching

---

Our solution adds `?v=<md5-hash>` query parameters to all JavaScript and WebAssembly files based on their actual
content, at runtime:

```
// Before
main.dart.js
flutter.js
canvaskit.wasm

// After (with content hashes)
main.dart.js?v=a1b2c3d4e5f6
flutter.js?v=f6e5d4c3b2a1
canvaskit.wasm?v=7a8b9c0d1e2f
```

This means:

- **Efficient Caching**: Files are cached until their content changes
- **CDN Compatible**: Works perfectly with aggressive edge caching
- **No Service Worker**: Pure client-side implementation
- **Automatic**: No manual version bumping needed

Here's how we intercept URLs at multiple levels:

#### 1. Patch Network APIs

For WASM and other resources loaded via fetch:

```javascript
// Patch fetch for comprehensive coverage
const origFetch = window.fetch;
window.fetch = function (input, init) {
    if (input instanceof Request) {
        // Handle Request objects specially
        const newUrl = maybePatchUrl(input.url);
        return rebuildAndFetch(input, newUrl, init);
    }
    return origFetch(maybePatchUrl(input), init);
};
```

#### 2. Patch Script Element Creation

For cases where scripts are created directly:

```javascript
// Intercept direct script.src assignment
const originalSetter = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set;
Object.defineProperty(HTMLScriptElement.prototype, 'src', {
    set(v) {
        const patched = maybePatchUrl(v);
        return originalSetter.call(this, patched);
    }
});
```

#### 3. Monitor DOM Mutations

Catch dynamically added scripts that might bypass our other patches:

```javascript
const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
        if (m.type === 'childList') {
            m.addedNodes.forEach(node => {
                if (node.tagName === 'SCRIPT' && node.src) {
                    // Handle already-connected scripts
                    if (node.isConnected) {
                        recreateScriptElement(node, maybePatchUrl(node.src));
                    }
                }
            });
        }
    }
});
observer.observe(document, {childList: true, subtree: true});
```

#### 4. Intercept at the Trusted Types Level

We overrode on the Trusted Security Policy to intercept any URLs and add the query param before it was validated by the
policy. After validation, it passes that URL as it is for the network request.

> NOTE: This is clever, but not supported by all browsers at the time of writing (Safari is in preview, in Firefox 
> user has to explicitly enable). Most of our web usage is on chrome, so it is good to have this as a last line of 
> defence.

```javascript
// Intercept Trusted Types policy creation
const origCreatePolicy = trustedTypes.createPolicy;
trustedTypes.createPolicy = function (name, rules) {
    if (rules && typeof rules.createScriptURL === 'function') {
        const orig = rules.createScriptURL;
        rules = {
            ...rules,
            createScriptURL(urlLike) {
                // Let Flutter validate the URL first
                const validated = orig.call(this, urlLike);
                // Then add our cache-busting
                const patched = maybePatchUrl(validated);
                return patched;
            }
        };
    }
    return origCreatePolicy(name, rules);
};
```

<br>

### Production Implementation: Build-Time Hash Generation

---

We generate MD5 hashes of all JavaScript and WASM files and embed them in the patch loader:

#### Build Process

```bash
# 1. Build Flutter web app without service worker
flutter build web --pwa-strategy=none

# 2. Run post-build script to generate hashes
./devops/scripts/flutter-web-post-build.sh
```

#### Hash Generation Script

Here's the complete `generate-asset-hashes.sh` script that creates content-based hashes:

```bash
#!/bin/bash

# Generate MD5 hashes for all JS and WASM files in the build directory
# Updates the production patch loader template with content hashes

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
BUILD_DIR="$PROJECT_ROOT/cof_app/build/web"
TEMPLATE_FILE="$PROJECT_ROOT/cof_app/web/production-patch-loader.js"
OUTPUT_FILE="$PROJECT_ROOT/cof_app/build/web/production-patch-loader.js"

echo "Flutter Web Asset Hash Generator"
echo "================================"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "Error: Build directory not found: $BUILD_DIR"
    echo "Please run 'flutter build web' first."
    exit 1
fi

# Check if template exists
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "Error: Template file not found: $TEMPLATE_FILE"
    exit 1
fi

# Build the asset map
echo "Generating asset map..."
echo ""

ASSET_MAP_CONTENT="  const ASSET_MAP = {"

# Find and hash files
FILE_COUNT=0
while IFS= read -r -d '' file; do
    # Get relative path from build directory
    REL_PATH="${file#$BUILD_DIR/}"
    
    # Calculate MD5 hash (first 12 characters)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        HASH=$(md5 -q "$file" | cut -c1-12)
    else
        # Linux
        HASH=$(md5sum "$file" | cut -c1-12)
    fi
    
    echo "  $REL_PATH -> $HASH"
    
    # Add to asset map
    if [ $FILE_COUNT -gt 0 ]; then
        ASSET_MAP_CONTENT="$ASSET_MAP_CONTENT,"
    fi
    ASSET_MAP_CONTENT="$ASSET_MAP_CONTENT
    '$REL_PATH': '$HASH'"
    
    ((FILE_COUNT++))
done < <(find "$BUILD_DIR" -type f \( -name "*.js" -o -name "*.mjs" -o -name "*.cjs" -o -name "*.wasm" \) -print0)

ASSET_MAP_CONTENT="$ASSET_MAP_CONTENT
  };"

echo ""
echo "Found $FILE_COUNT files"
echo "Updating production patch loader..."

# Copy template to output
cp "$TEMPLATE_FILE" "$OUTPUT_FILE"

# Create a temporary file with the asset map content
TEMP_MAP_FILE=$(mktemp)
echo "$ASSET_MAP_CONTENT" > "$TEMP_MAP_FILE"

# Use sed to replace the empty ASSET_MAP with the generated one
# This approach handles multi-line content better than awk
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS sed requires different syntax
    sed -i '' "/^  const ASSET_MAP = {};$/r $TEMP_MAP_FILE" "$OUTPUT_FILE"
    sed -i '' "/^  const ASSET_MAP = {};$/d" "$OUTPUT_FILE"
else
    # Linux sed
    sed -i "/^  const ASSET_MAP = {};$/r $TEMP_MAP_FILE" "$OUTPUT_FILE"
    sed -i "/^  const ASSET_MAP = {};$/d" "$OUTPUT_FILE"
fi

# Clean up temp file
rm -f "$TEMP_MAP_FILE"

echo ""
echo "Production patch loader generated: $OUTPUT_FILE"
echo ""
echo "Asset map contains $FILE_COUNT files with content-based hashes"
```

The generated asset map looks like:

```javascript
const ASSET_MAP = {
    'main.dart.js': 'a1b2c3d4e5f6',
    'flutter.js': 'f6e5d4c3b2a1',
    'canvaskit/canvaskit.js': '7a8b9c0d1e2f',
    'canvaskit/canvaskit.wasm': '3f4g5h6i7j8k',
    // ... more files
};
```

#### The Patch Loader

The production patch loader uses these hashes:

```javascript
function maybePatchUrl(input) {
    const u = toAbsURL(input);
    if (!u || !shouldCacheBust(u)) return input;

    // Look up content hash
    const hash = getFileHash(u.href);
    if (hash) {
        u.searchParams.set('v', hash);
    }

    return input instanceof URL ? u : u.toString();
}
```

<br>

### What's good about this approach

---

#### 1. True Content-Based Caching

Unlike timestamp-based cache busting, files are only invalidated when they actually change. If you deploy a hotfix that
only touches one file, users only download that one file.

#### 2. CDN-Friendly

With unique URLs for each file version, CDNs can cache aggressively:

```
# Cloudflare headers configuration
/*.js
  Cache-Control: public, max-age=31536000, immutable
```

#### 3. No Service Worker Complexity

- No update lifecycle to manage
- Works with standard HTTP caching

<br>

### Implementation Scripts

---

#### The Post-Build Orchestrator

The `flutter-web-post-build.sh` script ties everything together:

```bash
#!/bin/bash

# Post-build script for Flutter Web
# Generates production patch loader with content-based hashes

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
COF_APP_ROOT="$PROJECT_ROOT/cof_app"

echo "Flutter Web Post-Build Script"
echo "============================"

# Check if build directory exists
if [ ! -d "$COF_APP_ROOT/build/web" ]; then
    echo "Error: Build directory not found at $COF_APP_ROOT/build/web"
    echo "Please run 'flutter build web' first"
    exit 1
fi

# Run the asset hash generator
echo "Generating asset hashes..."
"$SCRIPT_DIR/generate-asset-hashes.sh"

# Update index.html to use production patch loader
INDEX_HTML="$COF_APP_ROOT/build/web/index.html"

echo ""
echo "Updating index.html..."

# Add timestamp to production patch loader to ensure it's always fetched fresh
if [ -f "$INDEX_HTML" ]; then
    # Generate timestamp
    TIMESTAMP=$(date +%s)
    
    # Add timestamp to production-patch-loader.js reference
    if grep -q "production-patch-loader.js" "$INDEX_HTML"; then
        # Replace production-patch-loader.js with production-patch-loader.js?t=timestamp
        sed -i '' "s|production-patch-loader\.js\"|production-patch-loader.js?t=$TIMESTAMP\"|g" "$INDEX_HTML"
        echo "Added timestamp to production patch loader: ?t=$TIMESTAMP"
    else
        echo "Warning: Production patch loader not found in index.html"
        echo "Please add: <script src=\"production-patch-loader.js\"></script>"
    fi
fi

echo ""
echo "Post-build complete!"
echo ""
echo "Production build is ready with content-based cache busting."
echo "Files will only be reloaded when their content changes."
```

Key features of this script:

1. **Hash Generation**: Calls the asset hash generator to create content-based hashes
2. **Loader Timestamping**: Adds a timestamp to the patch loader itself to ensure it's always fresh
3. **User Feedback**: Provides clear output about what's happening

This orchestrator script handles build verification, calls the hash generator, and ensures the patch loader itself is
always fetched fresh.

<br>

### Conclusion

---

For teams using Flutter Web with CDN deployment, this approach offers the best of both worlds: the efficiency of
content-based caching with the simplicity of URL-based cache busting. No service worker complexity, no cache coherency
issues—just fast, reliable deployments.

The complete files are available in [this gist](https://gist.github.com/animeshjain/6da1152e3636c2b69cbc27d79ba54b54):

- `production-patch-loader.js`: The monkey patching logic
- `generate-asset-hashes.sh`: Build-time hash generation
- `flutter-web-post-build.sh`: Post-build script