import { Faq } from "@/components/faq";
import { HeroChart } from "@/components/hero-chart";
import { Nav } from "@/components/nav";
import { Sparkline } from "@/components/sparkline";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type Strategy = {
  slug: string;
  name: string;
  pa: string;
  total: string;
  benchLabel: string;
  benchTotal: string;
  maxDd: string;
  benchDd: string;
  description: string;
  /** Simplified 10-year equity curve for the decorative sparkline. */
  sparkline: number[];
};

const STRATEGIES: Strategy[] = [
  {
    slug: "spi-breakout",
    name: "SPI Breakout",
    pa: "15.7% p.a.",
    total: "+350%",
    benchLabel: "SPI",
    benchTotal: "+108%",
    maxDd: "-18.6%",
    benchDd: "-26.9%",
    description:
      "Für Anleger, die den Schweizer Markt aktiv, aber diszipliniert begleiten wollen.",
    sparkline: [100, 120, 155, 165, 205, 180, 235, 268, 255, 272, 340, 450],
  },
  {
    slug: "spi-defensiv",
    name: "SPI Defensiv",
    pa: "10.9% p.a.",
    total: "+190%",
    benchLabel: "60/40",
    benchTotal: "+68%",
    maxDd: "-10.8%",
    benchDd: "-17%",
    description:
      "Für vorsichtigere Anleger mit Fokus auf kleinere Rückschläge und ruhigeres Investieren.",
    sparkline: [100, 110, 130, 140, 155, 150, 175, 195, 190, 200, 240, 290],
  },
  {
    slug: "us-tech",
    name: "US Tech Growth",
    pa: "24.8% p.a.",
    total: "+859%",
    benchLabel: "Nasdaq",
    benchTotal: "+571%",
    maxDd: "-30.8%",
    benchDd: "-35.6%",
    description:
      "Für Anleger, die Wachstum suchen, aber nicht jedem Trend blind hinterherlaufen wollen.",
    sparkline: [100, 150, 200, 170, 280, 350, 420, 380, 350, 450, 650, 960],
  },
  {
    slug: "europa-breakout",
    name: "Europa Breakout",
    pa: "23.1% p.a.",
    total: "+730%",
    benchLabel: "HDAX",
    benchTotal: "+161%",
    maxDd: "-25.4%",
    benchDd: "-38.8%",
    description:
      "Für breit interessierte Anleger mit Blick auf Chancen jenseits der Schweiz.",
    sparkline: [100, 140, 180, 165, 220, 200, 280, 320, 300, 380, 550, 830],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      <Hero />
      <MetricsBar />
      <Strategies />
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
    { value: "+350%", label: "in 10 Jahren (SPI Breakout)" },
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
// Section: Strategies (editorial cards)
// ---------------------------------------------------------------------------

function Strategies() {
  return (
    <section id="strategien" className="border-b border-line">
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Strategien</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            Vier Strategien für vier <span className="italic">Anlegertypen</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Jede Strategie folgt einem klar definierten Regelwerk — keine
            Diskretion, keine Bauchentscheidungen. Zehn Jahre Backtest
            belegen die Funktionsweise.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {STRATEGIES.map((s) => (
            <article
              key={s.slug}
              className="grid grid-cols-1 gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-gold/50 md:grid-cols-[200px_1fr_auto] md:items-center md:gap-8 md:p-8"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-secondary">
                  Historischer Backtest
                </span>
                <span className="font-serif text-[28px] leading-tight text-navy">
                  {s.name}
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-secondary md:max-w-xl">
                {s.description}
              </p>
              <div className="text-left md:text-right">
                <span className="font-serif text-[30px] text-redbrown">
                  {s.pa}
                </span>
              </div>
            </article>
          ))}
        </div>
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
          {STRATEGIES.map((s) => (
            <article
              key={s.slug}
              className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-serif text-[24px] text-navy">{s.name}</h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-secondary">
                  10 Jahre
                </span>
              </div>

              <div className="mt-6">
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

              <div className="mt-6 flex items-end justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-secondary">
                  {s.pa}
                </span>
                <Sparkline data={s.sparkline} className="h-10 w-28" />
              </div>
            </article>
          ))}
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
      body: "Nach Börsenschluss analysiert unser System die Märkte und liefert konkrete Kauf- oder Verkaufssignale per E-Mail — mit Ticker, Preis und Stop-Loss.",
    },
    {
      n: "02",
      title: "Handel ausführen",
      body: "Sie setzen das Signal in Ihrem Depot um — bei der Bank Ihrer Wahl. Rund fünf Minuten pro Signal. Keine Software-Installation, keine API-Anbindung.",
    },
    {
      n: "03",
      title: "Zurücklehnen",
      body: "Der Algorithmus überwacht die Position täglich. Bei Verkaufssignal oder Stop-Loss werden Sie informiert — disziplinierter als jede Bauchentscheidung.",
    },
  ];
  return (
    <section className="border-b border-line">
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">So funktioniert es</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            Drei Schritte. <span className="italic">Mehr nicht.</span>
          </h2>
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
      label: "Kosten",
      us: "Ab CHF 49 / Monat",
      bank: "1.0 – 1.5% p.a. auf Depotvolumen",
    },
    {
      label: "Rendite",
      us: "Historisch +15 bis +25% p.a.",
      bank: "Meist unter Benchmark-Index",
    },
    {
      label: "Aufwand",
      us: "5 Minuten pro Signal",
      bank: "Jahresgespräch, Telefonate",
    },
    {
      label: "Transparenz",
      us: "Jedes Signal regelbasiert dokumentiert",
      bank: "Discretionary, kaum nachvollziehbar",
    },
    {
      label: "Mindestanlage",
      us: "Keine",
      bank: "Typisch ab CHF 250'000",
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

// ---------------------------------------------------------------------------
// Section: Footer
// ---------------------------------------------------------------------------

function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="container grid gap-12 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-serif">
            <span className="grid h-6 w-6 place-items-center rounded-sm bg-navy text-cream">
              <span className="block text-sm leading-none font-bold">+</span>
            </span>
            <span className="text-lg font-semibold text-navy">
              aktienpost<span className="text-gold">.</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary">
            Börsensignale für Schweizer Privatanleger. Wissenschaftlich
            getestet, einfach umzusetzen.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted">
            Service
          </h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/80">
            <li>
              <a className="hover:text-navy" href="#strategien">
                Strategien
              </a>
            </li>
            <li>
              <a className="hover:text-navy" href="#performance">
                Performance
              </a>
            </li>
            <li>
              <a className="hover:text-navy" href="#preise">
                Preise
              </a>
            </li>
            <li>
              <a className="hover:text-navy" href="#blog">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted">
            Rechtliches
          </h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/80">
            <li>
              <a className="hover:text-navy" href="/impressum">
                Impressum
              </a>
            </li>
            <li>
              <a className="hover:text-navy" href="/datenschutz">
                Datenschutz
              </a>
            </li>
            <li>
              <a className="hover:text-navy" href="/agb">
                AGB
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-8 text-xs leading-relaxed text-muted md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">
            aktienpost.ch ist keine Anlageberatung. Die bereitgestellten
            Informationen dienen ausschliesslich der allgemeinen Information
            und stellen weder eine Empfehlung noch ein Angebot zum Kauf oder
            Verkauf von Finanzinstrumenten dar. Vergangene Wertentwicklung ist
            kein verlässlicher Indikator für zukünftige Ergebnisse.
            Investitionen an den Finanzmärkten bergen Verlustrisiken, bis hin
            zum Totalverlust des eingesetzten Kapitals.
          </p>
          <p className="md:text-right">
            © {new Date().getFullYear()} aktienpost.ch
          </p>
        </div>
      </div>
    </footer>
  );
}
