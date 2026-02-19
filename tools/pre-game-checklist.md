---
title: "Poker Home Game Rules and Invite Generator | Chips of Fury"
date: 2026-02-12
description: "Generate a shareable poker night checklist in seconds. Set stakes, buy-in, rebuys, house rules, and logistics — then copy-paste it into your group chat."
ogImage: "https://chipsoffury.com/images/pre-game-checklist-og.webp"
extraStylesheets:
  - "/css/pre-game-checklist.css"
extraScripts:
  - "/js/pre-game-checklist-page.js"
---

<section class="cof-lp-hero">
  <div class="cof-lp-deco cof-lp-deco--1" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--2" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--3" aria-hidden="true"></div>
  <div class="cof-lp-hero-inner">
    <div class="cof-lp-eyebrow">Free Tool</div>
    <h1 class="cof-lp-h1">Pre-Game Checklist Generator</h1>
    <ol class="cof-lp-steps-list">
      <li><span class="cof-lp-step-num">1</span><span><strong>Pick your format</strong> — cash game or tournament</span></li>
      <li><span class="cof-lp-step-num">2</span><span><strong>Fill in the details</strong> — stakes, rebuys, house rules, logistics</span></li>
      <li><span class="cof-lp-step-num">3</span><span><strong>Copy and share</strong> — paste into your group chat</span></li>
    </ol>
    <a href="#checklist" class="cof-lp-cta">Start Building <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></a>
  </div>
</section>

<section id="checklist" class="cof-lp-tool">
<div id="cof-checklist">

<!-- Shared link banner (hidden by default) -->
<div class="cof-cl-shared-banner cof-cl-hidden" id="cof-shared-banner">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
  <span>Loaded from a shared link. Edit anything to make it yours.</span>
  <button onclick="document.getElementById('cof-shared-banner').classList.add('cof-cl-hidden')" aria-label="Dismiss">&times;</button>
</div>

<!-- Format Selector -->
<div class="cof-cl-format-wrap">
  <div class="cof-cl-format" role="radiogroup" aria-label="Game format">
    <button type="button" class="cof-cl-format-btn is-active" role="radio" aria-checked="true" data-format="cash">Cash Game</button>
    <button type="button" class="cof-cl-format-btn" role="radio" aria-checked="false" data-format="tournament">Tournament</button>
  </div>
</div>

<div class="cof-cl-layout">
<div class="cof-cl-form-area">

<!-- Section 1: Stakes & Buy-in -->
<div class="cof-cl-section is-expanded" data-section="stakes" id="sec-stakes">
  <button type="button" class="cof-cl-section-header" aria-expanded="true" aria-controls="sec-stakes-body">
    <div class="cof-cl-section-left">
      <span class="cof-cl-section-num">1</span>
      <span class="cof-cl-section-title">Stakes &amp; Buy-in</span>
      <span class="cof-cl-section-summary" id="sum-stakes"></span>
    </div>
    <div class="cof-cl-section-right">
      <span class="cof-cl-check" id="chk-stakes"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-stakes-body">
    <!-- Cash fields -->
    <div data-show="cash">
      <div class="cof-cl-grid-2">
        <div class="cof-cl-field">
          <label for="cof-buyin-min">Min buy-in</label>
          <div class="cof-cl-stepper">
            <button type="button" class="cof-cl-step-btn" data-step="-1" data-target="cof-buyin-min" aria-label="Decrease min buy-in">&minus;</button>
            <div class="cof-cl-currency-wrap">
              <input type="number" id="cof-buyin-min" value="20" min="1" step="1" placeholder="20">
            </div>
            <button type="button" class="cof-cl-step-btn" data-step="1" data-target="cof-buyin-min" aria-label="Increase min buy-in">+</button>
          </div>
        </div>
        <div class="cof-cl-field" id="cof-buyin-max-field">
          <label for="cof-buyin-max">Max buy-in</label>
          <div class="cof-cl-stepper">
            <button type="button" class="cof-cl-step-btn" data-step="-1" data-target="cof-buyin-max" aria-label="Decrease max buy-in">&minus;</button>
            <div class="cof-cl-currency-wrap">
              <input type="number" id="cof-buyin-max" value="40" min="1" step="1" placeholder="40" aria-describedby="err-buyin">
            </div>
            <button type="button" class="cof-cl-step-btn" data-step="1" data-target="cof-buyin-max" aria-label="Increase max buy-in">+</button>
          </div>
        </div>
      </div>
      <div class="cof-cl-error" id="err-buyin">Max buy-in must be at least the minimum.</div>
      <div class="cof-cl-helper" id="cof-depth-label" style="margin-bottom:0.5rem"></div>
      <div class="cof-cl-grid-2">
        <div class="cof-cl-field" id="cof-sb-field">
          <label for="cof-sb">Small blind</label>
          <div class="cof-cl-currency-wrap">
            <input type="number" id="cof-sb" value="0.25" min="0.01" step="0.01" placeholder="0.25">
          </div>
        </div>
        <div class="cof-cl-field" id="cof-bb-field">
          <label for="cof-bb">Big blind</label>
          <div class="cof-cl-currency-wrap">
            <input type="number" id="cof-bb" value="0.50" min="0.01" step="0.01" placeholder="0.50" aria-describedby="err-bb">
          </div>
        </div>
      </div>
      <div class="cof-cl-error" id="err-bb">Big blind must be greater than small blind.</div>
      <label class="cof-cl-auto-check">
        <input type="checkbox" id="cof-auto-buyin" checked>
        <span class="cof-cl-checkmark"></span>
        <span>Auto-calculate blinds &amp; max buy-in</span>
      </label>
    </div>
    <!-- Tournament fields -->
    <div data-show="tournament">
      <div class="cof-cl-field">
        <label for="cof-tourn-buyin">Tournament buy-in</label>
        <div class="cof-cl-stepper">
          <button type="button" class="cof-cl-step-btn" data-step="-1" data-target="cof-tourn-buyin" aria-label="Decrease tournament buy-in">&minus;</button>
          <div class="cof-cl-currency-wrap">
            <input type="number" id="cof-tourn-buyin" value="40" min="1" step="1" placeholder="40">
          </div>
          <button type="button" class="cof-cl-step-btn" data-step="1" data-target="cof-tourn-buyin" aria-label="Increase tournament buy-in">+</button>
        </div>
      </div>
    </div>
    <div data-show="tournament" id="cof-bounty-section">
      <div class="cof-cl-toggle-row">
        <button type="button" class="cof-cl-toggle" role="switch" aria-checked="false" id="cof-bounty-on" aria-label="Bounty tournament"></button>
        <span class="cof-cl-toggle-label">Bounty tournament</span>
      </div>
      <div id="cof-bounty-fields" class="cof-cl-hidden">
        <div class="cof-cl-field">
          <label for="cof-bounty-amt">Bounty amount</label>
          <div class="cof-cl-currency-wrap">
            <input type="number" id="cof-bounty-amt" value="10" min="1" step="1" placeholder="10" aria-describedby="err-bounty">
          </div>
          <div class="cof-cl-error" id="err-bounty">Bounty must be less than the total buy-in.</div>
        </div>
      </div>
    </div>
    <div data-show="tournament">
      <div class="cof-cl-field">
        <label for="cof-start-chips">Starting chips</label>
        <input type="number" id="cof-start-chips" value="10000" min="100" step="100" placeholder="10,000">
      </div>
      <div class="cof-cl-field">
        <label for="cof-payout">Payout structure</label>
        <select id="cof-payout">
          <option value="wta">Winner take all</option>
          <option value="70/30">70 / 30 (2 players paid)</option>
          <option value="50/30/20" selected>50 / 30 / 20 (3 players paid)</option>
          <option value="40/25/20/15">40 / 25 / 20 / 15 (4 players paid)</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <div class="cof-cl-field cof-cl-hidden" id="cof-payout-custom-wrap">
        <label for="cof-payout-custom">Custom payout</label>
        <input type="text" id="cof-payout-custom" placeholder="e.g. 60 / 25 / 15" maxlength="60">
      </div>
    </div>
  </div>
</div>

<!-- Section 2: Rebuys -->
<div class="cof-cl-section" data-section="rebuys" id="sec-rebuys">
  <button type="button" class="cof-cl-section-header" aria-expanded="false" aria-controls="sec-rebuys-body">
    <div class="cof-cl-section-left">
      <span class="cof-cl-section-num">2</span>
      <span class="cof-cl-section-title">Rebuys</span>
      <span class="cof-cl-section-summary" id="sum-rebuys"></span>
    </div>
    <div class="cof-cl-section-right">
      <span class="cof-cl-check" id="chk-rebuys"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-rebuys-body">
    <!-- Cash: top-ups -->
    <div data-show="cash" id="cof-topup-section">
      <div class="cof-cl-helper" style="margin-bottom:0.5rem" id="cof-topup-desc">Unlimited top-ups to max buy-in between hands.</div>
      <label class="cof-cl-auto-check">
        <input type="checkbox" id="cof-topup-limited">
        <span class="cof-cl-checkmark"></span>
        <span>Limit top-ups</span>
      </label>
      <div class="cof-cl-field cof-cl-hidden" id="cof-topup-limit-wrap" style="margin-top:0.5rem">
        <label for="cof-topup-limit">Max top-ups per player</label>
        <div class="cof-cl-stepper">
          <button type="button" class="cof-cl-step-btn" data-step="-1" data-target="cof-topup-limit" aria-label="Decrease top-up limit">&minus;</button>
          <input type="number" id="cof-topup-limit" value="3" min="0" step="1" placeholder="3">
          <button type="button" class="cof-cl-step-btn" data-step="1" data-target="cof-topup-limit" aria-label="Increase top-up limit">+</button>
        </div>
      </div>
    </div>
    <!-- Tournament: full rebuy settings -->
    <div data-show="tournament">
      <div class="cof-cl-toggle-row">
        <button type="button" class="cof-cl-toggle" role="switch" aria-checked="true" id="cof-rebuys-on" aria-label="Rebuys allowed"></button>
        <span class="cof-cl-toggle-label">Rebuys allowed</span>
      </div>
    </div>
    <div id="cof-rebuys-fields" data-show="tournament">
      <div class="cof-cl-grid-2">
        <div class="cof-cl-field">
          <label for="cof-rebuys-max">Max rebuys</label>
          <input type="number" id="cof-rebuys-max" value="1" min="1" step="1" placeholder="1">
        </div>
        <div class="cof-cl-field">
          <label for="cof-rebuys-window">Rebuy window (min)</label>
          <input type="number" id="cof-rebuys-window" value="90" min="1" step="1" placeholder="90">
        </div>
      </div>
      <div class="cof-cl-field">
        <label for="cof-rebuys-amount">Rebuy amount</label>
        <select id="cof-rebuys-amount">
          <option value="same" selected>Same as initial buy-in</option>
          <option value="custom">Custom amount</option>
        </select>
      </div>
      <div class="cof-cl-field cof-cl-hidden" id="cof-rebuys-custom-wrap">
        <label for="cof-rebuys-custom">Custom rebuy amount</label>
        <div class="cof-cl-currency-wrap">
          <input type="number" id="cof-rebuys-custom" value="" min="1" step="1" placeholder="50">
        </div>
      </div>
      <!-- Tournament add-on -->
      <div data-show="tournament" id="cof-addon-section">
        <div class="cof-cl-toggle-row" style="margin-top: 0.5rem;">
          <button type="button" class="cof-cl-toggle" role="switch" aria-checked="false" id="cof-addon-on" aria-label="Add-on allowed"></button>
          <span class="cof-cl-toggle-label">Add-on allowed</span>
        </div>
        <div id="cof-addon-fields" class="cof-cl-hidden">
          <div class="cof-cl-grid-2">
            <div class="cof-cl-field">
              <label for="cof-addon-amount">Add-on amount</label>
              <div class="cof-cl-currency-wrap">
                <input type="number" id="cof-addon-amount" value="20" min="1" step="1" placeholder="20">
              </div>
            </div>
            <div class="cof-cl-field">
              <label for="cof-addon-chips">Add-on chips</label>
              <input type="number" id="cof-addon-chips" value="5000" min="100" step="100" placeholder="5,000">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Section 3: Money -->
<div class="cof-cl-section" data-section="money" id="sec-money">
  <button type="button" class="cof-cl-section-header" aria-expanded="false" aria-controls="sec-money-body">
    <div class="cof-cl-section-left">
      <span class="cof-cl-section-num">3</span>
      <span class="cof-cl-section-title">Money</span>
      <span class="cof-cl-section-summary" id="sum-money"></span>
    </div>
    <div class="cof-cl-section-right">
      <span class="cof-cl-check" id="chk-money"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-money-body">
    <div class="cof-cl-field">
      <label for="cof-banker">Banker name</label>
      <input type="text" id="cof-banker" placeholder="e.g. Mike" maxlength="40">
      <div class="cof-cl-helper">Who handles buy-ins and cash-outs?</div>
    </div>
    <div class="cof-cl-field">
      <label>Payment methods</label>
      <div class="cof-cl-chips" id="cof-payment-methods">
        <button type="button" class="cof-cl-chip is-selected" data-payment="cash">Cash</button>
        <button type="button" class="cof-cl-chip" data-payment="venmo">Venmo</button>
        <button type="button" class="cof-cl-chip" data-payment="zelle">Zelle</button>
        <button type="button" class="cof-cl-chip" data-payment="cashapp">Cash App</button>
        <button type="button" class="cof-cl-chip" data-payment="upi">UPI</button>
        <button type="button" class="cof-cl-chip" data-payment="other">Other</button>
      </div>
    </div>
    <div class="cof-cl-field cof-cl-hidden" id="cof-payment-other-wrap">
      <label for="cof-payment-other">Other payment method</label>
      <input type="text" id="cof-payment-other" placeholder="e.g. PayPal" maxlength="30">
    </div>
    <div class="cof-cl-field">
      <label for="cof-settle">Settle-up policy</label>
      <select id="cof-settle">
        <option value="at_cashout" selected>Settle at cash-out</option>
        <option value="after_last_hand">Settle after last hand</option>
        <option value="next_day">Settle by next day</option>
        <option value="before_next">Flexible — settle before next game</option>
      </select>
    </div>
  </div>
</div>

<!-- Section 4: House Rules -->
<div class="cof-cl-section" data-section="rules" id="sec-rules">
  <button type="button" class="cof-cl-section-header" aria-expanded="false" aria-controls="sec-rules-body">
    <div class="cof-cl-section-left">
      <span class="cof-cl-section-num">4</span>
      <span class="cof-cl-section-title">House Rules</span>
      <span class="cof-cl-section-summary" id="sum-rules"></span>
    </div>
    <div class="cof-cl-section-right">
      <span class="cof-cl-check" id="chk-rules"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-rules-body">
    <div class="cof-cl-rules-grid" id="cof-rules-list"></div>
    <div style="margin-top: 0.75rem;">
      <label style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.35rem; display: block;">Custom Rules</label>
      <div class="cof-cl-custom-rules" id="cof-custom-rules"></div>
      <button type="button" class="cof-cl-add-btn" id="cof-add-custom-rule">+ Add custom rule</button>
      <div class="cof-cl-helper" id="cof-custom-rules-count"></div>
    </div>
  </div>
</div>

<!-- Section 5: Logistics -->
<div class="cof-cl-section" data-section="logistics" id="sec-logistics">
  <button type="button" class="cof-cl-section-header" aria-expanded="false" aria-controls="sec-logistics-body">
    <div class="cof-cl-section-left">
      <span class="cof-cl-section-num">5</span>
      <span class="cof-cl-section-title">Logistics</span>
      <span class="cof-cl-section-summary" id="sum-logistics"></span>
    </div>
    <div class="cof-cl-section-right">
      <span class="cof-cl-check" id="chk-logistics"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-logistics-body">
    <div class="cof-cl-grid-2">
      <div class="cof-cl-field">
        <label for="cof-date">Game date</label>
        <input type="date" id="cof-date">
      </div>
      <div class="cof-cl-field">
        <label for="cof-start-time">Start time</label>
        <input type="time" id="cof-start-time" value="19:00">
      </div>
    </div>
    <div class="cof-cl-grid-2">
      <div class="cof-cl-field">
        <label for="cof-last-buyin-time">Last buy-in time <button type="button" class="cof-cl-clear-btn" data-clear="cof-last-buyin-time">clear</button></label>
        <input type="time" id="cof-last-buyin-time" value="21:00">
      </div>
      <div class="cof-cl-field">
        <label for="cof-hard-stop">Hard stop time <button type="button" class="cof-cl-clear-btn" data-clear="cof-hard-stop">clear</button></label>
        <input type="time" id="cof-hard-stop">
      </div>
    </div>
    <div class="cof-cl-field">
      <label for="cof-breaks">Break schedule</label>
      <select id="cof-breaks">
        <option value="every_90" selected>Every 90 minutes</option>
        <option value="every_orbit">Every dealer button orbit</option>
        <option value="every_60">Every 60 minutes</option>
        <option value="no_breaks">No scheduled breaks</option>
      </select>
    </div>
    <div class="cof-cl-grid-2">
      <div class="cof-cl-field">
        <label for="cof-location-name">Location name</label>
        <input type="text" id="cof-location-name" placeholder="e.g. Mike's place" maxlength="60">
      </div>
      <div class="cof-cl-field">
        <label for="cof-location-addr">Address</label>
        <input type="text" id="cof-location-addr" placeholder="e.g. 123 Main St, Apt 4B" maxlength="100">
      </div>
    </div>
    <div class="cof-cl-field">
      <label for="cof-notes">Notes</label>
      <textarea id="cof-notes" placeholder="e.g. Street parking is free after 6 PM" maxlength="280"></textarea>
      <div class="cof-cl-helper"><span id="cof-notes-count">0</span>/280</div>
    </div>
  </div>
</div>

</div><!-- end form-area -->

<!-- Output Panel (desktop sidebar) -->
<div class="cof-cl-output">
  <div class="cof-cl-output-header">
    <h3>Preview</h3>
    <p>Send this to your group chat</p>
  </div>
  <div class="cof-cl-output-preview">
    <div class="cof-cl-preview-text" id="cof-preview-desktop"></div>
  </div>
  <div class="cof-cl-output-actions">
    <button type="button" class="cof-cl-btn-copy" id="cof-copy-desktop">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      Copy to Clipboard
    </button>
    <button type="button" class="cof-cl-btn-link" id="cof-share-desktop">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      Save Configuration
    </button>
    <button type="button" class="cof-cl-btn-link" id="cof-print-btn" onclick="window.print()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
      Print
    </button>
    <div class="cof-cl-url-warning" id="cof-url-warning">Link may be too long for some apps. Try removing custom rules or notes.</div>
  </div>
</div>

</div><!-- end layout -->
</div><!-- end cof-checklist -->

<!-- Mobile bottom bar -->
<div class="cof-cl-bottom-bar" id="cof-bottom-bar">
  <button type="button" class="cof-cl-bar-preview-btn" id="cof-bar-preview">Preview</button>
  <button type="button" class="cof-cl-bar-copy-btn" id="cof-share-mobile">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
    Save Configuration
  </button>
</div>

<!-- Mobile bottom sheet -->
<div class="cof-cl-sheet-backdrop" id="cof-sheet-backdrop"></div>
<div class="cof-cl-sheet" id="cof-sheet">
  <div class="cof-cl-sheet-handle"></div>
  <div class="cof-cl-sheet-content">
    <div class="cof-cl-preview-text" id="cof-preview-mobile"></div>
  </div>
  <div class="cof-cl-sheet-actions">
    <button type="button" class="cof-cl-btn-copy" id="cof-copy-mobile">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      Copy to Clipboard
    </button>
  </div>
</div>

<!-- Toast -->
<div class="cof-cl-toast" id="cof-toast" aria-live="polite"></div>

</section>

<section style="background: #FAFAF6; border-top: 1px solid #E8E5DD; padding: 3.5rem 1.5rem;">
  <div style="max-width: 36rem; margin: 0 auto; text-align: center;">
    <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #8B7335; margin-bottom: 0.45rem;">Feedback</div>
    <h2 style="font-family: var(--font-heading); font-size: clamp(1.4rem, 3.2vw, 1.85rem); font-weight: 700; line-height: 1.2; letter-spacing: -0.015em; color: #1A2E23; margin: 0 0 1rem;">Have a suggestion or found a bug?</h2>
    <p style="font-size: 0.95rem; line-height: 1.6; color: #5F6B63; margin: 0 0 1.5rem;">This tool is actively maintained. If something doesn't work for your game, or you have an idea that would make it more useful, we'd love to hear from you.</p>
    <a href="/contact/" style="display: inline-flex; align-items: center; gap: 0.45rem; background: #BFA24E; color: #091A12; font-family: var(--font-heading); font-weight: 700; padding: 0.85rem 1.7rem; border-radius: 10px; font-size: 0.95rem; text-decoration: none; letter-spacing: 0.01em; transition: background 0.2s, transform 0.12s;" onmouseover="this.style.background='#CEAF5C';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#BFA24E';this.style.transform='none'">Send Feedback</a>
  </div>
</section>
