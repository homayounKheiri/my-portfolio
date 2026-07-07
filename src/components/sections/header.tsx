"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight, Languages, ArrowUpLeft } from "lucide-react"
import { useScrolled } from "@/hooks/use-scrolled"
import { useI18n } from "@/lib/i18n"
import { usePathname, useRouter } from "next/navigation"

type View = "home" | "projects"

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 84
  window.scrollTo({ top, behavior: "smooth" })
}

export function Header() {
  const { t, locale, toggleLocale } = useI18n()
  // Glass appears only after we leave the hero (home view only).
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const pathName = usePathname()

  const goHome = () => {
    setOpen(false)
    router.push("home", {
      scroll: true,
    })
    // window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goProjects = () => {
    setOpen(false)
    router.push("projects", {
      scroll: true,
    })
  }

  const goContact = () => {
    setOpen(false)

    if (!pathName.endsWith("/home")) {
      router.push("home")
      setTimeout(() => {
        scrollToId("contact")
      }, 300)
    } else {
      scrollToId("contact")
    }
  }

  const barClass =
    pathName.endsWith("projects") || scrolled
      ? "bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_-20px_rgba(17,24,39,0.18)]"
      : "bg-transparent"

  const navItems: { label: string; active: boolean; onClick: () => void }[] = [
    {
      label: t("nav.home"),
      active: pathName.endsWith("home"),
      onClick: goHome,
    },
    {
      label: t("nav.projects"),
      active: pathName.endsWith("projects"),
      onClick: goProjects,
    },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <div
        className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4 ${barClass}`}
      >
        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={item.onClick}
              data-active={item.active}
              className={`nav-underline rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-300 focus-brand ${
                item.active ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right cluster: language toggle + CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            aria-label="Toggle language"
            className="flex h-9 items-center gap-1.5 rounded-xl border border-border bg-white/70 px-3 text-[12.5px] font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:text-brand focus-brand"
          >
            <Languages className="h-4 w-4 text-brand" />
            {locale === "en" ? "FA" : "EN"}
          </button>

          <button
            onClick={goContact}
            className="hidden items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.7)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_-8px_rgba(249,115,22,0.85)] active:scale-95 focus-brand md:flex"
          >
            {t("nav.cta")}
            {locale === "en" ? (
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <ArrowUpLeft className="h-4 w-4" strokeWidth={2.5} />
            )}
          </button>

          {/* Mobile trigger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-secondary md:hidden focus-brand"
            aria-label={t("nav.menu")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute backdrop-blur-sm left-4 right-4 top-[72px] z-50 md:hidden"
          >
            <div className="glass-strong rounded-2xl p-2 shadow-[0_20px_50px_-20px_rgba(17,24,39,0.35)]">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                  onClick={item.onClick}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                    item.active
                      ? "bg-brand-soft text-brand-foreground"
                      : "text-ink hover:bg-secondary"
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  )}
                </motion.button>
              ))}
              <button
                onClick={goContact}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-3 text-[15px] font-semibold text-white"
              >
                {t("nav.cta")}
                {locale === "en" ? (
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  <ArrowUpLeft className="h-4 w-4" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
