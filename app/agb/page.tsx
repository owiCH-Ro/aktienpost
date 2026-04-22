import type { Metadata } from "next";

import { DraftBanner, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "AGB — aktienpost.ch",
  description:
    "Allgemeine Geschäftsbedingungen für den Informationsdienst aktienpost.ch der OWITA AG.",
};

export default function AgbPage() {
  return (
    <PageShell>
      <DraftBanner />

      <section className="border-b border-line">
        <div className="container py-14 lg:py-20">
          <span className="eyebrow">Rechtliches</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Allgemeine <span className="italic">Geschäftsbedingungen</span>
          </h1>
          <p className="mt-5 max-w-3xl text-sm text-secondary">
            Kurzfassung. Die vollständige Fassung folgt nach anwaltlicher
            Prüfung.
          </p>
        </div>
      </section>

      <section>
        <div className="container max-w-3xl space-y-10 py-14 text-[15px] leading-relaxed text-ink/85 lg:py-20">
          <Clause n="1" heading="Gegenstand">
            <p>
              Gegenstand dieser AGB ist der Zugang des Abonnenten zum
              Informationsdienst aktienpost.ch, der von der OWITA AG
              betrieben wird. Der Dienst umfasst regelbasierte Börsensignale
              sowie begleitendes Informationsmaterial.
            </p>
          </Clause>

          <Clause n="2" heading="Keine Anlageberatung">
            <p>
              aktienpost.ch ist ein reiner Informationsdienst. Er erbringt
              weder Anlageberatung noch Anlagevermittlung oder
              Vermögensverwaltung. Es wird keine Garantie auf eine bestimmte
              Rendite oder den Erfolg einer Anlagestrategie gegeben.
            </p>
          </Clause>

          <Clause n="3" heading="Laufzeit und Kündigung">
            <p>
              Das Abonnement wird als Monats- oder Jahresabo angeboten. Es
              kann jederzeit zum Ende der laufenden Periode gekündigt werden.
              Die Kündigung ist per E-Mail an info@aktienpost.ch möglich.
            </p>
          </Clause>

          <Clause n="4" heading="Geld-zurück-Garantie">
            <p>
              Innerhalb der ersten 30 Tage nach Abschluss erstatten wir den
              vollen Betrag — ohne Fragen, ohne Kleingedrucktes. Die
              Rückerstattung erfolgt innerhalb von 14 Tagen nach Erhalt der
              Anfrage.
            </p>
          </Clause>

          <Clause n="5" heading="Haftungsausschluss">
            <p>
              Die OWITA AG haftet nicht für Verluste, die aus
              Anlageentscheiden entstehen, welche auf Grundlage der
              bereitgestellten Signale getroffen wurden. Jede Anlage-
              entscheidung trifft der Abonnent eigenverantwortlich.
              Vergangene Wertentwicklung ist kein Indikator für zukünftige
              Ergebnisse.
            </p>
          </Clause>

          <Clause n="6" heading="Datenschutz">
            <p>
              Der Umgang mit personenbezogenen Daten ist in unserer{" "}
              <a
                className="text-navy underline underline-offset-2 hover:text-gold"
                href="/datenschutz"
              >
                Datenschutzerklärung
              </a>{" "}
              geregelt.
            </p>
          </Clause>

          <Clause n="7" heading="Gerichtsstand und anwendbares Recht">
            <p>
              Für sämtliche Streitigkeiten aus oder im Zusammenhang mit
              diesen AGB ist ausschliesslich das zuständige Gericht am Sitz
              der OWITA AG zuständig. Es gilt Schweizer Recht.
            </p>
          </Clause>
        </div>
      </section>
    </PageShell>
  );
}

function Clause({
  n,
  heading,
  children,
}: {
  n: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="flex items-baseline gap-4 font-serif text-[22px] text-navy">
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
          § {n}
        </span>
        {heading}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
