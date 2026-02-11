---
title: "Poker Chip Distribution Calculator"
date: 2026-02-10
description: "Cash-game chip setup assistant with buy-in-first flow, blind suggestions, denomination suggestions, and shareable URLs."
tags: [ 'post', 'home-games' ]
authorSlugs: [animesh]
showAuthorBio: false
---

Use this cash-game setup assistant to move from buy-in to playable stacks in three steps: game settings, chip set, then denomination mapping + distribution.

<style>
#cof-calc {
  --cof-bg: linear-gradient(160deg, #eff6ff 0%, #f8fafc 45%, #fefce8 100%);
  --cof-panel: #ffffff;
  --cof-ink: #0f172a;
  --cof-sub: #475569;
  --cof-line: #d8e1ee;
  --cof-accent: #0f766e;
  --cof-accent-soft: #ecfdf5;
  --cof-danger: #9f1239;
  --cof-danger-bg: #fff1f2;
  --cof-warn: #92400e;
  --cof-warn-bg: #fffbeb;
  --cof-control-border: #d7deea;
  --cof-control-bg: #fff;
  --cof-number-color: #0f4c5c;
  --cof-number-weight: 600;
  --cof-number-underline: #b0c4c0;
  margin: 1.5rem 0;
  padding: 0.95rem;
  border-radius: 16px;
  border: 1px solid #dbe4f0;
  background: var(--cof-bg);
  color: var(--cof-ink);
  font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
  font-variant-numeric: tabular-nums;
}
#cof-calc * { box-sizing: border-box; }
#cof-calc input[type="number"] { -moz-appearance: textfield; }
#cof-calc input::-webkit-inner-spin-button,
#cof-calc input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

.cof-head {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.7rem;
}
.cof-head h3 {
  margin: 0;
  font-size: 1.02rem;
  letter-spacing: 0.01em;
}
.cof-status {
  margin: 0.15rem 0 0;
  font-size: 0.74rem;
  color: var(--cof-sub);
}
.cof-share {
  border: 1px solid #b9d7d1;
  background: #effcf8;
  color: #0f5f58;
  border-radius: 999px;
  padding: 0.34rem 0.7rem;
  font-size: 0.71rem;
  font-weight: 700;
  cursor: pointer;
}
.cof-head-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-end;
}
.cof-copy-state {
  border-color: #c7d2fe;
  background: #eef2ff;
  color: #3730a3;
}
.cof-reset {
  align-self: center;
  font-size: 0.72rem;
  color: #475569;
  text-decoration: underline;
  text-underline-offset: 0.12rem;
  cursor: pointer;
}
.cof-reset:hover { color: #0f4c5c; }

.cof-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.4rem;
  margin-bottom: 0.65rem;
}
.cof-tab {
  border: 1px solid #d7deea;
  background: #fff;
  border-radius: 10px;
  padding: 0.42rem 0.4rem;
  text-align: center;
  font-size: 0.72rem;
  color: #334155;
  font-weight: 700;
  cursor: pointer;
}
.cof-tab.is-active {
  border-color: #82b9af;
  background: #ecfdf5;
  color: #115e59;
}

.cof-panel {
  background: var(--cof-panel);
  border: 1px solid var(--cof-line);
  border-radius: 12px;
  padding: 0.75rem;
}
#cof-calc section[data-step] > :first-child {
  margin-top: 0 !important;
}
#cof-calc .cof-step-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0 0 0.62rem;
  padding: 0.05rem 0 0.42rem;
  border-bottom: 1px solid #e7edf7;
}
#cof-calc .cof-step-title {
  margin: 0 !important;
  font-size: 0.82rem !important;
  line-height: 1.15;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #334155;
}
#cof-calc .cof-step-note {
  font-size: 0.72rem;
  color: var(--cof-sub);
}

.cof-hidden { display: none; }

.cof-buy-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.7rem;
  margin-bottom: 0.55rem;
}
.cof-buy-main {
  font-size: 1.58rem;
  font-weight: 800;
  color: #0f4c5c;
  line-height: 1;
}
.cof-buy-sub {
  font-size: 0.76rem;
  color: var(--cof-sub);
}
.cof-slider {
  width: 100%;
  accent-color: var(--cof-accent);
}
.cof-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
}
.cof-pill {
  border: 1px solid #d7dfed;
  background: #f8fafc;
  color: #334155;
  border-radius: 999px;
  font-size: 0.7rem;
  padding: 0.24rem 0.6rem;
  cursor: pointer;
}
.cof-pill:hover { background: #f1f5f9; }

.cof-field {
  display: grid;
  gap: 0.2rem;
}
.cof-field label {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 700;
}
.cof-field input,
.cof-field select {
  border: 1px solid #d7deea;
  border-radius: 8px;
  background: #fff;
  color: var(--cof-ink);
  padding: 0.35rem 0.44rem;
  font-size: 0.86rem;
}

.cof-grid-2 {
  display: grid;
  gap: 0.55rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cof-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  color: #475569;
  font-weight: 600;
}
.cof-toggle input { accent-color: var(--cof-accent); }

.cof-stepper {
  display: inline-flex;
  align-items: center;
}
.cof-stepper button {
  width: 1.9rem;
  height: 1.9rem;
  border: 1px solid #d7deea;
  background: #fff;
  color: #0f766e;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
}
.cof-stepper button:first-child { border-radius: 8px 0 0 8px; }
.cof-stepper button:last-child { border-radius: 0 8px 8px 0; }
.cof-stepper span {
  min-width: 2.2rem;
  line-height: 1.9rem;
  text-align: center;
  border-top: 1px solid #d7deea;
  border-bottom: 1px solid #d7deea;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
}

.cof-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
  margin-bottom: 0.5rem;
}
.cof-preset {
  border: 1px solid #d7deea;
  background: #fff;
  color: #334155;
  border-radius: 999px;
  font-size: 0.72rem;
  padding: 0.24rem 0.62rem;
  cursor: pointer;
}
.cof-preset.is-active {
  border-color: #84b9b0;
  background: #ecfdf5;
  color: #115e59;
  font-weight: 700;
}

.cof-chip-list {
  display: grid;
  gap: 0.42rem;
}
.cof-chip-columns {
  display: grid;
  grid-template-columns: 4.9rem minmax(0, 1fr) 2.05rem;
  gap: 0.22rem;
  padding: 0 0.2rem;
  margin-bottom: 0.18rem;
}
.cof-chip-columns span {
  font-size: 0.67rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #64748b;
  font-weight: 700;
}
.cof-chip-row {
  display: grid;
  grid-template-columns: 4.9rem minmax(0, 1fr) 2.05rem;
  gap: 0.22rem;
  align-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  padding: 0.24rem 0.2rem;
}
.cof-chip-row:nth-child(odd) {
  background: #fbfdff;
}
.cof-chip-color {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.36rem;
  width: max-content;
}
.cof-chip-button {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  border: 2px solid var(--chip-border, #334155);
  background:
    radial-gradient(circle at center, #f8fafc 0 38%, transparent 40% 100%),
    radial-gradient(circle at center, var(--chip-fill, #94a3b8) 0 99%, transparent 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.65), 0 1px 1px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}
.cof-chip-mult {
  font-size: 1rem;
  color: #475569;
  font-weight: 700;
  line-height: 1;
}
.cof-color-menu {
  position: absolute;
  top: calc(100% + 0.3rem);
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1.55rem);
  gap: 0.28rem;
  border: 1px solid #d7deea;
  border-radius: 10px;
  background: #fff;
  padding: 0.32rem;
  z-index: 20;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
}
.cof-color-menu.cof-hidden { display: none; }
.cof-color-swatch {
  width: 1.55rem;
  height: 1.55rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.26);
  background: var(--swatch-color, #94a3b8);
  cursor: pointer;
  padding: 0;
}
.cof-color-swatch.is-active {
  outline: 2px solid #0f766e;
  outline-offset: 1px;
}
.cof-chip-stepper {
  display: flex;
  align-items: center;
  gap: 0.32rem;
  justify-content: flex-start;
}
.cof-chip-stepper button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--cof-control-border);
  border-radius: 10px;
  background: var(--cof-control-bg);
  color: #0f766e;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
  flex-shrink: 0;
}
.cof-chip-stepper button:active { background: #f0fdfa; }
.cof-chip-stepper input {
  width: 4.8rem;
  border: 0;
  border-bottom: 2px dashed var(--cof-number-underline);
  border-radius: 0;
  background: transparent;
  padding: 0 0 0.1rem 0;
  font-size: 1.5rem;
  line-height: 1;
  text-align: center;
  font-weight: var(--cof-number-weight);
  color: var(--cof-number-color);
}
.cof-chip-stepper input:focus {
  outline: none;
  border-bottom-style: solid;
  border-bottom-color: var(--cof-accent);
}
.cof-remove {
  width: 2.05rem;
  height: 2.05rem;
  border: 1px solid #fed7aa;
  border-radius: 999px;
  background: #fff;
  color: #c2410c;
  font-size: 1.05rem;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
}
.cof-add {
  margin-top: 0.45rem;
  width: 100%;
  border: 1px dashed #bac8dd;
  border-radius: 10px;
  background: #f8fbff;
  color: #334155;
  font-size: 0.84rem;
  font-weight: 700;
  padding: 0.55rem 0.5rem;
  cursor: pointer;
}

.cof-suggest-head {
  margin-top: 0.7rem;
  margin-bottom: 0.35rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.cof-suggest-head span {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 700;
}
.cof-auto-btn {
  border: 1px solid #9ecbc4;
  background: #ecfdf5;
  color: #0f766e;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.22rem 0.55rem;
  cursor: pointer;
}

.cof-options {
  display: grid;
  gap: 0.42rem;
}
.cof-option {
  border: 1px solid #d7deea;
  border-radius: 10px;
  background: #fff;
  padding: 0.45rem;
  cursor: pointer;
}
.cof-option.is-active {
  border-color: #83b9af;
  background: #f0fdf4;
}
.cof-option-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.2rem;
}
.cof-option-label {
  font-size: 0.74rem;
  font-weight: 800;
  color: #1e3a5f;
}
.cof-tag {
  font-size: 0.64rem;
  border-radius: 999px;
  padding: 0.15rem 0.42rem;
  border: 1px solid transparent;
}
.cof-tag.good { color: #166534; background: #ecfdf3; border-color: #b9efcd; }
.cof-tag.warn { color: #92400e; background: #fffbeb; border-color: #f5dd9b; }
.cof-map {
  font-size: 0.7rem;
  color: #475569;
}

.cof-alert {
  border: 1px solid #fecdd3;
  background: var(--cof-danger-bg);
  color: var(--cof-danger);
  border-radius: 10px;
  padding: 0.5rem 0.56rem;
  font-size: 0.76rem;
  line-height: 1.35;
  margin-bottom: 0.6rem;
}
.cof-alert strong { color: #881337; }
.cof-alert button {
  margin-top: 0.34rem;
  border: 1px solid #fda4af;
  background: #fff;
  color: #9f1239;
  border-radius: 999px;
  padding: 0.2rem 0.52rem;
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
}

.cof-summary {
  font-size: 0.82rem;
  color: #334155;
  margin-top: 0.25rem;
}
.cof-summary strong { color: #0f172a; }
.cof-dist-kicker {
  font-size: 1.02rem;
  color: #475569;
  font-weight: 700;
  line-height: 1.35;
}
.cof-stacks {
  margin-top: 0.7rem;
}
.cof-ref-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7.8rem, 1fr));
  gap: 0.9rem 0.7rem;
}
.cof-ref-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.cof-chip-token {
  width: 5.1rem;
  height: 5.1rem;
  border-radius: 999px;
  border: 0;
  --chip-notch-a: rgba(255, 255, 255, 0.75);
  --chip-notch-b: rgba(255, 255, 255, 0.12);
  --chip-center-ring: rgba(248, 250, 252, 0.74);
  --chip-face-shadow: rgba(255, 255, 255, 0.16);
  background:
    radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.22), transparent 36%),
    var(--chip-fill, #94a3b8);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.cof-chip-token::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: repeating-conic-gradient(
    from -6deg,
    var(--chip-notch-a) 0deg 7deg,
    var(--chip-notch-b) 7deg 28deg
  );
  opacity: 0.3;
}
.cof-chip-token::after {
  content: '';
  position: absolute;
  inset: 0.78rem;
  border-radius: 999px;
  border: 3px solid var(--chip-center-ring);
  background: var(--chip-fill, #94a3b8);
  box-shadow: inset 0 0 0 2px var(--chip-face-shadow);
}
.cof-chip-token.is-light {
  --chip-notch-a: rgba(148, 163, 184, 0.5);
  --chip-notch-b: rgba(148, 163, 184, 0.12);
  --chip-center-ring: rgba(100, 116, 139, 0.35);
  --chip-face-shadow: rgba(255, 255, 255, 0.85);
  background:
    radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.85), transparent 36%),
    #f8fafc;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12), inset 0 0 0 1px #cbd5e1;
}
.cof-chip-token-value {
  position: relative;
  z-index: 2;
  font-size: 1.18rem;
  font-weight: 900;
  color: var(--chip-text, #0f172a);
  letter-spacing: 0.01em;
}
.cof-ref-name {
  margin-top: 0.44rem;
  font-size: 0.8rem;
  color: #334155;
  font-weight: 700;
}
.cof-ref-mult {
  margin-top: 0.08rem;
  font-size: 1.25rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}
.cof-ref-eq {
  margin-top: 0.04rem;
  font-size: 0.86rem;
  font-weight: 700;
  color: #475569;
}
.cof-stack-total {
  margin-top: 0.78rem;
  border: 1px solid #9ecbc4;
  background: #f0fdf4;
  color: #115e59;
  border-radius: 10px;
  padding: 0.48rem 0.62rem;
  font-size: 1rem;
  font-weight: 900;
  text-align: center;
  letter-spacing: 0.01em;
}

.cof-warnings {
  display: grid;
  gap: 0.34rem;
  margin-top: 0.55rem;
}
.cof-warning {
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 0.74rem;
  padding: 0.34rem 0.48rem;
}
.cof-warning.red { border-color: #fecdd3; background: #fff1f2; color: #9f1239; }
.cof-warning.yellow { border-color: #fde68a; background: #fffbeb; color: #92400e; }

.cof-nav {
  margin-top: 0.7rem;
  display: flex;
  justify-content: space-between;
  gap: 0.45rem;
}
.cof-nav button {
  flex: 1;
  border-radius: 10px;
  border: 1px solid #d7deea;
  background: #fff;
  color: #334155;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.45rem 0.55rem;
  cursor: pointer;
}
.cof-nav .cof-next {
  border-color: #7fbab0;
  background: #ecfdf5;
  color: #0f766e;
}

.cof-section { margin-bottom: 1.1rem; }
.cof-section:last-child { margin-bottom: 0; }

.cof-buy-hero {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
}
.cof-buy-value {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
}
.cof-buy-step {
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--cof-control-border);
  border-radius: 10px;
  background: var(--cof-control-bg);
  color: #0f766e;
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cof-buy-step:active { background: #f0fdfa; }
.cof-buy-step:disabled { opacity: 0.35; cursor: default; }
.cof-dollar {
  font-size: 1.7rem;
  font-weight: var(--cof-number-weight);
  color: var(--cof-number-color);
  line-height: 1;
}
.cof-buy-hero input {
  font-size: 2.1rem;
  font-weight: var(--cof-number-weight);
  color: var(--cof-number-color);
  background: transparent;
  border: none;
  border-bottom: 2px dashed var(--cof-number-underline);
  padding: 0 0 0.1rem 0;
  width: 7rem;
  line-height: 1;
  outline: none;
}
.cof-buy-hero input:focus {
  border-bottom-style: solid;
  border-bottom-color: var(--cof-accent);
}
.cof-depth {
  font-size: 0.76rem;
  color: var(--cof-sub);
  margin-top: 0.3rem;
}

.cof-section-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}
.cof-section-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: #334155;
  letter-spacing: 0.01em;
}
.cof-auto-check {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  user-select: none;
}
.cof-auto-check input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.cof-checkmark {
  width: 1.35rem;
  height: 1.35rem;
  border: 2px solid #b0c4c0;
  border-radius: 5px;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
}
.cof-auto-check input:checked + .cof-checkmark {
  background: #0f766e;
  border-color: #0f766e;
}
.cof-checkmark::after {
  content: '';
  width: 0.32rem;
  height: 0.62rem;
  border: solid transparent;
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
  margin-top: -2px;
}
.cof-auto-check input:checked + .cof-checkmark::after {
  border-color: #fff;
}
.cof-blinds-row {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
}
.cof-blinds-row .cof-dollar {
  font-size: 1.3rem;
}
.cof-blinds-row input {
  font-size: 1.5rem;
  font-weight: var(--cof-number-weight);
  color: var(--cof-number-color);
  background: transparent;
  border: none;
  border-bottom: 2px dashed var(--cof-number-underline);
  padding: 0 0 0.1rem 0;
  width: 4rem;
  line-height: 1;
  outline: none;
}
.cof-blinds-row input:focus {
  border-bottom-style: solid;
  border-bottom-color: var(--cof-accent);
}
.cof-blinds-sep {
  font-size: 1.3rem;
  color: #94a3b8;
  font-weight: 500;
  padding: 0 0.2rem;
}
.cof-stepper-lg { margin-top: 0.3rem; }
.cof-stepper-lg button {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.15rem;
}
.cof-stepper-lg > span {
  min-width: 2.8rem;
  line-height: 2.5rem;
  font-size: 1.05rem;
}

@media (max-width: 600px) {
  .cof-chip-columns {
    grid-template-columns: 3.7rem minmax(0, 1fr) 1.9rem;
    gap: 0.12rem;
    padding: 0;
  }
  .cof-chip-row {
    grid-template-columns: 3.7rem minmax(0, 1fr) 1.9rem;
    gap: 0.12rem;
    padding: 0.2rem 0;
  }
  .cof-chip-button {
    width: 1.9rem;
    height: 1.9rem;
  }
  .cof-chip-stepper button {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
  .cof-chip-stepper input {
    width: 3.1rem;
    font-size: 1.25rem;
    padding: 0 0 0.08rem 0;
  }
  .cof-remove {
    width: 1.9rem;
    height: 1.9rem;
  }
  .cof-ref-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem 0.45rem;
  }
  .cof-chip-token {
    width: 4.5rem;
    height: 4.5rem;
  }
  .cof-chip-token-value {
    font-size: 1.02rem;
  }
  .cof-color-menu {
    grid-template-columns: repeat(4, 1.35rem);
  }
  .cof-color-swatch {
    width: 1.35rem;
    height: 1.35rem;
  }
}

@media (min-width: 900px) {
  #cof-calc { padding: 1.15rem; }
  .cof-panel { padding: 0.9rem; }
}
</style>

<div id="cof-calc">
  <div class="cof-head">
    <div>
      <h3>Cash Game Chip Setup Assistant</h3>
      <p class="cof-status" id="cof-status">Step through setup, then copy a shareable link.</p>
    </div>
    <div class="cof-head-actions">
      <button type="button" class="cof-share cof-copy-state" id="cof-copy-state">Copy State</button>
      <button type="button" class="cof-share" id="cof-share">Copy Share Link</button>
      <a href="#" class="cof-reset" id="cof-reset">Reset</a>
    </div>
  </div>
  <div class="cof-tabs">
    <button type="button" class="cof-tab is-active" data-tab="0">1. Game</button>
    <button type="button" class="cof-tab" data-tab="1">2. Chip Set</button>
    <button type="button" class="cof-tab" data-tab="2">3. Distribution</button>
  </div>
  <div class="cof-panel">
    <section data-step="0">
      <div class="cof-step-header">
        <h4 class="cof-step-title">Game Setup</h4>
        <span class="cof-step-note">Set buy-in, blinds, and players</span>
      </div>
      <div class="cof-section">
        <div class="cof-section-head">
          <span class="cof-section-label">Buy-in</span>
        </div>
        <div class="cof-buy-hero">
          <button id="cof-buy-minus" type="button" class="cof-buy-step" aria-label="Decrease buy-in">&minus;</button>
          <div class="cof-buy-value">
            <span class="cof-dollar">$</span>
            <input id="cof-buy-input" type="number" min="1" max="10000000" step="any" value="50">
          </div>
          <button id="cof-buy-plus" type="button" class="cof-buy-step" aria-label="Increase buy-in">+</button>
        </div>
        <div class="cof-depth" id="cof-depth-label">100 BB deep at $0.25/$0.50</div>
      </div>
      <div class="cof-section">
        <div class="cof-section-head">
          <span class="cof-section-label">Blinds</span>
          <label class="cof-auto-check">
            <input type="checkbox" id="cof-auto-blinds" checked>
            <span class="cof-checkmark"></span>
            <span>Auto</span>
          </label>
        </div>
        <div class="cof-blinds-row">
          <span class="cof-dollar">$</span>
          <input id="cof-sb" type="number" min="0.01" step="any" value="0.25">
          <span class="cof-blinds-sep">/</span>
          <span class="cof-dollar">$</span>
          <input id="cof-bb" type="number" min="0.01" step="any" value="0.50">
        </div>
      </div>
      <div class="cof-section">
        <div class="cof-section-head">
          <span class="cof-section-label">Players</span>
        </div>
        <div class="cof-stepper cof-stepper-lg">
          <button id="cof-player-minus" type="button" aria-label="Decrease players">&minus;</button>
          <span id="cof-player-count">6</span>
          <button id="cof-player-plus" type="button" aria-label="Increase players">+</button>
        </div>
      </div>
    </section>
    <section data-step="1" class="cof-hidden">
      <div class="cof-step-header">
        <h4 class="cof-step-title">Chip Set</h4>
        <span class="cof-step-note">Configure colors/counts. Denominations are assigned in step 3.</span>
      </div>
      <div id="cof-chip-alert" class="cof-alert cof-hidden"></div>
      <div class="cof-presets" id="cof-presets"></div>
      <div class="cof-chip-columns" aria-hidden="true">
        <span>Color</span>
        <span>Count</span>
        <span></span>
      </div>
      <div class="cof-chip-list" id="cof-chip-list"></div>
      <button id="cof-add-chip" class="cof-add" type="button">+ Add Chip Color</button>
    </section>
    <section data-step="2" class="cof-hidden">
      <div class="cof-step-header">
        <h4 class="cof-step-title">Recommended Denominations and Distribution</h4>
      </div>
      <div id="cof-dist-alert" class="cof-alert cof-hidden"></div>
      <div id="cof-summary" class="cof-summary"></div>
      <div id="cof-stacks" class="cof-stacks"></div>
      <div id="cof-warnings" class="cof-warnings"></div>
    </section>
  </div>
  <div class="cof-nav">
    <button type="button" id="cof-prev">Previous</button>
    <button type="button" id="cof-next" class="cof-next">Next</button>
  </div>
</div>

<script src="/js/chip-distribution.js"></script>
<script>
(function () {
  function round2(v) { return Math.round(v * 100) / 100; }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function fmt(v) {
    if (!isFinite(v)) return '$0';
    if (v < 1) return Math.round(v * 100) + 'c';
    if (v === Math.floor(v)) return '$' + v;
    return '$' + v.toFixed(2);
  }
  function chipLuma(hex) {
    if (!hex || typeof hex !== 'string') return 0;
    var raw = hex.replace('#', '');
    if (!/^[0-9a-fA-F]{6}$/.test(raw)) return 0;
    var r = parseInt(raw.slice(0, 2), 16);
    var g = parseInt(raw.slice(2, 4), 16);
    var b = parseInt(raw.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  function chipTextColor(hex) {
    var luma = chipLuma(hex);
    return luma > 0.62 ? '#0f172a' : '#f8fafc';
  }
  function valuesKey(values) {
    return values.map(function (v) { return round2(v).toFixed(2); }).join('|');
  }
  function minValue(values) {
    if (!values || !values.length) return 0;
    var min = values[0];
    for (var i = 1; i < values.length; i++) if (values[i] < min) min = values[i];
    return min;
  }
  function getTotalValue(chips) {
    var t = 0;
    for (var k in chips) if (chips.hasOwnProperty(k)) t += parseFloat(k) * chips[k];
    return round2(t);
  }
  function getTotalCount(chips) {
    var t = 0;
    for (var k in chips) if (chips.hasOwnProperty(k)) t += chips[k];
    return t;
  }

  var COLORS = [
    { name: 'White', color: '#f3f4f6', border: '#d1d5db' },
    { name: 'Red', color: '#dc2626', border: '#991b1b' },
    { name: 'Blue', color: '#2563eb', border: '#1d4ed8' },
    { name: 'Green', color: '#16a34a', border: '#15803d' },
    { name: 'Black', color: '#1f2937', border: '#111827' },
    { name: 'Purple', color: '#7c3aed', border: '#5b21b6' },
    { name: 'Orange', color: '#ea580c', border: '#c2410c' },
    { name: 'Yellow', color: '#eab308', border: '#a16207' },
    { name: 'Pink', color: '#ec4899', border: '#be185d' }
  ];

  var PRESETS = {
    '100-piece': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 25 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 25 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 25 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 25 }
    ],
    '200-piece': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 50 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 50 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 50 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 50 }
    ],
    '300-piece': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 100 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 100 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 50 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 50 }
    ],
    '500-piece': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 200 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 150 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 100 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 50 }
    ]
  };

  function cloneChips(arr) {
    return arr.map(function (c) {
      return {
        color: c.color,
        border: c.border,
        name: c.name,
        totalCount: parseInt(c.totalCount, 10)
      };
    });
  }

  function colorMeta(hex, fallbackName) {
    var found = COLORS.find(function (c) { return c.color.toLowerCase() === hex.toLowerCase(); });
    if (found) return found;
    return { name: fallbackName || 'Chip', color: hex, border: '#334155' };
  }

  function parseChips(raw) {
    if (!raw) return null;
    var parts = raw.split(',');
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].trim();
      if (!p) continue;
      var seg = p.split(':');
      if (seg.length < 2) continue;
      var hex = seg[0].replace('#', '').toLowerCase();
      if (!/^[0-9a-f]{6}$/.test(hex)) continue;
      var qty = parseInt(seg[1], 10);
      if (!isFinite(qty) || qty <= 0) continue;
      var meta = colorMeta('#' + hex, 'Chip ' + (out.length + 1));
      out.push({ color: '#' + hex, border: meta.border, name: meta.name, totalCount: qty });
    }
    return out.length ? out : null;
  }

  function parseVals(raw, len) {
    if (!raw) return null;
    var vals = raw.split(',').map(function (v) { return parseFloat(v); });
    if (vals.length !== len) return null;
    for (var i = 0; i < vals.length; i++) {
      if (!isFinite(vals[i]) || vals[i] <= 0) return null;
      vals[i] = round2(vals[i]);
    }
    return vals;
  }

  var state = {
    step: 0,
    buyIn: 50,
    players: 6,
    autoBlinds: true,
    sb: 0.25,
    bb: 0.5,
    chips: cloneChips(PRESETS['300-piece']),
    values: null,
    suggestions: []
  };

  var els = {
    status: document.getElementById('cof-status'),
    copyState: document.getElementById('cof-copy-state'),
    share: document.getElementById('cof-share'),
    reset: document.getElementById('cof-reset'),
    tabs: Array.prototype.slice.call(document.querySelectorAll('.cof-tab')),
    sections: Array.prototype.slice.call(document.querySelectorAll('[data-step]')),
    prev: document.getElementById('cof-prev'),
    next: document.getElementById('cof-next'),

    depthLabel: document.getElementById('cof-depth-label'),
    buyInput: document.getElementById('cof-buy-input'),
    buyMinus: document.getElementById('cof-buy-minus'),
    buyPlus: document.getElementById('cof-buy-plus'),
    autoBlinds: document.getElementById('cof-auto-blinds'),
    sb: document.getElementById('cof-sb'),
    bb: document.getElementById('cof-bb'),
    playerMinus: document.getElementById('cof-player-minus'),
    playerPlus: document.getElementById('cof-player-plus'),
    playerCount: document.getElementById('cof-player-count'),

    chipAlert: document.getElementById('cof-chip-alert'),
    presets: document.getElementById('cof-presets'),
    chipList: document.getElementById('cof-chip-list'),
    addChip: document.getElementById('cof-add-chip'),

    distAlert: document.getElementById('cof-dist-alert'),
    summary: document.getElementById('cof-summary'),
    stacks: document.getElementById('cof-stacks'),
    warnings: document.getElementById('cof-warnings')
  };

  function cloneWarnings(warnings) {
    return (warnings || []).map(function (w) {
      return {
        type: w.type || '',
        severity: w.severity || '',
        message: w.message || ''
      };
    });
  }

  function cleanChips(chips) {
    var out = {};
    for (var k in chips) {
      if (chips.hasOwnProperty(k)) out[round2(parseFloat(k))] = chips[k];
    }
    return out;
  }

  function mappingDebug(values, label, source, metrics) {
    if (!values || values.length !== state.chips.length) return null;
    var denoms = buildDenoms(values);
    var result = ChipDistribution.distribute(state.buyIn, denoms, state.players);
    var blindWarnings = ChipDistribution.checkBlindWarnings(state.sb, denoms);
    var allWarnings = result.warnings.concat(blindWarnings);
    var chipsPerPlayer = cleanChips(result.chips);

    return {
      id: valuesKey(values),
      label: label || 'Mapping',
      source: source || 'unknown',
      values: values.map(function (v) { return round2(v); }),
      denominations: denoms.map(function (d) {
        return {
          name: d.name,
          color: d.color,
          totalCount: parseInt(d.totalCount, 10),
          value: round2(d.value)
        };
      }),
      metrics: metrics || { blindMismatch: minValue(values) > state.sb + 1e-9 },
      distribution: {
        chipsPerPlayer: chipsPerPlayer,
        chipCountPerPlayer: getTotalCount(chipsPerPlayer),
        valuePerPlayer: getTotalValue(chipsPerPlayer),
        buyInGap: round2(state.buyIn - getTotalValue(chipsPerPlayer)),
        warnings: cloneWarnings(allWarnings),
        blindWarnings: cloneWarnings(blindWarnings),
        rawWarnings: cloneWarnings(result.warnings)
      }
    };
  }

  function buildDebugState() {
    var selectedKey = state.values && state.values.length ? valuesKey(state.values) : null;
    var mappings = [];
    var seen = {};

    state.suggestions.forEach(function (s) {
      var key = valuesKey(s.values || []);
      if (!key || seen[key]) return;
      var dbg = mappingDebug(s.values, s.label, 'suggested', s.metrics);
      if (!dbg) return;
      dbg.isSelected = key === selectedKey;
      mappings.push(dbg);
      seen[key] = true;
    });

    if (state.values && state.values.length === state.chips.length) {
      var selectedSuggestion = findSuggestionByValues(state.values);
      var selectedLabel = selectedSuggestion ? selectedSuggestion.label : 'Custom Mapping';
      var selectedSource = selectedSuggestion ? 'suggested' : 'selected-custom';
      var key = valuesKey(state.values);
      if (!seen[key]) {
        var selectedDbg = mappingDebug(state.values, selectedLabel, selectedSource, selectedSuggestion ? selectedSuggestion.metrics : null);
        if (selectedDbg) {
          selectedDbg.isSelected = true;
          mappings.push(selectedDbg);
        }
      }
    }

    mappings.sort(function (a, b) {
      if (a.isSelected && !b.isSelected) return -1;
      if (!a.isSelected && b.isSelected) return 1;
      return a.label.localeCompare(b.label);
    });

    return {
      generatedAt: new Date().toISOString(),
      url: location.href,
      input: {
        game: {
          step: state.step,
          buyIn: round2(state.buyIn),
          players: state.players,
          autoBlinds: !!state.autoBlinds,
          smallBlind: round2(state.sb),
          bigBlind: round2(state.bb),
          bbDepth: round2(state.buyIn / state.bb)
        },
        chipSet: state.chips.map(function (c, idx) {
          return {
            index: idx,
            name: c.name,
            color: c.color,
            border: c.border,
            totalCount: parseInt(c.totalCount, 10)
          };
        }),
        selectedValues: state.values ? state.values.map(function (v) { return round2(v); }) : null
      },
      output: {
        selectedMappingId: selectedKey,
        mappingCount: mappings.length,
        mappings: mappings
      }
    };
  }

  function buildDenoms(values) {
    return state.chips.map(function (c, idx) {
      return {
        value: round2(values[idx]),
        totalCount: parseInt(c.totalCount, 10),
        color: c.color,
        name: c.name
      };
    });
  }

  function manualSuggestion(values, label) {
    var denoms = buildDenoms(values);
    return {
      label: label || 'Custom',
      values: values.slice(),
      denominations: denoms,
      distribution: ChipDistribution.distribute(state.buyIn, denoms, state.players),
      metrics: {
        blindMismatch: minValue(values) > state.sb + 1e-9
      }
    };
  }

  function findSuggestionByValues(values) {
    var key = valuesKey(values || []);
    return state.suggestions.find(function (s) { return valuesKey(s.values) === key; }) || null;
  }

  function findCompatibleSuggestion() {
    return state.suggestions.find(function (s) {
      return !(s.metrics && s.metrics.blindMismatch);
    }) || null;
  }

  function activeSuggestion() {
    if (!state.values || !state.values.length) return null;
    return findSuggestionByValues(state.values) || manualSuggestion(state.values, 'Custom Mapping');
  }

  function buyInStep(value) {
    if (value < 10) return 5;
    return Math.pow(10, Math.floor(Math.log10(value)));
  }

  function serialize() {
    var qs = new URLSearchParams();
    qs.set('v', '3');
    qs.set('t', String(state.step));
    qs.set('bi', String(round2(state.buyIn)));
    qs.set('p', String(state.players));
    qs.set('auto', state.autoBlinds ? '1' : '0');
    qs.set('sb', String(round2(state.sb)));
    qs.set('bb', String(round2(state.bb)));
    qs.set('chips', state.chips.map(function (c) {
      return c.color.replace('#', '').toLowerCase() + ':' + parseInt(c.totalCount, 10);
    }).join(','));
    if (state.values && state.values.length === state.chips.length) {
      qs.set('vals', state.values.map(function (v) { return round2(v); }).join(','));
    }
    history.replaceState(null, '', location.pathname + '?' + qs.toString());
  }

  function load() {
    var qs = new URLSearchParams(location.search);
    var bi = parseFloat(qs.get('bi'));
    if (isFinite(bi) && bi > 0) state.buyIn = bi;

    var p = parseInt(qs.get('p'), 10);
    if (isFinite(p)) state.players = clamp(p, 2, 10);

    if (qs.get('auto') === '0') state.autoBlinds = false;

    var sb = parseFloat(qs.get('sb'));
    var bb = parseFloat(qs.get('bb'));
    if (isFinite(sb) && sb > 0) state.sb = sb;
    if (isFinite(bb) && bb > 0) state.bb = bb;

    var chips = parseChips(qs.get('chips'));
    if (chips) state.chips = chips;

    var vals = parseVals(qs.get('vals'), state.chips.length);
    if (vals) state.values = vals;

    var t = parseInt(qs.get('t'), 10);
    if (isFinite(t)) state.step = clamp(t, 0, 2);
  }

  function chooseDefaultValues() {
    var compatible = findCompatibleSuggestion();
    if (compatible) return compatible.values.slice();
    return state.suggestions.length ? state.suggestions[0].values.slice() : null;
  }

  function recompute() {
    if (state.autoBlinds) {
      var blinds = ChipDistribution.suggestBlinds(state.buyIn, { minBB: 50, maxBB: 150 });
      state.sb = blinds.smallBlind;
      state.bb = blinds.bigBlind;
    } else {
      state.sb = Math.max(0.01, round2(state.sb));
      state.bb = Math.max(state.sb, round2(state.bb));
    }

    state.suggestions = ChipDistribution.suggestDenominationMappings({
      buyIn: state.buyIn,
      playerCount: state.players,
      smallBlind: state.sb,
      bigBlind: state.bb,
      chipSet: state.chips,
      preferredValues: state.values,
      maxOptions: 1
    });

    if (!state.values || state.values.length !== state.chips.length) {
      state.values = chooseDefaultValues();
    }
    if (state.values && state.values.length === state.chips.length && !findSuggestionByValues(state.values)) {
      state.values = chooseDefaultValues();
    }

    render();
    serialize();
  }

  function presetMatch() {
    var names = Object.keys(PRESETS);
    for (var i = 0; i < names.length; i++) {
      var p = PRESETS[names[i]];
      if (p.length !== state.chips.length) continue;
      var ok = true;
      for (var j = 0; j < p.length; j++) {
        if (p[j].color.toLowerCase() !== state.chips[j].color.toLowerCase() || parseInt(p[j].totalCount, 10) !== parseInt(state.chips[j].totalCount, 10)) {
          ok = false;
          break;
        }
      }
      if (ok) return names[i];
    }
    return null;
  }

  function renderTabs() {
    els.tabs.forEach(function (tab) {
      var idx = parseInt(tab.getAttribute('data-tab'), 10);
      tab.classList.toggle('is-active', idx === state.step);
    });
    els.sections.forEach(function (section) {
      var idx = parseInt(section.getAttribute('data-step'), 10);
      section.classList.toggle('cof-hidden', idx !== state.step);
    });

    els.prev.disabled = state.step === 0;
    els.next.textContent = state.step === 2 ? 'Done' : 'Next';
  }

  function renderGame() {
    if (document.activeElement !== els.buyInput) {
      els.buyInput.value = String(round2(state.buyIn));
    }
    els.depthLabel.textContent = round2(state.buyIn / state.bb) + ' BB deep at ' + fmt(state.sb) + '/' + fmt(state.bb);
    els.buyMinus.disabled = state.buyIn <= 5;

    els.autoBlinds.checked = state.autoBlinds;
    if (document.activeElement !== els.sb) {
      els.sb.value = String(round2(state.sb));
    }
    if (document.activeElement !== els.bb) {
      els.bb.value = String(round2(state.bb));
    }

    els.playerCount.textContent = String(state.players);
    els.playerMinus.disabled = state.players <= 2;
    els.playerPlus.disabled = state.players >= 10;
  }

  function renderChipTabAlert() {
    els.chipAlert.classList.add('cof-hidden');
  }

  function renderPresets() {
    var active = presetMatch();
    els.presets.innerHTML = '';
    Object.keys(PRESETS).forEach(function (name) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cof-preset' + (active === name ? ' is-active' : '');
      btn.textContent = name;
      btn.addEventListener('click', function () {
        state.chips = cloneChips(PRESETS[name]);
        state.values = null;
        recompute();
      });
      els.presets.appendChild(btn);
    });
  }

  function closeChipColorMenus() {
    var menus = els.chipList.querySelectorAll('.cof-color-menu');
    Array.prototype.forEach.call(menus, function (menu) {
      menu.classList.add('cof-hidden');
    });
  }

  function renderChipRows() {
    els.chipList.innerHTML = '';

    state.chips.forEach(function (chip, idx) {
      var row = document.createElement('div');
      row.className = 'cof-chip-row';

      var colorControl = document.createElement('div');
      colorControl.className = 'cof-chip-color';

      var chipButton = document.createElement('button');
      chipButton.type = 'button';
      chipButton.className = 'cof-chip-button';
      chipButton.style.setProperty('--chip-fill', chip.color);
      chipButton.style.setProperty('--chip-border', chip.border || '#334155');
      chipButton.setAttribute('aria-label', 'Change chip color for row ' + (idx + 1));
      chipButton.title = chip.name;
      colorControl.appendChild(chipButton);

      var mult = document.createElement('span');
      mult.className = 'cof-chip-mult';
      mult.textContent = 'x';
      colorControl.appendChild(mult);

      var colorMenu = document.createElement('div');
      colorMenu.className = 'cof-color-menu cof-hidden';
      COLORS.forEach(function (c) {
        var swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = 'cof-color-swatch' + (c.color.toLowerCase() === chip.color.toLowerCase() ? ' is-active' : '');
        swatch.style.setProperty('--swatch-color', c.color);
        swatch.title = c.name;
        swatch.setAttribute('aria-label', 'Set color to ' + c.name);
        swatch.addEventListener('click', function (ev) {
          ev.stopPropagation();
          var meta = colorMeta(c.color, c.name);
          state.chips[idx].color = meta.color;
          state.chips[idx].border = meta.border;
          state.chips[idx].name = meta.name;
          recompute();
        });
        colorMenu.appendChild(swatch);
      });
      colorControl.appendChild(colorMenu);
      chipButton.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var wasClosed = colorMenu.classList.contains('cof-hidden');
        closeChipColorMenus();
        if (wasClosed) colorMenu.classList.remove('cof-hidden');
      });
      row.appendChild(colorControl);

      var countStepper = document.createElement('div');
      countStepper.className = 'cof-chip-stepper';

      var countMinus = document.createElement('button');
      countMinus.type = 'button';
      countMinus.textContent = '\u2212';
      countMinus.setAttribute('aria-label', 'Decrease chip count');
      countMinus.addEventListener('click', function () {
        var next = Math.max(1, parseInt(state.chips[idx].totalCount, 10) - 5);
        state.chips[idx].totalCount = next;
        recompute();
      });
      countStepper.appendChild(countMinus);

      var countInput = document.createElement('input');
      countInput.type = 'number';
      countInput.min = '1';
      countInput.step = '1';
      countInput.value = String(chip.totalCount);
      countInput.title = 'Total count';
      countInput.addEventListener('input', function () {
        var n = parseInt(this.value, 10);
        if (!isFinite(n) || n <= 0) return;
        state.chips[idx].totalCount = n;
        recompute();
      });
      countStepper.appendChild(countInput);

      var countPlus = document.createElement('button');
      countPlus.type = 'button';
      countPlus.textContent = '+';
      countPlus.setAttribute('aria-label', 'Increase chip count');
      countPlus.addEventListener('click', function () {
        state.chips[idx].totalCount = parseInt(state.chips[idx].totalCount, 10) + 5;
        recompute();
      });
      countStepper.appendChild(countPlus);
      row.appendChild(countStepper);

      var remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'cof-remove';
      remove.textContent = 'x';
      remove.disabled = state.chips.length <= 2;
      remove.setAttribute('aria-label', 'Remove chip color row');
      remove.addEventListener('click', function () {
        if (state.chips.length <= 2) return;
        state.chips.splice(idx, 1);
        if (state.values && state.values.length > idx) state.values.splice(idx, 1);
        recompute();
      });
      row.appendChild(remove);

      els.chipList.appendChild(row);
    });
  }

  function renderDistribution() {
    els.summary.innerHTML = '';
    els.stacks.innerHTML = '';
    els.warnings.innerHTML = '';
    els.distAlert.classList.add('cof-hidden');

    if (!state.values || state.values.length !== state.chips.length) return;

    var denoms = buildDenoms(state.values);
    var result = ChipDistribution.distribute(state.buyIn, denoms, state.players);
    var total = getTotalValue(result.chips);
    var count = getTotalCount(result.chips);

    els.summary.innerHTML =
      '<div class="cof-dist-kicker">Each player gets <strong>' + count + ' chips</strong> worth <strong>' + fmt(total) +
      '</strong> (' + round2(state.buyIn / state.bb) + ' BB at ' + fmt(state.sb) + '/' + fmt(state.bb) + ').</div>';

    var blindWarnings = ChipDistribution.checkBlindWarnings(state.sb, denoms);
    if (blindWarnings.length) {
      els.distAlert.classList.remove('cof-hidden');
      els.distAlert.innerHTML = '<strong>Important:</strong> ' + blindWarnings[0].message;
    }

    var allWarnings = result.warnings.concat(blindWarnings);
    allWarnings.forEach(function (w) {
      var div = document.createElement('div');
      div.className = 'cof-warning ' + (w.severity === 'red' ? 'red' : 'yellow');
      div.textContent = w.message;
      els.warnings.appendChild(div);
    });

    var sortedVals = Object.keys(result.chips).map(Number).sort(function (a, b) { return a - b; });
    var grid = document.createElement('div');
    grid.className = 'cof-ref-grid';

    sortedVals.forEach(function (v) {
      var chipCount = result.chips[v];
      if (chipCount <= 0) return;
      var denom = denoms.find(function (d) { return Math.abs(d.value - v) < 0.001; });

      var item = document.createElement('div');
      item.className = 'cof-ref-item';

      var token = document.createElement('div');
      token.className = 'cof-chip-token';
      token.style.setProperty('--chip-fill', denom ? denom.color : '#94a3b8');
      token.style.setProperty('--chip-border', denom ? (denom.border || '#334155') : '#334155');
      token.style.setProperty('--chip-text', chipTextColor(denom ? denom.color : '#94a3b8'));
      if (chipLuma(denom ? denom.color : '#94a3b8') > 0.86) token.classList.add('is-light');

      var tokenValue = document.createElement('div');
      tokenValue.className = 'cof-chip-token-value';
      tokenValue.textContent = fmt(v);
      token.appendChild(tokenValue);
      item.appendChild(token);

      var nm = document.createElement('div');
      nm.className = 'cof-ref-name';
      nm.textContent = denom ? denom.name : 'Chip';
      item.appendChild(nm);

      var cc = document.createElement('div');
      cc.className = 'cof-ref-mult';
      cc.textContent = 'x ' + chipCount;
      item.appendChild(cc);

      var eq = document.createElement('div');
      eq.className = 'cof-ref-eq';
      eq.textContent = '= ' + fmt(round2(v * chipCount));
      item.appendChild(eq);

      grid.appendChild(item);
    });

    els.stacks.appendChild(grid);

    var totalBox = document.createElement('div');
    totalBox.className = 'cof-stack-total';
    totalBox.textContent = 'Stack = ' + fmt(total);
    els.stacks.appendChild(totalBox);
  }

  function renderNav() {
    renderTabs();
    els.status.textContent = 'Step through setup, then copy a shareable link.';
  }

  function render() {
    renderNav();
    renderGame();
    renderChipTabAlert();
    renderPresets();
    renderChipRows();
    renderDistribution();
  }

  function setStep(idx) {
    state.step = clamp(idx, 0, 2);
    render();
    serialize();
  }

  function bind() {
    els.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setStep(parseInt(this.getAttribute('data-tab'), 10));
      });
    });

    els.prev.addEventListener('click', function () { setStep(state.step - 1); });
    els.next.addEventListener('click', function () {
      if (state.step < 2) setStep(state.step + 1);
    });

    els.buyMinus.addEventListener('click', function () {
      var step = buyInStep(state.buyIn - 1);
      state.buyIn = Math.max(5, round2(state.buyIn - step));
      recompute();
    });
    els.buyPlus.addEventListener('click', function () {
      var step = buyInStep(state.buyIn);
      state.buyIn = round2(state.buyIn + step);
      recompute();
    });
    els.buyInput.addEventListener('input', function () {
      var n = parseFloat(this.value);
      if (!isFinite(n) || n <= 0) return;
      state.buyIn = n;
      recompute();
    });

    els.autoBlinds.addEventListener('change', function () {
      state.autoBlinds = this.checked;
      recompute();
    });
    els.sb.addEventListener('input', function () {
      var n = parseFloat(this.value);
      if (!isFinite(n) || n <= 0) return;
      state.autoBlinds = false;
      state.sb = n;
      recompute();
    });
    els.bb.addEventListener('input', function () {
      var n = parseFloat(this.value);
      if (!isFinite(n) || n <= 0) return;
      state.autoBlinds = false;
      state.bb = n;
      recompute();
    });

    els.playerMinus.addEventListener('click', function () {
      state.players = clamp(state.players - 1, 2, 10);
      recompute();
    });
    els.playerPlus.addEventListener('click', function () {
      state.players = clamp(state.players + 1, 2, 10);
      recompute();
    });

    els.addChip.addEventListener('click', function () {
      if (state.chips.length >= 8) return;
      var used = state.chips.map(function (c) { return c.color.toLowerCase(); });
      var next = COLORS.find(function (c) { return used.indexOf(c.color.toLowerCase()) === -1; }) || COLORS[0];
      state.chips.push({ color: next.color, border: next.border, name: next.name, totalCount: 50 });
      state.values = null;
      recompute();
    });

    document.addEventListener('click', function () {
      closeChipColorMenus();
    });

    els.share.addEventListener('click', function () {
      var url = location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          els.status.textContent = 'Share link copied.';
        }).catch(function () {
          els.status.textContent = 'Could not copy automatically. Copy from address bar.';
        });
      } else {
        els.status.textContent = 'Copy from address bar.';
      }
    });

    if (els.copyState) {
      els.copyState.addEventListener('click', function () {
        var debugState = buildDebugState();
        var payload = JSON.stringify(debugState, null, 2);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(payload).then(function () {
            els.status.textContent = 'Debug state copied.';
          }).catch(function () {
            els.status.textContent = 'Could not copy debug state automatically.';
          });
        } else {
          els.status.textContent = 'Clipboard unavailable for debug state copy.';
        }
      });
    }

    if (els.reset) {
      els.reset.addEventListener('click', function (ev) {
        ev.preventDefault();
        history.replaceState(null, '', location.pathname);
        location.reload();
      });
    }
  }

  load();
  bind();
  recompute();
})();
</script>

---

## How It Works

The tool is structured as a 3-step wizard for cash games:

1. Choose buy-in first.
2. Set blinds and players (or let blinds auto-suggest in the 50-150 BB range).
3. Configure chip colors and counts, then review the recommended denomination mapping and distribution.

The URL stores the full setup (`buy-in`, `blinds`, `players`, `chips`, and selected denomination values), so any setup can be shared directly.
