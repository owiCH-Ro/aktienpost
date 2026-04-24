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

            {/* Expectation-setter below the form — spells out the
                onboarding flow so the applicant knows what happens
                between "Submit" and "first signal email". Reduces
                the drop-off where people expect an instant login. */}
            <div className="mt-8 rounded-xl border border-line bg-cream-dark/30 p-7">
              <h2 className="font-serif text-[20px] leading-tight text-navy sm:text-[22px]">
                So geht es nach der Anmeldung weiter
              </h2>
              <ol className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-ink/85">
                {[
                  "Sie erhalten innerhalb von 24 Stunden eine persönliche E-Mail von Oliver Widmer mit einer Übersicht aller aktuell offenen Positionen.",
                  "Sie erhalten eine Rechnung per E-Mail (OWITA AG). Die Bezahlung erfolgt bequem auf Rechnung — keine Kreditkarte nötig.",
                  "Sobald Ihr Zugang aktiviert ist, erhalten Sie jeden Morgen vor Börsenöffnung Ihren persönlichen Portfoliobericht per E-Mail.",
                  "Bei neuen Kauf- oder Verkaufssignalen werden Sie sofort informiert.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold/15 font-serif text-[13px] font-semibold text-gold">
                      {i + 1}
                    </span>
                    <span className="pt-[2px]">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-4 text-center text-[13px] font-medium text-navy">
                30 Tage Geld-zurück-Garantie — ohne Wenn und Aber.
              </p>
            </div>

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
