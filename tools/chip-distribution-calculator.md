---
title: "Poker Chip Distribution Calculator"
date: 2026-02-10
description: "Free tool to figure out poker chip distribution for your home game. Enter your buy-in, player count, and chip set to get the exact per-player breakdown."
ogImage: "https://chipsoffury.com/images/chip-distribution-calculator-og.webp"
extraStylesheets:
  - "/css/chip-distribution-calculator.css"
extraScripts:
  - "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
  - "/js/chip-distribution.js"
  - "/js/chip-distribution-calculator-page.js"
---

<section class="cof-lp-hero">
  <div class="cof-lp-deco cof-lp-deco--1" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--2" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--3" aria-hidden="true"></div>
  <div class="cof-lp-hero-inner">
    <div class="cof-lp-eyebrow">Free Tool</div>
    <h1 class="cof-lp-h1">Chip Distribution Calculator</h1>
    <ol class="cof-lp-steps-list">
      <li><span class="cof-lp-step-num">1</span><div>Enter your game's <strong>buy-in</strong> and <strong>player count</strong>.<br><span class="cof-lp-step-hint">Blinds are automatically suggested but you can set them manually if you want.</span></div></li>
      <li><span class="cof-lp-step-num">2</span><span>Enter the <strong>chip inventory</strong> in your poker set.</span></li>
      <li><span class="cof-lp-step-num">3</span><span>Get a breakdown of how many of each chip to give every player.</span></li>
    </ol>
    <a href="#calculator" class="cof-lp-cta">Start Setting Up <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></a>
  </div>
</section>

<section id="calculator" class="cof-lp-tool">
<div class="cof-lp-tool-inner">
<div class="cof-lp-tool-head">
  <h2>Cash Game Chip Setup</h2>
  <p>Set your buy-in, enter your chips, review the distribution.</p>
</div>

<div id="cof-calc">
  <div class="cof-head">
    <p class="cof-status" id="cof-status"></p>
    <div class="cof-head-actions">
      <!-- Debug: copies full internal state (inputs, chips, values, suggestions) as JSON to clipboard for troubleshooting -->
      <!-- <button type="button" class="cof-share cof-copy-state" id="cof-copy-state">Copy State</button> -->
      <button type="button" class="cof-share" id="cof-share">Save Configuration</button>
      <a href="#" class="cof-reset" id="cof-reset">Reset</a>
    </div>
  </div>
  <div class="cof-cl-section is-expanded" id="sec-game">
    <button type="button" class="cof-cl-section-header" aria-expanded="true" aria-controls="sec-game-body">
      <div class="cof-cl-section-left">
        <span class="cof-cl-section-num">1</span>
        <span class="cof-cl-section-title">Game Setup</span>
        <span class="cof-cl-section-summary" id="sum-game"></span>
      </div>
      <div class="cof-cl-section-right">
        <svg class="cof-cl-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
      </div>
    </button>
    <div class="cof-cl-section-body" id="sec-game-body">
      <div class="cof-form-row">
        <span class="cof-form-label">Buy-in</span>
        <div class="cof-form-controls">
          <div class="cof-buy-hero">
            <button id="cof-buy-minus" type="button" class="cof-buy-step" aria-label="Decrease buy-in">&minus;</button>
            <div class="cof-buy-value">
              <span class="cof-dollar">$</span>
              <input id="cof-buy-input" type="number" min="1" max="10000000" step="any" value="50" aria-label="Buy-in amount" class="cof-num-input">
            </div>
            <button id="cof-buy-plus" type="button" class="cof-buy-step" aria-label="Increase buy-in">+</button>
          </div>
        </div>
      </div>
      <div class="cof-form-row">
        <div>
          <span class="cof-form-label">Blinds</span>
          <div class="cof-depth" id="cof-depth-label">100 BB deep at $0.25/$0.50</div>
        </div>
        <div class="cof-form-controls">
          <div class="cof-blinds-row">
            <span class="cof-dollar">$</span>
            <input id="cof-sb" type="number" min="0.01" step="any" value="0.25" aria-label="Small blind" class="cof-num-input">
            <span class="cof-blinds-sep">/</span>
            <span class="cof-dollar">$</span>
            <input id="cof-bb" type="number" min="0.01" step="any" value="0.50" aria-label="Big blind" class="cof-num-input">
          </div>
          <label class="cof-auto-check">
            <input type="checkbox" id="cof-auto-blinds" checked>
            <span class="cof-checkmark"></span>
            <span>Auto</span>
          </label>
        </div>
      </div>
      <div class="cof-form-row">
        <span class="cof-form-label">Players</span>
        <div class="cof-form-controls">
          <div class="cof-buy-hero">
            <button id="cof-player-minus" type="button" class="cof-buy-step" aria-label="Decrease players">&minus;</button>
            <input id="cof-player-count" type="number" min="2" max="10" step="1" value="6" aria-label="Player count" class="cof-num-input cof-num-narrow">
            <button id="cof-player-plus" type="button" class="cof-buy-step" aria-label="Increase players">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cof-cl-section is-expanded" id="sec-chips">
    <button type="button" class="cof-cl-section-header" aria-expanded="true" aria-controls="sec-chips-body">
      <div class="cof-cl-section-left">
        <span class="cof-cl-section-num">2</span>
        <span class="cof-cl-section-title">Chip Set</span>
        <span class="cof-cl-section-summary" id="sum-chips"></span>
      </div>
      <div class="cof-cl-section-right">
        <svg class="cof-cl-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
      </div>
    </button>
    <div class="cof-cl-section-body" id="sec-chips-body">
      <div id="cof-chip-alert" class="cof-alert cof-hidden"></div>
      <div class="cof-marked-switch" id="cof-marked-switch">
        <div class="cof-marked-switch-track">
          <input type="checkbox" id="cof-marked-toggle">
          <span class="cof-marked-opt is-active" data-val="0">Unmarked chips</span>
          <span class="cof-marked-opt" data-val="1">Denominations on chips</span>
        </div>
      </div>
      <div class="cof-presets" id="cof-presets"></div>
      <div class="cof-chip-columns" id="cof-chip-columns" aria-hidden="true">
        <span>Color</span>
        <span class="cof-col-value cof-hidden">Value</span>
        <span>Count</span>
        <span></span>
      </div>
      <div class="cof-chip-list" id="cof-chip-list"></div>
      <button id="cof-add-chip" class="cof-add" type="button">+ Add Chip Color</button>
    </div>
  </div>

  <div class="cof-cl-section is-expanded" id="sec-dist">
    <button type="button" class="cof-cl-section-header" aria-expanded="true" aria-controls="sec-dist-body">
      <div class="cof-cl-section-left">
        <span class="cof-cl-section-num">3</span>
        <span class="cof-cl-section-title">Distribution</span>
        <span class="cof-cl-section-summary" id="sum-dist"></span>
      </div>
      <div class="cof-cl-section-right">
        <svg class="cof-cl-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
      </div>
    </button>
    <div class="cof-cl-section-body" id="sec-dist-body">
      <div id="cof-dist-capture" class="cof-dist-capture">
        <div id="cof-dist-alert" class="cof-alert cof-hidden"></div>
        <div id="cof-summary" class="cof-summary"></div>
        <div id="cof-stacks" class="cof-stacks"></div>
        <div id="cof-warnings" class="cof-warnings"></div>
      </div>
      <div class="cof-share-img-wrap">
        <button type="button" class="cof-share-img" id="cof-share-img"><span id="cof-share-icon"></span> Share</button>
      </div>
    </div>
  </div>
</div>

</div>
</section>

<section class="cof-lp-problems">
  <div class="cof-lp-problems-inner">
    <div class="cof-lp-tag">The Problem</div>
    <h2 class="cof-lp-h2">The same setup questions come up every game night</h2>
    <div class="cof-lp-cards">
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">🎨</div>
        <h3>Which values go on which colors?</h3>
        <p>Most chip sets don't have denominations printed on them. Hosts end up guessing values, and the result is usually an overcomplicated ladder that causes problems during play.</p>
      </div>
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">📦</div>
        <h3>The chip set doesn't match the game</h3>
        <p>Retail sets tend to include too many high-denomination chips and not enough low ones. A 300-piece set might cover 8 players on paper, but there's no room left for rebuys or making change.</p>
      </div>
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">🔢</div>
        <h3>Blinds don't fit any chip in the set</h3>
        <p>If the blinds are decided before chip values, you can end up with no chip small enough to post the small blind. Every hand turns into a change-making exercise.</p>
      </div>
      <div class="cof-lp-card">
        <div class="cof-lp-card-icon">⏱️</div>
        <h3>Setup eats into play time</h3>
        <p>First-time hosts often spend 20 minutes debating chip values at the table before anyone plays a hand. There's no standard template, so everyone starts from scratch.</p>
      </div>
    </div>
  </div>
</section>

<section class="cof-lp-features">
  <div class="cof-lp-features-inner">
    <div class="cof-lp-tag">What's Built In</div>
    <div class="cof-lp-feat-grid">
      <div class="cof-lp-feat">
        <span class="cof-lp-feat-check">✓</span>
        <span><strong>Auto blinds:</strong> suggests SB/BB that keeps depth in the 50-150 BB range</span>
      </div>
      <div class="cof-lp-feat">
        <span class="cof-lp-feat-check">✓</span>
        <span><strong>Denomination mapping:</strong> assigns dollar values to each chip color</span>
      </div>
      <div class="cof-lp-feat">
        <span class="cof-lp-feat-check">✓</span>
        <span><strong>Setup warnings:</strong> flags blind mismatches and insufficient counts</span>
      </div>
      <div class="cof-lp-feat">
        <span class="cof-lp-feat-check">✓</span>
        <span><strong>Config in URL:</strong> saves your setup for reuse, or as a chip-value reference for the table</span>
      </div>
      <div class="cof-lp-feat">
        <span class="cof-lp-feat-check">✓</span>
        <span><strong>Marked chip mode:</strong> for sets that already have values printed on them</span>
      </div>
      <div class="cof-lp-feat">
        <span class="cof-lp-feat-check">✓</span>
        <span><strong>Cash games only:</strong> built for home cash games, not tournament structures</span>
      </div>
    </div>
  </div>
</section>

<section class="cof-lp-problems" style="background: #fff; border-top: 1px solid #E8E5DD;">
  <div class="cof-lp-problems-inner" style="max-width: 36rem; text-align: center;">
    <div class="cof-lp-tag">Feedback</div>
    <h2 class="cof-lp-h2">Have a suggestion or found a bug?</h2>
    <p style="font-size: 0.95rem; line-height: 1.6; color: #5F6B63; margin: 0 0 1.5rem;">This tool is actively maintained. If something doesn't work for your setup, or you have an idea that would make it more useful, we'd love to hear from you.</p>
    <a href="/contact/" style="display: inline-flex; align-items: center; gap: 0.45rem; background: #BFA24E; color: #091A12; font-family: var(--font-heading); font-weight: 700; padding: 0.85rem 1.7rem; border-radius: 10px; font-size: 0.95rem; text-decoration: none; letter-spacing: 0.01em; transition: background 0.2s, transform 0.12s;" onmouseover="this.style.background='#CEAF5C';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#BFA24E';this.style.transform='none'">Send Feedback</a>
  </div>
</section>
