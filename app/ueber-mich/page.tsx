import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Über mich — aktienpost.ch",
  description:
    "Warum ich aktienpost.ch gegründet habe. Oliver Widmer, Dipl. Ing. ETH, Gründer von aktienpost.ch.",
};

export default function UeberMichPage() {
  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-24">
          <span className="eyebrow">Über mich</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Warum ich aktienpost.ch
            <br />
            <span className="italic">gegründet habe</span>.
          </h1>
        </div>
      </section>

      <section>
        <div className="container grid gap-12 py-16 lg:grid-cols-[320px_1fr] lg:gap-16 lg:py-20">
          <aside className="self-start">
            {/* Photo placeholder */}
            <div
              className="aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-xl border border-line bg-cream-dark/50"
              aria-label="Foto Oliver Widmer"
            >
              <div className="flex h-full w-full items-center justify-center text-center text-[11px] uppercase tracking-[0.2em] text-muted">
                Foto Oliver Widmer
              </div>
            </div>

            <div className="mt-8 border-l-2 border-gold pl-5">
              <p className="font-serif text-lg text-navy">Oliver Widmer</p>
              <p className="mt-1 text-sm text-secondary">
                Dipl. Ing. ETH
                <br />
                Gründer aktienpost.ch
              </p>
            </div>
          </aside>

          <article className="max-w-3xl space-y-6 text-[16px] leading-relaxed text-ink/85">
            <p>
              Mein Name ist Oliver Widmer. Ich bin Ingenieur (Dipl. Ing. ETH),
              Unternehmer und Privatanleger — genau wie Sie.
            </p>
            <p>
              Vor einigen Jahren habe ich mein eigenes Unternehmen verkauft.
              Plötzlich hatte ich einen substantiellen Betrag auf dem Konto
              und stand vor der Frage: Was nun damit?
            </p>
            <p>
              Also tat ich, was man tut: Ich sprach mit Banken. Verschiedene
              Berater präsentierten mir ihre Produkte — Strategiefonds,
              Vermögensverwaltungsmandate, Anlageberatung. Was mich störte:
              Hohe Gebühren, die im Kleingedruckten versteckt waren. Wenig
              Transparenz darüber, was wirklich mit meinem Geld passiert. Und
              regelmässige Einladungen zu Bank-Apéros, an denen mir das
              neueste Produkt angepriesen wurde. Das ist nicht meine Welt.
            </p>
            <p>
              Also begann ich, mich selbst einzulesen. Bücher über
              Anlagestrategien, wissenschaftliche Papers über
              Faktorinvestitionen, quantitative Methoden. Ich legte mein Geld
              selbst an — und war überzeugt, es besser zu machen als die Bank.
            </p>
            <p>
              Dann kam der Bärenmarkt 2022. Steigende Zinsen, fallende Kurse,
              täglich rote Zahlen. Und obwohl ich mir fest vorgenommen hatte,
              rational zu bleiben, passierte genau das, was Millionen von
              Anlegern passiert: Ich verkaufte nahe dem Tiefpunkt. Klassisch.
              Buy high, sell low. Mein Ingenieur-Verstand wusste, dass es
              falsch war. Aber die Emotionen waren stärker.
            </p>
            <p className="font-serif text-xl italic text-navy">
              Dieser Moment war der Wendepunkt.
            </p>
            <p>
              Mir wurde klar: Das Problem bin nicht ich. Das Problem ist, dass
              Menschen nicht für emotionsloses Investieren gemacht sind. Wir
              reagieren auf Schlagzeilen, auf fallende Kurse, auf die Angst,
              alles zu verlieren. Kein noch so gutes Buch schützt davor.
            </p>
            <p>
              Was aber schützt: Ein System. Ein Algorithmus, der nach festen
              Regeln handelt — ohne Angst, ohne Gier, ohne Bauchgefühl.
            </p>
            <p>
              Also habe ich eines gebaut. Über viele Monate, Hunderte von
              Backtests und unzählige Optimierungsschleifen sind vier
              Strategien entstanden, die ich heute selbst nutze. Ich
              investiere mein eigenes Geld nach genau diesen Signalen. Jede
              Aktie, die aktienpost.ch empfiehlt, kaufe oder verkaufe auch ich.
            </p>
            <p>
              Was ich dabei gelernt habe: Nicht nur Kaufsignale sind wertvoll
              — Verkaufssignale sind es ebenso. Zum einen, damit man Gewinner
              nicht zu früh verkauft. Zum anderen, damit man Verlierer nicht
              zu lange hält. Genau das macht ein Algorithmus besser als jeder
              Mensch.
            </p>
            <p>
              aktienpost.ch ist das Ergebnis dieser Reise. Kein Bankprodukt,
              kein Robo-Advisor, kein Newsletter mit heissen Tipps. Sondern
              ein nüchternes, datengetriebenes System, das tut, wofür es
              gebaut wurde: Bessere Anlageentscheidungen treffen als mein
              Bauchgefühl.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
