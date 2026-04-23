import { NextResponse } from "next/server";

import { sendPlainEmail } from "@/lib/mail";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Run on the Node runtime (Resend SDK uses Node APIs).
export const runtime = "nodejs";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  betreff?: unknown;
  nachricht?: unknown;
  /** Honeypot field. Real users leave this empty — bots fill it. */
  website?: unknown;
}

const ALLOWED_BETREFF = new Set([
  "Allgemeine Frage",
  "Frage zu einer Strategie",
  "Technisches Problem",
  "Kündigung/Abo",
  "Sonstiges",
]);

const FROM = "aktienpost.ch Kontakt <kontakt@aktienpost.ch>";
const TO = "info@aktienpost.ch";

// 3 submissions per IP per hour.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  // --- Rate limit ---
  const ip = getClientIp(req);
  const rl = checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  // --- Parse body ---
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // --- Honeypot: silently accept (look successful to the bot) ---
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, suppressed: true });
  }

  // --- Validate ---
  const name = str(body.name, 100);
  const email = str(body.email, 254);
  const betreff = str(body.betreff, 64);
  const nachricht = str(body.nachricht, 5000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Bitte geben Sie Ihren Namen an.";
  if (!email || !isEmail(email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (!betreff || !ALLOWED_BETREFF.has(betreff)) errors.betreff = "Bitte wählen Sie einen Betreff.";
  if (!nachricht || nachricht.length < 10) errors.nachricht = "Bitte schreiben Sie eine kurze Nachricht (mind. 10 Zeichen).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 400 });
  }

  // --- Send ---
  const subject = `[aktienpost.ch Kontakt] ${betreff} von ${name}`;
  const text =
    `Neue Kontaktanfrage via aktienpost.ch\n\n` +
    `Name:     ${name}\n` +
    `E-Mail:   ${email}\n` +
    `Betreff:  ${betreff}\n` +
    `\n` +
    `Nachricht:\n` +
    `-----------\n` +
    `${nachricht}\n`;

  try {
    await sendPlainEmail({
      from: FROM,
      to: TO,
      subject,
      text,
      replyTo: email!,
    });
  } catch (err) {
    console.error("contact send failed", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function isEmail(v: string): boolean {
  // Intentionally permissive — Resend will reject anything malformed server-side.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
