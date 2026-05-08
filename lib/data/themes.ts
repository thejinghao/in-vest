// Seed data — mirrors the prototype's data.jsx.
// Replace with live Supabase + Schwab queries when those integrations are ready.

export type Verdict = "bull" | "bear" | "neutral";

export interface Theme {
  id: string;
  name: string;
  verdict: Verdict;
  conviction: number;
  perf30: number;
  perfYTD: number;
  tickers: string[];
  owned: string[];
  updated: string;
  seed: number;
  tags: string[];
  cadence: "daily" | "weekly";
  created: string;
  version: number;
}

export const THEMES: Theme[] = [
  {
    id: "semis-overheat",
    name: "Semiconductor Cycle — Cautious at the Peak",
    verdict: "bear",
    conviction: 7,
    perf30: -4.2,
    perfYTD: 18.6,
    tickers: ["NVDA", "AVGO", "TSM", "AMD", "AMAT", "KLAC", "LRCX", "INTC"],
    owned: ["NVDA", "AVGO", "AMAT", "KLAC"],
    updated: "today · 09:14",
    seed: 12,
    tags: ["CYCLICAL", "SHORT-MEDIUM TERM", "CHIPS · TAIWAN · AI CAPEX"],
    cadence: "daily",
    created: "Feb 14",
    version: 7,
  },
  {
    id: "ai-infra-spend",
    name: "AI Infra Spend Cycle",
    verdict: "bull",
    conviction: 8,
    perf30: 6.1,
    perfYTD: 24.3,
    tickers: ["MSFT", "GOOGL", "META", "ANET", "VRT"],
    owned: ["MSFT", "GOOGL"],
    updated: "4h ago",
    seed: 7,
    tags: ["SECULAR", "LONG TERM"],
    cadence: "daily",
    created: "Jan 20",
    version: 4,
  },
  {
    id: "onshoring",
    name: "US Manufacturing Onshoring",
    verdict: "bull",
    conviction: 6,
    perf30: 2.4,
    perfYTD: 11.2,
    tickers: ["CAT", "ETN", "PWR", "ROK", "NUE"],
    owned: ["ETN", "NUE"],
    updated: "today",
    seed: 21,
    tags: ["MACRO", "POLICY-DRIVEN"],
    cadence: "weekly",
    created: "Mar 3",
    version: 2,
  },
  {
    id: "glp1-fade",
    name: "GLP-1 Hype Fade",
    verdict: "bear",
    conviction: 5,
    perf30: -1.7,
    perfYTD: -6.8,
    tickers: ["LLY", "NVO", "PFE", "AMGN"],
    owned: ["LLY"],
    updated: "yesterday",
    seed: 33,
    tags: ["HEALTHCARE", "CONTRARIAN"],
    cadence: "weekly",
    created: "Feb 28",
    version: 3,
  },
  {
    id: "energy-grid",
    name: "Grid & Power Buildout",
    verdict: "bull",
    conviction: 7,
    perf30: 4.8,
    perfYTD: 15.9,
    tickers: ["VST", "CEG", "NEE", "GEV", "ETR"],
    owned: ["VST", "GEV"],
    updated: "1d ago",
    seed: 55,
    tags: ["INFRASTRUCTURE", "AI-ADJACENT"],
    cadence: "daily",
    created: "Jan 8",
    version: 5,
  },
  {
    id: "cn-consumer",
    name: "China Consumer Recovery",
    verdict: "neutral",
    conviction: 4,
    perf30: 0.8,
    perfYTD: -2.1,
    tickers: ["BABA", "PDD", "JD", "YUMC"],
    owned: [],
    updated: "2d ago",
    seed: 91,
    tags: ["MACRO", "EM", "SPECULATIVE"],
    cadence: "weekly",
    created: "Apr 1",
    version: 1,
  },
];

// Deterministic pseudo-random walk for placeholder sparklines.
export function walk(seed: number, n = 24, drift = 0.005, vol = 0.05): number[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out = [0.5];
  for (let i = 1; i < n; i++) {
    const next = out[i - 1] + (rand() - 0.5) * vol + drift;
    out.push(Math.max(0.05, Math.min(0.95, next)));
  }
  return out;
}

// "Today's Brief" hero data for dashboard.
export const BRIEF_UPDATES = [
  {
    themeId: "semis-overheat",
    tone: "bear" as Verdict,
    tag: "SEMI CYCLE",
    badge: "▼ VERDICT STRENGTHENED",
    badgeClass: "badge-bear",
    body: 'TSMC announces additional Arizona Fab 4 expansion — supports the supply-relief leg of the thesis',
    highlight: "TSMC announces additional Arizona Fab 4 expansion",
    holdings: "4 of your holdings affected · NVDA, AVGO, KLAC, AMAT",
    isLead: true,
    diffConviction: ["6", "7"],
  },
  {
    themeId: "ai-infra-spend",
    tone: "bull" as Verdict,
    tag: "AI INFRA",
    badge: "▲ UPDATED",
    badgeClass: "badge-bull",
    body: "MSFT raised FY27 capex guide +18% YoY — hyperscaler signal still strong",
    highlight: "MSFT raised FY27 capex guide +18% YoY",
    holdings: "MSFT, GOOGL",
    isLead: false,
  },
  {
    themeId: "energy-grid",
    tone: "bull" as Verdict,
    tag: "GRID",
    badge: "▲ UPDATED",
    badgeClass: "badge-bull",
    body: "FERC final rule on data-center load · tailwind for VST/CEG",
    highlight: null,
    holdings: "VST, GEV",
    isLead: false,
  },
  {
    themeId: "cn-consumer",
    tone: "neutral" as Verdict,
    tag: "CN CONSUMER",
    badge: "◆ NO CHANGE",
    badgeClass: "badge-flat",
    body: "April PMI flat at 51.2 · no change to verdict",
    highlight: null,
    holdings: "—",
    isLead: false,
  },
];

export interface Holding {
  ticker: string;
  shares: number;
  price: number;
  costBasis: number;
  cash?: number;
  themes: string[];
  chg: number; // day % change
}

export const HOLDINGS: Holding[] = [
  { ticker: "NVDA",  shares: 240, price: 118.40, costBasis: 78.20,  themes: ["Semi Cycle", "AI Infra"], chg: 1.8 },
  { ticker: "MSFT",  shares: 410, price: 444.60, costBasis: 312.00, themes: ["AI Infra"],               chg: 0.6 },
  { ticker: "AVGO",  shares: 80,  price: 1358.00, costBasis: 920.00, themes: ["Semi Cycle"],             chg: -0.4 },
  { ticker: "GOOGL", shares: 600, price: 160.30, costBasis: 134.00, themes: ["AI Infra"],               chg: 1.1 },
  { ticker: "KLAC",  shares: 18,  price: 712.00, costBasis: 580.00, themes: ["Semi Cycle"],             chg: -1.0 },
  { ticker: "AMAT",  shares: 50,  price: 198.30, costBasis: 165.00, themes: ["Semi Cycle"],             chg: -0.6 },
  { ticker: "VST",   shares: 320, price: 130.60, costBasis: 78.00,  themes: ["Grid"],                   chg: 2.4 },
  { ticker: "GEV",   shares: 60,  price: 358.20, costBasis: 220.00, themes: ["Grid"],                   chg: 1.8 },
  { ticker: "ETN",   shares: 90,  price: 314.00, costBasis: 268.00, themes: ["Onshoring"],              chg: 0.8 },
  { ticker: "NUE",   shares: 110, price: 172.00, costBasis: 158.00, themes: ["Onshoring"],              chg: -0.2 },
  { ticker: "LLY",   shares: 25,  price: 776.00, costBasis: 824.00, themes: ["GLP-1"],                  chg: -1.6 },
  { ticker: "CASH",  shares: 0,   price: 1,      costBasis: 1,      themes: ["—"],                      chg: 0, cash: 52612 },
];

export function holdingValue(h: Holding): number {
  return h.cash ?? h.shares * h.price;
}

export function holdingValueStr(h: Holding): string {
  const v = holdingValue(h);
  return "$" + Math.round(v).toLocaleString("en-US");
}

// Portfolio coverage by theme — static allocation estimates.
export const COVERAGE_BY_THEME = [
  { name: "Semi Cycle", pct: 23, tone: "bear" as const },
  { name: "AI Infra",   pct: 41, tone: "bull" as const },
  { name: "Grid",       pct: 11, tone: "bull" as const },
  { name: "Onshoring",  pct: 6,  tone: "bull" as const },
  { name: "GLP-1",      pct: 2,  tone: "bear" as const },
  { name: "Uncovered",  pct: 17, tone: "flat" as const },
];

// Detail page data — fully authored for semis-overheat; other themes fall back to it.
export const THESIS_DETAIL: Record<string, {
  core: string;
  intel?: string;
  bulls: string[];
  bears: string[];
  bullets: Array<{ text: string; highlight?: "bear" | "bull" }>;
  commentary: string;
  signals: Array<{ name: string; state: "red" | "amber" | "green"; dir: "up" | "down" | "flat"; note: string }>;
  tickers: Array<{ ticker: string; stance: string; note: string; owned: string; price: string; day: number; month30: number }>;
  scorecard: Array<{ label: string; value: string; tone: "bear" | "bull"; bar: number }>;
  sentimentRibbon: Array<"bull-strong" | "bull" | "neutral" | "bear" | "bear-strong">;
  chartEvents: Array<{ at: number; label: string }>;
  revisions: Array<{ version: string; date: string; conviction: number; verdict: string; tone: "bear" | "bull" | "neutral"; diffs: Array<[string, string]>; note: string }>;
}> = {
  "semis-overheat": {
    core: `The AI buildout has meaningfully extended the semiconductor upcycle, but the cycle is approaching an inflection. Semiconductors are a fundamentally cyclical, commoditizing business — capacity shortages always attract capital, and that capital is arriving now. TSMC, Samsung, and Intel are all expanding aggressively. As supply comes online, the structural scarcity premium embedded in today's multiples compresses. Current valuations across the sector price in a sustained super-cycle; history says that's not how this ends.`,
    intel: `Recent announcements — 18A progress, the Apple foundry partnership signals — are directionally real and should not be dismissed. But the market is conflating narrative progress with operational capability. Intel remains several years behind TSMC on advanced node yield, defect density, and production throughput. The Apple relationship reflects Apple's strategic interest in hedging supplier concentration, not a judgment that Intel's foundry is ready to compete.`,
    bulls: [
      "AI inference demand continues compounding and is still in early innings",
      "Hyperscaler AI capex remains elevated with no clear pullback signal",
      "Intel 18A could surprise on yield — closing the gap faster than expected",
      "Geopolitical tailwinds (CHIPS Act, onshoring) sustain demand for domestic capacity",
    ],
    bears: [
      "TSMC capacity expansion eases the structural supply shortage underpinning pricing",
      "Semis are a commoditizing product category — pricing power erodes over time",
      "Valuations (forward P/E, EV/Sales) at or near historical peaks vs. normalized earnings",
      "Intel foundry is years from competing at advanced nodes; optionality is priced in early",
      "Apple partnership is a hedge, not a volume commitment — execution risk is massive",
    ],
    bullets: [
      { text: "SOX index trades 2.1σ above 200-DMA — historically followed by 3–6mo mean reversion" },
      { text: "Hyperscaler capex pull-forward: 2024 orders likely consumed forward demand" },
      { text: "TSMC gross-margin guide cut today — confirms pricing softness at the leading edge", highlight: "bear" },
      { text: "Inventory days at NVDA distributors creeping up 4 weeks running" },
      { text: "Risk to bear: sustained AI training capex from sovereigns (Saudi, UAE, EU)" },
    ],
    commentary: "Today's signal supports the supply-relief leg of the bear thesis. TSMC announced an additional Arizona Fab 4 expansion at advanced nodes, accelerating the timeline for the structural-shortage premium to compress. Combined with NVDA gross margin compression already logged in v6, this strengthens the valuation-reset call. Counter-evidence flagged: MSFT raised FY27 capex guide +18% YoY — hyperscaler signal still strong; watching whether this offsets the supply build. Conviction nudged from 6 to 7.",
    signals: [
      { name: "TSMC capacity guidance & utilization", state: "amber", dir: "down", note: "Q1: 92% util, capex +14% YoY" },
      { name: "Intel 18A yield disclosures",          state: "green", dir: "up",   note: "First customer tape-outs Q3" },
      { name: "Hyperscaler AI capex commentary",      state: "green", dir: "up",   note: "META, MSFT, GOOG, AMZN" },
      { name: "Nvidia gross margin trend",            state: "red",   dir: "down", note: "−180bps since Jan" },
      { name: "SEMI book-to-bill ratio",              state: "amber", dir: "flat", note: "1.04 · trending lower" },
      { name: "Memory pricing (DRAM/NAND)",           state: "red",   dir: "down", note: "NAND ASP −9% QoQ" },
    ],
    tickers: [
      { ticker: "INTC", stance: "AVOID",     note: "narrative ahead of execution",        owned: "—",      price: "38.40",   day: -2.1, month30: -8.4 },
      { ticker: "NVDA", stance: "TRIM/HOLD", note: "best-in-class · no margin of safety", owned: "240 sh", price: "118.40",  day: 1.8,  month30: -3.1 },
      { ticker: "TSM",  stance: "HOLD",      note: "best operator · valuation is full",   owned: "—",      price: "178.20",  day: -3.6, month30: -7.1 },
      { ticker: "AMD",  stance: "NEUTRAL",   note: "leveraged · less overvalued",          owned: "—",      price: "142.10",  day: -1.2, month30: -5.8 },
      { ticker: "AMAT", stance: "WATCH",     note: "equipment leads the cycle",            owned: "50 sh",  price: "198.30",  day: -0.6, month30: -2.4 },
      { ticker: "KLAC", stance: "WATCH",     note: "process control · cycle signal",       owned: "18 sh",  price: "712.00",  day: -1.0, month30: -3.0 },
      { ticker: "LRCX", stance: "WATCH",     note: "etch/deposition · cycle signal",       owned: "—",      price: "884.00",  day: -0.7, month30: -3.6 },
      { ticker: "AVGO", stance: "HOLD",      note: "AI ASIC exposure",                     owned: "80 sh",  price: "1,358",   day: -0.4, month30: -2.4 },
    ],
    scorecard: [
      { label: "Valuation vs 5Y avg", value: "+2.1σ",    tone: "bear", bar: 0.85 },
      { label: "Demand-pull signal",  value: "WEAKENING", tone: "bear", bar: 0.75 },
      { label: "Inventory days",      value: "47d (+8)",  tone: "bear", bar: 0.70 },
      { label: "Capex commitments",   value: "STRONG",    tone: "bull", bar: 0.65 },
      { label: "Sell-side revisions", value: "−8% / 4w", tone: "bear", bar: 0.60 },
    ],
    sentimentRibbon: ["bull","bull","neutral","neutral","bull","neutral","neutral","bear","bear","neutral","bear","bear","bear-strong","bear","bear-strong"],
    chartEvents: [
      { at: 8,  label: "v1 created" },
      { at: 28, label: "NVDA print" },
      { at: 50, label: "v5 capex peak?" },
      { at: 64, label: "v6 NVDA GM cut" },
      { at: 76, label: "TSMC AZ Fab 4" },
    ],
    revisions: [
      { version: "v7", date: "May 8",  conviction: 7, verdict: "BEAR · 7",    tone: "bear",    diffs: [["~", "Conviction 6 → 7"], ["~", "Stance CAUTIOUS → CAUTIOUS / TRIM"], ["+", "TSMC AZ Fab 4 expansion"]], note: "TSMC AZ Fab 4 expansion confirms supply-relief leg." },
      { version: "v6", date: "Apr 18", conviction: 6, verdict: "BEAR · 6",    tone: "bear",    diffs: [["→", "NEUTRAL → CAUTIOUS"], ["+", "NVDA gross margin −180bps since Jan"], ["+", "NAND ASP −9% QoQ"]], note: "Verdict pivots after NVDA GM compression confirmed." },
      { version: "v5", date: "Apr 2",  conviction: 5, verdict: "NEUTRAL · 5", tone: "neutral", diffs: [["+", "Hyperscaler capex pull-forward risk"], ["−", 'Removed: "AI demand uncapped"']], note: "Stepped back as valuations stretched; capex still strong." },
      { version: "v4", date: "Mar 12", conviction: 6, verdict: "BULL · 6",    tone: "bull",    diffs: [["+", "EUV bottleneck supports ASML / KLAC"], ["~", "Holding NVDA, AVGO, AMAT"]], note: "Held bullish — EUV supply still tight." },
      { version: "v3", date: "Mar 1",  conviction: 6, verdict: "BULL · 6",    tone: "bull",    diffs: [["+", "Added: AI inference compounding"], ["+", "Universe → 8 tickers"]], note: "Initial bullish frame post-NVDA print." },
      { version: "v2", date: "Feb 22", conviction: 5, verdict: "BULL · 5",    tone: "bull",    diffs: [["+", "Added INTC as avoid"], ["+", "Added equipment names"]], note: "Refined universe and sub-signals." },
      { version: "v1", date: "Feb 14", conviction: 5, verdict: "BULL · 5",    tone: "bull",    diffs: [["+", "Created"]], note: "Initial thesis created." },
    ],
  },
};

export function getThemeDetail(id: string) {
  return THESIS_DETAIL[id] ?? THESIS_DETAIL["semis-overheat"];
}

export function getTheme(id: string): Theme | undefined {
  return THEMES.find((t) => t.id === id);
}
