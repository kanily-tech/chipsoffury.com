var assert = require('assert');
var TournamentBlinds = require('./tournament-blinds');

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

function warningTypes(result) {
  return result.warnings.map(function (warning) {
    return warning.type;
  });
}

function levelRows(rows) {
  return rows.filter(function (row) {
    return row.kind === 'level';
  });
}

console.log('\nTournament Blinds Tests\n');

test('chooseOpeningBlinds defaults close to 100 big blinds deep', function () {
  assert.deepStrictEqual(TournamentBlinds.chooseOpeningBlinds(5000), {
    smallBlind: 25,
    bigBlind: 50
  });
  assert.deepStrictEqual(TournamentBlinds.chooseOpeningBlinds(10000), {
    smallBlind: 50,
    bigBlind: 100
  });
  assert.deepStrictEqual(TournamentBlinds.chooseOpeningBlinds(100000), {
    smallBlind: 500,
    bigBlind: 1000
  });
});

test('solveBlindLevels uses internal tournament chip profile when denominations are omitted', function () {
  var result = TournamentBlinds.solveBlindLevels({
    players: 9,
    startingStack: 10000,
    openingSmallBlind: 50,
    openingBigBlind: 100,
    targetMinutes: 180
  });
  var finalLevel = result.levels[result.levels.length - 1];

  assert.strictEqual(result.finalBigBlindTarget, 9000);
  assert.strictEqual(finalLevel.smallBlind, 5000);
  assert.strictEqual(finalLevel.bigBlind, 10000);
});

test('solveBlindLevels generates a practical 9-player 3-hour structure', function () {
  var result = TournamentBlinds.solveBlindLevels({
    players: 9,
    startingStack: 10000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 180,
    chipDenominations: [25, 100, 500, 1000, 5000]
  });

  assert.strictEqual(result.levels[0].smallBlind, 25);
  assert.strictEqual(result.levels[0].bigBlind, 50);
  assert.strictEqual(result.levelMinutes, 18);
  assert.ok(result.levels.length >= 8, 'Should generate enough levels for a 3-hour tournament');

  var finalLevel = result.levels[result.levels.length - 1];
  assert.ok(finalLevel.bigBlind >= 8000, 'Final BB should approach the 9,000 chip target');
  assert.ok(finalLevel.bigBlind <= 10000, 'Final BB should stay near a practical rounded target');
  assert.deepStrictEqual(warningTypes(result), []);

  result.levels.forEach(function (level, index) {
    assert.strictEqual(level.kind, 'level');
    assert.strictEqual(level.ante, 0);
    assert.ok(level.minutes >= result.minimumLevelMinutes, 'Level duration should respect table-size floor');
    assert.strictEqual(level.bigBlind, level.smallBlind * 2, 'Generated blind pairs should be conventional');
    if (index > 0) {
      assert.ok(level.bigBlind > result.levels[index - 1].bigBlind, 'BB should always increase');
    }
  });
});

test('solveBlindLevels preserves minimum duration when target time is too short', function () {
  var result = TournamentBlinds.solveBlindLevels({
    players: 9,
    startingStack: 10000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 90,
    chipDenominations: [25, 100, 500, 1000, 5000]
  });

  assert.ok(warningTypes(result).indexOf('target_too_short') !== -1);
  assert.ok(result.levelMinutes >= result.minimumLevelMinutes);
  assert.ok(result.estimatedPlayMinutes >= 90);
  assert.strictEqual(result.minimumLevelMinutes, 18);
});

test('solveBlindLevels rounds to practical chip-compatible values', function () {
  var result = TournamentBlinds.solveBlindLevels({
    players: 9,
    startingStack: 1000,
    openingSmallBlind: 5,
    openingBigBlind: 10,
    targetMinutes: 180,
    chipDenominations: [5, 25, 100, 500]
  });

  var bigBlinds = result.levels.map(function (level) {
    return level.bigBlind;
  });

  assert.ok(bigBlinds.indexOf(60) === -1, 'Should not emit unconventional 60 blind');
  assert.ok(bigBlinds.indexOf(130) === -1, 'Should not emit unconventional 130 blind');
  assert.ok(bigBlinds.indexOf(1000) !== -1 || bigBlinds.indexOf(900) !== -1 || bigBlinds.indexOf(500) !== -1,
    'Should land on a practical final blind');
});

test('solveBlindLevels never emits a raw odd final target as the big blind', function () {
  var result = TournamentBlinds.solveBlindLevels({
    players: 9,
    startingStack: 10000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 180,
    chipDenominations: [25, 100, 500, 1000, 5000]
  });
  var finalLevel = result.levels[result.levels.length - 1];

  assert.notStrictEqual(finalLevel.bigBlind, 9000);
  assert.strictEqual(finalLevel.smallBlind, 5000);
  assert.strictEqual(finalLevel.bigBlind, 10000);
});

test('solveBlindLevels supports slower blind progression as an explicit input', function () {
  var auto = TournamentBlinds.solveBlindLevels({
    players: 9,
    startingStack: 10000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 180,
    chipDenominations: [25, 100, 500, 1000, 5000]
  });
  var slower = TournamentBlinds.solveBlindLevels({
    players: 9,
    startingStack: 10000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 180,
    chipDenominations: [25, 100, 500, 1000, 5000],
    blindGrowth: 1.45
  });

  assert.ok(slower.levels.length > auto.levels.length, 'Slower progression should require more levels');
  assert.ok(slower.estimatedPlayMinutes > auto.estimatedPlayMinutes, 'Slower progression should produce a longer schedule when level duration has a floor');
  assert.ok(warningTypes(slower).indexOf('target_exceeded') !== -1);
});

test('solveBlindLevels avoids tiny final increments after reaching target', function () {
  var result = TournamentBlinds.solveBlindLevels({
    players: 4,
    startingStack: 10000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 180,
    chipDenominations: [25, 100, 500, 1000, 5000]
  });
  var finalLevel = result.levels[result.levels.length - 1];
  var previousLevel = result.levels[result.levels.length - 2];

  assert.strictEqual(result.finalBigBlindTarget, 4000);
  assert.strictEqual(finalLevel.bigBlind, 4000);
  assert.strictEqual(finalLevel.smallBlind, 2000);
  assert.ok(finalLevel.bigBlind / previousLevel.bigBlind >= 1.2,
    'Final level should not be a cosmetic bump from the previous level');
});

test('solveBlindLevels respects large edited starting stacks', function () {
  var result = TournamentBlinds.solveBlindLevels({
    players: 4,
    startingStack: 100000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 180,
    chipDenominations: [25, 100, 500, 1000, 5000]
  });
  var finalLevel = result.levels[result.levels.length - 1];

  assert.strictEqual(result.finalBigBlindTarget, 40000);
  assert.strictEqual(finalLevel.bigBlind, 40000);
  assert.strictEqual(finalLevel.smallBlind, 20000);
});

test('breaks are inserted by the schedule layer, not the solver', function () {
  var solved = TournamentBlinds.solveBlindLevels({
    players: 6,
    startingStack: 5000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 150,
    chipDenominations: [25, 100, 500, 1000]
  });

  assert.strictEqual(solved.levels.some(function (row) { return row.kind === 'break'; }), false);

  var withBreak = TournamentBlinds.insertBreakAfterLevel(solved.levels, 3, {
    label: 'Break',
    minutes: 10
  });
  var schedule = TournamentBlinds.recalculateSchedule(withBreak);

  assert.strictEqual(levelRows(schedule.rows).length, solved.levels.length);
  assert.strictEqual(schedule.rows[3].kind, 'break');
  assert.strictEqual(schedule.totalMinutes, solved.estimatedPlayMinutes + 10);
});

test('manual edits are preserved by schedule recalculation', function () {
  var solved = TournamentBlinds.solveBlindLevels({
    players: 6,
    startingStack: 5000,
    openingSmallBlind: 25,
    openingBigBlind: 50,
    targetMinutes: 150,
    chipDenominations: [25, 100, 500, 1000]
  });

  var editedRows = TournamentBlinds.updateScheduleRow(solved.levels, solved.levels[2].id, {
    smallBlind: 125,
    bigBlind: 250,
    ante: 25,
    minutes: 18
  });
  var schedule = TournamentBlinds.recalculateSchedule(editedRows);
  var edited = schedule.rows[2];

  assert.strictEqual(edited.smallBlind, 125);
  assert.strictEqual(edited.bigBlind, 250);
  assert.strictEqual(edited.ante, 25);
  assert.strictEqual(edited.minutes, 18);
  assert.strictEqual(edited.source, 'edited');
});

if (failed > 0) {
  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  process.exit(1);
}

console.log('\n' + passed + ' passed, 0 failed');
