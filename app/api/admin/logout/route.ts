import { NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "aktienpost_admin";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/dashboard", req.url), {
    status: 303,
  });
  // Overwrite with an expired cookie to clear.
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
