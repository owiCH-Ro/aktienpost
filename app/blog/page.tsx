import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Blog — aktienpost.ch",
  description:
    "Regelmässige Artikel zu Anlagestrategien, Märkten und dem Schweizer Aktienmarkt. aktienpost.ch — Wissen für Privatanleger.",
};

export default function BlogPage() {
  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Blog — <span className="italic">Wissen für Privatanleger</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Regelmässige Artikel zu Anlagestrategien, Märkten und dem
            Schweizer Aktienmarkt.
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14 lg:py-20">
          {/* Coming-soon card. Keeping the page in the nav now (instead
              of waiting until the first post ships) sets reader
              expectations and gives SEO a stable URL for inbound links. */}
          <div className="mx-auto max-w-2xl rounded-xl border border-line bg-white p-10 text-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">
              In Kürze
            </div>
            <h2 className="mt-4 font-serif text-[28px] leading-tight text-navy sm:text-[32px]">
              Unsere ersten Artikel erscheinen{" "}
              <span className="italic">in Kürze</span>.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-secondary">
              Melden Sie sich an, um benachrichtigt zu werden, sobald der
              erste Artikel live ist.
            </p>

            <div className="mt-8">
              <Link
                href="/anmelden"
                className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-gold-dark"
              >
                Jetzt anmelden
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
