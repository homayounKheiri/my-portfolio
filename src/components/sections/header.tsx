"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useScrolled } from "@/hooks/use-scrolled";

const NAV = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Tech Stack" },
  { id: "chat", label: "AI Chat" },
  { id: "contact", label: "Contact" },
];

// Sections rendered on a charcoal background.
const DARK_SECTIONS = new Set(["projects", "chat"]);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Header() {
  const active = useScrollSpy(NAV.map((n) => n.id));
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  const handleNav = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  // Adapt header chrome to the section currently in view.
  const overDark = DARK_SECTIONS.has(active);

  // Bar background
  const barClass = !scrolled
    ? "bg-transparent"
    : overDark
      ? "glass-dark-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
      : "glass-strong shadow-[0_10px_40px_-20px_rgba(17,24,39,0.25)]";

  // Text palette
  const logoText = overDark ? "text-white" : "text-ink";
  const navActive = overDark ? "text-white" : "text-ink";
  const navIdle = overDark ? "text-stone-400 hover:text-white" : "text-ink-muted hover:text-ink";
  const menuIcon = overDark ? "text-white" : "text-ink";
  const menuHover = overDark ? "hover:bg-white/10" : "hover:bg-secondary";

  // Logo box: invert contrast depending on header tone
  const logoBox = overDark
    ? "bg-white text-ink shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)]"
    : "bg-ink text-white shadow-[0_6px_20px_-6px_rgba(17,24,39,0.5)]";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-5 ${barClass}`}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          className="group flex items-center gap-2.5 focus-brand rounded-lg"
          aria-label="Go to top"
        >
          <span
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 group-hover:rotate-[8deg] ${logoBox}`}
          >
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="font-mono text-[15px] font-bold tracking-tight">
              A
            </span>
          </span>
          <span
            className={`hidden text-[15px] font-semibold tracking-tight transition-colors duration-500 sm:block ${logoText}`}
          >
            Aria<span className="text-brand">.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                data-active={isActive}
                className={`nav-underline rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 focus-brand ${
                  isActive ? navActive : navIdle
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNav("contact")}
          className="hidden items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.7)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.85)] active:scale-95 focus-brand md:flex"
        >
          Let&apos;s talk
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>

        {/* Mobile trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors md:hidden focus-brand ${menuIcon} ${menuHover}`}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown — always light for consistency & readability */}
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
              {NAV.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                    onClick={() => handleNav(item.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-brand-soft text-brand-foreground"
                        : "text-ink hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    )}
                  </motion.button>
                );
              })}
              <button
                onClick={() => handleNav("contact")}
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
