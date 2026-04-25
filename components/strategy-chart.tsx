"use client";

import { AnimatedLineChart, type CurvePoint } from "@/components/animated-line-chart";
import chartData from "@/data/chart_data.json";

/** Full-size strategy equity curve used on the /strategien/[slug] detail
 * pages. Thin wrapper around AnimatedLineChart — the shared component
 * handles animation, annotations, endpoint labels and footer. */
export function StrategyChart({ slug }: { slug: string }) {
  const entry = (chartData as Record<string, {
    name: string;
    benchmarkLabel: string;
    data: CurvePoint[];
  }>)[slug];

  if (!entry) return null;

  return (
    <AnimatedLineChart
      data={entry.data}
      strategyLabel={entry.name}
      benchmarkLabel={entry.benchmarkLabel}
      heightClassName="h-[250px] sm:h-[340px] lg:h-[420px]"
    />
  );
}
