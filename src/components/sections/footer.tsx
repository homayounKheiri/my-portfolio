"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "flow", label: "Automation" },
  { id: "chat", label: "AI Chat" },
  { id: "contact", label: "Contact" },
];

const SOCIAL = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="section-light relative mt-auto border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <motion.button
            onClick={() => scrollToId("hero")}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
              <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-brand" />
              <span className="font-mono text-[13px] font-bold">A</span>
            </span>
            <span className="text-[14px] font-semibold tracking-tight text-ink">
              Aria<span className="text-brand">.</span>
            </span>
          </motion.button>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-ink-muted transition-all hover:scale-105 hover:border-brand/40 hover:text-brand focus-brand"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
            <button
              onClick={() => scrollToId("hero")}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-ink-muted transition-all hover:scale-105 hover:border-brand/40 hover:text-brand focus-brand"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-[12px] text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Aria. Crafted with intent.</p>
          <p>AI Business Intelligence · Automation · Web</p>
        </div>
      </div>
    </footer>
  );
}
