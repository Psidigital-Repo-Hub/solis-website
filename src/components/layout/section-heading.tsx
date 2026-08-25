import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Leading words, rendered in ink. */
  title: string;
  /** Trailing words, rendered in brand blue. Mirrors the reference's
   *  two-tone headline treatment. */
  accent?: string;
  eyebrow?: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "onBrand";
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h1" | "h2" | "h3";
  className?: string;
  children?: React.ReactNode;
}

const sizeClass = {
  display: "type-display",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
} as const;

export function SectionHeading({
  title,
  accent,
  eyebrow,
  description,
  align = "left",
  tone = "default",
  as: Tag = "h2",
  size = "h2",
  className,
  children,
}: SectionHeadingProps) {
  const onBrand = tone === "onBrand";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "type-eyebrow mb-4",
            onBrand ? "text-white/80" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <Tag
        className={cn(
          sizeClass[size],
          onBrand ? "text-white" : "text-ink-800",
        )}
      >
        {title}
        {accent ? (
          <>
            {" "}
            {/* On blue the two-tone treatment is dropped: a tinted accent
                cannot hold enough contrast against the brand field. */}
            <span className={onBrand ? "text-white" : "text-brand-500"}>
              {accent}
            </span>
          </>
        ) : null}
      </Tag>

      {description ? (
        <div
          className={cn(
            "type-lead mt-5 max-w-[58ch]",
            onBrand && "text-white/85",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </div>
      ) : null}

      {children}
    </div>
  );
}
