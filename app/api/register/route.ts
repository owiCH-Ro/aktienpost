import { NextResponse } from "next/server";

import { sendPlainEmail } from "@/lib/mail";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getServerAdminSupabase } from "@/lib/supabase";

// Node runtime — Resend and supabase-js require it.
export const runtime = "nodejs";

interface RegisterPayload {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  plan?: unknown; // desired plan: basis | plus | premium
  website?: unknown; // honeypot
}

const ALLOWED_PLANS = ["basis", "plus", "premium"] as const;
type Plan = (typeof ALLOWED_PLANS)[number];

const PLAN_LABEL: Record<Plan, string> = {
  basis: "Basis (CHF 49/Monat)",
  plus: "Plus (CHF 99/Monat)",
  premium: "Premium (CHF 149/Monat)",
};

const FROM = "aktienpost.ch Registrierungen <registrierungen@aktienpost.ch>";
const NOTIFY_TO = "info@aktienpost.ch";

// 5 registrations per IP per hour — accommodates accidental retries
// without opening the door to mass signup abuse.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`register:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: RegisterPayload;
  try {
    body = (await req.json()) as RegisterPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, suppressed: true });
  }

  const name = str(body.name, 100);
  const email = str(body.email, 254);
  const password = typeof body.password === "string" ? body.password : "";
  const planRaw = typeof body.plan === "string" ? body.plan.toLowerCase().trim() : "";
  const plan: Plan | null = (ALLOWED_PLANS as readonly string[]).includes(planRaw)
    ? (planRaw as Plan)
    : null;

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Bitte geben Sie Ihren Namen an.";
  if (!email || !isEmail(email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (!password || password.length < 8) errors.password = "Passwort mindestens 8 Zeichen.";
  if (!plan) errors.plan = "Bitte wählen Sie einen Plan.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 400 });
  }

  // --- Create auth user (service role) ---
  const supa = getServerAdminSupabase();
  const { data: created, error: createErr } = await supa.auth.admin.createUser({
    email: email!,
    password,
    email_confirm: true, // user is ready to log in immediately
    user_metadata: { name, requested_plan: plan },
  });

  if (createErr || !created?.user) {
    const message = createErr?.message || "unknown";
    // Map the common "already exists" case to a dedicated error code so
    // the client can show a friendly hint.
    const duplicate = /already.*registered|already exists|duplicate/i.test(message);
    return NextResponse.json(
      {
        ok: false,
        error: duplicate ? "email_exists" : "signup_failed",
        message,
      },
      { status: duplicate ? 409 : 500 },
    );
  }

  // --- Insert profile row (RLS bypassed via service role) ---
  const { error: profileErr } = await supa.from("profiles").insert({
    id: created.user.id,
    email: email!,
    name,
    plan: "none", // plan stays "none" until Oliver manually activates
  });

  if (profileErr) {
    // Best effort: log and continue. The user exists in auth; Oliver can
    // insert the profile row manually. We don't delete the auth row here
    // to avoid cascading failures.
    console.error("profile insert failed", profileErr);
  }

  // --- Notify Oliver via Resend ---
  try {
    await sendPlainEmail({
      from: FROM,
      to: NOTIFY_TO,
      subject: `[aktienpost.ch] Neue Registrierung: ${name} (${email}) — Plan: ${PLAN_LABEL[plan!]}`,
      text:
        `Neue Registrierung via aktienpost.ch\n\n` +
        `Name:    ${name}\n` +
        `E-Mail:  ${email}\n` +
        `Plan:    ${PLAN_LABEL[plan!]}\n` +
        `User ID: ${created.user.id}\n` +
        `\n` +
        `Aktion: Bitte in Supabase den Plan aktivieren und den ` +
        `Kunden informieren.\n`,
      replyTo: email!,
    });
  } catch (err) {
    // Don't fail the registration itself if the notification email
    // couldn't be sent — the user is already created and can be
    // followed up manually.
    console.error("notification email failed", err);
  }

  return NextResponse.json({ ok: true });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
