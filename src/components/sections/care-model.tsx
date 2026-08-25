import Image from "next/image";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { ButtonLink } from "@/components/ui/button";

const pillars = [
  {
    id: "pillar-record",
    title: "One shared record",
    description:
      "Every department writes into the same record, so your history follows you between teams instead of being retaken at each appointment.",
    image: "/images/technology.jpg",
    imageAlt: "Hands typing on a laptop beside a stethoscope on a desk",
    href: "/about",
    cta: "How it works",
  },
  {
    id: "pillar-team",
    title: "A named care team",
    description:
      "You are introduced to the people responsible for your care, and you have a direct route back to them between appointments.",
    image: "/images/care-team.jpg",
    imageAlt: "A clinician wearing a stethoscope in conversation with a colleague",
    href: "/doctors",
    cta: "Meet the teams",
  },
];

export function CareModel() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-[52rem]">
          <SectionHeading
            title="How our care"
            accent="fits together"
            description="Two things do most of the work: a record that follows the patient, and a team that stays the same. Everything else is built on top of them."
          />
        </Reveal>

        <RevealGroup as="ul" className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.id} as="li" className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white sm:flex-row">
                <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-[42%]">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 22vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="type-h3 text-ink-800">{pillar.title}</h3>
                  <p className="type-body mt-3 flex-1">{pillar.description}</p>
                  <div className="mt-6">
                    <ButtonLink href={pillar.href} variant="outline" size="md">
                      {pillar.cta}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
