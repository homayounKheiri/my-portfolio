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

        {/* Staggered card layout — alternating left/right offset */}
        <div className="mt-16 flex flex-col gap-10 sm:gap-14">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.question}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className={`flex ${
                i % 2 === 0
                  ? "justify-start sm:pr-[28%] lg:pr-[40%]"
                  : "justify-end sm:pl-[28%] lg:pl-[40%]"
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

/* ---------- Premium staggered statement card ---------- */

function StatementCard({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <div className="lift group flex w-full flex-col rounded-2xl border-2 border-dashed border-ink/15 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_22px_50px_-24px_rgba(249,115,22,0.28)] sm:p-7">
      {/* Icon beside the title */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        {/* Question — bold, beside icon */}
        <p className="text-pretty text-[16px] font-semibold leading-tight tracking-tight text-ink sm:text-[18px] lg:text-[19px]">
          {card.question}
        </p>
      </div>

      {/* Thin divider */}
      <div className="my-4 h-px w-full bg-gradient-to-r from-ink/15 via-ink/10 to-transparent" />

      {/* Answer — clear */}
      <p className="text-pretty text-[14px] leading-relaxed text-ink-muted sm:text-[15px]">
        {card.answer}
      </p>
    </div>
  );
}
