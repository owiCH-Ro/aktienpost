import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Anmelden — aktienpost.ch",
  description:
    "Melden Sie sich für aktienpost.ch an. Alle 4 Strategien, 30 Tage Geld-zurück-Garantie, ab CHF 49 im Monat.",
};

interface Props {
  searchParams?: { plan?: string | string[] };
}

export default function AnmeldenPage({ searchParams }: Props) {
  const rawPlan = searchParams?.plan;
  const defaultPlan = Array.isArray(rawPlan) ? rawPlan[0] : rawPlan;

  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Anmeldung</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Jetzt <span className="italic">starten</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Füllen Sie das Formular aus — wir melden uns innerhalb von 24
            Stunden, um Ihr Abonnement zu aktivieren. 30 Tage Geld-zurück-
            Garantie, Kündigung jederzeit möglich.
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <RegisterForm defaultPlan={defaultPlan} />

            <p className="mt-8 text-center text-sm text-secondary">
              Fragen vor der Anmeldung?{" "}
              <a
                href="/kontakt"
                className="font-medium text-navy underline underline-offset-2 hover:text-gold"
              >
                Kontakt
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
