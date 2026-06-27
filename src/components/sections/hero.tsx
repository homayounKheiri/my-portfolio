"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";
import { useCursorGlow } from "@/hooks/use-cursor-glow";
import { AutomationFlow } from "./automation-flow";

const EASE = [0.16, 1, 0.3, 1] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Hero() {
  const reduce = useReducedMotion();
  const { ref, glowRef, size } = useCursorGlow<HTMLDivElement>({
    size: 560,
    opacity: 0.45,
    smoothing: 0.12,
  });

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.12 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="section-light relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32"
    >
      {/* Active background: animated panning grid + soft sheen */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-grid bg-grid-mask animate-grid-pan"
          animate={reduce ? undefined : { opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 30% 40%, rgba(249,115,22,0.05), transparent 70%)",
          }}
          animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Soft orange cursor glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 rounded-full opacity-0 transition-opacity duration-700"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at center, rgba(249,115,22,0.5), rgba(249,115,22,0.18) 35%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* LEFT — typography headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              AI Automation Consultancy
            </span>
          </motion.div>

          {/* Headline — simple, readable, with keyword emphasis */}
          <motion.h1
            variants={item}
            className="mt-7 max-w-xl text-balance text-[34px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[44px] md:text-[52px]"
          >
            <span className="text-brand">99%</span> of repetitive tasks can be{" "}
            <span className="text-brand">automated</span> with{" "}
            <span className="text-brand">AI</span>
            <span className="text-ink/30">.</span>
          </motion.h1>

          {/* Subtitle — smaller, lighter */}
          <motion.p
            variants={item}
            className="mt-7 max-w-md text-pretty text-[14.5px] font-light leading-relaxed text-ink-muted sm:text-[15.5px]"
          >
            Web Developer and Consultant and Specialist in AI Business
            Intelligence and Automation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-8 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row"
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
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-all duration-300 hover:border-ink/30 active:scale-95 focus-brand sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 text-brand transition-transform duration-500 group-hover:-translate-y-0.5" />
              Start a Conversation
              <ArrowUpRight
                className="h-4 w-4 text-ink-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                strokeWidth={2.2}
              />
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT — interactive automation flow infographic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="relative"
        >
          <AutomationFlow />
        </motion.div>
      </div>
    </section>
  );
}
