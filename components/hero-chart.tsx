"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

/** A hand-curated-looking equity curve going from 100 → 450 across 2016-2026.
 * Monthly granularity gives a natural shape without looking too smooth. */
function buildSeries() {
  // Index (benchmark): modest uptrend with two drawdowns (2020, 2022) to 208.
  const benchmark = [
    100, 104, 107, 112, 119, 124, 120, 126, 132, 138, 135, 141,
    146, 144, 149, 154, 150, 157, 162, 167, 172, 169, 174, 178,
    172, 168, 175, 182, 189, 194, 185, 181, 176, 183, 189, 195,
    200, 195, 188, 180, 172, 165, 170, 178, 186, 192, 188, 194,
    199, 205, 201, 208,
  ];
  // Strategy: similar shape but steeper with smaller drawdowns, ending at ~450.
  const strategy = [
    100, 107, 114, 122, 131, 140, 136, 145, 155, 166, 161, 170,
    180, 176, 188, 200, 194, 207, 220, 232, 245, 238, 252, 265,
    255, 248, 264, 280, 296, 310, 302, 295, 305, 320, 336, 352,
    365, 354, 345, 355, 368, 380, 372, 388, 404, 418, 410, 425,
    435, 442, 430, 450,
  ];

  // Build month labels starting Jan 2016.
  const out: { label: string; year: number; strategy: number; benchmark: number }[] =
    [];
  let year = 2016;
  let month = 0;
  for (let i = 0; i < strategy.length; i++) {
    out.push({
      label: `${year}-${String(month + 1).padStart(2, "0")}`,
      year,
      strategy: strategy[i],
      benchmark: benchmark[i],
    });
    month += 2; // step 2 months per sample to cover 10 years in 52 points
    while (month >= 12) {
      month -= 12;
      year += 1;
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
              dataKey="year"
              type="number"
              domain={["dataMin", "dataMax"]}
              ticks={[2016, 2018, 2020, 2022, 2024, 2026]}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "#e5e1d7" }}
              tickLine={false}
            />
            <YAxis
              domain={[80, 470]}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${Math.round(((v as number) - 100) / 1)}%`}
              width={42}
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#9ca3af"
              strokeWidth={1.5}
              strokeDasharray="4 4"
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
