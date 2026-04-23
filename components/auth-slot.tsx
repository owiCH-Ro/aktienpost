"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getBrowserSupabase } from "@/lib/supabase";

type AuthState =
  | { kind: "loading" }
  | { kind: "anonymous" }
  | { kind: "signed-in"; email: string };

/** The right-hand slot of the nav: shows either the "Anmelden" link or
 * the current user's email with an "Abmelden" button. Subscribes to
 * Supabase auth-state changes so logout in one tab updates the nav in
 * another. */
export function AuthSlot({ className = "" }: { className?: string }) {
  const [state, setState] = useState<AuthState>({ kind: "loading" });
  const router = useRouter();

  useEffect(() => {
    const supabase = getBrowserSupabase();

    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      const email = data.user?.email;
      setState(email ? { kind: "signed-in", email } : { kind: "anonymous" });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email;
      setState(email ? { kind: "signed-in", email } : { kind: "anonymous" });
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    router.refresh();
  }

  if (state.kind === "loading") {
    // Render an empty slot with the same width hints so the nav doesn't
    // jump when the auth state resolves.
    return (
      <span
        aria-hidden
        className={["inline-block h-5 w-24 opacity-0", className].join(" ")}
      />
    );
  }

  if (state.kind === "anonymous") {
    return (
      <Link
        href="/anmelden"
        className={["text-[15px] text-ink/80 transition-colors hover:text-navy", className].join(
          " ",
        )}
      >
        Anmelden
      </Link>
    );
  }

  return (
    <span className={["flex items-center gap-3", className].join(" ")}>
      <span
        className="hidden sm:inline text-[13px] text-secondary"
        title={state.email}
      >
        {state.email}
      </span>
      <button
        type="button"
        onClick={logout}
        className="text-[14px] text-ink/80 transition-colors hover:text-navy"
      >
        Abmelden
      </button>
    </span>
  );
}
