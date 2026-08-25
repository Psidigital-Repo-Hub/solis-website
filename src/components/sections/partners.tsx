import Image from "next/image";

import { partners } from "@/lib/data/content";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/layout/reveal";

/** Referral and research partners. All organisations shown are fictional. */
export function Partners() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            title="Our referral"
            accent="network"
            description="We work alongside primary care practices, community services and regional providers so patients move between them without losing continuity."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <li key={partner.name} className="flex justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={44}
                  className="h-11 w-auto opacity-55 grayscale transition-opacity duration-300 hover:opacity-90"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
