/** Full-width watermark sparkline for the performance cards.
 *
 * Simple SVG polyline (no smoothing) so the shape of each strategy's
 * 10-year equity curve stays visually distinctive — Catmull-Rom
 * smoothing was washing out the differences between strategies.
 *
 * The curve fills ~60% of the vertical space so it reads as a shape,
 * not a flat stripe.
 */
export function Sparkline({
  data,
  className = "",
}: {
  data: number[];
  className?: string;
}) {
  if (!data || data.length < 2) return null;

  // Internal viewBox. preserveAspectRatio="none" stretches to container.
  const width = 200;
  const height = 80;
  // ~20% padding top/bottom → curve occupies ~60% of vertical space.
  const padTop = 16;
  const padBottom = 16;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const plotH = height - padTop - padBottom;

  const coords = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padTop + plotH - ((v - min) / range) * plotH;
    return { x, y };
  });

  // Polyline: plain line segments, no smoothing.
  const polyline = coords.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");

  // Fill path: same polyline, closed down to the baseline.
  const fillD =
    `M${coords[0].x.toFixed(2)},${coords[0].y.toFixed(2)} ` +
    coords
      .slice(1)
      .map((p) => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(" ") +
    ` L${width},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path d={fillD} fill="#c5973e" fillOpacity="0.06" stroke="none" />
      <polyline
        points={polyline}
        fill="none"
        stroke="#c5973e"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
