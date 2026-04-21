import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="container grid gap-12 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 font-serif">
            <span className="grid h-6 w-6 place-items-center rounded-sm bg-navy text-cream">
              <span className="block text-sm leading-none font-bold">+</span>
            </span>
            <span className="text-lg font-semibold text-navy">
              aktienpost<span className="text-gold">.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary">
            Börsensignale für Schweizer Privatanleger. Wissenschaftlich
            getestet, einfach umzusetzen.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted">
            Service
          </h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/80">
            <li>
              <Link className="hover:text-navy" href="/#strategien">
                Strategien
              </Link>
            </li>
            <li>
              <Link className="hover:text-navy" href="/#performance">
                Performance
              </Link>
            </li>
            <li>
              <Link className="hover:text-navy" href="/#preise">
                Preise
              </Link>
            </li>
            <li>
              <Link className="hover:text-navy" href="/#blog">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted">
            Rechtliches
          </h4>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/80">
            <li>
              <a className="hover:text-navy" href="/impressum">
                Impressum
              </a>
            </li>
            <li>
              <a className="hover:text-navy" href="/datenschutz">
                Datenschutz
              </a>
            </li>
            <li>
              <a className="hover:text-navy" href="/agb">
                AGB
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-8 text-xs leading-relaxed text-muted md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">
            aktienpost.ch ist keine Anlageberatung. Die bereitgestellten
            Informationen dienen ausschliesslich der allgemeinen Information
            und stellen weder eine Empfehlung noch ein Angebot zum Kauf oder
            Verkauf von Finanzinstrumenten dar. Vergangene Wertentwicklung ist
            kein verlässlicher Indikator für zukünftige Ergebnisse.
            Investitionen an den Finanzmärkten bergen Verlustrisiken, bis hin
            zum Totalverlust des eingesetzten Kapitals.
          </p>
          <p className="md:text-right">
            © {new Date().getFullYear()} aktienpost.ch
          </p>
        </div>
      </div>
    </footer>
  );
}
