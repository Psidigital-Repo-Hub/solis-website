import Image from "next/image";
import { Quote } from "lucide-react";

import { testimonials } from "@/lib/data/content";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { ButtonLink } from "@/components/ui/button";

/**
 * Patient voices, framed by the floating-portrait composition from the
 * reference. The portraits are decorative; the quotes carry the meaning.
 */
/**
 * Positions are confined to the margins outside the quote grid, which is
 * capped at 72rem. They are only rendered from 2xl upward — below that the
 * grid leaves no clear space and the portraits would collide with a card.
 */
const floatingPortraits = [
  { src: "/images/avatar-patient-4.jpg", className: "left-[2%] top-[14%] size-24" },
  { src: "/images/avatar-patient-5.jpg", className: "left-[5%] top-[45%] size-20" },
  { src: "/images/avatar-patient-6.jpg", className: "left-[1.5%] bottom-[14%] size-[72px]" },
  { src: "/images/avatar-patient-7.jpg", className: "right-[2%] top-[11%] size-20" },
  { src: "/images/avatar-patient-8.jpg", className: "right-[5%] top-[43%] size-24" },
  { src: "/images/avatar-patient-1.jpg", className: "right-[1.5%] bottom-[16%] size-[72px]" },
];

export function Testimonials() {
  return (
    <section className="surface-brand relative isolate overflow-hidden py-16 sm:py-20 lg:py-28">
      <DotField opacity="opacity-25" className="text-white" />
      <ChevronWatermark tone="onBrand" className="opacity-80" />

      {/* Decorative portrait field, large screens only */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden 2xl:block">
        {floatingPortraits.map((portrait) => (
          <span
            key={portrait.src + portrait.className}
            className={`absolute overflow-hidden rounded-[var(--radius-portrait)] ring-1 ring-white/25 ${portrait.className}`}
          >
            <Image
              src={portrait.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </span>
        ))}
      </div>

      <Container className="relative">
        <Reveal>
          <SectionHeading
            align="center"
            tone="onBrand"
            title="Hear from"
            accent="our patients"
            description="Short accounts from people treated across our departments, shared with their permission and lightly edited for length."
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mx-auto mt-12 grid max-w-6xl gap-5 lg:mt-14 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.id} as="li" className="h-full">
              <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 shadow-[0_20px_50px_-34px_rgba(10,30,80,0.9)]">
                <Quote
                  className="size-7 shrink-0 text-brand-300"
                  aria-hidden
                  strokeWidth={2.2}
                />
                <blockquote className="mt-4 flex-1 font-body text-[15px] leading-[1.72] text-ink-700">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-clinic-300">
                    <Image
                      src={testimonial.avatar}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-sans text-[14px] font-bold text-ink-800">
                      {testimonial.name}
                    </span>
                    <span className="block font-body text-[13px] text-ink-500">
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.12} className="mt-12 flex justify-center">
          <ButtonLink href="/articles" variant="onBrand" size="lg">
            Read patient stories
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
