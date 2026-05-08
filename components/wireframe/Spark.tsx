// Tiny SVG sparkline — server-renderable, no chart library needed.
type Trend = "up" | "down" | "flat";

interface SparkProps {
  data: number[];
  width?: number;
  height?: number;
  trend?: Trend;
  dashed?: boolean;
}

export function Spark({ data, width = 80, height = 22, trend = "flat", dashed = false }: SparkProps) {
  const stroke =
    trend === "up" ? "var(--bull)" : trend === "down" ? "var(--bear)" : "var(--ink)";

  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - v * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray={dashed ? "3 2" : undefined}
      />
    </svg>
  );
}
