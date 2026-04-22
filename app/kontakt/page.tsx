import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Kontakt — aktienpost.ch",
  description:
    "Fragen zu unseren Strategien, zum Abonnement oder zur Umsetzung der Signale? Wir antworten in der Regel innerhalb von 24 Stunden — info@aktienpost.ch.",
};

export default function KontaktPage() {
  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Kontakt</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            So erreichen Sie <span className="italic">uns</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Haben Sie Fragen zu unseren Strategien, zu Ihrem Abonnement oder
            zur Umsetzung der Signale? Schreiben Sie uns — wir antworten in
            der Regel innerhalb von 24 Stunden.
          </p>
        </div>
      </section>

      <section>
        <div className="container grid gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="rounded-xl border border-line bg-white p-8">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
              E-Mail
            </h2>
            <p className="mt-5 font-serif text-[28px] text-navy">
              <a
                href="mailto:info@aktienpost.ch"
                className="transition-colors hover:text-gold"
              >
                info@aktienpost.ch
              </a>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-secondary">
              Für allgemeine Fragen, Feedback oder Support rund um Ihr
              Abonnement.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-8">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-secondary">
              Postadresse
            </h2>
            <address className="mt-5 not-italic font-serif text-[20px] leading-[1.5] text-navy">
              OWITA AG
              <br />
              [Adresse]
              <br />
              Schweiz
            </address>
            <p className="mt-4 text-sm leading-relaxed text-secondary">
              Für formelle Korrespondenz.
            </p>
          </div>
        </div>

        <div className="container pb-16 lg:pb-24">
          <div className="mx-auto max-w-3xl rounded-lg border border-line bg-cream-dark/30 px-6 py-5">
            <p className="text-sm italic leading-relaxed text-secondary">
              Bitte beachten Sie: Wir bieten keinen telefonischen Support und
              keine individuelle Anlageberatung an. Fragen zur generellen
              Funktionsweise der Strategien und zum Service beantworten wir
              gerne per E-Mail.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
