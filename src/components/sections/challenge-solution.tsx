"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Pair = { problem: string; solution: string };

const PAIRS: Pair[] = [
  { problem: "Manual Data Entry", solution: "Automated Data Processing" },
  { problem: "Repetitive Customer Support", solution: "AI Assistant" },
  { problem: "Multiple Disconnected Tools", solution: "Unified System Integration" },
  { problem: "Manual Business Flow", solution: "Automated Flow" },
  { problem: "Human Errors", solution: "Reliable Automated Processes" },
  { problem: "Manual Reporting", solution: "Real-time Dashboard" },
];

export function ChallengeSolution() {
  return (
    <section id="flow" className="section-light relative px-4 py-24 sm:px-6 sm:py-32">
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
            Why Automation
            <span className="h-px w-6 bg-brand/50" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[44px]"
          >
            From problem to solution
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAIRS.map((pair, i) => (
            <motion.div
              key={pair.problem}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: (i % 3) * 0.08,
              }}
              className="group"
            >
              <PremiumCard pair={pair} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Premium card: ✕ Problem · divider · ✓ Solution ---------- */

function PremiumCard({ pair }: { pair: Pair }) {
  return (
    <div className="lift flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-[0_4px_24px_-14px_rgba(17,24,39,0.12)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand/30 group-hover:shadow-[0_18px_44px_-20px_rgba(249,115,22,0.28)]">
      {/* Problem row */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-transform duration-500 group-hover:scale-110">
          <X className="h-4 w-4" strokeWidth={2.6} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted/70">
            Problem
          </p>
          <p className="truncate text-[14px] font-semibold leading-tight text-ink">
            {pair.problem}
          </p>
        </div>
      </div>

      {/* Thin divider */}
      <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Solution row */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[6deg]">
          <Check className="h-4 w-4" strokeWidth={2.8} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
            Solution
          </p>
          <p className="truncate text-[14px] font-semibold leading-tight text-ink">
            {pair.solution}
          </p>
        </div>
      </div>
    </div>
  );
}
