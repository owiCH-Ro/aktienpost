import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Kontakt — aktienpost.ch",
  description:
    "Fragen zu unseren Strategien, zum Abonnement oder zur Umsetzung der Signale? Wir antworten in der Regel innerhalb von 24 Stunden.",
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
        <div className="container py-14 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <ContactForm />

            <p className="mt-8 text-center text-sm text-secondary">
              Oder schreiben Sie uns direkt:{" "}
              <a
                href="mailto:info@aktienpost.ch"
                className="font-medium text-navy underline underline-offset-2 hover:text-gold"
              >
                info@aktienpost.ch
              </a>
            </p>

            <p className="mx-auto mt-10 max-w-xl rounded-lg border border-line bg-cream-dark/30 px-6 py-5 text-center text-sm italic leading-relaxed text-secondary">
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
