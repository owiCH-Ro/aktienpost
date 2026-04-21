"use client";

import { useState } from "react";

interface Item {
  q: string;
  a: string;
}

const ITEMS: Item[] = [
  {
    q: "Brauche ich Börsenwissen?",
    a: "Nein. Sie müssen weder Kurse analysieren noch Indikatoren lesen können. Jedes Signal enthält klare Anweisungen: Welches Wertpapier, welche Aktion (kaufen/verkaufen), zu welchem Preis. Die zugrunde liegenden Strategien laufen vollständig automatisiert — wir übernehmen die Analyse, Sie die Ausführung.",
  },
  {
    q: "Wie oft muss ich handeln?",
    a: "Je nach Strategie zwischen drei- und zwölfmal pro Jahr. Pro Signal rechnen wir mit rund fünf Minuten für die Order-Eingabe bei Ihrer Bank. Ein monatliches Rebalancing bei der LowVol-Strategie lässt sich ebenfalls in unter zehn Minuten umsetzen.",
  },
  {
    q: "Kann ich jede Bank nutzen?",
    a: "Ja. Sie benötigen lediglich ein Handelskonto mit Zugang zur Schweizer Börse (SIX) und — je nach Strategie — zu internationalen Börsen (NYSE/Nasdaq, Xetra, Hongkong, Tokyo). Die Strategien sind kompatibel mit allen etablierten Schweizer Banken und Online-Brokern.",
  },
  {
    q: "Ist das Anlageberatung?",
    a: "Nein. aktienpost.ch ist ein reiner Informationsdienst und stellt keine Anlageberatung, Finanzanalyse oder Vermögensverwaltung dar. Die gelieferten Signale sind algorithmisch generiert und werden Ihnen zur Information bereitgestellt. Jede Investitionsentscheidung treffen Sie selbst und in eigener Verantwortung.",
  },
  {
    q: "Was ist die Geld-zurück-Garantie?",
    a: "Sie können aktienpost.ch 30 Tage ohne Risiko testen. Wenn Sie innerhalb der ersten 30 Tage nach Abschluss mit dem Dienst nicht zufrieden sind, erstatten wir den vollen Betrag — ohne Rückfragen, ohne Kündigungsfristen.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="py-2">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-navy sm:text-xl">
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
                <p className="pb-5 pr-12 text-[15px] leading-relaxed text-secondary">
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
