import Image from "next/image";
import { Quote } from "lucide-react";

import { leadershipQuote } from "@/lib/data/content";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/layout/reveal";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { ButtonLink } from "@/components/ui/button";

export function LeadershipQuote() {
  return (
    <section
      id="careers"
      className="surface-brand relative isolate overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      <DotField opacity="opacity-25" className="text-white" />
      <ChevronWatermark tone="onBrand" className="opacity-70" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              tone="onBrand"
              title="Build your career"
              accent="at Solis"
              description="Clinical, nursing and allied health roles across thirty-two departments, with structured development and protected teaching time."
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="onBrand" size="lg">
                Current openings
              </ButtonLink>
              <ButtonLink href="/about" variant="outlineOnBrand" size="lg">
                Life at Solis
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.1}>
            <figure className="relative rounded-[var(--radius-card)] bg-white p-8 pt-12 shadow-[0_28px_60px_-38px_rgba(8,26,70,0.95)] sm:p-10 sm:pt-14">
              <span
                aria-hidden
                className="absolute -top-7 left-8 inline-flex size-14 items-center justify-center rounded-full bg-brand-500 text-white ring-8 ring-white/15 sm:left-10"
              >
                <Quote className="size-6" strokeWidth={2.2} />
              </span>

              <blockquote className="font-body text-[16.5px] leading-[1.75] text-ink-700 sm:text-[17.5px]">
                {leadershipQuote.quote}
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4 border-t border-ink-100 pt-6">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-clinic-300">
                  <Image
                    src={leadershipQuote.avatar}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block font-sans text-[15px] font-bold text-ink-800">
                    {leadershipQuote.name}
                  </span>
                  <span className="block font-body text-[13.5px] text-ink-500">
                    {leadershipQuote.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
