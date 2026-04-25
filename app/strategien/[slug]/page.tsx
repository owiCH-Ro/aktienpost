import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PerformanceTable } from "@/components/performance-table";
import { StrategyChart } from "@/components/strategy-chart";
import chartData from "@/data/chart_data.json";
import { STRATEGIES, getStrategyBySlug } from "@/data/strategies";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return STRATEGIES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getStrategyBySlug(params.slug);
  if (!s) return { title: "Strategie nicht gefunden — aktienpost.ch" };
  return {
    title: `${s.name} — aktienpost.ch`,
    description: `${s.name}: ${s.total} in 10 Jahren (${s.pa}), Max. Rückgang ${s.maxDd}. ${s.shortDescription}`,
  };
}

export default function StrategyDetailPage({ params }: Props) {
  const s = getStrategyBySlug(params.slug);
  if (!s) notFound();

  return (
    <main className="min-h-screen">
      <Nav />

      <div className="container pt-8">
        <Link
          href="/#strategien"
          className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-navy"
        >
          <span aria-hidden>←</span> Zurück zur Übersicht
        </Link>
      </div>

      {/* Header */}
      <section className="border-b border-line">
        <div className="container py-10 sm:py-12 lg:py-16">
          <span className="eyebrow">Strategie — {s.tagline}</span>
          <h1 className="mt-5 font-serif text-[30px] leading-[1.1] text-navy sm:mt-6 sm:text-[42px] sm:leading-[1.08] lg:text-[56px]">
            {s.detailHeadline}
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-secondary sm:mt-6 sm:text-base lg:text-lg">
            {s.shortDescription}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:mt-10 sm:gap-x-8 sm:gap-y-6 sm:pt-8 md:grid-cols-4">
            <Metric label="Rendite 10 Jahre" value={s.total} tone="navy" />
            <Metric label="Rendite p.a." value={s.pa} tone="navy" />
            <Metric label="Max. Rückgang" value={s.maxDd} tone="redbrown" />
            <Metric label="Trades / Jahr" value={s.tradesPerYear} tone="navy" />
          </div>
        </div>
      </section>

      {/* Equity curve */}
      <section className="border-b border-line bg-cream-dark/40">
        <div className="container py-12 sm:py-16 lg:py-20">
          <div className="mb-5 sm:mb-6">
            <span className="eyebrow">Performance 2016 – 2026</span>
            <h2 className="mt-4 font-serif text-[24px] leading-tight text-navy sm:text-[30px] lg:text-[36px]">
              Strategie vs.{" "}
              <span className="italic">
                {
                  (chartData as Record<string, { benchmarkLabel: string }>)[
                    params.slug
                  ]?.benchmarkLabel ?? s.keyFacts.benchmark
                }
              </span>
            </h2>
          </div>
          <div className="w-full max-w-full overflow-hidden rounded-xl border border-line bg-white p-3 sm:p-5 lg:p-6">
            <StrategyChart slug={params.slug} />
          </div>
        </div>
      </section>

      {/* Performance table */}
      <section className="border-b border-line">
        <div className="container py-12 sm:py-16 lg:py-20">
          <span className="eyebrow">Performance-Tabelle</span>
          <h2 className="mt-4 font-serif text-[24px] leading-tight text-navy sm:text-[30px] lg:text-[36px]">
            Renditen über{" "}
            <span className="italic">verschiedene Zeiträume</span>.
          </h2>

          <div className="mt-8 sm:mt-10">
            <PerformanceTable
              rows={s.performanceTable}
              benchLabel={s.keyFacts.benchmark}
              note={s.performanceNote}
            />
          </div>
        </div>
      </section>

      {/* Description + Key facts side-by-side on desktop */}
      <section className="border-b border-line bg-cream-dark/40">
        <div className="container grid gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-20">
          <div>
            <span className="eyebrow">Die Strategie im Detail</span>
            <h2 className="mt-4 font-serif text-[24px] leading-tight text-navy sm:text-[30px] lg:text-[36px]">
              Wie <span className="italic">{s.name}</span> funktioniert
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/85 sm:mt-8">
              {s.longDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {s.kernaussagen.length > 0 && (
              <div className="mt-8 sm:mt-10">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
                  Kernaussagen
                </h3>
                <ul className="mt-4 space-y-3 sm:mt-5">
                  {s.kernaussagen.map((k, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/85"
                    >
                      <span
                        className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-gold"
                        aria-hidden
                      />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="self-start">
            <div className="rounded-xl border border-line bg-white p-5 sm:p-7">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
                Key Facts
              </h3>
              <dl className="mt-5 space-y-4 text-sm sm:mt-6">
                <KeyFactRow label="Markt" value={s.keyFacts.markt} />
                <KeyFactRow label="Typ" value={s.keyFacts.typ} />
                <KeyFactRow label="Positionen" value={s.keyFacts.positionen} />
                <KeyFactRow label="Rebalancing" value={s.keyFacts.rebalancing} />
                <KeyFactRow label="Trades" value={s.keyFacts.trades} />
                <KeyFactRow label="Benchmark" value={s.keyFacts.benchmark} />
                <KeyFactRow label="Backtest" value={s.keyFacts.backtest} />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy">
        <div className="container py-12 text-center sm:py-16 lg:py-20">
          <h2 className="mx-auto max-w-3xl font-serif text-[26px] leading-tight text-cream sm:text-[32px] lg:text-[42px]">
            Überzeugt? <span className="italic text-gold">Starten Sie jetzt.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-cream/70 sm:mt-5 sm:text-base">
            30 Tage kostenlos testen. Kein Risiko. Kündigung jederzeit
            möglich.
          </p>
          <div className="mt-7 sm:mt-8">
            <Link
              href="/#preise"
              className="inline-flex min-h-[48px] w-full max-w-[420px] items-center justify-center rounded-md bg-gold px-7 py-4 text-base font-medium text-white transition-colors hover:bg-gold-dark sm:w-auto sm:text-[15px]"
            >
              Jetzt starten — ab CHF 49 / Monat
            </Link>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-cream/40">
            Hinweis: Vergangene Wertentwicklung ist kein verlässlicher
            Indikator für zukünftige Ergebnisse. Alle Renditen basieren auf
            historischen Backtests unter Berücksichtigung von
            Transaktionskosten. aktienpost.ch stellt keine Anlageberatung dar.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Small subcomponents (kept local to the page)
// ---------------------------------------------------------------------------

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "navy" | "redbrown";
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
        {label}
      </span>
      <span
        className={`font-serif text-[26px] leading-none tabular-nums sm:text-[34px] lg:text-[40px] ${
          tone === "redbrown" ? "text-redbrown" : "text-navy"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function KeyFactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/70 pb-3 last:border-0 last:pb-0">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="font-serif text-[15px] text-navy">{value}</dd>
    </div>
  );
}
