"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const PLANS = [
  { value: "basis", label: "Basis — CHF 49 / Monat" },
  { value: "plus", label: "Plus — CHF 99 / Monat" },
  { value: "premium", label: "Premium — CHF 149 / Monat" },
] as const;

export function RegisterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
      plan: String(fd.get("plan") || ""),
      website: String(fd.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/register", {
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
      if (data?.error === "email_exists") {
        setFieldErrors({
          email:
            "Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich an oder verwenden Sie eine andere Adresse.",
        });
        setStatus({ kind: "idle" });
        return;
      }
      if (data?.error === "rate_limited") {
        setStatus({
          kind: "error",
          message:
            "Zu viele Registrierungsversuche. Bitte versuchen Sie es später erneut.",
        });
        return;
      }
      setStatus({
        kind: "error",
        message:
          "Die Registrierung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@aktienpost.ch.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Die Registrierung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@aktienpost.ch.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-xl border border-bullish/30 bg-bullish/5 p-8">
        <h3 className="font-serif text-[22px] text-navy">
          Vielen Dank für Ihre Registrierung.
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/85">
          Wir werden uns innerhalb von 24 Stunden bei Ihnen melden, um Ihr
          Abonnement zu aktivieren.
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
      <Field
        label="Passwort (min. 8 Zeichen)"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        error={fieldErrors.password}
      />

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          Gewünschter Plan
        </span>
        <select
          name="plan"
          defaultValue=""
          required
          className={inputClass(!!fieldErrors.plan)}
        >
          <option value="" disabled>
            Bitte wählen …
          </option>
          {PLANS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {fieldErrors.plan && <ErrorMsg>{fieldErrors.plan}</ErrorMsg>}
      </label>

      {/* Honeypot */}
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
        {submitting ? "Wird registriert …" : "Registrieren"}
      </button>

      <p className="text-[12px] leading-relaxed text-muted">
        Mit der Registrierung akzeptieren Sie unsere{" "}
        <a className="underline underline-offset-2 hover:text-navy" href="/agb">
          AGB
        </a>{" "}
        und{" "}
        <a className="underline underline-offset-2 hover:text-navy" href="/datenschutz">
          Datenschutzerklärung
        </a>
        . Die 30-tägige Geld-zurück-Garantie beginnt mit der Aktivierung
        Ihres Abonnements.
      </p>
    </form>
  );
}

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
