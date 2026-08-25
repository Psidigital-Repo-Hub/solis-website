import type { Metadata } from "next";
import { Clock, Phone, ShieldAlert, Stethoscope } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/layout/reveal";
import { AppointmentForm } from "@/components/appointments/appointment-form";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Request an appointment with a specialist at Solis Medical Center. Our scheduling team replies within one working day.",
  alternates: { canonical: "/appointments" },
  openGraph: {
    title: "Book an appointment | Solis Medical Center",
    description:
      "Request an appointment with a specialist at Solis Medical Center. Our scheduling team replies within one working day.",
    url: "/appointments",
  },
};

const steps = [
  {
    icon: Stethoscope,
    title: "Tell us what you need",
    description:
      "Choose a department and, if you have one, a preferred clinician.",
  },
  {
    icon: Clock,
    title: "We confirm a time",
    description:
      "Our scheduling team calls or emails within one working day to agree a slot.",
  },
  {
    icon: Phone,
    title: "You receive a reminder",
    description:
      "A reminder goes out two days before, with directions and what to bring.",
  },
];

export default function AppointmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an appointment"
        description="Complete the form and our scheduling team will confirm a time with you. This is a request rather than a confirmed booking."
        crumbs={[{ label: "Home", href: "/" }, { label: "Appointments" }]}
        align="left"
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14">
            <Reveal>
              <AppointmentForm />
            </Reveal>

            <Reveal from="right" delay={0.08}>
              <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
                {/* Emergency notice — first, and visually distinct. */}
                <div className="rounded-[var(--radius-card)] border border-destructive/35 bg-destructive/5 p-6">
                  <div className="flex items-start gap-3">
                    <ShieldAlert
                      className="mt-0.5 size-5 shrink-0 text-destructive"
                      aria-hidden
                    />
                    <div>
                      <h2 className="font-sans text-[16px] font-bold text-ink-800">
                        In an emergency
                      </h2>
                      <p className="type-body mt-2 text-[14px]">
                        Do not use this form. Call the emergency services, or
                        come straight to our emergency department, which is open
                        every hour of every day.
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

                {/* What happens next */}
                <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
                  <h2 className="font-sans text-[16px] font-bold text-ink-800">
                    What happens next
                  </h2>
                  <ol className="mt-5 flex flex-col gap-5">
                    {steps.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span
                          aria-hidden
                          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 font-sans text-[14px] font-bold text-brand-600"
                        >
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-sans text-[14.5px] font-bold text-ink-800">
                            {step.title}
                          </p>
                          <p className="type-body mt-1 text-[13.5px]">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Prefer to call */}
                <div className="rounded-[var(--radius-card)] border border-ink-200 bg-ink-50 p-6">
                  <h2 className="font-sans text-[16px] font-bold text-ink-800">
                    Prefer to call?
                  </h2>
                  <p className="type-body mt-2 text-[14px]">
                    Our scheduling line is open Monday to Friday, 07:00 – 20:00.
                  </p>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="mt-4 inline-flex items-center gap-2 font-sans text-[15px] font-bold text-brand-600 underline underline-offset-4"
                  >
                    <Phone className="size-4" aria-hidden />
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
