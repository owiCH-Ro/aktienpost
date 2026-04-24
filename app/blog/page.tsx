import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { formatDateDe, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — aktienpost.ch",
  description:
    "Regelmässige Artikel zu Anlagestrategien, Märkten und dem Schweizer Aktienmarkt. aktienpost.ch — Wissen für Privatanleger.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-16 lg:py-20">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.08] text-navy sm:text-[54px]">
            Blog — <span className="italic">Wissen für Privatanleger</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Regelmässige Artikel zu Anlagestrategien, Märkten und dem
            Schweizer Aktienmarkt.
          </p>
        </div>
      </section>

      <section>
        <div className="container py-14 lg:py-20">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-xl border border-line bg-white p-10 text-center">
              <div className="text-[11px] uppercase tracking-[0.22em] text-gold">
                In Kürze
              </div>
              <h2 className="mt-4 font-serif text-[28px] leading-tight text-navy sm:text-[32px]">
                Unsere ersten Artikel erscheinen{" "}
                <span className="italic">in Kürze</span>.
              </h2>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col rounded-xl border border-line bg-cream-dark/30 p-7 transition-colors hover:border-gold/40"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold">
                    {post.category}
                  </div>
                  <h2 className="mt-4 font-serif text-[24px] leading-tight text-navy sm:text-[26px]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-gold"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[13px] text-secondary">
                    <span>
                      {formatDateDe(post.date)} · {post.readingTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-medium text-gold hover:text-gold-dark"
                    >
                      Weiterlesen →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
