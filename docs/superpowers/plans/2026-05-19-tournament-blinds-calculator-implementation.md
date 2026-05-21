# Tournament Blinds Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone tournament blind structure calculator with a testable pure solver and an editable responsive UI.

**Architecture:** Implement pure solver and schedule helpers in `js/tournament-blinds.js`, covered by `js/tournament-blinds.test.js`. Build a separate Eleventy tool page that loads a page controller in `js/tournament-blinds-page.js` and styles in `css/tournament-blinds-calculator.css`.

**Tech Stack:** Eleventy, Nunjucks/Markdown HTML, vanilla JavaScript, Node `assert` tests, existing Chips of Fury tool styling conventions.

---

## File Map

- Create `js/tournament-blinds.test.js`: failing tests for solver and schedule behavior.
- Create `js/tournament-blinds.js`: pure solver, rounding, break insertion, row editing, and schedule recalculation helpers.
- Create `tools/tournament-blinds-calculator.md`: standalone tool page markup and scripts.
- Create `js/tournament-blinds-page.js`: browser state, form bindings, editable schedule table, break controls, and summary rendering.
- Create `css/tournament-blinds-calculator.css`: responsive UI styling that reuses the chip calculator visual language.
- Modify `.eleventy.js`: pass through the new CSS file explicitly if needed.

## Tasks

- [ ] Write failing pure solver tests in `js/tournament-blinds.test.js`.
- [ ] Run `node js/tournament-blinds.test.js` and confirm it fails because the module does not exist.
- [ ] Implement `js/tournament-blinds.js` to pass the tests.
- [ ] Run `node js/tournament-blinds.test.js` and confirm the solver passes.
- [ ] Add the Eleventy page, CSS, and page controller.
- [ ] Build with `npm run build`.
- [ ] Start `npm start` and manually review `/tournament-blinds-calculator/` on desktop and mobile widths.
