import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { DotField, ChevronWatermark } from "@/components/layout/patterns";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const routes = [
  { label: "Book an appointment", href: "/appointments" },
  { label: "Find a doctor", href: "/doctors" },
  { label: "Our services", href: "/services" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef3fb] via-[#f6f8fc] to-white" />
        <DotField opacity="opacity-60" />
        <ChevronWatermark className="opacity-70" />
      </div>

      <Container className="text-center">
        <p className="type-eyebrow">Error 404</p>
        <h1 className="type-h1 mx-auto mt-5 max-w-[20ch] text-ink-800">
          We could not find that page
        </h1>
        <p className="type-lead mx-auto mt-6 max-w-[52ch]">
          The link may be out of date, or the page may have moved. Here are the
          places most people are looking for.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact us
          </ButtonLink>
        </div>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="group flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-ink-200 bg-white px-5 py-4 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_18px_40px_-30px_rgba(21,50,107,0.6)]"
              >
                <span className="font-sans text-[15px] font-bold text-ink-800">
                  {route.label}
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-brand-500 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
