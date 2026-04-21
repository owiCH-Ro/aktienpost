/** Tiny mini equity curve. Takes an array of values (monotonic time axis,
 * no dates needed) and draws a thin gold line scaled to fit the viewBox.
 * No axes, no labels — purely decorative but faithful to the real curve.
 *
 * Pure SVG (no Recharts) so it stays featherweight — 4 of these render in
 * the Performance grid and we don't want 4× ResponsiveContainers just for
 * decoration. */
export function Sparkline({
  data,
  className = "",
}: {
  data: number[];
  className?: string;
}) {
  if (!data || data.length < 2) return null;

  const width = 140;
  const height = 48;
  const padTop = 3;
  const padBottom = 3;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const plotH = height - padTop - padBottom;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padTop + plotH - ((v - min) / range) * plotH;
    return [x, y] as const;
  });

  // Build a smooth path via centripetal Catmull-Rom → cubic Bézier so the
  // line curves through every data point without the harsh corners a
  // pure polyline would give.
  const d = catmullRomPath(points);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      stroke="#c5973e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
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

    // Standard Catmull-Rom → cubic conversion (tension = 0.5).
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}
