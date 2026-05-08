# Unimplemented Features

Features present in the prototype that require real backend integrations or further build work.

---

## Live Data

### Schwab OAuth + Portfolio Sync
**Where:** `/portfolio` page, sidebar holdings values, ticker prices in theme detail.  
**What:** The portfolio page (`app/portfolio/page.tsx`) shows a placeholder. Real implementation needs Schwab OAuth2 PKCE flow, token storage in Supabase, and the `/api/schwab/portfolio` route returning live positions.  
**Data it unlocks:** real portfolio value, actual day P&L, cost basis, live prices on all tickers.

### Live Ticker Prices
**Where:** Theme detail tickers table (`PRICE`, `DAY`, `30D` columns), holdings sidebar.  
**What:** All prices are currently static seed data in `lib/data/themes.ts`. Integration needs a market data provider (Schwab streaming quotes, Polygon.io, or similar) wired into the ticker rows. The columns are already rendered — swap static strings for fetched values.

---

## AI Brief Generation

### Daily Thesis Brief (`OPEN FULL BRIEF →`)
**Where:** Dashboard hero band "OPEN FULL BRIEF →" button; the `brief` tab in the header.  
**What:** The brief currently shows static copy. The prototype intends a full `/brief` page that runs a nightly Claude job (via the AI Gateway route at `app/api/claude/update-themes/route.ts`) against each thesis prompt, produces verdict diffs, and persists the result to Supabase. The brief page should show the full narrative for each thesis update, sources cited, and a diff vs the previous day.  
**Dependencies:** Supabase `themes` and `brief_runs` tables (schema in `supabase/migrations/`), Claude AI Gateway credentials in `.env.local`.

### Thesis Auto-Update Engine
**Where:** Theme detail "AI DAILY COMMENTARY" section; conviction / verdict changes.  
**What:** Commentary is static. Each thesis has a `cadence` (daily / weekly) and a stored prompt. The cron job at `app/api/claude/update-themes/route.ts` should re-run each prompt against the past 24h of relevant news, compare to the stored thesis, and write back `{ verdict, conviction, commentary, diffs }` to Supabase. Trigger: Vercel Cron at 09:00 ET.

### News Source Integration
**Where:** "CONTEXT · SCHWAB ✓ · 12 NEWS SOURCES ✓" label in theme creation; sources footer in brief updates.  
**What:** The prototype shows source attribution per brief item (e.g. "TSMC IR · 06:00 ET", "Bloomberg · 07:14 ET"). This requires a news/RSS aggregator (e.g. NewsAPI, Perplexity, or a curated set of feeds) that the daily prompt queries before calling Claude. The sources list in `TODAYS_BRIEF.updates[].sources` is placeholder data.

---

## Interactive UI Features

### "DIFF VS YESTERDAY" Button
**Where:** Brief hero band footer.  
**What:** Should open a side-by-side or inline diff view of today's thesis text vs yesterday's, highlighting added/removed sentences. Requires storing previous-day thesis snapshots in Supabase.

### "EXPORT NOTE" Button
**Where:** Brief hero band footer.  
**What:** Should export the current brief as a Markdown or PDF note. Can be implemented as a simple API route that renders the brief and returns a downloadable file.

### `DIFF v6 → v7` Button (Theme Detail)
**Where:** Breadcrumb action row on the theme detail page.  
**What:** Should render a structured diff between two revision snapshots — bullet additions/removals, conviction delta, stance change. Data model already supports `revisions[].diffs`; needs a UI diff panel.

### `RUN NOW` Button (Theme Detail)
**Where:** Breadcrumb action row on the theme detail page.  
**What:** Triggers an on-demand re-run of the thesis prompt via the AI Gateway, outside of the regular cadence. Calls `POST /api/claude/update-themes` with the specific theme ID. Shows a loading state and updates the commentary on completion.

### Theme Creation Chat — Live AI
**Where:** `/themes/new` page, left chat column.  
**What:** The chat UI is static wireframe copy. Real implementation connects the composer to a streaming Claude route, passing Schwab context (owned tickers) and iteratively building the thesis draft. The right-panel live preview updates as the AI responds. Uses the AI SDK `streamText` with tool calls to populate the draft fields.

### Chart Period Selector (1M / 3M / 6M / YTD / 1Y)
**Where:** Theme detail annotated chart, period buttons.  
**What:** Buttons are visual only. Clicking should refetch or filter the price series to the selected window and re-render the chart. Requires either live price data or pre-computed historical baskets stored in Supabase.

---

## Portfolio Page
**Where:** `/portfolio` (currently shows "SCHWAB OAUTH NOT YET CONFIGURED").  
**What:** Full portfolio view with Schwab-sourced positions table, allocation heatmap (themes × holdings), P&L by position, and exposure breakdown. Blocked on Schwab OAuth above.
