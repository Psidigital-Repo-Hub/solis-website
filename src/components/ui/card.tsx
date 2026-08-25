import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-ink-200 bg-white",
        className,
      )}
      {...props}
    />
  );
}

const badgeSizes = {
  sm: "size-9 [&_svg]:size-4",
  md: "size-12 [&_svg]:size-[22px]",
  lg: "size-14 [&_svg]:size-6",
} as const;

/** Circular green icon badge — the recurring accent mark of the design. */
export function IconBadge({
  name,
  size = "md",
  tone = "clinic",
  className,
}: {
  name: string;
  size?: keyof typeof badgeSizes;
  tone?: "clinic" | "brand" | "brandSoft";
  className?: string;
}) {
  const tones = {
    clinic: "bg-clinic-500 text-white",
    brand: "bg-brand-500 text-white",
    brandSoft: "bg-brand-50 text-brand-600",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        badgeSizes[size],
        tones[tone],
        className,
      )}
    >
      <Icon name={name} strokeWidth={1.9} />
    </span>
  );
}

/** Small uppercase category chip used over article imagery. */
export function CategoryChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] bg-ink-800/90 px-2.5 py-1",
        "text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Neutral pill used for metadata such as languages or focus areas. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink-200 bg-ink-50 px-3 py-1",
        "text-[12px] font-semibold text-ink-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
