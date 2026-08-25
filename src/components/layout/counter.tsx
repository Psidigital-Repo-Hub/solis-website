"use client";

import * as React from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Seconds. */
  duration?: number;
}

/**
 * Counts up to `value` once, the first time it scrolls into view.
 *
 * The final value is always present in the DOM for assistive technology
 * via `aria-label`, and visitors who prefer reduced motion see the final
 * number immediately.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
  duration = 1.4,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setTick(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  // Derived rather than stored, so the reduced-motion path needs no effect.
  const display = reduceMotion ? value : tick;
  const formatted = `${prefix}${display.toLocaleString("en-GB")}${suffix}`;
  const finalLabel = `${prefix}${value.toLocaleString("en-GB")}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {/* The settled value is always readable; only the ticking number is
          hidden from assistive technology. */}
      <span className="sr-only">{finalLabel}</span>
      <span aria-hidden>{formatted}</span>
    </span>
  );
}
