"use client";

import * as React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Accessible form primitives.
 *
 * Every control is wired to its label, description and error message via
 * ids, so screen readers announce the full context. Errors are conveyed by
 * an icon, text and colour together — never colour alone.
 */

const controlBase = [
  "w-full rounded-[var(--radius-btn)] border bg-white",
  "font-body text-[15px] text-ink-800 placeholder:text-ink-400",
  "transition-[border-color,box-shadow] duration-150",
  "focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12",
  "disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400",
].join(" ");

interface FieldProps {
  id: string;
  label: string;
  /** Helper text rendered under the label. */
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean | undefined;
  }) => React.ReactNode;
}

export function Field({
  id,
  label,
  description,
  error,
  required,
  className,
  children,
}: FieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-[13px] font-semibold tracking-[0.01em] text-ink-800"
      >
        {label}
        {required ? (
          <span className="ml-1 text-brand-600" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-ink-500">(optional)</span>
        )}
      </label>

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })}

      {/* Helper text sits below the control so that fields with and without
          it still line up across a multi-column grid. It stays wired to the
          input through `aria-describedby`. */}
      {description ? (
        <p id={descriptionId} className="font-body text-[13px] text-ink-500">
          {description}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="flex items-start gap-1.5 font-body text-[13px] font-medium text-destructive"
        >
          <AlertCircle className="mt-[2px] size-3.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        controlBase,
        "h-12 px-3.5",
        props["aria-invalid"]
          ? "border-destructive focus:border-destructive focus:ring-destructive/12"
          : "border-ink-200",
        className,
      )}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 5, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        controlBase,
        "resize-y px-3.5 py-3 leading-relaxed",
        props["aria-invalid"]
          ? "border-destructive focus:border-destructive focus:ring-destructive/12"
          : "border-ink-200",
        className,
      )}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          controlBase,
          "h-12 appearance-none pl-3.5 pr-10",
          props["aria-invalid"]
            ? "border-destructive focus:border-destructive focus:ring-destructive/12"
            : "border-ink-200",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400"
        aria-hidden
      />
    </div>
  );
});
