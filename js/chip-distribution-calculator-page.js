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

    sumGame: document.getElementById('sum-game'),
    sumChips: document.getElementById('sum-chips'),
    sumDist: document.getElementById('sum-dist'),

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

  function generateShareURL() {
    var data = {};
    data.bi = round2(state.buyIn);
    data.p = state.players;
    if (!state.autoBlinds) data.auto = 0;
    data.sb = round2(state.sb);
    data.bb = round2(state.bb);
    data.chips = state.chips.map(function (c) {
      return c.color.replace('#', '').toLowerCase() + ':' + parseInt(c.totalCount, 10);
    }).join(',');
    if (state.values && state.values.length === state.chips.length) {
      data.vals = state.values.map(function (v) { return round2(v); }).join(',');
    }
    if (state.marked) {
      data.mk = 1;
      if (state.markedValues.length) {
        data.mvals = state.markedValues.map(function (v) { return v === null || v === undefined ? '' : round2(v); }).join(',');
      }
    }
    var json = JSON.stringify(data);
    var encoded = btoa(unescape(encodeURIComponent(json)));
    return window.location.origin + window.location.pathname + '#d=' + encoded;
  }

  function applyData(data) {
    var bi = parseFloat(data.bi);
    if (isFinite(bi) && bi > 0) state.buyIn = Math.max(1, bi);

    var p = parseInt(data.p, 10);
    if (isFinite(p)) state.players = clamp(p, 2, 10);

    if (data.auto === 0 || data.auto === '0') state.autoBlinds = false;

    var sb = parseFloat(data.sb);
    var bb = parseFloat(data.bb);
    if (isFinite(sb) && sb > 0) state.sb = sb;
    if (isFinite(bb) && bb > 0) state.bb = bb;

    var chips = parseChips(data.chips);
    if (chips) state.chips = chips;

    var vals = parseVals(data.vals, state.chips.length);
    if (vals) state.values = vals;

    if (data.mk === 1 || data.mk === '1') {
      state.marked = true;
      var mvalsRaw = data.mvals;
      if (mvalsRaw) {
        var mvParts = (typeof mvalsRaw === 'string') ? mvalsRaw.split(',') : [];
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
  }

  function loadFromHash() {
    var hash = window.location.hash;
    if (!hash || hash.indexOf('#d=') !== 0) return false;
    try {
      var encoded = hash.substring(3);
      var json = decodeURIComponent(escape(atob(encoded)));
      var data = JSON.parse(json);
      if (typeof data !== 'object' || data === null) return false;
      applyData(data);
      requestAnimationFrame(function () {
        var target = document.getElementById('calculator');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
      return true;
    } catch(e) {
      console.warn('Chip calculator: invalid share URL', e);
      return false;
    }
  }

  function load() {
    // Try hash-based URL first (new format)
    if (loadFromHash()) return;

    // Fall back to query-param URL (legacy format)
    var qs = new URLSearchParams(location.search);
    if (!qs.has('bi')) return;

    var data = {};
    qs.forEach(function(value, key) { data[key] = value; });
    applyData(data);

    requestAnimationFrame(function () {
      var target = document.getElementById('calculator');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });

    // Clean legacy params from URL
    history.replaceState(null, '', location.pathname);
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
    els.sumDist.textContent = '';

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

    els.sumDist.textContent = count + ' chips, ' + fmt(total) + ' each';

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
    els.status.textContent = '';

    // Game summary
    els.sumGame.textContent = '$' + round2(state.buyIn) + ' buy-in, ' + state.players + ' players';

    // Chip summary
    var totalChips = 0;
    state.chips.forEach(function (c) { totalChips += parseInt(c.totalCount, 10); });
    els.sumChips.textContent = state.chips.length + ' colors, ' + totalChips + ' chips';

    // Dist summary (filled later by renderDistribution)
  }

  function render() {
    renderNav();
    renderGame();
    renderChipTabAlert();
    renderPresets();
    renderChipRows();
    renderDistribution();
  }

  function bind() {
    // ═══ Accordion setup ═══
    (function setupAccordions() {
      var isMobile = window.innerWidth < 640;
      var sections = Array.prototype.slice.call(document.querySelectorAll('#cof-calc .cof-cl-section'));

      function setExpanded(section, expanded) {
        section.classList.toggle('is-expanded', expanded);
        section.querySelector('.cof-cl-section-header').setAttribute('aria-expanded', expanded ? 'true' : 'false');
      }

      function syncAccordionMode() {
        if (!sections.length) return;
        if (isMobile) {
          var firstExpanded = null;
          sections.forEach(function (s) {
            if (!firstExpanded && s.classList.contains('is-expanded')) firstExpanded = s;
          });
          sections.forEach(function (s) { setExpanded(s, false); });
          setExpanded(firstExpanded || sections[0], true);
        } else {
          sections.forEach(function (s) { setExpanded(s, true); });
        }
      }

      sections.forEach(function (section) {
        section.querySelector('.cof-cl-section-header').addEventListener('click', function () {
          var isExpanded = section.classList.contains('is-expanded');
          if (isMobile) {
            sections.forEach(function (s) { setExpanded(s, false); });
          }
          if (!isExpanded) {
            setExpanded(section, true);
            section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            setExpanded(section, false);
          }
        });
      });

      syncAccordionMode();

      window.addEventListener('resize', function () {
        var nextIsMobile = window.innerWidth < 640;
        if (nextIsMobile !== isMobile) {
          isMobile = nextIsMobile;
          syncAccordionMode();
        }
      });
    })();

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
      var section = document.getElementById('cof-dist-capture');
      if (!section) return;
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
      var url = generateShareURL();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          els.status.textContent = 'Link copied — save it to load this setup again.';
        }).catch(function () {
          els.status.textContent = 'Could not copy automatically.';
        });
      } else {
        els.status.textContent = 'Could not copy automatically.';
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
        history.replaceState(null, '', location.pathname + location.search);
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
