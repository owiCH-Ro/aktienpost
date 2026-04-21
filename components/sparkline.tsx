/** Full-width mini equity curve used as a watermark-style background in
 * the performance cards. Takes an array of values, scales it to its
 * container (`preserveAspectRatio="none"` so it fills width AND height),
 * and draws a thin gold line with a soft gradient fill underneath.
 *
 * Pure SVG (no Recharts) so it stays featherweight — four of these
 * render in the Performance grid and we don't need a ResponsiveContainer
 * for each one.
 */
export function Sparkline({
  data,
  className = "",
}: {
  data: number[];
  className?: string;
}) {
  if (!data || data.length < 2) return null;

  // Internal viewBox coordinates. We don't care about absolute pixels —
  // preserveAspectRatio="none" stretches this to fill the container.
  const width = 200;
  const height = 80;
  const padTop = 4;
  const padBottom = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const plotH = height - padTop - padBottom;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padTop + plotH - ((v - min) / range) * plotH;
    return [x, y] as const;
  });

  // Smooth Catmull-Rom → cubic Bézier path for the visible line.
  const linePath = catmullRomPath(points);
  // Closed path for the fill: same line, then down to the baseline and back.
  const fillPath = `${linePath} L${width},${height} L0,${height} Z`;

  // Unique gradient id per instance — multiple sparklines on one page
  // otherwise share a single <linearGradient> and browsers get confused
  // about which one is in scope.
  const gradientId = `sparkline-fill-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c5973e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c5973e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradientId})`} stroke="none" />
      <path
        d={linePath}
        fill="none"
        stroke="#c5973e"
        strokeOpacity="0.4"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function catmullRomPath(points: ReadonlyArray<readonly [number, number]>): string {
  if (points.length === 0) return "";
  const [x0, y0] = points[0];
  if (points.length === 1) return `M${x0},${y0}`;

  let d = `M${x0},${y0}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? points[i + 1];

    // Standard Catmull-Rom → cubic Bézier conversion (tension = 0.5).
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}
