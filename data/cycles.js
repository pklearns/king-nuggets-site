/* ==========================================================================
   King Nuggets — cycle dashboard data
   ==========================================================================

   This is the single source of truth for the dashboard. It is a plain script
   rather than JSON so the page works when opened straight off disk (a fetch()
   of a local .json file is blocked by the browser under file://). When the
   dashboard is wired to a real feed, replace the assignment below with a
   fetch and hand the same shape to KN.dashboard.render().

   `state` drives which of the three designed states the page renders:

     live       counts published, ages against nominal, readings per row
     stale      counts withheld — anchors stand, arithmetic is held back
     prelaunch  the table before it opens, structure shown, values pending

   `?state=stale` etc. in the URL overrides this for review without editing
   the file. The override is review-only; it does not persist.

   ------------------------------------------------------------------------
   Discipline that applies when real values land here:

     · An unverified value is written as its token — [DATE], [WINDOW],
       ISSUE NO. — — never as a plausible-looking number.
     · Dates are DD MMM YYYY, uppercase.
     · Windows carry both ends, en dash between. A single date is never
       published as a trough.
     · `reading` is the status of the reading, not a confidence score.
       One of: Confirmed · Provisional · Under review.
       Withheld and Pending are set by the state, not written here.

   The ages below are the sample figures carried through from the design, and
   the header says so: the live state is flagged SAMPLE — ILLUSTRATIVE until
   real counts are wired in. Clear that flag in index.html at the same time
   you replace these rows.
   ------------------------------------------------------------------------ */

window.KN_CYCLES = {
  state: 'prelaunch',

  instruments: [
    {
      symbol: 'SPX',
      name: 'S&P 500',
      nominal: '20-week',
      age: null,
      length: null,
      unit: 'w',
      translation: null,
      reading: null,
      anchor: '[DATE]',
      window: '[WINDOW]'
    },
    {
      symbol: 'NDX',
      name: 'Nasdaq 100',
      nominal: '40-day',
      age: null,
      length: null,
      unit: 'd',
      translation: null,
      reading: null,
      anchor: '[DATE]',
      window: '[WINDOW]'
    },
    {
      symbol: 'GC',
      name: 'Gold',
      nominal: '18-month',
      age: null,
      length: null,
      unit: 'd',
      translation: null,
      reading: null,
      anchor: '[DATE]',
      window: '[WINDOW]'
    },
    {
      symbol: 'SI',
      name: 'Silver',
      nominal: '20-week',
      age: null,
      length: null,
      unit: 'w',
      translation: null,
      reading: null,
      anchor: '[DATE]',
      window: '[WINDOW]'
    },
    {
      symbol: 'DXY',
      name: 'Dollar Index',
      nominal: '40-week',
      age: null,
      length: null,
      unit: 'w',
      translation: null,
      reading: null,
      anchor: '[DATE]',
      window: '[WINDOW]'
    },
    {
      symbol: 'CL',
      name: 'WTI Crude',
      nominal: '40-day',
      age: null,
      length: null,
      unit: 'd',
      translation: null,
      reading: null,
      anchor: '[DATE]',
      window: '[WINDOW]'
    },
    {
      symbol: 'TNX',
      name: '10-Year Yield',
      nominal: '54-month',
      age: null,
      length: null,
      unit: 'd',
      translation: null,
      reading: null,
      anchor: '[DATE]',
      window: '[WINDOW]'
    }
  ]
};
