"use client";

import { motion } from "framer-motion";
import {
  MessagesSquare,
  Database,
  FileBarChart,
  Clock,
  CalendarClock,
  Users,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Card = {
  icon: React.ElementType;
  question: string;
  answer: string;
};

const CARDS: Card[] = [
  {
    icon: MessagesSquare,
    question: "Repetitive customer questions?",
    answer: "AI responds automatically.",
  },
  {
    icon: Database,
    question: "Manual data entry takes too much time?",
    answer: "Everything is recorded automatically.",
  },
  {
    icon: FileBarChart,
    question: "Creating reports every day?",
    answer: "Reports are generated automatically.",
  },
  {
    icon: Clock,
    question: "Customers waiting for replies?",
    answer: "Responses are sent instantly.",
  },
  {
    icon: CalendarClock,
    question: "Forgetting meetings and tasks?",
    answer: "The system saves everything and reminds you at the right time.",
  },
  {
    icon: Users,
    question: "Your team spends hours on repetitive work?",
    answer: "They can focus on more valuable tasks.",
  },
];

export function ChallengeSolution() {
  return (
    <section id="flow" className="section-light relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-5xl">
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
            Small questions, real outcomes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-3 max-w-md text-[14.5px] text-ink-muted"
          >
            The everyday frictions automation quietly removes.
          </motion.p>
        </div>

        {/* Staggered compact card layout — alternating left/right */}
        <div className="mt-14 flex flex-col gap-5 sm:gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.question}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE }}
              className={`flex ${
                i % 2 === 0
                  ? "justify-start sm:pr-[35%] lg:pr-[45%]"
                  : "justify-end sm:pl-[35%] lg:pl-[45%]"
              }`}
            >
              <StatementCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Compact statement card (soft shadow only, no hover) ---------- */

function StatementCard({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <div className="flex w-full flex-col rounded-xl border border-border bg-white p-4 shadow-[0_8px_30px_-12px_rgba(17,24,39,0.12)] sm:p-5">
      {/* Icon beside the question */}
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Icon className="h-4 w-4" strokeWidth={1.9} />
        </span>
        <p className="text-pretty text-[13.5px] font-semibold leading-snug tracking-tight text-ink sm:text-[14.5px]">
          {card.question}
        </p>
      </div>

      {/* Thin divider */}
      <div className="my-3 h-px w-full bg-border" />

      {/* Answer */}
      <p className="text-pretty text-[12.5px] leading-relaxed text-ink-muted sm:text-[13px]">
        {card.answer}
      </p>
    </div>
  );
}
