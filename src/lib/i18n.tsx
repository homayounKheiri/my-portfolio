"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  useMemo,
} from "react"

export type Locale = "en" | "fa"

type Dict = Record<string, string>

const EN: Dict = {
  // Header
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.cta": "Request a Call",
  "nav.menu": "Toggle menu",

  // Hero
  "hero.eyebrow": "AI Automation Consultancy",
  "hero.headlineMid": "of repetitive your tasks can be",
  "hero.headlineAuto": "automated",
  "hero.headlineWith": "with",
  "hero.headlineAI": "AI",
  "hero.subtitle":
    "Homayoun Kheiri, Web Developer and Consultant and Specialist in AI Business Intelligence and Automation",
  "hero.ctaProjects": "View Projects",
  "hero.ctaChat": "Start a Conversation",

  // Why Automation
  "flow.eyebrow": "Why Automation?",
  "flow.heading": "What {challenges} Can Be Solved?",
  "flow.subheading": "The everyday frictions automation quietly removes.",

  // AI Chat
  "chat.eyebrow": "Ask",
  "chat.heading": "Ask Anything",
  "chat.subtitle": "Need a quick answer? Ask our AI assistant.",
  "chat.subtitle2":
    "Prefer to talk with us instead? Leave your phone number in the next form and we'll get in touch with you.",
  "chat.name": "Assistant",
  "chat.status": "Online · Replies in seconds",
  "chat.placeholder": "Type your question…",
  "chat.reset": "Reset Conversation",
  "chat.send": "Send",
  "chat.greeting":
    "Hi! I'm Homayoun's AI assistant. Feel free to ask me anything about AI business automation or website development.",
  "chat.quick1": "Can my business be automated?",
  "chat.quick2": "Can I connect the automation system to my website?",
  "chat.quick3": "I'd like to schedule a consultation.",

  // Contact
  "contact.eyebrow": "Contact",
  "contact.titlePre": "Register your number and wait",
  "contact.titleMid": "5 minutes",
  "contact.titlePost": ":)",
  "contact.subtitle":
    "No forms to fill, no back-and-forth. Just drop your number and I'll reach out personally — fast.",
  "contact.placeholder": "+1 (555) 123-4567",
  "contact.button": "Expect a reply",
  "contact.sending": "Sending",
  "contact.successTitle": "Your phone number has been received.",
  "contact.successBody": "We'll get in touch with you soon.",
  "contact.note": "Your number is used only to reply to you. Nothing else.",
  "contact.errorEmpty": "Please enter your phone number.",
  "contact.errorInvalid": "That doesn't look like a valid phone number.",
  "contact.errorGeneric": "Something went wrong. Please try again.",

  // Projects
  "projects.eyebrow": "Selected Work",
  "projects.heading": "Projects",
  "projects.tabAutomation": "Automation",
  "projects.tabWebsites": "Websites",
  "projects.intro":
    "Select a project to explore the {challenge} they faced and the {solution} we delivered.",
  "projects.intro_challenge": "Challenges",
  "projects.intro_solution": "Solutions",
  "projects.swipe": "Swipe",
  "projects.outcome": "Outcome",
  "projects.stack": "Stack",
  "projects.challenge": "The Challenge",
  "projects.solution": "The Solution",

  // Infographic (AutomationFlow)
  "flow.liveWorkflow": "Live workflow",
  "flow.pipeline": "Lead automation pipeline",
  "flow.active": "Active",
  "flow.aiCore": "AI Core",
  "flow.processedToday": "Processed today",
  "flow.node.chat": "Chat",
  "flow.node.email": "Email",
  "flow.node.calendar": "Calendar",
  "flow.node.crm": "CRM",
  "flow.node.calls": "Calls",
  "flow.node.instagram": "Instagram",
  "flow.node.reports": "Reports",
  "flow.node.dashboard": "Dashboard",
}

const FA: Dict = {
  // Header
  "nav.home": "خانه",
  "nav.projects": "پروژه‌ها",
  "nav.cta": "درخواست تماس",
  "nav.menu": "باز کردن منو",

  // Hero
  "hero.eyebrow": "مشاوره اتوماسیون هوش مصنوعی",
  "hero.headlineMid": "از کارهای تکراری شما رو میشه",
  "hero.headlineAuto": "خودکار",
  "hero.headlineWith": "کرد و به",
  "hero.headlineAI": "هوش مصنوعی",
  "hero.headlineDone": "سپرد",
  "hero.subtitle":
    "همایون خیری، توسعه‌دهنده وب، مشاور و متخصص در هوش مصنوعی و اتوماسیون کسب و کار",
  "hero.ctaProjects": "مشاهده پروژه‌ها",
  "hero.ctaChat": "شروع گفت‌وگو",

  // Why Automation
  "flow.eyebrow": "چرا اتوماسیون؟",
  "flow.heading": "چه {challenges}‌هایی قابل حل هستند؟",
  "flow.subheading": "اصطکاک‌های روزمره‌ای که اتوماسیون بی‌صدا برطرف می‌کند.",

  // AI Chat
  "chat.eyebrow": "بپرسید",
  "chat.heading": "هر سؤالی داری بپرس",
  "chat.subtitle": "اگه نیاز به پاسخگویی سریع داری میتونی از دستیار بپرسی.",
  "chat.subtitle2":
    "اگر ترجیح می‌دی با هم صحبت کنیم، شماره‌ات را در فرم بعدی ثبت کن تا باهات تماس بگیریم.",
  "chat.name": "دستیار",
  "chat.status": "آنلاین · پاسخ در چند ثانیه",
  "chat.placeholder": "سؤال خود را بنویسید…",
  "chat.reset": "بازنشانی گفت‌وگو",
  "chat.send": "ارسال",
  "chat.greeting":
    "سلام، من دستیار هوشمند همایون هستم — هرچیزی درباره اتوماسیون کسب و کارت با هوش مصنوعی یا طراحی وبسایت داری بپرس.",
  "chat.quick1": "آیا کار من میتونه اتوماسیون بشه؟",
  "chat.quick2": "میتونم سیستم اتوماسیون رو به وبسایت متصل کنم؟",
  "chat.quick3": "میخوام وقت مشاوره رزرو کنم",

  // Contact
  "contact.eyebrow": "تماس",
  "contact.titlePre": "شماره تماس خودتون رو ثبت کنید،",
  "contact.titleMid": "۵ دقیقه",
  "contact.titlePost": "منتظر بمونید :)",
  "contact.subtitle":
    "بدون فرم، بدون رفت‌وبرگشت. فقط شماره خود را بگذارید تا شخصاً و سریع با شما تماس بگیرم.",
  "contact.placeholder": "0912 345 6789",
  "contact.button": "انتظار پاسخ",
  "contact.sending": "در حال ارسال",
  "contact.successTitle": "شماره شما ثبت شد.",
  "contact.successBody": "بزودی باهاتون تماس میگیریم.",
  "contact.note":
    "شماره شما فقط برای پاسخ دادن استفاده می‌شود. نه هیچ چیز دیگری.",
  "contact.errorEmpty": "لطفاً شماره تلفن خود را وارد کنید.",
  "contact.errorInvalid": "این شماره تلفن معتبر نیست.",
  "contact.errorGeneric": "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",

  // Projects
  "projects.eyebrow": "نمونه‌کارهای منتخب",
  "projects.heading": "پروژه‌ها",
  "projects.tabAutomation": "اتوماسیون",
  "projects.tabWebsites": "وب‌سایت‌ها",
  "projects.intro":
    "با انتخاب هر پروژه {challenge} هایی که وجود داشته و {solution} هایی که ارائه دادیم رو مشاهده کنید.",
  "projects.intro_challenge": "چالش‌",
  "projects.intro_solution": "راه‌حل‌",
  "projects.swipe": "بکشید",
  "projects.outcome": "نتیجه",
  "projects.stack": "تکنولوژی",
  "projects.challenge": "چالش",
  "projects.solution": "راه‌حل",

  // Infographic (AutomationFlow)
  "flow.liveWorkflow": "گردشکار زنده",
  "flow.pipeline": "خط لوله اتوماسیون سرنخ",
  "flow.active": "فعال",
  "flow.aiCore": "هسته هوش مصنوعی",
  "flow.processedToday": "پردازش‌شده امروز",
  "flow.node.chat": "گفت‌وگو",
  "flow.node.email": "ایمیل",
  "flow.node.calendar": "تقویم",
  "flow.node.crm": "CRM",
  "flow.node.calls": "تماس‌ها",
  "flow.node.instagram": "اینستاگرام",
  "flow.node.reports": "گزارش‌ها",
  "flow.node.dashboard": "داشبورد",
}

const DICTS: Record<Locale, Dict> = { en: EN, fa: FA }

type I18nContextValue = {
  locale: Locale
  dir: "ltr" | "rtl"
  t: {
    (key: string): string
    (key: string, vars: Record<string, ReactNode>): ReactNode
  }
  setLocale: (l: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

const COOKIE_NAME = "locale"

function readCookieLocale(): Locale {
  if (typeof document === "undefined") return "en"
  const match = document.cookie
    .split("; ")
    .find(row => row.startsWith(`${COOKIE_NAME}=`))
  const val = match?.split("=")[1]
  return val === "fa" ? "fa" : "en"
}

function writeCookieLocale(l: Locale) {
  if (typeof document === "undefined") return
  // Persist for 1 year, site-wide.
  document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=31536000; SameSite=Lax`
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Initialize from cookie (falls back to "en").
  const [locale, setLocaleState] = useState<Locale>(readCookieLocale)

  // Whenever locale changes, persist to cookie + update <html lang/dir>.
  useEffect(() => {
    writeCookieLocale(locale)
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
      document.documentElement.dir = locale === "fa" ? "rtl" : "ltr"
    }
  }, [locale])

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])

  const t = useMemo(() => {
    const fn = ((key: string, vars?: Record<string, ReactNode>) => {
      const str = DICTS[locale][key] ?? DICTS.en[key] ?? key

      if (!vars) return str

      return str.split(/(\{[^}]+\})/g).map(part => {
        const match = part.match(/^\{(.+)\}$/)
        return match ? vars[match[1]] ?? part : part
      })
    }) as I18nContextValue["t"]

    return fn
  }, [locale])

  const toggleLocale = useCallback(
    () => setLocaleState(l => (l === "en" ? "fa" : "en")),
    [],
  )

  const dir = locale === "fa" ? "rtl" : "ltr"

  return (
    <I18nContext.Provider value={{ locale, dir, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return ctx
}
