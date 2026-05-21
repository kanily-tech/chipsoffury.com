# Tournament Blinds Calculator Design

## Goal

Build a standalone `tools/` page for a home poker tournament blind structure calculator. The tool should generate a practical blind ladder from simple inputs, then let the user edit blind levels, antes, durations, and breaks directly in the final schedule.

## User Experience

The page should reuse the visual language from `tools/chip-distribution-calculator.md`: dark green hero, cream tool band, white bordered calculator panels, teal controls, gold primary actions, compact section headers, and restrained poker utility styling.

The primary workflow is:

1. Enter tournament setup: players, starting stack, opening small blind, opening big blind, target tournament length, and chip denominations.
2. Generate blind levels.
3. Review a user-facing summary: estimated finish time, level count, level duration, and warning text only when the requested schedule is impractical.
4. Edit any generated row.
5. Insert or remove breaks anywhere in the schedule.

The UI should not expose internal solver terms such as target final big blind, rounded final level, or minimum level duration as headline metrics. Those values can exist in the pure result for tests and warnings.

The layout must be mobile-friendly. Desktop may use a setup column beside the schedule; narrower screens collapse into one column. If the table becomes too wide on mobile, rows may behave like compact level cards or use horizontal overflow with stable controls.

## Solver Architecture

Use a layered pure JavaScript model:

### Layer 1: Blind Solver

`solveBlindLevels(input)` generates only playable blind levels. It does not insert breaks and does not apply manual edits.

Inputs:

- `players`
- `startingStack`
- `openingSmallBlind`
- `openingBigBlind`
- `targetMinutes`
- `chipDenominations`

Behavior:

- Estimate the likely ending big blind as `startingStack * players / 10`.
- Derive a practical minimum level duration from player count. A reasonable starting rule is `clamp(round(players * 2), 10, 20)`.
- Fit the number of levels into `targetMinutes`, respecting the minimum where possible.
- Generate an exponential blind ladder from opening big blind toward the ending target.
- Round generated blinds to practical chip-compatible values.
- Prevent duplicate or non-increasing blind levels after rounding.
- Return warnings when the requested target forces level durations below the practical floor.

Each returned level has:

```js
{
  kind: "level",
  level: 1,
  smallBlind: 25,
  bigBlind: 50,
  ante: 0,
  minutes: 20,
  source: "generated"
}
```

### Layer 2: Schedule Helpers

Breaks are modeled on top of solved levels.

`insertBreakAfterLevel(rows, afterLevel, breakRow)` inserts a break row after a level.

`removeScheduleRow(rows, rowId)` removes a row.

`recalculateSchedule(rows)` computes start times and total duration from the current editable document.

Break rows have:

```js
{
  kind: "break",
  label: "Break",
  minutes: 10,
  source: "inserted"
}
```

### Layer 3: Editable Document

The browser UI owns the editable schedule document. Manual edits change rows directly. Resetting the schedule reruns the solver and reapplies default break placement.

Antes are a normal editable numeric column on every blind level. The v1 solver generates `ante: 0`; future helper policies can fill antes from a chosen level without changing the row model.

## Testing

The solver and schedule helpers must be testable without the UI. Add Node `assert` tests for:

- Standard 9-player, 10,000 stack, 3-hour schedule reaches a practical ending level.
- Short target time returns a warning when level duration falls below the player-count floor.
- Rounding uses provided chip denominations and avoids weird values like 60 or 130.
- Break insertion does not belong to the solver and updates total schedule duration only in the schedule layer.
- Manual ante/blind/duration edits are preserved by schedule recalculation.

## Page Scope

Create new files rather than overloading the existing chip distribution tool:

- `tools/tournament-blinds-calculator.md`
- `js/tournament-blinds.js`
- `js/tournament-blinds-page.js`
- `js/tournament-blinds.test.js`
- `css/tournament-blinds-calculator.css`

The page should include basic share/copy affordances if cheap, but the essential deliverable is a working, editable calculator.
