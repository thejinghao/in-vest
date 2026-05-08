// SVG line chart with annotated event ticks and a shaded "recent period" area.

interface ChartEvent {
  at: number;
  label: string;
}

interface AnnotatedChartProps {
  width?: number;
  height?: number;
  data: number[];
  events?: ChartEvent[];
  shadeFrom?: number;
  periods?: string[];
}

export function AnnotatedChart({
  width = 720,
  height = 220,
  data,
  events = [],
  shadeFrom = 0.6,
  periods = ["MAR", "APR", "MAY"],
}: AnnotatedChartProps) {
  const padL = 50;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => height - padB - v * chartH;

  const polyline = data.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");

  // Shaded recent area
  const fillFrom = Math.floor(data.length * shadeFrom);
  const areaSlice = data.slice(fillFrom);
  const areaPath = areaSlice.length
    ? `M${toX(fillFrom)},${height - padB} ` +
      areaSlice.map((v, j) => `L${toX(fillFrom + j).toFixed(1)},${toY(v).toFixed(1)}`).join(" ") +
      ` L${toX(data.length - 1)},${height - padB} Z`
    : "";

  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {/* y-axis grid */}
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={padL} x2={width - padR}
            y1={toY(t)} y2={toY(t)}
            stroke="var(--line-faint)" strokeDasharray="2 3"
          />
          <text
            x={padL - 6} y={toY(t) + 3}
            textAnchor="end" fontSize="9"
            fontFamily="var(--font-mono)" fill="var(--muted-ink)"
          >
            {Math.round(80 + t * 60)}
          </text>
        </g>
      ))}

      {/* x-axis */}
      <line x1={padL} x2={width - padR} y1={height - padB} y2={height - padB} stroke="var(--line)" />

      {/* shaded area */}
      {areaPath && <path d={areaPath} fill="rgba(31,122,63,0.10)" />}

      {/* main line */}
      <polyline points={polyline} fill="none" stroke="var(--ink)" strokeWidth="1.5" />

      {/* event ticks */}
      {events.map((e, i) => {
        const x = toX(e.at);
        const y = toY(data[Math.round(e.at)] ?? 0.5);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={padT} y2={height - padB} stroke="var(--line)" strokeDasharray="2 2" />
            <circle cx={x} cy={y} r="3.5" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x={x + 5} y={14 + (i % 3) * 11} fontSize="9" fontFamily="var(--font-mono)" fill="var(--ink)">
              {e.label}
            </text>
          </g>
        );
      })}

      {/* x-axis period labels */}
      {periods.map((m, i) => (
        <text
          key={m}
          x={padL + (i / (periods.length - 1)) * chartW}
          y={height - padB + 16}
          fontSize="9" fontFamily="var(--font-mono)" fill="var(--muted-ink)" textAnchor="middle"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}
