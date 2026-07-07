"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Sparkles,
  MessageSquare,
  ArrowUpRight,
  ArrowUpLeft,
} from "lucide-react"
import { AutomationFlow } from "./automation-flow"
import { useI18n } from "@/lib/i18n"
import { useRouter } from "next/navigation"

const EASE = [0.16, 1, 0.3, 1] as const

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 84
  window.scrollTo({ top, behavior: "smooth" })
}

export function Hero() {
  const reduce = useReducedMotion()
  const { t, locale } = useI18n()
  const router = useRouter()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.12 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  }

  return (
    <section
      id="hero"
      className="section-light relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32"
    >
      {/* Active background: animated panning grid + soft sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* LEFT — typography headline (center up to md, left on lg+) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Eyebrow */}
          {/* <motion.div variants={item}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {t("hero.eyebrow")}
            </span>
          </motion.div> */}
          {/* Headline — simple, readable, with keyword emphasis */}
          <motion.h1
            variants={item}
            className="sm:mt-7 max-w-xl text-balance text-center text-[24px] font-semibold leading-[1.5] tracking-tight text-ink lg:text-start sm:text-[36px] lg:text-[40px]"
          >
            {t("hero.headlineStart")}{" "}
            <span className="text-brand">{t("hero.headlineAuto")}</span>{" "}
            {t("hero.headlineAnd")}{" "}
            <span className="text-brand">{t("hero.headlineSmart")}</span>{" "}
            {locale === "fa" && t("hero.headlineEnd")}
            <span className="text-ink/30">!</span>
          </motion.h1>
          {/* Subtitle — smaller, lighter */}
          <motion.p
            variants={item}
            className="mt-7 max-w-md text-pretty text-center text-[14.5px] font-light leading-relaxed text-ink-muted lg:text-start lg:text-[15.5px]"
          >
            {t("hero.subtitle")}
          </motion.p>
          {/* CTAs — center up to md, left on lg+ */}
          <motion.div
            variants={item}
            className="mt-8 flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row lg:items-start"
          >
            <button
              onClick={() => scrollToId("contact")}
              className="items-center w-full flex justify-center gap-1.5 rounded-xl bg-brand px-4 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.7)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.85)] active:scale-95 focus-brand md:flex sm:w-auto"
            >
              {t("nav.cta")}
              {locale === "en" ? (
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <ArrowUpLeft className="h-4 w-4" strokeWidth={2.5} />
              )}
            </button>

            <button
              onClick={() => router.push("projects")}
              className="group text-nowrap flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-all duration-300 hover:border-ink/30 active:scale-95 focus-brand sm:w-auto"
            >
              <Sparkles className="h-4 w-4 text-brand transition-transform duration-500 group-hover:-translate-y-0.5" />
              {t("hero.ctaProjects")}
            </button>
            {/* <button
              onClick={() => scrollToId("chat")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-all duration-300 hover:border-ink/30 active:scale-95 focus-brand sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 text-brand transition-transform duration-500 group-hover:-translate-y-0.5" />
              {t("hero.ctaChat")}

              {locale === "en" ? (
                <ArrowUpRight
                  className="h-4 w-4 text-ink-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                  strokeWidth={2.2}
                />
              ) : (
                <ArrowUpLeft
                  className="h-4 w-4 text-ink-muted transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                  strokeWidth={2.2}
                />
              )}
            </button> */}
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
  )
}
