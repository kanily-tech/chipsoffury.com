var assert = require('assert');
var ChipDistribution = require('./chip-distribution');

var passed = 0;
var failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('  \u2713 ' + name);
    passed++;
  } catch (e) {
    console.log('  \u2717 ' + name);
    console.log('    ' + e.message);
    failed++;
  }
}

function totalValue(chips) {
  var sum = 0;
  for (var v in chips) {
    if (chips.hasOwnProperty(v)) sum += parseFloat(v) * chips[v];
  }
  return Math.round(sum * 100) / 100;
}

function totalCount(chips) {
  var sum = 0;
  for (var v in chips) {
    if (chips.hasOwnProperty(v)) sum += chips[v];
  }
  return sum;
}

function hasWarning(warnings, type) {
  return warnings.some(function (w) { return w.type === type; });
}

// Returns max chips per player for a denomination given totalCount and playerCount
function maxPerPlayer(totalChipCount, playerCount) {
  return Math.floor(totalChipCount / playerCount);
}

console.log('\nChip Distribution Tests\n');

// 1. Basic distribution
test('Basic distribution: $50 buy-in, 3 denominations, 6 players', function () {
  var denoms = [
    { value: 0.25, totalCount: 200, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 150, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' }
  ];
  var result = ChipDistribution.distribute(50, denoms, 6);
  assert.strictEqual(totalValue(result.chips), 50, 'Total should equal buy-in');
  assert.ok(Object.keys(result.chips).length >= 2, 'Should use at least 2 denominations');
  for (var v in result.chips) {
    assert.ok(result.chips[v] > 0, 'Each denomination should have positive count');
  }
});

// 2. Supply constraint forces redistribution
test('Supply constraint: limited chips force smaller denominations', function () {
  var denoms = [
    { value: 0.25, totalCount: 200, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 150, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 6, color: '#16a34a', name: 'Green' }
  ];
  // Max per player: 33×0.25 + 25×1 + 1×5 = $38.25, so use $35 buy-in
  var result = ChipDistribution.distribute(35, denoms, 6);
  assert.strictEqual(totalValue(result.chips), 35, 'Total should equal buy-in');
  var greenPerPlayer = result.chips[5] || 0;
  assert.ok(greenPerPlayer <= 1, 'Green chips per player should be <= 1 (supply limited)');
});

// 3. Single denomination
test('Single denomination: only one chip type available', function () {
  var denoms = [
    { value: 1, totalCount: 500, color: '#dc2626', name: 'Red' }
  ];
  var result = ChipDistribution.distribute(50, denoms, 6);
  assert.strictEqual(result.chips[1], 50, 'Should get 50 red chips');
  assert.strictEqual(totalValue(result.chips), 50);
});

// 4. Buy-in not divisible by smallest denomination
test('Uneven buy-in: adjusted when not divisible by smallest chip', function () {
  var denoms = [
    { value: 0.25, totalCount: 200, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 150, color: '#dc2626', name: 'Red' }
  ];
  // Max per player: 33×0.25 + 25×1 = $33.25, so use $30.10 → adjusted to $30
  var result = ChipDistribution.distribute(30.10, denoms, 6);
  assert.strictEqual(result.adjustedBuyIn % 0.25, 0, 'Adjusted buy-in should be divisible by 0.25');
  assert.strictEqual(totalValue(result.chips), result.adjustedBuyIn, 'Total should equal adjusted buy-in');
});

// 4b. Exact cent-compatible buy-ins should not trigger uneven warning.
test('Uneven buy-in: no warning for $2 with $0.01 smallest chip', function () {
  var denoms = [
    { value: 0.01, totalCount: 500, color: '#f0f0f0', name: 'White' },
    { value: 0.05, totalCount: 300, color: '#dc2626', name: 'Red' },
    { value: 0.25, totalCount: 200, color: '#16a34a', name: 'Green' }
  ];
  var result = ChipDistribution.distribute(2, denoms, 6);
  assert.strictEqual(result.adjustedBuyIn, 2, 'Adjusted buy-in should remain unchanged');
  assert.ok(!hasWarning(result.warnings, 'uneven_buyin'), 'Should not warn for an exactly divisible buy-in');
});

// 5. Blind mismatch detection
test('Blind mismatch: smallest chip > small blind triggers warning', function () {
  var denoms = [
    { value: 1, totalCount: 200, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 100, color: '#16a34a', name: 'Green' }
  ];
  var warnings = ChipDistribution.checkBlindWarnings(0.25, denoms);
  assert.ok(hasWarning(warnings, 'blind_mismatch'), 'Should warn about blind mismatch');
});

// 6. No blind mismatch when chips are small enough
test('No blind mismatch: smallest chip <= small blind', function () {
  var denoms = [
    { value: 0.25, totalCount: 200, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 150, color: '#dc2626', name: 'Red' }
  ];
  var warnings = ChipDistribution.checkBlindWarnings(0.25, denoms);
  assert.ok(!hasWarning(warnings, 'blind_mismatch'), 'Should not warn about blind mismatch');
});

// 7. Large buy-in uses larger denominations
test('Large buy-in: uses black chips for $400 buy-in', function () {
  var denoms = [
    { value: 0.25, totalCount: 300, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 200, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 100, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  // Max per player at 4: 75×0.25 + 50×1 + 25×5 + 12×25 = $493.75
  var result = ChipDistribution.distribute(400, denoms, 4);
  assert.strictEqual(totalValue(result.chips), 400);
  assert.ok(result.chips[25] > 0, 'Should use black chips for large buy-in');
});

// 8. Player count boundary
test('Player count: supply caps respected for both 2 and 10 players', function () {
  var denoms = [
    { value: 0.25, totalCount: 200, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 150, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' }
  ];
  var result2 = ChipDistribution.distribute(50, denoms, 2);
  assert.strictEqual(totalValue(result2.chips), 50);
  // 10 players: max = 20×0.25 + 15×1 + 5×5 = $45. Use $40 buy-in.
  var result10 = ChipDistribution.distribute(40, denoms, 10);
  assert.strictEqual(totalValue(result10.chips), 40);
  var green10 = result10.chips[5] || 0;
  assert.ok(green10 <= 5, 'Green per player capped by supply for 10 players');
});

// 9. Preset validation
test('Preset: 300-piece set, 6 players, no warnings', function () {
  var preset300 = [
    { value: 0.25, totalCount: 100, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 100, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  var result = ChipDistribution.distribute(50, preset300, 6);
  assert.strictEqual(totalValue(result.chips), 50);
  var redWarnings = result.warnings.filter(function (w) { return w.severity === 'red'; });
  assert.strictEqual(redWarnings.length, 0, 'Default preset should have no red warnings');
});

// 10. Bottom-up: small chips dominate for beginner game
test('Bottom-up: small chips outnumber large chips for $50 buy-in', function () {
  var preset300 = [
    { value: 0.25, totalCount: 100, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 100, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  var result = ChipDistribution.distribute(50, preset300, 6);
  var whites = result.chips[0.25] || 0;
  var reds = result.chips[1] || 0;
  var greens = result.chips[5] || 0;
  var blacks = result.chips[25] || 0;
  assert.ok(whites >= greens, 'White count >= green count');
  assert.ok(reds >= greens, 'Red count >= green count');
  assert.strictEqual(blacks, 0, 'Black ($25) not used for $50 buy-in');
  assert.ok(whites >= 10, 'At least 10 whites, got ' + whites);
  assert.ok(reds >= 10, 'At least 10 reds, got ' + reds);
});

test('Preset: 500-piece set, 6 players, no warnings', function () {
  var preset500 = [
    { value: 0.25, totalCount: 200, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 150, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 100, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  var result = ChipDistribution.distribute(50, preset500, 6);
  assert.strictEqual(totalValue(result.chips), 50);
  var redWarnings = result.warnings.filter(function (w) { return w.severity === 'red'; });
  assert.strictEqual(redWarnings.length, 0);
});

// 11. NEVER exceed supply per player for any denomination
test('Supply hard cap: no denomination ever exceeds totalCount / playerCount', function () {
  var configs = [
    { buyIn: 50, players: 6 },
    { buyIn: 50, players: 7 },
    { buyIn: 50, players: 8 },
    { buyIn: 50, players: 9 },
    { buyIn: 50, players: 10 },
    { buyIn: 100, players: 6 },
    { buyIn: 200, players: 4 },
  ];
  var denoms = [
    { value: 0.25, totalCount: 100, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 100, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  configs.forEach(function (cfg) {
    var result = ChipDistribution.distribute(cfg.buyIn, denoms, cfg.players);
    denoms.forEach(function (d) {
      var perPlayer = result.chips[d.value] || 0;
      var max = maxPerPlayer(d.totalCount, cfg.players);
      assert.ok(perPlayer <= max,
        d.name + ': ' + perPlayer + ' per player exceeds supply cap ' + max +
        ' (buy-in=' + cfg.buyIn + ', players=' + cfg.players + ')');
    });
  });
});

// 12. Rebalance: 7 players should swap whites for greens to hit exact buy-in
test('Rebalance: 300-piece set, 7 players, finds exact $50 via swap', function () {
  var denoms = [
    { value: 0.25, totalCount: 100, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 100, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  var result = ChipDistribution.distribute(50, denoms, 7);
  assert.strictEqual(totalValue(result.chips), 50, 'Should hit exact buy-in after rebalance');
  assert.ok(!hasWarning(result.warnings, 'impossible'), 'Should not warn about impossible distribution');
  // Verify supply respected
  denoms.forEach(function (d) {
    var perPlayer = result.chips[d.value] || 0;
    assert.ok(perPlayer <= maxPerPlayer(d.totalCount, 7),
      d.name + ' exceeds supply: ' + perPlayer + ' > ' + maxPerPlayer(d.totalCount, 7));
  });
});

// 13. Regression: avoid pathological 7-player white-chip collapse
test('Regression: 300-piece set, 7 players keeps a healthy white stack', function () {
  var denoms = [
    { value: 0.25, totalCount: 100, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 100, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  var result = ChipDistribution.distribute(50, denoms, 7);
  assert.strictEqual(totalValue(result.chips), 50, 'Should hit exact buy-in');
  assert.ok((result.chips[0.25] || 0) >= 8, 'Should not collapse to tiny white-chip count');
  assert.ok(!hasWarning(result.warnings, 'impossible'), 'Should not warn about impossible distribution');
});

// 14. Regression: 10 players should use black chip when required for exactness
test('Regression: 300-piece set, 10 players uses black chip to reach exact $50', function () {
  var denoms = [
    { value: 0.25, totalCount: 100, color: '#f0f0f0', name: 'White' },
    { value: 1, totalCount: 100, color: '#dc2626', name: 'Red' },
    { value: 5, totalCount: 50, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  var result = ChipDistribution.distribute(50, denoms, 10);
  assert.strictEqual(totalValue(result.chips), 50, 'Should hit exact buy-in for 10 players');
  assert.ok((result.chips[25] || 0) > 0, 'Should include at least one black chip');
  assert.ok(!hasWarning(result.warnings, 'impossible'), 'Should not warn about impossible distribution');
});

// 15. Impossible distribution warns correctly
test('Impossible distribution: warns when supply truly insufficient', function () {
  var denoms = [
    { value: 1, totalCount: 10, color: '#dc2626', name: 'Red' }
  ];
  // 10 red chips / 6 players = 1 per player = $1 max. Buy-in $50 is impossible.
  var result = ChipDistribution.distribute(50, denoms, 6);
  assert.ok(hasWarning(result.warnings, 'impossible'), 'Should warn about impossible distribution');
  // Should still respect supply cap
  assert.ok((result.chips[1] || 0) <= 1, 'Should not exceed 1 red per player');
});

// 16. Few chips per player warning
test('Few chips warning: fires when total chips per player < 20', function () {
  var denoms = [
    { value: 5, totalCount: 100, color: '#16a34a', name: 'Green' },
    { value: 25, totalCount: 50, color: '#1f2937', name: 'Black' }
  ];
  var result = ChipDistribution.distribute(50, denoms, 4);
  if (totalCount(result.chips) < 20) {
    assert.ok(hasWarning(result.warnings, 'few_chips'), 'Should warn about few chips');
  }
});

// 17. Empty denominations
test('No denominations: returns empty with warning', function () {
  var result = ChipDistribution.distribute(50, [], 6);
  assert.deepStrictEqual(result.chips, {});
  assert.ok(hasWarning(result.warnings, 'no_denominations'));
});

// 18. formatDollars utility
test('formatDollars: formats correctly', function () {
  assert.strictEqual(ChipDistribution.formatDollars(0.25), '25\u00a2');
  assert.strictEqual(ChipDistribution.formatDollars(0.50), '50\u00a2');
  assert.strictEqual(ChipDistribution.formatDollars(1), '$1');
  assert.strictEqual(ChipDistribution.formatDollars(5), '$5');
  assert.strictEqual(ChipDistribution.formatDollars(2.50), '$2.50');
});

// 19. Blind suggestion should stay inside 50-150bb range
test('suggestBlinds: keeps stack depth inside 50-150bb', function () {
  var suggestion = ChipDistribution.suggestBlinds(50, { minBB: 50, maxBB: 150 });
  var stackBB = 50 / suggestion.bigBlind;
  assert.ok(stackBB >= 50 && stackBB <= 150, 'Stack depth should be in range, got ' + stackBB);
  var pair = suggestion.smallBlind + '/' + suggestion.bigBlind;
  var allowed = {
    '0.05/0.1': true,
    '0.1/0.2': true,
    '0.25/0.5': true,
    '0.5/1': true,
    '1/2': true,
    '2/5': true,
    '5/10': true,
    '10/20': true,
    '25/50': true,
    '50/100': true
  };
  assert.ok(!!allowed[pair], 'Should return a conventional blind pair, got ' + pair);
});

// 20. Mapping suggestions should produce usable exact option for common 300 set
test('suggestDenominationMappings: returns exact playable option for 300-piece set', function () {
  var chipSet = [
    { color: '#f0f0f0', name: 'White', totalCount: 100 },
    { color: '#dc2626', name: 'Red', totalCount: 100 },
    { color: '#16a34a', name: 'Green', totalCount: 50 },
    { color: '#1f2937', name: 'Black', totalCount: 50 }
  ];
  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 50,
    playerCount: 10,
    smallBlind: 0.25,
    bigBlind: 0.5,
    chipSet: chipSet,
    maxOptions: 3
  });

  assert.ok(suggestions.length > 0, 'Should return at least one suggestion');

  var hasExact = suggestions.some(function (s) {
    var total = totalValue(s.distribution.chips);
    return Math.abs(total - 50) < 0.001 && !hasWarning(s.distribution.warnings, 'impossible');
  });
  assert.ok(hasExact, 'At least one suggestion should hit exact $50');
});

// 21. Blind suggestion should prefer 2/5 for $500 buy-in
test('suggestBlinds: $500 buy-in suggests 2/5', function () {
  var suggestion = ChipDistribution.suggestBlinds(500, { minBB: 50, maxBB: 150 });
  assert.strictEqual(suggestion.smallBlind, 2, 'Expected SB 2');
  assert.strictEqual(suggestion.bigBlind, 5, 'Expected BB 5');
});

// 22. Auto denominations should avoid odd cent values for 100-piece set
test('suggestDenominationMappings: avoids odd decimal denominations', function () {
  var chipSet = [
    { color: '#f0f0f0', name: 'White', totalCount: 25 },
    { color: '#dc2626', name: 'Red', totalCount: 25 },
    { color: '#16a34a', name: 'Green', totalCount: 25 },
    { color: '#1f2937', name: 'Black', totalCount: 25 }
  ];
  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 500,
    playerCount: 6,
    smallBlind: 2,
    bigBlind: 5,
    chipSet: chipSet,
    maxOptions: 3
  });
  assert.ok(suggestions.length > 0, 'Should return suggestions');

  suggestions.forEach(function (s) {
    s.values.forEach(function (v) {
      var q = Math.round(v * 4) / 4;
      assert.ok(Math.abs(v - q) < 0.001, 'Value should be quarter increment: ' + v);
    });
  });
});

// 23. Solver should return a single recommended playable mapping.
test('suggestDenominationMappings: returns one recommended playable mapping', function () {
  var chipSet = [
    { color: '#f3f4f6', name: 'White', totalCount: 200 },
    { color: '#dc2626', name: 'Red', totalCount: 150 },
    { color: '#16a34a', name: 'Green', totalCount: 100 },
    { color: '#1f2937', name: 'Black', totalCount: 50 }
  ];
  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 500,
    playerCount: 6,
    smallBlind: 2,
    bigBlind: 5,
    chipSet: chipSet,
    preferredValues: [2, 5, 25, 100],
    maxOptions: 1
  });

  assert.strictEqual(suggestions.length, 1, 'Should return exactly one mapping');
  assert.strictEqual(suggestions[0].label, 'Recommended', 'Single mapping should be labeled Recommended');
  assert.ok(suggestions[0].metrics.smallestValue <= 2 + 1e-9, 'Smallest denomination should be <= small blind');
  assert.ok(!hasWarning(suggestions[0].distribution.warnings, 'impossible'), 'Recommended mapping should be exact/playable');
});

// 24. Default setup should still be playable with a single recommendation.
test('suggestDenominationMappings: default setup returns one playable recommendation', function () {
  var chipSet = [
    { color: '#f3f4f6', name: 'White', totalCount: 100 },
    { color: '#dc2626', name: 'Red', totalCount: 100 },
    { color: '#16a34a', name: 'Green', totalCount: 50 },
    { color: '#1f2937', name: 'Black', totalCount: 50 }
  ];

  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 50,
    playerCount: 6,
    smallBlind: 0.25,
    bigBlind: 0.5,
    chipSet: chipSet,
    maxOptions: 1
  });

  assert.strictEqual(suggestions.length, 1, 'Should provide one mapping card for default setup');
  assert.ok(suggestions[0].metrics.smallestValue <= 0.25 + 1e-9, 'Smallest denomination should be <= SB');
  assert.ok(!hasWarning(suggestions[0].distribution.warnings, 'impossible'), 'Recommendation should be playable');
});

// 25. When BB is a multiple of SB, avoid denominations smaller than SB when possible.
test('suggestDenominationMappings: prefers SB as minimum denomination for clean blind pair', function () {
  var chipSet = [
    { color: '#f3f4f6', name: 'White', totalCount: 50 },
    { color: '#dc2626', name: 'Red', totalCount: 50 },
    { color: '#16a34a', name: 'Green', totalCount: 50 },
    { color: '#1f2937', name: 'Black', totalCount: 50 }
  ];

  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 100,
    playerCount: 6,
    smallBlind: 0.5,
    bigBlind: 1,
    chipSet: chipSet,
    preferredValues: [0.25, 1, 5, 25],
    maxOptions: 1
  });

  assert.strictEqual(suggestions.length, 1, 'Should provide one recommended mapping');
  assert.ok(Math.abs(suggestions[0].metrics.smallestValue - 0.5) < 0.001, 'Smallest denomination should be SB (0.5), not below it');
});

// 26. Low-stakes blind pairs should be supported for unmarked chips.
test('suggestDenominationMappings: supports $0.10/$0.20 blinds', function () {
  var chipSet = [
    { color: '#f3f4f6', name: 'White', totalCount: 100 },
    { color: '#dc2626', name: 'Red', totalCount: 100 },
    { color: '#16a34a', name: 'Green', totalCount: 50 },
    { color: '#1f2937', name: 'Black', totalCount: 50 }
  ];

  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 20,
    playerCount: 8,
    smallBlind: 0.1,
    bigBlind: 0.2,
    chipSet: chipSet,
    maxOptions: 1
  });

  assert.strictEqual(suggestions.length, 1, 'Should provide one recommended mapping');
  assert.ok(suggestions[0].metrics.smallestValue <= 0.1 + 1e-9, 'Smallest denomination should be <= $0.10 SB');
  assert.ok(!hasWarning(suggestions[0].distribution.warnings, 'impossible'), 'Low-stakes recommendation should still distribute exactly');
});

// 27. Very low buy-ins should still allow playable low-denomination ladders.
test('suggestDenominationMappings: supports $1 buy-in with $0.05/$0.10 blinds', function () {
  var chipSet = [
    { color: '#f3f4f6', name: 'White', totalCount: 100 },
    { color: '#dc2626', name: 'Red', totalCount: 100 },
    { color: '#16a34a', name: 'Green', totalCount: 50 },
    { color: '#1f2937', name: 'Black', totalCount: 50 }
  ];

  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 1,
    playerCount: 6,
    smallBlind: 0.05,
    bigBlind: 0.1,
    chipSet: chipSet,
    maxOptions: 1
  });

  assert.strictEqual(suggestions.length, 1, 'Should provide one recommended mapping');
  assert.ok(suggestions[0].metrics.smallestValue <= 0.05 + 1e-9, 'Smallest denomination should be <= $0.05 SB');
  assert.ok(!hasWarning(suggestions[0].distribution.warnings, 'impossible'), 'Very low buy-in recommendation should still distribute exactly');
});

// 28. Penny-stakes blinds should be supported for $1 games.
test('suggestDenominationMappings: supports $1 buy-in with $0.01/$0.02 blinds', function () {
  var chipSet = [
    { color: '#f3f4f6', name: 'White', totalCount: 100 },
    { color: '#dc2626', name: 'Red', totalCount: 100 },
    { color: '#16a34a', name: 'Green', totalCount: 50 },
    { color: '#1f2937', name: 'Black', totalCount: 50 }
  ];

  var suggestions = ChipDistribution.suggestDenominationMappings({
    buyIn: 1,
    playerCount: 6,
    smallBlind: 0.01,
    bigBlind: 0.02,
    chipSet: chipSet,
    maxOptions: 1
  });

  assert.strictEqual(suggestions.length, 1, 'Should provide one recommended mapping');
  assert.ok(suggestions[0].metrics.smallestValue <= 0.01 + 1e-9, 'Smallest denomination should be <= $0.01 SB');
  assert.ok(!hasWarning(suggestions[0].distribution.warnings, 'impossible'), 'Penny-stakes recommendation should still distribute exactly');
});

// 29. Auto blind selection should include penny stakes for very small buy-ins.
test('suggestBlinds: $1 buy-in suggests $0.01/$0.02', function () {
  var suggestion = ChipDistribution.suggestBlinds(1);
  assert.strictEqual(suggestion.smallBlind, 0.01, 'Expected SB 0.01');
  assert.strictEqual(suggestion.bigBlind, 0.02, 'Expected BB 0.02');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed\n');
process.exit(failed > 0 ? 1 : 0);
