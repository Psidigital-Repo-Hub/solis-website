import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import { trustStats } from "@/lib/data/content";
import { Container } from "@/components/layout/container";
import { Entrance, EntranceItem } from "@/components/layout/reveal";
import { Counter } from "@/components/layout/counter";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#eaf1fc] via-[#f5f8fd] to-[#eef4fd]" />
        <DotField opacity="opacity-70" />
        <ChevronWatermark className="opacity-80" />
      </div>

      {/* Photography — bleeds to the viewport edge from the large breakpoint */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[52%] xl:w-[54%]">
        <div className="clip-hero relative h-[320px] w-full sm:h-[420px] lg:h-full">
          <Image
            src="/images/hero-family.jpg"
            alt="A father outdoors holding his two young children, all smiling"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 54vw"
            className="object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay"
          />
        </div>
      </div>

      <Container className="relative">
        <div className="py-14 sm:py-16 lg:w-[46%] lg:py-28 xl:py-32">
          <Entrance>
            <EntranceItem>
              <p className="type-eyebrow flex items-center gap-2">
                <ShieldCheck className="size-4" aria-hidden />
                Accredited care since 1997
              </p>
            </EntranceItem>

            <EntranceItem>
              <h1 className="type-display mt-5 text-ink-800">
                Exceptional care,{" "}
                <span className="text-brand-500">delivered with compassion</span>
              </h1>
            </EntranceItem>

            <EntranceItem>
              <p className="type-lead mt-6 max-w-[46ch]">
                Specialist teams, modern diagnostics and coordinated follow-up,
                brought together on one campus.
              </p>
            </EntranceItem>

            <EntranceItem>
              <p className="type-lead mt-4 max-w-[46ch]">
                Every department writes into the same record, so your care
                continues rather than restarting at each appointment.
              </p>
            </EntranceItem>

            <EntranceItem>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/appointments" size="lg">
                  Book an appointment
                </ButtonLink>
                <ButtonLink href="/services" variant="outline" size="lg">
                  Explore our services
                </ButtonLink>
              </div>
            </EntranceItem>

            {/* Trust indicators */}
            <EntranceItem>
              <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-ink-200/80 pt-8 sm:grid-cols-3">
                {trustStats.map((stat) => (
                  <li key={stat.id} className="flex items-start gap-3">
                    <Icon
                      name={stat.icon}
                      className="mt-0.5 size-5 shrink-0 text-brand-500"
                      strokeWidth={1.9}
                    />
                    <div>
                      <p className="font-sans text-[22px] font-bold leading-none tracking-[-0.02em] text-ink-800">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="mt-1.5 font-body text-[13px] leading-snug text-ink-500">
                        {stat.label}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </EntranceItem>
          </Entrance>
        </div>
      </Container>
    </section>
  );
}
