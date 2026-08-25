import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { AudienceSwitcher } from "@/components/sections/audience-switcher";
import { OutcomesBand } from "@/components/sections/outcomes-band";
import { Partners } from "@/components/sections/partners";
import { ServicesOverview } from "@/components/sections/services-overview";
import { CareModel } from "@/components/sections/care-model";
import { DoctorsPreview } from "@/components/sections/doctors-preview";
import { FacilitiesGrid } from "@/components/sections/facilities-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { ResourcesTabs } from "@/components/sections/resources-tabs";
import { ArticlesPreview } from "@/components/sections/articles-preview";
import { LeadershipQuote } from "@/components/sections/leadership-quote";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AudienceSwitcher />
      <OutcomesBand />
      <Partners />
      <ServicesOverview />
      <CareModel />
      <DoctorsPreview />
      <FacilitiesGrid limit={3} tone="white" />
      <Testimonials />
      <ResourcesTabs />
      <ArticlesPreview />
      <LeadershipQuote />
      <CtaBanner
        title="Get in touch"
        description="Questions about an appointment, a referral or a department? Our team will point you to the right person."
        ctaLabel="Contact us"
        ctaHref="/contact"
        secondaryLabel="Book an appointment"
        secondaryHref="/appointments"
        image="/images/cta-reception.jpg"
      />
    </>
  );
}
