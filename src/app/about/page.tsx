import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { values, timeline, trustStats } from "@/lib/data/content";
import { doctors } from "@/lib/data/doctors";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { MaskedImage } from "@/components/layout/masked-image";
import { ChevronWatermark } from "@/components/layout/patterns";
import { Counter } from "@/components/layout/counter";
import { IconBadge } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { FacilitiesGrid } from "@/components/sections/facilities-grid";
import { LeadershipQuote } from "@/components/sections/leadership-quote";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "About us",
  description:
    "How Solis Medical Center grew from a community clinic into a campus of thirty-two departments working from a single shared record.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About us | Solis Medical Center",
    description:
      "How Solis Medical Center grew from a community clinic into a campus of thirty-two departments working from a single shared record.",
    url: "/about",
  },
};

export default function AboutPage() {
  const leadership = doctors.slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="About Solis"
        title="A hospital built around"
        accent="continuity"
        description="We started as a twelve-bed community clinic in 1997. The organising idea has not changed: care should continue between appointments rather than restart at each one."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <Reveal>
              <SectionHeading title="Our" accent="story" />
              <div className="mt-6 flex flex-col gap-5">
                <p className="type-lead">
                  Solis opened on Waverley Avenue with twelve beds and a single
                  consulting corridor. The founding team had come from larger
                  hospitals and had all watched the same thing happen: patients
                  repeating their history to every new department, and clinicians
                  making decisions without the full picture.
                </p>
                <p className="type-lead">
                  Growth since then has been deliberate. Departments were added
                  where they closed a gap in an existing pathway rather than
                  because they were prestigious, and each one joined the shared
                  record before it opened to patients.
                </p>
                <p className="type-lead">
                  Today the campus runs thirty-two clinical departments and an
                  emergency service that is open every hour of every day. The
                  measure we hold ourselves to is unglamorous: how rarely a
                  patient has to explain themselves twice.
                </p>
              </div>

              <ul className="mt-10 grid gap-6 border-t border-ink-200 pt-8 sm:grid-cols-3">
                {trustStats.map((stat) => (
                  <li key={stat.id}>
                    <p className="font-sans text-[30px] font-bold leading-none tracking-[-0.03em] text-brand-500">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="type-body mt-2 text-[13.5px]">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal from="right">
              <MaskedImage
                src="/images/about-atrium.jpg"
                alt="A long, light-filled corridor in a modern building"
                mask="feature"
                ratio="aspect-[5/4.8]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mission and vision */}
      <section className="surface-tint relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
        <ChevronWatermark className="opacity-50" />
        <Container className="relative">
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[var(--radius-card)] border border-ink-200 bg-white p-8 sm:p-10">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Target className="size-6" aria-hidden />
                </span>
                <h2 className="type-h3 mt-6 text-ink-800">Our mission</h2>
                <p className="type-lead mt-4">
                  To give every patient a care pathway that holds together —
                  where the record follows them, the team is known to them, and
                  the plan is something they can explain in their own words.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-[var(--radius-card)] border border-ink-200 bg-white p-8 sm:p-10">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-clinic-50 text-clinic-700">
                  <Compass className="size-6" aria-hidden />
                </span>
                <h2 className="type-h3 mt-6 text-ink-800">Our vision</h2>
                <p className="type-lead mt-4">
                  A regional service where moving between primary care,
                  specialist departments and community teams feels like one
                  continuous relationship rather than a series of handovers.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Values */}
          <Reveal className="mt-16 max-w-[48rem]">
            <SectionHeading
              title="What we hold"
              accent="ourselves to"
              description="Four commitments that shape how departments are run and how performance is reviewed."
            />
          </Reveal>

          <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <RevealItem key={value.id} as="li" className="h-full">
                <div className="flex h-full gap-5 rounded-[var(--radius-card)] border border-ink-200 bg-white p-7">
                  <IconBadge name={value.icon} size="lg" />
                  <div>
                    <h3 className="font-sans text-[17px] font-bold tracking-[-0.018em] text-ink-800">
                      {value.title}
                    </h3>
                    <p className="type-body mt-2 text-[14px]">
                      {value.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="max-w-[48rem]">
            <SectionHeading
              title="How we"
              accent="got here"
              description="Milestones from a community clinic to the campus as it stands today."
            />
          </Reveal>

          <RevealGroup as="ol" className="mt-12 flex flex-col">
            {timeline.map((entry, index) => (
              <RevealItem key={entry.year} as="li">
                <div className="grid gap-3 border-t border-ink-200 py-8 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
                  <p className="font-sans text-[26px] font-bold leading-none tracking-[-0.03em] text-brand-500">
                    {entry.year}
                  </p>
                  <div>
                    <h3 className="font-sans text-[19px] font-bold tracking-[-0.02em] text-ink-800">
                      {entry.title}
                    </h3>
                    <p className="type-body mt-2 max-w-[62ch]">
                      {entry.description}
                    </p>
                  </div>
                </div>
                {index === timeline.length - 1 ? (
                  <div className="border-t border-ink-200" />
                ) : null}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="surface-pale py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="max-w-[48rem]">
            <SectionHeading
              title="Clinical"
              accent="leadership"
              description="Departmental leads are accountable for standards, teaching and the quarterly review of outcomes in their area."
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {leadership.map((doctor) => (
              <RevealItem key={doctor.id} as="li" className="h-full">
                <DoctorCard doctor={doctor} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Accreditation */}
      <section id="accreditation" className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                title="Standards and"
                accent="accreditation"
                description="We are assessed against external standards covering clinical governance, patient safety and information handling. Certificates are displayed in the main reception."
              />

              <ul className="mt-8 flex flex-col gap-4">
                {siteConfig.accreditations.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-[var(--radius-card)] border border-ink-200 bg-white px-5 py-4"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon name="shield-check" className="size-5" />
                    </span>
                    <span className="font-sans text-[15px] font-bold text-ink-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-[62ch] font-body text-[13px] text-ink-500">
                Accreditation names shown here are illustrative placeholders for
                this demonstration site.
              </p>
            </Reveal>

            <Reveal from="right">
              <MaskedImage
                src="/images/about-team.jpg"
                alt="A clinical team in surgical gowns conferring together"
                mask="notch"
                ratio="aspect-[4/3.6]"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <FacilitiesGrid />

      <LeadershipQuote />

      <CtaBanner
        title="Come and see the campus"
        description="Tours run on the first Thursday of each month. Get in touch and we will save you a place."
        ctaLabel="Contact us"
        ctaHref="/contact"
        secondaryLabel="Explore facilities"
        secondaryHref="/facilities"
        image="/images/cta-reception.jpg"
      />
    </>
  );
}
