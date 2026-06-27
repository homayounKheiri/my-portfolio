"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useScrolled } from "@/hooks/use-scrolled";

type View = "home" | "projects";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Header({
  view,
  onViewChange,
}: {
  view: View;
  onViewChange: (v: View) => void;
}) {
  // Glass appears only after we leave the hero (home view only).
  const scrolled = useScrolled(120);
  const [open, setOpen] = useState(false);

  const goHome = () => {
    setOpen(false);
    if (view !== "home") {
      onViewChange("home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goProjects = () => {
    setOpen(false);
    if (view !== "projects") {
      onViewChange("projects");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goContact = () => {
    setOpen(false);
    if (view !== "home") {
      onViewChange("home");
      // wait for view to mount then scroll
      setTimeout(() => scrollToId("contact"), 80);
    } else {
      scrollToId("contact");
    }
  };

  const barClass =
    view === "projects" || scrolled
      ? "glass-strong shadow-[0_10px_40px_-20px_rgba(17,24,39,0.18)]"
      : "bg-transparent";

  const navItems: { label: string; active: boolean; onClick: () => void }[] = [
    { label: "Home", active: view === "home", onClick: goHome },
    { label: "Projects", active: view === "projects", onClick: goProjects },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <div
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4 ${barClass}`}
      >
        {/* Desktop nav — Home / Projects */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              data-active={item.active}
              className={`nav-underline rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-300 focus-brand ${
                item.active ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={goContact}
          className="hidden items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.7)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.85)] active:scale-95 focus-brand md:flex"
        >
          Let&apos;s talk
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>

        {/* Mobile trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-secondary md:hidden focus-brand"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-[72px] z-50 md:hidden"
          >
            <div className="glass-strong rounded-2xl p-2 shadow-[0_20px_50px_-20px_rgba(17,24,39,0.35)]">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                  onClick={item.onClick}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                    item.active
                      ? "bg-brand-soft text-brand-foreground"
                      : "text-ink hover:bg-secondary"
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  )}
                </motion.button>
              ))}
              <button
                onClick={goContact}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-3 text-[15px] font-semibold text-white"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
