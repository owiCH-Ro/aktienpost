"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyRow {
  month: string;          // "YYYY-MM"
  strategy: number | null; // monthly return %, e.g. -0.16
  benchmark: number | null;
}

interface Props {
  monthly: MonthlyRow[];
  /** YYYY-MM-DD when live tracking begins. Earlier points are "Backtest". */
  liveStart: string;
}

/** Walk monthly returns and compound them into a date-indexed series.
 * Strategy series gets a `phase` field ("backtest" | "live") so the
 * grey/green split can be plotted as two overlaid lines. */
function buildEquity(monthly: MonthlyRow[], liveStart: string) {
  const out: Array<{
    month: string;
    date: number;
    strategy_backtest: number | null;
    strategy_live: number | null;
    benchmark: number | null;
  }> = [];

  let stratValue = 100;
  let benchValue = 100;
  const liveTs = new Date(liveStart).getTime();
  let firstStratSeen = false;
  let firstBenchSeen = false;

  for (const row of monthly) {
    const ts = new Date(`${row.month}-01`).getTime();
    if (row.strategy != null) {
      if (firstStratSeen) {
        stratValue *= 1 + row.strategy / 100;
      } else {
        // The first non-null month is the implicit base = 100.
        firstStratSeen = true;
      }
    }
    if (row.benchmark != null) {
      if (firstBenchSeen) {
        benchValue *= 1 + row.benchmark / 100;
      } else {
        firstBenchSeen = true;
      }
    }
    const isLive = ts >= liveTs;
    out.push({
      month: row.month,
      date: ts,
      // Both lines carry the SAME value during the overlap month
      // (the live_start month) so the eye sees a continuous handoff
      // from grey to green without a visible gap.
      strategy_backtest: !isLive && firstStratSeen ? round(stratValue) : null,
      strategy_live:
        isLive && firstStratSeen
          ? round(stratValue)
          : ts === firstLiveOverlap(monthly, liveStart)
            ? round(stratValue)
            : null,
      benchmark: firstBenchSeen ? round(benchValue) : null,
    });
  }
  // Force a one-month overlap so the handoff has no gap: the last
  // backtest month also carries a live value at the same point.
  const liveStartIdx = out.findIndex((p) => new Date(`${p.month}-01`).getTime() >= liveTs);
  if (liveStartIdx > 0) {
    const prev = out[liveStartIdx - 1];
    if (prev.strategy_backtest != null) {
      out[liveStartIdx - 1] = { ...prev, strategy_live: prev.strategy_backtest };
    }
  }
  return out;
}

function round(v: number): number {
  return Math.round(v * 100) / 100;
}

function firstLiveOverlap(monthly: MonthlyRow[], liveStart: string): number {
  const target = new Date(liveStart).getTime();
  for (const row of monthly) {
    const ts = new Date(`${row.month}-01`).getTime();
    if (ts >= target) return ts;
  }
  return target;
}

function fmtAxisDate(ts: number): string {
  const d = new Date(ts);
  return String(d.getFullYear());
}

function fmtTooltipDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("de-CH", { year: "numeric", month: "short" });
}

export function PerformanceEquityChart({ monthly, liveStart }: Props) {
  const data = useMemo(() => buildEquity(monthly, liveStart), [monthly, liveStart]);
  const liveStartTs = new Date(liveStart).getTime();

  // X-axis ticks: one per Jan, only.
  const yearTicks = useMemo(() => {
    const out: number[] = [];
    const seen = new Set<number>();
    for (const p of data) {
      const y = new Date(p.date).getFullYear();
      if (!seen.has(y)) {
        seen.add(y);
        out.push(p.date);
      }
    }
    return out;
  }, [data]);

  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl border border-line bg-white p-3 sm:p-5 lg:p-6">
      <div className="h-[260px] sm:h-[340px] lg:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 12, right: 16, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e1d7" vertical={false} />
            <XAxis
              dataKey="date"
              type="number"
              domain={["dataMin", "dataMax"]}
              ticks={yearTicks}
              tickFormatter={fmtAxisDate}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "#e5e1d7" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={44}
              tickFormatter={(v) => String(Math.round(v as number))}
            />
            <Tooltip
              labelFormatter={(label) => fmtTooltipDate(Number(label))}
              formatter={(value: number, name: string) => {
                const labelMap: Record<string, string> = {
                  strategy_backtest: "SPI Breakout (Backtest)",
                  strategy_live: "SPI Breakout (Live)",
                  benchmark: "SPI Index",
                };
                return [
                  typeof value === "number" ? value.toFixed(1) : value,
                  labelMap[name] || name,
                ];
              }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e1d7",
                borderRadius: 6,
                fontSize: 13,
              }}
            />
            <Legend
              verticalAlign="top"
              height={28}
              iconType="plainline"
              wrapperStyle={{ fontSize: 12, color: "#1a1a1a" }}
              formatter={(value: string) => {
                const labelMap: Record<string, string> = {
                  strategy_backtest: "SPI Breakout (Backtest)",
                  strategy_live: "SPI Breakout (Live ab Apr 2025)",
                  benchmark: "SPI Index",
                };
                return labelMap[value] || value;
              }}
            />
            <ReferenceLine
              x={liveStartTs}
              stroke="#22c55e"
              strokeDasharray="2 4"
              ifOverflow="extendDomain"
            />
            {/* Backtest segment — grey */}
            <Line
              type="monotone"
              dataKey="strategy_backtest"
              stroke="#6b7280"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
              isAnimationActive={false}
              name="strategy_backtest"
            />
            {/* Live segment — green */}
            <Line
              type="monotone"
              dataKey="strategy_live"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
              isAnimationActive={false}
              name="strategy_live"
            />
            {/* Benchmark — dashed muted blue */}
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#6b89b7"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
              connectNulls={false}
              isAnimationActive={false}
              name="benchmark"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-center text-[11px] leading-snug text-muted">
        Backtest 2016–2025 | Live-Tracking ab April 2025 | Vergangene
        Performance ist kein Indikator für zukünftige Ergebnisse.
      </p>
    </div>
  );
}
