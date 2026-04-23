import { NextResponse } from "next/server";

import { sendPlainEmail } from "@/lib/mail";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Node runtime — Resend SDK uses Node APIs.
export const runtime = "nodejs";

interface RegisterPayload {
  vorname?: unknown;
  nachname?: unknown;
  email?: unknown;
  plan?: unknown;
  telefon?: unknown;
  referral?: unknown;
  /** Honeypot — real users leave this empty. */
  website?: unknown;
}

const ALLOWED_PLANS = ["basis", "plus", "premium"] as const;
type Plan = (typeof ALLOWED_PLANS)[number];

const PLAN_LABEL: Record<Plan, string> = {
  basis: "Basis (CHF 49/Monat)",
  plus: "Plus (CHF 99/Monat)",
  premium: "Premium (CHF 149/Monat)",
};

const FROM = "aktienpost.ch Anmeldungen <registrierung@aktienpost.ch>";
const TO = "info@aktienpost.ch";

// 5 sign-ups per IP per hour — accommodates accidental retries without
// opening the door to mass-signup spam.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  // --- Rate limit ---
  const ip = getClientIp(req);
  const rl = checkRateLimit(`register:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  // --- Parse body ---
  let body: RegisterPayload;
  try {
    body = (await req.json()) as RegisterPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // --- Honeypot: silently accept so the bot thinks it succeeded ---
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, suppressed: true });
  }

  // --- Validate ---
  const vorname = str(body.vorname, 80);
  const nachname = str(body.nachname, 80);
  const email = str(body.email, 254);
  const telefon = str(body.telefon, 40); // optional
  const referral = str(body.referral, 2000); // optional
  const planRaw =
    typeof body.plan === "string" ? body.plan.toLowerCase().trim() : "";
  const plan: Plan | null = (ALLOWED_PLANS as readonly string[]).includes(planRaw)
    ? (planRaw as Plan)
    : null;

  const errors: Record<string, string> = {};
  if (!vorname) errors.vorname = "Bitte geben Sie Ihren Vornamen an.";
  if (!nachname) errors.nachname = "Bitte geben Sie Ihren Nachnamen an.";
  if (!email || !isEmail(email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (!plan) errors.plan = "Bitte wählen Sie einen Plan.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: errors },
      { status: 400 },
    );
  }

  // --- Send notification ---
  const planLabel = PLAN_LABEL[plan!];
  const subject = `[aktienpost.ch] Neue Anmeldung: ${vorname} ${nachname} — ${planLabel}`;
  const text =
    `Neue Anmeldung via aktienpost.ch\n\n` +
    `Vorname:       ${vorname}\n` +
    `Nachname:      ${nachname}\n` +
    `E-Mail:        ${email}\n` +
    `Plan:          ${planLabel}\n` +
    `Telefon:       ${telefon ?? "—"}\n` +
    `\n` +
    `Wie aufmerksam geworden:\n` +
    `--------------------------\n` +
    `${referral ?? "—"}\n` +
    `\n` +
    `Aktion: Bitte innerhalb von 24 Stunden beim Kunden melden, ` +
    `um das Abonnement zu aktivieren.\n`;

  try {
    await sendPlainEmail({
      from: FROM,
      to: TO,
      subject,
      text,
      replyTo: email!,
    });
  } catch (err) {
    console.error("registration notification failed", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 },
    );
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
