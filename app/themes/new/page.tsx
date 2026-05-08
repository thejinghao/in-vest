// Create A — Chat + Live Thesis Preview (static wireframe, no live chat yet)
import { WfHeader } from "@/components/wireframe/WfHeader";
import { Bubble } from "@/components/wireframe/Bubble";

const SUGGESTED_REPLIES = [
  "Yes, map them",
  "Drop ASML",
  "Weekly cadence",
  "Add a counter-thesis",
];

const UNIVERSE: Array<{ ticker: string; owned: boolean; isNew?: boolean }> = [
  { ticker: "NVDA", owned: true },
  { ticker: "AMD", owned: false },
  { ticker: "TSM", owned: false },
  { ticker: "AVGO", owned: true },
  { ticker: "ASML", owned: false },
  { ticker: "MU", owned: false, isNew: true },
  { ticker: "KLAC", owned: true, isNew: true },
];

export default function NewThemePage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <WfHeader active="themes" />

      <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {/* page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div className="label">THEMES · NEW</div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 2 }}>
              Build a thesis · conversation
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="badge badge-flat">DRAFT</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted-ink)",
              }}
            >
              auto-saved 12s ago
            </span>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 16,
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* ── Chat column ── */}
          <div
            className="box"
            style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            {/* chat header */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--line-soft)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="label">CONVERSATION</div>
              <div className="label" style={{ color: "var(--muted-ink)" }}>
                4 TURNS · CONTEXT FROM SCHWAB ✓
              </div>
            </div>

            {/* messages */}
            <div
              style={{
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flex: 1,
                overflowY: "auto",
              }}
            >
              <Bubble who="ai">
                What thesis do you want to track? You can paste a note, give a one-liner, or just
                describe the idea.
              </Bubble>

              <Bubble who="me">
                Semis are overheated and overbought. SOX is way above the 200-day MA, AI capex
                looks pulled-forward, and inventories are creeping up at NVDA distributors.
              </Bubble>

              <Bubble who="ai">
                Got it. I&apos;ll frame this as a{" "}
                <em>bearish, cyclical, short-medium-term</em> thesis on the semiconductor cycle. A
                few things to confirm:
                <ul style={{ margin: "6px 0 0 16px", padding: 0, fontSize: 12, lineHeight: 1.5 }}>
                  <li>
                    Universe: NVDA, AMD, TSM, AVGO, ASML — anyone you want to add or drop?
                  </li>
                  <li>
                    Cadence:{" "}
                    <span style={{ fontFamily: "var(--font-mono)" }}>DAILY</span> (matches news
                    velocity for chips). OK?
                  </li>
                  <li>
                    Signals to monitor: hyperscaler capex, channel inventory, sell-side revisions,
                    Taiwan macro.
                  </li>
                </ul>
              </Bubble>

              <Bubble who="me">
                Add MU and KLAC. Daily is fine. Add gross-margin commentary as a signal too.
              </Bubble>

              <Bubble who="ai">
                Updated. Preview is on the right.{" "}
                <span style={{ background: "var(--bull-soft)" }}>
                  3 of these tickers are in your Schwab account
                </span>{" "}
                — want me to map them automatically?
              </Bubble>

              <Bubble who="ai" thinking>
                Drafting bullets and signal list…
              </Bubble>
            </div>

            {/* composer */}
            <div style={{ padding: 12, borderTop: "1px solid var(--line-soft)" }}>
              <div
                className="box-dashed"
                style={{ padding: 10, display: "flex", alignItems: "flex-end", gap: 8 }}
              >
                <div style={{ flex: 1, fontSize: 12.5, color: "var(--muted-ink)" }}>
                  Reply… (e.g. &quot;yes, map them&quot; / &quot;drop ASML&quot; / &quot;weekly
                  cadence instead&quot;)
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    padding: "4px 8px",
                    border: "1px solid var(--ink)",
                    background: "var(--ink)",
                    color: "var(--bg)",
                  }}
                >
                  SEND ↵
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {SUGGESTED_REPLIES.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      padding: "4px 8px",
                      border: "1px solid var(--line-soft)",
                      color: "var(--ink-2)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Live thesis preview ── */}
          <div
            className="box-dashed"
            style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            {/* preview header */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px dashed var(--line-soft)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="label">LIVE PREVIEW · THESIS CARD</div>
              <span className="scribble" style={{ fontSize: 14, color: "var(--muted-ink)" }}>
                updates as we chat ↺
              </span>
            </div>

            <div
              style={{
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                flex: 1,
                overflowY: "auto",
              }}
            >
              {/* name */}
              <div>
                <div className="label">NAME</div>
                <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>
                  Semis: Overheated &amp; Overbought
                </div>
              </div>

              {/* tags */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span className="badge badge-bear">▼ BEARISH</span>
                <span className="badge">CYCLICAL</span>
                <span className="badge">SHORT-MED TERM</span>
                <span
                  className="badge"
                  style={{
                    fontFamily: "var(--font-hand)",
                    textTransform: "none",
                    letterSpacing: 0,
                    fontSize: 13,
                    padding: "0 6px",
                    background: "var(--bg)",
                  }}
                >
                  + tag
                </span>
              </div>

              <div className="div-dotted" />

              {/* bullets */}
              <div>
                <div className="label">BULLETS · DRAFT</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: 12.5, lineHeight: 1.55 }}>
                  <li>SOX trades 2.1σ above 200-DMA</li>
                  <li>Hyperscaler capex likely pulled-forward</li>
                  <li>Channel inventory creeping at NVDA distributors</li>
                  <li>
                    <span style={{ background: "var(--bull-soft)" }}>
                      Gross-margin commentary as signal (added)
                    </span>
                  </li>
                </ul>
              </div>

              {/* universe */}
              <div>
                <div className="label">UNIVERSE · 7 TICKERS</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
                  {UNIVERSE.map(({ ticker, owned, isNew }) => (
                    <span
                      key={ticker}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        padding: "2px 6px",
                        border: owned && !isNew ? "1px solid var(--ink)" : "1px solid var(--line-soft)",
                        background: isNew
                          ? "var(--bull-soft)"
                          : owned
                          ? "var(--ink)"
                          : "transparent",
                        color: isNew ? "var(--ink)" : owned ? "var(--bg)" : "var(--ink-2)",
                      }}
                    >
                      {ticker}
                      {owned && !isNew ? " ●" : ""}
                      {isNew ? " +" : ""}
                    </span>
                  ))}
                </div>
                <div className="label" style={{ fontSize: 9, marginTop: 4 }}>
                  ● = HOLDING IN SCHWAB · + = ADDED THIS TURN
                </div>
              </div>

              {/* signals */}
              <div>
                <div className="label">SIGNALS TO MONITOR</div>
                <div style={{ fontSize: 12, lineHeight: 1.55, marginTop: 4 }}>
                  Hyperscaler capex · Channel inventory · Sell-side revisions · Taiwan macro ·{" "}
                  <span style={{ background: "var(--bull-soft)" }}>Gross-margin commentary</span>
                </div>
              </div>

              {/* cadence + prompt */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div className="label">CADENCE</div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      marginTop: 2,
                    }}
                  >
                    DAILY · 09:00 ET
                  </div>
                </div>
                <div>
                  <div className="label">PROMPT TO RE-RUN</div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      marginTop: 2,
                      color: "var(--muted-ink)",
                    }}
                  >
                    Generated automatically →
                  </div>
                </div>
              </div>

              <div className="div-dotted" />

              {/* footer actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--muted-ink)",
                  }}
                >
                  5 of 6 fields filled
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      padding: "6px 10px",
                      border: "1px solid var(--line-soft)",
                      color: "var(--ink-2)",
                    }}
                  >
                    SAVE DRAFT
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      padding: "6px 10px",
                      border: "1px solid var(--ink)",
                      background: "var(--ink)",
                      color: "var(--bg)",
                    }}
                  >
                    CREATE THEME →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
