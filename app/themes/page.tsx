import Link from "next/link";
import { WfHeader } from "@/components/wireframe/WfHeader";
import { Spark } from "@/components/wireframe/Spark";
import { THEMES, walk, type Verdict } from "@/lib/data/themes";

function verdictClass(v: Verdict) {
  return v === "bull" ? "badge-bull" : v === "bear" ? "badge-bear" : "badge-flat";
}

export default function ThemesListPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <WfHeader active="themes" />

      <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>
              Active theses{" "}
              <span style={{ color: "var(--muted-ink)", fontWeight: 400 }}>· {THEMES.length}</span>
            </div>
            <div className="label" style={{ marginTop: 4 }}>SORTED BY · CONVICTION × DRIFT</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/themes/new" style={{ textDecoration: "none" }}>
              <div
                className="box"
                style={{
                  padding: "6px 10px",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                }}
              >
                + NEW THEME
              </div>
            </Link>
          </div>
        </div>

        <div className="box" style={{ overflow: "hidden" }}>
          <table className="wf-tbl">
            <thead>
              <tr>
                <th>#</th>
                <th>THESIS</th>
                <th>VERDICT</th>
                <th>CONV</th>
                <th>30D SPARK</th>
                <th className="num">30D</th>
                <th className="num">YTD</th>
                <th>TICKERS</th>
                <th>UPDATED</th>
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
                          fontSize: 13,
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
                        {t.verdict === "bull" ? "▲" : t.verdict === "bear" ? "▼" : "◆"}{" "}
                        {t.verdict.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 1.5 }}>
                        {Array.from({ length: 10 }).map((_, k) => (
                          <div
                            key={k}
                            style={{
                              width: 4,
                              height: 10,
                              background: k < t.conviction ? "var(--ink)" : "var(--line-faint)",
                            }}
                          />
                        ))}
                      </div>
                    </td>
                    <td>
                      <Spark data={sparkData} width={80} height={20} trend={trend} />
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
                      <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                        {t.tickers.slice(0, 4).map((tk) => (
                          <span
                            key={tk}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 9,
                              padding: "1px 4px",
                              border: t.owned.includes(tk)
                                ? "1px solid var(--ink)"
                                : "1px solid var(--line-soft)",
                              background: t.owned.includes(tk) ? "var(--ink)" : "transparent",
                              color: t.owned.includes(tk) ? "var(--bg)" : "var(--ink-2)",
                            }}
                          >
                            {tk}
                          </span>
                        ))}
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
    </div>
  );
}
