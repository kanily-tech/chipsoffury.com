# GDPR Consent Banner (Marketing Site) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a custom GDPR consent banner to the `chipsoffury.com` marketing site that gates Google Tag Manager / Google Analytics behind explicit user consent, sharing a `cof_consent` cookie at the apex domain with the Flutter web app.

**Architecture:** Inline `<head>` snippet sets up `dataLayer`, defines `gtag()`, default-denies all consent signals (Consent Mode v2), then immediately replays a previously-stored choice from the `cof_consent` cookie — all of this runs *before* the existing GTM loader so GA never sees an unset state. A separate deferred `js/cookie-consent.js` (~150 lines, plain ES5-style like the existing `js/`) renders a sticky bottom-bar banner on first visit, handles Accept / Reject, writes the cookie, calls `gtag('consent', 'update', ...)`, and exposes `window.cofConsent.open()` so the footer "Cookie Settings" link can re-open the banner. A new `/cookies/` page lists every cookie. No build-system or framework changes.

**Tech Stack:** Eleventy 3, Nunjucks, WebC, Tailwind v4, vanilla ES5-compatible JavaScript (matches existing `js/` style — no bundler, no transpile). Tests are plain Node `assert` modules (matches `js/chip-distribution.test.js`).

---

## Background — read this once

**The contract** (from `/Users/animeshjain/Projects/CoF/docs/dev-guides/gdpr-consent-banner.md`):

- **Cookie name:** `cof_consent`
- **Cookie domain:** `.chipsoffury.com` in production, host-only on localhost
- **Cookie path:** `/`
- **Max-Age:** `31536000` (1 year)
- **SameSite:** `Lax`
- **Secure:** true on HTTPS, omitted on localhost HTTP
- **Cookie value (URL-encoded JSON):**
  ```json
  { "v": 1, "analytics": true, "ts": 1746345600, "region": "EEA" }
  ```
  - `v` — schema version (currently `1`). Treat any cookie with `v < 1` (or unparseable) as missing → show banner.
  - `analytics` — boolean. The only optional category.
  - `ts` — UNIX seconds when the choice was made.
  - `region` — best-effort `"EEA" | "UK" | "OTHER"`. We have no IP geolocation here, so always store `"OTHER"` for now (the field is for our records only, not for compliance logic).

**Consent Mode v2 calls:**
- On every page, *before any GA-loading script*: `gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 })`.
- If the cookie says `analytics: true`: `gtag('consent', 'update', { analytics_storage: 'granted' })`.
- On Reject after a previous Accept: `gtag('consent', 'update', { analytics_storage: 'denied' })`.
- We never touch the three ad-related signals — they stay denied permanently.

**Banner UX rules (non-negotiable):**
- Two buttons only: **Accept** and **Reject**, equally prominent (same size, same visual weight). Reject is one click. No "Manage" / no per-vendor toggles (we have one optional category, so this is compliant — see the trip-wire warning in the spec).
- No pre-checked boxes.
- One sentence of copy + a link to `/cookies/`.
- The banner does NOT block interaction with the page.
- Closing/dismissing without a choice does **not** persist consent. We don't even render a close button.
- A "Cookie Settings" link in the footer re-opens the banner; the current choice is indicated.

**Where existing GTM lives:** `_includes/layouts/base-tailwind.html:5` (the inline IIFE) and `_includes/layouts/base-tailwind.html:138` (the `<noscript>` iframe). Pages using `layouts/base-tailwind.html` (and `layouts/blog-post-tailwind.html` which extends it) are the ones that need the consent gate. Pages using `layouts/base.html` / `layouts/base-with-container.html` do not currently load GTM, so they don't need consent wiring — but they still benefit from the banner if the user hasn't chosen yet (so they don't bypass consent by landing on a non-tailwind page first). This plan adds the banner to **`base-tailwind.html` only** because (a) all current GTM-loading pages route through it and (b) the legacy `base.html` is webflow-era and being phased out. If a user lands on a non-tailwind page first, they'll see the banner the next time they visit a tailwind page; until then nothing tracking-related has loaded, so this is compliant.

**One important deviation from the spec text:** the spec says "include `cookie-consent.js` near end of `<body>`". We implement this as a `<script defer>` reference in `<head>` *after* the inline snippet. Reason: the inline snippet only sets up `dataLayer` + reads the cookie + replays a previous choice. The deferred file renders the UI and handles button clicks — which only matters once the DOM is parsed. Putting it in `<head>` with `defer` (so it executes after HTML parse, before `DOMContentLoaded`) keeps the markup clean and matches how the inline snippet is positioned.

---

## File structure

**Create:**
- `js/consent-cookie.js` — pure functions for reading/writing the `cof_consent` cookie, environment-aware attrs, schema-version validation. ~70 lines. No unit tests — verified via the manual DevTools matrix in Task 6.
- `js/cookie-consent.js` — DOM banner: render, show/hide, button handlers, footer "Cookie Settings" hook. Loads `consent-cookie.js` via the global it exposes (`window.CofConsentCookie`) so it works without a bundler. ~150 lines.
- `_includes/components/consent-banner-snippet.webc` — emits the inline `<head>` snippet (Consent Mode v2 default-deny + immediate replay + `window.cofConsent` skeleton). Kept as a component so the markup is in one place. ~70 lines of inline JS.
- `cookies.html` — `/cookies/` page listing every cookie this site sets and its purpose. Mirrors the layout of `privacy-policy.html`.

**Modify:**
- `_includes/layouts/base-tailwind.html` — insert the consent snippet *before* the GTM IIFE on line 5; add `<script defer src="/js/consent-cookie.js">` and `<script defer src="/js/cookie-consent.js">` in `<head>`.
- `_includes/components/site-footer.webc` — add a "Cookie Settings" link in the bottom bar near the Privacy Policy / Terms links; clicking it calls `window.cofConsent.open()`.

**No changes needed in:** `.eleventy.js` (the `js/` directory is already passthrough-copied at line 34; the `_includes/components/*.webc` glob at line 70 picks up the new component automatically).

---

## Task 1: Pure cookie module

This task delivers the cookie module that everything else builds on. No unit tests — verification happens via the manual DevTools matrix in Task 6 (cookie present, decoded value correct, `Secure`/`Domain` flags right, schema-version invalidation re-prompts).

**Files:**
- Create: `js/consent-cookie.js`

- [ ] **Step 1: Implement `js/consent-cookie.js`**

Create `js/consent-cookie.js`:

```javascript
/**
 * cof_consent cookie I/O for the marketing site.
 *
 * Spec: /Users/animeshjain/Projects/CoF/docs/dev-guides/gdpr-consent-banner.md
 *
 * Pure functions: no DOM, no document.cookie access. The DOM layer
 * (cookie-consent.js) reads document.cookie and passes the string to parse(),
 * and pushes the output of serialize() back to document.cookie.
 */

var CofConsentCookie = (function () {
  var COOKIE_NAME = 'cof_consent';
  var CURRENT_VERSION = 1;
  var MAX_AGE_SECONDS = 31536000; // 1 year
  var APEX_DOMAIN = '.chipsoffury.com';

  function isLocalHostname(hostname) {
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
    var suffix = '.local';
    var n = hostname.length;
    return n >= suffix.length
      && hostname.indexOf(suffix, n - suffix.length) === n - suffix.length;
  }

  function parse(cookieString) {
    if (!cookieString) return null;
    var parts = cookieString.split(';');
    for (var i = 0; i < parts.length; i++) {
      var kv = parts[i].trim().split('=');
      if (kv[0] !== COOKIE_NAME) continue;
      var raw = kv.slice(1).join('=');
      if (!raw) return null;
      try {
        var record = JSON.parse(decodeURIComponent(raw));
        if (typeof record !== 'object' || record === null) return null;
        if (typeof record.v !== 'number' || record.v < CURRENT_VERSION) return null;
        if (typeof record.analytics !== 'boolean') return null;
        return record;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  function buildRecord(analyticsGranted, nowEpochSeconds) {
    return {
      v: CURRENT_VERSION,
      analytics: !!analyticsGranted,
      ts: nowEpochSeconds,
      region: 'OTHER'
    };
  }

  function serialize(record, location) {
    var hostname = location.hostname;
    var isHttps = location.protocol === 'https:';
    var local = isLocalHostname(hostname);
    var encoded = encodeURIComponent(JSON.stringify(record));
    var attrs = [
      COOKIE_NAME + '=' + encoded,
      'Path=/',
      'Max-Age=' + MAX_AGE_SECONDS,
      'SameSite=Lax'
    ];
    if (!local) attrs.push('Domain=' + APEX_DOMAIN);
    if (isHttps) attrs.push('Secure');
    return attrs.join('; ');
  }

  return {
    COOKIE_NAME: COOKIE_NAME,
    CURRENT_VERSION: CURRENT_VERSION,
    parse: parse,
    buildRecord: buildRecord,
    serialize: serialize,
    _isLocalHostname: isLocalHostname
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CofConsentCookie;
}
if (typeof window !== 'undefined') {
  window.CofConsentCookie = CofConsentCookie;
}
```

- [ ] **Step 2: Smoke-check the module loads**

Run: `node -e "console.log(require('./js/consent-cookie').buildRecord(true, 1))"`
Expected: `{ v: 1, analytics: true, ts: 1, region: 'OTHER' }` — confirms the file parses and exports.

- [ ] **Step 3: Commit**

```bash
git add js/consent-cookie.js
git commit -m "feat(consent): add cof_consent cookie module"
```

---

## Task 2: Inline `<head>` Consent Mode v2 snippet (WebC component)

This block must run **before** the GTM IIFE so that GA's first dataLayer walk sees `consent default deny` (and, for returning users, the immediate `update granted` replay).

**Files:**
- Create: `_includes/components/consent-banner-snippet.webc`
- Modify: `_includes/layouts/base-tailwind.html` (insert the snippet before line 5; insert deferred script tags in `<head>`)

- [ ] **Step 1: Create the WebC component**

Create `_includes/components/consent-banner-snippet.webc`:

```html
<script webc:keep>
  // Consent Mode v2 default-deny + replay of any previously stored choice.
  // Must run before any script that loads gtag.js (GTM, Firebase Analytics, etc.).
  // Spec: docs/plans/2026-05-05-gdpr-consent-banner-marketing.md
  (function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    gtag('consent', 'default', {
      ad_storage:         'denied',
      ad_user_data:       'denied',
      ad_personalization: 'denied',
      analytics_storage:  'denied',
      wait_for_update:    500
    });

    // Inline cookie parse — must NOT depend on /js/consent-cookie.js (which
    // loads deferred). Mirror the same schema-version check.
    var COOKIE_NAME = 'cof_consent';
    var CURRENT_VERSION = 1;

    function readInitial() {
      var c = document.cookie || '';
      var parts = c.split(';');
      for (var i = 0; i < parts.length; i++) {
        var kv = parts[i].trim().split('=');
        if (kv[0] !== COOKIE_NAME) continue;
        var raw = kv.slice(1).join('=');
        if (!raw) return null;
        try {
          var rec = JSON.parse(decodeURIComponent(raw));
          if (!rec || typeof rec !== 'object') return null;
          if (typeof rec.v !== 'number' || rec.v < CURRENT_VERSION) return null;
          if (typeof rec.analytics !== 'boolean') return null;
          return rec;
        } catch (e) {
          return null;
        }
      }
      return null;
    }

    var initial = readInitial();
    if (initial && initial.analytics === true) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }

    // Skeleton API for later phases. cookie-consent.js will set .open() once
    // the DOM is ready. Defining `initial` here lets other scripts read the
    // current cookie state without re-parsing.
    window.cofConsent = window.cofConsent || {};
    window.cofConsent.initial = initial;
  })();
</script>
```

- [ ] **Step 2: Modify `base-tailwind.html` to render the snippet first**

In `_includes/layouts/base-tailwind.html`, replace lines 4-6:

```html
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PJVRHMW9');</script>
    <!-- End Google Tag Manager -->
```

with:

```html
    <!-- Consent Mode v2 default-deny + replay (must precede GTM) -->
    {% renderTemplate "webc" %}
    <consent-banner-snippet></consent-banner-snippet>
    {% endrenderTemplate %}
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PJVRHMW9');</script>
    <!-- End Google Tag Manager -->
    <!-- Cookie consent UI -->
    <script defer src="/js/consent-cookie.js"></script>
    <script defer src="/js/cookie-consent.js"></script>
```

- [ ] **Step 3: Build the site to confirm Eleventy is happy**

Run: `npm run build`
Expected: build completes without errors. Output mentions Tailwind CSS compilation.

- [ ] **Step 4: Manually verify the rendered HTML**

Run: `grep -A 2 "consent" _site/index.html | head -40`
Expected: see the inline `<script>` block with `gtag('consent', 'default', ...)` rendered into `_site/index.html`, followed by the GTM IIFE, followed by the two `<script defer>` tags.

- [ ] **Step 5: Manually verify behavior in DevTools**

Run: `npm start`
Open `http://localhost:8080` in a fresh incognito window. In DevTools:
- **Console**: type `window.dataLayer` and confirm the first entry is `['consent', 'default', { ad_storage: 'denied', ... }]`. Type `window.cofConsent.initial` and confirm it is `null`.
- **Network**: filter for `googletagmanager.com`. The first GA hit (if any fires here) should carry `gcs=G100` (analytics denied).

If both check out, proceed.

- [ ] **Step 6: Commit**

```bash
git add _includes/components/consent-banner-snippet.webc _includes/layouts/base-tailwind.html
git commit -m "feat(consent): add Consent Mode v2 default-deny snippet before GTM"
```

---

## Task 3: Banner DOM, Accept / Reject handlers, `window.cofConsent.open()`

This task brings up the visible UI. After it lands, a fresh visitor sees the banner, can Accept or Reject, and the cookie is written.

**Files:**
- Create: `js/cookie-consent.js`

- [ ] **Step 1: Implement `js/cookie-consent.js`**

Create `js/cookie-consent.js`:

```javascript
/**
 * cof_consent banner — marketing site.
 *
 * Renders a sticky bottom-of-viewport bar on first visit, handles Accept /
 * Reject, writes the .chipsoffury.com cookie, and replays the choice via
 * gtag('consent', 'update', ...).
 *
 * Depends on:
 *   - window.CofConsentCookie (from /js/consent-cookie.js)
 *   - window.dataLayer + window.gtag (from the inline snippet in <head>)
 *   - window.cofConsent.initial (from the inline snippet)
 *
 * Exposes window.cofConsent.open() so the footer "Cookie Settings" link can
 * re-open the banner.
 */

(function () {
  if (!window.CofConsentCookie) {
    // Defensive: the inline snippet still default-denies, so missing the UI
    // doesn't violate consent. Just log and stop.
    if (window.console) console.warn('[cookie-consent] CofConsentCookie missing; banner will not render');
    return;
  }

  var BANNER_ID = 'cof-consent-banner';

  function nowEpochSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  function writeCookie(analyticsGranted) {
    var record = window.CofConsentCookie.buildRecord(analyticsGranted, nowEpochSeconds());
    document.cookie = window.CofConsentCookie.serialize(record, window.location);
    return record;
  }

  function gtagUpdate(analyticsGranted) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied'
    });
  }

  function removeBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function buildBanner(currentChoice) {
    // currentChoice: null (first visit) | true (currently accepted) | false (currently rejected)
    var wrap = document.createElement('div');
    wrap.id = BANNER_ID;
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Cookie consent');
    wrap.className = [
      'fixed', 'bottom-0', 'left-0', 'right-0', 'z-50',
      'bg-indigo-950', 'text-indigo-100', 'border-t', 'border-indigo-800',
      'shadow-2xl'
    ].join(' ');

    var inner = document.createElement('div');
    inner.className = [
      'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-4',
      'flex', 'flex-col', 'md:flex-row', 'md:items-center', 'gap-4'
    ].join(' ');

    var copyWrap = document.createElement('div');
    copyWrap.className = 'flex-1 text-sm leading-relaxed';
    copyWrap.innerHTML =
      'We use cookies to understand how visitors use Chips of Fury so we can improve it. ' +
      'Analytics is the only optional category. ' +
      '<a href="/cookies/" class="underline hover:text-white">Learn more</a>.';

    if (currentChoice !== null) {
      var status = document.createElement('div');
      status.className = 'mt-2 text-xs text-indigo-300';
      status.textContent = 'Currently: ' + (currentChoice ? 'Accepted' : 'Rejected');
      copyWrap.appendChild(status);
    }

    var btnWrap = document.createElement('div');
    btnWrap.className = 'flex gap-3 md:flex-shrink-0';

    function makeButton(label, isPrimary) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      // GDPR symmetry: equal prominence. Same size, same weight, same padding.
      // Only the color differs to keep the page navigable.
      b.className = [
        'flex-1', 'md:flex-initial',
        'px-6', 'py-2.5',
        'rounded-lg', 'font-semibold', 'text-sm',
        'transition-colors',
        isPrimary
          ? 'bg-white text-indigo-950 hover:bg-indigo-100'
          : 'bg-indigo-800 text-white hover:bg-indigo-700'
      ].join(' ');
      return b;
    }

    var acceptBtn = makeButton('Accept', true);
    var rejectBtn = makeButton('Reject', false);

    acceptBtn.addEventListener('click', function () {
      writeCookie(true);
      gtagUpdate(true);
      removeBanner();
    });
    rejectBtn.addEventListener('click', function () {
      writeCookie(false);
      gtagUpdate(false);
      removeBanner();
    });

    btnWrap.appendChild(rejectBtn);
    btnWrap.appendChild(acceptBtn);

    inner.appendChild(copyWrap);
    inner.appendChild(btnWrap);
    wrap.appendChild(inner);
    return wrap;
  }

  function showBanner(currentChoice) {
    removeBanner(); // idempotent
    var el = buildBanner(currentChoice);
    document.body.appendChild(el);
  }

  function open() {
    var current = window.CofConsentCookie.parse(document.cookie);
    showBanner(current ? current.analytics : null);
  }

  // Public API
  window.cofConsent = window.cofConsent || {};
  window.cofConsent.open = open;
  window.cofConsent.write = writeCookie;
  window.cofConsent.update = gtagUpdate;

  // First-visit auto-show: if no valid cookie, show the banner once the DOM is ready.
  function autoShow() {
    if (window.cofConsent.initial) return; // already chose
    showBanner(null);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoShow);
  } else {
    autoShow();
  }
})();
```

- [ ] **Step 2: Build the site**

Run: `npm run build`
Expected: build completes; `_site/js/cookie-consent.js` exists.

Run: `ls -l _site/js/cookie-consent.js _site/js/consent-cookie.js`
Expected: both files present.

- [ ] **Step 3: Manually test first-visit flow**

Run: `npm start`. In a fresh incognito browser at `http://localhost:8080`:
- Banner appears at bottom of viewport with one sentence + "Accept" and "Reject" buttons of equal size, "Reject" on the left, "Accept" on the right (white).
- DevTools → Application → Cookies: no `cof_consent` yet.
- Click **Accept**. Banner disappears. `cof_consent` cookie is now present with `Domain` empty (host-only on localhost), `Secure` unchecked.
- Decode the cookie value: it should be URL-encoded JSON of the form `{"v":1,"analytics":true,"ts":<recent-epoch>,"region":"OTHER"}`.
- DevTools → Console: `window.dataLayer` should now contain a `['consent', 'update', { analytics_storage: 'granted' }]` entry after the original `default deny`.

- [ ] **Step 4: Manually test reject flow**

Clear cookies, refresh. Click **Reject**.
- Banner disappears. `cof_consent` cookie present with `analytics: false`.
- `window.dataLayer` shows `['consent', 'update', { analytics_storage: 'denied' }]`.

- [ ] **Step 5: Manually test the re-open flow via console**

In an already-chosen state, run `window.cofConsent.open()` in the DevTools console.
- Banner reappears with a "Currently: Accepted" or "Currently: Rejected" line under the copy.
- Clicking the opposite button updates the cookie and dispatches a new `gtag('consent', 'update', ...)`.

- [ ] **Step 6: Commit**

```bash
git add js/cookie-consent.js
git commit -m "feat(consent): add banner UI with Accept/Reject and re-open hook"
```

---

## Task 4: Footer "Cookie Settings" link

**Files:**
- Modify: `_includes/components/site-footer.webc`

- [ ] **Step 1: Add the link to the footer's bottom bar**

In `_includes/components/site-footer.webc`, replace lines 70-73:

```html
        <div class="flex space-x-6 text-sm">
          <a href="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
```

with:

```html
        <div class="flex space-x-6 text-sm">
          <a href="/privacy-policy" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
          <a href="/cookies/" class="hover:text-white transition-colors">Cookies</a>
          <button
            type="button"
            class="hover:text-white transition-colors cursor-pointer"
            onclick="if(window.cofConsent&&window.cofConsent.open)window.cofConsent.open()"
          >Cookie Settings</button>
        </div>
```

- [ ] **Step 2: Build and visually verify**

Run: `npm start`. Visit any page that uses the footer (e.g., `http://localhost:8080/`). Scroll to the footer.
- Confirm both the "Cookies" link and the "Cookie Settings" button are visible alongside Privacy / Terms.
- Click **Cookie Settings**. Banner re-opens (with current-choice indicator if a cookie exists, plain banner otherwise).

- [ ] **Step 3: Commit**

```bash
git add _includes/components/site-footer.webc
git commit -m "feat(consent): add Cookie Settings link to site footer"
```

---

## Task 5: `/cookies/` page

**Files:**
- Create: `cookies.html`

This is content, not logic — but the page must exist before the footer link works as a navigation target.

- [ ] **Step 1: Create the page**

Create `cookies.html` (paths-with-trailing-slash convention is handled automatically by Eleventy: `cookies.html` → `/cookies/`):

```html
---
layout: layouts/base-tailwind
title: Cookie Policy | Chips of Fury
description: A complete list of every cookie used by Chips of Fury, what each one does, and how long it lasts.
permalink: /cookies/
---

{% renderTemplate "webc" %}
<site-navigation show-cof-brand="true"></site-navigation>
{% endrenderTemplate %}

<div class="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Cookie Policy</h1>
      <p class="text-purple-200 text-lg">Last updated: May 5, 2026</p>
    </div>

    <div class="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl">
      <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
        This page lists every cookie that <strong>chipsoffury.com</strong> and <strong>app.chipsoffury.com</strong> may set in your browser, what each one does, and how long it lasts.
      </p>
      <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-8">
        You can change your analytics choice at any time using the <strong>Cookie Settings</strong> link in our footer.
      </p>

      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">Strictly necessary</h2>
      <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
        These cookies are required for the site and app to function. They do not require consent.
      </p>
      <div class="overflow-x-auto mb-8">
        <table class="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead class="bg-gray-100 text-gray-900">
            <tr>
              <th class="px-4 py-2 border-b">Name</th>
              <th class="px-4 py-2 border-b">Purpose</th>
              <th class="px-4 py-2 border-b">Lifetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border-b font-mono">cof_consent</td>
              <td class="px-4 py-2 border-b">Stores your cookie-consent choice (Accept / Reject) so we don't show the banner again.</td>
              <td class="px-4 py-2 border-b">1 year</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-mono">popup-dismissed</td>
              <td class="px-4 py-2 border-b">Suppresses the "open in mobile app" popup on app.chipsoffury.com after you dismiss it once.</td>
              <td class="px-4 py-2 border-b">Session</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-mono">Auth tokens</td>
              <td class="px-4 py-2 border-b">Keep you signed in between visits to app.chipsoffury.com.</td>
              <td class="px-4 py-2 border-b">Up to 30 days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">Analytics (optional)</h2>
      <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
        These cookies are only set if you click <strong>Accept</strong> on our cookie banner. They help us understand which pages and features are useful so we can improve them. We do not sell or share this data.
      </p>
      <div class="overflow-x-auto mb-8">
        <table class="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead class="bg-gray-100 text-gray-900">
            <tr>
              <th class="px-4 py-2 border-b">Name</th>
              <th class="px-4 py-2 border-b">Set by</th>
              <th class="px-4 py-2 border-b">Purpose</th>
              <th class="px-4 py-2 border-b">Lifetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border-b font-mono">_ga</td>
              <td class="px-4 py-2 border-b">Google Analytics</td>
              <td class="px-4 py-2 border-b">Distinguishes unique visitors.</td>
              <td class="px-4 py-2 border-b">2 years</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-mono">_ga_&lt;id&gt;</td>
              <td class="px-4 py-2 border-b">Google Analytics</td>
              <td class="px-4 py-2 border-b">Persists session state for a specific GA4 property.</td>
              <td class="px-4 py-2 border-b">2 years</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
        If you reject analytics, Google Analytics still receives <em>cookieless pings</em> (no <code class="font-mono">_ga</code> cookie, no persistent identifier) so we retain a basic understanding of overall traffic without tracking individuals. This is Google's <a href="https://support.google.com/analytics/answer/9976101" class="text-indigo-700 underline">Advanced Consent Mode</a>.
      </p>
    </div>
  </div>
</div>

{% renderTemplate "webc" %}
<site-footer></site-footer>
{% endrenderTemplate %}
```

- [ ] **Step 2: Build and visit the page**

Run: `npm start`. Visit `http://localhost:8080/cookies/`.
- Page renders with header, two tables (Strictly necessary, Analytics), navigation, and footer.

- [ ] **Step 3: Verify the footer link navigates here**

From the home page, click the new "Cookies" link in the footer → lands on `/cookies/`.

- [ ] **Step 4: Commit**

```bash
git add cookies.html
git commit -m "feat(consent): add /cookies/ policy page"
```

---

## Task 6: End-to-end manual test matrix

This is the spec's test matrix narrowed to the marketing-site cases. Run all of these against `http://localhost:8080` in a fresh incognito session each time. There is no automated browser test infrastructure in this repo; verification is manual and visual + DevTools-driven, matching how the spec defines acceptance.

For each row: state the action, observe, check off.

- [ ] **#1 Fresh browser → load home page**

  - Banner shows at the bottom of the viewport.
  - DevTools → Network, filter `googletagmanager.com`: hits to `g/collect` carry `gcs=G100` (analytics denied).
  - DevTools → Application → Cookies: no `_ga` cookie. No `cof_consent` cookie.

- [ ] **#2 Click Accept**

  - Banner disappears.
  - Cookies: `cof_consent` present with URL-decoded value `{"v":1,"analytics":true,"ts":<n>,"region":"OTHER"}`. On localhost, `Domain` empty, `Secure` unchecked.
  - Subsequent GA `g/collect` hits carry `gcs=G111`.
  - `_ga` cookie now set by gtag.

- [ ] **#3 Refresh page**

  - No banner.
  - `cof_consent` persists.
  - Hits stay at `gcs=G111`.

- [ ] **#4 Click footer Cookie Settings**

  - Banner re-opens with "Currently: Accepted" line below the copy.

- [ ] **#5 Click Reject from the re-opened banner**

  - Cookie updates: `analytics: false`. `ts` updates to current time.
  - Subsequent GA hits carry `gcs=G100`.
  - `_ga` cookie may persist briefly (Google clears it on its own schedule); the important assertion is that no new `_ga`-bearing hits are sent.

- [ ] **#6 Fresh browser → click Reject**

  - `cof_consent` written with `analytics: false`. Banner gone.
  - Network: only cookieless pings (`gcs=G100`). No `_ga` cookie ever set.

- [ ] **#7 Schema-version invalidation**

  In DevTools → Application → Cookies, edit the `cof_consent` value to `%7B%22v%22%3A0%2C%22analytics%22%3Atrue%2C%22ts%22%3A1%2C%22region%22%3A%22OTHER%22%7D` (URL-encoded `{"v":0,...}`). Refresh.

  - Banner reappears (the `v < 1` cookie is treated as missing).
  - `window.cofConsent.initial` in the console is `null`.

- [ ] **#8 Cookie Policy page**

  - Visit `/cookies/`. Page renders. Both tables (necessary, analytics) populated. Footer link to "Cookie Settings" works.

- [ ] **Final commit if any tweaks were needed**

  If any of the above revealed bugs requiring code edits, commit fixes in their own commits with messages like `fix(consent): <what>`. If everything passed clean, no extra commit is needed.

---

## What this plan deliberately does NOT do

- **Does not add the consent layer to `_includes/layouts/base.html`.** That layout (used by webflow-era pages) does not load GTM today, so it doesn't need a Consent Mode v2 gate. It also doesn't get the banner — pages on this layout are being phased out, and adding the WebC component there would require migrating those pages too. If a user lands on a non-tailwind page first, they'll see the banner the next time they visit a tailwind page.
- **Does not implement geo-detection.** Per the spec, the banner shows globally to all visitors. The `region` field is hard-coded `"OTHER"`.
- **Does not add a server-side consent log.** Per the spec, the cookie is the record of consent.
- **Does not change the `cof_app` (Flutter) repo.** That work lives in the spec's companion plan (`docs/superpowers/plans/2026-05-05-gdpr-consent-banner-cof-app.md` in the `cof_app` repo). Both implementations agree on the cookie name, domain, and schema; that's the only contract that matters for cross-subdomain sharing.
- **Does not gate the Apple Sign-In SDK or any other strictly-necessary script.** The spec classifies those as not requiring consent.
- **Does not update the existing Privacy Policy page.** That's a copywriting task that should be done in a separate PR by the policy owner.

## Future trip-wire (read before adding any new tracking SDK)

The two-button Accept/Reject layout is **only compliant because we have exactly one optional category** (analytics). If a second optional category is added later — Meta Pixel, Hotjar/FullStory, Sentry session replay, an A/B testing SDK with tracking — bundling them under one button violates GDPR's granularity requirement.

When that happens, the migration is:

1. Bump `CURRENT_VERSION` in `js/consent-cookie.js` from `1` to `2` (auto-invalidates existing cookies and re-prompts everyone).
2. Bump the `CURRENT_VERSION` constant in `_includes/components/consent-banner-snippet.webc` to match.
3. Add the new boolean field to `buildRecord()` and to the schema check in `parse()`.
4. Restructure the banner: keep "Accept All" / "Reject All" as one-click shortcuts, **add a "Customize" path** with per-category toggles. All three top-level options must be equally prominent.
5. If a marketing pixel is added, switch the relevant Consent Mode v2 signals (`ad_storage`, `ad_user_data`, `ad_personalization`) from permanently-denied to consent-gated.
6. Update `cookies.html` to list the new category and its purpose.

CNIL has issued multi-million-euro fines for exactly the "lump everything under one Accept" pattern (Amazon €746M, Google €100M, Meta €60M). Default to assuming a new SDK counts; false positives cost nothing.
