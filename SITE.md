# King Nuggets — marketing site

Implementation of the Claude Design handoff in `design-source/`. Static HTML,
CSS and one script. No build step, no dependencies, no toolchain.

This is the **presentation front door** and is independent of the research
pipeline in the repository root. It imports nothing from `pipeline/`, reads
nothing from `output/`, and touches no data-layer file. See "Wiring real data"
below for the one place the two could eventually meet — deliberately not built.

`design-source/README.md` is the original handoff brief from Claude Design.
This file documents what was built from it.

---

## Running it

Open `site/index.html`. That is the whole procedure — it works straight off
disk.

To serve it over HTTP (recommended before deploying, and required if you later
switch the dashboard to `fetch`):

```
cd site && python3 -m http.server 8000
# → http://localhost:8000
```

Deploy by copying `site/` to any static host — `design-source/` can be left
behind, it is provenance rather than build input. Nothing needs compiling.

---

## File map

```
index.html                    the whole site — one responsive page
assets/css/tokens.css         design tokens: fonts, colour, type scale, spacing
assets/css/kingnuggets.css    everything else, in eight labelled sections
assets/js/site.js             dashboard render, mobile nav, tab strip, form
assets/fonts/*.woff2          Sentient, Switzer, DM Mono — self-hosted
data/cycles.js                dashboard data and state — edit this, not the JS
design-source/                the original Claude Design bundle, untouched
```

Everything above is relative to `site/`. Nothing here is referenced by, or
references, anything outside this directory.

The desktop drawing (1440) and the mobile drawing (390) are one responsive
page, not two. Where the mobile pass is written shorter — the methodology
cards, the disclaimer, the About paragraph — both versions are in the markup,
marked `.d-only` and `.m-only`.

Breakpoints:

| Width      | Behaviour                                                       |
|------------|-----------------------------------------------------------------|
| ≥ 1281     | The desktop drawing as made: 96px gutters, 260px label column    |
| 1101–1280  | Gutters tighten to 56, label column to 220                       |
| 901–1100   | Section grids fold to one column; desktop copy and nav remain    |
| ≤ 900      | The mobile drawing: tab strip, Menu button, cards, short copy    |

---

## The three dashboard states

All three are designed and all three are built. Which one renders is decided
by `state` in `data/cycles.js`:

| State       | What it shows                                                   |
|-------------|-----------------------------------------------------------------|
| `live`      | Counts published: age against nominal, tick on the rule, reading per row |
| `stale`     | Counts withheld. Ages become em dashes, readings read `WITHHELD`, anchors stand, a notice gives the reason |
| `prelaunch` | The table before it opens. Same rows, readings read `PENDING`, a dated open |

To review a state without editing the file, append `?state=stale` or
`?state=prelaunch` to the URL. The override is review-only and does not
persist.

`stale` is not an error state. It is drawn as an editorial decision — no
warning colour, no icon, the reason stated on a plate, and the note that
withholding is recorded the same way a missed window is. Please keep it that
way if you touch it.

Copy that changes with the state lives in `index.html`, marked
`data-state-block="live"` (or `"stale prelaunch"` for copy shared by two).
`site.js` only decides which blocks are shown; it holds no prose.

---

## Wiring real data

`data/cycles.js` assigns a plain global rather than being JSON, so the page
works under `file://` where a `fetch` of a local JSON file is blocked. Each
instrument is:

```js
{
  symbol: 'SPX',            // mono caps, the one place mono earns its keep
  name: 'S&P 500',
  nominal: '20-week',
  age: 17,                  // elapsed
  length: 20,               // nominal length
  unit: 'w',                // rendered as "17 / 20 w"
  translation: 'RT',        // RT | LT — of the last completed cycle
  reading: 'Confirmed',     // Confirmed | Provisional | Under review
  anchor: '[DATE]',
  window: '[WINDOW]'
}
```

`Withheld` and `Pending` are set by the state, not written per row.

When the dashboard moves to a live feed, keep the same shape and call the
render again:

```js
const data = await fetch('/api/cycles').then(r => r.json());
KN.dashboard.render(data);
```

Everything else — states, colours, the em-dash treatment, the age rule — is
already keyed off that object.

### The pipeline is the obvious source, and is deliberately not wired

This repository already computes what the dashboard wants: `cycle_anchors.json`
holds the manual DCL/ICL anchors each count runs from, and the pipeline emits
`output/cycle_data_YYYY-MM-DD.json`. An adapter mapping that output to the shape
above is the natural way to populate the `live` state.

That adapter is **not** built here, and nothing in `site/` reads those files.
Per the root `CLAUDE.md` the data layer is not to be touched without explicit
sign-off, and deciding what the site may publish is a governance question
(`GOVERNANCE.md`), not a formatting one. Flagged, not assumed.

---

## Editorial discipline carried over from the brief

These are not stylistic preferences; the second design turn removed a set of
invented facts on purpose. Please do not reintroduce them by filling a slot
with something plausible.

- **An unverified value is written as its token, never as a likely-looking
  number.** The tokens in use are `ISSUE NO. —`, `[DATE]`, `[WINDOW]`,
  `[INSTRUMENTS]`, `[Headline]`, `[Standfirst …]`, and
  `SAMPLE — ILLUSTRATIVE`.
- **The live dashboard is flagged `SAMPLE — ILLUSTRATIVE`** because the ages
  in `data/cycles.js` are the sample figures from the design. Clear that flag
  in `index.html` at the same time you replace the rows — not before.
- **No track record anywhere.** The three figures in the methodology section
  (7 instruments, 0 recommendations, 1 author) are structural, not
  performance. There is no accuracy log, no issue count, no founding year.
- **One credential: Chartered Market Technician.** No licences, no tenure
  claims.
- **No red and no green, and direction is never encoded in colour.** Reading
  status is a step on the grey ramp; oxblood appears only on data marks and
  links.
- **No window band is plotted on the age rule.** Tolerance differs by
  instrument, so a uniform band would misstate it. The legend says so.

---

## Design tokens

Full set in `assets/css/tokens.css`. The values that matter most:

| Token       | Value     | Use                                   |
|-------------|-----------|---------------------------------------|
| ground      | `#EDEEEB` | page                                  |
| paper       | `#F6F6F4` | alternating bands                     |
| plate       | `#E4E5E2` | notices, disclaimer                   |
| ink         | `#16171A` | text, dark bands                      |
| oxblood     | `#6E1E28` | data marks and links only             |
| body        | `#2C2E33` | body text                             |
| muted       | `#5A5C60` | captions — 7.0:1 on ground            |
| withheld    | `#A9ABA7` | a withheld value, live weight kept    |
| rule        | `#D2D3D0` | 1px hairline                          |

Type: **Sentient** sets the masthead, the hero statement and research
headlines and nothing else. **Switzer** sets everything else including every
numeral, with tabular lining figures. **DM Mono** is restricted to instrument
symbols, section identifiers and state labels. The serif never sets a number;
the mono never sets prose. Roughly 70 / 20 / 10.

Radius is 0 everywhere and there are no shadows. Separation is always a 1px
hairline. Spacing is base 4: 4, 8, 14, 22, 36, 56, 88.

---

## Fonts

Self-hosted from the design bundle, so the site has no third-party requests
and works offline. Nine woff2 files, ~150 KB total.

- **Sentient** 400/500 and **Switzer** 400/500/600 — [Fontshare](https://fontshare.com),
  free for personal and commercial use.
- **DM Mono** 400/500 — Google Fonts, SIL Open Font License 1.1. Split into
  latin and latin-ext subsets, as Google serves it.

There are no `<link rel="preload">` hints. A font preload must carry
`crossorigin`, which browsers refuse over `file://`, and this page is meant to
open cleanly off disk. Once it is served over HTTP, adding preloads for
`Switzer-Regular.woff2` and `Sentient-Regular.woff2` is worth one round trip.

---

## Not built yet

Placeholders, deliberately visible rather than filled with invented content:

- **Lab** appears in all three navigations and has no page. Its link is `#`.
- **Research** shows four placeholder rows. They are where the Substack feed
  goes; the design says so in the section's own caption.
- **Subscribe** is not connected to a provider. Submitting says so rather than
  pretending to succeed — see `initSubscribe()` in `site.js`. Point the form
  at the Substack endpoint and delete that handler.
- **Substack, Record, Contact, Terms** in the footer are `#`.
- The **design-system sheet** (`design-source/project/KN System.dc.html`) was not built as a
  page; its contents are transcribed into `assets/css/tokens.css` instead.

---

## Accessibility notes

Skip link to main content. The cycle table is a CSS grid rather than a
`<table>` — the column set is part of how the figures read — so it carries
`role="table"` / `"row"` / `"columnheader"` / `"cell"`. The mobile navigation
sets `aria-expanded`, closes on Escape, returns focus to the Menu button, and
locks background scroll while open. The tab strip marks the current section
with `aria-current`. Mobile hit targets are 44px. Muted text is 7.0:1 on the
ground.
