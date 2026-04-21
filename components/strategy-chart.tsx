"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  strategy: number[];
  benchmark: number[];
  benchmarkLabel: string;
  startYear?: number;
  endYear?: number;
}

/** Full-size equity curve for the strategy detail pages.
 *
 * Strategy + benchmark arrays can have different lengths. We merge them
 * onto a shared x-axis by expressing each index as a fractional year
 * (startYear..endYear), sort, and let Recharts connect across nulls so
 * both lines render on the same timescale without either being
 * artificially resampled. */
export function StrategyChart({
  strategy,
  benchmark,
  benchmarkLabel,
  startYear = 2016,
  endYear = 2026,
}: Props) {
  const span = endYear - startYear;

  type Row = { x: number; strategy?: number; benchmark?: number };
  const map = new Map<number, Row>();

  const keyFor = (x: number) => Math.round(x * 1000) / 1000;
  const put = (x: number, patch: Partial<Row>) => {
    const k = keyFor(x);
    const cur = map.get(k) ?? { x: k };
    map.set(k, { ...cur, ...patch });
  };

  strategy.forEach((v, i) => {
    const x = startYear + (i / Math.max(strategy.length - 1, 1)) * span;
    put(x, { strategy: v });
  });
  benchmark.forEach((v, i) => {
    const x = startYear + (i / Math.max(benchmark.length - 1, 1)) * span;
    put(x, { benchmark: v });
  });

  const data = [...map.values()].sort((a, b) => a.x - b.x);

  const tickYears: number[] = [];
  for (let y = startYear; y <= endYear; y += 2) tickYears.push(y);

  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 12, right: 16, left: 16, bottom: 8 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e1d7"
            vertical={false}
          />
          <XAxis
            dataKey="x"
            type="number"
            domain={[startYear, endYear]}
            ticks={tickYears}
            tickFormatter={(v) => String(Math.round(v as number))}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={{ stroke: "#e5e1d7" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
            width={44}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e5e1d7",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelFormatter={(v) => `Jahr ${(v as number).toFixed(1)}`}
            formatter={(value: number, _name, item) => {
              const k = item?.dataKey;
              const label =
                k === "strategy" ? "Strategie" : benchmarkLabel;
              return [value.toFixed(0), label];
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            iconType="plainline"
            wrapperStyle={{
              paddingBottom: 12,
              fontSize: 12,
              color: "#6b7280",
            }}
            formatter={(v) =>
              v === "strategy" ? "Strategie" : benchmarkLabel
            }
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="#9ca3af"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            dot={false}
            isAnimationActive={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="strategy"
            stroke="#1a2e4a"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
