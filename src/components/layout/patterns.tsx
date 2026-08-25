import { cn } from "@/lib/utils";

/**
 * Decorative surface treatments.
 *
 * All of these are purely presentational and are hidden from assistive
 * technology. They carry the reference design's two signatures: a fine dot
 * field and oversized chevron watermarks.
 */

export function DotField({
  className,
  opacity = "opacity-[0.35]",
}: {
  className?: string;
  opacity?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-dots text-ink-300",
        opacity,
        className,
      )}
    />
  );
}

/** Large outlined chevrons used behind pale sections. */
export function ChevronWatermark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "onBrand";
}) {
  const stroke = tone === "onBrand" ? "#ffffff" : "#2e6be6";
  const fillOpacity = tone === "onBrand" ? 0.09 : 0.05;

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMax meet"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <path
        d="M600 60 L1180 640 L1180 700 L600 120 L20 700 L20 640 Z"
        fill={stroke}
        fillOpacity={fillOpacity}
      />
      <path
        d="M600 300 L900 600 L900 700 L600 400 L300 700 L300 600 Z"
        fill={stroke}
        fillOpacity={fillOpacity * 0.8}
      />
    </svg>
  );
}

/** Solid chevron used as a foreground shape overlapping photography. */
export function ChevronMark({
  className,
  color = "#ffffff",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute", className)}
    >
      <path d="M0 200 L200 0 L400 200 Z" fill={color} />
    </svg>
  );
}

/** Dotted texture laid over photography, as in the reference imagery. */
export function PhotoTexture({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-dots text-white/18 mix-blend-overlay",
        className,
      )}
    />
  );
}

/** Pale page backdrop used behind page heroes. */
export function PageBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef3fb] via-[#f6f8fc] to-white" />
      <DotField opacity="opacity-60" />
      <ChevronWatermark className="opacity-70" />
    </div>
  );
}
