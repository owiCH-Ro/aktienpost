/** "So kombinieren Sie die Strategien" — lives between the tabbed
 * strategy section and the pricing block on the landing page. Three
 * example allocations (Einsteiger / Ausgewogen / Diversifiziert)
 * with a small horizontal stacked bar showing the mix. */

// Palette for the allocation bars — one colour per strategy bucket so
// the legend dots line up with each card's segment colours.
const SEGMENT_COLOR = {
  defensiv: "#1a2e4a",    // navy
  breakout: "#c5973e",    // gold
  international: "#8f3a2a", // redbrown (US Tech / Europa bucket)
} as const;

type SegmentKey = keyof typeof SEGMENT_COLOR;

interface AllocationSegment {
  key: SegmentKey;
  label: string;
  pct: number;
}

interface PortfolioCard {
  name: string;
  description: string;
  bullets: string[];
  minCapital: string;
  allocation: AllocationSegment[];
}

const CARDS: PortfolioCard[] = [
  {
    name: "Einsteiger — Schweiz-Fokus",
    description: "Für Anleger, die ruhig schlafen wollen.",
    bullets: [
      "SPI Defensiv als Kern (stabiler Vermögensaufbau)",
      "Aufwand: 4 Anpassungen pro Jahr",
    ],
    minCapital: "Geeignet ab CHF 50'000",
    allocation: [{ key: "defensiv", label: "SPI Defensiv", pct: 100 }],
  },
  {
    name: "Ausgewogen — Schweiz + Wachstum",
    description:
      "Verbindet Stabilität mit Wachstumschancen im Schweizer Markt.",
    bullets: [
      "SPI Defensiv als Basis (60%)",
      "SPI Breakout als Satellit (40%)",
    ],
    minCapital: "Geeignet ab CHF 100'000",
    allocation: [
      { key: "defensiv", label: "SPI Defensiv", pct: 60 },
      { key: "breakout", label: "SPI Breakout", pct: 40 },
    ],
  },
  {
    name: "Diversifiziert — International",
    description: "Maximale Diversifikation über 3 Märkte.",
    bullets: [
      "SPI Defensiv als Kern (40%)",
      "SPI Breakout (20%)",
      "US Tech Growth oder Europa Breakout (40%)",
    ],
    minCapital: "Geeignet ab CHF 150'000",
    allocation: [
      { key: "defensiv", label: "SPI Defensiv", pct: 40 },
      { key: "breakout", label: "SPI Breakout", pct: 20 },
      { key: "international", label: "International", pct: 40 },
    ],
  },
];

export function PortfolioCombinations() {
  return (
    <section className="border-b border-line bg-cream-dark/40">
      <div className="container py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Portfolio-Bausteine</span>
          <h2 className="mt-6 font-serif text-[34px] leading-tight text-navy sm:text-[44px]">
            So <span className="italic">kombinieren Sie</span> die Strategien.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Jede Strategie funktioniert allein. Zusammen bilden sie ein
            diversifiziertes Portfolio.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.name}
              className="flex flex-col rounded-xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <h3 className="font-serif text-[22px] leading-tight text-navy">
                {card.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-secondary">
                {card.description}
              </p>

              <AllocationBar segments={card.allocation} />

              <ul className="mt-6 flex flex-col gap-2">
                {card.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[13.5px] leading-relaxed text-ink/85"
                  >
                    <span
                      className="mt-[8px] h-[5px] w-[5px] flex-none rounded-full bg-gold"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-4 text-[11px] uppercase tracking-[0.18em] text-muted">
                  {card.minCapital}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-[13px] leading-relaxed text-muted">
          Diese Beispiele dienen der Illustration. Die optimale Aufteilung
          hängt von Ihrer persönlichen Situation, Risikobereitschaft und
          Ihrem Anlagehorizont ab.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Allocation bar — horizontal stacked segments with a small legend below.
// ---------------------------------------------------------------------------

function AllocationBar({ segments }: { segments: AllocationSegment[] }) {
  return (
    <div className="mt-6">
      <div className="flex h-[10px] overflow-hidden rounded-full bg-cream-dark/60">
        {segments.map((seg) => (
          <div
            key={seg.key}
            style={{
              width: `${seg.pct}%`,
              backgroundColor: SEGMENT_COLOR[seg.key],
            }}
            aria-label={`${seg.label} ${seg.pct}%`}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-secondary">
        {segments.map((seg) => (
          <li key={seg.key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-[8px] w-[8px] rounded-sm"
              style={{ backgroundColor: SEGMENT_COLOR[seg.key] }}
              aria-hidden
            />
            <span className="tabular-nums font-medium text-ink/80">
              {seg.pct}%
            </span>
            <span className="text-muted">{seg.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
