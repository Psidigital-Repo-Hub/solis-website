import Image from "next/image";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import { ButtonLink } from "@/components/ui/button";
import { DotField } from "@/components/layout/patterns";

interface CtaBannerProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * The recurring blue call-to-action band: a diagonal photographic slash
 * running out of a blue field, with a chevron tail on the trailing edge.
 */
export function CtaBanner({
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  image = "/images/cta-reception.jpg",
  imageAlt = "",
  className,
}: CtaBannerProps) {
  return (
    <section className={cn("bg-white py-16 sm:py-20 lg:py-24", className)}>
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] surface-brand">
            <DotField opacity="opacity-25" className="text-white" />

            {/* Photographic band — decorative, hidden on small screens where
                the diagonal would crowd the copy. */}
            <div
              aria-hidden={imageAlt === "" ? true : undefined}
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] md:block"
            >
              <div className="clip-band relative h-full w-full">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay" />
              </div>

              {/* Chevron tail */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute inset-y-0 right-0 h-full w-[34%]"
              >
                <path d="M100 0 L100 100 L0 100 Z" fill="#3d7bec" />
              </svg>
            </div>

            <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:py-20 lg:pl-14">
              <div className="max-w-[34rem] md:max-w-[24rem] lg:max-w-[30rem]">
                <h2 className="type-h2 text-white">{title}</h2>
                <p className="type-lead mt-5 text-white/85">{description}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href={ctaHref} variant="onBrand" size="lg">
                    {ctaLabel}
                  </ButtonLink>
                  {secondaryLabel && secondaryHref ? (
                    <ButtonLink
                      href={secondaryHref}
                      variant="outlineOnBrand"
                      size="lg"
                    >
                      {secondaryLabel}
                    </ButtonLink>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
