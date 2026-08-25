"use client";

import * as React from "react";
import { TriangleAlert } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * Route-level error boundary.
 *
 * The digest is surfaced so a visitor can quote it when they call, but no
 * stack or internal message is ever rendered to the page.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Replace with your error reporting transport.
    console.error("Route error:", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <TriangleAlert className="size-7" aria-hidden />
        </span>

        <h1 className="type-h2 mx-auto mt-7 max-w-[22ch] text-ink-800">
          Something went wrong on our side
        </h1>
        <p className="type-lead mx-auto mt-5 max-w-[52ch]">
          This page did not load correctly. Trying again usually resolves it. If
          it keeps happening, please call us and we will help directly.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>

        <p className="type-body mx-auto mt-10 max-w-[46ch] text-[13.5px]">
          Need help now? Call{" "}
          <a
            href={siteConfig.contact.phoneHref}
            className="font-semibold text-brand-600 underline underline-offset-4"
          >
            {siteConfig.contact.phone}
          </a>
          . In an emergency, call the emergency services.
        </p>

        {error.digest ? (
          <p className="mt-6 font-body text-[12px] text-ink-500">
            Reference: {error.digest}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
