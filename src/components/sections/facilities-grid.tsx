import Image from "next/image";

import { cn } from "@/lib/utils";
import { facilities } from "@/lib/data/content";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { ChevronWatermark } from "@/components/layout/patterns";
import { IconBadge } from "@/components/ui/card";

export function FacilitiesGrid({
  heading = "Facilities across",
  accent = "the campus",
  description = "Departments are grouped so that the services a patient needs together sit near one another, rather than across separate buildings.",
  limit,
  tone = "tint",
}: {
  heading?: string;
  accent?: string;
  description?: string;
  limit?: number;
  tone?: "tint" | "white";
}) {
  const items = limit ? facilities.slice(0, limit) : facilities;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-16 sm:py-20 lg:py-28",
        tone === "tint" ? "surface-tint" : "bg-white",
      )}
    >
      {tone === "tint" ? <ChevronWatermark className="opacity-50" /> : null}

      <Container className="relative">
        <Reveal className="max-w-[52rem]">
          <SectionHeading
            title={heading}
            accent={accent}
            description={description}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {items.map((facility) => (
            <RevealItem key={facility.id} as="li" className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <IconBadge name={facility.icon} size="md" />
                  <h3 className="mt-5 font-sans text-[18px] font-bold tracking-[-0.018em] text-ink-800">
                    {facility.name}
                  </h3>
                  <p className="type-body mt-2.5 flex-1 text-[14px]">
                    {facility.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
