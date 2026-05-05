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

  // GA's gtag.js does not delete _ga / _ga_<id> when consent is revoked;
  // it only stops sending full hits. We delete them ourselves on Reject so
  // the persistent identifier is actually gone.
  function clearGaCookies() {
    var names = [];
    var parts = (document.cookie || '').split(';');
    for (var i = 0; i < parts.length; i++) {
      var name = parts[i].trim().split('=')[0];
      if (name === '_ga' || name.indexOf('_ga_') === 0) names.push(name);
    }
    if (!names.length) return;
    var local = window.CofConsentCookie._isLocalHostname(window.location.hostname);
    for (var j = 0; j < names.length; j++) {
      var attrs = [names[j] + '=', 'Path=/', 'Max-Age=0'];
      if (!local) attrs.push('Domain=.chipsoffury.com');
      document.cookie = attrs.join('; ');
    }
  }

  function buildBanner(currentChoice) {
    // currentChoice: null (first visit) | true (currently accepted) | false (currently rejected)
    var wrap = document.createElement('div');
    wrap.id = BANNER_ID;
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Cookie consent');
    wrap.className = [
      'fixed', 'bottom-0', 'left-0', 'right-0', 'z-50',
      'bg-white', 'text-slate-900', 'border-t-4', 'border-indigo-500',
      'shadow-2xl'
    ].join(' ');

    // Close button — only when re-opened from Cookie Settings (currentChoice
    // is non-null). On first visit GDPR forbids treating dismissal as consent,
    // so no close affordance until a choice exists.
    if (currentChoice !== null) {
      var closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.textContent = '×';
      closeBtn.className = [
        'absolute', 'top-3', 'left-3',
        'w-10', 'h-10', 'flex', 'items-center', 'justify-center',
        'rounded-full', 'bg-slate-100', 'hover:bg-slate-200',
        'text-2xl', 'leading-none', 'text-slate-700', 'hover:text-slate-900',
        'transition-colors', 'cursor-pointer'
      ].join(' ');
      closeBtn.addEventListener('click', removeBanner);
      wrap.appendChild(closeBtn);
    }

    var inner = document.createElement('div');
    var innerClasses = [
      'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-4',
      'flex', 'flex-col', 'md:flex-row', 'md:items-center', 'gap-4'
    ];
    // Reserve left space for the absolute-positioned close button so it
    // doesn't overlap the copy.
    if (currentChoice !== null) innerClasses.push('pl-16', 'sm:pl-16', 'lg:pl-20');
    inner.className = innerClasses.join(' ');

    var copyWrap = document.createElement('div');
    copyWrap.className = 'flex-1 text-sm leading-relaxed';
    copyWrap.innerHTML =
      'We use cookies to understand how visitors use Chips of Fury so we can improve it. ' +
      'Analytics is the only optional category. ' +
      '<a href="/cookies/" class="underline text-indigo-600 hover:text-indigo-800">Learn more</a>.';

    if (currentChoice !== null) {
      var status = document.createElement('div');
      status.className = 'mt-2 text-xs text-slate-500';
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
          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
          : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300'
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
      clearGaCookies();
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
