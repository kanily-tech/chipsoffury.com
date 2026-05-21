(function () {
  if (!window.TournamentBlinds) return;

  var solver = window.TournamentBlinds;
  var state = {
    generatedInput: null,
    solved: null,
    rows: [],
    regenerateTimer: null,
    openingBlindsEdited: false
  };

  // Heroicons-style outlines, 20x20 viewBox, stroke="currentColor".
  var COFFEE_SVG = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M4 8h9v4a3.5 3.5 0 0 1-3.5 3.5h-2A3.5 3.5 0 0 1 4 12V8Z"/>' +
    '<path d="M13 9h1.25a2 2 0 0 1 0 4H13"/>' +
    '<path d="M6.5 5.2c.4-.6.4-1.2 0-1.8M9 5.2c.4-.6.4-1.2 0-1.8M11.5 5.2c.4-.6.4-1.2 0-1.8"/>' +
    '</svg>';
  var CLOSE_SVG = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5.5 5.5l9 9M14.5 5.5l-9 9"/>' +
    '</svg>';

  function $(id) {
    return document.getElementById(id);
  }

  function numberValue(id, fallback) {
    var el = $(id);
    var value = el ? Number(el.value) : NaN;
    return Number.isFinite(value) ? value : fallback;
  }

  function collectInput() {
    var sb = numberValue('tb-small-blind', 25);
    var bb = numberValue('tb-big-blind', 50);
    var growthEl = $('tb-growth');
    var growth = growthEl && growthEl.value !== 'auto' ? Number(growthEl.value) : null;
    if (bb <= sb) bb = sb * 2;

    var input = {
      players: numberValue('tb-players', 9),
      startingStack: numberValue('tb-stack', 10000),
      openingSmallBlind: sb,
      openingBigBlind: bb,
      targetMinutes: numberValue('tb-target', 180)
    };
    if (growth) input.blindGrowth = growth;
    return input;
  }

  function collectBreakConfig() {
    return {
      minutes: Math.max(0, numberValue('tb-break-every', 60)),
      breakLength: 10
    };
  }

  function collectAnteConfig() {
    var toggle = $('tb-ante-toggle');
    var enabled = !!(toggle && toggle.checked);
    var typeEl = document.querySelector('input[name="tb-ante-type"]:checked');
    return {
      enabled: enabled,
      type: typeEl ? typeEl.value : 'player',
      percentBB: Math.max(1, numberValue('tb-ante-percent', 12))
    };
  }

  function formatNumber(value) {
    return Math.round(Number(value) || 0).toLocaleString('en-US');
  }

  function formatClock(minutes) {
    var total = Math.max(0, Math.round(Number(minutes) || 0));
    var hours = Math.floor(total / 60);
    var mins = total % 60;
    if (!hours) return mins + ' min';
    return hours + ':' + String(mins).padStart(2, '0');
  }

  // Finer denominations for the *opening* blinds only — lets shallow stacks
  // (e.g. 1000 chips) prefill to a sensible 5/10 instead of bottoming out at
  // 25/50. The actual schedule keeps using the full tournament chip ladder.
  var OPENING_DENOMS = [1, 5, 10, 25, 100, 500, 1000, 5000];

  function prefillOpeningBlinds() {
    var blinds = solver.chooseOpeningBlinds(numberValue('tb-stack', 10000), OPENING_DENOMS);
    if ($('tb-small-blind')) $('tb-small-blind').value = blinds.smallBlind;
    if ($('tb-big-blind')) $('tb-big-blind').value = blinds.bigBlind;
  }

  function renderOpeningStats() {
    var stack = numberValue('tb-stack', 10000);
    var bb = numberValue('tb-big-blind', 50);
    var depth = bb > 0 ? Math.round(stack / bb) : 0;
    if ($('tb-start-depth')) $('tb-start-depth').textContent = depth ? formatNumber(depth) + ' BB' : '-';
  }

  // Insert one break after the first level that crosses each N-minute mark of
  // play time. Counter resets after each break so subsequent breaks are also N
  // minutes of play apart (break minutes themselves don't count). N <= 0 means
  // no auto-breaks.
  function applyBreakEvery(levels, breakConfig) {
    var n = breakConfig.minutes;
    if (!n || n <= 0) return levels.slice();
    var rows = [];
    var sincePrev = 0;
    levels.forEach(function (level, idx) {
      rows.push(level);
      sincePrev += level.minutes;
      var isLast = idx === levels.length - 1;
      if (sincePrev >= n && !isLast) {
        rows.push({
          id: 'auto-break-' + level.level,
          kind: 'break',
          label: 'Break',
          minutes: Math.max(1, Math.round(breakConfig.breakLength || 10)),
          source: 'inserted'
        });
        sincePrev = 0;
      }
    });
    return rows;
  }

  // Compute per-level ante based on global config. Player antes round down to
  // the nearest 5 so they produce clean numbers and naturally land at 0 for
  // early levels. BB/Button antes equal the level's BB.
  function applyAntes(rows, anteConfig) {
    if (!anteConfig.enabled) {
      return rows.map(function (row) {
        if (row.kind === 'level') row.ante = 0;
        return row;
      });
    }
    return rows.map(function (row) {
      if (row.kind !== 'level') return row;
      if (anteConfig.type === 'player') {
        var target = row.bigBlind * (anteConfig.percentBB / 100);
        row.ante = Math.max(0, Math.floor(target / 5) * 5);
      } else {
        // BB ante and Button ante both default to one BB
        row.ante = row.bigBlind;
      }
      return row;
    });
  }

  function generate() {
    state.generatedInput = collectInput();
    state.solved = solver.solveBlindLevels(state.generatedInput);
    var withBreaks = applyBreakEvery(state.solved.levels, collectBreakConfig());
    state.rows = applyAntes(withBreaks, collectAnteConfig());
    render();
  }

  function currentSchedule() {
    return solver.recalculateSchedule(state.rows);
  }

  function renderTotal(schedule) {
    var levels = schedule.rows.filter(function (row) { return row.kind === 'level'; });
    var breaks = schedule.rows.filter(function (row) { return row.kind === 'break'; });

    $('tb-total').textContent = levels.length + ' levels, ' + breaks.length + ' break' + (breaks.length === 1 ? '' : 's') + ', total schedule ' + formatClock(schedule.totalMinutes) + '.';
  }

  function renderWarnings() {
    var warnings = state.solved ? state.solved.warnings : [];
    $('tb-warnings').innerHTML = warnings.map(function (warning) {
      return '<div class="tb-warning">' + warning.message + '</div>';
    }).join('');
  }

  function blindInput(row, field, ariaLabel) {
    return '<input type="number" min="0" step="1" value="' + row[field] + '" data-row="' + row.id + '" data-field="' + field + '" aria-label="' + ariaLabel + '">';
  }

  function scheduleCell(row, durationField, iconBtn) {
    return [
      '<td data-label="Schedule"><div class="tb-schedule-cell">',
        '<input type="number" min="1" step="1" value="' + row[durationField] + '" data-row="' + row.id + '" data-field="' + durationField + '" aria-label="Duration">',
        '<span class="tb-sched-unit">min</span>',
        '<span class="tb-sched-sep" aria-hidden="true">·</span>',
        '<span class="tb-starts-time">' + formatClock(row.startsAtMinutes) + '</span>',
        iconBtn,
      '</div></td>'
    ].join('');
  }

  function renderLevelRow(row, anteEnabled) {
    var blinds = [
      '<td data-label="Blinds"><div class="tb-blinds-cell">',
        blindInput(row, 'smallBlind', 'Small Blind'),
        '<span class="tb-sep" aria-hidden="true">/</span>',
        blindInput(row, 'bigBlind', 'Big Blind'),
        anteEnabled
          ? '<span class="tb-sep" aria-hidden="true">/</span>' + blindInput(row, 'ante', 'Ante')
          : '',
      '</div></td>'
    ].join('');
    var insertBtn = '<button type="button" class="tb-icon" data-action="insert-break" data-level="' + row.level + '" aria-label="Add break after level ' + row.level + '" title="Add break after">' + COFFEE_SVG + '</button>';
    return [
      '<tr>',
      '<td data-label="Level">' + row.level + '</td>',
      blinds,
      scheduleCell(row, 'minutes', insertBtn),
      '</tr>'
    ].join('');
  }

  function renderBreakRow(row) {
    var removeBtn = '<button type="button" class="tb-icon tb-icon--danger" data-action="remove-row" data-row="' + row.id + '" aria-label="Remove break" title="Remove break">' + CLOSE_SVG + '</button>';
    return [
      '<tr class="tb-row-break">',
      '<td data-label="Break" colspan="2" class="tb-break-cell">',
        '<span class="tb-break-label">' + COFFEE_SVG + 'Break</span>',
      '</td>',
      scheduleCell(row, 'minutes', removeBtn),
      '</tr>'
    ].join('');
  }

  var ANTE_TYPE_LABELS = {
    player: 'every-player ante',
    bb: 'BB ante',
    button: 'button ante'
  };

  function renderBlindsHeader(anteConfig) {
    // Main label tracks the actual columns in the data rows: "SB / BB" or
    // "SB / BB / Ante". The sub-label adds the ante-type qualifier.
    var label = document.getElementById('tb-blinds-label');
    if (label) label.textContent = anteConfig.enabled ? 'SB / BB / Ante' : 'SB / BB';
    var el = document.getElementById('tb-ante-subtitle');
    if (!el) return;
    if (!anteConfig.enabled) {
      el.hidden = true;
      el.textContent = '';
    } else {
      el.hidden = false;
      el.textContent = '+ ' + (ANTE_TYPE_LABELS[anteConfig.type] || 'ante');
    }
  }

  function renderSchedule(schedule, anteEnabled) {
    $('tb-schedule').innerHTML = schedule.rows.map(function (row) {
      return row.kind === 'break' ? renderBreakRow(row) : renderLevelRow(row, anteEnabled);
    }).join('');
  }

  function render() {
    var schedule = currentSchedule();
    var anteConfig = collectAnteConfig();
    renderOpeningStats();
    renderBlindsHeader(anteConfig);
    renderTotal(schedule);
    renderWarnings();
    renderSchedule(schedule, anteConfig.enabled);
  }

  function updateRowFromInput(input) {
    var rowId = input.getAttribute('data-row');
    var field = input.getAttribute('data-field');
    var patch = {};
    if (field === 'label') {
      patch[field] = input.value || 'Break';
    } else {
      patch[field] = Math.max(0, Math.round(Number(input.value) || 0));
    }
    state.rows = solver.updateScheduleRow(state.rows, rowId, patch);
    render();
  }

  function copySchedule() {
    var schedule = currentSchedule();
    var input = state.generatedInput || collectInput();
    var growthEl = $('tb-growth');
    var growthLabel = growthEl && growthEl.options[growthEl.selectedIndex]
      ? growthEl.options[growthEl.selectedIndex].text
      : 'Auto fit';
    var finalLevel = schedule.rows.filter(function (row) { return row.kind === 'level'; }).slice(-1)[0];
    var warnings = state.solved && state.solved.warnings
      ? state.solved.warnings.map(function (warning) { return warning.type; }).join('|')
      : '';
    var lines = [
      'Tournament Blind Structure Config',
      'Players,' + input.players,
      'Starting Stack,' + input.startingStack,
      'Opening Small Blind,' + input.openingSmallBlind,
      'Opening Big Blind,' + input.openingBigBlind,
      'Target Length (min),' + input.targetMinutes,
      'Blind Increases,' + growthLabel,
      'Blind Growth,' + (input.blindGrowth || 'auto'),
      'Opening Blinds Edited,' + (state.openingBlindsEdited ? 'yes' : 'no'),
      'Reference Final BB,' + (state.solved ? state.solved.finalBigBlindTarget : ''),
      'Chosen Final BB,' + (finalLevel ? finalLevel.bigBlind : ''),
      'Generated Level Minutes,' + (state.solved ? state.solved.levelMinutes : ''),
      'Minimum Level Minutes,' + (state.solved ? state.solved.minimumLevelMinutes : ''),
      'Total Schedule Minutes,' + schedule.totalMinutes,
      'Warnings,' + warnings,
      '',
      'Level,Small Blind,Big Blind,Ante,Duration,Starts'
    ];
    schedule.rows.forEach(function (row) {
      if (row.kind === 'break') {
        lines.push([row.label, '', '', '', row.minutes + ' min', formatClock(row.startsAtMinutes)].join(','));
      } else {
        lines.push([row.level, row.smallBlind, row.bigBlind, row.ante || '', row.minutes + ' min', formatClock(row.startsAtMinutes)].join(','));
      }
    });
    var text = lines.join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
  }

  function syncAnteUI() {
    var enabled = !!($('tb-ante-toggle') && $('tb-ante-toggle').checked);
    var typeEl = document.querySelector('input[name="tb-ante-type"]:checked');
    // Percent input only applies to the "every player" ante type.
    var pctVisible = enabled && (!typeEl || typeEl.value === 'player');

    var segments = $('tb-ante-segments');
    if (segments) segments.hidden = !enabled;
    var pctLabel = $('tb-ante-percent-label');
    if (pctLabel) pctLabel.hidden = !pctVisible;
    var pctInput = $('tb-ante-percent-input');
    if (pctInput) pctInput.hidden = !pctVisible;
  }

  function bind() {
    $('tb-form').addEventListener('input', function (event) {
      if (!event.target || !event.target.matches('input, select')) return;
      if (event.target.id === 'tb-stack' && !state.openingBlindsEdited) {
        prefillOpeningBlinds();
      }
      if (event.target.id === 'tb-small-blind' || event.target.id === 'tb-big-blind') {
        state.openingBlindsEdited = true;
      }
      window.clearTimeout(state.regenerateTimer);
      state.regenerateTimer = window.setTimeout(generate, 220);
    });

    $('tb-form').addEventListener('change', function (event) {
      if (!event.target || !event.target.matches('input, select')) return;
      if (event.target.id === 'tb-stack' && !state.openingBlindsEdited) {
        prefillOpeningBlinds();
      }
      if (event.target.id === 'tb-small-blind' || event.target.id === 'tb-big-blind') {
        state.openingBlindsEdited = true;
      }
      if (event.target.id === 'tb-ante-toggle' || event.target.name === 'tb-ante-type') {
        syncAnteUI();
      }
      window.clearTimeout(state.regenerateTimer);
      generate();
    });

    $('tb-reset').addEventListener('click', function () {
      generate();
    });

    $('tb-copy').addEventListener('click', function () {
      copySchedule();
      $('tb-copy').textContent = 'Copied';
      window.setTimeout(function () {
        $('tb-copy').textContent = 'Copy Schedule';
      }, 1200);
    });

    $('tb-schedule').addEventListener('change', function (event) {
      if (event.target && event.target.getAttribute('data-row')) updateRowFromInput(event.target);
    });

    $('tb-schedule').addEventListener('click', function (event) {
      // event.target can be the inner SVG/path when clicking an icon button —
      // walk up to the nearest element that carries the action attribute.
      var target = event.target.closest && event.target.closest('[data-action]');
      if (!target) return;
      var action = target.getAttribute('data-action');
      if (action === 'insert-break') {
        state.rows = solver.insertBreakAfterLevel(state.rows, Number(target.getAttribute('data-level')), {
          label: 'Break',
          minutes: 10
        });
        render();
      }
      if (action === 'remove-row') {
        state.rows = solver.removeScheduleRow(state.rows, target.getAttribute('data-row'));
        render();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bind();
    prefillOpeningBlinds();
    syncAnteUI();
    generate();
  });
})();
