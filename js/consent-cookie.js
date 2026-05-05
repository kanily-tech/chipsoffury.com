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
