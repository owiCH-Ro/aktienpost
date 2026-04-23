"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

type PlanKey = "basis" | "plus" | "premium";

const PLANS: Array<{ value: PlanKey; label: string; price: string }> = [
  { value: "basis", label: "Basis", price: "CHF 49 / Monat" },
  { value: "plus", label: "Plus", price: "CHF 99 / Monat" },
  { value: "premium", label: "Premium", price: "CHF 149 / Monat" },
];

const isPlan = (v: string | undefined): v is PlanKey =>
  v === "basis" || v === "plus" || v === "premium";

export function RegisterForm({ defaultPlan }: { defaultPlan?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const initialPlan: PlanKey = isPlan(defaultPlan) ? defaultPlan : "plus";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      vorname: String(fd.get("vorname") || ""),
      nachname: String(fd.get("nachname") || ""),
      email: String(fd.get("email") || ""),
      plan: String(fd.get("plan") || ""),
      telefon: String(fd.get("telefon") || ""),
      referral: String(fd.get("referral") || ""),
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
      if (data?.error === "rate_limited") {
        setStatus({
          kind: "error",
          message:
            "Zu viele Anmeldungen von dieser Verbindung. Bitte versuchen Sie es in einer Stunde erneut.",
        });
        return;
      }
      setStatus({
        kind: "error",
        message:
          "Die Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@aktienpost.ch.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Die Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@aktienpost.ch.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-xl border border-bullish/30 bg-bullish/5 p-8">
        <h3 className="font-serif text-[22px] text-navy">
          Vielen Dank für Ihre Anmeldung!
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Vorname"
          name="vorname"
          type="text"
          autoComplete="given-name"
          required
          error={fieldErrors.vorname}
        />
        <Field
          label="Nachname"
          name="nachname"
          type="text"
          autoComplete="family-name"
          required
          error={fieldErrors.nachname}
        />
      </div>

      <Field
        label="E-Mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          Gewünschter Plan
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {PLANS.map((p) => (
            <PlanOption
              key={p.value}
              value={p.value}
              label={p.label}
              price={p.price}
              defaultChecked={p.value === initialPlan}
            />
          ))}
        </div>
        {fieldErrors.plan && <ErrorMsg>{fieldErrors.plan}</ErrorMsg>}
      </fieldset>

      <Field
        label="Telefonnummer (optional)"
        name="telefon"
        type="tel"
        autoComplete="tel"
        error={fieldErrors.telefon}
      />

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          Wie sind Sie auf aktienpost.ch aufmerksam geworden?
          <span className="ml-2 normal-case tracking-normal text-muted">
            (optional)
          </span>
        </span>
        <textarea
          name="referral"
          rows={4}
          className={inputClass(!!fieldErrors.referral)}
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
        {submitting ? "Wird gesendet …" : "Jetzt anmelden"}
      </button>

      <p className="text-[12px] leading-relaxed text-muted">
        Nach dem Absenden melden wir uns innerhalb von 24 Stunden, um Ihr
        Abonnement zu aktivieren. Mit dem Absenden akzeptieren Sie unsere{" "}
        <a className="underline underline-offset-2 hover:text-navy" href="/agb">
          AGB
        </a>{" "}
        und{" "}
        <a className="underline underline-offset-2 hover:text-navy" href="/datenschutz">
          Datenschutzerklärung
        </a>
        .
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Plan radio card
// ---------------------------------------------------------------------------

function PlanOption({
  value,
  label,
  price,
  defaultChecked,
}: {
  value: PlanKey;
  label: string;
  price: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="group relative flex cursor-pointer flex-col gap-1 rounded-lg border border-line bg-cream-dark/20 px-4 py-3 transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/5">
      <input
        type="radio"
        name="plan"
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="font-serif text-[17px] text-navy">{label}</span>
      <span className="text-[12px] uppercase tracking-[0.15em] text-secondary">
        {price}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 h-3 w-3 rounded-full border border-line bg-white transition-all peer-checked:border-gold peer-checked:bg-gold"
      />
    </label>
  );
}

// ---------------------------------------------------------------------------
// Small presentational helpers
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
