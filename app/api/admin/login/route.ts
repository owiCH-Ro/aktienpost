import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "aktienpost_admin";
// 30 days in seconds.
const MAX_AGE = 30 * 24 * 60 * 60;

/** Constant-time password comparison to avoid leaking timing signals
 * about the expected password's length or prefix. */
function passwordMatches(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 500 },
    );
  }

  // Accept both JSON (fetch) and form-encoded (plain <form> fallback).
  let provided = "";
  const contentType = req.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as { password?: unknown };
      provided = typeof body.password === "string" ? body.password : "";
    } else {
      const fd = await req.formData();
      provided = String(fd.get("password") ?? "");
    }
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (!passwordMatches(provided, expected)) {
    // Redirect back with a query flag so the page can show an error.
    return NextResponse.redirect(new URL("/dashboard?error=1", req.url), {
      status: 303,
    });
  }

  const res = NextResponse.redirect(new URL("/dashboard", req.url), {
    status: 303,
  });
  res.cookies.set({
    name: COOKIE_NAME,
    value: "true",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
