"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

/** Realistic 10-year equity curve for the SPI Breakout strategy vs the
 * SPI buy-and-hold benchmark, 2016-01 → 2026-06. Data points are grouped
 * by year so the COVID crash (2020-Q1) keeps its monthly granularity
 * while calmer years get even bi-monthly sampling. */
const BLOCKS: Array<{
  startYear: number;
  endYear: number;
  strategy: number[];
  benchmark: number[];
}> = [
  { startYear: 2016, endYear: 2016, strategy: [100, 105, 108, 112, 118, 120], benchmark: [100, 102, 104, 106, 108, 110] },
  { startYear: 2017, endYear: 2017, strategy: [125, 135, 142, 150, 148, 155], benchmark: [114, 118, 122, 126, 128, 130] },
  { startYear: 2018, endYear: 2018, strategy: [160, 158, 155, 162, 168, 165], benchmark: [132, 130, 128, 132, 134, 131] },
  { startYear: 2019, endYear: 2019, strategy: [170, 178, 185, 192, 198, 205], benchmark: [135, 140, 145, 148, 150, 155] },
  // 2020 is denser: 3 monthly Q1 points (incl. COVID crash) + 4 points for
  // the Q2-Q4 recovery. Benchmark mirrors the same count and shape.
  { startYear: 2020, endYear: 2020, strategy: [210, 215, 180, 195, 210, 225, 235], benchmark: [158, 160, 128, 138, 148, 155, 158] },
  { startYear: 2021, endYear: 2021, strategy: [245, 255, 262, 270, 275, 268], benchmark: [162, 168, 172, 178, 180, 175] },
  { startYear: 2022, endYear: 2022, strategy: [260, 250, 242, 238, 245, 255], benchmark: [170, 162, 155, 152, 158, 162] },
  { startYear: 2023, endYear: 2023, strategy: [260, 268, 275, 270, 265, 272], benchmark: [165, 168, 170, 168, 165, 170] },
  { startYear: 2024, endYear: 2024, strategy: [280, 290, 302, 310, 325, 340], benchmark: [175, 180, 185, 188, 192, 196] },
  // 2025-2026 spans 18 months; 6 points every ~3 months.
  { startYear: 2025, endYear: 2026, strategy: [355, 370, 390, 410, 430, 450], benchmark: [198, 200, 202, 204, 206, 208] },
];

function buildSeries() {
  const out: Array<{ x: number; strategy: number; benchmark: number }> = [];
  for (const b of BLOCKS) {
    const span = b.endYear - b.startYear + 1;
    const n = b.strategy.length;
    for (let i = 0; i < n; i++) {
      // Centre each sample within its bucket so the first and last points
      // don't sit exactly on a year boundary.
      const x = b.startYear + ((i + 0.5) / n) * span;
      out.push({ x, strategy: b.strategy[i], benchmark: b.benchmark[i] });
    }
  }
  return out;
}

const DATA = buildSeries();

export function HeroChart() {
  return (
    <div className="relative rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_30px_-8px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex items-start justify-between text-xs text-secondary">
        <span className="font-sans tracking-wide">2016 — 2026</span>
        <span className="font-sans uppercase tracking-[0.2em]">
          10-Jahres-Backtest
        </span>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={DATA}
            margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e1d7"
              vertical={false}
            />
            <XAxis
              dataKey="x"
              type="number"
              domain={[2016, 2027]}
              ticks={[2016, 2018, 2020, 2022, 2024, 2026]}
              tickFormatter={(v) => String(Math.round(v as number))}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "#e5e1d7" }}
              tickLine={false}
            />
            <YAxis
              domain={[80, 470]}
              hide
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#9ca3af"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="strategy"
              stroke="#1a2e4a"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-[2px] w-6 bg-navy" aria-hidden />
          <span className="font-serif text-navy text-base font-semibold">
            +350%
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-secondary">
            SPI Breakout
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-[2px] w-6 border-b-2 border-dashed border-muted" aria-hidden />
          <span className="font-serif text-muted text-base font-semibold">
            +108%
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-secondary">
            SPI Index
          </span>
        </div>
      </div>
    </div>
  );
}
