"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Leaf, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4"
      aria-label="Liberty Landscapes, back to top"
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-full border transition-transform duration-300 group-hover:-rotate-6",
          inverse
            ? "border-white/30 bg-white/10 text-sage-100"
            : "border-forest/15 bg-sage-100 text-forest",
        )}
      >
        <Leaf className="size-5" strokeWidth={1.7} />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "font-display block text-[1.55rem] font-semibold tracking-[-0.02em]",
            inverse ? "text-cream" : "text-forest",
          )}
        >
          Liberty
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.29em]",
            inverse ? "text-white/60" : "text-forest/55",
          )}
        >
          Landscapes
        </span>
      </span>
    </a>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/15 text-white">
      <div className="site-container flex h-20 items-center justify-between lg:h-24">
        <Brand inverse />

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/78 transition-colors hover:text-white focus-visible:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#plan"
          className="group hidden items-center gap-3 rounded-full border border-white/25 bg-white px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-cream lg:inline-flex"
        >
          Start your project
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-x-0 top-20 bottom-0 bg-forest px-6 py-10 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/12 py-5 font-display text-4xl text-cream"
                >
                  {item.label}
                  <span className="font-sans text-xs tracking-widest text-white/40">
                    0{index + 1}
                  </span>
                </a>
              ))}
              <a
                href="#plan"
                onClick={() => setOpen(false)}
                className="mt-10 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brass px-6 font-semibold text-forest"
              >
                Start your project <ArrowUpRight className="size-5" />
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
