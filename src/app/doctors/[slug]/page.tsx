import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Languages, MapPin } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { doctors, getDoctorBySlug } from "@/lib/data/doctors";
import { getServiceName, getServiceBySlug } from "@/lib/data/services";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { SectionHeading } from "@/components/layout/section-heading";
import { Tag, IconBadge } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { CtaBanner } from "@/components/sections/cta-banner";

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) return { title: "Clinician not found" };

  const description = `${doctor.name}, ${doctor.credentials} — ${doctor.specialty} at ${siteConfig.name}.`;

  return {
    title: `${doctor.name}, ${doctor.credentials}`,
    description,
    alternates: { canonical: `/doctors/${doctor.slug}` },
    openGraph: {
      type: "profile",
      title: `${doctor.name} | ${siteConfig.name}`,
      description,
      url: `/doctors/${doctor.slug}`,
    },
  };
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) notFound();

  const department = getServiceBySlug(doctor.department);
  const colleagues = doctors
    .filter((item) => item.slug !== doctor.slug)
    .slice(0, 4);

  /* Physician structured data — limited to facts stated on this page. */
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specialty,
    url: `${siteConfig.url}/doctors/${doctor.slug}`,
    knowsLanguage: doctor.languages,
    worksFor: {
      "@type": "MedicalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      {/* Profile header */}
      <section className="relative isolate overflow-hidden pb-14 pt-10 sm:pt-12 lg:pb-20 lg:pt-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef3fb] via-[#f6f8fc] to-white" />
          <DotField opacity="opacity-60" />
          <ChevronWatermark className="opacity-70" />
        </div>

        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-1.5">
              <li>
                <Link
                  href="/"
                  className="font-body text-[13px] text-ink-500 transition-colors hover:text-brand-600"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-ink-300">
                /
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="font-body text-[13px] text-ink-500 transition-colors hover:text-brand-600"
                >
                  Doctors
                </Link>
              </li>
              <li aria-hidden className="text-ink-300">
                /
              </li>
              <li>
                <span
                  aria-current="page"
                  className="font-body text-[13px] font-semibold text-ink-700"
                >
                  {doctor.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
            <Reveal>
              <div className="clip-shoulder relative aspect-[4/5] w-full max-w-[320px] overflow-hidden bg-ink-100">
                <Image
                  src={doctor.image}
                  alt={`Portrait of ${doctor.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 320px"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="type-eyebrow">
                {getServiceName(doctor.department)}
              </p>
              <h1 className="type-h1 mt-4 text-ink-800">
                {doctor.name}
                <span className="ml-2 align-middle font-sans text-[0.5em] font-semibold tracking-normal text-ink-500">
                  {doctor.credentials}
                </span>
              </h1>
              <p className="mt-3 font-sans text-[19px] font-semibold text-brand-600">
                {doctor.specialty}
              </p>

              <p className="type-lead mt-6 max-w-[62ch]">{doctor.bio}</p>

              <dl className="mt-8 grid gap-5 sm:grid-cols-3">
                <div>
                  <dt className="type-caption">Experience</dt>
                  <dd className="mt-1.5 font-sans text-[17px] font-bold text-ink-800">
                    {doctor.experience} years
                  </dd>
                </div>
                <div>
                  <dt className="type-caption">Languages</dt>
                  <dd className="mt-1.5 font-sans text-[17px] font-bold text-ink-800">
                    {doctor.languages.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="type-caption">Located at</dt>
                  <dd className="mt-1.5 font-sans text-[17px] font-bold text-ink-800">
                    {doctor.location}
                  </dd>
                </div>
              </dl>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/appointments" size="lg">
                  Request an appointment
                </ButtonLink>
                {department ? (
                  <ButtonLink
                    href={`/services/${department.slug}`}
                    variant="outline"
                    size="lg"
                  >
                    {department.name} department
                  </ButtonLink>
                ) : null}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Detail */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal className="h-full">
              <div className="h-full rounded-[var(--radius-card)] border border-ink-200 bg-white p-8">
                <IconBadge name="graduation-cap" size="lg" />
                <h2 className="type-h3 mt-6 text-ink-800">Qualifications</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {doctor.qualifications.map((qualification) => (
                    <li key={qualification} className="flex items-start gap-3">
                      <GraduationCap
                        className="mt-0.5 size-4 shrink-0 text-brand-500"
                        aria-hidden
                      />
                      <span className="font-body text-[14.5px] leading-relaxed text-ink-700">
                        {qualification}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.07} className="h-full">
              <div className="h-full rounded-[var(--radius-card)] border border-ink-200 bg-white p-8">
                <IconBadge name="heart-pulse" size="lg" />
                <h2 className="type-h3 mt-6 text-ink-800">Clinical focus</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {doctor.focusAreas.map((area) => (
                    <li key={area}>
                      <Tag>{area}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14} className="h-full">
              <div className="h-full rounded-[var(--radius-card)] border border-ink-200 bg-white p-8">
                <IconBadge name="building-2" size="lg" />
                <h2 className="type-h3 mt-6 text-ink-800">Where to find us</h2>
                <p className="type-body mt-4 flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-brand-500"
                    aria-hidden
                  />
                  <span>
                    {doctor.location}
                    <br />
                    {siteConfig.contact.address.line1},{" "}
                    {siteConfig.contact.address.city}
                  </span>
                </p>
                <p className="type-body mt-4 flex items-start gap-3">
                  <Languages
                    className="mt-0.5 size-4 shrink-0 text-brand-500"
                    aria-hidden
                  />
                  <span>
                    Interpreters can be arranged for any appointment on request.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Colleagues */}
      <section className="surface-pale py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="max-w-[46rem]">
            <SectionHeading
              title="Other clinicians"
              accent="you may see"
              description="Care is delivered by a team. These are colleagues you may meet during your pathway."
            />
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {colleagues.map((colleague) => (
              <li key={colleague.id} className="h-full">
                <DoctorCard doctor={colleague} className="h-full" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner
        title={`Request an appointment`}
        description="Tell us what you need and our scheduling team will confirm a time within one working day."
        ctaLabel="Book an appointment"
        ctaHref="/appointments"
        secondaryLabel="Find another doctor"
        secondaryHref="/doctors"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
    </>
  );
}
