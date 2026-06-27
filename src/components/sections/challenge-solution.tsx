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
    <section
      id="flow"
      className="section-light relative px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl">
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

        {/* 2-column grid — narrow square-ish cards, generous gaps */}
        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.question}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <StatementCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Statement card with overlapping top icon ---------- */

function StatementCard({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-border bg-white px-6 pb-7 pt-10 shadow-[0_10px_36px_-14px_rgba(17,24,39,0.14)] sm:px-7 sm:pb-8 sm:pt-11">
      {/* Large icon overlapping the top edge */}
      <span className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-orange-400 text-white shadow-[0_10px_24px_-8px_rgba(249,115,22,0.65)] sm:left-6 sm:h-14 sm:w-14">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.9} />
      </span>

      {/* Question */}
      <p className="text-pretty text-[14.5px] font-semibold leading-snug tracking-tight text-ink sm:text-[15.5px]">
        {card.question}
      </p>

      {/* Thin divider */}
      <div className="my-3 h-px w-full bg-border" />

      {/* Answer */}
      <p className="text-pretty text-[12.5px] leading-relaxed text-ink-muted sm:text-[13px]">
        {card.answer}
      </p>
    </div>
  );
}
