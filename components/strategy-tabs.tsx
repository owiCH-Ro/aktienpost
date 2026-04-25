"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AnimatedLineChart,
  type CurvePoint,
} from "@/components/animated-line-chart";
import { PerformanceTable } from "@/components/performance-table";
import chartData from "@/data/chart_data.json";
import { STRATEGIES, type Strategy } from "@/data/strategies";

export function StrategyTabs() {
  const [active, setActive] = useState(STRATEGIES[0].slug);
  const current = STRATEGIES.find((s) => s.slug === active) ?? STRATEGIES[0];

  return (
    <section id="strategien" className="border-b border-line">
      <div className="container py-12 sm:py-16 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Strategien</span>
          <h2 className="mt-5 font-serif text-[26px] leading-tight text-navy sm:mt-6 sm:text-[34px] lg:text-[44px]">
            Vier Strategien. 10 Jahre getestet.{" "}
            <span className="italic">Jede übertrifft ihren Index.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base lg:text-lg">
            Jede Strategie folgt einem eigenen, klaren Regelwerk — von
            defensiv bis wachstumsorientiert. Wählen Sie eine Strategie
            oder kombinieren Sie mehrere.
          </p>
        </div>

        {/* Tab bar — horizontal scroll on mobile so all 4 tabs stay readable
            without wrapping. The negative margins + container padding let
            the scrollable area extend edge-to-edge on small screens. */}
        <div className="mt-8 -mx-4 overflow-x-auto px-4 sm:mt-12 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Strategien"
            className="flex min-w-max gap-x-2 gap-y-0 border-b border-line sm:min-w-0 sm:flex-wrap"
          >
            {STRATEGIES.map((s) => {
              const isActive = s.slug === active;
              return (
                <button
                  key={s.slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(s.slug)}
                  className={[
                    "relative -mb-px shrink-0 px-3 py-3 text-sm font-medium transition-colors sm:px-6 sm:py-4 sm:text-[15px]",
                    isActive
                      ? "text-navy"
                      : "text-secondary hover:text-navy",
                  ].join(" ")}
                >
                  <span className="whitespace-nowrap font-serif text-[15px] sm:text-[19px]">
                    {s.name}
                  </span>
                  <span
                    aria-hidden
                    className={[
                      "absolute inset-x-0 -bottom-px h-[2px] transition-all",
                      isActive ? "bg-navy" : "bg-transparent",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab panel */}
        <TabPanel strategy={current} />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Panel (left: copy, right: chart, below: table)
// ---------------------------------------------------------------------------

function TabPanel({ strategy: s }: { strategy: Strategy }) {
  const entry = (chartData as Record<string, {
    name: string;
    benchmarkLabel: string;
    data: CurvePoint[];
  }>)[s.slug];

  return (
    <div className="grid gap-8 pt-8 sm:gap-10 sm:pt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:pt-14">
      {/* Left column */}
      <div className="flex flex-col">
        <div className="text-[11px] uppercase tracking-[0.22em] text-gold">
          {s.subtitle}
        </div>
        <h3 className="mt-3 font-serif text-[24px] leading-tight text-navy sm:text-[30px] lg:text-[36px]">
          {s.name}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/85 sm:mt-5 sm:text-[16px]">
          {s.shortDescription}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
          <MetricBox label="Benchmark" value={s.keyFacts.benchmark} />
          <MetricBox label="Aktionen / Jahr" value={s.tradesPerYear} />
        </div>

        <div className="mt-6 rounded-lg border border-gold/40 bg-gold/5 px-5 py-4">
          <p className="font-serif text-[16px] leading-snug text-navy sm:text-[18px]">
            {s.highlight}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href={`/strategien/${s.slug}`}
            className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.15em] text-navy transition-colors hover:text-gold"
          >
            Zur Detailseite
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Right column: chart. min-w-0 + max-w-full + overflow-hidden are
          all needed so endpoint/annotation SVG text can never push the
          grid column past the viewport on mobile. */}
      <div className="w-full min-w-0 max-w-full overflow-hidden">
        {entry && (
          /* key={s.slug} forces a remount on tab switch so the draw
             animation fires on each selection — a nice tactile touch. */
          <div
            key={s.slug}
            className="w-full max-w-full overflow-hidden rounded-xl border border-line bg-white p-3 sm:p-5 lg:p-6"
          >
            <AnimatedLineChart
              data={entry.data}
              strategyLabel={entry.name}
              benchmarkLabel={entry.benchmarkLabel}
              heightClassName="h-[210px] sm:h-[320px] lg:h-[360px]"
            />
          </div>
        )}
      </div>

      {/* Compact perf table — spans full width under both columns */}
      <div className="w-full min-w-0 max-w-full lg:col-span-2">
        <h4 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-secondary">
          Performance nach Zeitraum
        </h4>
        <PerformanceTable
          rows={s.performanceTable}
          benchLabel={s.keyFacts.benchmark}
          note={s.performanceNote}
        />
      </div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-cream-dark/30 px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted">
        {label}
      </div>
      <div className="mt-1 font-serif text-[17px] text-navy">{value}</div>
    </div>
  );
}
