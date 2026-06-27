"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type Locale = "en" | "fa";

type Dict = Record<string, string>;

const EN: Dict = {
  // Header
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.cta": "Let's talk",
  "nav.menu": "Toggle menu",

  // Hero
  "hero.eyebrow": "AI Automation Consultancy",
  "hero.headlineMid": "of repetitive tasks can be",
  "hero.headlineAuto": "automated",
  "hero.headlineWith": "with",
  "hero.headlineAI": "AI",
  "hero.subtitle":
    "Web Developer and Consultant and Specialist in AI Business Intelligence and Automation.",
  "hero.ctaProjects": "View Projects",
  "hero.ctaChat": "Start a Conversation",

  // Why Automation
  "flow.eyebrow": "Why Automation",
  "flow.heading": "What {challenges} Can Be Solved?",
  "flow.subheading": "The everyday frictions automation quietly removes.",

  // AI Chat
  "chat.eyebrow": "Ask Anything",
  "chat.heading": "Meet your lightweight assistant",
  "chat.subtitle": "A small, fast helper — no signup, no noise. Just answers.",
  "chat.name": "Aria",
  "chat.status": "Online · replies in seconds",
  "chat.placeholder": "Type your question…",
  "chat.reset": "Reset conversation",
  "chat.send": "Send",
  "chat.greeting":
    "Hi, I'm Aria — a lightweight assistant for the studio. Ask me anything about AI automation, business intelligence, or web work.",
  "chat.quick1": "What can you automate for me?",
  "chat.quick2": "Can you build a website?",
  "chat.quick3": "How does AI BI help?",

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
  "contact.successTitle": "Got it — talk soon.",
  "contact.successBody":
    "Your number is on its way. Expect a reply within 5 minutes.",
  "contact.note": "Your number is used only to reply to you. Nothing else.",
  "contact.errorEmpty": "Please enter your phone number.",
  "contact.errorInvalid": "That doesn't look like a valid phone number.",
  "contact.errorGeneric": "Something went wrong. Please try again.",

  // Projects
  "projects.eyebrow": "Selected Work",
  "projects.heading": "Projects with real outcomes",
  "projects.tabAutomation": "Automation",
  "projects.tabWebsites": "Websites",
  "projects.intro":
    "Behind every project lies a real challenge and an intelligent solution. Select a project to explore it.",
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
};

const FA: Dict = {
  // Header
  "nav.home": "خانه",
  "nav.projects": "پروژه‌ها",
  "nav.cta": "گفت‌وگو",
  "nav.menu": "باز کردن منو",

  // Hero
  "hero.eyebrow": "مشاوره اتوماسیون هوش مصنوعی",
  "hero.headlineMid": "از کارهای تکراری می‌توانند",
  "hero.headlineAuto": "اتوماتیک",
  "hero.headlineWith": "شوند با",
  "hero.headlineAI": "هوش مصنوعی",
  "hero.subtitle":
    "توسعه‌دهنده وب و مشاور و متخصص هوش تجاری و اتوماسیون هوش مصنوعی.",
  "hero.ctaProjects": "مشاهده پروژه‌ها",
  "hero.ctaChat": "شروع گفت‌وگو",

  // Why Automation
  "flow.eyebrow": "چرا اتوماسیون",
  "flow.heading": "چه {challenges}‌هایی قابل حل هستند؟",
  "flow.subheading": "اصطکاک‌های روزمره‌ای که اتوماسیون بی‌صدا برطرف می‌کند.",

  // AI Chat
  "chat.eyebrow": "هرچیزی بپرسید",
  "chat.heading": "با دستیار سبک خود آشنا شوید",
  "chat.subtitle": "یک دستیار کوچک و سریع — بدون ثبت‌نام، بدون نویز. فقط پاسخ.",
  "chat.name": "آریا",
  "chat.status": "آنلاین · پاسخ در ثانیه‌ها",
  "chat.placeholder": "سؤال خود را بنویسید…",
  "chat.reset": "بازنشانی گفت‌وگو",
  "chat.send": "ارسال",
  "chat.greeting":
    "سلام، من آریا هستم — یک دستیار سبک برای استودیو. هرچیزی درباره اتوماسیون هوش مصنوعی، هوش تجاری یا کار وب بپرسید.",
  "chat.quick1": "برای من چه اتوماسیونی می‌کنید؟",
  "chat.quick2": "می‌توانید وب‌سایت بسازید؟",
  "chat.quick3": "هوش تجاری چطور کمک می‌کند؟",

  // Contact
  "contact.eyebrow": "تماس",
  "contact.titlePre": "شماره تماس خود را ثبت کنید و",
  "contact.titleMid": "۵ دقیقه",
  "contact.titlePost": "منتظر بمانید :)",
  "contact.subtitle":
    "بدون فرم، بدون رفت‌وبرگشت. فقط شماره خود را بگذارید تا شخصاً و سریع با شما تماس بگیرم.",
  "contact.placeholder": "+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹",
  "contact.button": "انتظار پاسخ",
  "contact.sending": "در حال ارسال",
  "contact.successTitle": "گرفتم — به‌زودی صحبت می‌کنیم.",
  "contact.successBody":
    "شماره شما در راه است. انتظار پاسخ را در عرض ۵ دقیقه داشته باشید.",
  "contact.note": "شماره شما فقط برای پاسخ دادن استفاده می‌شود. هیچ چیز دیگر.",
  "contact.errorEmpty": "لطفاً شماره تلفن خود را وارد کنید.",
  "contact.errorInvalid": "این یک شماره تلفن معتبر به‌نظر نمی‌رسد.",
  "contact.errorGeneric": "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",

  // Projects
  "projects.eyebrow": "نمونه‌کارهای منتخب",
  "projects.heading": "پروژه‌هایی با نتایج واقعی",
  "projects.tabAutomation": "اتوماسیون",
  "projects.tabWebsites": "وب‌سایت‌ها",
  "projects.intro":
    "پشت هر پروژه یک چالش واقعی و یک راه‌حل هوشمند نهفته است. یک پروژه را برای کاوش انتخاب کنید.",
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
};

const DICTS: Record<Locale, Dict> = { en: EN, fa: FA };

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string, vars?: Record<string, string>) => string;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const COOKIE_NAME = "locale";

function readCookieLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  const val = match?.split("=")[1];
  return val === "fa" ? "fa" : "en";
}

function writeCookieLocale(l: Locale) {
  if (typeof document === "undefined") return;
  // Persist for 1 year, site-wide.
  document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=31536000; SameSite=Lax`;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Initialize from cookie (falls back to "en").
  const [locale, setLocaleState] = useState<Locale>(readCookieLocale);

  // Whenever locale changes, persist to cookie + update <html lang/dir>.
  useEffect(() => {
    writeCookieLocale(locale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      let str = DICTS[locale][key] ?? DICTS.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), v);
        }
      }
      return str;
    },
    [locale]
  );

  const toggleLocale = useCallback(
    () => setLocaleState((l) => (l === "en" ? "fa" : "en")),
    []
  );

  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ locale, dir, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
