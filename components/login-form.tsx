"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { getBrowserSupabase } from "@/lib/supabase";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

export function LoginForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "submitting" });

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!email || !password) {
      setStatus({
        kind: "error",
        message: "Bitte geben Sie E-Mail und Passwort an.",
      });
      return;
    }

    const supabase = getBrowserSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus({
        kind: "error",
        message:
          "Anmeldung fehlgeschlagen. Bitte prüfen Sie E-Mail und Passwort.",
      });
      return;
    }

    // Refresh the server-component tree so the nav picks up the new session.
    router.refresh();
    router.push("/");
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-xl border border-line bg-white p-8"
      noValidate
    >
      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          E-Mail
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-md border border-line bg-cream-dark/20 px-4 py-2.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
          Passwort
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-line bg-cream-dark/20 px-4 py-2.5 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-gold/40"
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
        {submitting ? "Anmelden …" : "Anmelden"}
      </button>

      <p className="text-[13px] text-secondary">
        Noch kein Konto?{" "}
        <a className="underline underline-offset-2 hover:text-navy" href="/anmelden">
          Jetzt registrieren
        </a>
        .
      </p>
    </form>
  );
}
