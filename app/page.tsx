import Link from "next/link";

import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { HeroChart } from "@/components/hero-chart";
import { Nav } from "@/components/nav";
import { PortfolioCombinations } from "@/components/portfolio-combinations";
import { Sparkline } from "@/components/sparkline";
import { StrategyTabs } from "@/components/strategy-tabs";
import chartData from "@/data/chart_data.json";
import { STRATEGIES } from "@/data/strategies";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      <Hero />
      <MetricsBar />
      <StrategyTabs />
      <PerformanceCards />
      <HowItWorks />
      <BankComparison />
      <PortfolioCombinations />
      <Pricing />
      <FaqSection />
      <FinalCta />
      <Footer />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Section: Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container grid gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <span className="eyebrow">Börsensignale aus der Schweiz</span>

          <h1 className="mt-5 font-serif text-[30px] leading-[1.1] text-navy sm:mt-6 sm:text-[44px] sm:leading-[1.08] lg:text-[62px]">
            +350% mit Schweizer Aktien.
            <br />
            <span className="italic">Vier Strategien, die den Markt schlagen.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary sm:mt-7 sm:text-lg">
            Algorithmische Börsensignale für Schweizer Privatanleger —
            wissenschaftlich getestet, einfach umzusetzen. 5 Minuten pro
            Signal. Ab CHF 49 im Monat.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <a
              href="#preise"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-gold px-6 py-3.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-gold-dark sm:w-auto sm:text-[15px]"
            >
              Jetzt starten — 30 Tage kostenlos
            </a>
            <a
              href="#performance"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-navy/20 bg-transparent px-6 py-3.5 text-base font-medium text-navy transition-colors hover:border-navy hover:bg-navy/5 sm:w-auto sm:text-[15px]"
            >
              Performance ansehen
            </a>
          </div>
        </div>

        <div className="flex items-center">
          <HeroChart />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Metrics bar
// ---------------------------------------------------------------------------

function MetricsBar() {
  const items = [
    { value: "+860%", label: "in 10 Jahren (US Tech Growth)" },
    { value: "5 Min.", label: "Aufwand pro Signal" },
    { value: "CHF 490", label: "pro Jahr — ab" },
    { value: "30 Tage", label: "kostenlos testen" },
  ];
  return (
    <section className="border-b border-line bg-cream-dark/60">
      <div className="container grid grid-cols-2 gap-6 py-8 sm:gap-8 sm:py-10 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col gap-1">
            <span className="font-serif text-[22px] text-navy sm:text-[28px]">
              {it.value}
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-secondary sm:text-xs">
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Performance cards (2x2 grid)
// ---------------------------------------------------------------------------

function PerformanceCards() {
  return (
    <section id="performance" className="border-b border-line bg-cream-dark/40">
      <div className="container py-12 sm:py-16 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Performance</span>
          <h2 className="mt-5 font-serif text-[26px] leading-tight text-navy sm:mt-6 sm:text-[34px] lg:text-[44px]">
            10 Jahre Backtest. Echte Zahlen.{" "}
            <span className="italic">Keine Versprechungen.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base lg:text-lg">
            Alle Ergebnisse basieren auf tatsächlichen historischen
            Kursverläufen, inklusive Transaktionskosten. Vergangene Wertent-
            wicklung ist kein verlässlicher Indikator für zukünftige Renditen.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2">
          {STRATEGIES.map((s) => {
            // Pull the real backtest curve from chart_data.json; the
            // <Sparkline> downsamples every Nth point itself so we just
            // hand over the raw weekly series.
            const curve = (chartData as Record<string, { data: { strategy: number }[] }>)[
              s.slug
            ]?.data.map((p) => p.strategy) ?? [];
            return (
            <Link
              key={s.slug}
              href={`/strategien/${s.slug}`}
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-gold/60 sm:min-h-[320px] sm:p-7"
            >
              {/* Foreground content */}
              <div className="relative z-10 flex items-start justify-between gap-3">
                <h3 className="font-serif text-[20px] text-navy sm:text-[24px]">{s.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-secondary sm:text-[11px]">
                  10 Jahre
                </span>
              </div>

              <div className="relative z-10 mt-5 sm:mt-6">
                <div className="font-serif text-[40px] leading-none text-navy sm:text-[52px]">
                  {s.total}
                </div>
                <div className="mt-2 text-[13px] text-secondary sm:text-sm">
                  vs. {s.benchLabel}: {s.benchTotal}
                </div>
                <div className="mt-1 text-[11px] text-muted sm:text-xs">
                  Max DD: {s.maxDd} vs {s.benchDd}
                </div>
              </div>

              {/* Watermark sparkline — spans the full card width behind the
                  p.a. label at the bottom. pointer-events-none so it doesn't
                  block hover/click on the article itself. */}
              <Sparkline
                data={curve}
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px] w-full"
              />

              <div className="relative z-10 mt-6 flex items-end justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-secondary">
                  {s.pa}
                </span>
                <span
                  aria-hidden
                  className="text-gold transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: How it works
// ---------------------------------------------------------------------------

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Signal erhalten",
      body: "Jeden Abend nach Börsenschluss analysiert unser Algorithmus die Märkte. Gibt es ein Kauf- oder Verkaufssignal, erhalten Sie eine E-Mail mit dem Aktiennamen, der empfohlenen Handlung und dem aktuellen Kurs. Im Schnitt passiert das alle 4 bis 6 Wochen pro Strategie.",
    },
    {
      n: "02",
      title: "Handel ausführen",
      body: "Loggen Sie sich bei Ihrer Bank oder Ihrem Online-Broker ein und führen Sie den Kauf oder Verkauf aus. Das dauert weniger als 5 Minuten. Sie brauchen dafür kein spezielles Wissen — nur ein ganz normales Wertschriftendepot, wie Sie es bei Swissquote, PostFinance oder jeder Kantonalbank haben.",
    },
    {
      n: "03",
      title: "Zurücklehnen",
      body: "Der Algorithmus überwacht Ihre Positionen rund um die Uhr. Er meldet sich nur, wenn eine Aktion nötig ist — sei es ein Verkaufssignal, ein Schutz-Auslöser oder eine neue Kaufgelegenheit. Sie müssen nicht täglich die Kurse prüfen.",
    },
  ];
  return (
    <section className="border-b border-line">
      <div className="container py-12 sm:py-16 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">So funktioniert es</span>
          <h2 className="mt-5 font-serif text-[26px] leading-tight text-navy sm:mt-6 sm:text-[34px] lg:text-[44px]">
            In drei Schritten zu besseren{" "}
            <span className="italic">Anlage-Entscheidungen</span>.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base lg:text-lg">
            Kein Fachwissen nötig. Keine Software zu installieren. Kein
            tägliches Überwachen.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-16 sm:gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[36px] leading-none text-gold sm:text-[42px]">
                  {s.n}
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>
              <h3 className="font-serif text-[20px] text-navy sm:text-[22px]">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-secondary">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-base italic text-navy sm:mt-16 sm:text-lg">
          Ihr gesamter Aufwand: rund 30 Minuten pro Quartal. Für alle vier
          Strategien zusammen.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Bank comparison
// ---------------------------------------------------------------------------

function BankComparison() {
  const rows = [
    {
      label: "Kosten (bei CHF 100'000)",
      us: "CHF 490 / Jahr",
      bank: "CHF 1'000 – 1'500 / Jahr",
    },
    {
      label: "Rendite p.a. (CH, 10 J.)",
      us: "15.7%",
      bank: "5 – 8%",
    },
    {
      label: "Ihr Zeitaufwand",
      us: "~30 Min. / Quartal",
      bank: "keiner",
    },
    {
      label: "Transparenz",
      us: "Jedes Signal sichtbar",
      bank: "Quartals-Report",
    },
    {
      label: "Mindestanlage",
      us: "keine",
      bank: "oft CHF 100'000+",
    },
  ];

  return (
    <section className="border-b border-line bg-cream-dark/40">
      <div className="container py-12 sm:py-16 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Vergleich</span>
          <h2 className="mt-5 font-serif text-[26px] leading-tight text-navy sm:mt-6 sm:text-[34px] lg:text-[44px]">
            aktienpost.ch vs. typische <span className="italic">Bank</span>.
          </h2>
        </div>

        {/* Mobile: stacked cards (one per row). Desktop (sm+): 3-col table. */}
        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 sm:hidden">
          {rows.map((r) => (
            <div
              key={r.label}
              className="rounded-lg border border-line bg-white p-4"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-secondary">
                {r.label}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[14px]">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-gold">
                    aktienpost.ch
                  </div>
                  <div className="mt-1 text-ink">{r.us}</div>
                </div>
                <div className="border-l border-line pl-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-secondary">
                    Typische Bank
                  </div>
                  <div className="mt-1 text-secondary">{r.bank}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 hidden max-w-4xl overflow-hidden rounded-xl border border-line bg-white sm:block">
          <div className="grid grid-cols-3 border-b border-line bg-cream-dark/60 text-[11px] uppercase tracking-[0.18em] text-secondary">
            <div className="px-5 py-4 md:px-7" />
            <div className="border-l border-line px-5 py-4 md:px-7">
              aktienpost.ch
            </div>
            <div className="border-l border-line px-5 py-4 md:px-7">
              Typische Bank
            </div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 text-sm ${
                i % 2 === 1 ? "bg-cream-dark/20" : ""
              }`}
            >
              <div className="px-5 py-4 font-serif text-navy md:px-7">
                {r.label}
              </div>
              <div className="border-l border-line px-5 py-4 text-ink md:px-7">
                {r.us}
              </div>
              <div className="border-l border-line px-5 py-4 text-secondary md:px-7">
                {r.bank}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Pricing
// ---------------------------------------------------------------------------

function Pricing() {
  const plans = [
    {
      slug: "basis",
      name: "Basis",
      monthly: "49",
      yearly: "490",
      features: [
        "Alle 4 Strategien",
        "E-Mail-Signale (nach Börsenschluss)",
        "Performance-Übersicht YTD–10J",
      ],
      cta: "Basis wählen",
      featured: false,
    },
    {
      slug: "plus",
      name: "Plus",
      monthly: "99",
      yearly: "990",
      features: [
        "Alles aus Basis",
        "Online-Dashboard mit Charts",
        "Fundamentaldaten je Signal (KGV, Dividende)",
        "Wöchentlicher Marktkommentar",
      ],
      cta: "Plus wählen",
      featured: true,
    },
    {
      slug: "premium",
      name: "Premium",
      monthly: "149",
      yearly: "1'490",
      features: [
        "Alles aus Plus",
        "Persönliche Einschätzung des Gründers bei aussergewöhnlichen Marktsituationen (z.B. Übernahmen, Delistings, Marktcrashs)",
        "Quartals-Markteinschätzung",
        "Prioritäts-E-Mail-Support",
        "Zugang zu experimentellen Strategien",
      ],
      cta: "Premium wählen",
      featured: false,
    },
  ];

  return (
    <section id="preise" className="border-b border-line">
      <div className="container py-12 sm:py-16 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Preise</span>
          <h2 className="mt-5 font-serif text-[26px] leading-tight text-navy sm:mt-6 sm:text-[34px] lg:text-[44px]">
            Transparent. Fair.{" "}
            <span className="italic">Ohne versteckte Kosten.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:mt-5 sm:text-base lg:text-lg">
            Jahresabo: 2 Monate gratis. 30 Tage kostenlos testen auf
            jedem Plan.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-xl border bg-white p-6 sm:p-8 ${
                p.featured
                  ? "order-first border-gold shadow-[0_8px_40px_-8px_rgba(197,151,62,0.35)] md:order-none"
                  : "border-line"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gold bg-gold px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  Empfohlen
                </span>
              )}
              <div>
                <h3 className="font-serif text-[24px] text-navy sm:text-[28px]">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1 sm:mt-5">
                  <span className="font-serif text-[32px] text-navy sm:text-[40px]">
                    CHF {p.monthly}
                  </span>
                  <span className="text-sm text-secondary">/ Monat</span>
                </div>
                <div className="mt-1 text-sm text-secondary">
                  Oder CHF {p.yearly} / Jahr
                </div>
              </div>

              <ul className="mt-6 flex flex-col gap-3 text-[15px] sm:mt-8 sm:text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-none text-gold"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-ink/90">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10">
                <Link
                  href={`/anmelden?plan=${p.slug}`}
                  className={
                    p.featured
                      ? "inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-gold px-5 py-3 text-base font-medium text-white transition-colors hover:bg-gold-dark sm:text-sm"
                      : "inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-navy/20 bg-transparent px-5 py-3 text-base font-medium text-navy transition-colors hover:border-navy hover:bg-navy/5 sm:text-sm"
                  }
                >
                  {p.cta}
                </Link>
                <span className="text-center text-xs text-muted">
                  30 Tage kostenlos testen
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: FAQ
// ---------------------------------------------------------------------------

function FaqSection() {
  return (
    <section id="faq" className="border-b border-line bg-cream-dark/40">
      <div className="container py-12 sm:py-16 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Häufige Fragen</span>
          <h2 className="mt-5 font-serif text-[26px] leading-tight text-navy sm:mt-6 sm:text-[34px] lg:text-[44px]">
            Was Sie <span className="italic">wissen sollten</span>.
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <Faq />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Final CTA
// ---------------------------------------------------------------------------

function FinalCta() {
  return (
    <section className="bg-navy">
      <div className="container py-12 text-center sm:py-16 lg:py-28">
        <h2 className="mx-auto max-w-3xl font-serif text-[28px] leading-tight text-cream sm:text-[36px] lg:text-[48px]">
          Probieren Sie es aus — ohne{" "}
          <span className="italic text-gold">Risiko</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-cream/70 sm:mt-6 sm:text-base lg:text-lg">
          30 Tage kostenlos testen. Kein Risiko. Kündigung jederzeit
          möglich.
        </p>
        <div className="mt-8 sm:mt-10">
          <a
            href="#preise"
            className="inline-flex min-h-[48px] w-full max-w-[420px] items-center justify-center rounded-md bg-gold px-7 py-4 text-base font-medium text-white transition-colors hover:bg-gold-dark sm:w-auto sm:text-[15px]"
          >
            Jetzt starten — ab CHF 49 / Monat
          </a>
        </div>
      </div>
    </section>
  );
}

