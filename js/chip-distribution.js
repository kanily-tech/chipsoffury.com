/**
 * Chip Distribution Calculator
 *
 * Calculates optimal per-player chip breakdown for home poker games.
 * Uses an exact bounded solver with chip-playability preferences.
 * All allocations strictly respect the physical supply constraint
 * (totalCount / playerCount per denomination).
 */

var ChipDistribution = (function () {

  function round2(v) { return Math.round(v * 100) / 100; }
  function toCents(v) { return Math.round(v * 100); }
  function gcdInt(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      var t = a % b;
      a = b;
      b = t;
    }
    return a;
  }

  /**
   * Exact bounded allocation with preference scoring.
   *
   * Solves a bounded integer optimization:
   *  - exact target value when possible
   *  - otherwise closest reachable value below target
   *  - among ties, prefer distributions close to a playable small-chip profile
   *    (roughly 20/15/10/... for small denominations) and with more small chips.
   *
   * @param {number} buyIn - Amount to distribute
   * @param {Array<{value:number}>} sorted - Denominations sorted ascending by value
   * @param {Object<number,number>} supplyPerPlayer - Max chips per player per denomination
   * @returns {Object<number,number>} - Map of denomination value → chip count per player
   */
  function allocate(buyIn, sorted, supplyPerPlayer) {
    var chips = {};
    var numDenoms = sorted.length;
    if (numDenoms === 0 || buyIn <= 0) return chips;

    // Normalize all values to integer units (GCD of cents) for stable DP.
    var denomCents = new Array(numDenoms);
    for (var i = 0; i < numDenoms; i++) {
      denomCents[i] = toCents(sorted[i].value);
    }
    var unit = denomCents[0];
    for (var g = 1; g < numDenoms; g++) {
      unit = gcdInt(unit, denomCents[g]);
    }
    if (!unit || unit < 1) unit = 1;

    var targetUnits = Math.round(toCents(buyIn) / unit);
    if (targetUnits <= 0) return chips;

    var values = new Array(numDenoms);
    var caps = new Array(numDenoms);
    var prefs = new Array(numDenoms);

    for (var j = 0; j < numDenoms; j++) {
      values[j] = Math.round(denomCents[j] / unit);
      if (values[j] <= 0) values[j] = 1;

      var capRaw = supplyPerPlayer[sorted[j].value];
      if (capRaw === undefined || capRaw < 0) capRaw = 0;
      caps[j] = Math.min(capRaw, Math.floor(targetUnits / values[j]));

      // Preferred profile: many small chips, few/no largest chips unless needed.
      if (numDenoms === 1) {
        prefs[j] = caps[j];
      } else if (j === numDenoms - 1) {
        prefs[j] = 0;
      } else {
        var baseTarget = Math.max(5, 20 - 5 * j);
        prefs[j] = Math.min(baseTarget, caps[j]);
      }
    }

    var INF = 1000000000;
    var NEG = -INF;
    var dpCost = new Int32Array(targetUnits + 1);
    var dpUtil = new Int32Array(targetUnits + 1);
    for (var a = 0; a <= targetUnits; a++) {
      dpCost[a] = INF;
      dpUtil[a] = NEG;
    }
    dpCost[0] = 0;
    dpUtil[0] = 0;

    var choiceByDenom = [];
    var prevAmtByDenom = [];
    var active = [0];

    for (var di = 0; di < numDenoms; di++) {
      var nextCost = new Int32Array(targetUnits + 1);
      var nextUtil = new Int32Array(targetUnits + 1);
      for (var a2 = 0; a2 <= targetUnits; a2++) {
        nextCost[a2] = INF;
        nextUtil[a2] = NEG;
      }

      var choice = new Int32Array(targetUnits + 1);
      var prev = new Int32Array(targetUnits + 1);
      for (var a3 = 0; a3 <= targetUnits; a3++) {
        choice[a3] = -1;
        prev[a3] = -1;
      }

      var nextActiveFlags = new Uint8Array(targetUnits + 1);
      var nextActive = [];

      var denomValue = values[di];
      var denomCap = caps[di];
      var pref = prefs[di];
      var devWeight = (numDenoms - di) * (numDenoms - di); // smaller denoms matter more
      var utilWeight = (numDenoms - di) * 2 + 1; // tie-break toward more/smaller chips

      for (var idx = 0; idx < active.length; idx++) {
        var amount = active[idx];
        var baseCost2 = dpCost[amount];
        var baseUtil = dpUtil[amount];
        var maxAdd = Math.min(denomCap, Math.floor((targetUnits - amount) / denomValue));

        for (var count = 0; count <= maxAdd; count++) {
          var nextAmount = amount + count * denomValue;
          var candCost = baseCost2 + devWeight * Math.abs(count - pref);
          var candUtil = baseUtil + utilWeight * count;

          if (candCost < nextCost[nextAmount] || (candCost === nextCost[nextAmount] && candUtil > nextUtil[nextAmount])) {
            nextCost[nextAmount] = candCost;
            nextUtil[nextAmount] = candUtil;
            choice[nextAmount] = count;
            prev[nextAmount] = amount;

            if (!nextActiveFlags[nextAmount]) {
              nextActiveFlags[nextAmount] = 1;
              nextActive.push(nextAmount);
            }
          }
        }
      }

      dpCost = nextCost;
      dpUtil = nextUtil;
      choiceByDenom.push(choice);
      prevAmtByDenom.push(prev);
      active = nextActive;
      if (active.length === 0) break;
    }

    // Prefer exact target. If impossible, choose highest reachable below target.
    var bestUnits = -1;
    if (dpCost[targetUnits] < INF) {
      bestUnits = targetUnits;
    } else {
      for (var amount2 = targetUnits; amount2 >= 0; amount2--) {
        if (dpCost[amount2] >= INF) continue;
        if (bestUnits < 0 || amount2 > bestUnits ||
          (amount2 === bestUnits && (dpCost[amount2] < dpCost[bestUnits] ||
            (dpCost[amount2] === dpCost[bestUnits] && dpUtil[amount2] > dpUtil[bestUnits])))) {
          bestUnits = amount2;
        }
      }
    }

    if (bestUnits < 0) return chips;

    var counts = new Array(numDenoms);
    for (var z = 0; z < numDenoms; z++) counts[z] = 0;

    var cursor = bestUnits;
    for (var back = numDenoms - 1; back >= 0; back--) {
      var picked = choiceByDenom[back][cursor];
      if (picked < 0) picked = 0;
      counts[back] = picked;
      var prevAmt = prevAmtByDenom[back][cursor];
      cursor = (prevAmt >= 0) ? prevAmt : 0;
    }

    for (var out = 0; out < numDenoms; out++) {
      if (counts[out] > 0) chips[sorted[out].value] = counts[out];
    }

    return chips;
  }

  /**
   * Main distribution function.
   *
   * @param {number} buyIn - Buy-in amount in dollars
   * @param {Array<{value:number, totalCount:number, color:string, name:string}>} denominations
   * @param {number} playerCount
   * @returns {{chips: Object<number,number>, warnings: Array<{type:string, severity:string, message:string}>, adjustedBuyIn: number}}
   */
  function distribute(buyIn, denominations, playerCount) {
    var warnings = [];

    var sorted = denominations.slice().sort(function (a, b) { return a.value - b.value; });

    if (sorted.length === 0) {
      return { chips: {}, warnings: [{ type: 'no_denominations', severity: 'red', message: 'Add at least one chip denomination.' }], adjustedBuyIn: buyIn };
    }

    var smallest = sorted[0].value;

    // Adjust buy-in to be divisible by smallest denomination
    var adjustedBuyIn = buyIn;
    var remainder = buyIn % smallest;
    if (remainder !== 0) {
      adjustedBuyIn = Math.round(buyIn / smallest) * smallest;
      if (adjustedBuyIn === 0) adjustedBuyIn = smallest;
      warnings.push({
        type: 'uneven_buyin',
        severity: 'yellow',
        message: 'Buy-in adjusted to $' + adjustedBuyIn.toFixed(2).replace(/\.?0+$/, '') + ' to match smallest chip value.'
      });
    }

    // Build supply-per-player map
    var supplyPerPlayer = {};
    for (var i = 0; i < sorted.length; i++) {
      supplyPerPlayer[sorted[i].value] = Math.floor(sorted[i].totalCount / playerCount);
    }

    // Run allocation
    var chips = allocate(adjustedBuyIn, sorted, supplyPerPlayer);

    // Remove zero or negative entries
    for (var v3 in chips) {
      if (chips.hasOwnProperty(v3) && chips[v3] <= 0) {
        delete chips[v3];
      }
    }

    // Check if total matches buy-in (impossible distribution)
    var totalVal = 0;
    var totalChips = 0;
    for (var v4 in chips) {
      if (chips.hasOwnProperty(v4)) {
        totalVal += parseFloat(v4) * chips[v4];
        totalChips += chips[v4];
      }
    }
    totalVal = round2(totalVal);

    if (round2(adjustedBuyIn - totalVal) > 0) {
      warnings.push({
        type: 'impossible',
        severity: 'red',
        message: 'Can\'t distribute exactly ' + formatDollars(adjustedBuyIn) + ' with this chip set for ' + playerCount + ' players. Closest: ' + formatDollars(totalVal) + '. Adjust buy-in, chip values, or player count.'
      });
    }

    // Few chips warning
    if (totalChips > 0 && totalChips < 20) {
      warnings.push({
        type: 'few_chips',
        severity: 'yellow',
        message: 'Only ' + totalChips + ' chips per player. Games play better with 30+ chips each.'
      });
    }

    // Too few denominations
    if (Object.keys(chips).length <= 1 && sorted.length <= 1 && adjustedBuyIn > 20) {
      warnings.push({
        type: 'few_denominations',
        severity: 'yellow',
        message: 'Consider adding more denominations for smoother betting.'
      });
    }

    return { chips: chips, warnings: warnings, adjustedBuyIn: adjustedBuyIn };
  }

  /**
   * Check for blind-related warnings.
   */
  function checkBlindWarnings(smallBlind, denominations) {
    var warnings = [];
    if (denominations.length === 0) return warnings;

    var sorted = denominations.slice().sort(function (a, b) { return a.value - b.value; });
    if (sorted[0].value > smallBlind) {
      warnings.push({
        type: 'blind_mismatch',
        severity: 'red',
        message: 'Smallest chip ($' + sorted[0].value + ') is bigger than the small blind ($' + smallBlind + '). Add a smaller denomination.'
      });
    }

    return warnings;
  }

  function formatDollars(v) {
    if (v < 1) return Math.round(v * 100) + '\u00a2';
    if (v === Math.floor(v)) return '$' + v;
    return '$' + v.toFixed(2);
  }

  function getTotalValue(chips) {
    var total = 0;
    for (var v in chips) {
      if (chips.hasOwnProperty(v)) total += parseFloat(v) * chips[v];
    }
    return round2(total);
  }

  function getTotalCount(chips) {
    var total = 0;
    for (var v in chips) {
      if (chips.hasOwnProperty(v)) total += chips[v];
    }
    return total;
  }

  function valuesKey(values) {
    return values.map(function (v) { return round2(v).toFixed(2); }).join('|');
  }

  function mapValuesToChipSet(chipSet, ladderValues) {
    var indexed = chipSet.map(function (c, idx) { return { idx: idx, totalCount: c.totalCount || 0 }; });
    indexed.sort(function (a, b) {
      if (b.totalCount !== a.totalCount) return b.totalCount - a.totalCount;
      return a.idx - b.idx;
    });

    var values = new Array(chipSet.length);
    for (var i = 0; i < indexed.length; i++) {
      values[indexed[i].idx] = ladderValues[i];
    }
    return values;
  }

  function buildDenominations(chipSet, values) {
    var denoms = [];
    for (var i = 0; i < chipSet.length; i++) {
      var c = chipSet[i];
      var value = round2(values[i]);
      var count = parseInt(c.totalCount, 10);
      if (!isFinite(value) || value <= 0 || !isFinite(count) || count <= 0) continue;
      denoms.push({
        value: value,
        totalCount: count,
        color: c.color || '#9ca3af',
        name: c.name || ('Chip ' + (i + 1))
      });
    }
    return denoms;
  }

  function makeLadder(baseValue, pattern, length) {
    var baseCents = Math.max(1, toCents(baseValue));
    var values = [];
    var prev = 0;
    for (var i = 0; i < length; i++) {
      var mult;
      if (i < pattern.length) {
        mult = pattern[i];
      } else {
        mult = pattern[pattern.length - 1] * Math.pow(5, i - pattern.length + 1);
      }
      var cents = Math.max(1, Math.round(baseCents * mult));
      if (cents <= prev) cents = prev + 1;
      values.push(round2(cents / 100));
      prev = cents;
    }
    return values;
  }

  function assessMapping(buyIn, chipSet, values, playerCount, smallBlind) {
    var denoms = buildDenominations(chipSet, values);
    var distribution = distribute(buyIn, denoms, playerCount);
    var totalValue = getTotalValue(distribution.chips);
    var totalCount = getTotalCount(distribution.chips);
    var shortfall = round2(distribution.adjustedBuyIn - totalValue);
    var impossible = shortfall > 0.001;

    var sortedValues = values.slice().sort(function (a, b) { return a - b; });
    var small1 = sortedValues[0] || 0;
    var small2 = sortedValues[1] || 0;
    var smallCount = (distribution.chips[small1] || 0) + (distribution.chips[small2] || 0);
    var blindMismatch = (smallBlind > 0 && small1 > smallBlind + 1e-9);

    var balancedScore = 0;
    if (impossible) balancedScore += 100000 + shortfall * 1000;
    if (blindMismatch) balancedScore += 8000 + (small1 - smallBlind) * 1000;
    balancedScore += Math.abs(totalCount - 32) * 3;
    if (smallCount < 12) balancedScore += (12 - smallCount) * 10;
    if (totalCount < 20) balancedScore += 120;

    var ratioPenalty = 0;
    for (var i = 1; i < sortedValues.length; i++) {
      var ratio = sortedValues[i] / sortedValues[i - 1];
      if (ratio > 8) ratioPenalty += 8;
      if (ratio < 1.5) ratioPenalty += 8;
    }
    balancedScore += ratioPenalty;

    var hasFewChips = distribution.warnings.some(function (w) { return w.type === 'few_chips'; });
    if (hasFewChips) balancedScore += 40;

    return {
      values: values.slice(),
      denominations: denoms,
      distribution: distribution,
      metrics: {
        totalValue: totalValue,
        totalCount: totalCount,
        shortfall: shortfall,
        smallCount: smallCount,
        smallestValue: small1,
        blindMismatch: blindMismatch,
        exact: !impossible,
        balancedScore: balancedScore,
        smallScore: balancedScore - smallCount * 2,
        compactScore: balancedScore + totalCount * 1.5
      }
    };
  }

  /**
   * Suggest cash-game blinds for a buy-in, targeting 50-150 big blinds.
   * Uses conventional blind pairs (e.g. 1/2, 2/5, 5/10) by default.
   *
   * @param {number} buyIn
   * @param {{minBB?:number,maxBB?:number}} [opts]
   * @returns {{smallBlind:number,bigBlind:number,stackBB:number}}
   */
  function suggestBlinds(buyIn, opts) {
    opts = opts || {};
    var minStack = opts.minBB || 50;
    var maxStack = opts.maxBB || 150;
    if (buyIn <= 0) return { smallBlind: 0.25, bigBlind: 0.5, stackBB: 100 };

    var minBBValue = buyIn / maxStack;
    var maxBBValue = buyIn / minStack;

    // Ordered by common home/casino cash-game usage.
    var conventionalPairs = [
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

    var candidates = conventionalPairs.filter(function (pair) {
      return pair.bb >= minBBValue - 1e-9 && pair.bb <= maxBBValue + 1e-9;
    });

    if (!candidates.length) {
      // Choose the nearest conventional pair if none lands in range.
      candidates = conventionalPairs.slice();
    }

    var best = candidates[0];
    var bestScore = Infinity;
    for (var i = 0; i < candidates.length; i++) {
      var p = candidates[i];
      var stackBB = buyIn / p.bb;
      var score = Math.abs(stackBB - 100);
      // Small tie-breaker toward in-range pairs.
      if (p.bb < minBBValue || p.bb > maxBBValue) score += 6;
      if (score < bestScore) {
        bestScore = score;
        best = p;
      }
    }

    return {
      smallBlind: round2(best.sb),
      bigBlind: round2(best.bb),
      stackBB: round2(buyIn / best.bb)
    };
  }

  /**
   * Suggest denomination mappings for unmarked chip sets.
   *
   * @param {{
   *   buyIn:number,
   *   playerCount:number,
   *   smallBlind:number,
   *   bigBlind:number,
   *   chipSet:Array<{color:string,totalCount:number,name?:string}>,
   *   preferredValues?:Array<number>,
   *   maxOptions?:number
   * }} input
   * @returns {Array<{label:string,values:number[],denominations:Array,distribution:Object,metrics:Object}>}
   */
  function suggestDenominationMappings(input) {
    var buyIn = input.buyIn;
    var playerCount = input.playerCount;
    var smallBlind = input.smallBlind;
    var bigBlind = input.bigBlind;
    var chipSet = (input.chipSet || []).slice();
    var preferredValues = input.preferredValues || null;
    var maxOptions = input.maxOptions || 3;

    if (!chipSet.length || buyIn <= 0 || playerCount <= 0) return [];

    var blindUnit = (smallBlind > 0) ? smallBlind : (bigBlind > 0 ? bigBlind / 2 : 0.25);
    if (blindUnit <= 0) blindUnit = 0.25;
    var cleanIncrement = blindUnit >= 0.25 ? 0.25 : (blindUnit >= 0.1 ? 0.1 : 0.05);

    // Conventional denomination ladders only (prevents odd values like 0.07/0.35/1.75/7).
    var ladderLibrary = [
      [0.25, 1, 5, 25, 100, 500, 1000, 5000],
      [0.5, 1, 5, 25, 100, 500, 1000, 5000],
      [1, 2, 5, 25, 100, 500, 1000, 5000],
      [1, 5, 25, 100, 500, 1000, 5000, 25000],
      [1, 5, 10, 25, 100, 500, 1000, 5000],
      [2, 5, 25, 100, 500, 1000, 5000, 25000],
      [5, 25, 100, 500, 1000, 5000, 25000, 100000]
    ];

    var candidateMap = {};

    function isCleanValue(v) {
      var k = Math.round(v / cleanIncrement);
      return Math.abs(k * cleanIncrement - v) < 0.001;
    }

    function isConventionalCandidate(values) {
      if (!values || values.length !== chipSet.length) return false;
      for (var i = 0; i < values.length; i++) {
        if (!isFinite(values[i]) || values[i] <= 0) return false;
        if (!isCleanValue(values[i])) return false;
        if (i > 0 && values[i] <= values[i - 1]) return false;
      }
      return true;
    }

    function addCandidate(values) {
      if (!isConventionalCandidate(values)) return;
      var key = valuesKey(values);
      var assessed = assessMapping(buyIn, chipSet, values, playerCount, smallBlind);
      if (!candidateMap[key] || assessed.metrics.balancedScore < candidateMap[key].metrics.balancedScore) {
        candidateMap[key] = assessed;
      }
    }

    if (preferredValues && preferredValues.length === chipSet.length) {
      addCandidate(preferredValues.map(function (v) { return round2(v); }));
    }

    // Generate conventional candidates by taking contiguous windows from known ladders.
    for (var li = 0; li < ladderLibrary.length; li++) {
      var ladder = ladderLibrary[li];
      if (ladder.length < chipSet.length) continue;
      for (var start = 0; start <= ladder.length - chipSet.length; start++) {
        var slice = ladder.slice(start, start + chipSet.length);
        var mapped = mapValuesToChipSet(chipSet, slice);
        addCandidate(mapped);
      }
    }

    var candidates = Object.keys(candidateMap).map(function (k) { return candidateMap[k]; });
    if (!candidates.length) return [];

    var targetSmall = smallBlind > 0 ? smallBlind : (bigBlind > 0 ? bigBlind / 2 : 0);
    var canUseSmallBlindAsFloor = false;
    if (smallBlind > 0 && bigBlind > 0) {
      var sbCents = toCents(smallBlind);
      var bbCents = toCents(bigBlind);
      canUseSmallBlindAsFloor = (sbCents > 0 && bbCents > 0 && (bbCents % sbCents) === 0);
    }

    function candidateKey(c) {
      return valuesKey(c.values);
    }

    function compareKey(a, b) {
      var ak = candidateKey(a);
      var bk = candidateKey(b);
      if (ak < bk) return -1;
      if (ak > bk) return 1;
      return 0;
    }

    function compareBalanced(a, b) {
      if (a.metrics.balancedScore !== b.metrics.balancedScore) return a.metrics.balancedScore - b.metrics.balancedScore;
      var aBlindGap = Math.abs((a.metrics.smallestValue || 0) - targetSmall);
      var bBlindGap = Math.abs((b.metrics.smallestValue || 0) - targetSmall);
      if (aBlindGap !== bBlindGap) return aBlindGap - bBlindGap;
      if (a.metrics.totalCount !== b.metrics.totalCount) return a.metrics.totalCount - b.metrics.totalCount;
      return compareKey(a, b);
    }

    function hasDistributionWarning(c, type) {
      return c.distribution && c.distribution.warnings && c.distribution.warnings.some(function (w) {
        return w.type === type;
      });
    }

    function isPlayable(c) {
      if (smallBlind > 0 && c.metrics.smallestValue > smallBlind + 1e-9) return false;
      if (hasDistributionWarning(c, 'impossible')) return false;
      return true;
    }

    var playable = candidates.filter(isPlayable);
    var pool = playable.length ? playable : candidates;
    if (canUseSmallBlindAsFloor && pool.length) {
      var noSubSmallBlind = pool.filter(function (c) {
        return (c.metrics.smallestValue || 0) >= smallBlind - 1e-9;
      });
      if (noSubSmallBlind.length) pool = noSubSmallBlind;
    }
    pool.sort(compareBalanced);
    if (!pool.length) return [];

    var chosen = pool[0];
    return [{
      label: 'Recommended',
      values: chosen.values.slice(),
      denominations: chosen.denominations,
      distribution: chosen.distribution,
      metrics: chosen.metrics
    }];
  }

  return {
    distribute: distribute,
    suggestBlinds: suggestBlinds,
    suggestDenominationMappings: suggestDenominationMappings,
    checkBlindWarnings: checkBlindWarnings,
    formatDollars: formatDollars,
    _allocate: allocate
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChipDistribution;
}
