"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CurvePoint = { date: string; strategy: number; benchmark: number };

export interface Annotation {
  /** ISO date string; the chart snaps to the closest data point. */
  date: string;
  label: string;
}

interface Props {
  data: CurvePoint[];
  strategyLabel: string;
  benchmarkLabel: string;
  /** Render height in pixels (used unless `heightClassName` is set). */
  height?: number;
  /** Optional Tailwind-style class controlling height (e.g. responsive
   * breakpoints like `h-[250px] sm:h-[360px]`). Overrides `height`. */
  heightClassName?: string;
  /** Event markers to overlay on the strategy line. Defaults to Covid-19
   * + Zinsanstieg — the two biggest drawdowns in the 2016-2026 window. */
  annotations?: Annotation[];
  /** Note shown under the chart, left-aligned. */
  footerLeft?: string;
  /** Note shown under the chart, right-aligned. */
  footerRight?: string;
  /** Extra classes on the outer container. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert an ISO date string to a fractional year (2016 + months/12) so
 * the x-axis can be a numeric scale with year ticks. */
function yearFraction(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return y + ((m - 1) + (d - 1) / 31) / 12;
}

function findClosestIndex(data: CurvePoint[], iso: string): number {
  const target = new Date(iso).getTime();
  let best = 0;
  let bestDelta = Infinity;
  for (let i = 0; i < data.length; i++) {
    const delta = Math.abs(new Date(data[i].date).getTime() - target);
    if (delta < bestDelta) {
      best = i;
      bestDelta = delta;
    }
  }
  return best;
}

function pctReturn(start: number, end: number): string {
  const r = Math.round(((end - start) / start) * 100);
  const sign = r >= 0 ? "+" : "";
  return `${sign}${r}%`;
}

const DEFAULT_ANNOTATIONS: Annotation[] = [
  { date: "2020-03-16", label: "Covid-19" },
  { date: "2022-09-26", label: "Zinsanstieg" },
];

// ---------------------------------------------------------------------------
// Custom SVG labels
// ---------------------------------------------------------------------------

function AnnotationLabel({
  viewBox,
  text,
  fontSize = 11,
}: {
  viewBox?: { x?: number; y?: number };
  text: string;
  fontSize?: number;
}) {
  if (!viewBox || viewBox.x === undefined || viewBox.y === undefined) return null;
  const { x, y } = viewBox;
  return (
    <g pointerEvents="none">
      <text
        x={x}
        y={y - 24}
        textAnchor="middle"
        fontSize={fontSize}
        fill="#6b7280"
        fontFamily="var(--font-sans), Inter, sans-serif"
      >
        {text}
      </text>
      <line x1={x} y1={y - 18} x2={x} y2={y - 6} stroke="#9ca3af" strokeWidth={1} />
      <path
        d={`M${x - 3},${y - 9} L${x},${y - 6} L${x + 3},${y - 9}`}
        fill="none"
        stroke="#9ca3af"
        strokeWidth={1}
        strokeLinecap="round"
      />
    </g>
  );
}

function EndpointLabel({
  viewBox,
  text,
  color,
  weight = 600,
  dy = 0,
  fontSize = 12,
}: {
  viewBox?: { x?: number; y?: number };
  text: string;
  color: string;
  weight?: number;
  dy?: number;
  fontSize?: number;
}) {
  if (!viewBox || viewBox.x === undefined || viewBox.y === undefined) return null;
  const { x, y } = viewBox;
  return (
    <text
      x={x + 6}
      y={y + 4 + dy}
      fontSize={fontSize}
      fontWeight={weight}
      fill={color}
      fontFamily="var(--font-sans), Inter, sans-serif"
      pointerEvents="none"
    >
      {text}
    </text>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AnimatedLineChart({
  data,
  strategyLabel,
  benchmarkLabel,
  height = 400,
  heightClassName,
  annotations = DEFAULT_ANNOTATIONS,
  footerLeft = "Auf 100 indexiert per 01. Januar 2016.",
  footerRight = "Backtest-Daten",
  className = "",
}: Props) {
  // IntersectionObserver-triggered visibility so the draw animation only
  // fires when the chart scrolls into view.
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // Mobile-aware density. Recharts margins / font sizes are JS props (not
  // CSS) so we need to read viewport width here. Sync default avoids a
  // first-paint mismatch on client; SSR falls back to desktop.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const chartMargin = isMobile
    ? { top: 22, right: 38, left: 0, bottom: 4 }
    : { top: 28, right: 56, left: 8, bottom: 8 };
  const axisFontSize = isMobile ? 9 : 11;
  const yAxisWidth = isMobile ? 28 : 44;
  const annotationFontSize = isMobile ? 9 : 11;
  const endpointFontSize = isMobile ? 10 : 12;

  // Pre-compute plot data with numeric x-axis.
  const plotData = useMemo(
    () => data.map((p) => ({ ...p, x: yearFraction(p.date) })),
    [data],
  );

  const last = plotData[plotData.length - 1];
  const first = plotData[0];
  const strategyReturn = pctReturn(first.strategy, last.strategy);
  const benchmarkReturn = pctReturn(first.benchmark, last.benchmark);

  // Snap annotations to the closest data point so the ReferenceDot sits
  // exactly on the curve.
  const annoPoints = useMemo(
    () =>
      annotations.map((a) => {
        const idx = findClosestIndex(data, a.date);
        return {
          label: a.label,
          x: plotData[idx].x,
          y: plotData[idx].strategy,
        };
      }),
    [annotations, data, plotData],
  );

  return (
    <div className={className}>
      <div
        ref={containerRef}
        style={heightClassName ? undefined : { height }}
        className={`w-full ${heightClassName ?? ""}`}
      >
        {visible && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={plotData} margin={chartMargin}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e1d7"
                vertical={false}
              />
              <XAxis
                dataKey="x"
                type="number"
                domain={[2016, 2026.5]}
                ticks={
                  isMobile
                    ? [2016, 2020, 2024]
                    : [2016, 2018, 2020, 2022, 2024, 2026]
                }
                tickFormatter={(v) => String(Math.round(v as number))}
                tick={{ fill: "#9ca3af", fontSize: axisFontSize }}
                axisLine={{ stroke: "#e5e1d7" }}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#9ca3af", fontSize: axisFontSize }}
                axisLine={false}
                tickLine={false}
                width={yAxisWidth}
                tickFormatter={(v) => String(Math.round(v as number))}
              />

              {/* Benchmark first so the strategy line paints on top. */}
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#9ca3af"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive
                animationBegin={300}
                animationDuration={2000}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="strategy"
                stroke="#1a2e4a"
                strokeWidth={2}
                dot={false}
                isAnimationActive
                animationBegin={0}
                animationDuration={2000}
                animationEasing="ease-out"
              />

              {/* Annotations on the strategy line. */}
              {annoPoints.map((a) => (
                <ReferenceDot
                  key={a.label}
                  x={a.x}
                  y={a.y}
                  r={3}
                  fill="#9ca3af"
                  stroke="#1a2e4a"
                  strokeWidth={1.25}
                  ifOverflow="extendDomain"
                >
                  <Label
                    content={
                      <AnnotationLabel
                        text={a.label}
                        fontSize={annotationFontSize}
                      />
                    }
                  />
                </ReferenceDot>
              ))}

              {/* Endpoint labels at the right edge, showing total return. */}
              <ReferenceDot
                x={last.x}
                y={last.strategy}
                r={0}
                ifOverflow="extendDomain"
              >
                <Label
                  content={
                    <EndpointLabel
                      text={strategyReturn}
                      color="#1a2e4a"
                      weight={700}
                      fontSize={endpointFontSize}
                    />
                  }
                />
              </ReferenceDot>
              <ReferenceDot
                x={last.x}
                y={last.benchmark}
                r={0}
                ifOverflow="extendDomain"
              >
                <Label
                  content={
                    <EndpointLabel
                      text={benchmarkReturn}
                      color="#6b7280"
                      weight={500}
                      fontSize={endpointFontSize}
                    />
                  }
                />
              </ReferenceDot>
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend row (above) + footer row (below). The legend is implemented
          as HTML so the custom styling (gold/navy accents, no marker dot,
          serif percentage) is easier than with Recharts' built-in Legend. */}
      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
        <LegendItem
          color="#1a2e4a"
          label={`aktienpost ${strategyLabel}`}
          value={strategyReturn}
          valueColor="text-navy"
          solid
        />
        <LegendItem
          color="#9ca3af"
          label={benchmarkLabel}
          value={benchmarkReturn}
          valueColor="text-muted"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[11px] text-muted">
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------

function LegendItem({
  color,
  label,
  value,
  valueColor,
  solid = false,
}: {
  color: string;
  label: string;
  value: string;
  valueColor: string;
  solid?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="block h-[2px] w-5"
        style={{ backgroundColor: color, opacity: solid ? 1 : 0.9 }}
        aria-hidden
      />
      <span className="text-[13px] text-ink/85">{label}</span>
      <span className={`font-serif text-[14px] font-semibold tabular-nums ${valueColor}`}>
        {value}
      </span>
    </div>
  );
}
