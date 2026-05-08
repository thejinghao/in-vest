// Gradient meter with a needle showing bullish/bearish conviction.
// pos: -1 (full bear) to +1 (full bull)

interface VerdictMeterProps {
  pos?: number;
  label?: string;
  sub?: string;
}

export function VerdictMeter({ pos = 0.4, label = "BULLISH", sub = "CONVICTION 7/10" }: VerdictMeterProps) {
  const pct = ((pos + 1) / 2) * 100;
  const labelColor = pos > 0 ? "var(--bull)" : pos < 0 ? "var(--bear)" : "var(--ink)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 180 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div className="label">VERDICT</div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 700,
            color: labelColor,
          }}
        >
          {label}
        </div>
      </div>
      <div className="meter">
        <div className="needle" style={{ left: `${pct}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="label" style={{ fontSize: 9 }}>BEAR</div>
        <div className="label" style={{ fontSize: 9, color: "var(--muted-ink)" }}>{sub}</div>
        <div className="label" style={{ fontSize: 9 }}>BULL</div>
      </div>
    </div>
  );
}
