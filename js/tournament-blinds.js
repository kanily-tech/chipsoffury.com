/**
 * Tournament blind structure helpers.
 *
 * The solver only generates blind levels. Breaks and manual edits are layered
 * on top so the calculation stays testable without the browser UI.
 */

var TournamentBlinds = (function () {
  var DEFAULT_TOURNAMENT_DENOMINATIONS = [25, 100, 500, 1000, 5000];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function toNumber(value, fallback) {
    var n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function uniqueSorted(values) {
    var seen = {};
    var result = [];
    values.forEach(function (value) {
      var n = Math.round(Number(value));
      if (n > 0 && !seen[n]) {
        seen[n] = true;
        result.push(n);
      }
    });
    return result.sort(function (a, b) { return a - b; });
  }

  function minimumLevelMinutes(players) {
    return clamp(Math.round(toNumber(players, 6) * 2), 10, 20);
  }

  function buildPracticalValues(minValue, maxValue, chipDenominations) {
    var denoms = uniqueSorted(chipDenominations || [25, 100, 500, 1000]);
    var smallest = denoms.length ? denoms[0] : 25;
    var values = [minValue].concat(denoms);
    var multipliers = [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10];
    var pow = 1;

    while (pow <= maxValue * 10) {
      multipliers.forEach(function (m) {
        values.push(m * pow);
      });
      pow *= 10;
    }

    denoms.forEach(function (denom) {
      [1, 2, 3, 4, 5, 8, 10, 20].forEach(function (m) {
        values.push(denom * m);
      });
    });

    return uniqueSorted(values.map(function (value) {
      return Math.max(smallest, Math.round(value / smallest) * smallest);
    })).filter(function (value) {
      return value >= Math.max(1, Math.floor(minValue / 2)) && value <= maxValue * 1.35;
    });
  }

  function buildBigBlindValues(openingBigBlind, finalBigBlindTarget, chipDenominations) {
    var smallBlindValues = buildPracticalValues(
      Math.max(1, Math.round(openingBigBlind / 2)),
      Math.max(openingBigBlind, finalBigBlindTarget / 2),
      chipDenominations
    );
    return uniqueSorted(smallBlindValues.map(function (smallBlind) {
      return smallBlind * 2;
    })).filter(function (bigBlind) {
      return bigBlind >= openingBigBlind && bigBlind <= finalBigBlindTarget * 1.5;
    });
  }

  function chooseOpeningBlinds(startingStack, chipDenominations) {
    var stack = Math.max(1, Math.round(toNumber(startingStack, 5000)));
    var denoms = uniqueSorted(chipDenominations || DEFAULT_TOURNAMENT_DENOMINATIONS);
    var targetBigBlind = stack / 100;
    var bigBlindValues = buildBigBlindValues(2, Math.max(targetBigBlind, 100000), denoms);
    var bigBlind = nearestPracticalValue(targetBigBlind, bigBlindValues, { atLeast: 2 });

    return {
      smallBlind: Math.round(bigBlind / 2),
      bigBlind: bigBlind
    };
  }

  function nearestPracticalValue(value, practicalValues, options) {
    var opts = options || {};
    var best = null;
    practicalValues.forEach(function (candidate) {
      if (opts.above && candidate <= opts.above) return;
      if (opts.atLeast && candidate < opts.atLeast) return;
      var distance = Math.abs(candidate - value);
      var upwardPenalty = candidate < value ? distance * 0.08 : 0;
      var score = distance + upwardPenalty;
      if (!best || score < best.score || (score === best.score && candidate > best.value)) {
        best = { value: candidate, score: score };
      }
    });
    return best ? best.value : Math.max(opts.above ? opts.above + 1 : 1, Math.round(value));
  }

  function chooseLevelCount(openingBigBlind, finalBigBlindTarget, blindGrowth) {
    if (openingBigBlind <= 0 || finalBigBlindTarget <= openingBigBlind) return 1;
    return Math.max(2, Math.ceil(Math.log(finalBigBlindTarget / openingBigBlind) / Math.log(blindGrowth)) + 1);
  }

  function chooseLevelMinutes(targetMinutes, levelCount, minimum) {
    var raw = Math.max(1, Math.floor(targetMinutes / Math.max(1, levelCount)));
    if (raw < minimum) return minimum;
    return raw;
  }

  function makeLevel(id, levelNumber, smallBlind, bigBlind, minutes) {
    return {
      id: id,
      kind: 'level',
      level: levelNumber,
      smallBlind: smallBlind,
      bigBlind: bigBlind,
      ante: 0,
      minutes: minutes,
      source: 'generated'
    };
  }

  function solveBlindLevels(input) {
    var players = clamp(Math.round(toNumber(input.players, 6)), 2, 30);
    var startingStack = Math.max(1, Math.round(toNumber(input.startingStack, 5000)));
    var openingSmallBlind = Math.max(1, Math.round(toNumber(input.openingSmallBlind, 25)));
    var openingBigBlind = Math.max(openingSmallBlind * 2, Math.round(toNumber(input.openingBigBlind, 50)));
    var targetMinutes = Math.max(10, Math.round(toNumber(input.targetMinutes, 180)));
    var denoms = uniqueSorted(input.chipDenominations || DEFAULT_TOURNAMENT_DENOMINATIONS);
    var finalBigBlindTarget = startingStack * players / 10;
    var bigBlindValues = buildBigBlindValues(openingBigBlind, finalBigBlindTarget, denoms);
    var finalBigBlind = nearestPracticalValue(finalBigBlindTarget, bigBlindValues, {
      atLeast: openingBigBlind
    });
    var minMinutes = minimumLevelMinutes(players);
    var maxLevelsForTarget = Math.max(2, Math.floor(targetMinutes / minMinutes));
    var autoGrowth = 1.6;
    var levelCount = chooseLevelCount(openingBigBlind, finalBigBlind, autoGrowth);
    var compressedForTarget = false;
    if (!Number.isFinite(input.blindGrowth) && levelCount > maxLevelsForTarget) {
      levelCount = maxLevelsForTarget;
      autoGrowth = Math.pow(finalBigBlind / openingBigBlind, 1 / Math.max(1, levelCount - 1));
      compressedForTarget = true;
    }
    var requestedGrowth = toNumber(input.blindGrowth, autoGrowth);
    var blindGrowth = clamp(requestedGrowth, 1.2, 3);
    if (Number.isFinite(input.blindGrowth)) {
      levelCount = chooseLevelCount(openingBigBlind, finalBigBlind, blindGrowth);
    } else {
      blindGrowth = autoGrowth;
    }
    var levelMinutes = chooseLevelMinutes(targetMinutes, levelCount, minMinutes);
    var estimatedPlayMinutes = levelCount * levelMinutes;
    var warnings = [];

    if (autoGrowth > 2.2 || targetMinutes < minMinutes * 2) {
      warnings.push({
        type: 'target_too_short',
        message: 'This target length is very tight for the table size. The calculator keeps level duration practical, so the generated schedule may run longer than requested.'
      });
    }

    if (estimatedPlayMinutes > targetMinutes) {
      warnings.push({
        type: 'target_exceeded',
        message: 'This blind progression needs more playing time than the target allows. Use faster increases, a shorter stack, or a longer target length.'
      });
    }

    var levels = [];
    var previousBigBlind = 0;
    var growth = levelCount > 1 ? Math.pow(finalBigBlind / openingBigBlind, 1 / (levelCount - 1)) : 1;

    for (var i = 0; i < levelCount; i++) {
      var bigBlind;
      if (i === 0) {
        bigBlind = openingBigBlind;
      } else if (i === levelCount - 1) {
        bigBlind = Math.max(finalBigBlind, previousBigBlind + denoms[0] * 2);
      } else {
        bigBlind = nearestPracticalValue(openingBigBlind * Math.pow(growth, i), bigBlindValues, {
          above: previousBigBlind
        });
      }

      var smallBlind = i === 0 ? openingSmallBlind : Math.round(bigBlind / 2);

      levels.push(makeLevel('level-' + (i + 1), i + 1, smallBlind, bigBlind, levelMinutes));
      previousBigBlind = bigBlind;
    }

    return {
      levels: levels,
      levelMinutes: levelMinutes,
      minimumLevelMinutes: minMinutes,
      estimatedPlayMinutes: estimatedPlayMinutes,
      finalBigBlindTarget: finalBigBlindTarget,
      roundedFinalBigBlind: finalBigBlind,
      blindGrowth: blindGrowth,
      warnings: warnings
    };
  }

  function cloneRow(row) {
    var copy = {};
    Object.keys(row).forEach(function (key) {
      copy[key] = row[key];
    });
    return copy;
  }

  function insertBreakAfterLevel(rows, afterLevel, breakRow) {
    var inserted = false;
    var result = [];
    rows.forEach(function (row) {
      result.push(cloneRow(row));
      if (!inserted && row.kind === 'level' && row.level === afterLevel) {
        result.push({
          id: 'break-after-' + afterLevel + '-' + Date.now(),
          kind: 'break',
          label: breakRow && breakRow.label ? breakRow.label : 'Break',
          minutes: Math.max(1, Math.round(toNumber(breakRow && breakRow.minutes, 10))),
          source: 'inserted'
        });
        inserted = true;
      }
    });
    return result;
  }

  function removeScheduleRow(rows, rowId) {
    return rows.filter(function (row) {
      return row.id !== rowId;
    }).map(cloneRow);
  }

  function updateScheduleRow(rows, rowId, patch) {
    return rows.map(function (row) {
      var next = cloneRow(row);
      if (next.id === rowId) {
        Object.keys(patch || {}).forEach(function (key) {
          if (key !== 'id' && key !== 'kind' && key !== 'level') next[key] = patch[key];
        });
        next.source = 'edited';
      }
      return next;
    });
  }

  function recalculateSchedule(rows) {
    var elapsed = 0;
    var levelNumber = 1;
    var nextRows = rows.map(function (row) {
      var next = cloneRow(row);
      next.startsAtMinutes = elapsed;
      next.minutes = Math.max(1, Math.round(toNumber(next.minutes, 1)));
      if (next.kind === 'level') {
        next.level = levelNumber++;
        next.smallBlind = Math.max(1, Math.round(toNumber(next.smallBlind, 1)));
        next.bigBlind = Math.max(next.smallBlind + 1, Math.round(toNumber(next.bigBlind, next.smallBlind * 2)));
        next.ante = Math.max(0, Math.round(toNumber(next.ante, 0)));
      } else {
        next.label = next.label || 'Break';
      }
      elapsed += next.minutes;
      return next;
    });

    return {
      rows: nextRows,
      totalMinutes: elapsed
    };
  }

  function formatMinutes(totalMinutes) {
    var minutes = Math.max(0, Math.round(toNumber(totalMinutes, 0)));
    var hours = Math.floor(minutes / 60);
    var remainder = minutes % 60;
    if (hours <= 0) return remainder + ' min';
    return hours + ':' + String(remainder).padStart(2, '0');
  }

  return {
    chooseOpeningBlinds: chooseOpeningBlinds,
    solveBlindLevels: solveBlindLevels,
    insertBreakAfterLevel: insertBreakAfterLevel,
    removeScheduleRow: removeScheduleRow,
    updateScheduleRow: updateScheduleRow,
    recalculateSchedule: recalculateSchedule,
    formatMinutes: formatMinutes,
    _minimumLevelMinutes: minimumLevelMinutes,
    _buildPracticalValues: buildPracticalValues
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TournamentBlinds;
}
