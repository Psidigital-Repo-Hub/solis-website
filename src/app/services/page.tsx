import type { Metadata } from "next";

import { services } from "@/lib/data/services";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { RevealGroup, RevealItem } from "@/components/layout/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FacilitiesGrid } from "@/components/sections/facilities-grid";

export const metadata: Metadata = {
  title: "Services and departments",
  description:
    "Explore the clinical departments at Solis Medical Center, from cardiology and paediatrics to diagnostic imaging and emergency care.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services and departments | Solis Medical Center",
    description:
      "Explore the clinical departments at Solis Medical Center, from cardiology and paediatrics to diagnostic imaging and emergency care.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Clinical departments"
        title="Care organised around"
        accent="the whole patient"
        description="Thirty-two departments share one record and one scheduling system, so investigations, treatment and follow-up are planned together."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        ctaLabel="Book an appointment"
        ctaHref="/appointments"
        secondaryLabel="Speak to our team"
        secondaryHref="/contact"
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.id} as="li" className="h-full">
                <ServiceCard service={service} className="h-full" headingAs="h2" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <FacilitiesGrid
        heading="Where these services"
        accent="are delivered"
        description="Departments are grouped so that services a patient needs together sit near one another."
      />

      <CtaBanner
        title="Not sure which department you need?"
        description="Tell us a little about the problem and our scheduling team will point you to the right specialist."
        ctaLabel="Contact us"
        ctaHref="/contact"
        secondaryLabel="Find a doctor"
        secondaryHref="/doctors"
        image="/images/cta-support.jpg"
      />
    </>
  );
}
