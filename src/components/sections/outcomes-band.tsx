import Image from "next/image";

import { outcomeStats } from "@/lib/data/content";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { Counter } from "@/components/layout/counter";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { ButtonLink } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/card";

/**
 * The blue outcomes band. Figures are illustrative placeholders, and the
 * copy says so rather than presenting them as published results.
 */
export function OutcomesBand() {
  return (
    <section className="surface-brand relative isolate overflow-hidden py-16 sm:py-20 lg:py-28">
      <DotField opacity="opacity-30" className="text-white" />
      <ChevronWatermark tone="onBrand" className="opacity-90" />

      {/* Chevron-masked photograph rising from the base. It sits behind the
          copy and fades into the brand field at its upper edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[58%] lg:block"
      >
        <div className="clip-notch mask-sides relative mx-auto h-full w-[48%]">
          <Image
            src="/images/patients-walking.jpg"
            alt=""
            fill
            sizes="42vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#2e6be6]" />
          <span className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay" />
        </div>
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              tone="onBrand"
              title="What our patients"
              accent="tell us"
              description="Fewer repeated appointments, clearer explanations and shorter waits between referral and first assessment."
            />
            <p className="mt-4 font-body text-[14px] text-white/85">
              Figures shown are illustrative placeholders for this demonstration
              site.
            </p>
            <div className="mt-9">
              <ButtonLink href="/about" variant="onBrand" size="lg">
                How we measure care
              </ButtonLink>
            </div>
          </Reveal>

          <RevealGroup as="ul" className="flex flex-col gap-4">
            {outcomeStats.map((stat) => (
              <RevealItem key={stat.id} as="li">
                <div className="flex items-center gap-5 rounded-[var(--radius-card)] bg-white px-5 py-5 shadow-[0_18px_40px_-30px_rgba(10,30,80,0.8)] sm:px-7 sm:py-6">
                  <IconBadge name={stat.icon} tone="brandSoft" size="lg" />
                  <div className="min-w-0">
                    <p className="font-sans text-[34px] font-bold leading-none tracking-[-0.03em] text-brand-500 sm:text-[40px]">
                      <Counter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="mt-2 font-body text-[14px] leading-snug text-ink-600">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
