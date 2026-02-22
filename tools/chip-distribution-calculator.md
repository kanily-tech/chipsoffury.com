---
title: "Poker Chip Distribution Calculator & Starting Stack Guide (Home Games)"
date: 2026-02-10
description: "Free poker chip distribution calculator for home games. Figure out exactly how many chips per person you need, standard color values, and starting stacks for your buy-in."
ogImage: "https://chipsoffury.com/images/chip-distribution-calculator-og.webp"
extraStylesheets:
  - "/css/chip-distribution-calculator.css"
extraScripts:
  - "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
  - "/js/chip-distribution.js"
  - "/js/chip-distribution-calculator-page.js"
hideAppSchema: true
---

<section class="cof-lp-hero">
  <div class="cof-lp-deco cof-lp-deco--1" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--2" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--3" aria-hidden="true"></div>
  <div class="cof-lp-hero-inner">
    <div class="cof-lp-eyebrow">Free Tool</div>
    <h1 class="cof-lp-h1">Poker Chip Distribution Calculator for Home Games</h1>
    <ol class="cof-lp-steps-list">
      <li><span class="cof-lp-step-num">1</span><div>Enter your game's <strong>buy-in</strong> and <strong>player count</strong>.<br><span class="cof-lp-step-hint">Blinds are automatically suggested but you can set them manually if you want.</span></div></li>
      <li><span class="cof-lp-step-num">2</span><span>Enter the <strong>chip inventory</strong> in your poker set.</span></li>
      <li><span class="cof-lp-step-num">3</span><span>Get a breakdown of how many of each chip to give every player.<br><span class="cof-lp-step-hint">The calculator accounts for your full chip inventory, so you can see how many chips remain in the bank for rebuys after dealing out starting stacks.</span></span></li>
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
              <input id="cof-buy-input" type="number" min="1" max="10000000" step="any" value="20" aria-label="Buy-in amount" class="cof-num-input">
            </div>
            <button id="cof-buy-plus" type="button" class="cof-buy-step" aria-label="Increase buy-in">+</button>
          </div>
        </div>
      </div>
      <div class="cof-form-row">
        <div>
          <span class="cof-form-label">Blinds</span>
          <div class="cof-depth" id="cof-depth-label">100 BB deep at 10c/20c</div>
        </div>
        <div class="cof-form-controls">
          <div class="cof-blinds-row">
            <span class="cof-dollar">$</span>
            <input id="cof-sb" type="number" min="0.01" step="any" value="0.10" aria-label="Small blind" class="cof-num-input">
            <span class="cof-blinds-sep">/</span>
            <span class="cof-dollar">$</span>
            <input id="cof-bb" type="number" min="0.01" step="any" value="0.20" aria-label="Big blind" class="cof-num-input">
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
        <p>Most chip sets don't have denominations printed on them. Hosts end up guessing values, and the result is usually an overcomplicated ladder that causes problems during play. See our <a href="/learn/poker-lingo-and-terms-for-beginners/">poker terminology guide</a> if you're new to the lingo.</p>
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
        <p>First-time hosts often spend 20 minutes debating chip values at the table before anyone plays a hand. Use our <a href="/pre-game-checklist/">pre-game checklist</a> to sort everything out before guests arrive.</p>
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

<section class="cof-lp-problems cof-lp--white">
  <div class="cof-lp-problems-inner">
    <div class="cof-lp-tag">Quick Reference</div>
    <h2 class="cof-lp-h2">Standard Poker Chip Colors and Values</h2>
    <p class="cof-lp-body">These are the most widely accepted chip values, based on Las Vegas casino conventions. Many home chip sets don't have values printed on them, so use this table as a quick reference when assigning denominations.</p>
    <div class="cof-lp-table-wrap">
      <table class="cof-lp-table cof-lp-narrow">
        <thead>
          <tr>
            <th>Color</th>
            <th>Standard Value</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="cof-lp-dot cof-lp-dot--white"></span> White</td>
            <td class="val">$1</td>
            <td class="muted">Nearly universal across casinos and home games</td>
          </tr>
          <tr>
            <td><span class="cof-lp-dot cof-lp-dot--red"></span> Red</td>
            <td class="val">$5</td>
            <td class="muted">The most recognized poker chip</td>
          </tr>
          <tr>
            <td><span class="cof-lp-dot cof-lp-dot--blue"></span> Blue</td>
            <td class="val">$10</td>
            <td class="muted">Common in home games, not standard in casinos</td>
          </tr>
          <tr>
            <td><span class="cof-lp-dot cof-lp-dot--green"></span> Green</td>
            <td class="val">$25</td>
            <td class="muted">Standard casino denomination</td>
          </tr>
          <tr>
            <td><span class="cof-lp-dot cof-lp-dot--black"></span> Black</td>
            <td class="val">$100</td>
            <td class="muted">High-value standard</td>
          </tr>
          <tr>
            <td><span class="cof-lp-dot cof-lp-dot--purple"></span> Purple</td>
            <td class="val">$500</td>
            <td class="muted">Used in higher-stakes games</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="cof-lp-features">
  <div class="cof-lp-features-inner">
    <div class="cof-lp-tag">Planning</div>
    <h2 class="cof-lp-h2 cof-lp-h2--tight">How Many Chips Do You Need?</h2>
    <p class="cof-lp-body">Plan for 30 chips per player at minimum. For longer sessions or games with rebuys, 60 to 100 per player is better. Hold back 20-30% of your total chips as "the bank" for rebuys and change-making.</p>
    <div class="cof-lp-table-wrap">
      <table class="cof-lp-table cof-lp-narrow-sm">
        <thead>
          <tr>
            <th>Players</th>
            <th>Minimum Set Size</th>
            <th>Recommended</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2-4</td>
            <td>200</td>
            <td class="val">300</td>
          </tr>
          <tr>
            <td>4-6</td>
            <td>300</td>
            <td class="val">500</td>
          </tr>
          <tr>
            <td>6-8</td>
            <td>500</td>
            <td class="val">750</td>
          </tr>
          <tr>
            <td>8-10</td>
            <td>750</td>
            <td class="val">1,000</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="cof-lp-body-sm">A 300-chip set is comfortable for 4-6 players. A 500-chip set covers 6-8 players with room for rebuys, and can stretch to 10 in a pinch.</p>
  </div>
</section>

<section class="cof-lp-problems cof-lp--white">
  <div class="cof-lp-problems-inner cof-lp-narrow">
    <div class="cof-lp-tag">Denomination Design</div>
    <h2 class="cof-lp-h2">The 4x/5x Denomination Rule</h2>
    <p class="cof-lp-body">Each chip denomination should be 4 to 5 times the previous one. The standard casino ladder follows this pattern: $1, $5, $25, $100, $500. Notice how casinos skip $10 and $50 entirely.</p>
    <p class="cof-lp-body">Fewer denominations means faster stack counting and less time making change at the table. When values are too close together (like $5 and $10), players constantly break chips down, slowing every pot. The calculator above already follows this rule when suggesting chip values for your setup.</p>
  </div>
</section>

<section class="cof-lp-features">
  <div class="cof-lp-features-inner cof-lp-narrow">
    <div class="cof-lp-tag">Format Comparison</div>
    <h2 class="cof-lp-h2">Tournament vs. Cash Game Chip Setup</h2>
    <p class="cof-lp-body">In a cash game, every chip represents real money. Players can rebuy at any time and cash out whenever they want. In a tournament, chips have no cash value. Everyone starts with the same stack, blinds increase on a timer, and you play until one person has all the chips.</p>
    <p class="cof-lp-body">This calculator is built for cash games. For tournaments, the starting stack is usually 50-100x the opening big blind (for example, T10,000 with 50/100 blinds). Use 3-4 chip colors and plan to "color up" (swap smaller chips for larger ones) as blinds increase throughout the night.</p>
  </div>
</section>

<section class="cof-lp-problems cof-lp--white">
  <div class="cof-lp-problems-inner cof-lp-narrow">
    <div class="cof-lp-tag">FAQ</div>
    <h2 class="cof-lp-h2">Frequently Asked Questions</h2>

    <div class="cof-lp-faq-item">
      <h3>How many poker chips do I need per person?</h3>
      <p>Plan for 50 chips per player at minimum. For longer sessions or games with rebuys, 75-100 per player is better. A 300-chip set covers 4-6 players comfortably; a 500-chip set handles 6-8 players with room for rebuys.<br>Or, if you don't want to deal with physical chips at all (we know, it's half the fun), Chips of Fury has a <a href="/virtual-poker-chips/">virtual chips mode</a> that handles everything on-screen. We didn't think anyone would use it either, but over 100,000 games were played with virtual chips last year.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>What are the standard poker chip colors and values?</h3>
      <p>The widely accepted standard based on casino conventions is: White = $1, Red = $5, Green = $25, Black = $100, Purple = $500. Blue ($10) is common in home games but not part of the standard casino progression.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>What is the difference between cash game and tournament chip setups?</h3>
      <p>In a cash game, each chip represents real money and players can rebuy anytime. In a tournament, chips have no cash value. Everyone starts with the same stack, blinds increase on a schedule, and you play until you're eliminated. The same physical chip set works for both formats. Read more about <a href="/learn/how-to-handle-poker-buy-ins-with-friends/">handling buy-ins with friends</a>.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>How do I set up chips for a $20 buy-in home game?</h3>
      <p>With $0.10/$0.20 blinds (100 big blinds deep), a good setup is 3-4 chip colors with values following the standard progression. The calculator above handles this automatically. Enter your buy-in, player count, and chip set, and it gives you the exact per-player breakdown. New to the game? Start with our <a href="/learn/texas-holdem-rules-beginner-guide/">Texas Hold'em rules guide</a>.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>Why should chip denominations jump by 4x or 5x?</h3>
      <p>Denominations that multiply by 4 or 5 (like $1, $5, $25, $100) keep the game moving. Close values like $5 and $10 create constant change-making problems. This is why casinos skip $10 and $50 chips entirely.</p>
    </div>

    <div class="cof-lp-faq-item">
      <h3>Do I need a 300-chip set or a 500-chip set?</h3>
      <p>A 300-chip set works for up to 6 players in a standard cash game. If you regularly host 7-10 players, or want room for rebuys without running out of chips, go with 500.</p>
    </div>
  </div>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Poker Chip Distribution Calculator",
  "url": "https://chipsoffury.com/chip-distribution-calculator/",
  "description": "Free poker chip distribution calculator for home games. Figure out exactly how many chips per person you need, standard color values, and starting stacks.",
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
      "name": "How many poker chips do I need per person?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan for 50 chips per player at minimum. For longer sessions or games with rebuys, 75-100 per player is better. A 300-chip set covers 4-6 players comfortably; a 500-chip set handles 6-8 players with room for rebuys. If you'd rather skip physical chips entirely, Chips of Fury has a virtual chips mode — over 100,000 games were played with it last year."
      }
    },
    {
      "@type": "Question",
      "name": "What are the standard poker chip colors and values?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The widely accepted standard based on casino conventions is: White = $1, Red = $5, Green = $25, Black = $100, Purple = $500. Blue ($10) is common in home games but not part of the standard casino progression."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between cash game and tournament chip setups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In a cash game, each chip represents real money and players can rebuy anytime. In a tournament, chips have no cash value. Everyone starts with the same stack, blinds increase on a schedule, and you play until you're eliminated. The same physical chip set works for both formats."
      }
    },
    {
      "@type": "Question",
      "name": "How do I set up chips for a $20 buy-in home game?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With $0.10/$0.20 blinds (100 big blinds deep), a good setup is 3-4 chip colors with values following the standard progression. The calculator above handles this automatically. Enter your buy-in, player count, and chip set, and it gives you the exact per-player breakdown."
      }
    },
    {
      "@type": "Question",
      "name": "Why should chip denominations jump by 4x or 5x?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Denominations that multiply by 4 or 5 (like $1, $5, $25, $100) keep the game moving. Close values like $5 and $10 create constant change-making problems. This is why casinos skip $10 and $50 chips entirely."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a 300-chip set or a 500-chip set?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 300-chip set works for up to 6 players in a standard cash game. If you regularly host 7-10 players, or want room for rebuys without running out of chips, go with 500."
      }
    }
  ]
}
</script>

<section class="cof-lp-problems cof-lp--white">
  <div class="cof-lp-problems-inner cof-lp-narrow-sm cof-lp-center">
    <div class="cof-lp-tag">Feedback</div>
    <h2 class="cof-lp-h2">Have a suggestion or found a bug?</h2>
    <p class="cof-lp-body">This tool is actively maintained. If something doesn't work for your setup, or you have an idea that would make it more useful, we'd love to hear from you.</p>
    <a href="/contact/" class="cof-lp-cta">Send Feedback</a>
  </div>
</section>
