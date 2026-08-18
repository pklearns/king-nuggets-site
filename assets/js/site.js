/* ==========================================================================
   King Nuggets — site behaviour

   Three things happen here and nothing else:
     1  the cycle dashboard renders from data/cycles.js in one of three states
     2  the mobile navigation opens and closes
     3  the mobile tab strip marks the section you are reading

   The dashboard is rendered client-side deliberately: when a real feed
   arrives it replaces the data object and calls KN.dashboard.render() again.
   ========================================================================== */

(function () {
  'use strict';

  var STATES = ['live', 'stale', 'prelaunch'];

  /* ------------------------------------------------------------------------
     Dashboard
     ------------------------------------------------------------------------ */

  /* Reading status is encoded in value, not hue — these classes only pick a
     step on the grey ramp. Withheld and Pending are set by the state. */
  var READING_CLASS = {
    'Confirmed': 'reading--confirmed',
    'Provisional': 'reading--provisional',
    'Under review': 'reading--review',
    'Withheld': 'reading--withheld',
    'Pending': 'reading--pending'
  };

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* The URL override is for review only. It never persists and never writes
     back to the data file. */
  function resolveState(data) {
    var requested = new URLSearchParams(window.location.search).get('state');
    if (STATES.indexOf(requested) !== -1) return requested;
    if (data && STATES.indexOf(data.state) !== -1) return data.state;
    return 'live';
  }

  /* One instrument, resolved for the state being rendered. A withheld value
     is an em dash that keeps its row — cells never collapse. */
  function resolveRow(instrument, state) {
    var live = state === 'live';
    var pct = 0;

    if (live && instrument.length > 0) {
      pct = Math.round((instrument.age / instrument.length) * 100);
      pct = Math.max(0, Math.min(100, pct));
    }

    return {
      symbol: instrument.symbol,
      name: instrument.name,
      nominal: instrument.nominal,
      count: live
        ? instrument.age + ' / ' + instrument.length + ' ' + instrument.unit
        : '—',
      pct: pct,
      translation: live ? instrument.translation : '',
      anchor: instrument.anchor || '[DATE]',
      window: live
        ? (instrument.window || '[WINDOW]')
        : (state === 'stale' ? 'HELD' : 'ON OPEN'),
      reading: live
        ? instrument.reading
        : (state === 'stale' ? 'Withheld' : 'Pending')
    };
  }

  function ageRule(pct) {
    return (
      '<div class="age-rule">' +
        '<div class="age-rule__track"></div>' +
        '<div class="age-rule__fill" style="width:' + pct + '%"></div>' +
        '<div class="age-rule__tick" style="left:' + pct + '%"></div>' +
      '</div>'
    );
  }

  function tableRow(row) {
    return (
      '<div class="cycle-row" role="row">' +
        '<div class="cycle-instrument" role="cell">' +
          '<span class="cycle-instrument__symbol">' + esc(row.symbol) + '</span>' +
          '<span class="cycle-instrument__name">' + esc(row.name) + '</span>' +
        '</div>' +
        '<span class="cycle-nominal" role="cell">' + esc(row.nominal) + '</span>' +
        '<div class="cycle-age" role="cell">' +
          '<span class="cycle-age__count">' + esc(row.count) + '</span>' +
          ageRule(row.pct) +
          '<span class="cycle-age__translation">' + esc(row.translation) + '</span>' +
        '</div>' +
        '<span class="cycle-anchor" role="cell">' + esc(row.anchor) + '</span>' +
        '<span class="cycle-window" role="cell">' + esc(row.window) + '</span>' +
        '<span class="cycle-reading ' + (READING_CLASS[row.reading] || '') + '" role="cell">' +
          esc(row.reading) +
        '</span>' +
      '</div>'
    );
  }

  function card(row) {
    return (
      '<div class="cycle-card">' +
        '<div class="cycle-card__line">' +
          '<span class="cycle-card__id">' +
            '<span class="cycle-instrument__symbol">' + esc(row.symbol) + '</span>' +
            '<span class="cycle-instrument__name">' + esc(row.name) + '</span>' +
          '</span>' +
          '<span class="cycle-card__nominal">' + esc(row.nominal) + '</span>' +
        '</div>' +
        '<div class="cycle-card__line">' +
          '<span class="cycle-card__count">' + esc(row.count) + '</span>' +
          '<span class="cycle-card__reading ' + (READING_CLASS[row.reading] || '') + '">' +
            esc(row.reading) +
          '</span>' +
        '</div>' +
        ageRule(row.pct) +
        '<div class="cycle-card__meta">' +
          '<span>ANCHOR ' + esc(row.anchor) + '</span>' +
          '<span class="cycle-window">NEXT ' + esc(row.window) + '</span>' +
        '</div>' +
      '</div>'
    );
  }

  function removeAll(root, selector) {
    var nodes = root.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) nodes[i].remove();
  }

  function insertHTML(container, html, before) {
    var holder = document.createElement('div');
    holder.innerHTML = html;
    var fragment = document.createDocumentFragment();
    while (holder.firstChild) fragment.appendChild(holder.firstChild);
    container.insertBefore(fragment, before || null);
  }

  function render(data) {
    var dashboard = document.getElementById('cycle-dashboard');
    if (!dashboard) return;

    var payload = data || window.KN_CYCLES || {};
    var state = resolveState(payload);
    var instruments = payload.instruments || [];

    dashboard.setAttribute('data-state', state);

    /* Copy that changes with the state lives in the HTML, marked up with
       data-state-block, so it stays editable without touching this file. */
    var blocks = dashboard.querySelectorAll('[data-state-block]');
    for (var i = 0; i < blocks.length; i++) {
      var applies = blocks[i].getAttribute('data-state-block').split(/\s+/);
      blocks[i].hidden = applies.indexOf(state) === -1;
    }

    var rows = instruments.map(function (instrument) {
      return resolveRow(instrument, state);
    });

    var table = dashboard.querySelector('.cycle-table');
    if (table) {
      removeAll(table, '.cycle-row:not(.cycle-row--head)');
      insertHTML(table, rows.map(tableRow).join(''));
    }

    var cards = dashboard.querySelector('.cycle-cards');
    if (cards) {
      removeAll(cards, '.cycle-card');
      insertHTML(cards, rows.map(card).join(''), cards.querySelector('.cycle-cards__footnote'));
    }
  }

  /* ------------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------------ */

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var overlay = document.getElementById('nav-overlay');
    if (!toggle || !overlay) return;

    var closeButton = overlay.querySelector('.nav-overlay__close');

    function open() {
      overlay.hidden = false;
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      if (closeButton) closeButton.focus();
    }

    function close(returnFocus) {
      overlay.hidden = true;
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', open);
    if (closeButton) {
      closeButton.addEventListener('click', function () { close(true); });
    }

    overlay.addEventListener('click', function (event) {
      if (event.target.closest('a')) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !overlay.hidden) close(true);
    });

    /* A resize past the breakpoint leaves the overlay stranded over a
       desktop layout; close it. */
    window.addEventListener('resize', function () {
      if (!overlay.hidden && window.innerWidth > 900) close(false);
    });
  }

  /* ------------------------------------------------------------------------
     Tab strip — marks the section currently under the sticky head
     ------------------------------------------------------------------------ */

  function initTabStrip() {
    var strip = document.querySelector('.tabstrip');
    var head = document.querySelector('.site-head');
    if (!strip) return;

    var targets = [];
    var links = strip.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href.length < 2) continue;
      var section = document.getElementById(href.slice(1));
      if (section) targets.push({ link: links[i], section: section });
    }
    if (!targets.length) return;

    var queued = false;

    function mark() {
      queued = false;
      var offset = (head ? head.offsetHeight : 0) + 8;
      var current = targets[0];

      for (var i = 0; i < targets.length; i++) {
        if (targets[i].section.getBoundingClientRect().top <= offset) {
          current = targets[i];
        }
      }

      for (var j = 0; j < targets.length; j++) {
        var isCurrent = targets[j] === current;
        targets[j].link.classList.toggle('is-current', isCurrent);
        if (isCurrent) {
          targets[j].link.setAttribute('aria-current', 'true');
        } else {
          targets[j].link.removeAttribute('aria-current');
        }
      }
    }

    function schedule() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(mark);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mark();
  }

  /* ------------------------------------------------------------------------
     Subscribe form

     Not wired to a provider yet. It says so rather than pretending to
     succeed. Point the form at the Substack endpoint and delete this handler.
     ------------------------------------------------------------------------ */

  function initSubscribe() {
    var form = document.getElementById('subscribe-form');
    if (!form) return;

    var status = document.getElementById('subscribe-status');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (status) {
        status.textContent =
          'Email capture is not connected yet. The letter is delivered by Substack.';
      }
    });
  }

  /* ------------------------------------------------------------------------ */

  function init() {
    render();
    initNav();
    initTabStrip();
    initSubscribe();
  }

  window.KN = window.KN || {};
  window.KN.dashboard = { render: render, states: STATES };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
