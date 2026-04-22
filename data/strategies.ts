/** Central strategy data — shared between the landing page and the
 * /strategien/[slug] detail pages. Keeping everything in one module
 * means the numbers printed on cards always match the numbers on the
 * detail pages, and there's one place to update when the live
 * backtest refreshes. */

export type PerformanceRow = {
  period: string;
  strat: { return: string; pa: string; maxDd: string };
  bench: { return: string; pa: string; maxDd: string };
};

export type KeyFacts = {
  markt: string;
  typ: "Offensiv" | "Defensiv";
  positionen: string;
  rebalancing: string;
  trades: string;
  benchmark: string;
  backtest: string;
};

export type Strategy = {
  slug: string;
  name: string;
  tagline: string; // e.g. "Schweiz, Offensiv"
  /** Short all-caps subtitle shown in the tabbed section, e.g. "DAX + MDAX IM TREND". */
  subtitle: string;
  /** One-line bold claim for the highlight box in the tabbed section. */
  highlight: string;

  // Landing page fields
  pa: string;
  total: string;
  benchLabel: string;
  benchTotal: string;
  maxDd: string;
  benchDd: string;
  shortDescription: string;

  // Detail page fields
  detailHeadline: string;
  longDescription: string[];
  kernaussagen: string[];
  /** Header metric: trades per year. */
  tradesPerYear: string;
  /** Optional note rendered under the performance table. */
  performanceNote?: string;
  performanceTable: PerformanceRow[];
  keyFacts: KeyFacts;
  // Real equity curves live in data/chart_data.json, keyed by slug, and
  // are loaded by the chart + sparkline components directly. Keeping
  // them out of this module means the strategy metadata file stays
  // readable.
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const STRATEGIES: Strategy[] = [
  {
    slug: "spi-breakout",
    name: "SPI Breakout",
    tagline: "Schweiz, Offensiv",
    subtitle: "Schweizer Aktien im Trend",
    highlight: "Über 3× so viel Rendite wie der SPI: +350% vs +108%",
    pa: "15.7% p.a.",
    total: "+350%",
    benchLabel: "SPI",
    benchTotal: "+108%",
    maxDd: "-18.6%",
    benchDd: "-26.9%",
    shortDescription:
      "Für Anleger, die den Schweizer Markt aktiv, aber diszipliniert begleiten wollen.",
    detailHeadline: "SPI Breakout — Schweizer Aktien systematisch handeln",
    longDescription: [
      "Der Swiss Performance Index umfasst nahezu alle kotierten Schweizer Aktiengesellschaften. Unsere Strategie durchleuchtet dieses Universum täglich und sucht nach Aktien, die eine ungewöhnliche Stärke zeigen — einen sogenannten Breakout.",
      "Ein Breakout entsteht, wenn eine Aktie nach einer Phase der Seitwärtsbewegung plötzlich mit Kraft nach oben ausbricht. Solche Bewegungen sind oft der Beginn eines neuen Aufwärtstrends und bieten ein attraktives Chance-Risiko-Verhältnis.",
      "Die Strategie investiert in maximal 7 Positionen gleichzeitig. Jede Position ist mit einem automatischen Verlustlimit geschützt: Fällt eine Aktie um mehr als 15% unter den Kaufpreis, wird sie verkauft — ohne Wenn und Aber. Umgekehrt lässt die Strategie Gewinner laufen, bis ein Verkaufssignal kommt.",
      "Im Durchschnitt werden pro Jahr etwa 10 Handelssignale generiert — also etwa alle 5 Wochen eine Aktion. Das ist kein hektisches Day-Trading, sondern diszipliniertes Investieren mit klaren Regeln.",
    ],
    kernaussagen: [
      "In 10 Jahren mehr als 3x so viel Rendite wie der SPI — bei einem geringeren maximalen Rückgang (-19% statt -27%).",
      "Im Schnitt alle 5 Wochen ein Signal. Kein tägliches Trading.",
      "Auch eine negative YTD-Phase gehört dazu. Was zählt, ist das langfristige Bild.",
    ],
    tradesPerYear: "~10",
    performanceTable: [
      { period: "YTD", strat: { return: "-2.5%", pa: "-8.6%", maxDd: "-7.6%" }, bench: { return: "+3.1%", pa: "+11.7%", maxDd: "-10.9%" } },
      { period: "1 Jahr", strat: { return: "+39.8%", pa: "+29.8%", maxDd: "-8.9%" }, bench: { return: "+20.8%", pa: "+15.9%", maxDd: "-15.9%" } },
      { period: "2 Jahre", strat: { return: "+71.7%", pa: "+26.7%", maxDd: "-14.4%" }, bench: { return: "+28.7%", pa: "+11.7%", maxDd: "-15.9%" } },
      { period: "5 Jahre", strat: { return: "+102.8%", pa: "+14.3%", maxDd: "-19.4%" }, bench: { return: "+39.4%", pa: "+6.5%", maxDd: "-21.5%" } },
      { period: "10 Jahre", strat: { return: "+349.6%", pa: "+15.7%", maxDd: "-18.6%" }, bench: { return: "+107.9%", pa: "+7.4%", maxDd: "-26.9%" } },
    ],
    keyFacts: {
      markt: "Swiss Performance Index (SPI)",
      typ: "Offensiv",
      positionen: "max. 7",
      rebalancing: "Signal-basiert",
      trades: "ca. 10 / Jahr",
      benchmark: "SPI Total Return",
      backtest: "2016 – 2026",
    },
  },

  {
    slug: "spi-defensiv",
    name: "SPI Defensiv",
    tagline: "Schweiz, Defensiv",
    subtitle: "Schweiz mit Schutzfilter",
    highlight: "Tiefster Rückgang aller Strategien: nur −6.8%",
    pa: "11.5% p.a.",
    total: "+207%",
    benchLabel: "60/40",
    benchTotal: "+68%",
    maxDd: "-6.8%",
    benchDd: "-17%",
    shortDescription:
      "Für vorsichtigere Anleger mit Fokus auf kleinere Rückschläge und ruhigeres Investieren.",
    detailHeadline: "SPI Defensiv — Ruhig investieren, gut schlafen",
    longDescription: [
      "Nicht jeder Anleger sucht die maximale Rendite. Viele möchten vor allem eines: Ruhig schlafen können. Genau dafür haben wir die SPI Defensiv Strategie entwickelt.",
      "Das Prinzip ist einfach: Aus dem gesamten Schweizer Aktienmarkt — inklusive der soliden Kantonalbanken — wählen wir quartalsweise die 7 Aktien aus, die zwei Eigenschaften vereinen: geringe Kursschwankung (tiefe Volatilität) und einen positiven Trend (Aufwärtsmomentum). Das sind typischerweise Kantonalbanken, Immobilien-Gesellschaften und etablierte Industrieunternehmen — die „langweiligen“ Titel, die still und stetig steigen.",
      "Zusätzlich überwacht ein globaler Schutzfilter den Weltaktienmarkt. Rutscht der globale Trend ins Negative, wird das gesamte Portfolio in Cash umgeschichtet — automatisch und ohne Zögern. In den letzten 10 Jahren wurde dieser Schutz nur 5 Mal ausgelöst (unter anderem zu Beginn der Corona-Krise und beim Zinsanstieg 2022). Sobald der globale Trend wieder dreht, wird frisch investiert.",
      "Das Ergebnis: +207% Rendite in 10 Jahren bei einem maximalen Rückgang von nur -6.8%. Zum Vergleich: Ein klassisches 60/40-Portfolio — die „ausgewogene“ Strategie, die Ihnen Ihre Bank anbietet — hätte im selben Zeitraum nur rund +68% erzielt, bei einem Rückgang von -17%.",
    ],
    kernaussagen: [
      "Der tiefste maximale Rückgang aller Strategien: nur -6.8%.",
      "Dreimal so viel Rendite wie ein 60/40-Portfolio Ihrer Bank.",
      "Nur 4 Anpassungen pro Jahr — weniger als 1 Stunde Aufwand total.",
      "Ideal als Basis-Baustein eines Portfolios, kombinierbar mit offensiveren Strategien.",
      "Kantonalbanken und Immobilien-Aktien als stabiler Kern.",
    ],
    tradesPerYear: "~10",
    performanceNote:
      "Fairer Vergleich: Als defensive Strategie mit nur -6.8% maximalem Rückgang ist der relevante Vergleich ein klassisches 60/40-Portfolio (ca. +68% Rendite, ca. -17% Max. Rückgang) — die sogenannte „ausgewogene“ Strategie, wie sie Schweizer Banken anbieten. SPI Defensiv bietet dreimal so viel Rendite bei einem Drittel des Risikos.",
    performanceTable: [
      { period: "YTD", strat: { return: "+12.3%", pa: "+51.4%", maxDd: "-1.3%" }, bench: { return: "+3.1%", pa: "+11.7%", maxDd: "-10.9%" } },
      { period: "1 Jahr", strat: { return: "+39.4%", pa: "+29.5%", maxDd: "-1.3%" }, bench: { return: "+20.8%", pa: "+15.9%", maxDd: "-15.9%" } },
      { period: "2 Jahre", strat: { return: "+63.8%", pa: "+24.1%", maxDd: "-1.4%" }, bench: { return: "+28.7%", pa: "+11.7%", maxDd: "-15.9%" } },
      { period: "5 Jahre", strat: { return: "+76.2%", pa: "+11.3%", maxDd: "-5.8%" }, bench: { return: "+39.4%", pa: "+6.5%", maxDd: "-21.5%" } },
      { period: "10 Jahre", strat: { return: "+206.7%", pa: "+11.5%", maxDd: "-6.8%" }, bench: { return: "+107.9%", pa: "+7.4%", maxDd: "-26.9%" } },
    ],
    keyFacts: {
      markt: "SPI inkl. Kantonalbanken",
      typ: "Defensiv",
      positionen: "7 (quartalsweises Rebalancing)",
      rebalancing: "Quartalsweise",
      trades: "ca. 10 / Jahr",
      benchmark: "60/40-Portfolio",
      backtest: "2016 – 2026",
    },
  },

  {
    slug: "us-tech-growth",
    name: "US Tech Growth",
    tagline: "Nasdaq 100, Offensiv",
    subtitle: "Nasdaq 100 Growth",
    highlight: "Renditestärkste Strategie: +859% in 10 Jahren",
    pa: "24.8% p.a.",
    total: "+859%",
    benchLabel: "Nasdaq",
    benchTotal: "+571%",
    maxDd: "-30.8%",
    benchDd: "-35.6%",
    shortDescription:
      "Für Anleger, die Wachstum suchen, aber nicht jedem Trend blind hinterherlaufen wollen.",
    detailHeadline:
      "US Tech Growth — Das Wachstum der Tech-Giganten einfangen",
    longDescription: [
      "Der Nasdaq 100 vereint die 100 grössten Technologieunternehmen der Welt: Apple, Microsoft, Nvidia, Amazon, Meta und viele mehr. Diese Unternehmen haben in den letzten Jahrzehnten enorme Werte geschaffen — aber der Weg war nicht immer glatt.",
      "Unsere US Tech Growth Strategie sucht gezielt nach Technologie-Aktien, die aus einer Konsolidierungsphase mit Kraft nach oben ausbrechen. Ein Marktfilter stellt sicher, dass nur in Aufwärtsphasen investiert wird: Befindet sich der Nasdaq 100 im Abwärtstrend, werden keine neuen Positionen eröffnet.",
      "Zusätzlich verfügt die Strategie über einen Schutzmechanismus für besonders starke Rallye-Phasen: Steigt das Portfolio schnell und stark an (wie während der KI-Rallye 2024), werden die Gewinne mit einem nachlaufenden Schutz gesichert. So werden Gewinne nicht zu früh realisiert, aber ein grösserer Rückfall wird begrenzt.",
      "Das Ergebnis: +859% in 10 Jahren. Der Nasdaq 100 selbst legte im selben Zeitraum +571% zu. Der maximale Rückgang war mit -31% deutlich geringer als beim Index (-36%).",
    ],
    kernaussagen: [
      "Die renditestärkste Strategie: +859% in 10 Jahren.",
      "Schlägt den Nasdaq 100 um fast 300 Prozentpunkte.",
      "Geeignet für Anleger mit höherer Risikotoleranz und einem Anlagehorizont von mindestens 5 Jahren.",
    ],
    tradesPerYear: "~12",
    performanceTable: [
      { period: "YTD", strat: { return: "+2.1%", pa: "+12.3%", maxDd: "-2.7%" }, bench: { return: "+5.8%", pa: "+36.4%", maxDd: "-9.4%" } },
      { period: "1 Jahr", strat: { return: "+27.5%", pa: "+22.7%", maxDd: "-12.8%" }, bench: { return: "+23.7%", pa: "+19.6%", maxDd: "-22.9%" } },
      { period: "2 Jahre", strat: { return: "+41.1%", pa: "+17.0%", maxDd: "-30.4%" }, bench: { return: "+49.7%", pa: "+20.2%", maxDd: "-22.9%" } },
      { period: "5 Jahre", strat: { return: "+73.6%", pa: "+11.2%", maxDd: "-26.3%" }, bench: { return: "+94.1%", pa: "+13.6%", maxDd: "-35.6%" } },
      { period: "10 Jahre", strat: { return: "+858.5%", pa: "+24.8%", maxDd: "-30.8%" }, bench: { return: "+571.0%", pa: "+20.6%", maxDd: "-35.6%" } },
    ],
    keyFacts: {
      markt: "Nasdaq 100",
      typ: "Offensiv",
      positionen: "max. 5",
      rebalancing: "Signal-basiert",
      trades: "ca. 12 / Jahr",
      benchmark: "Nasdaq 100 Total Return",
      backtest: "2016 – 2026",
    },
  },

  {
    slug: "europa-breakout",
    name: "Europa Breakout",
    tagline: "HDAX, Offensiv",
    subtitle: "DAX + MDAX im Trend",
    highlight: "Grösste Outperformance: +730% vs +161%",
    pa: "23.1% p.a.",
    total: "+730%",
    benchLabel: "HDAX",
    benchTotal: "+161%",
    maxDd: "-25.4%",
    benchDd: "-38.8%",
    shortDescription:
      "Für breit interessierte Anleger mit Blick auf Chancen jenseits der Schweiz.",
    detailHeadline:
      "Europa Breakout — Die stärksten deutschen Aktien systematisch handeln",
    longDescription: [
      "Der deutsche Aktienmarkt bietet ein breites Universum an Qualitätsunternehmen — von den DAX-Schwergewichten wie SAP und Siemens bis zu den innovativen Mittelständlern im MDAX. Unsere Europa Breakout Strategie durchleuchtet täglich alle 90 Titel und identifiziert die stärksten Ausbruchsbewegungen.",
      "Ein Marktfilter achtet auf den übergeordneten Trend des deutschen Aktienmarktes. Befindet sich der Markt im Abwärtstrend, werden keine neuen Positionen eröffnet — so werden Verluste in schwierigen Marktphasen deutlich reduziert.",
      "Das Ergebnis ist beeindruckend: +730% in 10 Jahren, während der HDAX-Index nur +161% erzielte. Das entspricht einer 4.5-fachen Outperformance. Gleichzeitig war der maximale Rückgang mit -25% deutlich geringer als beim Index (-39%).",
    ],
    kernaussagen: [
      "4.5x mehr Rendite als der Index — die höchste Outperformance aller Strategien.",
      "Maximaler Rückgang -25% vs. -39% beim Index.",
      "Nur ca. 8 Trades pro Jahr — etwa alle 6 Wochen.",
    ],
    tradesPerYear: "~8",
    performanceTable: [
      { period: "YTD", strat: { return: "+1.4%", pa: "+7.4%", maxDd: "-15.5%" }, bench: { return: "-1.9%", pa: "-9.6%", maxDd: "-11.8%" } },
      { period: "1 Jahr", strat: { return: "+30.0%", pa: "+24.5%", maxDd: "-17.0%" }, bench: { return: "+12.8%", pa: "+10.6%", maxDd: "-16.0%" } },
      { period: "2 Jahre", strat: { return: "+58.9%", pa: "+23.3%", maxDd: "-21.8%" }, bench: { return: "+42.9%", pa: "+17.5%", maxDd: "-16.0%" } },
      { period: "5 Jahre", strat: { return: "+186.0%", pa: "+22.5%", maxDd: "-18.2%" }, bench: { return: "+72.5%", pa: "+11.1%", maxDd: "-26.4%" } },
      { period: "10 Jahre", strat: { return: "+730.1%", pa: "+23.1%", maxDd: "-25.4%" }, bench: { return: "+161.1%", pa: "+9.9%", maxDd: "-38.8%" } },
    ],
    keyFacts: {
      markt: "HDAX (DAX 40 + MDAX 50)",
      typ: "Offensiv",
      positionen: "max. 5",
      rebalancing: "Signal-basiert",
      trades: "ca. 8 / Jahr",
      benchmark: "HDAX Total Return",
      backtest: "2016 – 2026",
    },
  },
];

export function getStrategyBySlug(slug: string): Strategy | undefined {
  return STRATEGIES.find((s) => s.slug === slug);
}
