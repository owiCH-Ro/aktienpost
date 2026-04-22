import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Glossar — aktienpost.ch",
  description:
    "Börsenbegriffe einfach erklärt: Backtest, Benchmark, Breakout, CAGR, Drawdown, Rebalancing, Sharpe Ratio, SPI, Survivorship Bias, Volatilität, 60/40-Portfolio.",
};

interface Entry {
  term: string;
  body: string;
}

const ENTRIES: Entry[] = [
  {
    term: "Backtest",
    body: "Ein Backtest simuliert, wie eine Anlagestrategie in der Vergangenheit funktioniert hätte, wenn man sie tatsächlich angewendet hätte. Dazu werden echte historische Kursdaten verwendet. Ein guter Backtest umfasst verschiedene Marktphasen — Aufschwünge, Crashs und Seitwärtsphasen. Wichtig: Ein Backtest ist keine Garantie für zukünftige Resultate, aber er zeigt, ob eine Strategie unter realistischen Bedingungen funktioniert.",
  },
  {
    term: "Benchmark / Vergleichsindex",
    body: "Der Massstab, an dem eine Strategie gemessen wird. Für Schweizer Aktien ist das typischerweise der SPI (Swiss Performance Index), für US-Tech-Aktien der Nasdaq 100. Eine gute Strategie sollte ihren Benchmark langfristig schlagen.",
  },
  {
    term: "Breakout",
    body: "Ein Kursausbruch nach oben, nachdem eine Aktie längere Zeit in einem engen Kursband seitwärts gelaufen ist. Breakouts deuten oft auf den Beginn eines neuen Aufwärtstrends hin und sind die Grundlage unserer offensiven Strategien.",
  },
  {
    term: "Buy & Hold",
    body: "Die einfachste Anlagestrategie: Kaufen und langfristig halten, ohne aktiv zu handeln. Dient in unseren Vergleichen als Referenzwert — „hätte ich einfach den Index gekauft und gehalten“.",
  },
  {
    term: "CAGR (Rendite p.a.)",
    body: "Compound Annual Growth Rate — die durchschnittliche jährliche Rendite, bereinigt um den Zinseszinseffekt. Beispiel: +350% über 10 Jahre entspricht einer CAGR von 15.7% pro Jahr.",
  },
  {
    term: "Drawdown / Max. Rückgang",
    body: "Der grösste Wertverlust vom Höchststand zum Tiefstand innerhalb eines bestimmten Zeitraums. Ein Drawdown von -20% bedeutet: Vom Höchststand fiel das Portfolio um 20%, bevor es sich wieder erholte. Je kleiner der Drawdown, desto ruhiger die Anlage.",
  },
  {
    term: "Rebalancing",
    body: "Die regelmässige Anpassung des Portfolios. Bei SPI Defensiv geschieht dies quartalsweise: Die 7 Aktien werden neu bewertet und bei Bedarf ausgetauscht.",
  },
  {
    term: "Sharpe Ratio",
    body: "Ein Mass für die risikobereinigte Rendite. Je höher die Sharpe Ratio, desto mehr Rendite erzielt die Strategie pro eingegangenes Risiko. Werte über 1.0 gelten als gut, über 1.5 als sehr gut.",
  },
  {
    term: "SPI (Swiss Performance Index)",
    body: "Der Gesamtmarktindex der Schweizer Börse. Umfasst nahezu alle kotierten Schweizer Aktiengesellschaften (rund 200 Titel). Er berücksichtigt auch Dividenden (Total Return Index).",
  },
  {
    term: "Survivorship Bias",
    body: "Eine statistische Verzerrung in Backtests: Es werden nur Aktien berücksichtigt, die heute noch im Index enthalten sind. Unternehmen, die in den letzten 10 Jahren aufgelöst oder vom Index gestrichen wurden, fehlen. Dies kann dazu führen, dass Backtest-Ergebnisse etwas zu optimistisch ausfallen.",
  },
  {
    term: "Volatilität",
    body: "Die Schwankungsbreite eines Kurses. Hohe Volatilität bedeutet starke Kursschwankungen (und damit höheres Risiko), niedrige Volatilität bedeutet ruhigere Kursbewegungen. Unsere SPI Defensiv Strategie investiert gezielt in Aktien mit niedriger Volatilität.",
  },
  {
    term: "60/40-Portfolio",
    body: "Die klassische „ausgewogene“ Anlagestrategie: 60% Aktien, 40% Anleihen. Wird von vielen Banken als Standardprodukt angeboten. Bietet weniger Risiko als 100% Aktien, aber auch weniger Rendite.",
  },
];

export default function GlossarPage() {
  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Glossar</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Begriffe <span className="italic">einfach erklärt</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Die wichtigsten Fachbegriffe rund um Anlagestrategien, Backtests
            und Risikomessung — kurz, präzise und ohne Banker-Deutsch.
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14 lg:py-20">
          <dl className="mx-auto max-w-3xl divide-y divide-line">
            {ENTRIES.map((e) => (
              <div
                key={e.term}
                className="grid gap-3 py-7 md:grid-cols-[220px_1fr] md:gap-8"
              >
                <dt className="font-serif text-[20px] text-navy">{e.term}</dt>
                <dd className="text-[15px] leading-relaxed text-ink/85">
                  {e.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageShell>
  );
}
