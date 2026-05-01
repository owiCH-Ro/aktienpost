import { NextResponse } from "next/server";

import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

interface Payload {
  email?: unknown;
  source?: unknown;
  /** Honeypot — real users leave empty, bots fill. */
  website?: unknown;
}

// Generous compared to /api/contact (3/hour) because the newsletter
// signup is the primary conversion path, but still capped to deter
// scraping bots.
const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const ALLOWED_SOURCES = new Set([
  "homepage",
  "performance_page",
  "blog",
  "kontakt",
  "footer",
]);

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`newsletter:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: silently accept so bots don't see a 4xx.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, suppressed: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const sourceRaw = typeof body.source === "string" ? body.source : "";
  const source = ALLOWED_SOURCES.has(sourceRaw) ? sourceRaw : "homepage";

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("newsletter: supabase not configured", err);
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email, source });

  if (error) {
    // PostgREST conflict on UNIQUE(email) → return a friendly status
    // so the form can render the localised message.
    const code = (error as { code?: string }).code;
    if (code === "23505" || code === "409") {
      return NextResponse.json(
        { ok: false, error: "duplicate" },
        { status: 409 },
      );
    }
    console.error("newsletter: insert failed", error);
    return NextResponse.json(
      { ok: false, error: "insert_failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
