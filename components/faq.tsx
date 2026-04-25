"use client";

import { useState } from "react";

interface Item {
  q: string;
  a: string;
}

const ITEMS: Item[] = [
  {
    q: "Brauche ich Börsenwissen?",
    a: "Nein. Sie müssen lediglich wissen, wie Sie bei Ihrer Bank eine Aktie kaufen oder verkaufen. Unsere Signale sagen Ihnen genau, welche Aktie und wann. Alles andere übernimmt der Algorithmus.",
  },
  {
    q: "Wie oft muss ich handeln?",
    a: "Je nach Strategie zwischen 8 und 12 Mal pro Jahr — also etwa alle 4 bis 6 Wochen. Pro Signal rechnen Sie mit rund 5 Minuten für die Order-Eingabe bei Ihrer Bank. Die defensive Strategie (SPI Defensiv) erfordert nur 4 Anpassungen pro Jahr.",
  },
  {
    q: "Kann ich jede Bank nutzen?",
    a: "Ja. Sie benötigen lediglich ein Wertschriftendepot bei einer Schweizer Bank oder einem Online-Broker (z.B. Swissquote, PostFinance). Für die internationalen Strategien brauchen Sie Zugang zur US-Börse (Nasdaq) und zur deutschen Börse (Xetra) — die meisten Schweizer Broker bieten dies standardmässig an.",
  },
  {
    q: "Wie viel Geld brauche ich mindestens?",
    a: "Wir empfehlen ein Anlagekapital von mindestens CHF 50'000 pro Strategie. Bei kleineren Beträgen werden die Transaktionskosten relativ zu hoch. Es gibt jedoch keine formelle Mindestanlage.",
  },
  {
    q: "Ist das Anlageberatung?",
    a: "Nein. aktienpost.ch ist ein reiner Informationsdienst. Wir geben keine individuellen Empfehlungen und kennen Ihre persönliche finanzielle Situation nicht. Anlageentscheide treffen Sie eigenverantwortlich.",
  },
  {
    q: "Was ist die Geld-zurück-Garantie?",
    a: "Wenn Sie innerhalb der ersten 30 Tage nach Abschluss Ihres Abonnements nicht zufrieden sind, erstatten wir Ihnen den vollen Betrag — ohne Fragen, ohne Kleingedrucktes. Schreiben Sie einfach eine E-Mail an info@aktienpost.ch.",
  },
  {
    q: "Wie aktuell sind die Signale?",
    a: "Die Signale werden jeden Börsentag nach Handelsschluss generiert und per E-Mail versandt. In der Regel erhalten Sie die E-Mail zwischen 18:00 und 19:00 Uhr. Sie haben dann bis zur Börseneröffnung am nächsten Morgen Zeit, die Order einzugeben.",
  },
  {
    q: "Was passiert in einem Crash?",
    a: "Unsere Strategien verfügen über eingebaute Schutzmechanismen. Bei der SPI Breakout Strategie begrenzt ein automatisches Verlustlimit (-15%) jeden einzelnen Verlust. Bei SPI Defensiv wechselt der globale Schutzfilter das gesamte Portfolio in Cash. Diese Mechanismen haben sich im Corona-Crash 2020 und im Bärenmarkt 2022 bewährt.",
  },
  {
    q: "Kann ich mehrere Strategien gleichzeitig nutzen?",
    a: "Ja, das ist sogar empfehlenswert. Viele Anleger kombinieren zum Beispiel SPI Defensiv (als stabiler Kern) mit US Tech Growth (als Wachstumsmotor). Alle Pläne enthalten alle 4 Strategien.",
  },
  {
    q: "Was sind Backtests — und kann ich den Zahlen vertrauen?",
    a: "Ein Backtest simuliert, wie eine Strategie in der Vergangenheit funktioniert hätte. Unsere Backtests decken 10 Jahre ab (2016–2026), inklusive mehrerer Krisenphasen. Wichtig: Backtests sind keine Garantie für die Zukunft. Sie zeigen aber, dass eine Strategie unter realistischen Bedingungen funktioniert. Wir kommunizieren auch die Grenzen offen — etwa den Survivorship Bias (siehe Glossar).",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="py-1">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left sm:gap-6 sm:py-5"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-[17px] leading-snug text-navy sm:text-xl">
                {item.q}
              </span>
              <span
                className={`relative grid h-8 w-8 flex-none place-items-center rounded-full border border-line transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <span className="block h-px w-3 bg-navy" />
                <span className="absolute block h-3 w-px bg-navy" />
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-2 text-[15px] leading-relaxed text-secondary sm:pr-12">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
