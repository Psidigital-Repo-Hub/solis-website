import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Wordmark with a chevron accent over the "i" — echoing the chevron motif
 * that runs through the rest of the design.
 */
export function Logo({
  className,
  tone = "default",
  href = "/",
}: {
  className?: string;
  tone?: "default" | "onBrand";
  href?: string;
}) {
  const onBrand = tone === "onBrand";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex shrink-0 flex-col leading-none",
        "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4",
        onBrand ? "focus-visible:outline-white" : "focus-visible:outline-brand-500",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className={cn(
          "relative font-sans text-[27px] font-semibold tracking-[-0.03em]",
          onBrand ? "text-white" : "text-ink-800",
        )}
      >
        sol
        <span className="relative">
          i
          <svg
            viewBox="0 0 24 14"
            aria-hidden
            className={cn(
              "absolute -top-[7px] left-1/2 h-[8px] w-[13px] -translate-x-1/2",
              "transition-transform duration-300 group-hover:-translate-y-[2px]",
            )}
          >
            <path
              d="M2 12 L12 2 L22 12"
              fill="none"
              stroke="#2e6be6"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        s
      </span>
      <span
        className={cn(
          "mt-[3px] font-sans text-[10px] font-semibold uppercase tracking-[0.42em]",
          onBrand ? "text-white/75" : "text-ink-500",
        )}
      >
        Medical
      </span>
    </Link>
  );
}
