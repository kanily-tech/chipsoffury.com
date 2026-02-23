---
title: "Poker Night Checklist & Home Game Invite Generator | Chips of Fury"
date: 2026-02-12
description: "The ultimate checklist and invite generator for hosting a poker night. Set your stakes, establish standard house rules, handle buy-ins safely, and generate a text invite for your group chat."
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
    <h1 class="cof-lp-h1">Poker Night Checklist & Home Game Invite Generator</h1>
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

<div class="cof-cl-top-actions">
  <button type="button" class="cof-cl-save-top-btn" id="cof-share-top">Save Configuration</button>
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
      <div class="cof-cl-helper cof-cl-mb-sm" id="cof-depth-label"></div>
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
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-rebuys-body">
    <!-- Cash: top-ups -->
    <div data-show="cash" id="cof-topup-section">
      <div class="cof-cl-helper cof-cl-mb-sm" id="cof-topup-desc">Unlimited top-ups to max buy-in between hands.</div>
      <label class="cof-cl-auto-check">
        <input type="checkbox" id="cof-topup-limited">
        <span class="cof-cl-checkmark"></span>
        <span>Limit top-ups</span>
      </label>
      <div class="cof-cl-field cof-cl-hidden cof-cl-mt-sm" id="cof-topup-limit-wrap">
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
        <div class="cof-cl-toggle-row cof-cl-mt-sm">
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
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-rules-body">
    <div class="cof-cl-rules-grid" id="cof-rules-list"></div>
    <div class="cof-cl-mt-md">
      <label class="cof-cl-section-label">Custom Rules</label>
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
      <svg class="cof-cl-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  </button>
  <div class="cof-cl-section-body" id="sec-logistics-body">
    <div class="cof-cl-field">
      <label for="cof-announcement">Custom Announcement</label>
      <textarea id="cof-announcement" placeholder="e.g. We'll play Texas Hold'em. New players welcome — we'll do a quick walkthrough before we start." maxlength="280"></textarea>
      <div class="cof-cl-helper">Shown right below the title in the preview invite.</div>
      <div class="cof-cl-helper"><span id="cof-announcement-count">0</span>/280</div>
    </div>
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
      <label for="cof-notes">Logistics Notes</label>
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

<!-- Toast -->
<div class="cof-cl-toast" id="cof-toast" aria-live="polite"></div>

</section>

<section class="cof-lp-problems">
  <div class="cof-lp-problems-inner">
    <div class="cof-lp-tag">The Problem</div>
    <h2 class="cof-lp-h2">Poker night planning always falls apart in the same ways</h2>
    <div class="cof-lp-cards">
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">🃏</div>
        <h3>Rule disputes kill the vibe</h3>
        <p>It's 1 AM and two players are arguing about whether that was a string bet. Nobody agreed on the rules beforehand, so now every ruling feels arbitrary. These arguments don't happen when the rules are written down and sent out before the game.</p>
      </div>
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">💸</div>
        <h3>The banker math never adds up</h3>
        <p>Three people paid cash, two sent Venmo, and someone owes from last week. By the end of the night, the banker is $15 short and nobody can figure out where it went. A simple ledger fixes this, but nobody thinks to set one up.</p>
      </div>
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">📱</div>
        <h3>Herding cats for RSVPs</h3>
        <p>You text the group chat on Monday. Two people reply "maybe." By Friday, you still don't know if you have 4 players or 9. Pro tip: expect about 50% of "maybes" to actually show. "Maybe" almost always means no.</p>
      </div>
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">⏱️</div>
        <h3>Setup eats into play time</h3>
        <p>Everyone shows up at 7, but the first hand doesn't get dealt until 7:45 because you're still debating [blinds](glossary:blinds), buy-in amounts, and whether rebuys are allowed. Send the details ahead of time and you can start playing the minute people sit down.</p>
      </div>
    </div>
  </div>
</section>

<section class="cof-lp-problems cof-lp--white">
  <div class="cof-lp-problems-inner">
    <div class="cof-lp-tag">Equipment</div>
    <h2 class="cof-lp-h2">The Poker Night Equipment Checklist</h2>
    <p class="cof-lp-body">You don't need much to host a good game. Here's what actually matters.</p>
    <div class="cof-lp-table-wrap">
      <table class="cof-lp-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>What to Get</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Playing cards</strong></td>
            <td>100% plastic, 2 decks minimum</td>
            <td class="muted">Copag or KEM are the standard. ~$15 per deck and they last years. Paper cards bend, mark, and stick together.</td>
          </tr>
          <tr>
            <td><strong>Chip set</strong></td>
            <td>300-piece (4-6 players) or 500-piece (6-8+)</td>
            <td class="muted">Clay composite hits the sweet spot between feel and price. Avoid the ultra-light plastic sets. Not sure how to split them up? Use our <a href="/chip-distribution-calculator/">Chip Distribution Calculator</a>.</td>
          </tr>
          <tr>
            <td><strong>Table surface</strong><br><span class="muted">Optional</span></td>
            <td>Felt topper ($10-50) or folding poker table ($160-200)</td>
            <td class="muted">A felt topper on a dining table works fine. Chips slide properly and cards don't bounce.</td>
          </tr>
          <tr>
            <td><strong>Dealer button</strong></td>
            <td>Usually part of the chip set</td>
            <td class="muted">If not in chip set, any distinct object works as a button.</td>
          </tr>
          <tr>
            <td><strong>Snacks</strong></td>
            <td>Non-greasy only</td>
            <td class="muted">Pretzels, nuts, jerky, candy - all fine. Potato chips, wings, and pizza are chip-destroyers. Keep all food off the felt.</td>
          </tr>
          <tr>
            <td><strong>Seating</strong></td>
            <td>Count your chairs before game day</td>
            <td class="muted">Sounds obvious. Gets forgotten constantly. Folding chairs from a hardware store work.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="cof-lp-features">
  <div class="cof-lp-features-inner cof-lp-narrow">
    <div class="cof-lp-tag">House Rules</div>
    <h2 class="cof-lp-h2">Standard House Rules Explained</h2>
    <p class="cof-lp-body">The tool above has 21 rules to choose from. These six are the ones that matter most, especially if anyone at the table is new to poker. Agree on them before the first hand.</p>

    <div class="cof-lp-faq-item">
      <h3>No string betting</h3>
      <p>Put all your chips in with one motion, or say your bet amount before you touch chips. You can't toss in a few chips, watch for a reaction, then add more. This is the single most common rule dispute in home games. Read more about betting mechanics in our <a href="/learn/poker-house-rules-to-keep-the-game-moving/">house rules guide</a>.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>No going south</h3>
      <p>Once chips are on the table, they stay on the table until you leave the game. No pocketing $50 after a big win and playing with a short stack. If you sat down with it or won it, it's in play. This is also called "ratholing" and it's banned in every serious game.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>Table stakes</h3>
      <p>You can only bet what's physically in front of you. No reaching into wallets mid-hand, no writing IOUs on napkins. If you run out of chips during a hand, you're all-in for whatever you had. This protects everyone at the table.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>Show one, show all</h3>
      <p>If you show your [hole cards](glossary:hole-cards) to one player after a hand, the whole table gets to see. No selective information sharing. This keeps the game fair and avoids any suspicion of soft play between friends.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>Cards speak</h3>
      <p>At [showdown](glossary:showdown), the physical cards determine the winner, not what someone says they have. If a player says "I have a flush" but actually has a straight, the straight plays. Mistakes happen. The cards are the final word.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>Single chip without declaration = call</h3>
      <p>If someone bets $5 and you toss in a single $25 chip without saying "raise," it's just a call. You get $20 change. To raise, you have to say "raise" before the chip hits the felt. This trips up new players constantly, so make sure everyone knows before the game starts.</p>
    </div>
  </div>
</section>

<section class="cof-lp-problems cof-lp--white">
  <div class="cof-lp-problems-inner cof-lp-narrow">
    <div class="cof-lp-tag">Money</div>
    <h2 class="cof-lp-h2">How to Handle the Bank</h2>
    <p class="cof-lp-body">Money problems ruin more poker nights than bad beats. Follow these rules and you'll never end a session with someone feeling shortchanged.</p>

    <div class="cof-lp-faq-item">
      <h3>1. One designated banker</h3>
      <p>Pick one person to handle all buy-ins and cash-outs for the entire session. This is usually the host. Having multiple people making change is how money goes missing.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>2. No chips without payment</h3>
      <p>No IOUs. No "I'll get you next time." No credit, ever. If someone doesn't have the [bankroll](glossary:bankroll) to buy in, they watch. This sounds harsh, but it's the one rule that prevents every money-related argument.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>3. Keep a simple ledger</h3>
      <p>Write down every buy-in and rebuy as it happens. Name, amount, time. Takes 30 seconds per entry and saves you 30 minutes of detective work at the end of the night. A notes app on your phone works fine.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>4. Settle before anyone walks out</h3>
      <p>Cash out every player before they leave. Once someone is out the door, collecting becomes awkward and unreliable. Make it a house policy: you don't leave until your chips are counted.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>5. Keep cash organized</h3>
      <p>All the game cash goes in one spot, visible, untouched until cash-out. Not in pockets, not mixed in with pizza money. A simple envelope or box works.</p>
    </div>

    <p class="cof-lp-body-sm"><strong>A note on Venmo/Zelle:</strong> Venmo's terms of service technically prohibit gambling-related transactions. Zelle doesn't report transactions to the IRS. Neither has been aggressively enforcing rules on casual home games, but be aware of the policies. Cash avoids all of this entirely. For more on managing money in home games, see our guide on <a href="/learn/how-to-handle-poker-buy-ins-with-friends/">handling buy-ins with friends</a>.</p>
  </div>
</section>

<section class="cof-lp-features">
  <div class="cof-lp-features-inner cof-lp-narrow">
    <div class="cof-lp-tag">Templates</div>
    <h2 class="cof-lp-h2">Invite Template Examples</h2>
    <p class="cof-lp-body">Here are three sample invite previews rendered from real saved configurations using the same formatter as the tool above. Use them as quick starting points, then customize the fields to match your game.</p>

    <h3>Casual $20 Cash Game</h3>
<pre class="cof-lp-pre" data-cof-example-hash="#d=eyJkdCI6IjIwMjYtMDMtMDEiLCJsbiI6Ik1pa2UncyIsImxhIjoiMTIzIE1haW4gU3QsIEFwdCA0QiIsImFuIjoiU25hY2tzIHByb3ZpZGVkLiBCWU9CLiIsIm50IjoiU3RyZWV0IHBhcmtpbmcgaXMgZnJlZSBhZnRlciA2IFBNIiwiYmsiOiJNaWtlIiwicG0iOiJjLHYiLCJybyI6Im5vX2dvaW5nX3NvdXRoLG5vX2xlbmRpbmcsYmFua19vbmx5LG9uZV9wbGF5ZXJfaGFuZCxjYXJkc19zcGVhayxob3N0X2RlY2lkZXMscmVidXlzX2JldHdlZW5faGFuZHMifQ==">Loading example…</pre>

    <h3>Deepstack Tournament</h3>
<pre class="cof-lp-pre" data-cof-example-hash="#d=eyJmIjoidCIsImR0IjoiMjAyNi0wMy0wNyIsImxuIjoiSmFrZSdzIiwibGEiOiIyOCBPYWt2aWV3IERyIiwiYW4iOiJTZWF0cyBsaW1pdGVkIHRvIDguIEZpcnN0IGNvbWUsIGZpcnN0IHNlcnZlZC4iLCJudCI6IlN0YXJ0IHRpbWUgaXMgZmlybS4iLCJocyI6IjAwOjAwIiwiYnMiOiI2MCIsInRiIjo1MCwic2MiOjE1MDAwLCJiayI6Ikpha2UiLCJybyI6Im5vX3N0cmluZ19iZXRzLHRhYmxlX3N0YWtlcyxub19nb2luZ19zb3V0aCxub19sZW5kaW5nLGJhbmtfb25seSxvbmVfcGxheWVyX2hhbmQsc2hvd19vbmVfc2hvd19hbGwscmVidXlzX2JldHdlZW5faGFuZHMifQ==">Loading example…</pre>

    <h3>Beginner-Friendly First Game</h3>
<pre class="cof-lp-pre" data-cof-example-hash="#d=eyJkdCI6IjIwMjYtMDMtMTUiLCJsbiI6IlNhcmFoJ3MiLCJhbiI6IldlJ2xsIHBsYXkgVGV4YXMgSG9sZCdlbS4gRG9uJ3Qga25vdyBob3c/IE5vIHByb2JsZW0uXG5XZSdsbCBkbyBhIHF1aWNrIHdhbGt0aHJvdWdoIGJlZm9yZSB3ZSBzdGFydC4iLCJzdCI6IjE4OjMwIiwiaHMiOiIyMjozMCIsImJzIjoibiIsImJtIjoxMCwiYngiOjIwLCJzYiI6MC4xLCJiYiI6MC4yLCJ0YyI6MSwidGwiOjAsIm50IjoiQnJpbmcgY2FzaCBmb3IgYnV5LWluLCBwbHVzIGEgZHJpbmsgb3Igc25hY2sgdG8gc2hhcmUuIiwicm8iOiJub19zdHJpbmdfYmV0cyx0YWJsZV9zdGFrZXMsbm9fZ29pbmdfc291dGgsbm9fbGVuZGluZyxiYW5rX29ubHksY2FyZHNfc3BlYWsscmVidXlzX2JldHdlZW5faGFuZHMifQ==">Loading example…</pre>
  </div>
</section>

<section class="cof-lp-problems cof-lp--white">
  <div class="cof-lp-problems-inner cof-lp-narrow">
    <div class="cof-lp-tag">FAQ</div>
    <h2 class="cof-lp-h2">Frequently Asked Questions</h2>

    <div class="cof-lp-faq-item">
      <h3>What are the standard rules for a home poker game?</h3>
      <p>The most widely used house rules are: no string betting (one motion or announce first), [table stakes](glossary:all-in) (bet only what's in front of you), no going south (can't pocket chips mid-session), show one show all, and cards speak (physical cards determine the winner). The checklist above includes 21 standard rules you can toggle on or off. For a deeper breakdown, see our <a href="/learn/poker-house-rules-to-keep-the-game-moving/">house rules guide</a>.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>How do you handle buy-ins and cash-outs at a poker night?</h3>
      <p>Designate one banker for the entire session. No chips without payment, no IOUs, no exceptions. Keep a written ledger of every buy-in and rebuy. Settle everyone's chips before they leave. Read our full guide on <a href="/learn/how-to-handle-poker-buy-ins-with-friends/">handling buy-ins with friends</a> for more detail.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>What is a good buy-in for a casual poker home game?</h3>
      <p>$20-$50 works for most casual games. The right test: nobody at the table should be upset if they lose their buy-in. If someone is stressed about the money, the stakes are too high. For a $20 buy-in, $0.25/$0.50 [blinds](glossary:blinds) give you 40 big blinds of depth, which plays well for a home game.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>How many players is ideal for a home poker game?</h3>
      <p>Six to eight is the sweet spot. Fewer than five and you're playing short-handed poker, which plays very differently. More than nine and hands take too long, especially with new players. Invite 10 people and expect 6-8 to show. If you're playing with a full table, a 500-piece chip set gives you room for rebuys. Use our <a href="/chip-distribution-calculator/">Chip Distribution Calculator</a> to figure out how to split the chips.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>What do you need to host a poker night?</h3>
      <p>The basics: two decks of plastic playing cards, a poker chip set (300-piece minimum), a dealer [button](glossary:button), a table surface with felt, enough seating, and non-greasy snacks. A felt table topper costs $10-30 and turns any dining table into a poker table. See the full equipment checklist above for specifics.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>How long should a home poker game last?</h3>
      <p>Four hours is the sweet spot for a cash game. Start at 7pm, last buy-in at 9pm, wrap up around 11pm. Tournaments run longer because you're playing down to a winner. Schedule breaks every 60-90 minutes to keep people fresh and give the host time to restock. Set a hard stop time in your invite so people can plan rides and babysitters.</p>
    </div>
  </div>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Poker Night Checklist & Invite Generator",
  "url": "https://chipsoffury.com/pre-game-checklist/",
  "description": "Free poker night checklist and invite generator for home games. Set your stakes, establish house rules, handle buy-ins, and generate a text invite for your group chat.",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "Chips of Fury",
    "url": "https://chipsoffury.com"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the standard rules for a home poker game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most widely used house rules are: no string betting (one motion or announce first), table stakes (bet only what's in front of you), no going south (can't pocket chips mid-session), show one show all, and cards speak (physical cards determine the winner). Most home games also include rules like one player to a hand (no coaching) and host has final say on disputes."
      }
    },
    {
      "@type": "Question",
      "name": "How do you handle buy-ins and cash-outs at a poker night?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Designate one banker for the entire session. No chips without payment, no IOUs, no exceptions. Keep a written ledger of every buy-in and rebuy. Settle everyone's chips before they leave the table."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good buy-in for a casual poker home game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For casual games, $20-$50 is the standard range. The right test is that nobody at the table should be upset if they lose their buy-in. For a $20 buy-in, $0.25/$0.50 blinds give you 40 big blinds of depth, which plays well for a home game."
      }
    },
    {
      "@type": "Question",
      "name": "How many players is ideal for a home poker game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Six to eight players is the sweet spot. Fewer than five and you're playing short-handed poker, which plays very differently. More than nine and hands take too long, especially with new players."
      }
    },
    {
      "@type": "Question",
      "name": "What do you need to host a poker night?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The basics: two decks of plastic playing cards, a poker chip set (300-piece minimum), a dealer button, a table surface with felt, enough seating, and non-greasy snacks. A felt table topper costs $10-30 and turns any dining table into a poker table."
      }
    },
    {
      "@type": "Question",
      "name": "How long should a home poker game last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Four hours is the sweet spot for a cash game. Start at 7pm, last buy-in at 9pm, wrap up around 11pm. Tournaments run longer because you play down to a winner. Schedule breaks every 60-90 minutes and set a hard stop time in your invite."
      }
    }
  ]
}
</script>

<section class="cof-lp-feedback">
  <div class="cof-lp-feedback-inner">
    <div class="cof-lp-tag">Feedback</div>
    <h2 class="cof-lp-h2">Have a suggestion or found a bug?</h2>
    <p class="cof-lp-body">This tool is actively maintained. If something doesn't work for your game, or you have an idea that would make it more useful, we'd love to hear from you.</p>
    <a href="/contact/" class="cof-lp-cta">Send Feedback</a>
  </div>
</section>
