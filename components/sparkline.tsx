/** Full-width watermark sparkline for the performance cards.
 *
 * Takes the strategy's real backtest curve (weekly points from
 * chart_data.json) and downsamples it to roughly 50 points so the SVG
 * stays lightweight. Simple polyline — the raw curve shape reads
 * distinctly without any smoothing.
 */
export function Sparkline({
  data,
  className = "",
  sampleEvery = 10,
}: {
  data: number[];
  className?: string;
  /** Keep every Nth point. With ~530 weekly points and the default 10
   * this lands at ~53 samples, which is detailed enough to show the
   * dips but cheap to render four times per page. */
  sampleEvery?: number;
}) {
  if (!data || data.length < 2) return null;

  // Downsample + always include the last point so the curve ends at the
  // actual final value.
  const sampled: number[] = [];
  for (let i = 0; i < data.length; i += sampleEvery) sampled.push(data[i]);
  if (sampled[sampled.length - 1] !== data[data.length - 1]) {
    sampled.push(data[data.length - 1]);
  }

  const width = 200;
  const height = 80;
  const padTop = 16;
  const padBottom = 16;

  const min = Math.min(...sampled);
  const max = Math.max(...sampled);
  const range = max - min || 1;
  const plotH = height - padTop - padBottom;

  const coords = sampled.map((v, i) => {
    const x = (i / (sampled.length - 1)) * width;
    const y = padTop + plotH - ((v - min) / range) * plotH;
    return { x, y };
  });

  const polyline = coords
    .map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");

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
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
