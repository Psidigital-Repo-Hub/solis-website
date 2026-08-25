import { doctors } from "@/lib/data/doctors";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { ButtonLink } from "@/components/ui/button";
import { DoctorCard } from "@/components/doctors/doctor-card";

export function DoctorsPreview() {
  const featured = doctors.slice(0, 4);

  return (
    <section className="surface-pale py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="lg:max-w-[46rem]">
            <SectionHeading
              title="Meet some of"
              accent="our clinicians"
              description="More than 180 consultants and specialist practitioners work across the campus. Each profile lists focus areas, languages spoken and where to find them."
            />
          </Reveal>

          <Reveal delay={0.08} className="shrink-0">
            <ButtonLink href="/doctors" variant="outline" size="lg">
              Find a doctor
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {featured.map((doctor) => (
            <RevealItem key={doctor.id} as="li" className="h-full">
              <DoctorCard doctor={doctor} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
