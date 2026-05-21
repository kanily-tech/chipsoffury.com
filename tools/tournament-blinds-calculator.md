---
title: "Poker Tournament Blind Structure Calculator"
date: 2026-05-19
description: "Create an editable blind schedule for a home poker tournament. Enter players, stacks, blinds, and target length, then adjust levels and breaks."
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
    <p>The calculator uses the common home-tournament rule of thumb that an event usually ends when there are roughly ten big blinds left in play. It estimates that final big blind from your starting stacks and player count, scores nearby conventional blind levels, then builds a smooth progression from your opening blinds.</p>
    <p>Breaks and manual edits are separate from the generated blind ladder. That means you can insert a break after any level, remove a break, change antes by hand, or adjust one awkward level without losing the generated structure.</p>
  </div>
</section>
