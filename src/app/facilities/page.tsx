import type { Metadata } from "next";
import { Accessibility, Car, Coffee, Wifi } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { MaskedImage } from "@/components/layout/masked-image";
import { FacilitiesGrid } from "@/components/sections/facilities-grid";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Departments, wards and visitor amenities across the Solis Medical Center campus, including accessibility and parking information.",
  alternates: { canonical: "/facilities" },
  openGraph: {
    title: "Facilities | Solis Medical Center",
    description:
      "Departments, wards and visitor amenities across the Solis Medical Center campus.",
    url: "/facilities",
  },
};

const amenities = [
  {
    icon: Accessibility,
    title: "Step-free throughout",
    description:
      "Level access at every entrance, with lifts to all floors and accessible washrooms on each level.",
  },
  {
    icon: Car,
    title: "Visitor parking",
    description:
      "Two hundred spaces on Waverley Avenue, including accessible bays beside the main entrance.",
  },
  {
    icon: Coffee,
    title: "Café and quiet rooms",
    description:
      "A café on the ground floor, plus quiet rooms on each ward for families who need space.",
  },
  {
    icon: Wifi,
    title: "Free visitor wi-fi",
    description:
      "Open wi-fi across the campus, with charging points in every waiting area.",
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our campus"
        title="Designed around"
        accent="the patient journey"
        description="Departments are grouped so that the services a patient needs together sit near one another, rather than spread across separate buildings."
        crumbs={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
        ctaLabel="Book an appointment"
        ctaHref="/appointments"
        secondaryLabel="Plan your visit"
        secondaryHref="/contact"
      />

      <FacilitiesGrid
        heading="Departments and"
        accent="units"
        description="Six of the areas visitors ask about most often. Every department is signposted from the main atrium."
        tone="white"
      />

      {/* Visiting */}
      <section className="surface-pale py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                title="Visiting"
                accent="the campus"
                description="Practical things worth knowing before you arrive. If you need something not listed here, our reception team can help."
              />

              <RevealGroup as="ul" className="mt-10 flex flex-col gap-5">
                {amenities.map((amenity) => (
                  <RevealItem key={amenity.title} as="li">
                    <div className="flex gap-4 rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <amenity.icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-sans text-[16px] font-bold tracking-[-0.015em] text-ink-800">
                          {amenity.title}
                        </h3>
                        <p className="type-body mt-1.5 text-[14px]">
                          {amenity.description}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>

            <Reveal from="right">
              <MaskedImage
                src="/images/about-atrium.jpg"
                alt="A long, light-filled corridor in a modern building"
                mask="feature"
                ratio="aspect-[5/5]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Planning a visit?"
        description="Our reception team can talk you through access, parking and where to go when you arrive."
        ctaLabel="Contact us"
        ctaHref="/contact"
        secondaryLabel="Find a doctor"
        secondaryHref="/doctors"
        image="/images/cta-support.jpg"
      />
    </>
  );
}
