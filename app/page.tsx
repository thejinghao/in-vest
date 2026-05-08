import Link from "next/link";
import { WfHeader } from "@/components/wireframe/WfHeader";
import { Spark } from "@/components/wireframe/Spark";
import { THEMES, BRIEF_UPDATES, HOLDINGS, walk, type Verdict } from "@/lib/data/themes";

function verdictClass(v: Verdict) {
  return v === "bull" ? "badge-bull" : v === "bear" ? "badge-bear" : "badge-flat";
}

function verdictIcon(v: Verdict) {
  return v === "bull" ? "▲ BULL" : v === "bear" ? "▼ BEAR" : "◆ FLAT";
}

function ConvictionBar({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 1.5 }}>
      {Array.from({ length: 10 }).map((_, k) => (
        <div
          key={k}
          style={{
            width: 4,
            height: 10,
            background: k < n ? "var(--ink)" : "var(--line-faint)",
          }}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const portfolioSpark = walk(3, 60, 0.004, 0.03);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <WfHeader active="dashboard" dense />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          flex: 1,
        }}
      >
        {/* ── Main column ── */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            borderRight: "1.5px solid var(--line)",
          }}
        >
          {/* ── TODAY'S BRIEF — hero band ── */}
          <div className="box" style={{ padding: 0, borderWidth: 2, background: "var(--paper)" }}>
            {/* brief header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderBottom: "1.5px solid var(--line)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  Today&apos;s Brief
                </div>
                <div className="label">THU MAY 8 · 09:14 ET · 4 THESIS UPDATES</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="scribble" style={{ fontSize: 14, color: "var(--muted-ink)" }}>
                  ↻ runs daily 09:00
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    padding: "4px 8px",
                    border: "1px solid var(--ink)",
                    background: "var(--ink)",
                    color: "var(--bg)",
                  }}
                >
                  OPEN FULL BRIEF →
                </span>
              </div>
            </div>

            {/* brief updates grid */}
            <div
              style={{
                padding: "12px 14px",
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                gap: 14,
              }}
            >
              {BRIEF_UPDATES.map((u, i) => (
                <div
                  key={i}
                  style={
                    u.isLead
                      ? { borderRight: "1px dashed var(--line-soft)", paddingRight: 14 }
                      : undefined
                  }
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span className={`badge ${u.badgeClass}`} style={{ fontSize: 9 }}>
                      {u.badge}
                    </span>
                    <span className="label">{u.tag}</span>
                  </div>
                  <div
                    style={{
                      fontSize: u.isLead ? 13.5 : 12,
                      lineHeight: 1.4,
                      fontWeight: u.isLead ? 500 : 400,
                    }}
                  >
                    {u.highlight ? (
                      <>
                        <span style={{ background: u.tone === "bull" ? "var(--bull-soft)" : "var(--bear-soft)" }}>
                          {u.highlight}
                        </span>
                        {u.body.replace(u.highlight, "")}
                      </>
                    ) : (
                      u.body
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--muted-ink)",
                      marginTop: 4,
                    }}
                  >
                    {u.isLead ? "2 of your holdings affected · NVDA, AVGO" : `holdings: ${u.holdings}`}
                  </div>
                </div>
              ))}
            </div>

            {/* brief footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 14px",
                borderTop: "1px dashed var(--line-soft)",
                background: "var(--bg)",
              }}
            >
              <div
                style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted-ink)" }}
              >
                NET PORTFOLIO IMPACT FROM BRIEF ·{" "}
                <span style={{ color: "var(--bull)" }}>+0.4%</span> · 6 of your tickers cited · 2 new
                signals to monitor
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["DIFF VS YESTERDAY", "EXPORT NOTE"].map((btn) => (
                  <span
                    key={btn}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      padding: "3px 7px",
                      border: "1px solid var(--line-soft)",
                    }}
                  >
                    {btn}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Theses table header ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>Theses · live</div>
              <div className="label" style={{ marginTop: 2 }}>
                RANKED · DRIFT FROM ENTRY · UPDATED 14:22 ET
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href="/themes/new" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    padding: "4px 8px",
                    border: "1px solid var(--line)",
                    color: "var(--ink)",
                  }}
                >
                  + NEW
                </div>
              </Link>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  padding: "4px 8px",
                  border: "1px solid var(--line-soft)",
                  color: "var(--muted-ink)",
                }}
              >
                EXPORT
              </div>
            </div>
          </div>

          {/* ── Theses table ── */}
          <div className="box" style={{ overflow: "hidden" }}>
            <table className="wf-tbl">
              <thead>
                <tr>
                  <th style={{ width: 26 }}>#</th>
                  <th>THESIS</th>
                  <th style={{ width: 80 }}>VERDICT</th>
                  <th style={{ width: 60 }}>CONV</th>
                  <th style={{ width: 120 }}>30D</th>
                  <th className="num" style={{ width: 60 }}>PERF</th>
                  <th className="num" style={{ width: 60 }}>YTD</th>
                  <th style={{ width: 80 }}>HOLDS</th>
                  <th style={{ width: 80 }}>UPDATED</th>
                </tr>
              </thead>
              <tbody>
                {THEMES.map((t, i) => {
                  const drift = t.verdict === "bull" ? 0.007 : t.verdict === "bear" ? -0.005 : 0;
                  const sparkData = walk(t.seed, 24, drift, 0.035);
                  const trend = t.verdict === "bull" ? "up" : t.verdict === "bear" ? "down" : "flat";
                  return (
                    <tr key={t.id}>
                      <td style={{ color: "var(--muted-ink)" }}>{String(i + 1).padStart(2, "0")}</td>
                      <td>
                        <Link
                          href={`/themes/${t.id}`}
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--ink)",
                            textDecoration: "none",
                          }}
                        >
                          {t.name}
                        </Link>
                      </td>
                      <td>
                        <span className={`badge ${verdictClass(t.verdict)}`} style={{ fontSize: 9 }}>
                          {verdictIcon(t.verdict)}
                        </span>
                      </td>
                      <td>
                        <ConvictionBar n={t.conviction} />
                      </td>
                      <td>
                        <Spark data={sparkData} width={110} height={20} trend={trend} />
                      </td>
                      <td
                        className="num"
                        style={{ color: t.perf30 >= 0 ? "var(--bull)" : "var(--bear)" }}
                      >
                        {t.perf30 >= 0 ? "+" : ""}
                        {t.perf30}%
                      </td>
                      <td
                        className="num"
                        style={{ color: t.perfYTD >= 0 ? "var(--bull)" : "var(--bear)" }}
                      >
                        {t.perfYTD >= 0 ? "+" : ""}
                        {t.perfYTD}%
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 2 }}>
                          {t.tickers.slice(0, 4).map((tk) => (
                            <span
                              key={tk}
                              title={tk}
                              style={{
                                display: "inline-block",
                                width: 6,
                                height: 6,
                                background: t.owned.includes(tk) ? "var(--ink)" : "var(--line-faint)",
                                border: t.owned.includes(tk)
                                  ? "none"
                                  : "1px solid var(--line-soft)",
                                borderRadius: "50%",
                              }}
                            />
                          ))}
                          <span style={{ fontSize: 9, marginLeft: 4, color: "var(--muted-ink)" }}>
                            {t.owned.length}/{t.tickers.length}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: "var(--muted-ink)" }}>{t.updated}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Sidebar: portfolio + holdings ── */}
        <div
          style={{
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* portfolio summary */}
          <div>
            <div className="label">PORTFOLIO</div>
            <div
              style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700 }}
            >
              $1,284,612
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--bull)" }}>
              +0.64% · +14.2% YTD
            </div>
          </div>

          <Spark data={portfolioSpark} width={284} height={48} trend="up" />

          <div className="div-dotted" />

          <div className="label">HOLDINGS · BY THEME COVERAGE</div>

          {/* holdings list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {HOLDINGS.map((h) => (
              <div
                key={h.ticker}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr 60px 38px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  gap: 6,
                  padding: "3px 0",
                  borderBottom: "1px dotted var(--line-faint)",
                }}
              >
                <span style={{ fontWeight: 600 }}>{h.ticker}</span>
                <span style={{ fontSize: 9.5, color: "var(--muted-ink)" }}>
                  {h.themes.join(" · ")}
                </span>
                <span style={{ textAlign: "right" }}>{h.val}</span>
                <span
                  style={{
                    textAlign: "right",
                    color:
                      h.chg > 0
                        ? "var(--bull)"
                        : h.chg < 0
                        ? "var(--bear)"
                        : "var(--muted-ink)",
                  }}
                >
                  {h.chg === 0 ? "—" : (h.chg > 0 ? "+" : "") + h.chg + "%"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
