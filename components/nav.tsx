"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links: Array<{ href: string; label: string }> = [
  { href: "/#strategien", label: "Strategien" },
  { href: "/#performance", label: "Performance" },
  { href: "/#preise", label: "Preise" },
  { href: "/blog", label: "Blog" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/beispiel-signal", label: "Beispiel-Signal" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes — covers tap-on-link,
  // hash navigation, and browser back/forward.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open so background content
  // doesn't scroll under the sheet.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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

        <Link
          href="/#preise"
          className="hidden lg:inline-flex items-center gap-2 rounded-md border border-gold bg-gold px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gold-dark hover:border-gold-dark"
        >
          30-Tage Geld-zurück
        </Link>

        {/* Mobile hamburger — visible below lg. 44x44 tap target. */}
        <button
          type="button"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-navy/5"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer + backdrop. Always rendered so the fade transition
          works on both open and close. */}
      <div
        className={[
          "lg:hidden fixed inset-0 top-16 z-40 transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* Click-outside backdrop. */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-navy/30 backdrop-blur-sm"
        />
        <nav
          id="mobile-nav"
          className={[
            "absolute left-0 right-0 top-0 bg-cream border-b border-line shadow-lg",
            "transition-transform duration-200 ease-out",
            open ? "translate-y-0" : "-translate-y-2",
          ].join(" ")}
        >
          <ul className="container flex flex-col py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center border-b border-line/60 text-[16px] text-ink/85 hover:text-navy"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container pb-5 pt-3">
            <Link
              href="/#preise"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-md bg-gold px-5 py-3 text-[15px] font-medium text-white shadow-sm hover:bg-gold-dark"
            >
              30-Tage Geld-zurück
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
