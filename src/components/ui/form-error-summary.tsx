"use client";

import * as React from "react";
import { TriangleAlert } from "lucide-react";

/**
 * Error summary shown after a failed submit.
 *
 * Long forms are hard to recover from when the only feedback is inline: the
 * failures may be off screen, and a screen reader user has no overview. This
 * lists every problem once, moves focus to itself, and links each entry to
 * the control that caused it.
 */
export interface SummaryError {
  id: string;
  message: string;
}

export function FormErrorSummary({ errors }: { errors: SummaryError[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const signature = errors.map((error) => error.id).join("|");

  React.useEffect(() => {
    if (signature) ref.current?.focus();
  }, [signature]);

  if (errors.length === 0) return null;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="form-error-summary-title"
      className="mb-8 rounded-[var(--radius-btn)] border border-destructive/45 bg-destructive/5 p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive"
    >
      <div className="flex items-start gap-3">
        <TriangleAlert
          className="mt-0.5 size-5 shrink-0 text-destructive"
          aria-hidden
        />
        <div className="min-w-0">
          <h2
            id="form-error-summary-title"
            className="font-sans text-[15px] font-bold text-ink-800"
          >
            There {errors.length === 1 ? "is 1 problem" : `are ${errors.length} problems`}{" "}
            with this form
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {errors.map((error) => (
              <li key={error.id}>
                <a
                  href={`#${error.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    const target = document.getElementById(error.id);
                    target?.focus();
                    target?.scrollIntoView({ block: "center" });
                  }}
                  className="font-body text-[14px] font-medium text-destructive underline underline-offset-4 hover:no-underline"
                >
                  {error.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
