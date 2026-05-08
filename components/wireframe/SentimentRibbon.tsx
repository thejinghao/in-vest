type SegmentValue = "bull-strong" | "bull" | "neutral" | "bear" | "bear-strong";

const SEGMENT_COLORS: Record<SegmentValue, string> = {
  "bull-strong": "#87C189",
  bull: "#B9DCB7",
  neutral: "#ECEAE2",
  bear: "#E2B5AF",
  "bear-strong": "#C97D75",
};

interface SentimentRibbonProps {
  values: SegmentValue[];
  height?: number;
  label?: boolean;
}

export function SentimentRibbon({ values, height = 14, label = true }: SentimentRibbonProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="label">SENTIMENT</div>
          <div className="label" style={{ color: "var(--muted-ink)" }}>30D · DAILY</div>
        </div>
      )}
      <div style={{ display: "flex", height, border: "1px solid var(--line)" }}>
        {values.map((v, i) => (
          <div
            key={i}
            className="ribbon-seg"
            style={{
              background: SEGMENT_COLORS[v] ?? "#ECEAE2",
              borderRight: i < values.length - 1 ? "1px solid rgba(0,0,0,0.04)" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}
