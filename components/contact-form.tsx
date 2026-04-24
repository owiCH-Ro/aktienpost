"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const BETREFF_OPTIONS = [
  "Allgemeine Frage",
  "Frage zu einer Strategie",
  "Technisches Problem",
  "Kündigung/Abo",
  "Sonstiges",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // Controlled because the phone input only renders when the user
  // asks to be called back — keeps the base form lean.
  const [wantsPhone, setWantsPhone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      betreff: String(fd.get("betreff") || ""),
      nachricht: String(fd.get("nachricht") || ""),
      wantsPhone: fd.get("wantsPhone") === "on",
      phone: String(fd.get("phone") || ""),
      wantsDemo: fd.get("wantsDemo") === "on",
      website: String(fd.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "success" });
        form.reset();
        return;
      }
      if (data?.error === "validation" && data.fields) {
        setFieldErrors(data.fields);
        setStatus({ kind: "idle" });
        return;
      }
      if (data?.error === "rate_limited") {
        setStatus({
          kind: "error",
          message:
            "Sie haben das Nachrichten-Limit für diese Stunde erreicht. Bitte versuchen Sie es später erneut.",
        });
        return;
      }
      setStatus({
        kind: "error",
        message:
          "Leider konnte Ihre Nachricht nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@aktienpost.ch.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Leider konnte Ihre Nachricht nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@aktienpost.ch.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-xl border border-bullish/30 bg-bullish/5 p-8">
        <h3 className="font-serif text-[22px] text-navy">Nachricht gesendet.</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/85">
          Vielen Dank für Ihre Nachricht. Wir antworten in der Regel innerhalb
          von 24 Stunden.
        </p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-xl border border-line bg-white p-8"
      noValidate
    >
      <Field
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        required
        error={fieldErrors.name}
      />
      <Field
        label="E-Mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          Betreff
        </span>
        <select
          name="betreff"
          defaultValue=""
          required
          className={inputClass(!!fieldErrors.betreff)}
        >
          <option value="" disabled>
            Bitte wählen …
          </option>
          {BETREFF_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {fieldErrors.betreff && <ErrorMsg>{fieldErrors.betreff}</ErrorMsg>}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          Nachricht
        </span>
        <textarea
          name="nachricht"
          required
          rows={7}
          className={inputClass(!!fieldErrors.nachricht)}
        />
        {fieldErrors.nachricht && <ErrorMsg>{fieldErrors.nachricht}</ErrorMsg>}
      </label>

      {/* Optional call-back + demo checkboxes. Both funnel through
          to the /api/contact email body so Oliver can triage faster. */}
      <div className="flex flex-col gap-3 rounded-lg border border-line bg-cream-dark/30 px-4 py-4">
        <label className="flex items-start gap-3 text-[14px] leading-relaxed text-ink/85">
          <input
            type="checkbox"
            name="wantsPhone"
            checked={wantsPhone}
            onChange={(e) => setWantsPhone(e.target.checked)}
            className="mt-[3px] h-4 w-4 flex-none accent-gold"
          />
          <span>Ich möchte telefonisch kontaktiert werden</span>
        </label>

        {wantsPhone && (
          <label className="mt-1 flex flex-col gap-2 pl-7">
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              Telefonnummer
            </span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+41 …"
              className={inputClass(!!fieldErrors.phone)}
            />
            {fieldErrors.phone && <ErrorMsg>{fieldErrors.phone}</ErrorMsg>}
          </label>
        )}

        <label className="flex items-start gap-3 text-[14px] leading-relaxed text-ink/85">
          <input
            type="checkbox"
            name="wantsDemo"
            className="mt-[3px] h-4 w-4 flex-none accent-gold"
          />
          <span>
            Ich möchte eine persönliche Vorführung der Strategien (ca.
            15&nbsp;Min.)
          </span>
        </label>
      </div>

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

      {status.kind === "error" && (
        <p className="rounded-md border border-bearish/30 bg-bearish/5 px-4 py-3 text-[14px] text-bearish">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="self-start inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {submitting ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Small presentational helpers (shared across auth forms below if needed).
// ---------------------------------------------------------------------------

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-md border bg-cream-dark/20 px-4 py-2.5 text-[15px] text-ink",
    "placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40",
    hasError ? "border-bearish/60" : "border-line",
  ].join(" ");
}

function Field(props: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
        {props.label}
      </span>
      <input
        name={props.name}
        type={props.type}
        autoComplete={props.autoComplete}
        required={props.required}
        className={inputClass(!!props.error)}
      />
      {props.error && <ErrorMsg>{props.error}</ErrorMsg>}
    </label>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return <span className="text-[13px] text-bearish">{children}</span>;
}
