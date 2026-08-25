import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDateShort } from "@/lib/utils";
import type { Article } from "@/types";
import { CategoryChip } from "@/components/ui/card";

export function ArticleCard({
  article,
  className,
  featured = false,
  headingAs: Heading = "h3",
}: {
  article: Article;
  className?: string;
  featured?: boolean;
  /** Raise to h2 when the card sits directly beneath the page h1. */
  headingAs?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white",
        "transition-[border-color,box-shadow,transform] duration-300",
        "hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_50px_-32px_rgba(21,50,107,0.6)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-ink-100",
          featured ? "aspect-[16/9]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4">
          <CategoryChip>{article.category}</CategoryChip>
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-8" : "p-6")}>
        <Heading
          className={cn(
            "font-sans font-bold tracking-[-0.02em] text-ink-800",
            featured ? "text-[24px] leading-[1.22]" : "text-[17px] leading-[1.3]",
          )}
        >
          {article.title}
        </Heading>

        <p
          className={cn(
            "type-body mt-3 flex-1",
            featured ? "text-[15px]" : "text-[13.5px]",
          )}
        >
          {article.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-100 pt-5">
          <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
            <Image
              src={article.author.avatar}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-sans text-[13px] font-bold text-ink-700">
              {article.author.name}
            </span>
            <span className="flex items-center gap-1.5 font-body text-[12px] text-ink-500">
              <time dateTime={article.publishedAt}>
                {formatDateShort(article.publishedAt)}
              </time>
              <span aria-hidden>·</span>
              <Clock className="size-3" aria-hidden />
              {article.readingTime} min read
            </span>
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-brand-500 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
