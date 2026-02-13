---
title: "Free Poker Pre-Game Checklist Generator | Chips of Fury"
date: 2026-02-12
description: "Generate a shareable poker night checklist in seconds. Set stakes, buy-in, rebuys, house rules, and logistics — then copy-paste it into your group chat."
ogImage: "https://chipsoffury.com/images/chip-distribution-calculator-og.webp"
---

<style>
/* ═══ Landing Page Hero (shared pattern with chip calculator) ═══ */
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
.cof-lp-hero-inner > :nth-child(5) { animation-delay: 0.32s; }
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

/* ═══ Tool Section ═══ */
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

@media (max-width: 600px) {
  .cof-lp-hero { padding: 3.5rem 1.2rem 3rem; }
  .cof-lp-tool { padding: 2.5rem 0.65rem 3rem; }
}
@media (prefers-reduced-motion: reduce) {
  .cof-lp-hero-inner > * { animation: none; opacity: 1; }
}

/* ═══ Checklist Tool ═══ */
#cof-checklist {
  --cof-ink: #0f172a;
  --cof-sub: #475569;
  --cof-muted: #64748b;
  --cof-light: #94a3b8;
  --cof-border: #d7deea;
  --cof-border-light: #eef2f7;
  --cof-accent: #0f766e;
  --cof-accent-soft: #ecfdf5;
  --cof-accent-hover: #0d6357;
  --cof-danger: #dc2626;
  --cof-danger-soft: #fff1f2;
  max-width: 64rem;
  margin: 0 auto;
  font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
  font-variant-numeric: tabular-nums;
  color: var(--cof-ink);
}
#cof-checklist *, #cof-checklist *::before, #cof-checklist *::after { box-sizing: border-box; }
#cof-checklist input, #cof-checklist button, #cof-checklist select, #cof-checklist textarea { font-family: inherit; }
#cof-checklist input[type="number"] { -moz-appearance: textfield; }
#cof-checklist input::-webkit-inner-spin-button,
#cof-checklist input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

/* Layout: form + sidebar */
.cof-cl-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 22rem;
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 1023px) {
  .cof-cl-layout { grid-template-columns: 1fr; }
}
@media (min-width: 1280px) {
  .cof-cl-layout { grid-template-columns: minmax(0, 1fr) 24rem; }
}

/* ═══ Shared Link Banner ═══ */
.cof-cl-shared-banner {
  background: #ede9fe;
  border: 1px solid #c4b5fd;
  border-radius: 10px;
  padding: 0.65rem 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #5b21b6;
}
.cof-cl-shared-banner svg { width: 1rem; height: 1rem; color: #7c3aed; flex-shrink: 0; }
.cof-cl-shared-banner span { flex: 1; }
.cof-cl-shared-banner button {
  width: 1.25rem; height: 1.25rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: #7c3aed;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1;
  display: flex; align-items: center; justify-content: center;
}
.cof-cl-shared-banner button:hover { background: rgba(124,58,237,0.1); }

/* ═══ Format Selector ═══ */
.cof-cl-format-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.cof-cl-format {
  display: inline-flex;
  border-radius: 12px;
  border: 1px solid #d7deea;
  background: #f8fafc;
  padding: 4px;
}
.cof-cl-format-btn {
  border: 1px solid transparent;
  background: transparent;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
}
.cof-cl-format-btn:hover:not(.is-active) { background: #f1f5f9; }
.cof-cl-format-btn.is-active {
  background: #fff;
  color: #0f172a;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(15,23,42,0.1);
  border-color: #d7deea;
}
@media (max-width: 639px) {
  .cof-cl-format { width: 100%; }
  .cof-cl-format-btn { flex: 1; font-size: 0.8rem; padding: 0.4rem 0.5rem; }
}

/* ═══ Accordion ═══ */
.cof-cl-section {
  border: 1px solid #dbe4f0;
  border-radius: 12px;
  background: #fff;
  margin-bottom: 0.75rem;
  overflow: hidden;
}
.cof-cl-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  gap: 0.5rem;
}
.cof-cl-section-header:hover { background: #fafbfc; }
.cof-cl-section-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
  flex: 1;
}
.cof-cl-section-num {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 999px;
  border: 1.5px solid rgba(15,118,110,0.3);
  color: #0f766e;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cof-cl-section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
}
.cof-cl-section-summary {
  font-size: 0.8rem;
  color: #64748b;
  margin-left: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity 0.15s ease;
}
.cof-cl-section-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}
.cof-cl-check {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 999px;
  background: #ecfdf5;
  color: #0f766e;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
}
.cof-cl-check.is-visible { display: flex; }
.cof-cl-chevron {
  width: 1rem;
  height: 1rem;
  color: #94a3b8;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.cof-cl-section.is-expanded .cof-cl-chevron { transform: rotate(180deg); }
.cof-cl-section.is-expanded .cof-cl-section-summary { opacity: 0; }
.cof-cl-section-body {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0 1rem;
  transition: max-height 0.3s ease, opacity 0.2s ease, padding 0.3s ease;
}
.cof-cl-section.is-expanded .cof-cl-section-body {
  max-height: 1200px;
  opacity: 1;
  padding: 0 1rem 1rem;
}

/* ═══ Form Fields ═══ */
.cof-cl-field {
  display: grid;
  gap: 0.2rem;
  margin-bottom: 0.65rem;
}
.cof-cl-field label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 700;
}
.cof-cl-field input[type="text"],
.cof-cl-field input[type="number"],
.cof-cl-field input[type="date"],
.cof-cl-field input[type="time"],
.cof-cl-field select,
.cof-cl-field textarea {
  border: 1px solid #d7deea;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  padding: 0.5rem 0.6rem;
  font-size: 1rem;
  width: 100%;
}
.cof-cl-field input:focus,
.cof-cl-field select:focus,
.cof-cl-field textarea:focus {
  outline: none;
  border-color: #0f766e;
  box-shadow: 0 0 0 3px rgba(15,118,110,0.1);
}
.cof-cl-field textarea {
  min-height: 4rem;
  resize: vertical;
  max-height: 8rem;
}
.cof-cl-field select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  padding-right: 2rem;
}
.cof-cl-helper {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.1rem;
}
.cof-cl-error {
  font-size: 0.8rem;
  color: #dc2626;
  margin-top: 0.2rem;
  display: none;
}
.cof-cl-error.is-visible { display: block; }
.cof-cl-currency-wrap {
  position: relative;
}
.cof-cl-currency-wrap::before {
  content: '$';
  position: absolute;
  left: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1rem;
  pointer-events: none;
  z-index: 1;
}
.cof-cl-currency-wrap input[type="number"] {
  padding-left: 1.8rem;
}

/* ═══ Stepper (±) Controls ═══ */
.cof-cl-stepper {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.cof-cl-stepper .cof-cl-currency-wrap {
  flex: 1;
}
.cof-cl-step-btn {
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid #d7deea;
  border-radius: 0.5rem;
  background: #f8fafc;
  color: #334155;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.cof-cl-step-btn:active { background: #f0fdfa; }
.cof-cl-step-btn:disabled { opacity: 0.35; cursor: default; }

/* ═══ Auto-calculate Checkbox ═══ */
.cof-cl-auto-check {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  color: #475569;
  user-select: none;
  margin-top: 0.35rem;
}
.cof-cl-auto-check input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.cof-cl-checkmark {
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid #d7deea;
  border-radius: 0.25rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
}
.cof-cl-auto-check input:checked + .cof-cl-checkmark {
  background: #0f766e;
  border-color: #0f766e;
}
.cof-cl-checkmark::after {
  content: '';
  width: 0.3rem;
  height: 0.55rem;
  border: solid transparent;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-top: -2px;
}
.cof-cl-auto-check input:checked + .cof-cl-checkmark::after {
  border-color: #fff;
}

/* ═══ Auto-derived Field Dimming ═══ */
.cof-cl-field.is-auto-derived label {
  opacity: 0.55;
}
.cof-cl-field.is-auto-derived input,
.cof-cl-field.is-auto-derived select {
  background: #f1f5f9;
  color: #94a3b8;
}

.cof-cl-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}
@media (max-width: 479px) {
  .cof-cl-grid-2 { grid-template-columns: 1fr; }
}

/* ═══ Toggle Switch ═══ */
.cof-cl-toggle-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}
.cof-cl-toggle {
  position: relative;
  width: 2.5rem;
  height: 1.4rem;
  border-radius: 999px;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.2s ease;
}
.cof-cl-toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0.15rem;
  transform: translateY(-50%);
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  transition: transform 0.2s ease;
}
.cof-cl-toggle[aria-checked="true"] {
  background: #0f766e;
}
.cof-cl-toggle[aria-checked="true"]::after {
  transform: translateY(-50%) translateX(1.1rem);
}
.cof-cl-toggle:focus-visible {
  box-shadow: 0 0 0 3px rgba(15,118,110,0.2);
}
.cof-cl-toggle-label {
  font-size: 0.875rem;
  color: #334155;
  font-weight: 600;
}

/* ═══ Multi-Select Chips (payment) ═══ */
.cof-cl-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.cof-cl-chip {
  border: 1px solid #d7deea;
  background: #f8fafc;
  color: #475569;
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.cof-cl-chip:hover { background: #f1f5f9; }
.cof-cl-chip.is-selected {
  border-color: #0f766e;
  background: #ecfdf5;
  color: #0f766e;
  font-weight: 700;
}
.cof-cl-chip.is-selected:hover { background: #d1fae5; }

/* ═══ Custom Rules ═══ */
.cof-cl-custom-rules { display: grid; gap: 0.4rem; }
.cof-cl-custom-rule-row {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}
.cof-cl-custom-rule-row input { flex: 1; }
.cof-cl-remove-btn {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  border: 1px solid #fed7aa;
  background: #fff;
  color: #c2410c;
  font-size: 0.875rem;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cof-cl-remove-btn:hover { border-color: #fdba74; }
.cof-cl-add-btn {
  width: 100%;
  border: 1px dashed #bac8dd;
  border-radius: 10px;
  background: #f8fbff;
  color: #334155;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.55rem 0.5rem;
  cursor: pointer;
  margin-top: 0.3rem;
}
.cof-cl-add-btn:hover { background: #f1f5f9; }

/* ═══ House Rules Grid ═══ */
.cof-cl-rules-grid {
  display: grid;
  gap: 0.35rem;
}
.cof-cl-rule-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

/* ═══ Output Panel — Desktop Sidebar ═══ */
.cof-cl-output {
  position: sticky;
  top: 1.5rem;
  align-self: start;
  border: 1px solid #dbe4f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(15,23,42,0.06);
  overflow: hidden;
}
@media (max-width: 1023px) {
  .cof-cl-output { display: none; }
}
.cof-cl-output-header {
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eef2f7;
}
.cof-cl-output-header h3 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  margin: 0;
}
.cof-cl-output-header p {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0.1rem 0 0;
}
.cof-cl-output-preview {
  padding: 1rem;
  max-height: calc(100vh - 16rem);
  overflow-y: auto;
}
.cof-cl-preview-text {
  font-family: "SF Mono", "Cascadia Code", "Consolas", monospace;
  font-size: 0.8rem;
  color: #1e293b;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  min-height: 6rem;
}
.cof-cl-empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
  font-style: italic;
}
.cof-cl-output-actions {
  padding: 0.75rem 1rem;
  border-top: 1px solid #eef2f7;
  display: grid;
  gap: 0.5rem;
}
.cof-cl-btn-copy {
  width: 100%;
  background: #0f766e;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.6rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: background 0.15s;
}
.cof-cl-btn-copy:hover { background: #0d6357; }
.cof-cl-btn-copy.is-success { background: #166534; }
.cof-cl-btn-secondary {
  width: 100%;
  background: #fff;
  color: #334155;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.5rem;
  border: 1px solid #d7deea;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.15s;
}
.cof-cl-btn-secondary:hover { background: #f8fafc; }
.cof-cl-btn-secondary.is-success {
  border-color: #7c3aed;
  background: #ede9fe;
  color: #5b21b6;
}

/* ═══ Mobile Bottom Bar ═══ */
.cof-cl-bottom-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #fff;
  border-top: 1px solid #dbe4f0;
  box-shadow: 0 -4px 16px rgba(15,23,42,0.08);
  padding: 0.75rem 1rem;
}
@media (max-width: 1023px) {
  .cof-cl-bottom-bar { display: flex; gap: 0.5rem; align-items: center; }
  .cof-cl-form-area { padding-bottom: 5rem; }
}
.cof-cl-bar-preview-btn {
  flex-shrink: 0;
  border: 1px solid #d7deea;
  background: #f8fafc;
  color: #475569;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}
.cof-cl-bar-copy-btn {
  flex: 1;
  background: #0f766e;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.6rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}
.cof-cl-bar-copy-btn:hover { background: #0d6357; }
.cof-cl-bar-copy-btn.is-success { background: #166534; }
.cof-cl-bar-share-btn {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #d7deea;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
}
.cof-cl-bar-share-btn.is-success {
  border-color: #7c3aed;
  background: #ede9fe;
  color: #5b21b6;
}

/* ═══ Mobile Bottom Sheet ═══ */
.cof-cl-sheet-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 51;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.cof-cl-sheet-backdrop.is-open { opacity: 1; pointer-events: auto; }
.cof-cl-sheet {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 52;
  background: #fff;
  border-radius: 16px 16px 0 0;
  max-height: 60vh;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  overflow: hidden;
  pointer-events: none;
}
.cof-cl-sheet.is-open { transform: translateY(0); pointer-events: auto; }
@media (max-width: 1023px) {
  .cof-cl-sheet-backdrop, .cof-cl-sheet { display: block; }
}
@media (min-width: 1024px) {
  .cof-cl-sheet-backdrop, .cof-cl-sheet { display: none !important; }
}
.cof-cl-sheet-handle {
  width: 2rem;
  height: 0.25rem;
  border-radius: 999px;
  background: #d1d5db;
  margin: 0.5rem auto;
}
.cof-cl-sheet-content {
  padding: 0 1rem 5rem;
  overflow-y: auto;
  max-height: calc(60vh - 2rem);
}

/* ═══ Toast ═══ */
.cof-cl-toast {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  z-index: 100;
  background: #0f766e;
  color: #fff;
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(15,23,42,0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.cof-cl-toast.is-visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ═══ URL Length Warning ═══ */
.cof-cl-url-warning {
  background: #fffbeb;
  border: 1px solid #f5dd9b;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #92400e;
  display: none;
}
.cof-cl-url-warning.is-visible { display: block; }

/* ═══ Hidden utility ═══ */
.cof-cl-hidden { display: none !important; }

/* ═══ Print Styles ═══ */
@media print {
  .cof-lp-hero, .cof-cl-format-wrap, .cof-cl-form-area,
  .cof-cl-output-actions, .cof-cl-bottom-bar, .cof-cl-sheet,
  .cof-cl-sheet-backdrop, .cof-cl-shared-banner, .cof-cl-toast,
  nav, footer, header, .site-navigation { display: none !important; }
  .cof-lp-tool { background: #fff !important; padding: 1rem !important; }
  #cof-checklist { max-width: 100% !important; }
  .cof-cl-layout { display: block !important; }
  .cof-cl-output {
    display: block !important;
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    border: none !important;
    box-shadow: none !important;
  }
  .cof-cl-output-header { display: none !important; }
  .cof-cl-output-preview { max-height: none !important; }
  .cof-cl-preview-text {
    font-size: 11pt;
    color: #000;
    line-height: 1.6;
    background: #fff !important;
  }
  .cof-cl-output::after {
    content: "Generated at chipsoffury.com/pre-game-checklist";
    display: block;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    font-size: 9pt;
    color: #999;
    text-align: center;
  }
}
</style>

<section class="cof-lp-hero">
  <div class="cof-lp-deco cof-lp-deco--1" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--2" aria-hidden="true"></div>
  <div class="cof-lp-deco cof-lp-deco--3" aria-hidden="true"></div>
  <div class="cof-lp-hero-inner">
    <div class="cof-lp-eyebrow">Free Tool</div>
    <h1 class="cof-lp-h1">Pre-Game Checklist Generator</h1>
    <ol class="cof-lp-steps-list">
      <li><span class="cof-lp-step-num">1</span><span><strong>Pick your format</strong> — cash game, tournament, or bounty</span></li>
      <li><span class="cof-lp-step-num">2</span><span><strong>Fill in the details</strong> — stakes, rebuys, house rules, logistics</span></li>
      <li><span class="cof-lp-step-num">3</span><span><strong>Copy and share</strong> — paste into your group chat</span></li>
    </ol>
    <p class="cof-lp-note">The URL saves your setup so you can reuse it next session.</p>
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
    <button type="button" class="cof-cl-format-btn" role="radio" aria-checked="false" data-format="bounty">Bounty</button>
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
    <!-- Tournament/Bounty fields -->
    <div data-show="tournament bounty">
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
    <div data-show="bounty">
      <div class="cof-cl-field">
        <label for="cof-bounty-amt">Bounty amount</label>
        <div class="cof-cl-currency-wrap">
          <input type="number" id="cof-bounty-amt" value="10" min="1" step="1" placeholder="10" aria-describedby="err-bounty">
        </div>
        <div class="cof-cl-error" id="err-bounty">Bounty must be less than the total buy-in.</div>
      </div>
    </div>
    <div data-show="tournament bounty">
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
    <div class="cof-cl-toggle-row">
      <button type="button" class="cof-cl-toggle" role="switch" aria-checked="true" id="cof-rebuys-on" aria-label="Rebuys allowed"></button>
      <span class="cof-cl-toggle-label">Rebuys allowed</span>
    </div>
    <div id="cof-rebuys-fields">
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
      <div class="cof-cl-field" data-show="cash" id="cof-rebuys-condition-wrap">
        <label for="cof-rebuys-condition">Rebuy condition</label>
        <select id="cof-rebuys-condition">
          <option value="below_min" selected>Below minimum buy-in</option>
          <option value="anytime">Any amount</option>
          <option value="felted">Only when stacked (felted)</option>
        </select>
      </div>
      <!-- Tournament/Bounty add-on -->
      <div data-show="tournament bounty" id="cof-addon-section">
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
        <option value="before_leave" selected>Settle before you leave (recommended)</option>
        <option value="same_night">Settle by end of night</option>
        <option value="next_day">Settle by next day</option>
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
        <label for="cof-last-buyin-time">Last buy-in time</label>
        <input type="time" id="cof-last-buyin-time" value="21:00">
      </div>
      <div class="cof-cl-field">
        <label for="cof-hard-stop">Hard stop time</label>
        <input type="time" id="cof-hard-stop" value="00:00">
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
    <p>What your group chat will see</p>
  </div>
  <div class="cof-cl-output-preview">
    <div class="cof-cl-preview-text" id="cof-preview-desktop"></div>
  </div>
  <div class="cof-cl-output-actions">
    <button type="button" class="cof-cl-btn-copy" id="cof-copy-desktop">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      Copy to clipboard
    </button>
    <button type="button" class="cof-cl-btn-secondary" id="cof-share-desktop">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      Share link
    </button>
    <button type="button" class="cof-cl-btn-secondary" id="cof-print-btn" onclick="window.print()">
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
  <button type="button" class="cof-cl-bar-copy-btn" id="cof-copy-mobile">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
    Copy
  </button>
  <button type="button" class="cof-cl-bar-share-btn" id="cof-share-mobile" aria-label="Share link">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
  </button>
</div>

<!-- Mobile bottom sheet -->
<div class="cof-cl-sheet-backdrop" id="cof-sheet-backdrop"></div>
<div class="cof-cl-sheet" id="cof-sheet">
  <div class="cof-cl-sheet-handle"></div>
  <div class="cof-cl-sheet-content">
    <div class="cof-cl-preview-text" id="cof-preview-mobile"></div>
  </div>
</div>

<!-- Toast -->
<div class="cof-cl-toast" id="cof-toast" aria-live="polite"></div>

</section>

<script>
(function() {
  'use strict';

  // ═══ Constants ═══
  var PRESET_RULES = [
    { id: 'verbal_binding', label: 'Verbal bets are binding', defaultOn: true, formats: 'all' },
    { id: 'no_string_bets', label: 'No string betting \u2014 announce or one motion', defaultOn: true, formats: 'all' },
    { id: 'one_chip_call', label: 'Single chip without declaration = call', defaultOn: false, formats: 'all' },
    { id: 'table_stakes', label: 'Table stakes only (no reaching into wallets mid-hand)', defaultOn: true, formats: 'all' },
    { id: 'no_going_south', label: 'No going south (removing chips from play)', defaultOn: true, formats: 'all' },
    { id: 'no_lending', label: 'No lending or credit at the table', defaultOn: true, formats: 'all' },
    { id: 'bank_only', label: 'Buy chips from the bank only, not other players', defaultOn: true, formats: 'all' },
    { id: 'one_player_hand', label: 'One player to a hand \u2014 no coaching', defaultOn: true, formats: 'all' },
    { id: 'show_one_show_all', label: 'Show one, show all', defaultOn: true, formats: 'all' },
    { id: 'cards_speak', label: 'Cards speak \u2014 physical cards determine the winner', defaultOn: true, formats: 'all' },
    { id: 'phones_down', label: 'Phones down when you\'re in a hand', defaultOn: false, formats: 'all' },
    { id: 'food_off_felt', label: 'Food off the felt', defaultOn: false, formats: 'all' },
    { id: 'host_decides', label: 'Host has final say on disputes', defaultOn: true, formats: 'all' },
    { id: 'two_decks', label: 'Two decks with different backs', defaultOn: false, formats: 'all' },
    { id: 'run_it_twice', label: 'Run it twice allowed (both players must agree)', defaultOn: false, formats: 'cash' },
    { id: 'bomb_pots', label: 'Bomb pots every orbit (5 BB ante, skip preflop)', defaultOn: false, formats: 'cash' },
    { id: 'seven_two', label: '7-2 game \u2014 win with 7-2 offsuit, collect bounty from each player', defaultOn: false, formats: 'cash' }
  ];

  var KEY_MAP = {
    format: 'f', sb: 'sb', bb: 'bb', buyin_min: 'bm', buyin_max: 'bx',
    tournament_buyin: 'tb', bounty_amount: 'ba', starting_chips: 'sc',
    rebuys_allowed: 'ra', rebuys_max: 'rm', rebuys_window: 'rw',
    rebuys_amount: 'ry', rebuys_condition: 'rc',
    addon_allowed: 'aa', addon_amount: 'ad', addon_chips: 'ac',
    banker: 'bk', payment_method: 'pm', payment_other: 'po',
    settle_policy: 'sp', rules_off: 'ro', rules_on: 'rn',
    custom_rules: 'cr', date: 'dt', start_time: 'st',
    last_buyin_time: 'lt', hard_stop: 'hs', break_schedule: 'bs',
    location_name: 'ln', location_address: 'la', notes: 'nt',
    payout: 'py', payout_custom: 'pc', starting_stack_bb: 'sk',
    auto_buyin: 'ab'
  };

  var KEY_MAP_REV = {};
  for (var k in KEY_MAP) KEY_MAP_REV[KEY_MAP[k]] = k;

  var FORMAT_MAP = { c: 'cash', t: 'tournament', b: 'bounty' };
  var FORMAT_MAP_REV = { cash: 'c', tournament: 't', bounty: 'b' };
  var SETTLE_MAP = { l: 'before_leave', n: 'same_night', d: 'next_day' };
  var SETTLE_MAP_REV = { before_leave: 'l', same_night: 'n', next_day: 'd' };
  var SETTLE_LABELS = { before_leave: 'Settle up before you leave', same_night: 'Settle by end of night', next_day: 'Settle by next day' };
  var CONDITION_MAP = { m: 'below_min', a: 'anytime', f: 'felted' };
  var CONDITION_MAP_REV = { below_min: 'm', anytime: 'a', felted: 'f' };
  var CONDITION_LABELS = { below_min: 'Rebuy when below min buy-in', anytime: 'Rebuy any amount', felted: 'Rebuy only when stacked' };
  var BREAK_MAP = { '90': 'every_90', 'o': 'every_orbit', '60': 'every_60', 'n': 'no_breaks' };
  var BREAK_MAP_REV = { every_90: '90', every_orbit: 'o', every_60: '60', no_breaks: 'n' };
  var BREAK_LABELS = { every_90: 'Breaks every 90 min', every_orbit: 'Breaks every orbit', every_60: 'Breaks every 60 min', no_breaks: '' };
  var PAYMENT_MAP = { c: 'cash', v: 'venmo', z: 'zelle', a: 'cashapp', o: 'other' };
  var PAYMENT_MAP_REV = { cash: 'c', venmo: 'v', zelle: 'z', cashapp: 'a', other: 'o' };
  var PAYMENT_LABELS = { cash: 'Cash', venmo: 'Venmo', zelle: 'Zelle', cashapp: 'Cash App' };

  // ═══ State ═══
  var state = getDefaults();
  var customRules = [];

  function getDefaults() {
    return {
      format: 'cash',
      auto_buyin: true,
      sb: 0.25, bb: 0.50,
      buyin_min: 20, buyin_max: 40,
      tournament_buyin: 40,
      bounty_amount: 10,
      starting_chips: 10000,
      payout: '50/30/20',
      payout_custom: '',
      rebuys_allowed: true,
      rebuys_max: 1, rebuys_window: 90,
      rebuys_amount: 'same', rebuys_custom: '',
      rebuys_condition: 'below_min',
      addon_allowed: false,
      addon_amount: 20, addon_chips: 5000,
      banker: '',
      payment_method: ['cash'],
      payment_other: '',
      settle_policy: 'before_leave',
      date: todayStr(),
      start_time: '19:00',
      last_buyin_time: '21:00',
      hard_stop: '00:00',
      break_schedule: 'every_90',
      location_name: '',
      location_address: '',
      notes: ''
    };
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  // ═══ DOM Helpers ═══
  function $(id) { return document.getElementById(id); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // ═══ Sanitize ═══
  function sanitizePlain(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>"']/g, '').substring(0, 300);
  }

  // ═══ Currency Formatting ═══
  function fmtCurrency(val) {
    var n = parseFloat(val);
    if (isNaN(n) || n < 0) return '$0';
    if (n >= 1000) {
      var whole = Math.floor(n);
      var cents = n - whole;
      var s = whole.toLocaleString('en-US');
      if (cents > 0.001) s += '.' + cents.toFixed(2).split('.')[1];
      return '$' + s;
    }
    if (n < 1) return '$' + n.toFixed(2);
    if (n === Math.floor(n)) return '$' + n;
    return '$' + n.toFixed(2);
  }

  // ═══ Format Date ═══
  function fmtDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    var d = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
  }

  // ═══ Format Time ═══
  function fmtTime(timeStr) {
    if (!timeStr) return '';
    var parts = timeStr.split(':');
    var h = parseInt(parts[0]);
    var m = parseInt(parts[1]);
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 || 12;
    if (h === 0 && m === 0) return 'Midnight';
    if (m === 0) return h12 + ':00 ' + ampm;
    return h12 + ':' + String(m).padStart(2,'0') + ' ' + ampm;
  }

  // ═══ Smart Stakes ═══
  var CONVENTIONAL_BLINDS = [
    { sb: 0.01, bb: 0.02 },
    { sb: 0.02, bb: 0.05 },
    { sb: 0.05, bb: 0.1 },
    { sb: 0.1, bb: 0.2 },
    { sb: 0.25, bb: 0.5 },
    { sb: 0.5, bb: 1 },
    { sb: 1, bb: 2 },
    { sb: 2, bb: 5 },
    { sb: 5, bb: 10 },
    { sb: 10, bb: 20 },
    { sb: 25, bb: 50 },
    { sb: 50, bb: 100 },
    { sb: 100, bb: 200 }
  ];

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function suggestBlinds(maxBuyIn) {
    if (maxBuyIn <= 0) return { sb: 0.25, bb: 0.5 };
    var minBBValue = maxBuyIn / 150;
    var maxBBValue = maxBuyIn / 50;
    var candidates = CONVENTIONAL_BLINDS.filter(function(p) {
      return p.bb >= minBBValue - 1e-9 && p.bb <= maxBBValue + 1e-9;
    });
    if (!candidates.length) candidates = CONVENTIONAL_BLINDS.slice();
    var best = candidates[0];
    var bestScore = Infinity;
    for (var i = 0; i < candidates.length; i++) {
      var p = candidates[i];
      var stackBB = maxBuyIn / p.bb;
      var score = Math.abs(stackBB - 100);
      if (p.bb < minBBValue || p.bb > maxBBValue) score += 6;
      if (score < bestScore) { bestScore = score; best = p; }
    }
    return { sb: round2(best.sb), bb: round2(best.bb) };
  }

  function buyInStep(value) {
    if (value < 10) return 1;
    return Math.pow(10, Math.floor(Math.log10(value)));
  }

  function applyAutoBuyin() {
    if (!state.auto_buyin || state.format !== 'cash') return;
    // Derive blinds from min buy-in (~50 BB depth)
    var blinds = suggestBlinds(state.buyin_min);
    state.sb = blinds.sb;
    state.bb = blinds.bb;
    $('cof-sb').value = blinds.sb;
    $('cof-bb').value = blinds.bb;
    // Max buy-in = 2× min
    var maxBuyin = round2(state.buyin_min * 2);
    state.buyin_max = maxBuyin;
    $('cof-buyin-max').value = maxBuyin;
  }

  function updateDepthLabel() {
    var el = $('cof-depth-label');
    if (!el) return;
    if (state.format !== 'cash' || !state.bb || !state.buyin_min) {
      el.textContent = '';
      return;
    }
    var minDepth = Math.round(state.buyin_min / state.bb);
    var maxDepth = Math.round(state.buyin_max / state.bb);
    el.textContent = minDepth + ' BB to ' + maxDepth + ' BB at $' + state.bb + ' big blind';
  }

  function updateAutoDerivedStyling() {
    var fields = ['cof-sb-field', 'cof-bb-field', 'cof-buyin-max-field'];
    for (var i = 0; i < fields.length; i++) {
      var el = $(fields[i]);
      if (el) el.classList.toggle('is-auto-derived', !!state.auto_buyin);
    }
  }

  function updateStepperState() {
    $$('.cof-cl-step-btn[data-step="-1"]').forEach(function(btn) {
      var input = $(btn.getAttribute('data-target'));
      if (input) {
        var min = parseFloat(input.min) || 1;
        btn.disabled = (parseFloat(input.value) || 0) <= min;
      }
    });
  }

  function setupSteppers() {
    // +/- button handlers
    $$('.cof-cl-step-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var targetId = btn.getAttribute('data-target');
        var input = $(targetId);
        if (!input) return;
        var dir = parseInt(btn.getAttribute('data-step'));
        var val = parseFloat(input.value) || 0;
        var stepRef = dir < 0 ? Math.max(1, val - 1) : Math.max(1, val);
        var step = buyInStep(stepRef);
        var newVal = round2(val + dir * step);
        var min = parseFloat(input.min) || 1;
        if (newVal < min) newVal = min;
        input.value = newVal;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });

    // Auto checkbox
    var autoCheck = $('cof-auto-buyin');
    if (autoCheck) {
      autoCheck.addEventListener('change', function() {
        state.auto_buyin = autoCheck.checked;
        if (state.auto_buyin) applyAutoBuyin();
        updateDepthLabel();
        updateAutoDerivedStyling();
        updateStepperState();
        updatePreview();
        updateSummaries();
      });
    }

    // Manual edit of SB/BB/max unchecks auto
    ['cof-sb', 'cof-bb', 'cof-buyin-max'].forEach(function(id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', function() {
        if (state.auto_buyin) {
          state.auto_buyin = false;
          var cb = $('cof-auto-buyin');
          if (cb) cb.checked = false;
          updateAutoDerivedStyling();
        }
      });
    });
  }

  // ═══ Initialize ═══
  function init() {
    setupDate();
    renderRules();
    setupFormatSelector();
    setupAccordions();
    setupToggles();
    setupPaymentChips();
    setupInputListeners();
    setupCustomRules();
    setupPayoutCustom();
    setupRebuyAmountToggle();
    setupOutputButtons();
    setupSteppers();
    loadFromHash();
    applyAutoBuyin();
    updateDepthLabel();
    updateAutoDerivedStyling();
    updateStepperState();
    updateConditionalFields();
    updatePreview();
    updateSummaries();
  }

  function setupDate() {
    var dateInput = $('cof-date');
    dateInput.value = state.date;
    dateInput.min = todayStr();
  }

  // ═══ Rules Rendering ═══
  function renderRules() {
    var container = $('cof-rules-list');
    container.innerHTML = '';
    PRESET_RULES.forEach(function(rule) {
      var row = document.createElement('div');
      row.className = 'cof-cl-rule-item';
      if (rule.formats !== 'all') row.setAttribute('data-show', rule.formats);
      row.setAttribute('data-rule-id', rule.id);

      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'cof-cl-toggle';
      toggle.setAttribute('role', 'switch');
      toggle.setAttribute('aria-checked', rule.defaultOn ? 'true' : 'false');
      toggle.setAttribute('aria-label', rule.label);
      toggle.setAttribute('data-rule', rule.id);

      var label = document.createElement('span');
      label.className = 'cof-cl-toggle-label';
      label.textContent = rule.label;

      row.appendChild(toggle);
      row.appendChild(label);
      container.appendChild(row);

      toggle.addEventListener('click', function() {
        var checked = this.getAttribute('aria-checked') === 'true';
        this.setAttribute('aria-checked', !checked ? 'true' : 'false');
        updatePreview();
        updateSummaries();
      });
      toggle.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this.click(); }
      });
    });
  }

  // ═══ Format Selector ═══
  function setupFormatSelector() {
    $$('.cof-cl-format-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        $$('.cof-cl-format-btn').forEach(function(b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-checked', 'false');
        });
        this.classList.add('is-active');
        this.setAttribute('aria-checked', 'true');
        state.format = this.getAttribute('data-format');
        updateConditionalFields();
        updatePreview();
        updateSummaries();
      });
    });
  }

  function updateConditionalFields() {
    var fmt = state.format;
    $$('[data-show]').forEach(function(el) {
      var formats = el.getAttribute('data-show').split(' ');
      if (formats.indexOf(fmt) >= 0) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // ═══ Accordions ═══
  function setupAccordions() {
    var isMobile = window.innerWidth < 640;
    $$('.cof-cl-section-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var section = this.closest('.cof-cl-section');
        var isExpanded = section.classList.contains('is-expanded');

        if (isMobile) {
          $$('.cof-cl-section').forEach(function(s) {
            s.classList.remove('is-expanded');
            s.querySelector('.cof-cl-section-header').setAttribute('aria-expanded', 'false');
          });
        }

        if (!isExpanded) {
          section.classList.add('is-expanded');
          this.setAttribute('aria-expanded', 'true');
          section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          section.classList.remove('is-expanded');
          this.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // On desktop, expand first section. On mobile, only first.
    if (!isMobile) {
      $$('.cof-cl-section').forEach(function(s) {
        s.classList.add('is-expanded');
        s.querySelector('.cof-cl-section-header').setAttribute('aria-expanded', 'true');
      });
    }

    window.addEventListener('resize', function() {
      isMobile = window.innerWidth < 640;
    });
  }

  // ═══ Toggles ═══
  function setupToggles() {
    // Rebuys toggle
    $('cof-rebuys-on').addEventListener('click', function() {
      var checked = this.getAttribute('aria-checked') === 'true';
      this.setAttribute('aria-checked', !checked ? 'true' : 'false');
      state.rebuys_allowed = !checked;
      $('cof-rebuys-fields').querySelector('#cof-rebuys-fields > .cof-cl-grid-2').style.display = !checked ? '' : 'none';
      $$('#cof-rebuys-fields > .cof-cl-field, #cof-rebuys-condition-wrap, #cof-addon-section').forEach(function(el) {
        el.style.display = !checked ? '' : 'none';
      });
      updatePreview();
      updateSummaries();
    });

    // Add-on toggle
    $('cof-addon-on').addEventListener('click', function() {
      var checked = this.getAttribute('aria-checked') === 'true';
      this.setAttribute('aria-checked', !checked ? 'true' : 'false');
      state.addon_allowed = !checked;
      $('cof-addon-fields').classList.toggle('cof-cl-hidden', checked);
      updatePreview();
      updateSummaries();
    });
  }

  // ═══ Payment Chips ═══
  function setupPaymentChips() {
    $$('.cof-cl-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        var pm = this.getAttribute('data-payment');
        this.classList.toggle('is-selected');

        // Update state
        state.payment_method = [];
        $$('.cof-cl-chip.is-selected').forEach(function(c) {
          state.payment_method.push(c.getAttribute('data-payment'));
        });

        // Show/hide other input
        var otherSelected = state.payment_method.indexOf('other') >= 0;
        $('cof-payment-other-wrap').classList.toggle('cof-cl-hidden', !otherSelected);

        updatePreview();
        updateSummaries();
      });
    });
  }

  // ═══ Input Listeners ═══
  function setupInputListeners() {
    var debounceTimer;
    function onInput() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        readFormState();
        applyAutoBuyin();
        updateDepthLabel();
        updateAutoDerivedStyling();
        updateStepperState();
        validateFields();
        updatePreview();
        updateSummaries();
      }, 100);
    }

    var inputIds = [
      'cof-sb', 'cof-bb', 'cof-buyin-min', 'cof-buyin-max',
      'cof-tourn-buyin', 'cof-bounty-amt', 'cof-start-chips',
      'cof-rebuys-max', 'cof-rebuys-window', 'cof-rebuys-custom',
      'cof-addon-amount', 'cof-addon-chips',
      'cof-banker', 'cof-payment-other',
      'cof-date', 'cof-start-time', 'cof-last-buyin-time', 'cof-hard-stop',
      'cof-location-name', 'cof-location-addr', 'cof-notes',
      'cof-payout-custom'
    ];

    inputIds.forEach(function(id) {
      var el = $(id);
      if (el) {
        el.addEventListener('input', onInput);
        el.addEventListener('change', onInput);
      }
    });

    // Selects
    ['cof-payout', 'cof-rebuys-amount', 'cof-rebuys-condition', 'cof-settle', 'cof-breaks'].forEach(function(id) {
      var el = $(id);
      if (el) el.addEventListener('change', onInput);
    });

    // Notes counter
    $('cof-notes').addEventListener('input', function() {
      $('cof-notes-count').textContent = this.value.length;
    });
  }

  function readFormState() {
    state.auto_buyin = $('cof-auto-buyin') ? $('cof-auto-buyin').checked : state.auto_buyin;
    state.sb = parseFloat($('cof-sb').value) || 0;
    state.bb = parseFloat($('cof-bb').value) || 0;
    state.buyin_min = parseFloat($('cof-buyin-min').value) || 0;
    state.buyin_max = parseFloat($('cof-buyin-max').value) || 0;
    state.tournament_buyin = parseFloat($('cof-tourn-buyin').value) || 0;
    state.bounty_amount = parseFloat($('cof-bounty-amt').value) || 0;
    state.starting_chips = parseInt($('cof-start-chips').value) || 0;
    state.payout = $('cof-payout').value;
    state.payout_custom = $('cof-payout-custom').value;
    state.rebuys_max = parseInt($('cof-rebuys-max').value) || 1;
    state.rebuys_window = parseInt($('cof-rebuys-window').value) || 90;
    state.rebuys_amount = $('cof-rebuys-amount').value;
    state.rebuys_custom = $('cof-rebuys-custom').value;
    state.rebuys_condition = $('cof-rebuys-condition').value;
    state.addon_amount = parseFloat($('cof-addon-amount').value) || 0;
    state.addon_chips = parseInt($('cof-addon-chips').value) || 0;
    state.banker = sanitizePlain($('cof-banker').value.trim());
    state.payment_other = sanitizePlain($('cof-payment-other').value.trim());
    state.settle_policy = $('cof-settle').value;
    state.date = $('cof-date').value;
    state.start_time = $('cof-start-time').value;
    state.last_buyin_time = $('cof-last-buyin-time').value;
    state.hard_stop = $('cof-hard-stop').value;
    state.break_schedule = $('cof-breaks').value;
    state.location_name = sanitizePlain($('cof-location-name').value.trim());
    state.location_address = sanitizePlain($('cof-location-addr').value.trim());
    state.notes = sanitizePlain($('cof-notes').value.trim());
  }

  // ═══ Validation ═══
  function validateFields() {
    var valid = true;

    // BB > SB
    var errBB = $('err-bb');
    if (state.format === 'cash' && state.bb > 0 && state.sb > 0 && state.bb <= state.sb) {
      errBB.classList.add('is-visible');
      valid = false;
    } else {
      errBB.classList.remove('is-visible');
    }

    // Max >= Min
    var errBuyin = $('err-buyin');
    if (state.format === 'cash' && state.buyin_max > 0 && state.buyin_min > 0 && state.buyin_max < state.buyin_min) {
      errBuyin.classList.add('is-visible');
      valid = false;
    } else {
      errBuyin.classList.remove('is-visible');
    }

    // Bounty < buy-in
    var errBounty = $('err-bounty');
    if (state.format === 'bounty' && state.bounty_amount >= state.tournament_buyin) {
      errBounty.classList.add('is-visible');
      valid = false;
    } else {
      errBounty.classList.remove('is-visible');
    }

    return valid;
  }

  // ═══ Payout Custom Toggle ═══
  function setupPayoutCustom() {
    $('cof-payout').addEventListener('change', function() {
      $('cof-payout-custom-wrap').classList.toggle('cof-cl-hidden', this.value !== 'custom');
    });
  }

  // ═══ Rebuy Amount Toggle ═══
  function setupRebuyAmountToggle() {
    $('cof-rebuys-amount').addEventListener('change', function() {
      $('cof-rebuys-custom-wrap').classList.toggle('cof-cl-hidden', this.value !== 'custom');
    });
  }

  // ═══ Custom Rules ═══
  function setupCustomRules() {
    $('cof-add-custom-rule').addEventListener('click', function() {
      if (customRules.length >= 10) return;
      customRules.push('');
      renderCustomRules();
      // Focus the new input
      var inputs = $$('#cof-custom-rules input');
      if (inputs.length) inputs[inputs.length - 1].focus();
    });
  }

  function renderCustomRules() {
    var container = $('cof-custom-rules');
    container.innerHTML = '';
    customRules.forEach(function(rule, i) {
      var row = document.createElement('div');
      row.className = 'cof-cl-custom-rule-row';

      var input = document.createElement('input');
      input.type = 'text';
      input.value = rule;
      input.placeholder = 'e.g. No rabbit hunting';
      input.maxLength = 120;
      input.style.cssText = 'border:1px solid #d7deea;border-radius:8px;background:#fff;color:#0f172a;padding:0.5rem 0.6rem;font-size:1rem;flex:1;font-family:inherit;';
      input.addEventListener('input', function() {
        customRules[i] = sanitizePlain(this.value);
        updatePreview();
      });
      input.addEventListener('focus', function() {
        this.style.borderColor = '#0f766e';
        this.style.boxShadow = '0 0 0 3px rgba(15,118,110,0.1)';
      });
      input.addEventListener('blur', function() {
        this.style.borderColor = '#d7deea';
        this.style.boxShadow = 'none';
      });

      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'cof-cl-remove-btn';
      removeBtn.innerHTML = '&times;';
      removeBtn.setAttribute('aria-label', 'Remove rule');
      removeBtn.addEventListener('click', function() {
        customRules.splice(i, 1);
        renderCustomRules();
        updatePreview();
      });

      row.appendChild(input);
      row.appendChild(removeBtn);
      container.appendChild(row);
    });

    // Update count
    var countEl = $('cof-custom-rules-count');
    if (customRules.length >= 8) {
      countEl.textContent = customRules.length + '/10 custom rules';
      countEl.style.color = customRules.length >= 10 ? '#dc2626' : '#94a3b8';
    } else {
      countEl.textContent = '';
    }

    // Disable add button at limit
    $('cof-add-custom-rule').style.display = customRules.length >= 10 ? 'none' : '';
  }

  // ═══ Generate Output Text ═══
  function generateOutput() {
    var lines = [];
    var fmt = state.format;

    // Header line
    var dateStr = fmtDate(state.date);
    if (dateStr) {
      lines.push('POKER NIGHT \u2014 ' + dateStr);
    } else {
      lines.push('POKER NIGHT');
    }
    lines.push('');

    // Format + stakes line
    if (fmt === 'cash') {
      lines.push('Cash Game | ' + fmtCurrency(state.sb) + '/' + fmtCurrency(state.bb) + ' blinds');
      lines.push('Buy-in: ' + fmtCurrency(state.buyin_min) + '\u2013' + fmtCurrency(state.buyin_max));
    } else if (fmt === 'tournament') {
      lines.push('Tournament | ' + fmtCurrency(state.tournament_buyin) + ' buy-in | ' + state.starting_chips.toLocaleString('en-US') + ' chips');
      var payoutStr = state.payout === 'custom' ? (state.payout_custom || 'Custom') : (state.payout === 'wta' ? 'Winner take all' : state.payout);
      lines.push('Payout: ' + payoutStr);
    } else if (fmt === 'bounty') {
      lines.push('Bounty Tournament | ' + fmtCurrency(state.tournament_buyin) + ' buy-in (' + fmtCurrency(state.bounty_amount) + ' bounty) | ' + state.starting_chips.toLocaleString('en-US') + ' chips');
      var prizePool = state.tournament_buyin - state.bounty_amount;
      var payoutStr2 = state.payout === 'custom' ? (state.payout_custom || 'Custom') : (state.payout === 'wta' ? 'Winner take all' : state.payout);
      lines.push('Payout: ' + payoutStr2 + ' (from ' + fmtCurrency(prizePool) + '/player prize pool)');
    }
    lines.push('');

    // Rebuys
    if (!state.rebuys_allowed) {
      lines.push('No rebuys');
    } else {
      var rebuyAmt = state.rebuys_amount === 'same' ? 'same as buy-in' : fmtCurrency(state.rebuys_custom);
      lines.push('Rebuys: ' + state.rebuys_max + ' max, first ' + state.rebuys_window + ' min, ' + rebuyAmt);
      if (fmt === 'cash') {
        lines.push(CONDITION_LABELS[state.rebuys_condition] || '');
      }
    }

    // Add-on (tournament/bounty only)
    if ((fmt === 'tournament' || fmt === 'bounty') && state.addon_allowed) {
      lines.push('Add-on: ' + fmtCurrency(state.addon_amount) + ' for ' + state.addon_chips.toLocaleString('en-US') + ' chips at first break');
    }
    lines.push('');

    // Money
    if (state.banker) {
      lines.push('Banker: ' + state.banker);
    }
    if (state.payment_method.length > 0) {
      var methods = state.payment_method.map(function(m) {
        if (m === 'other' && state.payment_other) return state.payment_other;
        return PAYMENT_LABELS[m] || m;
      }).filter(Boolean);
      if (methods.length) lines.push('Payment: ' + methods.join(', '));
    }
    lines.push(SETTLE_LABELS[state.settle_policy] || '');
    lines.push('');

    // House Rules
    var activeRules = getActiveRules();
    var activeCustom = customRules.filter(function(r) { return r.trim(); });
    if (activeRules.length > 0 || activeCustom.length > 0) {
      lines.push('House Rules:');
      activeRules.forEach(function(r) {
        lines.push('\u2022 ' + r.label);
      });
      activeCustom.forEach(function(r) {
        lines.push('\u2022 ' + r);
      });
      lines.push('');
    }

    // Timing
    var timeParts = [];
    if (state.start_time) timeParts.push('Start: ' + fmtTime(state.start_time));
    if (state.last_buyin_time) timeParts.push('Last buy-in: ' + fmtTime(state.last_buyin_time));
    if (state.hard_stop) timeParts.push('Hard stop: ' + fmtTime(state.hard_stop));
    if (timeParts.length) lines.push(timeParts.join(' | '));

    // Breaks
    var breakLabel = BREAK_LABELS[state.break_schedule];
    if (breakLabel) lines.push(breakLabel);

    // Location
    if (state.location_name || state.location_address) {
      var loc = '\uD83D\uDCCD ';
      if (state.location_name && state.location_address) {
        loc += state.location_name + ' \u2014 ' + state.location_address;
      } else {
        loc += state.location_name || state.location_address;
      }
      lines.push(loc);
    }

    // Notes
    if (state.notes) {
      lines.push(state.notes);
    }

    // Clean up: remove consecutive empty lines
    var result = [];
    var lastEmpty = false;
    lines.forEach(function(line) {
      if (line === '') {
        if (!lastEmpty) result.push(line);
        lastEmpty = true;
      } else {
        result.push(line);
        lastEmpty = false;
      }
    });

    // Trim trailing empty lines
    while (result.length && result[result.length - 1] === '') result.pop();

    return result.join('\n');
  }

  function getActiveRules() {
    var fmt = state.format;
    var active = [];
    $$('[data-rule]').forEach(function(toggle) {
      if (toggle.getAttribute('aria-checked') !== 'true') return;
      var ruleId = toggle.getAttribute('data-rule');
      var ruleDef = PRESET_RULES.find(function(r) { return r.id === ruleId; });
      if (!ruleDef) return;
      // Check format visibility
      if (ruleDef.formats !== 'all' && ruleDef.formats !== fmt) return;
      active.push(ruleDef);
    });
    return active;
  }

  // ═══ Preview Update ═══
  function updatePreview() {
    var text = generateOutput();
    var desktopEl = $('cof-preview-desktop');
    var mobileEl = $('cof-preview-mobile');
    if (desktopEl) desktopEl.textContent = text;
    if (mobileEl) mobileEl.textContent = text;
  }

  // ═══ Section Summaries ═══
  function updateSummaries() {
    // Stakes
    var stakesSummary = '';
    if (state.format === 'cash') {
      stakesSummary = fmtCurrency(state.sb) + '/' + fmtCurrency(state.bb) + ' | ' + fmtCurrency(state.buyin_min) + '\u2013' + fmtCurrency(state.buyin_max);
    } else if (state.format === 'tournament') {
      stakesSummary = fmtCurrency(state.tournament_buyin) + ' buy-in | ' + state.starting_chips.toLocaleString('en-US') + ' chips';
    } else {
      stakesSummary = fmtCurrency(state.tournament_buyin) + ' (' + fmtCurrency(state.bounty_amount) + ' bounty)';
    }
    $('sum-stakes').textContent = stakesSummary;
    setCheck('chk-stakes', true);

    // Rebuys
    var rebuysSummary = state.rebuys_allowed ? (state.rebuys_max + ' max, ' + state.rebuys_window + ' min') : 'No rebuys';
    $('sum-rebuys').textContent = rebuysSummary;
    setCheck('chk-rebuys', true);

    // Money
    var moneySummary = '';
    var parts = [];
    if (state.banker) parts.push(state.banker);
    if (state.payment_method.length > 0) {
      var methods = state.payment_method.map(function(m) { return PAYMENT_LABELS[m] || m; });
      parts.push(methods.join(', '));
    }
    moneySummary = parts.join(' | ');
    $('sum-money').textContent = moneySummary;
    setCheck('chk-money', state.payment_method.length > 0);

    // Rules
    var activeCount = getActiveRules().length + customRules.filter(function(r) { return r.trim(); }).length;
    $('sum-rules').textContent = activeCount + ' rules active';
    setCheck('chk-rules', activeCount > 0);

    // Logistics
    var logParts = [];
    if (state.start_time) logParts.push(fmtTime(state.start_time));
    if (state.location_name) logParts.push(state.location_name);
    $('sum-logistics').textContent = logParts.join(' | ');
    setCheck('chk-logistics', state.start_time || state.location_name);
  }

  function setCheck(id, visible) {
    var el = $(id);
    if (el) el.classList.toggle('is-visible', !!visible);
  }

  // ═══ Copy to Clipboard ═══
  function copyToClipboard(text, btn, successText) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showCopySuccess(btn, successText);
      }).catch(function() {
        fallbackCopy(text, btn, successText);
      });
    } else {
      fallbackCopy(text, btn, successText);
    }
  }

  function fallbackCopy(text, btn, successText) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(btn, successText);
    } catch(e) {
      showToast('Copy failed. Please copy manually.');
    }
    document.body.removeChild(textarea);
  }

  function showCopySuccess(btn, successText) {
    var original = btn.innerHTML;
    btn.classList.add('is-success');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> ' + (successText || 'Copied!');
    showToast(successText || 'Copied to clipboard!');
    setTimeout(function() {
      btn.classList.remove('is-success');
      btn.innerHTML = original;
    }, 2000);
  }

  // ═══ Toast ═══
  function showToast(msg) {
    var toast = $('cof-toast');
    toast.textContent = msg;
    toast.classList.add('is-visible');
    setTimeout(function() {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  // ═══ Output Buttons ═══
  function setupOutputButtons() {
    // Desktop copy
    $('cof-copy-desktop').addEventListener('click', function() {
      copyToClipboard(generateOutput(), this, 'Copied!');
    });

    // Desktop share
    $('cof-share-desktop').addEventListener('click', function() {
      var url = generateShareURL();
      copyToClipboard(url, this, 'Link Copied!');
      checkURLLength(url);
    });

    // Mobile copy
    $('cof-copy-mobile').addEventListener('click', function() {
      copyToClipboard(generateOutput(), this, 'Copied!');
    });

    // Mobile share
    $('cof-share-mobile').addEventListener('click', function() {
      var url = generateShareURL();
      copyToClipboard(url, this, 'Link Copied!');
      checkURLLength(url);
    });

    // Mobile preview toggle
    $('cof-bar-preview').addEventListener('click', function() {
      openSheet();
    });

    // Sheet backdrop close
    $('cof-sheet-backdrop').addEventListener('click', function() {
      closeSheet();
    });
  }

  function openSheet() {
    updatePreview();
    $('cof-sheet-backdrop').style.display = 'block';
    $('cof-sheet').style.display = 'block';
    requestAnimationFrame(function() {
      $('cof-sheet-backdrop').classList.add('is-open');
      $('cof-sheet').classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    $('cof-sheet-backdrop').classList.remove('is-open');
    $('cof-sheet').classList.remove('is-open');
    setTimeout(function() {
      $('cof-sheet-backdrop').style.display = '';
      $('cof-sheet').style.display = '';
      document.body.style.overflow = '';
    }, 300);
  }

  // ═══ Share URL Encoding ═══
  function generateShareURL() {
    var defaults = getDefaults();
    var data = {};

    // Format
    if (state.format !== defaults.format) data[KEY_MAP.format] = FORMAT_MAP_REV[state.format];

    // Cash fields — always encode concrete values, encode auto_buyin only when off
    if (state.sb !== defaults.sb) data[KEY_MAP.sb] = state.sb;
    if (state.bb !== defaults.bb) data[KEY_MAP.bb] = state.bb;
    if (state.buyin_min !== defaults.buyin_min) data[KEY_MAP.buyin_min] = state.buyin_min;
    if (state.buyin_max !== defaults.buyin_max) data[KEY_MAP.buyin_max] = state.buyin_max;
    if (!state.auto_buyin) data[KEY_MAP.auto_buyin] = 0;

    // Tournament fields
    if (state.tournament_buyin !== defaults.tournament_buyin) data[KEY_MAP.tournament_buyin] = state.tournament_buyin;
    if (state.bounty_amount !== defaults.bounty_amount) data[KEY_MAP.bounty_amount] = state.bounty_amount;
    if (state.starting_chips !== defaults.starting_chips) data[KEY_MAP.starting_chips] = state.starting_chips;
    if (state.payout !== defaults.payout) data[KEY_MAP.payout] = state.payout;
    if (state.payout_custom) data[KEY_MAP.payout_custom] = state.payout_custom;

    // Rebuys
    if (state.rebuys_allowed !== defaults.rebuys_allowed) data[KEY_MAP.rebuys_allowed] = state.rebuys_allowed ? 1 : 0;
    if (state.rebuys_max !== defaults.rebuys_max) data[KEY_MAP.rebuys_max] = state.rebuys_max;
    if (state.rebuys_window !== defaults.rebuys_window) data[KEY_MAP.rebuys_window] = state.rebuys_window;
    if (state.rebuys_amount !== defaults.rebuys_amount) data[KEY_MAP.rebuys_amount] = state.rebuys_amount === 'same' ? 's' : state.rebuys_custom;
    if (state.rebuys_condition !== defaults.rebuys_condition) data[KEY_MAP.rebuys_condition] = CONDITION_MAP_REV[state.rebuys_condition];

    // Add-on
    if (state.addon_allowed !== defaults.addon_allowed) data[KEY_MAP.addon_allowed] = state.addon_allowed ? 1 : 0;
    if (state.addon_amount !== defaults.addon_amount) data[KEY_MAP.addon_amount] = state.addon_amount;
    if (state.addon_chips !== defaults.addon_chips) data[KEY_MAP.addon_chips] = state.addon_chips;

    // Money
    if (state.banker) data[KEY_MAP.banker] = state.banker;
    var defaultPM = defaults.payment_method.join(',');
    var currentPM = state.payment_method.map(function(m) { return PAYMENT_MAP_REV[m]; }).join(',');
    if (currentPM !== PAYMENT_MAP_REV[defaults.payment_method[0]]) data[KEY_MAP.payment_method] = currentPM;
    if (state.payment_other) data[KEY_MAP.payment_other] = state.payment_other;
    if (state.settle_policy !== defaults.settle_policy) data[KEY_MAP.settle_policy] = SETTLE_MAP_REV[state.settle_policy];

    // Rules - encode only diffs from defaults
    var rulesOff = [];
    var rulesOn = [];
    PRESET_RULES.forEach(function(rule) {
      var toggle = document.querySelector('[data-rule="' + rule.id + '"]');
      if (!toggle) return;
      var isOn = toggle.getAttribute('aria-checked') === 'true';
      if (rule.defaultOn && !isOn) rulesOff.push(rule.id);
      if (!rule.defaultOn && isOn) rulesOn.push(rule.id);
    });
    if (rulesOff.length) data[KEY_MAP.rules_off] = rulesOff.join(',');
    if (rulesOn.length) data[KEY_MAP.rules_on] = rulesOn.join(',');

    // Custom rules
    var activeCustom = customRules.filter(function(r) { return r.trim(); });
    if (activeCustom.length) data[KEY_MAP.custom_rules] = activeCustom.join('|');

    // Logistics
    if (state.date !== defaults.date) data[KEY_MAP.date] = state.date;
    if (state.start_time !== defaults.start_time) data[KEY_MAP.start_time] = state.start_time;
    if (state.last_buyin_time !== defaults.last_buyin_time) data[KEY_MAP.last_buyin_time] = state.last_buyin_time;
    if (state.hard_stop !== defaults.hard_stop) data[KEY_MAP.hard_stop] = state.hard_stop;
    if (state.break_schedule !== defaults.break_schedule) data[KEY_MAP.break_schedule] = BREAK_MAP_REV[state.break_schedule];
    if (state.location_name) data[KEY_MAP.location_name] = state.location_name;
    if (state.location_address) data[KEY_MAP.location_address] = state.location_address;
    if (state.notes) data[KEY_MAP.notes] = state.notes;

    var json = JSON.stringify(data);
    var encoded = btoa(unescape(encodeURIComponent(json)));
    var base = window.location.origin + window.location.pathname;
    return base + '#d=' + encoded;
  }

  function checkURLLength(url) {
    var warning = $('cof-url-warning');
    if (url.length > 2000) {
      warning.classList.add('is-visible');
    } else {
      warning.classList.remove('is-visible');
    }
  }

  // ═══ Load from Hash ═══
  function loadFromHash() {
    var hash = window.location.hash;
    if (!hash || hash.indexOf('#d=') !== 0) return;

    try {
      var encoded = hash.substring(3);
      var json = decodeURIComponent(escape(atob(encoded)));
      var data = JSON.parse(json);
      if (typeof data !== 'object' || data === null) return;

      // Format
      if (data[KEY_MAP.format]) {
        var fmt = FORMAT_MAP[data[KEY_MAP.format]];
        if (fmt) {
          state.format = fmt;
          $$('.cof-cl-format-btn').forEach(function(b) {
            b.classList.remove('is-active');
            b.setAttribute('aria-checked', 'false');
            if (b.getAttribute('data-format') === fmt) {
              b.classList.add('is-active');
              b.setAttribute('aria-checked', 'true');
            }
          });
        }
      }

      // Numeric fields
      var numFields = {
        sb: 'cof-sb', bb: 'cof-bb', buyin_min: 'cof-buyin-min', buyin_max: 'cof-buyin-max',
        tournament_buyin: 'cof-tourn-buyin', bounty_amount: 'cof-bounty-amt', starting_chips: 'cof-start-chips',
        rebuys_max: 'cof-rebuys-max', rebuys_window: 'cof-rebuys-window',
        addon_amount: 'cof-addon-amount', addon_chips: 'cof-addon-chips'
      };
      for (var field in numFields) {
        var key = KEY_MAP[field];
        if (data[key] !== undefined) {
          var val = parseFloat(data[key]);
          if (!isNaN(val) && val >= 0 && val < 1000000) {
            state[field] = val;
            var el = $(numFields[field]);
            if (el) el.value = val;
          }
        }
      }

      // Text fields
      var textFields = {
        banker: 'cof-banker', payment_other: 'cof-payment-other',
        location_name: 'cof-location-name', location_address: 'cof-location-addr',
        notes: 'cof-notes', payout_custom: 'cof-payout-custom'
      };
      for (var tf in textFields) {
        var tkey = KEY_MAP[tf];
        if (data[tkey] !== undefined) {
          var tval = sanitizePlain(String(data[tkey]));
          state[tf] = tval;
          var tel = $(textFields[tf]);
          if (tel) tel.value = tval;
        }
      }

      // Selects
      // starting_stack_bb from old URLs is ignored (field removed)
      if (data[KEY_MAP.payout]) {
        state.payout = sanitizePlain(String(data[KEY_MAP.payout]));
        $('cof-payout').value = state.payout;
        if (state.payout === 'custom') $('cof-payout-custom-wrap').classList.remove('cof-cl-hidden');
      }
      if (data[KEY_MAP.rebuys_amount]) {
        var ra = data[KEY_MAP.rebuys_amount];
        if (ra === 's') {
          state.rebuys_amount = 'same';
        } else {
          state.rebuys_amount = 'custom';
          state.rebuys_custom = ra;
          $('cof-rebuys-custom').value = ra;
          $('cof-rebuys-custom-wrap').classList.remove('cof-cl-hidden');
        }
        $('cof-rebuys-amount').value = state.rebuys_amount;
      }
      if (data[KEY_MAP.rebuys_condition]) {
        var rc = CONDITION_MAP[data[KEY_MAP.rebuys_condition]];
        if (rc) { state.rebuys_condition = rc; $('cof-rebuys-condition').value = rc; }
      }
      if (data[KEY_MAP.settle_policy]) {
        var sp = SETTLE_MAP[data[KEY_MAP.settle_policy]];
        if (sp) { state.settle_policy = sp; $('cof-settle').value = sp; }
      }
      if (data[KEY_MAP.break_schedule]) {
        var bs = BREAK_MAP[data[KEY_MAP.break_schedule]];
        if (bs) { state.break_schedule = bs; $('cof-breaks').value = bs; }
      }

      // Booleans
      if (data[KEY_MAP.rebuys_allowed] !== undefined) {
        state.rebuys_allowed = data[KEY_MAP.rebuys_allowed] === 1;
        $('cof-rebuys-on').setAttribute('aria-checked', state.rebuys_allowed ? 'true' : 'false');
        if (!state.rebuys_allowed) {
          $$('#cof-rebuys-fields > .cof-cl-grid-2, #cof-rebuys-fields > .cof-cl-field, #cof-rebuys-condition-wrap, #cof-addon-section').forEach(function(el) {
            el.style.display = 'none';
          });
        }
      }
      if (data[KEY_MAP.addon_allowed] !== undefined) {
        state.addon_allowed = data[KEY_MAP.addon_allowed] === 1;
        $('cof-addon-on').setAttribute('aria-checked', state.addon_allowed ? 'true' : 'false');
        if (state.addon_allowed) $('cof-addon-fields').classList.remove('cof-cl-hidden');
      }

      // Date/time
      if (data[KEY_MAP.date]) { state.date = data[KEY_MAP.date]; $('cof-date').value = state.date; }
      if (data[KEY_MAP.start_time]) { state.start_time = data[KEY_MAP.start_time]; $('cof-start-time').value = state.start_time; }
      if (data[KEY_MAP.last_buyin_time]) { state.last_buyin_time = data[KEY_MAP.last_buyin_time]; $('cof-last-buyin-time').value = state.last_buyin_time; }
      if (data[KEY_MAP.hard_stop]) { state.hard_stop = data[KEY_MAP.hard_stop]; $('cof-hard-stop').value = state.hard_stop; }

      // Payment methods
      if (data[KEY_MAP.payment_method]) {
        var pmCodes = data[KEY_MAP.payment_method].split(',');
        state.payment_method = pmCodes.map(function(c) { return PAYMENT_MAP[c]; }).filter(Boolean);
        $$('.cof-cl-chip').forEach(function(chip) {
          var pm = chip.getAttribute('data-payment');
          chip.classList.toggle('is-selected', state.payment_method.indexOf(pm) >= 0);
        });
        if (state.payment_method.indexOf('other') >= 0) {
          $('cof-payment-other-wrap').classList.remove('cof-cl-hidden');
        }
      }

      // Rules — validate IDs against known presets to prevent selector injection
      var validRuleIds = PRESET_RULES.map(function(r) { return r.id; });
      if (data[KEY_MAP.rules_off]) {
        var off = data[KEY_MAP.rules_off].split(',');
        off.forEach(function(id) {
          id = sanitizePlain(id);
          if (validRuleIds.indexOf(id) < 0) return;
          var t = document.querySelector('[data-rule="' + id + '"]');
          if (t) t.setAttribute('aria-checked', 'false');
        });
      }
      if (data[KEY_MAP.rules_on]) {
        var on = data[KEY_MAP.rules_on].split(',');
        on.forEach(function(id) {
          id = sanitizePlain(id);
          if (validRuleIds.indexOf(id) < 0) return;
          var t = document.querySelector('[data-rule="' + id + '"]');
          if (t) t.setAttribute('aria-checked', 'true');
        });
      }

      // Custom rules
      if (data[KEY_MAP.custom_rules]) {
        customRules = data[KEY_MAP.custom_rules].split('|').map(sanitizePlain).slice(0, 10);
        renderCustomRules();
      }

      // Auto buy-in flag
      if (data[KEY_MAP.auto_buyin] !== undefined) {
        state.auto_buyin = data[KEY_MAP.auto_buyin] !== 0;
      } else {
        // Old link without ab flag — detect if explicit values differ from auto
        var hasBlinds = data[KEY_MAP.sb] !== undefined || data[KEY_MAP.bb] !== undefined;
        var hasMax = data[KEY_MAP.buyin_max] !== undefined;
        if (state.buyin_min > 0) {
          var auto = suggestBlinds(state.buyin_min);
          var autoMax = round2(state.buyin_min * 2);
          if ((hasBlinds && (round2(state.sb) !== auto.sb || round2(state.bb) !== auto.bb)) ||
              (hasMax && round2(state.buyin_max) !== autoMax)) {
            state.auto_buyin = false;
          }
        }
      }
      var autoCb = $('cof-auto-buyin');
      if (autoCb) autoCb.checked = state.auto_buyin;

      // Show shared banner
      $('cof-shared-banner').classList.remove('cof-cl-hidden');

      // Notes count
      $('cof-notes-count').textContent = state.notes.length;

    } catch(e) {
      console.warn('Pre-game checklist: invalid share URL', e);
    }
  }

  // ═══ Boot ═══
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
</script>
