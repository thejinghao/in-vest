import { notFound } from "next/navigation";
import { WfHeader } from "@/components/wireframe/WfHeader";
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

function stanceStyle(stance: string): React.CSSProperties {
  const isAvoid = stance === "AVOID" || stance === "TRIM/HOLD";
  return {
    fontSize: 9,
    borderColor: isAvoid ? "var(--bear)" : "var(--line-soft)",
    color: isAvoid ? "var(--bear)" : "var(--ink-2)",
    background: stance === "AVOID" ? "var(--bear-soft)" : "transparent",
  };
}

function SignalDot({ state }: { state: "red" | "amber" | "green" }) {
  const bg =
    state === "red" ? "var(--bear)" : state === "green" ? "var(--bull)" : "var(--warn)";
  return (
    <div
      style={{ width: 8, height: 8, borderRadius: "50%", background: bg, flexShrink: 0 }}
    />
  );
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
  const verdictPos =
    theme.verdict === "bull" ? 0.5 : theme.verdict === "bear" ? -0.5 : 0;
  const verdictLabel =
    theme.verdict === "bull" ? "BULLISH" : theme.verdict === "bear" ? "CAUTIOUS" : "NEUTRAL";

  // Revisions: stored newest-first, reverse for left-to-right display
  const revisionsAsc = [...detail.revisions].reverse();

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <WfHeader active="themes" />

      <div
        style={{
          padding: "14px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        {/* breadcrumb + action buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="label">
            <a href="/" style={{ color: "var(--muted-ink)", textDecoration: "none" }}>
              DASHBOARD
            </a>{" "}
            ·{" "}
            <a href="/themes" style={{ color: "var(--muted-ink)", textDecoration: "none" }}>
              THEMES
            </a>{" "}
            · <span style={{ color: "var(--ink)" }}>{theme.name.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["EDIT THESIS", `DIFF v${theme.version - 1} → v${theme.version}`, "RUN NOW"].map(
              (btn) => (
                <span
                  key={btn}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    padding: "3px 7px",
                    border: "1px solid var(--line-soft)",
                    color: "var(--ink-2)",
                    cursor: "pointer",
                  }}
                >
                  {btn}
                </span>
              )
            )}
          </div>
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
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "-0.015em",
                lineHeight: 1.15,
              }}
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
              CREATED {theme.created.toUpperCase()} · LAST UPDATED{" "}
              {theme.updated.toUpperCase()} · CADENCE: {theme.cadence.toUpperCase()} · v
              {theme.version}
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
              {
                l: "PERF · 30D",
                v: `${theme.perf30 >= 0 ? "+" : ""}${theme.perf30}%`,
                neg: theme.perf30 < 0,
              },
              {
                l: "PERF · YTD",
                v: `${theme.perfYTD >= 0 ? "+" : ""}${theme.perfYTD}%`,
                neg: theme.perfYTD < 0,
              },
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
          {/* ── Left column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Core thesis narrative */}
            <div className="box" style={{ padding: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                }}
              >
                <div className="label">CORE THESIS · v{theme.version}</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--muted-ink)",
                  }}
                >
                  EDIT
                </div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.55 }}>{detail.core}</div>
              {detail.intel && (
                <>
                  <div className="div-dotted" style={{ margin: "10px 0" }} />
                  <div className="label" style={{ marginBottom: 4 }}>ON INTEL SPECIFICALLY</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.55 }}>{detail.intel}</div>
                </>
              )}
            </div>

            {/* Bull / Bear split */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div
                className="box"
                style={{
                  padding: 12,
                  borderColor: "var(--bull)",
                  background: "rgba(31,122,63,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div className="label" style={{ color: "var(--bull)" }}>
                    ▲ BULL · COUNTER-EVIDENCE
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "var(--muted-ink)",
                    }}
                  >
                    {detail.bulls.length}
                  </span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, lineHeight: 1.5 }}>
                  {detail.bulls.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div
                className="box"
                style={{
                  padding: 12,
                  borderColor: "var(--bear)",
                  background: "rgba(184,50,50,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div className="label" style={{ color: "var(--bear)" }}>
                    ▼ BEAR · CORE THESIS
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "var(--muted-ink)",
                    }}
                  >
                    {detail.bears.length}
                  </span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, lineHeight: 1.5 }}>
                  {detail.bears.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
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
                <span
                  className={`badge ${verdictClass(theme.verdict)}`}
                  style={{ fontSize: 9 }}
                >
                  VERDICT STRENGTHENED
                </span>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{detail.commentary}</div>
            </div>

            {/* Tickers table */}
            <div className="box" style={{ padding: 14, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div className="label">
                  TICKERS IN SCOPE · {detail.tickers.length}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--muted-ink)",
                  }}
                >
                  ● = HOLDING IN SCHWAB
                </span>
              </div>
              <table className="wf-tbl" style={{ fontSize: 11 }}>
                <thead>
                  <tr>
                    <th>TICKER</th>
                    <th>STANCE</th>
                    <th>NOTE</th>
                    <th className="num">PRICE</th>
                    <th className="num">DAY</th>
                    <th className="num">30D</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.tickers.map((r) => (
                    <tr key={r.ticker}>
                      <td style={{ fontWeight: 600 }}>
                        {r.owned !== "—" ? "● " : "  "}
                        {r.ticker}
                      </td>
                      <td>
                        <span className="badge" style={stanceStyle(r.stance)}>
                          {r.stance}
                        </span>
                      </td>
                      <td style={{ color: "var(--muted-ink)" }}>{r.note}</td>
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

          {/* ── Right column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* annotated chart */}
            <div className="box" style={{ padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div className="label">EQUAL-WEIGHT BASKET · ANNOTATED</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["1M", "3M", "6M", "YTD", "1Y"].map((p) => (
                    <span
                      key={p}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        padding: "2px 6px",
                        border:
                          p === "3M"
                            ? "1px solid var(--ink)"
                            : "1px solid var(--line-soft)",
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
                SHIFT FROM BULL → BEAR ON APR 18 (v6) · MATCHES THESIS PIVOT
              </div>
            </div>

            {/* key signals */}
            <div className="box" style={{ padding: 12 }}>
              <div className="label" style={{ marginBottom: 8 }}>
                KEY SIGNALS · {detail.signals.length}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {detail.signals.map((s) => (
                  <div
                    key={s.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "14px 1fr 90px",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <SignalDot state={s.state} />
                    <div>
                      <div style={{ fontSize: 11.5 }}>{s.name}</div>
                      <div className="label" style={{ fontSize: 9 }}>{s.note}</div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textAlign: "right",
                        color:
                          s.state === "red"
                            ? "var(--bear)"
                            : s.state === "green"
                            ? "var(--bull)"
                            : "var(--warn)",
                      }}
                    >
                      {s.dir === "up" ? "↑" : s.dir === "down" ? "↓" : "→"}{" "}
                      {s.state.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* thesis revisions strip */}
            <div className="box" style={{ padding: 12 }}>
              <div className="label" style={{ marginBottom: 6 }}>
                THESIS REVISIONS · {detail.revisions.length}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {revisionsAsc.map((r, i) => {
                  const isCurrent = i === revisionsAsc.length - 1;
                  return (
                    <div
                      key={r.version}
                      className="box"
                      style={{
                        flex: 1,
                        padding: "6px 6px",
                        background: isCurrent ? "var(--ink)" : "var(--bg)",
                        color: isCurrent ? "var(--bg)" : "var(--ink)",
                        borderColor: isCurrent ? "var(--ink)" : "var(--line-soft)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {r.version}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 8.5,
                          opacity: 0.7,
                        }}
                      >
                        {r.date}
                      </div>
                      <div
                        style={{
                          height: 3,
                          marginTop: 4,
                          background:
                            r.tone === "bear"
                              ? "var(--bear)"
                              : r.tone === "bull"
                              ? "var(--bull)"
                              : "var(--muted-ink)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 8, fontSize: 11.5, lineHeight: 1.4 }}>
                <strong>{detail.revisions[0].version} (today):</strong>{" "}
                {detail.revisions[0].note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
