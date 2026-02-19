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
    { id: 'rebuys_between_hands', label: 'Rebuys and top-ups between hands only', defaultOn: true, formats: 'all' },
    { id: 'late_arrival_blinds', label: 'Late arrivals post both blinds on first hand', defaultOn: false, formats: 'all' },
    { id: 'early_departure', label: 'Early departures \u2014 announce 30 min ahead', defaultOn: false, formats: 'all' },
    { id: 'color_up_breaks', label: 'Color up chips during breaks', defaultOn: false, formats: 'all' },
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
    auto_buyin: 'ab', topup_limited: 'tc', topup_limit: 'tl',
    bounty_enabled: 'be'
  };

  var KEY_MAP_REV = {};
  for (var k in KEY_MAP) KEY_MAP_REV[KEY_MAP[k]] = k;

  var FORMAT_MAP = { c: 'cash', t: 'tournament' };
  var FORMAT_MAP_REV = { cash: 'c', tournament: 't' };
  var SETTLE_MAP = { c: 'at_cashout', h: 'after_last_hand', d: 'next_day', n: 'before_next' };
  var SETTLE_MAP_REV = { at_cashout: 'c', after_last_hand: 'h', next_day: 'd', before_next: 'n' };
  var SETTLE_LABELS = { at_cashout: 'Settle at cash-out', after_last_hand: 'Settle after last hand', next_day: 'Settle by next day', before_next: 'Flexible — settle before next game' };
  var CONDITION_MAP = { m: 'below_min', a: 'anytime', f: 'felted' };
  var CONDITION_MAP_REV = { below_min: 'm', anytime: 'a', felted: 'f' };
  var CONDITION_LABELS = { below_min: 'Rebuy when below min buy-in', anytime: 'Rebuy any amount', felted: 'Rebuy only when stacked' };
  var BREAK_MAP = { '90': 'every_90', 'o': 'every_orbit', '60': 'every_60', 'n': 'no_breaks' };
  var BREAK_MAP_REV = { every_90: '90', every_orbit: 'o', every_60: '60', no_breaks: 'n' };
  var BREAK_LABELS = { every_90: 'Breaks every 90 min', every_orbit: 'Breaks every orbit', every_60: 'Breaks every 60 min', no_breaks: '' };
  var PAYMENT_MAP = { c: 'cash', v: 'venmo', z: 'zelle', a: 'cashapp', u: 'upi', o: 'other' };
  var PAYMENT_MAP_REV = { cash: 'c', venmo: 'v', zelle: 'z', cashapp: 'a', upi: 'u', other: 'o' };
  var PAYMENT_LABELS = { cash: 'Cash', venmo: 'Venmo', zelle: 'Zelle', cashapp: 'Cash App', upi: 'UPI' };

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
      bounty_enabled: false,
      bounty_amount: 10,
      starting_chips: 10000,
      payout: '50/30/20',
      payout_custom: '',
      topup_limited: false, topup_limit: 3,
      rebuys_allowed: true,
      rebuys_max: 1, rebuys_window: 90,
      rebuys_amount: 'same', rebuys_custom: '',
      rebuys_condition: 'below_min',
      addon_allowed: false,
      addon_amount: 20, addon_chips: 5000,
      banker: '',
      payment_method: ['cash'],
      payment_other: '',
      settle_policy: 'at_cashout',
      date: todayStr(),
      start_time: '19:00',
      last_buyin_time: '21:00',
      hard_stop: '',
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

  function syncViewportWidthVar() {
    var vw = window.innerWidth;
    if (window.visualViewport && window.visualViewport.width) {
      vw = window.visualViewport.width;
    }
    document.documentElement.style.setProperty('--cof-vw', Math.round(vw) + 'px');
  }

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

  function updateTopupDesc() {
    var el = $('cof-topup-desc');
    if (!el) return;
    if (!state.topup_limited) {
      el.textContent = 'Unlimited top-ups to max buy-in between hands.';
    } else if (state.topup_limit === 0) {
      el.textContent = 'No top-ups allowed. One buy-in only.';
    } else {
      el.textContent = state.topup_limit + ' top-up' + (state.topup_limit === 1 ? '' : 's') + ' max to max buy-in between hands.';
    }
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

  function parseMin(input) {
    var v = parseFloat(input.min);
    return isNaN(v) ? 1 : v;
  }

  function updateStepperState() {
    $$('.cof-cl-step-btn[data-step="-1"]').forEach(function(btn) {
      var input = $(btn.getAttribute('data-target'));
      if (input) {
        var min = parseMin(input);
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
        var min = parseMin(input);
        if (newVal < min) newVal = min;
        input.value = newVal;
        // Directly update state instead of relying on debounced onInput
        readFormState();
        applyAutoBuyin();
        updateDepthLabel();
        updateAutoDerivedStyling();
        updateTopupDesc();
        updateStepperState();
        validateFields();
        updatePreview();
        updateSummaries();
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

    // Top-up limit checkbox
    var topupCheck = $('cof-topup-limited');
    if (topupCheck) {
      topupCheck.addEventListener('change', function() {
        state.topup_limited = topupCheck.checked;
        $('cof-topup-limit-wrap').classList.toggle('cof-cl-hidden', !topupCheck.checked);
        updateTopupDesc();
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
    syncViewportWidthVar();
    window.addEventListener('resize', syncViewportWidthVar);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', syncViewportWidthVar);
    }
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
    setupClearButtons();
    setupSteppers();
    loadFromHash();
    applyAutoBuyin();
    updateDepthLabel();
    updateAutoDerivedStyling();
    updateTopupDesc();
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
    var sections = $$('.cof-cl-section');

    function setExpanded(section, expanded) {
      section.classList.toggle('is-expanded', expanded);
      section.querySelector('.cof-cl-section-header').setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    function syncAccordionMode() {
      if (!sections.length) return;

      if (isMobile) {
        // Keep only one section open on mobile to avoid dense layouts after viewport switches.
        var firstExpanded = null;
        sections.forEach(function(s) {
          if (!firstExpanded && s.classList.contains('is-expanded')) firstExpanded = s;
        });
        sections.forEach(function(s) { setExpanded(s, false); });
        setExpanded(firstExpanded || sections[0], true);
      } else {
        sections.forEach(function(s) { setExpanded(s, true); });
      }
    }

    $$('.cof-cl-section-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var section = this.closest('.cof-cl-section');
        var isExpanded = section.classList.contains('is-expanded');

        if (isMobile) {
          sections.forEach(function(s) { setExpanded(s, false); });
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

    window.addEventListener('resize', function() {
      var nextIsMobile = window.innerWidth < 640;
      if (nextIsMobile !== isMobile) {
        isMobile = nextIsMobile;
        syncAccordionMode();
      }
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
      $$('#cof-rebuys-fields > .cof-cl-field').forEach(function(el) {
        el.style.display = !checked ? '' : 'none';
      });
      // Add-on only for tournament
      var addonEl = $('cof-addon-section');
      if (addonEl) {
        var showAddon = !checked && state.format !== 'cash';
        addonEl.style.display = showAddon ? '' : 'none';
      }
      updatePreview();
      updateSummaries();
    });

    // Bounty toggle
    $('cof-bounty-on').addEventListener('click', function() {
      var checked = this.getAttribute('aria-checked') === 'true';
      this.setAttribute('aria-checked', !checked ? 'true' : 'false');
      state.bounty_enabled = !checked;
      $('cof-bounty-fields').classList.toggle('cof-cl-hidden', checked);
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
        updateTopupDesc();
        updateStepperState();
        validateFields();
        updatePreview();
        updateSummaries();
      }, 100);
    }

    var inputIds = [
      'cof-sb', 'cof-bb', 'cof-buyin-min', 'cof-buyin-max',
      'cof-tourn-buyin', 'cof-bounty-amt', 'cof-start-chips',
      'cof-topup-limit', 'cof-rebuys-max', 'cof-rebuys-window', 'cof-rebuys-custom',
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
    ['cof-payout', 'cof-rebuys-amount', 'cof-settle', 'cof-breaks'].forEach(function(id) {
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
    state.bounty_enabled = $('cof-bounty-on').getAttribute('aria-checked') === 'true';
    state.bounty_amount = parseFloat($('cof-bounty-amt').value) || 0;
    state.starting_chips = parseInt($('cof-start-chips').value) || 0;
    state.payout = $('cof-payout').value;
    state.payout_custom = $('cof-payout-custom').value;
    state.topup_limited = $('cof-topup-limited') ? $('cof-topup-limited').checked : state.topup_limited;
    var tlVal = parseInt($('cof-topup-limit').value);
    state.topup_limit = isNaN(tlVal) ? 3 : tlVal;
    state.rebuys_max = parseInt($('cof-rebuys-max').value) || 1;
    state.rebuys_window = parseInt($('cof-rebuys-window').value) || 90;
    state.rebuys_amount = $('cof-rebuys-amount').value;
    state.rebuys_custom = $('cof-rebuys-custom').value;
    var rcEl = $('cof-rebuys-condition');
    if (rcEl) state.rebuys_condition = rcEl.value;
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
    if (state.format === 'tournament' && state.bounty_enabled && state.bounty_amount >= state.tournament_buyin) {
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
      if (state.bounty_enabled) {
        lines.push('Bounty Tournament | ' + fmtCurrency(state.tournament_buyin) + ' buy-in (' + fmtCurrency(state.bounty_amount) + ' bounty) | ' + state.starting_chips.toLocaleString('en-US') + ' chips');
        var prizePool = state.tournament_buyin - state.bounty_amount;
        var payoutStr = state.payout === 'custom' ? (state.payout_custom || 'Custom') : (state.payout === 'wta' ? 'Winner take all' : state.payout);
        lines.push('Payout: ' + payoutStr + ' (from ' + fmtCurrency(prizePool) + '/player prize pool)');
      } else {
        lines.push('Tournament | ' + fmtCurrency(state.tournament_buyin) + ' buy-in | ' + state.starting_chips.toLocaleString('en-US') + ' chips');
        var payoutStr = state.payout === 'custom' ? (state.payout_custom || 'Custom') : (state.payout === 'wta' ? 'Winner take all' : state.payout);
        lines.push('Payout: ' + payoutStr);
      }
    }
    lines.push('');

    // Rebuys / Top-ups
    if (fmt === 'cash') {
      if (!state.topup_limited) {
        lines.push('Unlimited top-ups (buy-in limits apply)');
      } else if (state.topup_limit === 0) {
        lines.push('No top-ups allowed');
      } else {
        lines.push('Top-ups: ' + state.topup_limit + ' max (buy-in limits apply)');
      }
    } else {
      if (!state.rebuys_allowed) {
        lines.push('No rebuys');
      } else {
        var rebuyAmt = state.rebuys_amount === 'same' ? 'same as buy-in' : fmtCurrency(state.rebuys_custom);
        lines.push('Rebuys: ' + state.rebuys_max + ' max, first ' + state.rebuys_window + ' min, ' + rebuyAmt);
      }
    }

    // Add-on (tournament only)
    if (fmt === 'tournament' && state.addon_allowed) {
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
      if (state.bounty_enabled) {
        stakesSummary = fmtCurrency(state.tournament_buyin) + ' (' + fmtCurrency(state.bounty_amount) + ' bounty)';
      } else {
        stakesSummary = fmtCurrency(state.tournament_buyin) + ' buy-in | ' + state.starting_chips.toLocaleString('en-US') + ' chips';
      }
    }
    $('sum-stakes').textContent = stakesSummary;
    setCheck('chk-stakes', true);

    // Rebuys / Top-ups
    var rebuysSummary;
    if (state.format === 'cash') {
      rebuysSummary = !state.topup_limited ? 'Unlimited top-ups' : (state.topup_limit === 0 ? 'No top-ups' : state.topup_limit + ' top-ups max');
    } else {
      rebuysSummary = state.rebuys_allowed ? (state.rebuys_max + ' max, ' + state.rebuys_window + ' min') : 'No rebuys';
    }
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
  function copyToClipboard(text, btn, successText, toastText) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showCopySuccess(btn, successText, toastText);
      }).catch(function() {
        fallbackCopy(text, btn, successText, toastText);
      });
    } else {
      fallbackCopy(text, btn, successText, toastText);
    }
  }

  function fallbackCopy(text, btn, successText, toastText) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(btn, successText, toastText);
    } catch(e) {
      showToast('Copy failed. Please copy manually.');
    }
    document.body.removeChild(textarea);
  }

  function showCopySuccess(btn, successText, toastText) {
    var original = btn.innerHTML;
    btn.classList.add('is-success');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> ' + (successText || 'Copied!');
    showToast(toastText || successText || 'Copied to clipboard!');
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
      copyToClipboard(url, this, 'Saved!', 'Unique Link copied to clipboard — save it to load these settings again');
      checkURLLength(url);
    });

    // Mobile copy (in bottom sheet)
    $('cof-copy-mobile').addEventListener('click', function() {
      copyToClipboard(generateOutput(), this, 'Copied!');
    });

    // Mobile share (bottom bar)
    $('cof-share-mobile').addEventListener('click', function() {
      var url = generateShareURL();
      copyToClipboard(url, this, 'Saved!', 'Unique Link copied to clipboard — save it to load these settings again');
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

  function setupClearButtons() {
    var btns = document.querySelectorAll('.cof-cl-clear-btn[data-clear]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function(e) {
        e.preventDefault();
        var input = $(this.getAttribute('data-clear'));
        input.value = '';
        input.dispatchEvent(new Event('change'));
        updatePreview();
      });
    }
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
    if (state.topup_limited) {
      data[KEY_MAP.topup_limited] = 1;
      data[KEY_MAP.topup_limit] = state.topup_limit;
    }

    // Tournament fields
    if (state.tournament_buyin !== defaults.tournament_buyin) data[KEY_MAP.tournament_buyin] = state.tournament_buyin;
    if (state.bounty_enabled) data[KEY_MAP.bounty_enabled] = 1;
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
        var fmtCode = data[KEY_MAP.format];
        var fmt = FORMAT_MAP[fmtCode];
        // Backward compat: old bounty format (f=b) → tournament + bounty_enabled
        if (fmtCode === 'b') {
          fmt = 'tournament';
          state.bounty_enabled = true;
        }
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
        topup_limit: 'cof-topup-limit',
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
        if (rc) { state.rebuys_condition = rc; var rcEl = $('cof-rebuys-condition'); if (rcEl) rcEl.value = rc; }
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
          $$('#cof-rebuys-fields > .cof-cl-grid-2, #cof-rebuys-fields > .cof-cl-field, #cof-addon-section').forEach(function(el) {
            el.style.display = 'none';
          });
        }
      }
      if (data[KEY_MAP.addon_allowed] !== undefined) {
        state.addon_allowed = data[KEY_MAP.addon_allowed] === 1;
        $('cof-addon-on').setAttribute('aria-checked', state.addon_allowed ? 'true' : 'false');
        if (state.addon_allowed) $('cof-addon-fields').classList.remove('cof-cl-hidden');
      }
      if (data[KEY_MAP.bounty_enabled] !== undefined) {
        state.bounty_enabled = data[KEY_MAP.bounty_enabled] === 1;
      }
      $('cof-bounty-on').setAttribute('aria-checked', state.bounty_enabled ? 'true' : 'false');
      if (state.bounty_enabled) $('cof-bounty-fields').classList.remove('cof-cl-hidden');

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

      // Top-up limit
      if (data[KEY_MAP.topup_limited] !== undefined) {
        state.topup_limited = data[KEY_MAP.topup_limited] === 1;
        var tlCheck = $('cof-topup-limited');
        if (tlCheck) tlCheck.checked = state.topup_limited;
        if (state.topup_limited) $('cof-topup-limit-wrap').classList.remove('cof-cl-hidden');
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
