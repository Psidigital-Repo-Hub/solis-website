import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Doctor } from "@/types";
import { getServiceName } from "@/lib/data/services";

export function DoctorCard({
  doctor,
  className,
  headingAs: Heading = "h3",
}: {
  doctor: Doctor;
  className?: string;
  /** Raise to h2 when the card sits directly beneath the page h1. */
  headingAs?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white",
        "transition-[border-color,box-shadow,transform] duration-300",
        "hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_22px_50px_-32px_rgba(21,50,107,0.6)]",
        className,
      )}
    >
      <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-ink-100">
        <Image
          src={doctor.image}
          alt={`Portrait of ${doctor.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-dots text-white/18 mix-blend-overlay"
        />
        <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-900/55 to-transparent px-4 pb-3 pt-10">
          <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.09em] text-white/85">
            {getServiceName(doctor.department)}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading className="font-sans text-[18px] font-bold tracking-[-0.018em] text-ink-800">
          {doctor.name}
          <span className="ml-1.5 font-medium text-ink-500">
            {doctor.credentials}
          </span>
        </Heading>
        <p className="mt-1.5 font-body text-[14px] text-brand-600">
          {doctor.specialty}
        </p>
        <p className="type-body mt-3 flex-1 text-[13.5px]">
          {doctor.experience} years of practice · {doctor.languages.join(", ")}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.09em] text-brand-600">
          View profile
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
