"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { primaryNav, type NavItem } from "@/components/navigation/nav-config";
import { Logo } from "@/components/navigation/logo";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ButtonLink } from "@/components/ui/button";

/**
 * Site header.
 *
 * At the top of the page the bar floats as an inset card over the hero
 * backdrop, matching the reference art direction. Once the visitor scrolls,
 * it docks to the viewport edge and gains a shadow so it stays legible over
 * arbitrary content beneath.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[padding] duration-300",
        scrolled ? "pt-0" : "pt-4 sm:pt-6",
      )}
    >
      <div
        className={cn(
          "transition-[padding] duration-300",
          scrolled ? "px-0" : "px-4 sm:px-6 lg:px-8",
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center gap-4 bg-white transition-all duration-300",
            "border-ink-200",
            scrolled
              ? "max-w-none border-b px-5 py-3 shadow-[0_6px_24px_-14px_rgba(21,50,107,0.35)] sm:px-8 lg:px-10"
              : "max-w-[calc(var(--container-page)+2rem)] rounded-[10px] border px-5 py-3 shadow-[0_10px_40px_-24px_rgba(21,50,107,0.4)] sm:px-6",
          )}
        >
          <Logo />

          <nav
            className="ml-auto hidden items-center gap-1 lg:flex"
            aria-label="Main"
          >
            {primaryNav.map((item) => (
              <NavEntry key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-6 lg:gap-3">
            <a
              href={siteConfig.contact.emergencyHref}
              className={cn(
                "hidden items-center gap-2 rounded-[var(--radius-btn)] px-3 py-2 xl:flex",
                "font-body text-[13px] text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-800",
              )}
            >
              <Phone className="size-4 shrink-0 text-brand-500" aria-hidden />
              <span>
                <span className="sr-only">Emergency line: </span>
                {siteConfig.contact.emergency}
              </span>
            </a>

            {/* The booking CTA stays reachable at every width; only its
                label shortens on the narrowest screens. */}
            <ButtonLink
              href="/appointments"
              size="sm"
              className="sm:hidden"
            >
              Book
            </ButtonLink>
            <ButtonLink
              href="/appointments"
              size="md"
              className="hidden sm:inline-flex"
            >
              Book appointment
            </ButtonLink>

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop nav entry, with an optional disclosure menu                */
/* ------------------------------------------------------------------ */

function NavEntry({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  React.useEffect(() => cancelClose, []);

  // Close on Escape, and whenever focus leaves the whole group.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      setOpen(false);
    }
  };

  const onBlur = (event: React.FocusEvent) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  const linkClass = cn(
    "relative inline-flex items-center gap-1 rounded-[var(--radius-btn)] px-3 py-2.5",
    "font-sans text-[14px] font-bold tracking-[-0.005em] transition-colors",
    isActive ? "text-brand-600" : "text-ink-700 hover:text-brand-600",
  );

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={linkClass}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <Link
        href={item.href}
        className={linkClass}
        aria-current={isActive ? "page" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(false)}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3.5 text-ink-400 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </Link>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="absolute left-0 top-full z-50 pt-3"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={cn(
                "w-[22rem] overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white p-2",
                "shadow-[0_24px_60px_-30px_rgba(21,50,107,0.5)]",
              )}
            >
              <ul>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block rounded-[6px] px-3 py-2.5 transition-colors hover:bg-brand-50"
                      onClick={() => setOpen(false)}
                    >
                      <span className="block font-sans text-[14px] font-bold text-ink-800">
                        {child.label}
                      </span>
                      {child.description ? (
                        <span className="mt-0.5 block font-body text-[12.5px] leading-snug text-ink-500">
                          {child.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={item.href}
                className="mt-1 block rounded-[6px] border-t border-ink-100 px-3 pb-1 pt-3 font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-brand-600 transition-colors hover:text-brand-700"
                onClick={() => setOpen(false)}
              >
                View all {item.label.toLowerCase()}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
