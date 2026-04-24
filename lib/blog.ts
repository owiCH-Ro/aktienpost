import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

// Blog posts live as Markdown files with YAML frontmatter in /content/blog.
// Keeping this file-based (rather than a CMS) means posts are versioned with
// the rest of the codebase and require zero infrastructure.

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFrontmatter {
  title: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  readingTime: string;
  excerpt: string;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  /** Rendered HTML body (markdown → HTML). */
  html: string;
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

function readPostFile(slug: string): { data: BlogFrontmatter; content: string } {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  return {
    data: parsed.data as BlogFrontmatter,
    content: parsed.content,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { data } = readPostFile(slug);
      return { slug, ...data };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const { data, content } = readPostFile(slug);
    const html = marked.parse(content, { async: false }) as string;
    return { slug, ...data, html };
  } catch {
    return null;
  }
}

/** Format a yyyy-mm-dd date as Swiss German long-form ("25. April 2026"). */
export function formatDateDe(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
