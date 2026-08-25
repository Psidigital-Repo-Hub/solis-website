import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Info } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/data/articles";
import type { ArticleBlock } from "@/types";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import { SectionHeading } from "@/components/layout/section-heading";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { CategoryChip } from "@/components/ui/card";
import { ArticleCard } from "@/components/articles/article-card";
import { CtaBanner } from "@/components/sections/cta-banner";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}`,
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: article.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

/** Renders one content block. Content is authored, never user-supplied. */
function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="not-prose my-8 rounded-[var(--radius-card)] border border-brand-200 bg-brand-50 p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
            <div>
              <p className="font-sans text-[15px] font-bold text-ink-800">
                {block.title}
              </p>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink-700">
                {block.text}
              </p>
            </div>
          </div>
        </aside>
      );
    case "paragraph":
    default:
      return <p>{block.text}</p>;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author.name },
    publisher: {
      "@type": "MedicalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/articles/${article.slug}`,
  };

  return (
    <>
      {/* Header */}
      <section className="relative isolate overflow-hidden pb-10 pt-10 sm:pt-12 lg:pt-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef3fb] via-[#f6f8fc] to-white" />
          <DotField opacity="opacity-60" />
          <ChevronWatermark className="opacity-70" />
        </div>

        <Container>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.09em] text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All articles
          </Link>

          <article className="mx-auto mt-8 max-w-[46rem]">
            <CategoryChip>{article.category}</CategoryChip>

            <h1 className="type-h1 mt-5 text-ink-800">{article.title}</h1>

            <p className="type-lead mt-6">{article.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink-200 pt-6">
              <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={article.author.avatar}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0">
                <p className="font-sans text-[14.5px] font-bold text-ink-800">
                  {article.author.name}
                </p>
                <p className="font-body text-[13px] text-ink-500">
                  {article.author.role}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <time
                  dateTime={article.publishedAt}
                  className="font-body text-[13px] text-ink-500"
                >
                  {formatDate(article.publishedAt)}
                </time>
                <span className="flex items-center gap-1.5 font-body text-[13px] text-ink-500">
                  <Clock className="size-3.5" aria-hidden />
                  {article.readingTime} min read
                </span>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* Cover */}
      <Container>
        <Reveal className="mx-auto max-w-[56rem]">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[var(--radius-card)] bg-ink-100">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56rem"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay"
            />
          </div>
        </Reveal>
      </Container>

      {/* Body */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="prose-article mx-auto max-w-[46rem]">
            {article.body.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[46rem] rounded-[var(--radius-card)] border border-ink-200 bg-ink-50 p-6">
            <p className="font-body text-[13.5px] leading-relaxed text-ink-600">
              <span className="font-semibold text-ink-800">
                This article is general information.
              </span>{" "}
              It is written for a demonstration site and does not constitute
              medical advice. Always discuss your own circumstances with a
              qualified clinician before making decisions about your health.
            </p>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="surface-pale py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="max-w-[46rem]">
            <SectionHeading title="Related" accent="reading" />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id} className="h-full">
                <ArticleCard article={item} className="h-full" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner
        title="Questions about your own care?"
        description="Our teams are here to talk through anything specific to you. Get in touch and we will point you to the right person."
        ctaLabel="Contact us"
        ctaHref="/contact"
        secondaryLabel="Book an appointment"
        secondaryHref="/appointments"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
