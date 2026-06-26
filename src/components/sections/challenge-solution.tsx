"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Keyboard,
  Database,
  MessagesSquare,
  Bot,
  Unlink,
  Network,
  Workflow,
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileText,
  LineChart,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Pair = {
  challenge: { label: string; icon: React.ElementType };
  solution: { label: string; icon: React.ElementType };
};

const PAIRS: Pair[] = [
  {
    challenge: { label: "Manual Data Entry", icon: Keyboard },
    solution: { label: "Automated Data Processing", icon: Database },
  },
  {
    challenge: { label: "Repetitive Support", icon: MessagesSquare },
    solution: { label: "AI Assistant", icon: Bot },
  },
  {
    challenge: { label: "Disconnected Tools", icon: Unlink },
    solution: { label: "Unified Integration", icon: Network },
  },
  {
    challenge: { label: "Manual Business Flow", icon: Workflow },
    solution: { label: "Automated Flow", icon: Zap },
  },
  {
    challenge: { label: "Human Errors", icon: AlertTriangle },
    solution: { label: "Reliable Processes", icon: ShieldCheck },
  },
  {
    challenge: { label: "Manual Reporting", icon: FileText },
    solution: { label: "Real-time Dashboard", icon: LineChart },
  },
];

export function ChallengeSolution() {
  const reduce = useReducedMotion();

  return (
    <section id="flow" className="section-dark relative px-4 py-24 sm:px-6 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />
      <div className="relative mx-auto w-full max-w-6xl">
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
            className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[44px]"
          >
            From challenge to solution
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-3 max-w-md text-[14.5px] text-stone-400"
          >
            Every manual bottleneck, paired with its intelligent fix.
          </motion.p>
        </div>

        {/* Pairs grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PAIRS.map((pair, i) => (
            <motion.div
              key={pair.challenge.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <PairRow pair={pair} index={i} reduce={!!reduce} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- One challenge → solution pair ---------- */

function PairRow({
  pair,
  index,
  reduce,
}: {
  pair: Pair;
  index: number;
  reduce: boolean;
}) {
  return (
    <div className="group/pair relative flex items-stretch gap-3">
      {/* Challenge card */}
      <ChallengeCard
        icon={pair.challenge.icon}
        label={pair.challenge.label}
      />

      {/* Animated flow connector */}
      <FlowConnector delay={index * 0.3} reduce={reduce} />

      {/* Solution card */}
      <SolutionCard icon={pair.solution.icon} label={pair.solution.label} />
    </div>
  );
}

/* ---------- Challenge card (muted) ---------- */

function ChallengeCard({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-all duration-500 group-hover/pair:border-white/20 group-hover/pair:bg-white/[0.05]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-stone-400 transition-all duration-500 group-hover/pair:scale-110">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="text-[13px] font-semibold leading-tight text-stone-300">
        {label}
      </span>
    </div>
  );
}

/* ---------- Solution card (highlighted orange) ---------- */

function SolutionCard({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-brand/30 bg-brand/[0.08] px-4 py-4 shadow-[0_8px_30px_-12px_rgba(249,115,22,0.4)] transition-all duration-500 group-hover/pair:border-brand/50 group-hover/pair:bg-brand/[0.12] group-hover/pair:shadow-[0_14px_40px_-12px_rgba(249,115,22,0.55)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-[0_8px_20px_-8px_rgba(249,115,22,0.7)] transition-all duration-500 group-hover/pair:scale-110 group-hover/pair:rotate-[6deg]">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="text-[13px] font-semibold leading-tight text-white">
        {label}
      </span>
    </div>
  );
}

/* ---------- Animated flow connector (arrow + traveling dot) ---------- */

function FlowConnector({ delay, reduce }: { delay: number; reduce: boolean }) {
  return (
    <div className="relative flex w-8 shrink-0 items-center justify-center sm:w-10">
      <svg
        viewBox="0 0 40 24"
        fill="none"
        className="h-6 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`flow-${delay}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        {/* base line */}
        <line
          x1="2"
          y1="12"
          x2="30"
          y2="12"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {/* arrow head */}
        <path
          d="M28 6 L36 12 L28 18"
          stroke="#F97316"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {/* traveling dot */}
      {!reduce && (
        <motion.span
          className="pointer-events-none absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_8px_rgba(249,115,22,0.9)]"
          initial={{ left: "4%", opacity: 0 }}
          animate={{ left: ["4%", "72%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        />
      )}
    </div>
  );
}
