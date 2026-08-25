import { articles } from "@/lib/data/articles";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/layout/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ArticleCard } from "@/components/articles/article-card";

export function ArticlesPreview() {
  const [lead, ...rest] = articles.slice(0, 5);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="lg:max-w-[46rem]">
            <SectionHeading
              title="Health"
              accent="articles"
              description="General wellbeing information written by our clinical teams. None of it replaces a conversation with your own clinician."
            />
          </Reveal>

          <Reveal delay={0.08} className="shrink-0">
            <ButtonLink href="/articles" variant="outline" size="lg">
              Read all articles
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
          <Reveal className="h-full">
            <ArticleCard article={lead} featured className="h-full" />
          </Reveal>

          <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2">
            {rest.map((article) => (
              <RevealItem key={article.id} as="li" className="h-full">
                <ArticleCard article={article} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
