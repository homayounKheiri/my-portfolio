"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, MessageSquare } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center px-4 pt-28 pb-20 sm:px-6"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow pill */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-ink-muted backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[68px]"
          >
            Consultant &amp; Specialist in{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-gradient-brand">AI Business</span>
            </span>{" "}
            Intelligence &amp; Automation
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-[17px]"
          >
            Consultant and specialist in business automation and AI-driven
            optimization — and a web developer crafting premium, high-performance
            digital products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <button
              onClick={() => scrollToId("projects")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_34px_-10px_rgba(249,115,22,0.75)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_40px_-10px_rgba(249,115,22,0.9)] active:scale-95 focus-brand sm:w-auto"
            >
              <Sparkles className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
              View Projects
            </button>
            <button
              onClick={() => scrollToId("chat")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white/70 px-6 py-3.5 text-[14.5px] font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:border-ink/30 hover:bg-white active:scale-95 focus-brand sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 text-brand transition-transform duration-500 group-hover:-translate-y-0.5" />
              Start a Conversation
              <ArrowUpRight
                className="h-4 w-4 text-ink-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                strokeWidth={2.2}
              />
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center gap-3 text-[12.5px] text-ink-muted"
          >
            <div className="flex -space-x-2">
              {["#F97316", "#111827", "#FB923C", "#374151"].map((c, i) => (
                <span
                  key={i}
                  className="h-6 w-6 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>
              Trusted across SaaS, commerce &amp; service teams — replies in
              ~5&nbsp;minutes.
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToId("projects")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink sm:flex"
        aria-label="Scroll to projects"
      >
        Scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
