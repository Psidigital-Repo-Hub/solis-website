import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone, ShieldAlert } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/layout/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Solis Medical Center — address, phone numbers, opening hours and an enquiry form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact us | Solis Medical Center",
    description:
      "Get in touch with Solis Medical Center — address, phone numbers, opening hours and an enquiry form.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const { address } = siteConfig.contact;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about an appointment, a referral or a department? Send us a message and we will reply within two working days."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        align="left"
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal from="right" delay={0.08}>
              <div className="flex flex-col gap-5">
                <div className="rounded-[var(--radius-card)] border border-destructive/35 bg-destructive/5 p-6">
                  <div className="flex items-start gap-3">
                    <ShieldAlert
                      className="mt-0.5 size-5 shrink-0 text-destructive"
                      aria-hidden
                    />
                    <div>
                      <h2 className="font-sans text-[16px] font-bold text-ink-800">
                        Medical emergency
                      </h2>
                      <p className="type-body mt-2 text-[14px]">
                        Call the emergency services immediately. Our emergency
                        department is open 24 hours a day.
                      </p>
                      <a
                        href={siteConfig.contact.emergencyHref}
                        className="mt-4 inline-flex items-center gap-2 font-sans text-[14px] font-bold text-destructive underline underline-offset-4"
                      >
                        <Phone className="size-4" aria-hidden />
                        {siteConfig.contact.emergency}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
                  <h2 className="font-sans text-[16px] font-bold text-ink-800">
                    Reach us directly
                  </h2>
                  <ul className="mt-5 flex flex-col gap-5">
                    <li className="flex gap-3">
                      <MapPin
                        className="mt-0.5 size-5 shrink-0 text-brand-500"
                        aria-hidden
                      />
                      <address className="type-body not-italic">
                        {address.line1}, {address.line2}
                        <br />
                        {address.city}, {address.region} {address.postalCode}
                        <br />
                        {address.country}
                      </address>
                    </li>
                    <li className="flex gap-3">
                      <Phone
                        className="mt-0.5 size-5 shrink-0 text-brand-500"
                        aria-hidden
                      />
                      <a
                        href={siteConfig.contact.phoneHref}
                        className="type-body transition-colors hover:text-brand-600"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Mail
                        className="mt-0.5 size-5 shrink-0 text-brand-500"
                        aria-hidden
                      />
                      <a
                        href={siteConfig.contact.emailHref}
                        className="type-body break-all transition-colors hover:text-brand-600"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
                  <h2 className="font-sans text-[16px] font-bold text-ink-800">
                    Opening hours
                  </h2>
                  <dl className="mt-5 flex flex-col gap-3">
                    {siteConfig.hours.map((entry) => (
                      <div
                        key={entry.days}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink-100 pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="font-body text-[14px] text-ink-600">
                          {entry.days}
                        </dt>
                        <dd className="font-sans text-[14px] font-bold text-ink-800">
                          {entry.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
                  <h2 className="font-sans text-[16px] font-bold text-ink-800">
                    Follow us
                  </h2>
                  <ul className="mt-4 flex items-center gap-2.5">
                    {siteConfig.social.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex size-10 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
                        >
                          <Icon name={social.icon} className="size-[18px]" />
                          <span className="sr-only">
                            {siteConfig.shortName} on {social.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Location */}
      <section className="surface-pale py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal className="max-w-[46rem]">
            <SectionHeading
              title="Finding"
              accent="the campus"
              description="We are a ten-minute walk from Ridgemont Central station. Visitor parking is available on Waverley Avenue, with accessible bays beside the main entrance."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-ink-200">
              <div className="relative aspect-[21/9] w-full bg-ink-100">
                <Image
                  src="/images/map-placeholder.jpg"
                  alt="The main reception desk of a hospital building"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-[var(--radius-card)] bg-white/95 px-6 py-5 text-center shadow-[0_18px_44px_-28px_rgba(21,50,107,0.8)] backdrop-blur-sm">
                    <MapPin
                      className="mx-auto size-6 text-brand-500"
                      aria-hidden
                    />
                    <p className="mt-3 font-sans text-[15px] font-bold text-ink-800">
                      {address.line1}
                    </p>
                    <p className="type-body mt-1 text-[13.5px]">
                      {address.city}, {address.region} {address.postalCode}
                    </p>
                    <p className="mt-3 font-body text-[12px] text-ink-500">
                      Interactive map to be connected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
