"use client";

import { motion } from "framer-motion";
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siNodedotjs,
  siPython,
  siLangchain,
  siN8n,
  siAnthropic,
  siTailwindcss,
  siVercel,
  siPostgresql,
  siPrisma,
  siDocker,
  siGit,
  siFigma,
  siGithubactions,
} from "simple-icons";

type Icon = { title: string; path: string };

const STACK: Icon[] = [
  siReact,
  siNextdotjs,
  siTypescript,
  siNodedotjs,
  siPython,
  siLangchain,
  siN8n,
  siAnthropic,
  siTailwindcss,
  siVercel,
  siPostgresql,
  siPrisma,
  siDocker,
  siGit,
  siFigma,
  siGithubactions,
] as unknown as Icon[];

const EASE = [0.16, 1, 0.3, 1] as const;

export function TechStack() {
  return (
    <section id="stack" className="section-light relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand"
          >
            <span className="h-px w-6 bg-brand/50" />
            Tools of the Trade
            <span className="h-px w-6 bg-brand/50" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[44px]"
          >
            The stack behind the work
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8">
          {STACK.map((icon, i) => (
            <motion.div
              key={icon.title}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: (i % 8) * 0.04 + Math.floor(i / 8) * 0.06,
              }}
              whileHover={{ y: -4 }}
              className="group relative flex aspect-square items-center justify-center rounded-2xl border border-border bg-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-brand/40 hover:bg-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-ink-muted transition-all duration-500 group-hover:scale-110 group-hover:text-brand sm:h-8 sm:w-8"
                aria-label={icon.title}
                role="img"
                fill="currentColor"
              >
                <path d={icon.path} />
              </svg>
              {/* hover glow */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_14px_30px_-12px_rgba(249,115,22,0.55)] transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center text-[13px] text-ink-muted"
        >
          A focused toolkit — from LLM orchestration to edge-rendered web.
        </motion.p>
      </div>
    </section>
  );
}
