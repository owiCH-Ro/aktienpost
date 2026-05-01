import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

import { EmailCapture } from "@/components/email-capture";
import { MonthlyReturnsHeatmap } from "@/components/monthly-returns-heatmap";
import { PageShell } from "@/components/page-shell";
import { PerformanceEquityChart } from "@/components/performance-equity-chart";

export const metadata: Metadata = {
  title: "Performance — aktienpost.ch",
  description:
    "SPI Breakout Live-Performance + 10-Jahres-Backtest. Monatliche Returns, "
    + "Equity-Kurve, Kennzahlen — täglich aktualisiert.",
};

interface PerfData {
  stats: {
    cagr: number;
    sharpe: number;
    max_dd: number;
    total_return: number;
    live_start: string;
    start_date: string;
    end_date: string;
  };
  monthly_returns: Array<{
    month: string;
    strategy: number | null;
    benchmark: number | null;
  }>;
}

function loadPerf(): PerfData {
  // Read at build/request time from the public folder. This keeps the
  // file in /public so the `compute` script on the engine side can
  // overwrite it without going through a separate import path.
  const p = path.join(process.cwd(), "public", "spi_performance.json");
  return JSON.parse(fs.readFileSync(p, "utf-8")) as PerfData;
}

export default function PerformancePage() {
  const data = loadPerf();
  const { stats, monthly_returns } = data;

  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-10 sm:py-16 lg:py-20">
          <span className="eyebrow">Performance</span>
          <h1 className="mt-5 font-serif text-[30px] leading-[1.1] text-navy sm:mt-6 sm:text-[42px] sm:leading-[1.08] lg:text-[54px]">
            SPI Breakout — <span className="italic">Live</span> &amp; Backtest.
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-secondary sm:mt-6 sm:text-base lg:text-lg">
            Monatlich aktualisierte Performance-Daten der SPI-Breakout-Strategie.
            10 Jahre Backtest seit 2016 plus Live-Tracking ab April 2025.
          </p>
        </div>
      </section>

      {/* Equity-Kurve */}
      <section className="border-b border-line">
        <div className="container py-10 sm:py-14 lg:py-20">
          <PerformanceEquityChart
            monthly={monthly_returns}
            liveStart={stats.live_start}
          />
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="border-b border-line bg-cream-dark/30">
        <div className="container py-10 sm:py-14 lg:py-20">
          <h2 className="font-serif text-[22px] leading-tight text-navy sm:text-[26px] lg:text-[30px]">
            Kennzahlen
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 md:grid-cols-4">
            <KpiTile
              label="Gesamtrendite"
              value={`+${stats.total_return.toFixed(0)}%`}
              tone="navy"
              benchmark="vs. SPI: +107.89%"
            />
            <KpiTile
              label="CAGR"
              value={`${stats.cagr.toFixed(1)}% p.a.`}
              tone="navy"
              benchmark="vs. SPI: 7.38% p.a."
            />
            <KpiTile
              label="Sharpe Ratio"
              value={stats.sharpe.toFixed(2)}
              tone="navy"
              benchmark="risikoadjustiert"
            />
            <KpiTile
              label="Max. Drawdown"
              value={`${stats.max_dd.toFixed(1)}%`}
              tone="redbrown"
              benchmark="vs. SPI: ca. -27%"
            />
          </div>
        </div>
      </section>

      {/* Monthly returns heatmap */}
      <section className="border-b border-line">
        <div className="container py-10 sm:py-14 lg:py-20">
          <h2 className="font-serif text-[22px] leading-tight text-navy sm:text-[26px] lg:text-[30px]">
            Monatliche Returns
          </h2>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-secondary">
            Strategie-Returns pro Monat in Prozent. Grün = positiv, rot =
            negativ. Letzte Spalte = compoundierter Jahresreturn.
          </p>
          <div className="mt-6">
            <MonthlyReturnsHeatmap monthly={monthly_returns} />
          </div>
        </div>
      </section>

      {/* Email-Capture (dunkler Hintergrund analog FinalCta) */}
      <section className="bg-navy">
        <div className="container py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[26px] leading-tight text-cream sm:text-[32px] lg:text-[40px]">
              Erhalte den{" "}
              <span className="italic text-gold">kostenlosen Strategie-Teardown</span>{" "}
              per Email
            </h2>
            <ul className="mx-auto mt-7 flex max-w-xl flex-col gap-3 text-left text-[15px] leading-relaxed text-cream/80">
              <li className="flex gap-3">
                <span className="mt-[7px] h-[6px] w-[6px] flex-none rounded-full bg-gold" aria-hidden />
                <span>Alle Backtest-Kennzahlen im Detail (2005–2025)</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[7px] h-[6px] w-[6px] flex-none rounded-full bg-gold" aria-hidden />
                <span>Vergleich: SPI Breakout vs. Buy &amp; Hold SPI</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[7px] h-[6px] w-[6px] flex-none rounded-full bg-gold" aria-hidden />
                <span>
                  Krisenverhalten 2008, 2020, 2022 — was hat die Strategie
                  gemacht?
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <EmailCapture
                source="performance_page"
                theme="dark"
                ctaLabel="Jetzt kostenlos erhalten"
                successText="Danke! Du erhältst den Teardown in Kürze per Email."
              />
            </div>
            <p className="mt-4 text-[12px] text-cream/50">
              Kein Spam. Abmeldung jederzeit per Klick.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function KpiTile({
  label,
  value,
  tone,
  benchmark,
}: {
  label: string;
  value: string;
  tone: "navy" | "redbrown";
  benchmark: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
      <div className="text-[10px] uppercase tracking-[0.18em] text-secondary sm:text-[11px]">
        {label}
      </div>
      <div
        className={
          "mt-2 font-serif text-[24px] leading-none tabular-nums sm:text-[28px] lg:text-[34px] " +
          (tone === "redbrown" ? "text-redbrown" : "text-navy")
        }
      >
        {value}
      </div>
      <div className="mt-3 text-[11px] leading-snug text-muted sm:text-[12px]">
        {benchmark}
      </div>
    </div>
  );
}
