---
title: "Removing Flutter's Service Worker, how to do it correctly"
date: 2025-08-01
description: "An in-depth look at the technical reasons behind removing Flutter's service worker from the Chips of 
Fury webapp."
tags: ['post', 'devlog']
author: Animesh
layout: layouts/blog-post.html
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>

<script>hljs.highlightAll();</script>

### The Problem: Flutter's Service Worker vs CDN Architecture

---

#### Understanding Flutter's Service Worker Implementation

Flutter's service worker uses a content-hash based caching strategy:

1. **Asset Manifest with MD5 Hashes**: The service worker contains a `RESOURCES` object that maps file paths to their
   MD5 hashes
2. **Hash-Based Change Detection**: When a new build is deployed, the service worker compares hashes to determine which
   assets need updating
3. **Cache-First Strategy**: The service worker intercepts all requests and serves from its local cache, only fetching
   from network when not cached
4. **No Query Parameters**: Flutter does NOT append hash-based query parameters to URLs - it uses the same URLs and
   relies on the service worker update lifecycle

Here's the critical point: **Flutter's service worker does not use these MD5 hashes for cache busting via query
parameters**. Instead, it:

- Fetches resources using their original URLs (e.g., `/main.dart.js`)
- Relies on the service worker update mechanism to detect when the RESOURCES manifest has changed
- Assumes that fetching the same URL will return the new content when hashes differ

This approach works well when serving directly from a web server. However, it breaks down when you introduce a CDN.

<br>

#### The CDN <> Service Worker Cache Coherency Problem

Here's what happens when you use Flutter's service worker with a CDN like Cloudflare:

1. **Initial State**: You deploy `main.dart.js` with aggressive caching headers (`Cache-Control: max-age=31536000`)
2. **CDN Caches**: Cloudflare edge nodes cache this file based on the HTTP headers
3. **New Deployment**: You update your app, generating a new `main.dart.js` with a different MD5 hash
4. **Service Worker Detects Change**: The service worker sees the hash mismatch and requests the "new" file
5. **CDN Serves Stale Content**: Since the URL is the same (`/main.dart.js`), Cloudflare serves the cached version
6. **Result**: The service worker receives the old file despite knowing it needs the new one

So we have a couple of options to counter these issues:

**Option 1: No-Cache Headers**

```
Cache-Control: no-cache, must-revalidate
```

- Defeats the purpose of having a CDN
- Every request hits your origin server
- Eliminates global edge caching benefits

**Option 2: Cache Busting Query Parameters**

If you need to implement cache busting anyway (e.g., `main.dart.js?v=12345`), you're essentially:

- Duplicating the service worker's versioning logic
- Adding complexity to your build process
- Making the service worker almost redundant

<br>

#### The Incompatibility

The core issue is that Flutter's service worker and CDNs operate on different caching paradigms:

- **Service Worker**: Content-based caching (MD5 hashes)
- **CDN**: URL-based caching (same URL = same content)

These two approaches are incompatible without additional coordination. Why This Matters for Production Applications ?

1. **Immediate Updates Are Impossible**: Users continue seeing old versions until CDN caches expire
2. **Hard Refresh Doesn't Help**: Even Ctrl+Shift+R won't bypass CDN caches
3. **CDN Effectiveness Is Compromised**: Edge nodes cannot cache content aggressively without risking stale content
   delivery. You'd need to either use short TTLs (reducing cache hit rates) or manually purge caches on every
   deployment (operationally complex)

<br>

### The Solution: Remove the Service Worker

---

Without a service worker:

1. Implement simple query-parameter cache busting: `main.dart.js?v=timestamp`
2. Configure aggressive CDN caching: `Cache-Control: max-age=31536000, immutable`
3. Let browsers and CDNs handle caching based on URLs
4. Updates are immediate on page refresh

This approach aligns with how CDNs are designed to work and eliminates the cache coherency problem entirely.

#### Flutter's Position

The Flutter team recognizes these limitations and
is [deprecating the default service worker](https://docs.flutter.dev/platform-integration/web/faq#how-do-i-configure-a-service-worker).
They acknowledge that the current implementation doesn't play well with modern web infrastructure.

#### How to correctly remove a service worker...

When you remove the service worker registration from your `index.html`, you might expect the service worker to
disappear. It doesn't. Here's why:

1. **Service workers persist after installation**: Once installed in a user's browser, the service worker continues to
   run independently of your code
2. **No registration ≠ no service worker**: The service worker intercepts requests regardless of whether your current
   code registers it
3. **Users stuck with old behavior**: All existing users continue to experience the caching problems indefinitely

The high level steps to remove a service worker properly are... 

1. **Deploy a cleanup service worker at the same URL**: Replace `flutter_service_worker.js` with cleanup code
2. **Let the browser's update check do the work**: Service workers automatically check for updates when users navigate
   to your site
3. **The cleanup worker unregisters itself**: When the browser fetches and installs the "updated" service worker, it
   runs the cleanup code

#### The Critical Discovery

Initially, we overcomplicated this by trying to:

- Register a new cleanup service worker from JavaScript
- Have it clean caches and then unregister itself
- Remove the old service worker programmatically

This led to a problematic loop where the cleanup worker would register and unregister on every page load.

Finally came the dumb realization: **You don't need to register the cleanup worker at all**. The browser's [standard
service worker update](https://web.dev/articles/service-worker-lifecycle) mechanism will:

1. Check if `flutter_service_worker.js` has changed
2. Download and install the new version (our cleanup code)
3. Activate it, running our cleanup logic
4. The cleanup code then unregisters itself permanently

Here's the entire cleanup service worker:

```javascript
// flutter_service_worker.js - Cleanup version
self.addEventListener('install', e => self.skipWaiting());

self.addEventListener('activate', e => {
    e.waitUntil((async () => {
        // Delete ALL caches
        for (const key of await caches.keys()) {
            await caches.delete(key);
        }
        // Take control of all clients
        await self.clients.claim();
        // Unregister ourselves
        await self.registration.unregister();
    })());
});
```

That's it. No fetch handler, no complex logic. Just:

1. Skip waiting to activate immediately
2. Delete all caches
3. Claim all clients to ensure cleanup affects current session
4. Unregister to remove the service worker completely

<br>

### Implementing Cache Busting Without Service Workers

---

#### The Query Parameter Strategy

With the service worker removed, we need a different approach to ensure users get fresh content. The solution is
straightforward: append version query parameters to all JavaScript files.

```
main.dart.js → main.dart.js?v=1754052153
```

This simple change enables aggressive CDN caching while guaranteeing fresh content on deployments.

#### Post-Build Cache Busting Script

After running `flutter build web`, we run a cache busting script that modifies the build output. Here is the script 
in essence:

```bash
#!/bin/bash
CACHE_BUST_VERSION=$(date +%s)

# Add cache busting to main.dart.js and other JS files
sed -i '' "s|main\.dart\.js\"|main.dart.js?v=${CACHE_BUST_VERSION}\"|g" build/web/index.html
sed -i '' "s|flutter\.js\"|flutter.js?v=${CACHE_BUST_VERSION}\"|g" build/web/index.html

# Handle deferred loading parts
find build/web -name "*.part.js" | while read part; do
  basename_part=$(basename "$part")
  sed -i '' "s|${basename_part}\"|${basename_part}?v=${CACHE_BUST_VERSION}\"|g" build/web/main.dart.js
done
```

Key points:

- Uses timestamp (`date +%s`) for unique versions
- Updates all JavaScript references in `index.html`
- Handles deferred loading parts
- Updates `serviceWorkerVersion` for backward compatibility during transition

#### Cloudflare Headers Configuration

With cache busting in place, we can configure aggressive caching headers. In your `_headers` file:

```
# Cache JavaScript files for 1 year
/*.js
  Cache-Control: public, max-age=31536000, immutable

# Never cache HTML
/*.html
  Cache-Control: no-cache, must-revalidate

# Cache assets with hashed filenames forever
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache WASM files for 1 year
/*.wasm
  Cache-Control: public, max-age=31536000, immutable
```

#### Why This Works

1. **Unique URLs on Each Deploy**: The timestamp ensures every deployment has unique URLs
2. **CDN Can Cache Aggressively**: One-year cache duration maximizes edge performance
3. **Instant Updates**: New URLs bypass all caches immediately
4. **No Service Worker Complexity**: Standard HTTP caching rules apply

### Important Considerations

**Cloudflare Caching Levels**: Ensure your Cloudflare cache level is set to "Standard" (not "Ignore Query String") so
query parameters are included in the cache key.

**Build Process Integration**: The cache busting script must run after `flutter build web` but before deployment to
ensure all references are updated.

**Deployment Simplicity**: Every deployment gets a fresh timestamp, ensuring clean cache invalidation whether deploying
new features or reverting to previous code.

### Update: Evolution to Content-Based Cache Busting

After implementing the timestamp-based solution described above, we evolved our approach to something more sophisticated. We now use content-based cache busting with MD5 hashes—bringing back the efficiency of the original service worker without its CDN incompatibility.

Read our follow-up post: [Content-Hashed Caching for Flutter Web](/posts/flutter-web-cache-busting-journey/) to learn how we:

- Implemented comprehensive URL patching inspired by Discord's Embedded App SDK
- Created a content-based cache-busting system that only reloads changed files
- Achieved the best of both worlds: efficient caching with CDN compatibility