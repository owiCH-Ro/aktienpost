"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Discreet floating "Fragen?" link in the bottom-right corner.
 * - Hidden on /kontakt itself (no point linking to the current page).
 * - Appears after a 5-second delay so it doesn't compete with the hero.
 * - Expands its label on hover/focus instead of using attention-grabbing
 *   animations — fits the Swiss-private-banking restraint of the rest of
 *   the site.
 */
export function FloatingContact() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 5000);
    return () => window.clearTimeout(t);
  }, []);

  if (pathname?.startsWith("/kontakt")) return null;

  return (
    <Link
      href="/kontakt"
      aria-label="Haben Sie Fragen? Schreiben Sie uns."
      className={[
        // Positioning + stacking. z-30 sits above page content but below any
        // modal/dialog (which we'd put at z-50+). 16px gutter on mobile so
        // the button stays comfortably inside the viewport even when the
        // expanded label hasn't opened.
        "fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6",
        // Visual restraint: navy fill, thin gold ring, soft shadow.
        "group inline-flex items-center gap-2 rounded-full bg-navy text-white",
        "px-3.5 py-2 text-[13px] sm:px-4 sm:py-2.5 sm:text-[14px]",
        "shadow-[0_6px_20px_-8px_rgba(26,46,74,0.45)] ring-1 ring-navy/10",
        // Smooth entry + hover scaling. No bouncing, no pulsing.
        "transition-all duration-300 ease-out",
        "hover:bg-navy-dark hover:scale-[1.04] hover:shadow-[0_10px_28px_-10px_rgba(26,46,74,0.55)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-2",
      ].join(" ")}
    >
      <EnvelopeIcon className="h-4 w-4 flex-none opacity-90" />
      <span className="font-medium tracking-tight">Fragen?</span>
      {/* Expanded copy revealed on hover/focus. max-w transition keeps the
          width animation smooth without a layout jump. */}
      <span
        className={[
          "overflow-hidden whitespace-nowrap text-white/90",
          "max-w-0 opacity-0",
          "transition-[max-width,opacity,margin] duration-300 ease-out",
          "group-hover:ml-1 group-hover:max-w-[280px] group-hover:opacity-100",
          "group-focus-visible:ml-1 group-focus-visible:max-w-[280px] group-focus-visible:opacity-100",
        ].join(" ")}
      >
        Haben Sie Fragen? Schreiben Sie uns.
      </span>
    </Link>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
