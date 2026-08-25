import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Entrance, EntranceItem } from "@/components/layout/reveal";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { ButtonLink } from "@/components/ui/button";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  accent?: string;
  description?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  align?: "center" | "left";
  className?: string;
  children?: React.ReactNode;
}

/**
 * Interior page header: centred type on the pale dotted backdrop with the
 * chevron watermark, matching the reference's secondary-page treatment.
 */
export function PageHero({
  title,
  accent,
  description,
  eyebrow,
  crumbs,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  align = "center",
  className,
  children,
}: PageHeroProps) {
  const centred = align === "center";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef3fb] via-[#f6f8fc] to-white" />
        <DotField opacity="opacity-60" />
        <ChevronWatermark className="opacity-70" />
      </div>

      <Container>
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-x-1.5 gap-y-1",
                centred && "justify-center",
              )}
            >
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {crumb.href && !last ? (
                      <Link
                        href={crumb.href}
                        className="font-body text-[13px] text-ink-500 transition-colors hover:text-brand-600"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className="font-body text-[13px] font-semibold text-ink-700"
                        aria-current={last ? "page" : undefined}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!last ? (
                      <ChevronRight
                        className="size-3.5 text-ink-300"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <Entrance
          className={cn(
            "flex flex-col",
            centred && "items-center text-center",
          )}
        >
          {eyebrow ? (
            <EntranceItem>
              <p className="type-eyebrow mb-4">{eyebrow}</p>
            </EntranceItem>
          ) : null}

          <EntranceItem>
            <h1 className={cn("type-h1 text-ink-800", centred && "max-w-[22ch]")}>
              {title}
              {accent ? (
                <>
                  {" "}
                  <span className="text-brand-500">{accent}</span>
                </>
              ) : null}
            </h1>
          </EntranceItem>

          {description ? (
            <EntranceItem>
              <p
                className={cn(
                  "type-lead mt-6 max-w-[62ch]",
                  centred && "mx-auto",
                )}
              >
                {description}
              </p>
            </EntranceItem>
          ) : null}

          {ctaLabel && ctaHref ? (
            <EntranceItem>
              <div
                className={cn(
                  "mt-9 flex flex-col gap-3 sm:flex-row",
                  centred && "justify-center",
                )}
              >
                <ButtonLink href={ctaHref} size="lg">
                  {ctaLabel}
                </ButtonLink>
                {secondaryLabel && secondaryHref ? (
                  <ButtonLink href={secondaryHref} variant="outline" size="lg">
                    {secondaryLabel}
                  </ButtonLink>
                ) : null}
              </div>
            </EntranceItem>
          ) : null}

          {children ? <EntranceItem>{children}</EntranceItem> : null}
        </Entrance>
      </Container>
    </section>
  );
}
