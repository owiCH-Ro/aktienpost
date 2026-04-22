import Link from "next/link";

import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { HeroChart } from "@/components/hero-chart";
import { Nav } from "@/components/nav";
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
      <div className="container grid gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <span className="eyebrow">Börsensignale aus der Schweiz</span>

          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px] lg:text-[62px]">
            Ihre Bank verwaltet Ihr Geld.
            <br />
            <span className="italic">Wir liefern die bessere Rendite.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
            Börsensignale für Schweizer Privatanleger — wissenschaftlich
            getestet, einfach umzusetzen. 4 bewährte Strategien. Ab CHF 49 im
            Monat.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#preise"
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3.5 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-gold-dark"
            >
              Jetzt starten — 30 Tage Geld-zurück
            </a>
            <a
              href="#performance"
              className="inline-flex items-center justify-center rounded-md border border-navy/20 bg-transparent px-6 py-3.5 text-[15px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy/5"
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
    { value: "30 Tage", label: "Geld-zurück-Garantie" },
  ];
  return (
    <section className="border-b border-line bg-cream-dark/60">
      <div className="container grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col gap-1">
            <span className="font-serif text-2xl text-navy sm:text-[28px]">
              {it.value}
            </span>
            <span className="text-xs uppercase tracking-[0.15em] text-secondary">
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
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Performance</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            10 Jahre Backtest. Echte Zahlen.{" "}
            <span className="italic">Keine Versprechungen.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Alle Ergebnisse basieren auf tatsächlichen historischen
            Kursverläufen, inklusive Transaktionskosten. Vergangene Wertent-
            wicklung ist kein verlässlicher Indikator für zukünftige Renditen.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
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
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-gold/60"
            >
              {/* Foreground content */}
              <div className="relative z-10 flex items-start justify-between">
                <h3 className="font-serif text-[24px] text-navy">{s.name}</h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-secondary">
                  10 Jahre
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <div className="font-serif text-[52px] leading-none text-navy">
                  {s.total}
                </div>
                <div className="mt-2 text-sm text-secondary">
                  vs. {s.benchLabel}: {s.benchTotal}
                </div>
                <div className="mt-1 text-xs text-muted">
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
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">So funktioniert es</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            In drei Schritten zu besseren{" "}
            <span className="italic">Anlage-Entscheidungen</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Kein Fachwissen nötig. Keine Software zu installieren. Kein
            tägliches Überwachen.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[42px] text-gold leading-none">
                  {s.n}
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>
              <h3 className="font-serif text-[22px] text-navy">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-secondary">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center font-serif text-lg italic text-navy">
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
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Vergleich</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            aktienpost.ch vs. typische <span className="italic">Bank</span>.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-line bg-white">
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
      name: "Premium",
      monthly: "149",
      yearly: "1'490",
      features: [
        "Alles aus Plus",
        "Quartals-Markteinschätzung",
        "Prioritäts-Support per E-Mail",
        "Experimentelle Strategien",
      ],
      cta: "Premium wählen",
      featured: false,
    },
  ];

  return (
    <section id="preise" className="border-b border-line">
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Preise</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            Transparent. Fair.{" "}
            <span className="italic">Ohne versteckte Kosten.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Jahresabo: 2 Monate gratis. 30 Tage Geld-zurück-Garantie auf
            jedem Plan.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-xl border bg-white p-8 ${
                p.featured
                  ? "border-gold shadow-[0_8px_40px_-8px_rgba(197,151,62,0.35)]"
                  : "border-line"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gold bg-gold px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  Empfohlen
                </span>
              )}
              <div>
                <h3 className="font-serif text-[28px] text-navy">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-serif text-[40px] text-navy">
                    CHF {p.monthly}
                  </span>
                  <span className="text-sm text-secondary">/ Monat</span>
                </div>
                <div className="mt-1 text-sm text-secondary">
                  Oder CHF {p.yearly} / Jahr
                </div>
              </div>

              <ul className="mt-8 flex flex-col gap-3 text-sm">
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

              <div className="mt-10 flex flex-col gap-3">
                <a
                  href="#signup"
                  className={
                    p.featured
                      ? "inline-flex items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
                      : "inline-flex items-center justify-center rounded-md border border-navy/20 bg-transparent px-5 py-3 text-sm font-medium text-navy transition-colors hover:border-navy hover:bg-navy/5"
                  }
                >
                  {p.cta}
                </a>
                <span className="text-center text-xs text-muted">
                  30 Tage Geld-zurück-Garantie
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
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Häufige Fragen</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            Was Sie <span className="italic">wissen sollten</span>.
          </h2>
        </div>
        <div className="mx-auto mt-14 max-w-3xl">
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
      <div className="container py-20 text-center lg:py-28">
        <h2 className="mx-auto max-w-3xl font-serif text-[36px] leading-tight text-cream sm:text-[48px]">
          Probieren Sie es aus — ohne{" "}
          <span className="italic text-gold">Risiko</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
          30 Tage Geld-zurück-Garantie. Kein Risiko. Kündigung jederzeit
          möglich.
        </p>
        <div className="mt-10">
          <a
            href="#preise"
            className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-4 text-[15px] font-medium text-white transition-colors hover:bg-gold-dark"
          >
            Jetzt starten — ab CHF 49 / Monat
          </a>
        </div>
      </div>
    </section>
  );
}

