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
        <div className="mt-16 flex flex-col gap-6 sm:gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.question}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className={`flex ${
                i % 2 === 0
                  ? "justify-start sm:pr-[15%] lg:pr-[28%]"
                  : "justify-end sm:pl-[15%] lg:pl-[28%]"
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
    <div className="lift group flex w-full flex-col rounded-2xl border-2 border-dashed border-ink/15 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_22px_50px_-24px_rgba(249,115,22,0.28)] sm:p-8">
      {/* Contextual icon */}
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-500 group-hover:scale-110">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>

      {/* Question — large, bold */}
      <p className="mt-6 text-pretty text-[22px] font-semibold leading-tight tracking-tight text-ink sm:text-[26px] lg:text-[28px]">
        {card.question}
      </p>

      {/* Thin divider */}
      <div className="my-5 h-px w-full bg-gradient-to-r from-ink/15 via-ink/10 to-transparent" />

      {/* Answer — large, clear */}
      <p className="text-pretty text-[18px] leading-relaxed text-ink-muted sm:text-[20px]">
        {card.answer}
      </p>
    </div>
  );
}
