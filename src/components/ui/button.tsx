import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Buttons follow the reference art direction: squared corners, uppercase
 * labels with wide tracking, and generous horizontal padding.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)]",
    "font-sans font-bold uppercase tracking-[0.08em]",
    "transition-[background-color,color,border-color,transform,box-shadow] duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-55",
    "active:translate-y-px whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white hover:bg-brand-600 focus-visible:outline-brand-700 shadow-[0_1px_2px_rgba(23,58,133,0.16)]",
        outline:
          "border border-brand-500 bg-white text-brand-600 hover:bg-brand-50 hover:border-brand-600 focus-visible:outline-brand-600",
        subtle:
          "border border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50 focus-visible:outline-brand-600",
        onBrand:
          "bg-white text-brand-600 hover:bg-brand-50 focus-visible:outline-white",
        outlineOnBrand:
          "border border-white/70 bg-transparent text-white hover:bg-white/12 hover:border-white focus-visible:outline-white",
        ghost:
          "text-brand-600 hover:bg-brand-50 focus-visible:outline-brand-600",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        md: "h-11 px-6 text-[12px]",
        lg: "h-[52px] px-8 text-[13px]",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      full: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  full,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...(asChild ? {} : { type })}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

/** Convenience wrapper so navigational CTAs stay anchors, not buttons. */
export function ButtonLink({
  className,
  variant,
  size,
  full,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
