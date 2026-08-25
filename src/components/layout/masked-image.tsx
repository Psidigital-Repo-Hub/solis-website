import Image from "next/image";

import { cn } from "@/lib/utils";
import { PhotoTexture } from "@/components/layout/patterns";

export type MaskVariant = "hero" | "feature" | "notch" | "shoulder" | "band" | "none";

const maskClass: Record<MaskVariant, string> = {
  hero: "clip-hero",
  feature: "clip-feature",
  notch: "clip-notch",
  shoulder: "clip-shoulder",
  band: "clip-band",
  none: "",
};

interface MaskedImageProps {
  src: string;
  alt: string;
  /** Which clip-path from the design system to apply. */
  mask?: MaskVariant;
  /** Tailwind aspect-ratio utility, e.g. "aspect-[4/3]". */
  ratio?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Overlay the dotted photographic texture. */
  texture?: boolean;
}

/**
 * Photography wrapped in the brand's chevron geometry.
 *
 * The mask is applied to a wrapper rather than the image itself so that
 * `next/image` keeps its own layout box and never causes a shift.
 */
export function MaskedImage({
  src,
  alt,
  mask = "none",
  ratio = "aspect-[4/3]",
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  texture = true,
}: MaskedImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        ratio,
        maskClass[mask],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
      {texture ? <PhotoTexture /> : null}
    </div>
  );
}
