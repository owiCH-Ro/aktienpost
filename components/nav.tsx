import Link from "next/link";

import { AuthSlot } from "@/components/auth-slot";

const links: Array<{ href: string; label: string }> = [
  { href: "/#strategien", label: "Strategien" },
  { href: "/#performance", label: "Performance" },
  { href: "/#preise", label: "Preise" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/beispiel-signal", label: "Beispiel-Signal" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-serif">
          <span className="grid h-6 w-6 place-items-center rounded-sm bg-navy text-cream">
            <span className="block text-sm leading-none font-bold">+</span>
          </span>
          <span className="text-xl font-semibold tracking-tight text-navy">
            aktienpost
            <span className="text-gold">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[14px] text-ink/80">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-navy"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <AuthSlot className="hidden md:inline-flex" />

          <Link
            href="/#preise"
            className="hidden md:inline-flex items-center gap-2 rounded-md border border-gold bg-gold px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gold-dark hover:border-gold-dark"
          >
            30-Tage Geld-zurück
          </Link>

          <Link
            href="/#preise"
            className="md:hidden inline-flex items-center rounded-md bg-gold px-3 py-2 text-xs font-medium text-white"
          >
            Starten
          </Link>
        </div>
      </div>
    </header>
  );
}
