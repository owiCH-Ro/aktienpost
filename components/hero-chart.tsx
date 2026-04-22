"use client";

import { AnimatedLineChart, type CurvePoint } from "@/components/animated-line-chart";
import chartData from "@/data/chart_data.json";

/** Hero chart — full SPI Breakout backtest, 2016-01 → 2026-04, pulled
 * directly from the shared chart_data.json so the landing page, the
 * tabbed strategy section and the detail page never drift apart. */
export function HeroChart() {
  const spi = chartData["spi-breakout"];
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_30px_-8px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted">
        <span>2016 — 2026</span>
        <span>10-Jahres-Backtest</span>
      </div>
      <AnimatedLineChart
        data={spi.data as CurvePoint[]}
        strategyLabel={spi.name}
        benchmarkLabel={spi.benchmarkLabel}
        height={380}
      />
    </div>
  );
}
