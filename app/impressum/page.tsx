import type { Metadata } from "next";

import { DisclaimerParagraphs } from "@/components/disclaimer";
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
              Obertor 8
              <br />
              4915 St. Urban
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
              <li>UID: CHE-227.653.561</li>
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
            <DisclaimerParagraphs />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
