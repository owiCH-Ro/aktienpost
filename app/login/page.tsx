import type { Metadata } from "next";

import { LoginForm } from "@/components/login-form";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Anmelden — aktienpost.ch",
  description: "Melden Sie sich bei Ihrem aktienpost.ch-Konto an.",
};

export default function LoginPage() {
  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Anmelden</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Willkommen <span className="italic">zurück</span>.
          </h1>
        </div>
      </section>

      <section>
        <div className="container py-14 lg:py-20">
          <div className="mx-auto max-w-md">
            <LoginForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
