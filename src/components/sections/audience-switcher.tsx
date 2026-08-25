"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { audienceLinks } from "@/lib/data/content";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/layout/reveal";
import { IconBadge } from "@/components/ui/card";

const previews: Record<string, { src: string; alt: string }> = {
  "aud-patients": {
    src: "/images/consultation.jpg",
    alt: "A clinician administering a vaccination to a seated patient",
  },
  "aud-referrers": {
    src: "/images/partnership.jpg",
    alt: "Two colleagues reviewing printed charts and figures across a meeting table",
  },
  "aud-employers": {
    src: "/images/technology.jpg",
    alt: "Hands typing on a laptop beside a stethoscope on a desk",
  },
  "aud-community": {
    src: "/images/patients-walking.jpg",
    alt: "A group of clinicians in scrubs and white coats walking together along a hospital corridor",
  },
  "aud-careers": {
    src: "/images/care-team.jpg",
    alt: "A clinician wearing a stethoscope in conversation with a colleague",
  },
};

/**
 * Entry points by audience.
 *
 * Hovering or focusing a row swaps the accompanying photograph. The
 * photograph is decorative reinforcement — every row is a plain link, so
 * the section is fully usable without the preview.
 */
export function AudienceSwitcher() {
  const [activeId, setActiveId] = React.useState(audienceLinks[0].id);
  const reduceMotion = useReducedMotion();
  const active = previews[activeId] ?? previews[audienceLinks[0].id];

  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[60%] bg-gradient-to-b from-[#f4f7fc] to-white"
      />

      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
          {/* Copy + list */}
          <div>
            <Reveal>
              <SectionHeading
                title="How we work with"
                accent="patients and partners"
                description="Choose the route that fits you. Each one explains what to expect, what we need from you, and who to contact."
              />
            </Reveal>

            <ul className="mt-10 flex flex-col gap-2.5">
              {audienceLinks.map((item, index) => {
                const isActive = item.id === activeId;

                return (
                  <Reveal key={item.id} as="li" delay={index * 0.06}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => setActiveId(item.id)}
                      onFocus={() => setActiveId(item.id)}
                      className={cn(
                        "group flex items-center gap-4 rounded-[var(--radius-card)] border bg-white px-4 py-4 sm:px-5",
                        "transition-[border-color,box-shadow,transform] duration-200",
                        isActive
                          ? "border-ink-200 shadow-[0_14px_38px_-24px_rgba(21,50,107,0.55)] sm:-translate-y-px"
                          : "border-ink-200/70 hover:border-ink-200",
                      )}
                    >
                      <IconBadge name={item.icon} size="md" />

                      <span className="min-w-0 flex-1">
                        <span className="block font-sans text-[15.5px] font-bold text-ink-800">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block font-body text-[13.5px] leading-snug text-ink-500">
                          {item.description}
                        </span>
                      </span>

                      <span
                        aria-hidden
                        className={cn(
                          "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                          isActive
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-ink-200 text-ink-400 group-hover:border-brand-300 group-hover:text-brand-500",
                        )}
                      >
                        <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Preview */}
          <Reveal from="right" className="hidden lg:block">
            <div className="clip-feature relative aspect-[5/4.4] w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeId}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
                  exit={reduceMotion ? {} : { opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <span
                aria-hidden
                className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
