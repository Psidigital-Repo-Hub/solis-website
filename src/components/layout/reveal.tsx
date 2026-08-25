"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance animation.
 *
 * Motion is a garnish, not a gate: when a visitor prefers reduced motion,
 * content renders immediately at its final position with no transform.
 */

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds of delay before this element animates. */
  delay?: number;
  /** Direction the element travels from. */
  from?: "bottom" | "left" | "right" | "none";
  as?: "div" | "section" | "li" | "article" | "header";
}

/**
 * Travel distances are kept small: enough to register as movement, not
 * enough to read as a slide. Horizontal offsets are modest because on
 * narrow viewports the element being animated is usually full width.
 */
const offsets = {
  bottom: { y: 22, x: 0 },
  left: { y: 0, x: -18 },
  right: { y: 0, x: 18 },
  none: { y: 0, x: 0 },
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];
  const offset = offsets[from];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: offset.y, x: offset.x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children on scroll into view. Children should be
 * `RevealItem` elements.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px 0px -70px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Above-the-fold entrance. Unlike `RevealGroup` this runs on mount rather
 * than on scroll, so the hero animates without waiting for an intersection.
 */
export function Entrance({
  children,
  className,
  stagger = 0.1,
  delay = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function EntranceItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={cn(className)} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
