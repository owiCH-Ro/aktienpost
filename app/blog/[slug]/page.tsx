import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import {
  formatDateDe,
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/blog";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Artikel nicht gefunden — aktienpost.ch" };
  }
  return {
    title: `${post.title} — aktienpost.ch`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <PageShell>
      <section className="border-b border-line">
        <div className="container py-12 lg:py-16">
          <div className="mx-auto max-w-[720px]">
            <Link
              href="/blog"
              className="text-[13px] text-secondary hover:text-navy"
            >
              ← Zurück zum Blog
            </Link>
            <div className="mt-8 text-[11px] uppercase tracking-[0.22em] text-gold">
              {post.category}
            </div>
            <h1 className="mt-4 font-serif text-[34px] leading-[1.12] text-navy sm:text-[44px]">
              {post.title}
            </h1>
            <p className="mt-6 text-[13px] text-secondary">
              {formatDateDe(post.date)} · {post.readingTime}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-10 sm:py-14 lg:py-20">
          <article
            className="blog-article mx-auto max-w-[720px]"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mx-auto mt-16 max-w-[720px] rounded-xl border border-gold/30 bg-gold/5 p-8 text-center">
            <h2 className="font-serif text-[24px] leading-tight text-navy sm:text-[28px]">
              Überzeugt? Testen Sie aktienpost.ch{" "}
              <span className="italic">30 Tage kostenlos</span>.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
              30 Tage Geld-zurück-Garantie. Kündigung jederzeit möglich.
            </p>
            <Link
              href="/anmelden"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-gold-dark"
            >
              Jetzt anmelden
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
