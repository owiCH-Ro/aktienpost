import type { Metadata } from "next";

import { DraftBanner, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Impressum — aktienpost.ch",
  description: "Impressum und Angaben zum Anbieter der Website aktienpost.ch.",
};

export default function ImpressumPage() {
  return (
    <PageShell>
      <DraftBanner />

      <section className="border-b border-line">
        <div className="container py-14 lg:py-20">
          <span className="eyebrow">Rechtliches</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Impressum
          </h1>
        </div>
      </section>

      <section>
        <div className="container max-w-3xl space-y-10 py-14 text-[15px] leading-relaxed text-ink/85 lg:py-20">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
              Anbieter
            </h2>
            <p className="mt-4">
              aktienpost.ch ist ein Angebot der
            </p>
            <address className="mt-3 not-italic font-serif text-[18px] leading-relaxed text-navy">
              OWITA AG
              <br />
              [Strasse + Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              Schweiz
            </address>
          </div>

          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
              Kontakt
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                E-Mail:{" "}
                <a
                  href="mailto:info@aktienpost.ch"
                  className="text-navy underline underline-offset-2 hover:text-gold"
                >
                  info@aktienpost.ch
                </a>
              </li>
              <li>UID: [CHE-xxx.xxx.xxx]</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
              Verantwortlich für den Inhalt
            </h2>
            <p className="mt-4">Oliver Widmer</p>
          </div>

          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
              Disclaimer
            </h2>
            <p className="mt-4">
              aktienpost.ch ist ein Informationsdienst der OWITA AG und bietet
              keine Anlageberatung und keine Anlagevermittlung. Die
              bereitgestellten Signale, Analysen und Informationen stellen
              keine Aufforderung zum Kauf oder Verkauf von Wertpapieren dar.
              Eine Anlageentscheidung sollte keinesfalls ausschliesslich auf
              diese Informationen gestützt sein.
            </p>
            <p className="mt-4">
              Die dargestellten Backtests und Performancekennzahlen basieren
              auf historischen Daten und sind rückwirkend berechnet (siehe
              Glossar: Backtest). Die Wertentwicklung in der Vergangenheit
              ist kein Indikator für zukünftige Ergebnisse. Backtest-Resultate
              unterliegen Survivorship Bias.
            </p>
            <p className="mt-4">
              Anlageentscheide sollten stets im Portfoliokontext getroffen
              werden und Ihre persönliche Situation, Risikobereitschaft und
              Risikofähigkeit berücksichtigen. Jede Entscheidung, Geschäfte
              zu tätigen oder nicht zu tätigen, wird eigenverantwortlich
              getroffen. Wir empfehlen, gegebenenfalls einen Anlage-, Steuer-
              oder Rechtsberater zu konsultieren.
            </p>
            <p className="mt-4">
              aktienpost.ch untersteht keiner prudentiellen Aufsicht. Die
              OWITA AG behält sich das Recht vor, die Handelsstrategien
              jederzeit und ohne vorhergehende Ankündigung weiterzuentwickeln.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
