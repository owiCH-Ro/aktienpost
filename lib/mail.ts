/** Thin Resend wrapper used by the contact and registration API routes.
 *
 * Throws descriptive errors when RESEND_API_KEY is missing so
 * mis-deployments fail loud at the first send attempt instead of
 * silently dropping mail. */

import { Resend } from "resend";

let cached: Resend | null = null;

function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  cached = new Resend(key);
  return cached;
}

export interface SendArgs {
  from: string;
  to: string;
  subject: string;
  text: string;
  /** Optional Reply-To header — useful for the contact form so Oliver
   * can reply to the visitor directly. */
  replyTo?: string;
}

export async function sendPlainEmail(args: SendArgs): Promise<void> {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: args.from,
    to: args.to,
    subject: args.subject,
    text: args.text,
    replyTo: args.replyTo,
  });
  if (error) {
    throw new Error(`Resend error: ${error.message || "unknown"}`);
  }
  if (!data?.id) {
    throw new Error("Resend did not return a message id");
  }
}
