import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Registrieren — aktienpost.ch",
  description:
    "Registrieren Sie sich für aktienpost.ch. Alle 4 Strategien, 30 Tage Geld-zurück-Garantie, ab CHF 49 im Monat.",
};

export default function AnmeldenPage() {
  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Registrierung</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Jetzt <span className="italic">starten</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Registrieren Sie sich mit E-Mail und Passwort. Wir melden uns
            innerhalb von 24 Stunden, um Ihr Abonnement zu aktivieren.
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14 lg:py-20">
          <div className="mx-auto max-w-xl">
            <RegisterForm />

            <p className="mt-8 text-center text-sm text-secondary">
              Sie haben bereits ein Konto?{" "}
              <a
                href="/login"
                className="font-medium text-navy underline underline-offset-2 hover:text-gold"
              >
                Anmelden
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
