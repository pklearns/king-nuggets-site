# Fusion Gold Claim Audit — methodology

Sources, calculations, and what could not be checked. Every source below was
opened on 2026-10-22 unless marked otherwise.

## Sources opened

| # | Source | What was checked | Status |
|---|--------|------------------|--------|
| S1 | Marathon Fusion, post on X, https://x.com/MarathonFusion/status/2113001073019662481 | Full text, timestamp (2026-10-21 20:14:48 UTC), attached media. Read via the public fxtwitter JSON mirror because x.com returned HTTP 402. The attachment is a 104.5-second video. Contact sheets were sampled every 4 s; no gamma spectrum, gold mass or "10x" definition appears in it. | Opened (via mirror) |
| S2 | Marathon Fusion thread reply carrying the gamma-ray spectrum | Not found or opened. Described only by press coverage (e.g. The Oregon Group, 2026-10-22: "a single gamma-ray spectrum posted in the thread"; other coverage: signals 8–44 h after irradiation). | **PUBLICATION BLOCKER**. Cited in the article only as press description, labelled Unverified. |
| S3 | CERN news, "ALICE detects the conversion of lead into gold at the LHC", 2025-05-08, https://home.cern/alice-detects-conversion-lead-gold-lhc | "about 86 billion gold nuclei were created at the four major experiments"; "just 29 picograms"; "Run 2 of the LHC (2015–2018)"; "immediately fragment". | Verified |
| S4 | Rutkowski, Harter, Parisi, "Scalable Chrysopoeia via (n,2n) Reactions Driven by Deuterium-Tritium Fusion Neutrons", arXiv 2507.13461 v3 (2025-08-03) | Full PDF text extracted. Abstract: "about 2t/GW_th/yr". §4.1: 1500 MW_th design point; reference case "2953kg/yr of 197Au", TBR 1.19, burn ratio 0.0047, "198Hg mass of 622 tons", 90 at% enrichment. §4.1.2: 6.8 yr (NRC Class A), 13.7 yr (Class 7 threshold), 17.7 yr (banana-equivalent). §5 / Fig. 7: NPV of a $3B 1500 MW_th plant; gold valued at $100k/kg at 3 t/yr. 197Hg half-life 64.1 h. | Verified |
| S5 | Parisi, Azad, "Self-subsidizing Mercury Remediation with Fusion Reactors", arXiv 2604.02590 v1 (2026-04-03) | Full PDF text extracted. Table 2 (1 GW_th D-T source over 30 yr): blanket 393/389 t at 10^14, 3.9 t at 10^16, 393/389 kg at 10^17; Au mass natural/enriched 5.8/49 t, 15/44 t, 14/41 t. "~3x more gold" for enriched feed. Extractable stock 1,500,000 t (citing its ref. [15]). Minamata Convention prohibits new mining. Flow-through blanket in supplement §S9.2. A text search for "cool" found no cooling analysis. | Verified |
| S6 | Karl Lackner, "Fünf Fragen … zur Erzeugung von Gold durch Kernfusion", *Max Planck Forschung* 3/2025, https://www.mpg.de/25429062/S007_Fuenf-Fragen_074.pdf | Marathon's aim of "etwa fünf Tonnen Gold pro Jahr" from "einem Gigawatt elektrischer Leistung"; crustal mercury "auf etwa 600 000 Tonnen geschätzt" giving 600 t gold/yr in the extreme case; enrichment to 90% "technisch sehr aufwendig"; at least 18 years before wearing as jewellery. | Verified |
| S7 | World Gold Council, FY 2025 Gold Demand Trends press release, https://www.gold.org/download/file/20498/FY_2025_GDT_Press_Release.pdf | "mine production rose to 3,672t". The PDF carries no release date. | Verified |
| S8 | World Gold Council, Gold Focus, "You asked, we answered: are we running out of gold?", March 2026, https://www.gold.org/goldhub/gold-focus/2026/03/you-asked-we-answered-are-we-running-out-gold | "total above-ground gold amounts to 219,891t" (Fig. 1 note: "End-2025 estimates from Metals Focus"). Qaurum: "every ~25t gold supply increase/decrease leads to a c.1% decline/rise in the gold price during the same period", holding all else constant. | Verified |
| S9 | World Gold Council, GoldHub "How much gold", https://www.gold.org/goldhub/data/how-much-gold | Current page shows 222,600 t at end-Q2 2026. The article uses the end-2025 figure (S8) for consistency with 2025 mine supply. | Verified (later figure noted) |
| S10 | Yahoo Finance chart API, daily bars for GC=F, SI=F, PL=F, GDX, GDXJ, CL=F, https://query1.finance.yahoo.com/v8/finance/chart/ | Pulled 2026-10-22 ~17:19 ET. ETF closes are final 16:00 ET closes. Futures values are session-end last prices (17:00 ET), **not** CME official settlements. GDX 10/19 close (86.47) matches an independent newsletter. | Verified (see caveats) |
| S11 | USAGOLD daily report 2026-10-22; BusinessToday 2026-10-22 | Attribution of the day's move to oil reviving rate-hike bets ahead of the 27–28 Oct FOMC. Read through search summaries only. | Secondary; labelled Analyst scenario |
| S12 | The Oregon Group, 2026-10-22, https://theoregongroup.com/latest-news/marathon-fusion-mercury-gold-cern-record-cost/ | "10x" metric undefined; no mass or cost disclosed; "the paper models revenue, not cost". | Secondary, corroborating |

## Calculations

All values were recomputed in this session.

- 2 t ÷ 3,672 t = 0.0545% → "0.054%".
- 2.953 t ÷ 3,672 t = 0.0804% → "0.080%".
- 2,953 kg ÷ 1.5 GW_th = 1,969 kg per GW_th → consistent with "~2 t/GW_th/yr".
- 2 t per GW_th ÷ 0.40 conversion efficiency (the paper's assumption) = 5 t per GW_e.
- 10 × 29 pg = 290 pg (total-mass reading of "10x"). A rate reading cannot be totalled without a run time, which is undisclosed. The brief's "< 1 ng under any reading" holds only on the total-mass reading, so the article does not make the stronger claim.
- 2604.02590 Table 2, ÷ 30 yr (assumes the Table 2 "Au mass" rows are undiscounted 30-yr totals; the paper does not say so explicitly, while its NPV rows are discounted at r = 5%): at 10^16 n/cm²/s, natural 15 t → 0.50 t/yr and enriched 44 t → 1.47 t/yr (ratio 2.9×). At 10^17: 0.47 and 1.37 t/yr. At 10^14 (MCF): natural 5.8 t → 0.19 t/yr and enriched 49 t → 1.63 t/yr (ratio 8.4×). The brief's "0.5–1.6 t per GW-yr" mixes flux regimes; the article states the high-flux range (0.5–1.5) and the MCF natural figure separately. The paper's text says "~3× across all fluxes"; that matches its per-neutron rate (44.7 vs 14.1 Au atoms per 100 neutrons = 3.2×), not its MCF 30-year totals. The article uses "about three times" for the high-flux case only.
- 1,500,000 t ÷ 600,000 t = 2.5×.
- 2 t ÷ 219,891 t = 0.00091% → "0.0009%". 3,672 ÷ 219,891 = 1.67% → "about 1.7%".
- Qaurum rule of thumb: 2.953 t ÷ 25 t × 1% = 0.12% → "about 0.1%". Illustrative only.
- 22 Oct changes (close 21 Oct → close 22 Oct): GC 4,150.0 → 4,039.8 (−2.66%); SI 57.422 → 54.630 (−4.86%); PL 1,625.5 → 1,570.2 (−3.40%); GDX 86.72 → 81.69 (−5.80%); GDXJ 108.52 → 101.20 (−6.75%); CL 97.15 → 99.10 (+2.01%).
- Figure A bar widths: log10(value in t) ÷ 6 decades (1 t to 1,000,000 t). 2 t → 5.0%; 3,672 t → 59.4%; 219,891 t → 89.0%.

## Caveats

- **Futures timing.** The post landed at 16:14 ET on 21 Oct. COMEX/NYMEX trade until 17:00 ET, so the 21 Oct futures "close" already includes 46 minutes after the post. The ETFs closed at 16:00 ET, before the post, so they are the cleaner comparison. Both show silver and the miners falling more than gold.
- **Settlements.** CME official settlements were not pulled. If the article must cite settlements, replace the S10 futures values.
- **View counts.** S1 showed 5,268,050 views at fetch time (2026-10-22 ~21:20 UTC, ~25 h after posting). No source for a count "in a day" was checked.
- **Peer review.** Neither abstract page showed a journal reference in the fetched text. That was not checked further, so the article treats both as preprints.

## Not accessible

- x.com directly (HTTP 402). Worked around for the main post via the fxtwitter mirror.
- S2, the thread reply with the spectrum: **PUBLICATION BLOCKER**.
- The 1.5 Mt extractable-mercury source (ref. [15] of S5): not opened. Labelled Unverified.

## Share images

- `og.png` (1200×630) and `og-portrait.png` (1080×1350) are rendered from `og-card.html`, using the site's own fonts and `lab.css` tokens. The portrait variant adds `class="portrait"` on `<html>`.
- Renderer: a short Swift script using macOS WebKit (`WKWebView.takeSnapshot`), local files only. Headless Brave was tried first and produced no output on this machine.
- The headline number: 2.953 t ÷ 3,672 t = 0.080% → "≈ 0.08%".
