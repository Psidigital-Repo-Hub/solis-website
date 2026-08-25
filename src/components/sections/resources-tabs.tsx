"use client";

import Link from "next/link";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { articles } from "@/lib/data/articles";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CategoryChip, IconBadge } from "@/components/ui/card";
import { ChevronWatermark } from "@/components/layout/patterns";

const partnerResources = [
  {
    title: "Refer a patient",
    description:
      "Referral routes by department, including what to include and expected response times.",
    href: "/contact",
    icon: "stethoscope",
  },
  {
    title: "Diagnostic request forms",
    description:
      "Imaging and pathology requests, with guidance on preparation and urgency codes.",
    href: "/services/diagnostic-imaging",
    icon: "scan-line",
  },
  {
    title: "Shared care protocols",
    description:
      "Agreed protocols for conditions managed jointly with primary care teams.",
    href: "/services",
    icon: "layers",
  },
  {
    title: "Education and teaching",
    description:
      "Grand rounds, case conferences and placement enquiries for trainees.",
    href: "/about",
    icon: "graduation-cap",
  },
];

/**
 * Two audiences, one shelf of resources. Radix Tabs supplies roving focus
 * and the correct tab/tabpanel relationships.
 */
export function ResourcesTabs() {
  const patientArticles = articles.slice(1, 5);

  return (
    <section className="surface-pale relative isolate overflow-hidden py-16 sm:py-20 lg:py-28">
      <ChevronWatermark className="opacity-45" />

      <Container className="relative">
        <Tabs.Root defaultValue="patients">
          <Reveal className="flex justify-center">
            <Tabs.List
              className="inline-flex flex-col gap-1.5 rounded-[10px] border border-ink-200 bg-white p-1.5 sm:flex-row"
              aria-label="Resource audience"
            >
              {[
                { value: "patients", label: "Resources for patients" },
                { value: "partners", label: "Resources for clinicians" },
              ].map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "rounded-[6px] px-6 py-3 font-sans text-[14px] font-bold tracking-[-0.005em] transition-colors duration-200",
                    "text-ink-600 hover:text-ink-800",
                    "data-[state=active]:bg-brand-500 data-[state=active]:text-white",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
                  )}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Reveal>

          {/* Patients */}
          <Tabs.Content
            value="patients"
            className="mt-12 focus-visible:outline-none lg:mt-14"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
              <Reveal className="h-full">
                <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-ink-200 bg-white p-8">
                  <div>
                    <IconBadge name="heart-pulse" size="lg" />
                    <h2 className="type-h3 mt-6 text-ink-800">
                      Preparing for your visit
                    </h2>
                    <p className="type-body mt-3">
                      What to bring, where to park, how long to allow and what
                      happens if you need to reschedule.
                    </p>
                  </div>
                  <div className="mt-8">
                    <ButtonLink href="/contact" variant="outline" size="md">
                      Visitor information
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>

              <ul className="grid gap-5 sm:grid-cols-2">
                {patientArticles.map((article, index) => (
                  <Reveal key={article.id} as="li" delay={index * 0.06}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_50px_-32px_rgba(21,50,107,0.6)]"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-100">
                        <Image
                          src={article.image}
                          alt={article.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <span className="absolute left-3 top-3">
                          <CategoryChip>{article.category}</CategoryChip>
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-sans text-[15.5px] font-bold leading-snug tracking-[-0.015em] text-ink-800">
                          {article.title}
                        </h3>
                        <span className="mt-4 inline-flex items-center gap-2 font-sans text-[11.5px] font-bold uppercase tracking-[0.09em] text-brand-600">
                          Read article
                          <ArrowRight
                            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Tabs.Content>

          {/* Clinicians */}
          <Tabs.Content
            value="partners"
            className="mt-12 focus-visible:outline-none lg:mt-14"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
              <Reveal className="h-full">
                <div className="relative flex h-full min-h-[16rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-8">
                  <Image
                    src="/images/partnership.jpg"
                    alt="Two colleagues reviewing printed charts and figures across a meeting table"
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/35 to-transparent"
                  />
                  <div className="relative">
                    <h2 className="type-h3 text-white">Working with us</h2>
                    <p className="mt-3 font-body text-[14.5px] leading-relaxed text-white/85">
                      Direct lines into every department, with named contacts
                      for referral queries.
                    </p>
                    <div className="mt-6">
                      <ButtonLink href="/contact" variant="onBrand" size="md">
                        Contact a department
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </Reveal>

              <ul className="grid gap-5 sm:grid-cols-2">
                {partnerResources.map((resource, index) => (
                  <Reveal key={resource.title} as="li" delay={index * 0.06}>
                    <Link
                      href={resource.href}
                      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_50px_-32px_rgba(21,50,107,0.6)]"
                    >
                      <IconBadge name={resource.icon} size="md" />
                      <h3 className="mt-5 font-sans text-[16px] font-bold tracking-[-0.015em] text-ink-800">
                        {resource.title}
                      </h3>
                      <p className="type-body mt-2 flex-1 text-[13.5px]">
                        {resource.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-sans text-[11.5px] font-bold uppercase tracking-[0.09em] text-brand-600">
                        Open
                        <ArrowRight
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </section>
  );
}
