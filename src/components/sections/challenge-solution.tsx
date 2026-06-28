"use client"

import { motion } from "framer-motion"
import {
  MessagesSquare,
  Database,
  FileBarChart,
  Clock,
  CalendarClock,
  Users,
  Network,
  PackageCheck,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"

const EASE = [0.16, 1, 0.3, 1] as const

type Card = {
  key: string
  icon: React.ElementType
  question: string
  answer: string
}

const CARDS: Card[] = [
  {
    key: "chat",
    icon: MessagesSquare,
    question: "Repetitive customer questions?",
    answer: "AI responds automatically.",
  },
  {
    key: "data",
    icon: Database,
    question: "Manual data entry takes too much time?",
    answer: "Everything is recorded automatically.",
  },
  {
    key: "reports",
    icon: FileBarChart,
    question: "Creating reports every day?",
    answer: "Reports are generated automatically.",
  },
  {
    key: "waiting",
    icon: Clock,
    question: "Customers waiting for replies?",
    answer: "Responses are sent instantly.",
  },
  {
    key: "calendar",
    icon: CalendarClock,
    question: "Forgetting meetings and tasks?",
    answer: "The system saves everything and reminds you at the right time.",
  },
  {
    key: "team",
    icon: Users,
    question: "Your team spends hours on repetitive work?",
    answer: "They can focus on more valuable tasks.",
  },
  {
    key: "scattered",
    icon: Network,
    question: "Is your data scattered across multiple tools?",
    answer: "Everything stays synchronized in one seamless workflow.",
  },
  {
    key: "orders",
    icon: PackageCheck,
    question: "Are you processing orders manually?",
    answer: "Orders are processed automatically.",
  },
]

export function ChallengeSolution() {
  const { t, locale } = useI18n()
  // Localized card content
  const CARD_CONTENT: Record<
    string,
    { en: { q: string; a: string }; fa: { q: string; a: string } }
  > = {
    chat: {
      en: {
        q: "Answering the same customer questions?",
        a: "AI replies automatically.",
      },
      fa: {
        q: "پاسخ تکراری به مشتری‌ها؟",
        a: "هوش مصنوعی خودش جواب میده.",
      },
    },
    data: {
      en: {
        q: "Manual data entry taking too much time?",
        a: "Everything is recorded automatically.",
      },
      fa: {
        q: "ثبت دستی اطلاعات وقتت رو می‌گیره؟",
        a: "همه‌چیز خودکار ثبت میشه.",
      },
    },
    reports: {
      en: {
        q: "Creating reports every day?",
        a: "Reports are generated automatically.",
      },
      fa: { q: "هر روز باید گزارش بگیری؟", a: "گزارش‌ها خودشون آماده میشن." },
    },
    orders: {
      en: {
        q: "Tracking orders manually?",
        a: "Every step is handled automatically.",
      },
      fa: {
        q: "سفارش‌ها رو دستی پیگیری می‌کنی؟",
        a: "همه مراحل خودکار دنبال میشن.",
      },
    },
    scattered: {
      en: {
        q: "Is your data scattered across different apps?",
        a: "Your data stays unified and always in sync.",
      },
      fa: {
        q: "اطلاعات تو نرم افزارهای مختلف پراکندست؟",
        a: "همه داده ها یکپارچه و همگام میشن.",
      },
    },
    waiting: {
      en: {
        q: "Customers waiting for a reply?",
        a: "Responses are sent instantly.",
      },
      fa: {
        q: "مشتری‌ها منتظر پاسخ می‌مونن؟",
        a: "پاسخ‌ها بدون معطلی ارسال میشن.",
      },
    },
    calendar: {
      en: {
        q: "Forgetting meetings and tasks?",
        a: "The system saves everything and reminds you automatically.",
      },
      fa: {
        q: "قرارها و کارها یادت میره؟",
        a: "سیستم خودش ذخیره میکنه و یادآوری می‌کنه.",
      },
    },
    team: {
      en: {
        q: "Your team spending time on repetitive work?",
        a: "They can focus on more important tasks.",
      },
      fa: {
        q: "تیمت وقتش رو صرف کارهای تکراری می‌کنه؟",
        a: "وقتشون آزاد میشه برای کارهای مهم‌تر.",
      },
    },
  }
  const CARDS_LOCAL = CARDS.map(c => ({
    ...c,
    question: CARD_CONTENT[c.key][locale].q,
    answer: CARD_CONTENT[c.key][locale].a,
  }))

  return (
    <section
      id="flow"
      className="section-light relative px-4 py-24 sm:px-6 sm:pb-32 sm:py-0"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-28">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand"
          >
            <span className="h-px w-6 bg-brand/50" />
            {t("flow.eyebrow")}
            <span className="h-px w-6 bg-brand/50" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-4 text-balance text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[44px] lg:text-left"
          >
            {locale === "en" ? (
              <>
                What <span className="text-brand">Challenges</span> Can Be
                Solved?
              </>
            ) : (
              <>
                چه <span className="text-brand">چالش</span>‌هایی قابل حل هستند؟
              </>
            )}
          </motion.h2>
          {/* <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-3 max-w-md text-[14.5px] text-ink-muted"
          >
            {t("flow.subheading")}
          </motion.p> */}
        </div>

        {/* 2-column grid — narrow square-ish cards, generous gaps */}
        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14">
          {CARDS_LOCAL.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <StatementCard card={card} />
            </motion.div>
          ))}
        </div>

        {/* "etc." — two dots indicating more */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="mt-12 flex items-center justify-center gap-2"
          aria-label="etc"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-brand/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/40" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Statement card with overlapping top icon ---------- */

function StatementCard({ card }: { card: Card }) {
  const Icon = card.icon
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-border bg-white px-6 pb-7 pt-10 shadow-[0_10px_36px_-14px_rgba(17,24,39,0.14)] sm:px-7 sm:pb-8 sm:pt-11">
      {/* Large icon overlapping the top edge — right in EN (LTR), left in FA (RTL) */}
      <span
        className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-orange-400 text-white shadow-[0_10px_24px_-8px_rgba(249,115,22,0.65)] sm:h-14 sm:w-14"
        style={{ insetInlineEnd: "1.25rem" }}
      >
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
  )
}
