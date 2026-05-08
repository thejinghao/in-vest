import { notFound } from "next/navigation";
import { Spark } from "@/components/wireframe/Spark";
import { SentimentRibbon } from "@/components/wireframe/SentimentRibbon";
import { VerdictMeter } from "@/components/wireframe/VerdictMeter";
import { AnnotatedChart } from "@/components/wireframe/AnnotatedChart";
import { THEMES, getTheme, getThemeDetail, walk, type Verdict } from "@/lib/data/themes";

export function generateStaticParams() {
  return THEMES.map((t) => ({ id: t.id }));
}

function verdictClass(v: Verdict) {
  return v === "bull" ? "badge-bull" : v === "bear" ? "badge-bear" : "badge-flat";
}

export default async function ThemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const theme = getTheme(id);
  if (!theme) notFound();
  const detail = getThemeDetail(id);

  const chartData = walk(theme.seed, 80, theme.verdict === "bear" ? -0.004 : 0.004, 0.035);
  const verdictPos = theme.verdict === "bull" ? 0.5 : theme.verdict === "bear" ? -0.5 : 0;
  const verdictLabel = theme.verdict === "bull" ? "BULLISH" : theme.verdict === "bear" ? "BEARISH" : "NEUTRAL";

  return (
    <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* breadcrumb */}
        <div className="label">
          DASHBOARD · THEMES ·{" "}
          <span style={{ color: "var(--ink)" }}>{theme.name.toUpperCase()}</span>
        </div>

        {/* ── Hero header ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          {/* title + tags */}
          <div>
            <div
              style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.1 }}
            >
              {theme.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted-ink)",
                marginTop: 6,
              }}
            >
              CREATED {theme.created} · LAST UPDATED {theme.updated.toUpperCase()} · CADENCE:{" "}
              {theme.cadence.toUpperCase()}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <span className={`badge ${verdictClass(theme.verdict)}`}>
                {theme.verdict === "bull" ? "▲" : theme.verdict === "bear" ? "▼" : "◆"}{" "}
                {theme.verdict.toUpperCase()}
              </span>
              {theme.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* verdict meter */}
          <div className="box" style={{ padding: 12 }}>
            <VerdictMeter
              pos={verdictPos}
              label={verdictLabel}
              sub={`CONVICTION ${theme.conviction}/10`}
            />
          </div>

          {/* perf stats */}
          <div
            className="box"
            style={{ padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {[
              { l: "PERF · 30D", v: `${theme.perf30 >= 0 ? "+" : ""}${theme.perf30}%`, neg: theme.perf30 < 0 },
              { l: "PERF · YTD", v: `${theme.perfYTD >= 0 ? "+" : ""}${theme.perfYTD}%`, neg: theme.perfYTD < 0 },
              { l: "OWNED", v: `${theme.owned.length} / ${theme.tickers.length}` },
              { l: "EXPOSURE", v: "$137k" },
            ].map((x) => (
              <div key={x.l}>
                <div className="label">{x.l}</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 15,
                    color: x.neg ? "var(--bear)" : "var(--ink)",
                  }}
                >
                  {x.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, flex: 1 }}>
          {/* Left: bullets + commentary + tickers */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* thesis bullets */}
            <div className="box" style={{ padding: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                }}
              >
                <div className="label">CURRENT THESIS · BULLET FORM</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--muted-ink)",
                  }}
                >
                  EDIT · v7
                </div>
              </div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12.5, lineHeight: 1.55 }}>
                {detail.bullets.map((b, i) => (
                  <li key={i}>
                    {b.highlight ? (
                      <span
                        style={{
                          background: b.highlight === "bear" ? "var(--bear-soft)" : "var(--bull-soft)",
                        }}
                      >
                        {b.text}
                      </span>
                    ) : (
                      b.text
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI commentary */}
            <div className="box-dashed" style={{ padding: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 6,
                }}
              >
                <div className="label">AI DAILY COMMENTARY · TODAY 09:14</div>
                <span className={`badge ${verdictClass(theme.verdict)}`} style={{ fontSize: 9 }}>
                  VERDICT HOLDS
                </span>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{detail.commentary}</div>
            </div>

            {/* tickers table */}
            <div className="box" style={{ padding: 14, flex: 1 }}>
              <div className="label" style={{ marginBottom: 8 }}>TICKERS IN THIS THEME</div>
              <table className="wf-tbl" style={{ fontSize: 11 }}>
                <thead>
                  <tr>
                    <th>TICKER</th>
                    <th>ROLE</th>
                    <th>OWNED</th>
                    <th className="num">PRICE</th>
                    <th className="num">DAY</th>
                    <th className="num">30D</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.tickers.map((r) => (
                    <tr key={r.ticker}>
                      <td style={{ fontWeight: 600 }}>{r.ticker}</td>
                      <td style={{ color: "var(--muted-ink)" }}>{r.role}</td>
                      <td style={{ color: r.owned === "—" ? "var(--muted-ink)" : "var(--ink)" }}>
                        {r.owned}
                      </td>
                      <td className="num">{r.price}</td>
                      <td
                        className="num"
                        style={{ color: r.day >= 0 ? "var(--bull)" : "var(--bear)" }}
                      >
                        {r.day >= 0 ? "+" : ""}
                        {r.day}%
                      </td>
                      <td
                        className="num"
                        style={{ color: r.month30 >= 0 ? "var(--bull)" : "var(--bear)" }}
                      >
                        {r.month30 >= 0 ? "+" : ""}
                        {r.month30}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: chart + ribbon + scorecard */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* annotated chart */}
            <div className="box" style={{ padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div className="label">EQUAL-WEIGHT BASKET · PRICE</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["1M", "3M", "6M", "YTD", "1Y"].map((p) => (
                    <span
                      key={p}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        padding: "2px 6px",
                        border: p === "3M" ? "1px solid var(--ink)" : "1px solid var(--line-soft)",
                        color: p === "3M" ? "var(--ink)" : "var(--muted-ink)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <AnnotatedChart
                width={460}
                height={170}
                data={chartData}
                events={detail.chartEvents}
                shadeFrom={0.78}
              />
            </div>

            {/* sentiment ribbon */}
            <div className="box" style={{ padding: 12 }}>
              <SentimentRibbon values={detail.sentimentRibbon} />
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--muted-ink)",
                  marginTop: 6,
                }}
              >
                SHIFT FROM BULL → BEAR ON APR 18 · MATCHES THESIS PIVOT
              </div>
            </div>

            {/* scorecard */}
            <div className="box" style={{ padding: 12, flex: 1 }}>
              <div className="label" style={{ marginBottom: 8 }}>SCORECARD · SUB-METRICS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {detail.scorecard.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 90px 80px",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: 12 }}>{s.label}</div>
                    <div
                      style={{
                        height: 6,
                        background: "var(--line-faint)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${s.bar * 100}%`,
                          background: s.tone === "bear" ? "var(--bear)" : "var(--bull)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textAlign: "right",
                        color: s.tone === "bear" ? "var(--bear)" : "var(--bull)",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
