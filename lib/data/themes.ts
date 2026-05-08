// Seed data — mirrors THEMES, HOLDINGS, BRIEF_UPDATES, etc. from the wireframe.
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
}

export const THEMES: Theme[] = [
  {
    id: "semis-overheat",
    name: "Semis: Overheated & Overbought",
    verdict: "bear",
    conviction: 7,
    perf30: -4.2,
    perfYTD: 18.6,
    tickers: ["NVDA", "AMD", "TSM", "AVGO", "ASML"],
    owned: ["NVDA", "AVGO"],
    updated: "2h ago",
    seed: 12,
    tags: ["CYCLICAL", "SHORT-MEDIUM TERM", "CHIPS · TAIWAN · AI CAPEX"],
    cadence: "daily",
    created: "FEB 14",
  },
  {
    id: "ai-infra-spend",
    name: "AI Infra Spend Cycle",
    verdict: "bull",
    conviction: 8,
    perf30: 6.1,
    perfYTD: 24.3,
    tickers: ["MSFT", "GOOGL", "META", "ANET", "VRT"],
    owned: ["MSFT", "GOOGL", "ANET"],
    updated: "4h ago",
    seed: 7,
    tags: ["SECULAR", "LONG TERM"],
    cadence: "daily",
    created: "JAN 20",
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
    created: "MAR 3",
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
    created: "FEB 28",
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
    created: "JAN 8",
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
    created: "APR 1",
  },
];

// Deterministic pseudo-random walk for placeholder sparklines.
// seed: integer, n: data points, drift: per-step bias, vol: noise amplitude.
export function walk(
  seed: number,
  n = 24,
  drift = 0.005,
  vol = 0.05,
): number[] {
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

// "Today's Brief" hero data for Dashboard B.
export const BRIEF_UPDATES = [
  {
    tone: "bear" as Verdict,
    tag: "SEMIS",
    badge: "▼ VERDICT STRENGTHENED",
    badgeClass: "badge-bear",
    body: 'TSM cuts Q2 gross-margin guide by 80bps — directly supports the “overheating” call. Conviction 6 → 7.',
    highlight: "TSM cuts Q2 gross-margin guide by 80bps",
    holdings: "2 of your holdings affected · NVDA, AVGO",
    isLead: true,
  },
  {
    tone: "bull" as Verdict,
    tag: "AI INFRA",
    badge: "▲ UPDATED",
    badgeClass: "badge-bull",
    body: "MSFT capex +18% YoY — thesis bull case strengthens",
    highlight: "MSFT capex +18% YoY",
    holdings: "MSFT, GOOGL",
    isLead: false,
  },
  {
    tone: "bull" as Verdict,
    tag: "GRID",
    badge: "▲ UPDATED",
    badgeClass: "badge-bull",
    body: "FERC rule on data-center load · tailwind for VST/CEG",
    highlight: null,
    holdings: "VST, GEV",
    isLead: false,
  },
  {
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

export const HOLDINGS = [
  { ticker: "NVDA", shares: 240, val: "$28,400", themes: ["Semis", "AI Infra"], chg: 1.8 },
  { ticker: "MSFT", shares: 410, val: "$182,300", themes: ["AI Infra"], chg: 0.6 },
  { ticker: "AVGO", shares: 80, val: "$108,700", themes: ["Semis"], chg: -0.4 },
  { ticker: "GOOGL", shares: 600, val: "$96,200", themes: ["AI Infra"], chg: 1.1 },
  { ticker: "VST", shares: 320, val: "$41,800", themes: ["Grid"], chg: 2.4 },
  { ticker: "ETN", shares: 90, val: "$28,300", themes: ["Onshoring"], chg: 0.8 },
  { ticker: "NUE", shares: 110, val: "$18,900", themes: ["Onshoring"], chg: -0.2 },
  { ticker: "LLY", shares: 25, val: "$19,400", themes: ["GLP-1"], chg: -1.6 },
  { ticker: "CASH", shares: 0, val: "$52,612", themes: ["—"], chg: 0 },
];

// Detail page: thesis bullets + AI commentary for each theme.
// "semis-overheat" is fully fleshed out; others fall back to generated copy.
export const THESIS_DETAIL: Record<string, {
  bullets: Array<{ text: string; highlight?: "bear" | "bull" }>;
  commentary: string;
  tickers: Array<{ ticker: string; role: string; owned: string; price: string; day: number; month30: number }>;
  scorecard: Array<{ label: string; value: string; tone: "bear" | "bull"; bar: number }>;
  sentimentRibbon: Array<"bull-strong" | "bull" | "neutral" | "bear" | "bear-strong">;
  chartEvents: Array<{ at: number; label: string }>;
  revisions: Array<{ version: string; date: string; verdict: string; tone: "bear" | "bull" | "neutral"; diffs: Array<[string, string]>; note: string }>;
}> = {
  "semis-overheat": {
    bullets: [
      { text: "SOX index trades 2.1σ above 200-DMA — historically followed by 3-6mo mean reversion" },
      { text: "Hyperscaler capex pull-forward: 2024 orders likely consumed forward demand" },
      { text: "TSM gross-margin guide cut today — confirms pricing softness at the leading edge", highlight: "bear" },
      { text: "Inventory days at NVDA distributors creeping up 4 weeks running" },
      { text: "Risk to bear: sustained AI training capex from sovereigns (Saudi, UAE, EU)" },
    ],
    commentary: "Three new signals support the bear case today. TSM cut Q2 GM guide by 80bps, citing utilization at trailing-edge nodes; the Philly Fed semis subindex printed −12 vs. +4 prior; and Susquehanna lowered '25 NAND ASP estimates. NVDA inventory at the channel rose to 47 days vs. 39 days four weeks ago. Counter-evidence: Saudi PIF announced an additional $15B AI infra commitment overnight — watching whether this offsets the demand-pull weakness.",
    tickers: [
      { ticker: "NVDA", role: "Lead exposure", owned: "240 sh", price: "118.40", day: 1.8, month30: -3.1 },
      { ticker: "AVGO", role: "Concentrated supplier", owned: "80 sh", price: "1,358", day: -0.4, month30: -2.4 },
      { ticker: "TSM", role: "Foundry leverage", owned: "—", price: "178.20", day: -3.6, month30: -7.1 },
      { ticker: "AMD", role: "AI accel · #2", owned: "—", price: "142.10", day: -1.2, month30: -5.8 },
      { ticker: "ASML", role: "EUV monopoly", owned: "—", price: "894.00", day: -0.9, month30: -4.0 },
    ],
    scorecard: [
      { label: "Valuation vs 5Y avg", value: "+2.1σ", tone: "bear", bar: 0.85 },
      { label: "Demand-pull signal", value: "WEAKENING", tone: "bear", bar: 0.75 },
      { label: "Inventory days", value: "47d (+8)", tone: "bear", bar: 0.7 },
      { label: "Capex commitments", value: "STRONG", tone: "bull", bar: 0.65 },
      { label: "Sell-side revisions", value: "−8% / 4w", tone: "bear", bar: 0.6 },
    ],
    sentimentRibbon: ["bull","bull","neutral","neutral","bull","neutral","neutral","bear","bear","neutral","bear","bear","bear-strong","bear","bear-strong"],
    chartEvents: [
      { at: 18, label: "Thesis created" },
      { at: 42, label: "NVDA earnings" },
      { at: 64, label: "AI capex peak?" },
      { at: 76, label: "TSM guide cut" },
    ],
    revisions: [
      { version: "v7", date: "TODAY · 09:14", verdict: "BEAR · 7", tone: "bear", diffs: [["+", "TSM gross-margin guide cut today"], ["~", "Conviction 6 → 7"]], note: "Demand-pull signal weakening confirmed." },
      { version: "v6", date: "APR 18", verdict: "BEAR · 6", tone: "bear", diffs: [["→", "Verdict NEUTRAL → BEAR"], ["+", "Inventory days inflecting"]], note: "First evidence of channel softness." },
      { version: "v5", date: "MAR 30", verdict: "NEUTRAL · 5", tone: "neutral", diffs: [["+", "Hyperscaler capex pull-forward risk"], ["−", "Removed: \"AI demand uncapped\""]], note: "Stepping back as valuations stretch." },
      { version: "v4", date: "MAR 12", verdict: "BULL · 6", tone: "bull", diffs: [["+", "EUV bottleneck supports ASML"], ["~", "Holding NVDA, AVGO"]], note: "No change in core view." },
    ],
  },
};

// Fallback detail for themes not fully authored above.
export function getThemeDetail(id: string) {
  return THESIS_DETAIL[id] ?? THESIS_DETAIL["semis-overheat"];
}

export function getTheme(id: string): Theme | undefined {
  return THEMES.find((t) => t.id === id);
}
