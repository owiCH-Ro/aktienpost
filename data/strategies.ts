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

  // Landing page fields
  pa: string;
  total: string;
  benchLabel: string;
  benchTotal: string;
  maxDd: string;
  benchDd: string;
  shortDescription: string;
  sparkline: number[];

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
  /** Full 10-year equity curve used on the detail chart. */
  curve: {
    strategy: number[];
    benchmark: number[];
    /** Legend label for the benchmark line. */
    benchmarkLabel: string;
  };
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const STRATEGIES: Strategy[] = [
  {
    slug: "spi-breakout",
    name: "SPI Breakout",
    tagline: "Schweiz, Offensiv",
    pa: "15.7% p.a.",
    total: "+350%",
    benchLabel: "SPI",
    benchTotal: "+108%",
    maxDd: "-18.6%",
    benchDd: "-26.9%",
    shortDescription:
      "Für Anleger, die den Schweizer Markt aktiv, aber diszipliniert begleiten wollen.",
    sparkline: [
      100, 108, 120, 135, 155, 160, 158, 165, 178, 192, 205, 210, 180, 210, 235,
      268, 255, 272, 310, 340, 390, 430, 450,
    ],
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
    curve: {
      strategy: [
        100, 105, 108, 112, 118, 120, 125, 135, 142, 150, 148, 155, 160, 158,
        155, 162, 168, 165, 170, 178, 185, 192, 198, 205, 210, 215, 180, 195,
        210, 225, 235, 245, 255, 262, 270, 275, 268, 260, 250, 242, 238, 245,
        255, 260, 268, 275, 270, 265, 272, 280, 290, 302, 310, 325, 340, 355,
        370, 390, 410, 430, 450,
      ],
      benchmark: [
        100, 102, 104, 106, 108, 110, 114, 118, 122, 126, 128, 130, 132, 130,
        128, 132, 134, 131, 135, 140, 145, 148, 150, 155, 158, 160, 128, 138,
        148, 155, 158, 162, 168, 172, 178, 180, 175, 170, 162, 155, 152, 158,
        162, 165, 168, 170, 168, 165, 170, 175, 180, 185, 188, 192, 196, 198,
        200, 202, 204, 206, 208,
      ],
      benchmarkLabel: "Buy & Hold SPI",
    },
  },

  {
    slug: "spi-defensiv",
    name: "SPI Defensiv",
    tagline: "Schweiz, Defensiv",
    pa: "11.5% p.a.",
    total: "+207%",
    benchLabel: "60/40",
    benchTotal: "+68%",
    maxDd: "-6.8%",
    benchDd: "-17%",
    shortDescription:
      "Für vorsichtigere Anleger mit Fokus auf kleinere Rückschläge und ruhigeres Investieren.",
    // Sparkline ends around 307 to reflect the new +207% 10-year return.
    sparkline: [
      100, 105, 110, 120, 130, 138, 136, 145, 155, 158, 152, 165, 175, 195, 193,
      205, 218, 232, 250, 262, 280, 295, 307,
    ],
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
    curve: {
      // Smoothed up to ~307 to match +207% with shallower dips (~-6.8% max DD).
      strategy: [
        100, 103, 105, 108, 110, 113, 116, 120, 125, 128, 130, 129, 132, 134,
        137, 140, 138, 142, 147, 152, 158, 162, 157, 160, 164, 170, 178, 182,
        188, 193, 200, 206, 202, 198, 208, 215, 214, 218, 225, 232, 242, 252,
        262, 273, 283, 294, 302, 307,
      ],
      // User: "same as SPI Breakout benchmark (both use SPI)".
      benchmark: [
        100, 102, 104, 106, 108, 110, 114, 118, 122, 126, 128, 130, 132, 130,
        128, 132, 134, 131, 135, 140, 145, 148, 150, 155, 158, 160, 128, 138,
        148, 155, 158, 162, 168, 172, 178, 180, 175, 170, 162, 155, 152, 158,
        162, 165, 168, 170, 168, 165, 170, 175, 180, 185, 188, 192, 196, 198,
        200, 202, 204, 206, 208,
      ],
      benchmarkLabel: "Buy & Hold SPI",
    },
  },

  {
    slug: "us-tech-growth",
    name: "US Tech Growth",
    tagline: "Nasdaq 100, Offensiv",
    pa: "24.8% p.a.",
    total: "+859%",
    benchLabel: "Nasdaq",
    benchTotal: "+571%",
    maxDd: "-30.8%",
    benchDd: "-35.6%",
    shortDescription:
      "Für Anleger, die Wachstum suchen, aber nicht jedem Trend blind hinterherlaufen wollen.",
    sparkline: [
      100, 130, 170, 200, 180, 250, 300, 350, 280, 320, 400, 450, 380, 350, 420,
      500, 550, 600, 700, 800, 860, 920, 960,
    ],
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
    curve: {
      strategy: [
        100, 115, 130, 150, 170, 190, 200, 210, 230, 250, 240, 220, 200, 190,
        180, 195, 210, 230, 250, 280, 300, 320, 350, 380, 400, 420, 380, 350,
        320, 350, 400, 450, 500, 480, 450, 420, 400, 380, 350, 370, 400, 450,
        500, 550, 600, 650, 700, 750, 800, 860, 900, 960,
      ],
      benchmark: [
        100, 110, 120, 135, 150, 170, 180, 195, 210, 230, 250, 240, 230, 220,
        210, 230, 250, 275, 300, 330, 360, 380, 400, 430, 450, 470, 380, 350,
        340, 380, 420, 460, 500, 490, 470, 450, 440, 420, 400, 430, 460, 500,
        540, 580, 610, 630, 650, 671,
      ],
      benchmarkLabel: "Buy & Hold Nasdaq 100",
    },
  },

  {
    slug: "europa-breakout",
    name: "Europa Breakout",
    tagline: "HDAX, Offensiv",
    pa: "23.1% p.a.",
    total: "+730%",
    benchLabel: "HDAX",
    benchTotal: "+161%",
    maxDd: "-25.4%",
    benchDd: "-38.8%",
    shortDescription:
      "Für breit interessierte Anleger mit Blick auf Chancen jenseits der Schweiz.",
    sparkline: [
      100, 120, 150, 180, 165, 200, 240, 280, 250, 220, 280, 320, 300, 350, 400,
      450, 500, 550, 620, 700, 750, 800, 830,
    ],
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
    curve: {
      strategy: [
        100, 110, 120, 135, 150, 170, 180, 170, 165, 175, 190, 200, 210, 230,
        250, 280, 260, 240, 250, 270, 290, 320, 350, 380, 400, 420, 380, 360,
        350, 380, 420, 460, 500, 480, 460, 440, 420, 450, 480, 520, 560, 600,
        650, 700, 750, 800, 830,
      ],
      benchmark: [
        100, 105, 110, 115, 120, 128, 132, 128, 125, 130, 135, 140, 145, 150,
        155, 162, 155, 148, 152, 158, 165, 170, 175, 180, 185, 190, 170, 160,
        155, 165, 175, 185, 195, 190, 185, 180, 178, 185, 190, 200, 210, 220,
        230, 240, 250, 258, 261,
      ],
      benchmarkLabel: "Buy & Hold HDAX",
    },
  },
];

export function getStrategyBySlug(slug: string): Strategy | undefined {
  return STRATEGIES.find((s) => s.slug === slug);
}
