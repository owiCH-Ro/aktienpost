import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Admin Dashboard — aktienpost.ch",
  // Intentionally uncrawlable — this page is a private gate and
  // should never surface in search results.
  robots: { index: false, follow: false, noarchive: true },
};

// Force server rendering on every request: the auth state depends on a
// cookie, and we never want Next to cache a logged-in or logged-out
// snapshot.
export const dynamic = "force-dynamic";

const COOKIE_NAME = "aktienpost_admin";

interface Props {
  searchParams?: { error?: string | string[] };
}

export default function DashboardPage({ searchParams }: Props) {
  const authed = cookies().get(COOKIE_NAME)?.value === "true";
  const hasError = Array.isArray(searchParams?.error)
    ? searchParams?.error[0] === "1"
    : searchParams?.error === "1";

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-navy/20 bg-navy">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-serif text-cream">
            <span className="grid h-6 w-6 place-items-center rounded-sm bg-cream text-navy">
              <span className="block text-sm leading-none font-bold">+</span>
            </span>
            <span className="text-lg font-semibold tracking-tight">
              aktienpost
              <span className="text-gold">.</span>
              <span className="ml-2 text-sm font-normal uppercase tracking-[0.22em] text-cream/70">
                Admin
              </span>
            </span>
          </div>
          {authed && (
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-md border border-cream/30 px-4 py-1.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
              >
                Abmelden
              </button>
            </form>
          )}
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-14 lg:py-20">
          {authed ? <AdminPanel /> : <LoginPanel hasError={hasError} />}
        </div>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

function LoginPanel({ hasError }: { hasError: boolean }) {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-serif text-[32px] leading-tight text-navy">
        Admin-Anmeldung
      </h1>
      <p className="mt-3 text-[14px] text-secondary">
        Dieser Bereich ist nicht öffentlich zugänglich.
      </p>

      <form
        action="/api/admin/login"
        method="POST"
        className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-white p-7"
      >
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
            Passwort
          </span>
          <input
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-md border border-line bg-cream-dark/20 px-4 py-2.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </label>

        {hasError && (
          <p className="rounded-md border border-bearish/30 bg-bearish/5 px-4 py-3 text-[14px] text-bearish">
            Falsches Passwort.
          </p>
        )}

        <button
          type="submit"
          className="self-start inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 text-[15px] font-medium text-cream transition-colors hover:bg-navy-dark"
        >
          Anmelden
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Admin panel
// ---------------------------------------------------------------------------

interface LinkCard {
  name: string;
  href: string;
  hint: string;
}

const CARDS: LinkCard[] = [
  {
    name: "Markets Dashboard",
    href: "https://markets-dashboard-peach.vercel.app/",
    hint: "Signal- und Performance-Daten",
  },
  {
    name: "Supabase",
    href: "https://supabase.com/dashboard",
    hint: "Datenbank, Auth, Logs",
  },
  {
    name: "Vercel",
    href: "https://vercel.com/dashboard",
    hint: "Deployments und Hosting",
  },
  {
    name: "Zoho Mail",
    href: "https://mail.zoho.eu",
    hint: "info@aktienpost.ch Postfach",
  },
  {
    name: "Resend",
    href: "https://resend.com",
    hint: "Transaktionale E-Mails",
  },
];

function AdminPanel() {
  return (
    <div>
      <h1 className="font-serif text-[36px] leading-tight text-navy">
        Admin Dashboard
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] text-secondary">
        Schnellzugriff auf die von aktienpost.ch genutzten Tools.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <a
            key={c.href}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-gold/60"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-[22px] leading-tight text-navy">
                {c.name}
              </span>
              <span
                aria-hidden
                className="text-gold transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </div>
            <span className="mt-2 text-[13px] text-secondary">{c.hint}</span>
            <span className="mt-5 truncate font-mono text-[12px] text-muted">
              {c.href.replace(/^https?:\/\//, "")}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
