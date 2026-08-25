import * as React from "react";

import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Component = "div",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
}) {
  return <Component className={cn("container-page", className)} {...props} />;
}

type SectionTone = "default" | "pale" | "tint" | "brand";

const tones: Record<SectionTone, string> = {
  default: "bg-white",
  pale: "surface-pale",
  tint: "surface-tint",
  brand: "surface-brand text-white",
};

const spacing = {
  sm: "py-14 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
} as const;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  space?: keyof typeof spacing;
  /** Renders the container internally. Set false for full-bleed children. */
  contained?: boolean;
  containerClassName?: string;
}

export function Section({
  tone = "default",
  space = "md",
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative isolate", tones[tone], spacing[space], className)}
      {...props}
    >
      {contained ? (
        <Container className={cn("relative", containerClassName)}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
