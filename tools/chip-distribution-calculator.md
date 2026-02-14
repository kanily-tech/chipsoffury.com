---
title: "Poker Chip Distribution Calculator"
date: 2026-02-10
description: "Free tool to figure out poker chip distribution for your home game. Enter your buy-in, player count, and chip set to get the exact per-player breakdown."
ogImage: "https://chipsoffury.com/images/chip-distribution-calculator-og.webp"
---

<style>
/* ═══ Landing Page ═══ */
.cof-lp-hero {
  background: #091A12;
  position: relative;
  overflow: hidden;
  padding: 4.5rem 1.5rem 4rem;
}
.cof-lp-hero::before {
  content: '';
  position: absolute;
  top: -40%; right: -10%;
  width: 60%; height: 160%;
  background: radial-gradient(ellipse at center, rgba(20, 83, 50, 0.3) 0%, transparent 60%);
  pointer-events: none;
}
.cof-lp-deco {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}
.cof-lp-deco--1 {
  width: 300px; height: 300px;
  top: -80px; right: 3%;
  border: 2px solid rgba(191, 162, 78, 0.1);
}
.cof-lp-deco--1::after {
  content: '';
  position: absolute; inset: 26px;
  border-radius: 999px;
  border: 1.5px solid rgba(191, 162, 78, 0.07);
}
.cof-lp-deco--2 {
  width: 140px; height: 140px;
  bottom: 40px; right: 20%;
  border: 1.5px solid rgba(191, 162, 78, 0.06);
}
.cof-lp-deco--3 {
  width: 80px; height: 80px;
  top: 35%; left: -20px;
  border: 1.5px solid rgba(191, 162, 78, 0.05);
}
.cof-lp-hero-inner {
  max-width: 52rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
@keyframes cof-lp-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.cof-lp-hero-inner > * {
  animation: cof-lp-up 0.55s ease-out both;
}
.cof-lp-hero-inner > :nth-child(2) { animation-delay: 0.08s; }
.cof-lp-hero-inner > :nth-child(3) { animation-delay: 0.16s; }
.cof-lp-hero-inner > :nth-child(4) { animation-delay: 0.24s; }
.cof-lp-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #BFA24E;
  margin-bottom: 1rem;
}
.cof-lp-eyebrow::before {
  content: '';
  display: block;
  width: 1.4rem;
  height: 1.5px;
  background: #BFA24E;
}
.cof-lp-h1 {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 5.5vw, 3.6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #F2EFE8;
  margin: 0 0 1.2rem;
}
.cof-lp-sub {
  font-size: 1.1rem;
  line-height: 1.65;
  color: #8FA894;
  max-width: 36rem;
  margin: 0 0 2rem;
}
.cof-lp-steps-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.2rem;
  display: grid;
  gap: 0.6rem;
  max-width: 36rem;
}
.cof-lp-steps-list li {
  display: flex;
  gap: 0.7rem;
  font-size: 1rem;
  line-height: 1.55;
  color: #8FA894;
}
.cof-lp-steps-list strong {
  color: #D6D1C4;
  font-weight: 600;
}
.cof-lp-step-hint {
  font-size: 0.85rem;
  color: #6B7E6F;
}
.cof-lp-step-num {
  flex-shrink: 0;
  width: 1.55rem;
  height: 1.55rem;
  border-radius: 999px;
  border: 1.5px solid rgba(191, 162, 78, 0.4);
  color: #BFA24E;
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.15rem;
}
.cof-lp-note {
  font-size: 0.88rem;
  line-height: 1.55;
  color: #6B7E6F;
  max-width: 36rem;
  margin: 0 0 2rem;
}
.cof-lp-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #BFA24E;
  color: #091A12;
  font-family: var(--font-heading);
  font-weight: 700;
  padding: 0.85rem 1.7rem;
  border-radius: 10px;
  font-size: 0.95rem;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: background 0.2s, transform 0.12s;
}
.cof-lp-cta:hover {
  background: #CEAF5C;
  transform: translateY(-1px);
}
.cof-lp-cta svg { width: 1rem; height: 1rem; }
.cof-lp-tool {
  background: #EEEDEA;
  padding: 3rem 0.85rem 3.5rem;
  position: relative;
}
.cof-lp-tool::before {
  content: '';
  position: absolute;
  top: 0; left: 8%; right: 8%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #C8B87A 50%, transparent);
}
.cof-lp-tool-inner {
  max-width: 48rem;
  margin: 0 auto;
}
.cof-lp-tool-head {
  text-align: center;
  margin-bottom: 1.3rem;
}
.cof-lp-tool-head h2 {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  color: #1A2E23;
  margin: 0 0 0.2rem;
}
.cof-lp-tool-head p {
  font-size: 0.875rem;
  color: #5F6B63;
  margin: 0;
}
.cof-lp-problems {
  background: #FAFAF6;
  padding: 3.5rem 1.5rem;
}
.cof-lp-problems-inner {
  max-width: 52rem;
  margin: 0 auto;
}
.cof-lp-tag {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8B7335;
  margin-bottom: 0.45rem;
}
.cof-lp-h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 3.2vw, 1.85rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #1A2E23;
  margin: 0 0 1.8rem;
}
.cof-lp-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}
@media (max-width: 560px) {
  .cof-lp-cards { grid-template-columns: 1fr; }
}
.cof-lp-card {
  background: #fff;
  border: 1px solid #E8E5DD;
  border-radius: 12px;
  padding: 1.15rem 1.2rem;
  position: relative;
  overflow: hidden;
}
.cof-lp-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2.5px;
  background: linear-gradient(90deg, #BFA24E, #8B7335);
}
.cof-lp-card-icon {
  width: 2rem; height: 2rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
  background: #FBF6EB;
  border: 1px solid #EDE4CC;
}
.cof-lp-card h3 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: #1A2E23;
  margin: 0 0 0.25rem;
  line-height: 1.3;
}
.cof-lp-card p {
  font-size: 0.825rem;
  line-height: 1.5;
  color: #5F6B63;
  margin: 0;
}
.cof-lp-features {
  background: #FAFAF6;
  padding: 2.5rem 1.5rem 3rem;
  border-top: 1px solid #E8E5DD;
}
.cof-lp-features-inner {
  max-width: 52rem;
  margin: 0 auto;
}
.cof-lp-feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem 1.5rem;
}
@media (max-width: 640px) {
  .cof-lp-feat-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 380px) {
  .cof-lp-feat-grid { grid-template-columns: 1fr; }
}
.cof-lp-feat {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.cof-lp-feat-check {
  width: 1.2rem; height: 1.2rem;
  border-radius: 999px;
  background: #E8F5EE;
  color: #0F766E;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.15rem;
  font-size: 0.6rem;
  font-weight: 800;
}
.cof-lp-feat span {
  font-size: 0.85rem;
  color: #3D4F44;
  line-height: 1.4;
}
.cof-lp-feat strong {
  color: #1A2E23;
  font-weight: 700;
}
@media (max-width: 600px) {
  .cof-lp-hero { padding: 3.5rem 1.2rem 3rem; }
  .cof-lp-tool { padding: 2.5rem 0.65rem 3rem; }
  .cof-lp-problems { padding: 2.5rem 1.2rem; }
  .cof-lp-features { padding: 2rem 1.2rem 2.5rem; }
}
</style>

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
    <p class="cof-lp-note">The URL stores the full config so you can pull it up next session or send it to players as a chip-value reference for unmarked chips (great for beginners).</p>
    <a href="#calculator" class="cof-lp-cta">Start Setting Up <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></a>
  </div>
</section>

<section id="calculator" class="cof-lp-tool">
<div class="cof-lp-tool-inner">
<div class="cof-lp-tool-head">
  <h2>Cash Game Chip Setup</h2>
  <p>Set your buy-in, enter your chips, review the distribution.</p>
</div>

<style>
#cof-calc {
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

  /* Typography scale – Minor Third (1.2) */
  --fs-xs:   0.75rem;   /* 12px – tags, badges */
  --fs-sm:   0.875rem;  /* 14px – secondary text, labels, small buttons */
  --fs-base: 1rem;      /* 16px – body, controls */
  --fs-md:   1.25rem;   /* 20px – titles, captions */
  --fs-lg:   1.5rem;    /* 24px – large numbers */
  --fs-xl:   2rem;      /* 32px – hero numbers */

  margin: 1.5rem 0;
  padding: 0.95rem;
  border-radius: 16px;
  border: 1px solid #dbe4f0;
  background: #fff;
  color: var(--cof-ink);
  font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
  font-variant-numeric: tabular-nums;
}
#cof-calc * { box-sizing: border-box; }
#cof-calc input, #cof-calc button, #cof-calc select { font-family: inherit; }
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
.cof-status {
  margin: 0;
  font-size: var(--fs-sm);
  color: var(--cof-sub);
}
.cof-share {
  border: 1px solid #b9d7d1;
  background: #effcf8;
  color: #0f5f58;
  border-radius: 999px;
  padding: 0.34rem 0.7rem;
  font-size: var(--fs-sm);
  font-weight: 700;
  cursor: pointer;
}
.cof-head-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: flex-end;
}
.cof-copy-state {
  border-color: #c7d2fe;
  background: #eef2ff;
  color: #3730a3;
}
.cof-reset {
  align-self: center;
  font-size: var(--fs-sm);
  color: #475569;
  text-decoration: underline;
  text-underline-offset: 0.12rem;
  cursor: pointer;
}
.cof-reset:hover { color: #0f4c5c; }

.cof-tabs {
  display: flex;
  border-bottom: 1px solid var(--cof-line);
}
.cof-tab {
  flex: 1;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  padding: 0.52rem 0.4rem;
  text-align: center;
  font-size: var(--fs-sm);
  color: #64748b;
  font-weight: 700;
  cursor: pointer;
}
.cof-tab.is-active {
  color: #0f172a;
  border-bottom-color: #0f172a;
}

.cof-panel {
  padding: 0.85rem 0 0;
}
#cof-calc section[data-step] > :first-child {
  margin-top: 0 !important;
}
.cof-caption-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.4rem;
  padding: 0.35rem 0 0.65rem;
  margin-bottom: 0.65rem;
  border-bottom: 1px solid #eef2f7;
  align-items: center;
}
.cof-caption {
  grid-column: 1 / -1;
  grid-row: 1;
  text-align: center;
  font-size: var(--fs-md);
  font-weight: 600;
  color: #1e293b;
  line-height: 1.35;
}
#cof-prev { grid-column: 1; grid-row: 2; justify-self: start; }
#cof-next { grid-column: 3; grid-row: 2; justify-self: end; }
.cof-caption-nav {
  border: 1px solid #0f766e;
  border-radius: 8px;
  background: #ecfdf5;
  color: #0f766e;
  font-size: var(--fs-sm);
  font-weight: 700;
  cursor: pointer;
  padding: 0.36rem 0.7rem;
  white-space: nowrap;
}
.cof-share-img {
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1.5px solid #7c3aed;
  border-radius: 8px;
  background: #ede9fe;
  color: #6d28d9;
  font-size: var(--fs-sm);
  font-weight: 700;
  cursor: pointer;
  padding: 0.36rem 0.85rem;
  white-space: nowrap;
}
.cof-share-img:hover {
  background: #ddd6fe;
}
.cof-share-img.cof-hidden { display: none; }
.cof-share-img svg { width: 1em; height: 1em; }
.cof-caption-nav:disabled {
  opacity: 0.2;
  cursor: default;
}
.cof-caption-nav:not(:disabled):hover {
  background: #d1fae5;
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
  font-size: var(--fs-lg);
  font-weight: 800;
  color: #0f4c5c;
  line-height: 1;
}
.cof-buy-sub {
  font-size: var(--fs-sm);
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
  font-size: var(--fs-sm);
  padding: 0.24rem 0.6rem;
  cursor: pointer;
}
.cof-pill:hover { background: #f1f5f9; }

.cof-field {
  display: grid;
  gap: 0.2rem;
}
.cof-field label {
  font-size: var(--fs-sm);
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
  font-size: var(--fs-base);
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
  font-size: var(--fs-sm);
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
  font-size: var(--fs-base);
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
  font-size: var(--fs-base);
  font-weight: 700;
  color: #1e293b;
}

.cof-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
  justify-content: center;
  margin: 0.45rem 0 0.65rem;
}
.cof-preset {
  border: 1px solid #d7deea;
  background: #fff;
  color: #334155;
  border-radius: 999px;
  font-size: var(--fs-sm);
  padding: 0.24rem 0.62rem;
  cursor: pointer;
}
.cof-preset.is-active {
  border-color: #84b9b0;
  background: #ecfdf5;
  color: #115e59;
  font-weight: 700;
}

/* Marked-mode preset picker */
.cof-presets-picker {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0.45rem 0 0.65rem;
}
.cof-picker-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid #d7deea;
  border-radius: 10px;
  background: #fff;
  padding: 0.44rem 0.62rem;
  cursor: pointer;
  font-size: var(--fs-sm);
  font-weight: 700;
  color: #334155;
}
.cof-picker-trigger:hover { border-color: #9ecbc4; }
.cof-picker-trigger.has-selection {
  border-color: #84b9b0;
  background: #f0fdf4;
  color: #115e59;
}
.cof-picker-caret {
  font-size: var(--fs-xs);
  color: #64748b;
  margin-left: 0.1rem;
}
.cof-picker-dropdown {
  position: absolute;
  top: calc(100% + 0.35rem);
  left: 50%;
  transform: translateX(-50%);
  min-width: 16rem;
  max-width: calc(100vw - 2rem);
  border: 1px solid #d7deea;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.14);
  padding: 0.35rem;
  z-index: 30;
  display: grid;
  gap: 0.2rem;
}
.cof-picker-dropdown.cof-hidden { display: none; }
.cof-picker-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  padding: 0.42rem 0.5rem;
  cursor: pointer;
  font-size: var(--fs-sm);
  color: #334155;
  width: 100%;
  text-align: left;
}
.cof-picker-item:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
}
.cof-picker-item.is-active {
  background: #f0fdf4;
  border-color: #84b9b0;
  font-weight: 700;
  color: #115e59;
}
.cof-preset-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.18rem;
  flex-shrink: 0;
}
.cof-preset-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.2);
  flex-shrink: 0;
}
.cof-preset-vals {
  font-weight: 700;
  color: #334155;
  white-space: nowrap;
}
.cof-picker-item.is-active .cof-preset-vals { color: #115e59; }
.cof-preset-label {
  font-size: var(--fs-xs);
  color: #64748b;
  white-space: nowrap;
  margin-left: auto;
}
.cof-picker-item.is-active .cof-preset-label { color: #115e59; }
.cof-picker-custom {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border: 0;
  border-top: 1px solid #eef2f7;
  border-radius: 0;
  background: transparent;
  padding: 0.42rem 0.5rem;
  cursor: pointer;
  font-size: var(--fs-sm);
  color: #64748b;
  width: 100%;
  text-align: left;
}
.cof-picker-custom:hover { color: #334155; }

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
  font-size: var(--fs-xs);
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
  font-size: var(--fs-base);
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
  font-size: var(--fs-md);
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
  font-size: var(--fs-lg);
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
  font-size: var(--fs-base);
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
  font-size: var(--fs-sm);
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
  font-size: var(--fs-sm);
  color: #64748b;
  font-weight: 700;
}
.cof-auto-btn {
  border: 1px solid #9ecbc4;
  background: #ecfdf5;
  color: #0f766e;
  border-radius: 999px;
  font-size: var(--fs-sm);
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
  font-size: var(--fs-sm);
  font-weight: 800;
  color: #1e3a5f;
}
.cof-tag {
  font-size: var(--fs-xs);
  border-radius: 999px;
  padding: 0.15rem 0.42rem;
  border: 1px solid transparent;
}
.cof-tag.good { color: #166534; background: #ecfdf3; border-color: #b9efcd; }
.cof-tag.warn { color: #92400e; background: #fffbeb; border-color: #f5dd9b; }
.cof-map {
  font-size: var(--fs-sm);
  color: #475569;
}

.cof-alert {
  border: 1px solid #fecdd3;
  background: var(--cof-danger-bg);
  color: var(--cof-danger);
  border-radius: 10px;
  padding: 0.5rem 0.56rem;
  font-size: var(--fs-sm);
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
  font-size: var(--fs-sm);
  font-weight: 700;
  cursor: pointer;
}

.cof-summary {
  font-size: var(--fs-sm);
  color: #334155;
  margin: 1rem 0 1.2rem;
}
.cof-dist-kicker {
  font-size: var(--fs-base);
  color: #334155;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
}
.cof-dist-kicker strong {
  font-weight: 700;
  color: #0f172a;
}
.cof-dist-blinds {
  font-size: var(--fs-sm);
  color: #475569;
  text-align: center;
  margin-top: 0.15rem;
}
.cof-stacks {
  margin-top: 0.7rem;
}
.cof-ref-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.9rem 1.2rem;
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
  font-size: var(--fs-base);
  font-weight: 700;
  color: var(--chip-text, #0f172a);
  letter-spacing: 0.01em;
}
.cof-ref-name {
  margin-top: 0.44rem;
  font-size: var(--fs-sm);
  color: #334155;
  font-weight: 700;
}
.cof-ref-mult {
  margin-top: 0.08rem;
  font-size: var(--fs-base);
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}
.cof-ref-eq {
  margin-top: 0.04rem;
  font-size: var(--fs-sm);
  font-weight: 600;
  color: #475569;
}
.cof-stack-total {
  margin-top: 0.78rem;
  border: 1px solid #9ecbc4;
  background: #f0fdf4;
  color: #115e59;
  border-radius: 10px;
  padding: 0.48rem 0.62rem;
  font-size: var(--fs-base);
  font-weight: 700;
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
  font-size: var(--fs-sm);
  padding: 0.34rem 0.48rem;
}
.cof-warning.red { border-color: #fecdd3; background: #fff1f2; color: #9f1239; }
.cof-warning.yellow { border-color: #fde68a; background: #fffbeb; color: #92400e; }
.cof-chips-only-pitch {
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #3730a3;
  border-radius: 8px;
  font-size: var(--fs-sm);
  padding: 0.34rem 0.48rem;
  line-height: 1.45;
}
.cof-chips-only-pitch strong { color: #312e81; }
.cof-chips-only-pitch a {
  color: #4338ca;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.12rem;
}
.cof-chips-only-pitch a:hover { color: #3730a3; }


.cof-form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid #eef2f7;
}
.cof-form-row:first-of-type { padding-top: 0; }
.cof-form-row:last-child { border-bottom: 0; padding-bottom: 0; }
.cof-form-label {
  font-size: var(--fs-sm);
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}
.cof-form-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cof-section { margin-bottom: 1.1rem; }
.cof-section:last-child { margin-bottom: 0; }

.cof-buy-hero {
  display: flex;
  align-items: center;
  gap: 0.35rem;
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
  font-size: var(--fs-md);
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cof-buy-step:active { background: #f0fdfa; }
.cof-buy-step:disabled { opacity: 0.35; cursor: default; }
.cof-dollar {
  font-size: var(--fs-lg);
  font-weight: var(--cof-number-weight);
  color: var(--cof-number-color);
  line-height: 1;
}
.cof-num-input {
  font-size: var(--fs-lg);
  font-weight: var(--cof-number-weight);
  color: var(--cof-number-color);
  background: transparent;
  border: none;
  border-bottom: 2px dashed var(--cof-number-underline);
  padding: 0 0 0.1rem 0;
  line-height: 1;
  outline: none;
  text-align: right;
}
.cof-num-input:focus {
  border-bottom-style: solid;
  border-bottom-color: var(--cof-accent);
}
.cof-buy-hero input:not(.cof-num-narrow) {
  width: 5rem;
}
.cof-num-narrow {
  width: 2.5rem;
  text-align: center;
}
.cof-depth {
  font-size: var(--fs-sm);
  color: var(--cof-sub);
  margin-top: 0.12rem;
}

.cof-section-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}
.cof-section-label {
  font-size: var(--fs-base);
  font-weight: 700;
  color: #334155;
  letter-spacing: 0.01em;
}
.cof-auto-check {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  font-size: var(--fs-sm);
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
  font-size: var(--fs-lg);
}
.cof-blinds-row input {
  width: 4rem;
}
.cof-blinds-sep {
  font-size: var(--fs-lg);
  color: #64748b;
  font-weight: 500;
  padding: 0 0.2rem;
}
.cof-stepper-lg { margin-top: 0.3rem; }
.cof-stepper-lg button {
  width: 2.5rem;
  height: 2.5rem;
  font-size: var(--fs-md);
}
.cof-stepper-lg > span {
  min-width: 2.8rem;
  line-height: 2.5rem;
  font-size: var(--fs-lg);
}

.cof-marked-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 0.65rem;
}
.cof-marked-switch-track {
  display: inline-flex;
  border: 1px solid #9ecbc4;
  border-radius: 999px;
  background: #ecfdf5;
  padding: 0.18rem;
  gap: 0;
}
.cof-marked-switch-track input { position: absolute; opacity: 0; width: 0; height: 0; }
.cof-marked-opt {
  padding: 0.32rem 0.72rem;
  border-radius: 999px;
  font-size: var(--fs-sm);
  font-weight: 700;
  color: #0f766e;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  user-select: none;
  white-space: nowrap;
  text-align: center;
}
.cof-marked-opt.is-active {
  background: #fff;
  color: #115e59;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
}

.cof-chip-columns.is-marked {
  grid-template-columns: 3.2rem 5.5rem minmax(0, 1fr) 2.05rem;
}
.cof-chip-row.is-marked {
  grid-template-columns: 3.2rem 5.5rem minmax(0, 1fr) 2.05rem;
}
.cof-chip-row.is-marked .cof-chip-mult { display: none; }
.cof-col-value { text-align: center; }
.cof-chip-value {
  display: flex;
  align-items: center;
  gap: 0.12rem;
}
.cof-chip-value .cof-dollar {
  font-size: var(--fs-sm);
  line-height: 1;
}
.cof-val-input {
  width: 3.5rem;
  font-size: var(--fs-sm);
  font-weight: var(--cof-number-weight);
  color: var(--cof-number-color);
  background: transparent;
  border: none;
  border-bottom: 2px dashed var(--cof-number-underline);
  padding: 0 0 0.1rem 0;
  line-height: 1;
  outline: none;
  text-align: right;
}
.cof-val-input:focus {
  border-bottom-style: solid;
  border-bottom-color: var(--cof-accent);
}

@media (max-width: 600px) {
  #cof-calc {
    padding: 0.65rem;
    overflow-x: hidden;
  }
  .cof-head { flex-wrap: wrap; }
  .cof-head-actions { width: 100%; }
  .cof-form-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
  .cof-chip-columns {
    grid-template-columns: 3.7rem minmax(0, 1fr) 1.9rem;
    gap: 0.25rem;
    padding: 0;
  }
  .cof-chip-columns.is-marked {
    grid-template-columns: 3.2rem 5.5rem minmax(0, 1fr) 1.9rem;
  }
  .cof-chip-row {
    grid-template-columns: 3.7rem minmax(0, 1fr) 1.9rem;
    gap: 0.25rem;
    padding: 0.25rem 0;
  }
  .cof-chip-row.is-marked {
    grid-template-columns: 3.2rem 5.5rem minmax(0, 1fr) 1.9rem;
  }
  .cof-chip-button {
    width: 1.9rem;
    height: 1.9rem;
  }
  .cof-chip-stepper button {
    width: 2rem;
    height: 2rem;
  }
  .cof-chip-stepper input {
    width: 3.1rem;
    padding: 0 0 0.08rem 0;
  }
  .cof-remove {
    width: 1.9rem;
    height: 1.9rem;
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
}
</style>

<div id="cof-calc">
  <div class="cof-head">
    <p class="cof-status" id="cof-status"></p>
    <div class="cof-head-actions">
      <!-- Debug: copies full internal state (inputs, chips, values, suggestions) as JSON to clipboard for troubleshooting -->
      <!-- <button type="button" class="cof-share cof-copy-state" id="cof-copy-state">Copy State</button> -->
      <button type="button" class="cof-share" id="cof-share">Copy Setup Link</button>
      <a href="#" class="cof-reset" id="cof-reset">Reset</a>
    </div>
  </div>
  <div class="cof-tabs">
    <button type="button" class="cof-tab is-active" data-tab="0">1. Game</button>
    <button type="button" class="cof-tab" data-tab="1">2. Chip Set</button>
    <button type="button" class="cof-tab" data-tab="2">3. Distribution</button>
  </div>
  <div class="cof-panel">
    <div class="cof-caption-bar">
      <button type="button" id="cof-prev" class="cof-caption-nav" aria-label="Previous step">&larr; Prev</button>
      <span class="cof-caption" id="cof-caption">Set buy-in, blinds, and player count</span>
      <button type="button" class="cof-share-img cof-hidden" id="cof-share-img"><span id="cof-share-icon"></span> Share</button>
      <button type="button" id="cof-next" class="cof-caption-nav" aria-label="Next step">Next &rarr;</button>
    </div>
    <section data-step="0">
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
    </section>
    <section data-step="1" class="cof-hidden">
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
    </section>
    <section data-step="2" class="cof-hidden">
      <div id="cof-dist-alert" class="cof-alert cof-hidden"></div>
      <div id="cof-summary" class="cof-summary"></div>
      <div id="cof-stacks" class="cof-stacks"></div>
      <div id="cof-warnings" class="cof-warnings"></div>
    </section>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
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

  var MARKED_PRESETS = {
    '200 · $1/$5/$10/$25': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 75, value: 1 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 50, value: 5 },
      { color: '#2563eb', border: '#1d4ed8', name: 'Blue', totalCount: 50, value: 10 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 25, value: 25 }
    ],
    '200 · $1/$5/$25/$100': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 75, value: 1 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 50, value: 5 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 50, value: 25 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 25, value: 100 }
    ],
    '300 · $1/$5/$25/$100': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 100, value: 1 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 100, value: 5 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 50, value: 25 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 50, value: 100 }
    ],
    '300 · $1/$5/$25/$50/$100/$500': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 100, value: 1 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 50, value: 5 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 50, value: 25 },
      { color: '#2563eb', border: '#1d4ed8', name: 'Blue', totalCount: 50, value: 50 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 25, value: 100 },
      { color: '#7c3aed', border: '#5b21b6', name: 'Purple', totalCount: 25, value: 500 }
    ],
    '500 · $1/$5/$10/$25/$100': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 150, value: 1 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 150, value: 5 },
      { color: '#2563eb', border: '#1d4ed8', name: 'Blue', totalCount: 100, value: 10 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 50, value: 25 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 50, value: 100 }
    ],
    '500 · $1/$5/$25/$100/$500': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 150, value: 1 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 150, value: 5 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 100, value: 25 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 50, value: 100 },
      { color: '#7c3aed', border: '#5b21b6', name: 'Purple', totalCount: 50, value: 500 }
    ],
    '500 · $1/$5/$25/$50/$100/$500/$1k': [
      { color: '#f3f4f6', border: '#d1d5db', name: 'White', totalCount: 100, value: 1 },
      { color: '#dc2626', border: '#991b1b', name: 'Red', totalCount: 100, value: 5 },
      { color: '#16a34a', border: '#15803d', name: 'Green', totalCount: 100, value: 25 },
      { color: '#2563eb', border: '#1d4ed8', name: 'Blue', totalCount: 50, value: 50 },
      { color: '#1f2937', border: '#111827', name: 'Black', totalCount: 50, value: 100 },
      { color: '#7c3aed', border: '#5b21b6', name: 'Purple', totalCount: 50, value: 500 },
      { color: '#eab308', border: '#a16207', name: 'Yellow', totalCount: 50, value: 1000 }
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
    suggestions: [],
    marked: false,
    markedValues: []
  };

  var els = {
    status: document.getElementById('cof-status'),
    copyState: document.getElementById('cof-copy-state'),
    share: document.getElementById('cof-share'),
    shareImg: document.getElementById('cof-share-img'),
    reset: document.getElementById('cof-reset'),
    tabs: Array.prototype.slice.call(document.querySelectorAll('.cof-tab')),
    sections: Array.prototype.slice.call(document.querySelectorAll('[data-step]')),
    prev: document.getElementById('cof-prev'),
    next: document.getElementById('cof-next'),
    caption: document.getElementById('cof-caption'),

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
    markedToggle: document.getElementById('cof-marked-toggle'),
    markedOpts: Array.prototype.slice.call(document.querySelectorAll('.cof-marked-opt')),
    chipColumns: document.getElementById('cof-chip-columns'),
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
        selectedValues: state.values ? state.values.map(function (v) { return round2(v); }) : null,
        marked: state.marked,
        markedValues: state.markedValues.slice()
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
    if (value < 10) return 1;
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
    if (state.marked) {
      qs.set('mk', '1');
      if (state.markedValues.length) {
        qs.set('mvals', state.markedValues.map(function (v) { return v === null || v === undefined ? '' : round2(v); }).join(','));
      }
    }
    history.replaceState(null, '', location.pathname + '?' + qs.toString());
  }

  function load() {
    var qs = new URLSearchParams(location.search);
    var bi = parseFloat(qs.get('bi'));
    if (isFinite(bi) && bi > 0) state.buyIn = Math.max(1, bi);

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

    if (qs.get('mk') === '1') {
      state.marked = true;
      var mvalsRaw = qs.get('mvals');
      if (mvalsRaw) {
        var mvParts = mvalsRaw.split(',');
        state.markedValues = [];
        for (var mvi = 0; mvi < state.chips.length; mvi++) {
          if (mvi < mvParts.length) {
            var mvn = parseFloat(mvParts[mvi]);
            state.markedValues.push(isFinite(mvn) && mvn > 0 ? round2(mvn) : null);
          } else {
            state.markedValues.push(null);
          }
        }
      } else {
        state.markedValues = state.chips.map(function () { return null; });
      }
    }

    var t = parseInt(qs.get('t'), 10);
    if (isFinite(t)) state.step = clamp(t, 0, 2);

    if (qs.get('shared') === '1') {
      state.step = 2;
      requestAnimationFrame(function () {
        var target = document.getElementById('calculator');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
      // Strip shared param from URL so it doesn't persist on further navigation
      var clean = new URLSearchParams(location.search);
      clean.delete('shared');
      history.replaceState(null, '', location.pathname + '?' + clean.toString());
    }
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

    if (state.marked) {
      state.suggestions = [];
      var allFilled = state.markedValues.length === state.chips.length;
      if (allFilled) {
        for (var mi = 0; mi < state.markedValues.length; mi++) {
          if (state.markedValues[mi] === null || state.markedValues[mi] === undefined || state.markedValues[mi] <= 0) {
            allFilled = false;
            break;
          }
        }
      }
      state.values = allFilled ? state.markedValues.slice() : null;
    } else {
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

  var CAPTIONS = [
    'Set buy-in, blinds, and player count',
    'Configure chip colors and counts',
    'Recommended denominations and distribution'
  ];

  function renderTabs() {
    els.tabs.forEach(function (tab) {
      var idx = parseInt(tab.getAttribute('data-tab'), 10);
      tab.classList.toggle('is-active', idx === state.step);
    });
    els.sections.forEach(function (section) {
      var idx = parseInt(section.getAttribute('data-step'), 10);
      section.classList.toggle('cof-hidden', idx !== state.step);
    });

    els.caption.textContent = CAPTIONS[state.step];
    els.prev.disabled = state.step === 0;
    els.next.disabled = state.step === 2;
    els.shareImg.classList.toggle('cof-hidden', state.step !== 2);
  }

  function renderGame() {
    if (document.activeElement !== els.buyInput) {
      els.buyInput.value = String(round2(state.buyIn));
    }
    els.depthLabel.textContent = round2(state.buyIn / state.bb) + ' BB deep at ' + fmt(state.sb) + '/' + fmt(state.bb);
    els.buyMinus.disabled = state.buyIn <= 1;

    els.autoBlinds.checked = state.autoBlinds;
    if (document.activeElement !== els.sb) {
      els.sb.value = String(round2(state.sb));
    }
    if (document.activeElement !== els.bb) {
      els.bb.value = String(round2(state.bb));
    }

    els.playerCount.value = state.players;
    els.playerMinus.disabled = state.players <= 2;
    els.playerPlus.disabled = state.players >= 10;
  }

  function renderChipTabAlert() {
    els.chipAlert.classList.add('cof-hidden');
    els.markedToggle.checked = state.marked;
    els.markedOpts.forEach(function (opt) {
      var isMarked = opt.getAttribute('data-val') === '1';
      opt.classList.toggle('is-active', isMarked === state.marked);
    });
  }

  function markedPresetMatch() {
    var names = Object.keys(MARKED_PRESETS);
    for (var i = 0; i < names.length; i++) {
      var p = MARKED_PRESETS[names[i]];
      if (p.length !== state.chips.length) continue;
      var ok = true;
      for (var j = 0; j < p.length; j++) {
        if (p[j].color.toLowerCase() !== state.chips[j].color.toLowerCase() ||
            parseInt(p[j].totalCount, 10) !== parseInt(state.chips[j].totalCount, 10) ||
            p[j].value !== state.markedValues[j]) {
          ok = false;
          break;
        }
      }
      if (ok) return names[i];
    }
    return null;
  }

  function markedPresetLabel(preset) {
    return '$' + preset.map(function (c) {
      var v = c.value;
      if (v >= 1000) return (v / 1000) + 'k';
      return String(v);
    }).join('/');
  }

  function markedPresetTotal(preset) {
    var t = 0;
    preset.forEach(function (c) { t += c.totalCount; });
    return t;
  }

  function buildPresetDots(preset) {
    var dots = document.createElement('span');
    dots.className = 'cof-preset-dots';
    preset.forEach(function (c) {
      var dot = document.createElement('span');
      dot.className = 'cof-preset-dot';
      dot.style.background = c.color;
      dots.appendChild(dot);
    });
    return dots;
  }

  function renderPresets() {
    els.presets.innerHTML = '';
    els.presets.className = state.marked ? 'cof-presets-picker' : 'cof-presets';
    if (state.marked) {
      var active = markedPresetMatch();
      var activePreset = active ? MARKED_PRESETS[active] : null;

      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'cof-picker-trigger' + (activePreset ? ' has-selection' : '');
      if (activePreset) {
        trigger.appendChild(buildPresetDots(activePreset));
        var trigLabel = document.createElement('span');
        trigLabel.textContent = markedPresetLabel(activePreset) + '  \u00b7  ' + markedPresetTotal(activePreset) + ' pcs';
        trigger.appendChild(trigLabel);
      } else {
        trigger.textContent = 'Choose a chip set';
      }
      var caret = document.createElement('span');
      caret.className = 'cof-picker-caret';
      caret.textContent = '\u25BE';
      trigger.appendChild(caret);
      els.presets.appendChild(trigger);

      var dropdown = document.createElement('div');
      dropdown.className = 'cof-picker-dropdown cof-hidden';

      Object.keys(MARKED_PRESETS).forEach(function (name) {
        var preset = MARKED_PRESETS[name];
        var item = document.createElement('button');
        item.type = 'button';
        item.className = 'cof-picker-item' + (active === name ? ' is-active' : '');
        item.appendChild(buildPresetDots(preset));

        var vals = document.createElement('span');
        vals.className = 'cof-preset-vals';
        vals.textContent = markedPresetLabel(preset);
        item.appendChild(vals);

        var count = document.createElement('span');
        count.className = 'cof-preset-label';
        count.textContent = markedPresetTotal(preset) + ' pcs';
        item.appendChild(count);

        item.addEventListener('click', function (ev) {
          ev.stopPropagation();
          state.chips = cloneChips(preset);
          state.markedValues = preset.map(function (c) { return c.value; });
          state.values = null;
          dropdown.classList.add('cof-hidden');
          recompute();
        });
        dropdown.appendChild(item);
      });

      var custom = document.createElement('button');
      custom.type = 'button';
      custom.className = 'cof-picker-custom';
      custom.textContent = 'None of these \u2014 enter custom values';
      custom.addEventListener('click', function (ev) {
        ev.stopPropagation();
        dropdown.classList.add('cof-hidden');
      });
      dropdown.appendChild(custom);
      els.presets.appendChild(dropdown);

      trigger.addEventListener('click', function (ev) {
        ev.stopPropagation();
        dropdown.classList.toggle('cof-hidden');
      });
    } else {
      var active = presetMatch();
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
  }

  function closeChipColorMenus() {
    var menus = els.chipList.querySelectorAll('.cof-color-menu');
    Array.prototype.forEach.call(menus, function (menu) {
      menu.classList.add('cof-hidden');
    });
  }

  function renderChipRows() {
    els.chipList.innerHTML = '';

    var valueHeader = els.chipColumns.querySelector('.cof-col-value');
    if (state.marked) {
      els.chipColumns.classList.add('is-marked');
      if (valueHeader) valueHeader.classList.remove('cof-hidden');
    } else {
      els.chipColumns.classList.remove('is-marked');
      if (valueHeader) valueHeader.classList.add('cof-hidden');
    }

    state.chips.forEach(function (chip, idx) {
      var row = document.createElement('div');
      row.className = 'cof-chip-row' + (state.marked ? ' is-marked' : '');

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

      if (state.marked) {
        var valWrap = document.createElement('div');
        valWrap.className = 'cof-chip-value';
        var valDollar = document.createElement('span');
        valDollar.className = 'cof-dollar';
        valDollar.textContent = '$';
        valWrap.appendChild(valDollar);
        var valInput = document.createElement('input');
        valInput.type = 'number';
        valInput.min = '0.01';
        valInput.step = 'any';
        valInput.className = 'cof-val-input';
        valInput.setAttribute('aria-label', 'Denomination value for ' + chip.name);
        var curVal = state.markedValues[idx];
        if (curVal !== null && curVal !== undefined && curVal > 0) {
          valInput.value = String(curVal);
        } else {
          valInput.value = '';
        }
        valInput.addEventListener('change', (function (i) {
          return function () {
            var n = parseFloat(this.value);
            if (!isFinite(n) || n <= 0) {
              state.markedValues[i] = null;
              this.value = '';
            } else {
              state.markedValues[i] = round2(n);
              this.value = String(round2(n));
            }
            recompute();
          };
        })(idx));
        valWrap.appendChild(valInput);
        row.appendChild(valWrap);
      }

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
      function commitCountInput() {
        var n = parseInt(countInput.value, 10);
        if (!isFinite(n) || n <= 0) {
          countInput.value = String(state.chips[idx].totalCount);
          return;
        }
        if (n === parseInt(state.chips[idx].totalCount, 10)) return;
        state.chips[idx].totalCount = n;
        recompute();
      }
      countInput.addEventListener('change', commitCountInput);
      countInput.addEventListener('blur', commitCountInput);
      countInput.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter') return;
        ev.preventDefault();
        commitCountInput();
        countInput.blur();
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
        if (state.marked && state.markedValues.length > idx) state.markedValues.splice(idx, 1);
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

    if (state.marked && (!state.values || state.values.length !== state.chips.length)) {
      els.distAlert.classList.remove('cof-hidden');
      els.distAlert.innerHTML = 'Enter a denomination value for every chip color.';
      return;
    }

    if (!state.values || state.values.length !== state.chips.length) return;

    var denoms = buildDenoms(state.values);
    var result = ChipDistribution.distribute(state.buyIn, denoms, state.players);
    var total = getTotalValue(result.chips);
    var count = getTotalCount(result.chips);

    if (state.marked) {
      var shortfall = round2(state.buyIn - total);
      if (shortfall > 0.001) {
        var denomList = state.chips.map(function (c, i) {
          return c.name + ' ($' + state.values[i] + ')';
        }).join(', ');
        els.distAlert.classList.remove('cof-hidden');
        els.distAlert.innerHTML = '<strong>Cannot distribute $' + state.buyIn + '</strong> with these chip denominations. ' +
          'Your chips (' + denomList + ') cannot produce a $' + state.buyIn + ' buy-in for ' + state.players +
          ' players with the available chip counts. Try adjusting the buy-in, player count, or chip quantities.' +
          '<div class="cof-chips-only-pitch" style="margin-top:0.5rem"><strong>Don\u2019t have enough chips?</strong> Use <a href="/virtual-poker-chips/">Chips Only Mode</a> in Chips of Fury to replace physical chips entirely \u2014 play with real cards while your phone tracks chips and pots.</div>';
        return;
      }
    }

    els.summary.innerHTML =
      '<div class="cof-dist-kicker">Each player gets <strong>' + count + ' chips</strong> worth <strong>' + fmt(total) +
      '</strong></div><div class="cof-dist-blinds">SB/BB ' + fmt(state.sb) + '/' + fmt(state.bb) + '</div>';

    var blindWarnings = ChipDistribution.checkBlindWarnings(state.sb, denoms);
    if (blindWarnings.length) {
      els.distAlert.classList.remove('cof-hidden');
      els.distAlert.innerHTML = '<strong>Important:</strong> ' + blindWarnings[0].message;
    }

    var allWarnings = result.warnings;
    allWarnings.forEach(function (w) {
      var div = document.createElement('div');
      div.className = 'cof-warning ' + (w.severity === 'red' ? 'red' : 'yellow');
      div.textContent = w.message;
      els.warnings.appendChild(div);
    });

    var hasChipIssue = allWarnings.some(function (w) {
      return w.type === 'impossible' || w.type === 'few_chips';
    });
    if (hasChipIssue) {
      var pitch = document.createElement('div');
      pitch.className = 'cof-chips-only-pitch';
      pitch.innerHTML = '<strong>Don\u2019t have enough chips?</strong> Use <a href="/virtual-poker-chips/">Chips Only Mode</a> in Chips of Fury to replace physical chips entirely \u2014 play with real cards while your phone tracks chips and pots.';
      els.warnings.appendChild(pitch);
    }

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
      tokenValue.textContent = fmt(v).replace('$', '');
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
    els.status.textContent = '';
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
      state.buyIn = Math.max(1, round2(state.buyIn - step));
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
      state.buyIn = Math.max(1, n);
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
    els.playerCount.addEventListener('input', function () {
      var n = parseInt(this.value, 10);
      if (!isFinite(n) || n < 2 || n > 10) return;
      state.players = n;
      recompute();
    });

    els.addChip.addEventListener('click', function () {
      if (state.chips.length >= 8) return;
      var used = state.chips.map(function (c) { return c.color.toLowerCase(); });
      var next = COLORS.find(function (c) { return used.indexOf(c.color.toLowerCase()) === -1; }) || COLORS[0];
      state.chips.push({ color: next.color, border: next.border, name: next.name, totalCount: 50 });
      if (state.marked) state.markedValues.push(null);
      state.values = null;
      recompute();
    });

    els.markedOpts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        var newMarked = opt.getAttribute('data-val') === '1';
        if (newMarked === state.marked) return;
        state.marked = newMarked;
        els.markedToggle.checked = newMarked;
        if (state.marked && state.markedValues.length !== state.chips.length) {
          state.markedValues = state.chips.map(function (c, i) {
            return state.markedValues[i] !== undefined ? state.markedValues[i] : null;
          });
        }
        state.values = null;
        recompute();
      });
    });

    document.addEventListener('click', function () {
      closeChipColorMenus();
      var dd = els.presets.querySelector('.cof-picker-dropdown');
      if (dd) dd.classList.add('cof-hidden');
    });

    els.shareImg.addEventListener('click', function () {
      var section = document.querySelector('[data-step="2"]');
      if (!section || section.classList.contains('cof-hidden')) {
        els.status.textContent = 'Go to the Distribution tab first.';
        return;
      }
      els.status.textContent = 'Capturing...';
      html2canvas(section, { backgroundColor: '#ffffff', scale: 2 }).then(function (canvas) {
        canvas.toBlob(function (blob) {
          var file = new File([blob], 'chip-distribution.png', { type: 'image/png' });
          var shareData = {
            files: [file],
            title: 'Poker Chip Distribution',
            text: 'Chip breakdown for $' + state.buyIn + ' buy-in, ' + state.players + ' players'
          };
          var canTryShare = navigator.share && (navigator.canShare ? navigator.canShare(shareData) : true);
          if (canTryShare) {
            navigator.share(shareData).then(function () {
              els.status.textContent = 'Shared!';
            }).catch(function (err) {
              if (err.name === 'AbortError') return;
              // Share failed (e.g. not secure context), fall back to download
              var link = document.createElement('a');
              link.download = 'chip-distribution.png';
              link.href = URL.createObjectURL(blob);
              link.click();
              URL.revokeObjectURL(link.href);
              els.status.textContent = 'Image downloaded.';
            });
          } else {
            var link = document.createElement('a');
            link.download = 'chip-distribution.png';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
            els.status.textContent = 'Image downloaded.';
          }
        }, 'image/png');
      }).catch(function () {
        els.status.textContent = 'Could not capture screenshot.';
      });
    });

    els.share.addEventListener('click', function () {
      var shareUrl = new URL(location.href);
      shareUrl.searchParams.set('t', '2');
      shareUrl.searchParams.set('shared', '1');
      var url = shareUrl.toString();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          els.status.textContent = 'Link copied.';
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

  // Platform-aware share icon: iOS/Mac get the "share-up" icon, others get the Android-style share
  var isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
  document.getElementById('cof-share-icon').innerHTML = isApple
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

  load();
  bind();
  recompute();
})();
</script>

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
