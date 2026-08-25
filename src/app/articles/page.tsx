import type { Metadata } from "next";

import { articles } from "@/lib/data/articles";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { RevealGroup, RevealItem } from "@/components/layout/reveal";
import { ArticleCard } from "@/components/articles/article-card";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Health articles",
  description:
    "General wellbeing information written by the clinical teams at Solis Medical Center. Not a substitute for individual medical advice.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Health articles | Solis Medical Center",
    description:
      "General wellbeing information written by the clinical teams at Solis Medical Center.",
    url: "/articles",
  },
};

export default function ArticlesPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Health articles"
        title="Clear information,"
        accent="written by clinicians"
        description="General wellbeing information from our departments. None of it replaces a conversation with your own clinician about your circumstances."
        crumbs={[{ label: "Home", href: "/" }, { label: "Articles" }]}
      />

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <RevealItem>
            <ArticleCard article={lead} featured headingAs="h2" />
          </RevealItem>

          <RevealGroup
            as="ul"
            className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((article) => (
              <RevealItem key={article.id} as="li" className="h-full">
                <ArticleCard article={article} className="h-full" headingAs="h2" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaBanner
        title="Have a question about your care?"
        description="Articles cover general ground. For anything specific to you, speak to your care team directly."
        ctaLabel="Contact us"
        ctaHref="/contact"
        secondaryLabel="Book an appointment"
        secondaryHref="/appointments"
        image="/images/cta-support.jpg"
      />
    </>
  );
}
