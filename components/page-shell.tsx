import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

/** Shared shell for simple content pages (Über mich, Kontakt, legal, ...).
 * Renders Nav + Footer and a content container with the usual padding.
 * Children pick their own section structure within <main>. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

/** Shared banner for the legal pages still awaiting lawyer review. */
export function DraftBanner() {
  return (
    <div className="border-b border-gold/40 bg-gold/10">
      <div className="container py-3 text-center text-xs uppercase tracking-[0.18em] text-gold-dark">
        Entwurf — juristische Prüfung ausstehend
      </div>
    </div>
  );
}
