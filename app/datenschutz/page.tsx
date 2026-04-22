import type { Metadata } from "next";

import { DraftBanner, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Datenschutz — aktienpost.ch",
  description:
    "Datenschutzerklärung der aktienpost.ch. Welche Daten wir erheben, wofür, und welche Rechte Sie haben.",
};

export default function DatenschutzPage() {
  return (
    <PageShell>
      <DraftBanner />

      <section className="border-b border-line">
        <div className="container py-14 lg:py-20">
          <span className="eyebrow">Rechtliches</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Datenschutzerklärung
          </h1>
          <p className="mt-5 max-w-3xl text-sm text-secondary">
            Diese Datenschutzerklärung beschreibt, wie wir mit Ihren
            personenbezogenen Daten umgehen. Sie richtet sich nach dem
            revidierten Schweizer Datenschutzgesetz (nDSG).
          </p>
        </div>
      </section>

      <section>
        <div className="container max-w-3xl space-y-10 py-14 text-[15px] leading-relaxed text-ink/85 lg:py-20">
          <Block heading="Verantwortliche Stelle">
            <p>
              OWITA AG, [Adresse], Schweiz. Kontakt:{" "}
              <a
                className="text-navy underline underline-offset-2 hover:text-gold"
                href="mailto:info@aktienpost.ch"
              >
                info@aktienpost.ch
              </a>
              .
            </p>
          </Block>

          <Block heading="Erhobene Daten">
            <p>
              Im Rahmen der Erbringung unserer Dienstleistung erheben wir
              folgende Daten:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>E-Mail-Adresse (für Signalversand und Login)</li>
              <li>Name (zur Rechnungsstellung)</li>
              <li>Zahlungsinformationen (über unseren Zahlungsdienstleister)</li>
              <li>Technische Protokolldaten (IP-Adresse, Browser, Zeit)</li>
            </ul>
          </Block>

          <Block heading="Zweck der Datenverarbeitung">
            <p>
              Die erhobenen Daten werden ausschliesslich zur Erbringung der
              Dienstleistung verwendet: Versand von Signalen, Verwaltung
              Ihres Abonnements, Rechnungsstellung, sowie zur Gewährleistung
              der technischen Sicherheit unserer Systeme.
            </p>
          </Block>

          <Block heading="Weitergabe an Dritte">
            <p>
              Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, mit
              Ausnahme unseres Zahlungsdienstleisters (zur Abwicklung der
              Zahlung) und, sofern gesetzlich verpflichtend, an Schweizer
              Behörden. Eine Weitergabe zu Werbezwecken findet nicht statt.
            </p>
          </Block>

          <Block heading="Cookies">
            <p>
              Wir verwenden ausschliesslich technisch notwendige Cookies (z.B.
              für die Login-Session). Wir setzen keine Tracking-Cookies und
              keine Drittanbieter-Analysewerkzeuge ein.
            </p>
          </Block>

          <Block heading="Ihre Rechte">
            <p>
              Gemäss nDSG haben Sie jederzeit das Recht auf Auskunft,
              Berichtigung und Löschung Ihrer personenbezogenen Daten sowie
              auf Widerspruch gegen die Verarbeitung. Schreiben Sie dazu
              eine E-Mail an{" "}
              <a
                className="text-navy underline underline-offset-2 hover:text-gold"
                href="mailto:info@aktienpost.ch"
              >
                info@aktienpost.ch
              </a>
              .
            </p>
          </Block>
        </div>
      </section>
    </PageShell>
  );
}

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
        {heading}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
