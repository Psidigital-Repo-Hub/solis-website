import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { services, getServiceBySlug } from "@/lib/data/services";
import { getDoctorsByDepartment } from "@/lib/data/doctors";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { MaskedImage } from "@/components/layout/masked-image";
import { ChevronWatermark } from "@/components/layout/patterns";
import { IconBadge } from "@/components/ui/card";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { CtaBanner } from "@/components/sections/cta-banner";

/** Pre-render every department at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Department not found" };

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${siteConfig.name}`,
      description: service.summary,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const departmentDoctors = getDoctorsByDepartment(service.slug);
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Department"
        title={service.name}
        description={service.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        ctaLabel="Book an appointment"
        ctaHref="/appointments"
      />

      {/* Overview + highlights */}
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <SectionHeading title="About this" accent="department" size="h2" />
              <p className="type-lead mt-6">{service.description}</p>

              <ul className="mt-8 flex flex-col gap-3.5">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="font-body text-[15px] leading-relaxed text-ink-700">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] border border-ink-200 bg-ink-50 px-5 py-4">
                <Phone className="size-5 shrink-0 text-brand-500" aria-hidden />
                <p className="font-body text-[14.5px] text-ink-700">
                  Department line{" "}
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="font-semibold text-ink-900 underline decoration-brand-300 underline-offset-4"
                  >
                    {siteConfig.contact.phone}
                  </a>{" "}
                  <span className="text-ink-500">{service.extension}</span>
                </p>
              </div>
            </Reveal>

            <Reveal from="right">
              <MaskedImage
                src={service.image}
                alt={service.imageAlt}
                mask="feature"
                ratio="aspect-[5/4.6]"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Conditions and procedures */}
      <section className="surface-tint relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
        <ChevronWatermark className="opacity-50" />
        <Container className="relative">
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[var(--radius-card)] border border-ink-200 bg-white p-8">
                <IconBadge name="stethoscope" size="lg" />
                <h2 className="type-h3 mt-6 text-ink-800">
                  Conditions we see
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.conditions.map((condition) => (
                    <li key={condition} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand-500"
                      />
                      <span className="font-body text-[15px] text-ink-700">
                        {condition}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-[var(--radius-card)] border border-ink-200 bg-white p-8">
                <IconBadge name="activity" size="lg" />
                <h2 className="type-h3 mt-6 text-ink-800">
                  Tests and procedures
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {service.procedures.map((procedure) => (
                    <li key={procedure} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-[9px] size-1.5 shrink-0 rounded-full bg-clinic-500"
                      />
                      <span className="font-body text-[15px] text-ink-700">
                        {procedure}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <p className="mt-8 max-w-[70ch] font-body text-[13px] text-ink-500">
            This list is illustrative rather than exhaustive, and it is not
            medical advice. Your clinician will discuss what is appropriate in
            your particular circumstances.
          </p>
        </Container>
      </section>

      {/* Department clinicians */}
      {departmentDoctors.length > 0 ? (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <Reveal className="max-w-[48rem]">
              <SectionHeading
                title="Clinicians in"
                accent={service.name.toLowerCase()}
                description="Each profile lists focus areas, languages spoken and where to find them on the campus."
              />
            </Reveal>

            <RevealGroup
              as="ul"
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {departmentDoctors.map((doctor) => (
                <RevealItem key={doctor.id} as="li" className="h-full">
                  <DoctorCard doctor={doctor} className="h-full" />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      ) : null}

      {/* Related departments */}
      <section className="surface-pale py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading title="Related" accent="departments" size="h3" />
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/services/${item.slug}`}
                  className="flex h-full items-center gap-4 rounded-[var(--radius-card)] border border-ink-200 bg-white px-5 py-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_18px_40px_-30px_rgba(21,50,107,0.6)]"
                >
                  <IconBadge name={item.icon} size="sm" />
                  <span className="font-sans text-[15px] font-bold text-ink-800">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner
        title={`Speak to the ${service.name.toLowerCase()} team`}
        description="Request an appointment, or ask a question before you book. We reply within one working day."
        ctaLabel="Book an appointment"
        ctaHref="/appointments"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </>
  );
}
