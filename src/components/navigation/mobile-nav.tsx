"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { primaryNav } from "@/components/navigation/nav-config";
import { Logo } from "@/components/navigation/logo";
import { ButtonLink } from "@/components/ui/button";

export function MobileNav({ tone = "default" }: { tone?: "default" | "onBrand" }) {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Navigating closes the drawer. Handled on the links themselves rather
  // than in an effect on `pathname`, which would fire a cascading render.
  const close = () => setOpen(false);

  const panelMotion = reduceMotion
    ? { initial: false as const }
    : {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-[var(--radius-btn)]",
            "border border-ink-200 bg-white text-ink-700 transition-colors",
            "hover:border-ink-300 hover:bg-ink-50 lg:hidden",
            tone === "onBrand" && "border-white/40 bg-white/10 text-white hover:bg-white/20",
          )}
          aria-label="Open main menu"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-ink-900/45 backdrop-blur-[2px]"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={reduceMotion ? {} : { opacity: 1 }}
                exit={reduceMotion ? {} : { opacity: 0 }}
                transition={{ duration: 0.22 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  "fixed inset-y-0 right-0 z-50 flex w-[min(24rem,92vw)] flex-col",
                  "bg-white shadow-[0_0_60px_rgba(21,50,107,0.22)]",
                )}
                {...panelMotion}
              >
                <Dialog.Title className="sr-only">Main menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Site navigation and contact options
                </Dialog.Description>

                <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
                  <Logo />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-[var(--radius-btn)] border border-ink-200 text-ink-600 transition-colors hover:bg-ink-50"
                      aria-label="Close main menu"
                    >
                      <X className="size-5" aria-hidden />
                    </button>
                  </Dialog.Close>
                </div>

                <nav
                  className="flex-1 overflow-y-auto px-5 py-4"
                  aria-label="Main"
                >
                  <ul className="flex flex-col">
                    {primaryNav.map((item) => {
                      const isOpen = expanded === item.label;
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                      return (
                        <li
                          key={item.label}
                          className="border-b border-ink-100 last:border-0"
                        >
                          <div className="flex items-center">
                            <Link
                              href={item.href}
                              className={cn(
                                "flex-1 py-4 font-sans text-[17px] font-bold tracking-[-0.01em]",
                                isActive ? "text-brand-600" : "text-ink-800",
                              )}
                              aria-current={isActive ? "page" : undefined}
                              onClick={close}
                            >
                              {item.label}
                            </Link>

                            {item.children ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpanded(isOpen ? null : item.label)
                                }
                                aria-expanded={isOpen}
                                aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label} submenu`}
                                className="inline-flex size-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-50"
                              >
                                <ChevronDown
                                  className={cn(
                                    "size-4 transition-transform duration-200",
                                    isOpen && "rotate-180",
                                  )}
                                  aria-hidden
                                />
                              </button>
                            ) : null}
                          </div>

                          {item.children && isOpen ? (
                            <ul className="mb-3 flex flex-col gap-0.5 border-l-2 border-brand-100 pl-4">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="block py-2.5 font-body text-[14px] text-ink-600 transition-colors hover:text-brand-600"
                                    onClick={close}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="border-t border-ink-200 px-5 py-5">
                  <ButtonLink href="/appointments" size="lg" full onClick={close}>
                    Book an appointment
                  </ButtonLink>
                  <a
                    href={siteConfig.contact.emergencyHref}
                    className="mt-4 flex items-center justify-center gap-2 font-body text-[14px] text-ink-600 transition-colors hover:text-brand-600"
                  >
                    <Phone className="size-4 text-brand-500" aria-hidden />
                    <span>
                      Emergency{" "}
                      <span className="font-semibold text-ink-800">
                        {siteConfig.contact.emergency}
                      </span>
                    </span>
                  </a>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
