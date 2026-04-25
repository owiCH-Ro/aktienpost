import Link from "next/link";

import { DISCLAIMER_TEXT } from "@/components/disclaimer";

interface Col {
  heading: string;
  items: Array<{ href: string; label: string }>;
}

const COLUMNS: Col[] = [
  {
    heading: "Service",
    items: [
      { href: "/#strategien", label: "Strategien" },
      { href: "/#performance", label: "Performance" },
      { href: "/#preise", label: "Preise" },
      { href: "/beispiel-signal", label: "Beispiel-Signal" },
    ],
  },
  {
    heading: "Unternehmen",
    items: [
      { href: "/ueber-mich", label: "Über mich" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/glossar", label: "Glossar" },
    ],
  },
  {
    heading: "Rechtliches",
    items: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/agb", label: "AGB" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="container grid gap-8 py-10 sm:gap-12 sm:py-14 md:grid-cols-4">
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

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted">
              {col.heading}
            </h4>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/80">
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link className="hover:text-navy" href={it.href}>
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-6 text-xs leading-relaxed text-muted sm:py-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">{DISCLAIMER_TEXT}</p>
          <p className="md:text-right">
            © {new Date().getFullYear()} OWITA AG — aktienpost.ch
          </p>
        </div>
      </div>
    </footer>
  );
}
