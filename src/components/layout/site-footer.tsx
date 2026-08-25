import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { footerNav } from "@/components/navigation/nav-config";
import { Logo } from "@/components/navigation/logo";
import { Container } from "@/components/layout/container";
import { Icon } from "@/components/ui/icon";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { address } = siteConfig.contact;

  return (
    <footer className="border-t border-ink-200 bg-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          {/* Brand column */}
          <div className="max-w-sm">
            <Logo />
            <p className="type-body mt-5 max-w-[34ch]">{siteConfig.tagline}</p>

            <p className="mt-8 font-sans text-[13px] font-bold text-ink-800">
              Follow us
            </p>
            <ul className="mt-3 flex items-center gap-2.5">
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

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {siteConfig.accreditations.map((item) => (
                <li
                  key={item}
                  className="font-body text-[11px] uppercase tracking-[0.09em] text-ink-500"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-labelledby={`footer-${group.title}`}>
              <h2
                id={`footer-${group.title}`}
                className="font-sans text-[14px] font-bold text-ink-800"
              >
                {group.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-[14.5px] text-ink-600 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-14 grid gap-8 border-t border-ink-200 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand-500" aria-hidden />
            <div>
              <p className="font-sans text-[13px] font-bold text-ink-800">Visit us</p>
              <address className="type-body mt-1 not-italic">
                {address.line1}, {address.line2}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-brand-500" aria-hidden />
            <div>
              <p className="font-sans text-[13px] font-bold text-ink-800">Call us</p>
              <p className="type-body mt-1">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="transition-colors hover:text-brand-600"
                >
                  {siteConfig.contact.phone}
                </a>
                <br />
                <span className="text-ink-500">Emergency</span>{" "}
                <a
                  href={siteConfig.contact.emergencyHref}
                  className="font-semibold text-ink-800 transition-colors hover:text-brand-600"
                >
                  {siteConfig.contact.emergency}
                </a>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-brand-500" aria-hidden />
            <div>
              <p className="font-sans text-[13px] font-bold text-ink-800">Email us</p>
              <p className="type-body mt-1">
                <a
                  href={siteConfig.contact.emailHref}
                  className="transition-colors hover:text-brand-600"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-ink-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[13px] text-ink-500">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy notice", "Terms of use", "Accessibility", "Cookies"].map(
              (label) => (
                <li key={label}>
                  <Link
                    href="/contact"
                    className="font-body text-[13px] text-ink-500 transition-colors hover:text-brand-600"
                  >
                    {label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <p className="mt-8 max-w-[80ch] font-body text-[12px] leading-relaxed text-ink-500">
          Solis Medical Center is a fictional organisation created for
          demonstration purposes. Content on this site is illustrative, is not
          medical advice, and should not be used to make health decisions.
        </p>
      </Container>
    </footer>
  );
}
