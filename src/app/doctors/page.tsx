import type { Metadata } from "next";

import { doctors } from "@/lib/data/doctors";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { DoctorDirectory } from "@/components/doctors/doctor-directory";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Find a doctor",
  description:
    "Search consultants and specialist practitioners at Solis Medical Center by name, department, specialty or language.",
  alternates: { canonical: "/doctors" },
  openGraph: {
    title: "Find a doctor | Solis Medical Center",
    description:
      "Search consultants and specialist practitioners at Solis Medical Center by name, department, specialty or language.",
    url: "/doctors",
  },
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our clinicians"
        title="Find the right"
        accent="specialist"
        description="Search by name, department, specialty or language spoken. Every profile lists focus areas and where to find them on the campus."
        crumbs={[{ label: "Home", href: "/" }, { label: "Doctors" }]}
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <DoctorDirectory doctors={doctors} />
        </Container>
      </section>

      <CtaBanner
        title="Not sure who to see?"
        description="Describe the problem and our scheduling team will match you with the right clinician for a first assessment."
        ctaLabel="Book an appointment"
        ctaHref="/appointments"
        secondaryLabel="Browse departments"
        secondaryHref="/services"
        image="/images/cta-support.jpg"
      />
    </>
  );
}
