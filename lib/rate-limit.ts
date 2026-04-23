/** Tiny in-memory IP rate limiter.
 *
 * Caveat: this only protects a single Node.js process. On Vercel's
 * serverless runtime, cold starts reset the map and concurrent lambdas
 * have independent memory, so this is a polite brake against casual
 * abuse rather than a hard limit. For the contact form's volume that
 * is sufficient; a harder limit would need Upstash / Redis.
 */

type Attempt = { at: number };
const store = new Map<string, Attempt[]>();

export interface RateLimitResult {
  allowed: boolean;
  /** Attempts already recorded in the current window (incl. the new one). */
  count: number;
  /** Limit used for the window. */
  limit: number;
}

/**
 * Record an attempt and return whether it may proceed.
 *
 * @param key     Bucket key (typically the client IP).
 * @param limit   Max attempts per window.
 * @param windowMs Window size in milliseconds.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;
  const prev = store.get(key) ?? [];
  const recent = prev.filter((a) => a.at > cutoff);

  if (recent.length >= limit) {
    store.set(key, recent);
    return { allowed: false, count: recent.length, limit };
  }

  recent.push({ at: now });
  store.set(key, recent);
  return { allowed: true, count: recent.length, limit };
}

/** Derive the caller's IP from a Next.js Request. Falls back to a
 * deterministic placeholder so unknown clients still share a bucket. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
