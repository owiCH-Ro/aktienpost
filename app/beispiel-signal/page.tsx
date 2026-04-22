import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Beispiel-Signal — aktienpost.ch",
  description:
    "So sieht ein Signal von aktienpost.ch aus. Klar strukturiert, mit Ticker, Kurs und empfohlener Stückzahl — bereit für die Order-Eingabe bei Ihrer Bank.",
};

export default function BeispielSignalPage() {
  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Beispiel-Signal</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            So sieht ein <span className="italic">Signal</span> aus.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Jeden Börsentag nach Handelsschluss analysiert unser System die
            Märkte. Gibt es eine Veränderung in einer Ihrer Strategien,
            erhalten Sie eine E-Mail wie diese:
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14 lg:py-20">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(15,23,42,0.15)]">
            {/* Email header */}
            <header className="space-y-2 border-b border-line bg-cream-dark/40 px-7 py-5 text-sm">
              <EmailHeaderRow
                label="Von"
                value="signale@aktienpost.ch"
              />
              <EmailHeaderRow
                label="Betreff"
                value="aktienpost.ch — 1 neues Signal (SPI Breakout)"
              />
            </header>

            {/* Body */}
            <div className="space-y-5 px-7 py-7 text-[15px] leading-relaxed text-ink/85">
              <p>Guten Abend,</p>
              <p>Ihr heutiges Signal:</p>

              <div className="rounded-lg border border-gold/40 bg-gold/5 p-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold-dark">
                  Kaufen
                </div>
                <div className="mt-1 font-serif text-[24px] leading-tight text-navy">
                  OFN.SW — Orell Füssli
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <SignalField label="Strategie" value="SPI Breakout" />
                  <SignalField label="Aktueller Kurs" value="CHF 157.00" />
                  <SignalField
                    label="Empfohlene Stückzahl"
                    value="95 Aktien (bei CHF 15'000)"
                  />
                  <SignalField
                    label="Offene Positionen"
                    value="3 von 7"
                  />
                </dl>
              </div>

              <p>
                Falls Sie Fragen haben:{" "}
                <a
                  className="text-navy underline underline-offset-2 hover:text-gold"
                  href="mailto:info@aktienpost.ch"
                >
                  info@aktienpost.ch
                </a>
              </p>
              <p>
                Freundliche Grüsse
                <br />
                aktienpost.ch
              </p>

              <p className="border-t border-line pt-4 text-xs italic text-muted">
                Dies ist ein automatisch generiertes Signal. Keine
                Anlageberatung.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-[15px] leading-relaxed text-secondary">
            Sie sehen: Kein Fachjargon, keine komplizierte Analyse. Ein
            klares Signal mit allem, was Sie brauchen — Aktienname,
            Handlung, Kurs. Den Handel bei Ihrer Bank auszuführen, dauert
            weniger als 5 Minuten.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/#preise"
              className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-gold-dark"
            >
              Jetzt starten — ab CHF 49 / Monat
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function EmailHeaderRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 text-[13px]">
      <span className="font-medium uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function SignalField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.15em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-serif text-[15px] text-navy">{value}</dd>
    </div>
  );
}
