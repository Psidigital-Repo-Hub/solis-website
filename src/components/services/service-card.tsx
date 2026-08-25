import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { IconBadge } from "@/components/ui/card";

/**
 * Service card. The whole card is a single link, so there is one tab stop
 * and one predictable target rather than a nested link inside a link.
 */
export function ServiceCard({
  service,
  className,
  headingAs: Heading = "h3",
}: {
  service: Service;
  className?: string;
  /** Raise to h2 when the card sits directly beneath the page h1. */
  headingAs?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-7 sm:p-8",
        "transition-[border-color,box-shadow,transform] duration-300",
        "hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_50px_-32px_rgba(21,50,107,0.6)]",
        className,
      )}
    >
      <IconBadge name={service.icon} size="lg" />

      <Heading className="type-h3 mt-6 text-ink-800">{service.name}</Heading>
      <p className="type-body mt-3 flex-1">{service.summary}</p>

      <span className="mt-6 inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.09em] text-brand-600">
        Explore {service.name.toLowerCase()}
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}
