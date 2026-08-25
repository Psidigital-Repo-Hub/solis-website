import { services } from "@/lib/data/services";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { ChevronWatermark } from "@/components/layout/patterns";
import { ButtonLink } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";

export function ServicesOverview() {
  const featured = services.slice(0, 6);

  return (
    <section className="surface-tint relative isolate overflow-hidden py-16 sm:py-20 lg:py-28">
      <ChevronWatermark className="opacity-60" />

      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="lg:max-w-[46rem]">
            <SectionHeading
              title="Our"
              accent="services"
              description="Thirty-two clinical departments working from a single shared record. Investigations, treatment and follow-up are planned together rather than handed between teams."
            />
          </Reveal>

          <Reveal delay={0.08} className="shrink-0">
            <ButtonLink href="/services" size="lg">
              View all services
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {featured.map((service) => (
            <RevealItem key={service.id} as="li" className="h-full">
              <ServiceCard service={service} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
