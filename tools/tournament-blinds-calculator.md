---
title: "Poker Tournament Blind Structure Calculator"
date: 2026-05-19
description: "Build an editable poker tournament blind schedule for a home game. Set players, stacks, target length, antes, breaks, and blind increases."
extraStylesheets:
  - "/css/tournament-blinds-calculator.css"
extraScripts:
  - "/js/tournament-blinds.js"
  - "/js/tournament-blinds-page.js"
hideAppSchema: true
templateEngineOverride: njk
---

<section class="tb-hero">
  <div class="tb-hero-ring tb-hero-ring--one" aria-hidden="true"></div>
  <div class="tb-hero-ring tb-hero-ring--two" aria-hidden="true"></div>
  <div class="tb-hero-inner">
    <div class="tb-eyebrow">Free Tool for Home Game Hosts</div>
    <h1>Poker Tournament Blind Structure Calculator</h1>
    <p>Generate a practical blind schedule from your players, stacks, and target finish time. Then edit any blind, ante, duration, or break before you run the game.</p>
    <a href="#calculator" class="tb-hero-cta">Build Blind Structure <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></a>
  </div>
</section>

<section id="calculator" class="tb-tool">
  <div class="tb-tool-inner">
    <div class="tb-tool-head">
      <h2>Tournament Setup</h2>
      <p>Start with the generated structure, then tune the table to match your game.</p>
    </div>

    <div id="tb-calc" class="tb-calc">
      <div class="tb-form" id="tb-form">
        <section class="tb-panel">
          <div class="tb-panel-body" id="tb-setup-body">
            <h3 class="tb-section-title">Tournament</h3>
            <div class="tb-setup-primary">
              <label class="tb-field tb-field--players">
                <span>Players</span>
                <input id="tb-players" type="number" min="2" max="30" step="1" value="9">
              </label>
              <label class="tb-field tb-field--stack">
                <span>Starting Stack</span>
                <input id="tb-stack" type="number" min="100" max="1000000" step="100" value="10000">
              </label>
              <label class="tb-field tb-field--target">
                <span>Target Length</span>
                <div class="tb-input-suffix">
                  <input id="tb-target" type="number" min="30" max="720" step="5" value="180">
                  <b>min</b>
                </div>
              </label>
              <label class="tb-field tb-field--break">
                <span>Break Every</span>
                <div class="tb-input-suffix">
                  <input id="tb-break-every" type="number" min="0" max="240" step="5" value="60">
                  <b>min</b>
                </div>
              </label>
            </div>

            <h3 class="tb-section-title">Blinds and Antes</h3>
            <div class="tb-setup-secondary">
              <div class="tb-setup-secondary-row">
                <div class="tb-opening-section">
                  <div class="tb-opening-label">Opening Blinds</div>
                  <div class="tb-opening-inputs">
                    <input id="tb-small-blind" type="number" min="1" max="100000" step="1" value="25" aria-label="Small Blind">
                    <span class="tb-opening-sep" aria-hidden="true">/</span>
                    <input id="tb-big-blind" type="number" min="2" max="200000" step="1" value="50" aria-label="Big Blind">
                  </div>
                </div>
                <label class="tb-field tb-field--growth">
                  <span>Blind Increases</span>
                  <select id="tb-growth">
                    <option value="auto">Auto fit</option>
                    <option value="1.45">Slower - 1.45x</option>
                    <option value="1.65">Balanced - 1.65x</option>
                    <option value="1.90">Faster - 1.90x</option>
                  </select>
                </label>
              </div>
              <p class="tb-opening-caption" aria-live="polite">
                <strong id="tb-start-depth">100 BB</strong> starting depth
                <span aria-hidden="true" class="tb-opening-caption-sep">·</span>
                <span class="tb-opening-caption-hint">Prefilled from your stack</span>
              </p>

              <!-- 2-row grid: row 1 holds labels, row 2 holds controls. Keeps
                   "Antes" and "% of BB" labels at the same baseline regardless
                   of which controls are visible, and pins the toggle in place
                   so it doesn't drift when extra controls appear. -->
              <div class="tb-setup-antes">
                <span class="tb-ante-label tb-antes-lbl-toggle">Antes</span>
                <span class="tb-antes-lbl-seg" aria-hidden="true"></span>
                <span class="tb-ante-label tb-antes-lbl-pct" id="tb-ante-percent-label" hidden>% of BB</span>

                <label class="tb-switch tb-antes-toggle">
                  <input id="tb-ante-toggle" type="checkbox" aria-label="Enable antes">
                  <span class="tb-switch-track" aria-hidden="true"><span class="tb-switch-thumb"></span></span>
                </label>
                <div class="tb-segment-group tb-antes-segments" id="tb-ante-segments" role="radiogroup" aria-label="Ante type" hidden>
                  <label class="tb-segment">
                    <input type="radio" name="tb-ante-type" value="player" checked>
                    <span>Every player</span>
                  </label>
                  <label class="tb-segment">
                    <input type="radio" name="tb-ante-type" value="bb">
                    <span>BB ante</span>
                  </label>
                  <label class="tb-segment">
                    <input type="radio" name="tb-ante-type" value="button">
                    <span>Button ante</span>
                  </label>
                </div>
                <div class="tb-input-suffix tb-antes-pct" id="tb-ante-percent-input" hidden>
                  <input id="tb-ante-percent" type="number" min="1" max="50" step="1" value="12">
                  <b>%</b>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="tb-results" aria-live="polite">
        <div class="tb-warning-list" id="tb-warnings"></div>

        <div class="tb-schedule-card">
          <div class="tb-schedule-head">
            <div>
              <h2>Editable Blind Schedule</h2>
              <p>Change any number directly. Use each row's action to add or remove breaks.</p>
            </div>
            <div class="tb-actions">
              <button type="button" class="tb-ghost" id="tb-reset">Reset Generated</button>
              <button type="button" class="tb-ghost tb-ghost--gold" id="tb-copy">Copy Schedule</button>
            </div>
          </div>
          <div class="tb-table-wrap">
            <table class="tb-table">
              <thead>
                <tr>
                  <th class="tb-th-level" aria-label="Level"></th>
                  <th class="tb-th-blinds">
                    <span id="tb-blinds-label">SB / BB</span>
                    <span class="tb-th-sub" id="tb-ante-subtitle" hidden></span>
                  </th>
                  <th class="tb-th-schedule">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="tb-th-icon"><circle cx="10" cy="10.5" r="6.25"/><path d="M10 7v3.5l2.2 1.3"/></svg>
                    <span>Schedule</span>
                  </th>
                </tr>
              </thead>
              <tbody id="tb-schedule"></tbody>
            </table>
          </div>
          <div class="tb-schedule-foot" id="tb-total"></div>
        </div>
      </section>
    </div>
  </div>
</section>

<section class="tb-content">
  <div class="tb-content-inner">
    <div class="tb-tag">How It Works</div>
    <h2>A blind structure that starts with the table, not a template</h2>
    <p>The calculator starts with the things home-game hosts usually know: how many players are coming, how many chips each player starts with, and roughly when the tournament should end. It then estimates a final big blind, rounds the schedule to playable blind levels, and gives you an editable table.</p>
    <p>The finish time is an estimate, not a promise. A loose table with rebuys can run longer. A table full of new players can deal fewer hands per hour. Use the generated schedule as the starting point, then tune level duration, blind jumps, antes, and breaks for your group.</p>
  </div>
</section>

<section class="tb-content tb-content--white">
  <div class="tb-content-inner">
    <div class="tb-tag">Recommended Settings</div>
    <h2>Good home poker tournament defaults</h2>
    <p>Most forum questions boil down to the same problem: "I have this many players and this much time. What blind structure will not turn into a shove-fest?" Start here, then adjust the calculator above.</p>

    <div class="tb-table-guide-wrap">
      <table class="tb-guide-table">
        <thead>
          <tr>
            <th>Game type</th>
            <th>Starting depth</th>
            <th>Level length</th>
            <th>Use this when</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Quick sit-and-go</td>
            <td>40-60 BB</td>
            <td>6-10 min</td>
            <td>You need a winner in about 60-90 minutes.</td>
          </tr>
          <tr>
            <td>Standard home tournament</td>
            <td>75-100 BB</td>
            <td>12-18 min</td>
            <td>You want a 2-3 hour game with room to play early hands.</td>
          </tr>
          <tr>
            <td>Deep stack night</td>
            <td>150-200 BB</td>
            <td>18-25 min</td>
            <td>Your group wants a slower 4+ hour tournament.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>A T10,000 stack is not automatically deep. It is 100 big blinds at 50/100, but only 20 big blinds at 250/500. That is why the calculator shows starting depth next to the opening blinds.</p>
  </div>
</section>

<section class="tb-content">
  <div class="tb-content-inner">
    <div class="tb-tag">Host Decisions</div>
    <h2>Set the rules before the first hand</h2>
    <div class="tb-card-grid">
      <div class="tb-info-card">
        <h3>Antes</h3>
        <p>Leave antes off for the first few levels, especially with new players. If you use them, add them around Level 4 or 5, after the rebuy period closes, or when pots start feeling too small for the stack sizes.</p>
        <p>For home games, a big blind ante is cleaner than every-player antes because one player posts the ante for the table.</p>
      </div>
      <div class="tb-info-card">
        <h3>Breaks and rebuys</h3>
        <p>A 5-10 minute break every 4-5 levels works well for most home games. Use the first break to end rebuys and settle add-ons if your game allows them.</p>
        <p>Rebuys add chips to the tournament, so they also push the finish later. For a beginner-friendly night, use freezeout or one rebuy per player.</p>
      </div>
      <div class="tb-info-card">
        <h3>Color-ups</h3>
        <p>Remove small chips when they are no longer needed for future blinds or antes. For example, if every remaining blind and ante is a multiple of 100, color up the 25 chips during a break.</p>
        <p>Do not wait until the table is buried in tiny chips. It slows betting, all-ins, and side-pot math. If you still need to divide your set, use the <a href="/chip-distribution-calculator/">chip distribution calculator</a> first.</p>
      </div>
    </div>
  </div>
</section>

<section class="tb-content tb-content--white">
  <div class="tb-content-inner">
    <div class="tb-tag">End-Time Estimate</div>
    <h2>What blind level will end the tournament?</h2>
    <p>A useful home-game rule is that the tournament often ends when the big blind is about 5-10% of all chips in play. If 9 players start with 10,000 chips each, there are 90,000 chips in play, so the ending range is roughly a 4,500-9,000 big blind.</p>
    <p>Rebuys and add-ons count too. If your 9-player game adds three 10,000-chip rebuys, the pool is 120,000 chips, and the likely ending range moves closer to a 6,000-12,000 big blind.</p>
    <p>The calculator uses the same idea from the other direction: it estimates a late-stage big blind from the chips in play, then builds practical levels between your opening blinds and that target.</p>
  </div>
</section>

<section class="tb-content">
  <div class="tb-content-inner">
    <div class="tb-tag">Common Mistakes</div>
    <h2>Blind structures that make home tournaments worse</h2>
    <ul class="tb-check-list">
      <li><strong>Five-minute levels in a self-dealt game.</strong> Online and casino tables deal more hands per hour. At home, short levels can skip real poker and jump straight to all-ins.</li>
      <li><strong>Doubling every level too early.</strong> Big jumps are fine late, but early levels should give players time to settle in.</li>
      <li><strong>Starting too deep for the time limit.</strong> A 200 BB starting stack with long levels is not a 2-hour tournament.</li>
      <li><strong>Forgetting rebuys in the estimate.</strong> More chips in play means the tournament usually needs a higher final blind.</li>
      <li><strong>Adding antes too early.</strong> Antes help later, but they can confuse newer players and slow the first hour.</li>
      <li><strong>Skipping color-ups.</strong> Small chips are useful early. Later, they just make every pot harder to count.</li>
    </ul>
  </div>
</section>

<section class="tb-content tb-content--white">
  <div class="tb-content-inner">
    <div class="tb-tag">FAQ</div>
    <h2>Poker tournament blinds FAQ</h2>

    <div class="tb-faq-item">
      <h3>What blind structure should I use for a home poker tournament?</h3>
      <p>For most single-table home tournaments, start players with 75-100 big blinds and use 12-18 minute levels. That gives players time to play early hands without making the tournament drag all night. Use shorter levels or a smaller starting depth only when you need a quick game.</p>
    </div>

    <div class="tb-faq-item">
      <h3>How long should poker blind levels be?</h3>
      <p>Use 10-12 minute levels for a quick home tournament, 15-20 minutes for a standard casual tournament, and 20+ minutes for a deeper game. Self-dealt games need longer levels than online tournaments because fewer hands are dealt per hour.</p>
    </div>

    <div class="tb-faq-item">
      <h3>How many big blinds should players start with?</h3>
      <p>Fifty big blinds is fast, 75-100 big blinds is a good default, and 150-200 big blinds is deep. Think in big blinds instead of raw chip count. A 10,000 stack can be deep or short depending on the opening blinds.</p>
    </div>

    <div class="tb-faq-item">
      <h3>When should antes start in a poker tournament?</h3>
      <p>Keep antes off for the first few levels. Add them around Level 4 or 5, after rebuys close, or once stacks are deep enough that pots need more action. For a home game, a big blind ante is usually easier than collecting a small ante from every player.</p>
    </div>

    <div class="tb-faq-item">
      <h3>How do I make a poker tournament finish in 2 or 3 hours?</h3>
      <p>Use a 75-100 BB starting stack, 10-15 minute levels, and a steady blind increase. Do not add unlimited rebuys if you care about the finish time. If the generated schedule runs long, lower the starting stack, shorten the levels, or choose faster blind increases.</p>
    </div>

    <div class="tb-faq-item">
      <h3>Should I use the same blind schedule for live and online poker?</h3>
      <p>No. Online tables deal many more hands per hour, so a 10-minute online level can feel much longer than a 10-minute self-dealt home level. For a live home game, use longer levels or accept that the tournament will play faster and become short-stacked sooner.</p>
    </div>
  </div>
</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Poker Tournament Blinds Calculator",
  "url": "https://chipsoffury.com/tournament-blinds-calculator/",
  "description": "Build an editable poker tournament blind schedule for a home game. Set players, stacks, target length, antes, breaks, and blind increases.",
  "dateModified": "2026-05-22",
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
      "name": "What blind structure should I use for a home poker tournament?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most single-table home tournaments, start players with 75-100 big blinds and use 12-18 minute levels. That gives players time to play early hands without making the tournament drag all night. Use shorter levels or a smaller starting depth only when you need a quick game."
      }
    },
    {
      "@type": "Question",
      "name": "How long should poker blind levels be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use 10-12 minute levels for a quick home tournament, 15-20 minutes for a standard casual tournament, and 20 or more minutes for a deeper game. Self-dealt games need longer levels than online tournaments because fewer hands are dealt per hour."
      }
    },
    {
      "@type": "Question",
      "name": "How many big blinds should players start with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fifty big blinds is fast, 75-100 big blinds is a good default, and 150-200 big blinds is deep. Think in big blinds instead of raw chip count. A 10,000 stack can be deep or short depending on the opening blinds."
      }
    },
    {
      "@type": "Question",
      "name": "When should antes start in a poker tournament?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keep antes off for the first few levels. Add them around Level 4 or 5, after rebuys close, or once stacks are deep enough that pots need more action. For a home game, a big blind ante is usually easier than collecting a small ante from every player."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make a poker tournament finish in 2 or 3 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a 75-100 big blind starting stack, 10-15 minute levels, and a steady blind increase. Do not add unlimited rebuys if you care about the finish time. If the generated schedule runs long, lower the starting stack, shorten the levels, or choose faster blind increases."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use the same blind schedule for live and online poker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Online tables deal many more hands per hour, so a 10-minute online level can feel much longer than a 10-minute self-dealt home level. For a live home game, use longer levels or accept that the tournament will play faster and become short-stacked sooner."
      }
    }
  ]
}
</script>

<section class="tb-content tb-feedback">
  <div class="tb-content-inner tb-content-inner--center">
    <div class="tb-tag">Feedback</div>
    <h2>Have a suggestion or found a bug?</h2>
    <p>This tool is actively maintained. If something does not work for your tournament setup, or you have an idea that would make it more useful, send it over.</p>
    <a href="/contact/" class="tb-hero-cta">Send Feedback</a>
  </div>
</section>
