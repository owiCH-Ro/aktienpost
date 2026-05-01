"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

type Theme = "light" | "dark";

interface Props {
  /** Tracking source — must be in ALLOWED_SOURCES on /api/newsletter. */
  source: "homepage" | "performance_page" | "blog" | "kontakt" | "footer";
  /** Light: cream background context (hero, page body).
   *  Dark:  navy background context (CTA blocks). */
  theme?: Theme;
  /** Submit button label. Defaults to "Kostenlos anmelden". */
  ctaLabel?: string;
  /** Override the success-state copy. */
  successText?: string;
  /** Optional className on the outer wrapper for layout tweaks. */
  className?: string;
}

const DEFAULT_SUCCESS = "Danke! Du erhältst den Teardown in Kürze per Email.";

const ERROR_COPY: Record<string, string> = {
  invalid_email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
  duplicate: "Diese Email ist bereits registriert.",
  rate_limited: "Zu viele Anmeldungen — bitte später erneut versuchen.",
  not_configured: "Anmeldung gerade nicht verfügbar — bitte später erneut versuchen.",
  insert_failed: "Anmeldung fehlgeschlagen. Bitte später erneut versuchen.",
  network: "Netzwerkfehler. Bitte erneut versuchen.",
};

export function EmailCapture({
  source,
  theme = "light",
  ctaLabel = "Kostenlos anmelden",
  successText = DEFAULT_SUCCESS,
  className,
}: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    const fd = new FormData(e.currentTarget);
    const honeypot = String(fd.get("website") || "");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source,
          website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "success" });
        return;
      }
      const code = data?.error || "insert_failed";
      setStatus({
        kind: "error",
        message: ERROR_COPY[code] || ERROR_COPY.insert_failed,
      });
    } catch {
      setStatus({ kind: "error", message: ERROR_COPY.network });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        className={[
          "rounded-md px-5 py-4 text-[15px] leading-relaxed",
          theme === "dark"
            ? "border border-gold/40 bg-gold/10 text-cream"
            : "border border-bullish/30 bg-bullish/5 text-navy",
          className ?? "",
        ].join(" ")}
        role="status"
      >
        {successText}
      </div>
    );
  }

  // Theme-driven input + button styling. Both themes share rounded-md
  // and the same min-height so the form sits well inside both the
  // cream hero and the dark CTA section.
  const inputCls =
    theme === "dark"
      ? "w-full rounded-md border border-cream/20 bg-cream/10 px-4 py-3 text-[16px] text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-gold/60 sm:text-[15px]"
      : "w-full rounded-md border border-line bg-cream-dark/20 px-4 py-3 text-[16px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 sm:text-[15px]";
  const buttonCls =
    "inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-gold px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60 sm:w-auto sm:text-[15px]";

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={["flex flex-col gap-3 sm:flex-row sm:items-start", className ?? ""].join(" ")}
    >
      <label className="flex-1">
        <span className="sr-only">E-Mail</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="ihre@email.ch"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </label>

      {/* Honeypot — hidden to humans, irresistible to naive bots. */}
      <label
        className="hidden"
        aria-hidden
        tabIndex={-1}
        style={{ position: "absolute", left: "-9999px" }}
      >
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>

      <button type="submit" disabled={submitting} className={buttonCls}>
        {submitting ? "Wird gesendet …" : ctaLabel}
      </button>

      {status.kind === "error" && (
        <p
          role="alert"
          className={
            theme === "dark"
              ? "basis-full text-[14px] text-bearish"
              : "basis-full text-[14px] text-bearish"
          }
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
