"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowUpRight, Target, Lightbulb, X } from "lucide-react";
import projectsData from "@/data/projects.json";
import { useI18n, type Locale } from "@/lib/i18n";

import "swiper/css";
import "swiper/css/pagination";

type Lang = Locale;

type LangContent = {
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  metric: string;
};

type Project = {
  id: string;
  image: string;
  tags: string[];
  en: LangContent;
  fa: LangContent;
};

const TABS = [
  { id: "automation", labelKey: "projects.tabAutomation" },
  { id: "websites", labelKey: "projects.tabWebsites" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  const { t, locale } = useI18n();
  const [tab, setTab] = useState<TabId>("automation");
  const [selected, setSelected] = useState<Project | null>(null);

  const list = (projectsData as Record<TabId, Project[]>)[tab];
  const lang: Lang = locale;

  return (
    <section
      id="projects"
      className="section-dark relative px-4 py-24 sm:px-6 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />
      <div className="relative mx-auto w-full max-w-6xl">
        {/* Section header */}
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand"
            >
              <span className="h-px w-6 bg-brand/50" />
              {t("projects.eyebrow")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[44px]"
            >
              {t("projects.heading")}
            </motion.h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="glass-dark relative flex rounded-2xl p-1"
            >
              {TABS.map((tb) => {
                const isActive = tab === tb.id;
                return (
                  <button
                    key={tb.id}
                    onClick={() => setTab(tb.id)}
                    className="relative z-10 rounded-xl px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-300"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-stone-400 hover:text-white"
                      }`}
                    >
                      {t(tb.labelKey)}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 -z-0 rounded-xl bg-brand shadow-[0_8px_22px_-8px_rgba(249,115,22,0.65)]"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Tab body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab + lang}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-10"
          >
            {tab === "automation" && (
              <p className="mb-8 max-w-2xl text-pretty text-[15px] leading-relaxed text-stone-400 lg:mx-0 mx-auto text-center lg:text-left">
                {t("projects.intro")}
              </p>
            )}

            {/* 3-column multi-row grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  lang={lang}
                  index={i}
                  onSelect={setSelected}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail dialog */}
      <AnimatePresence>
        {selected && (
          <ProjectDialog
            project={selected}
            lang={lang}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Card ---------- */

function ProjectCard({
  project,
  lang,
  index,
  onSelect,
}: {
  project: Project;
  lang: Lang;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const c = project[lang];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 3) * 0.07 }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(project);
          }
        }}
        className="lift group block w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left shadow-[0_4px_24px_-12px_rgba(0,0,0,0.4)] hover:border-white/20 hover:shadow-[0_24px_55px_-24px_rgba(0,0,0,0.7)] focus-brand"
      >
        <CardSwiper project={project} lang={lang} />

        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-semibold tracking-tight text-white">
              {c.title}
            </p>
            <p className="text-[9.5px] uppercase tracking-wider text-stone-500">
              {c.category}
            </p>
          </div>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-stone-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
            strokeWidth={2.2}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Inner swiping slide ---------- */

function CardSwiper({ project, lang }: { project: Project; lang: Lang }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const c = project[lang];
  const { t } = useI18n();

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <Swiper
        modules={[Pagination, Mousewheel, Keyboard]}
        slidesPerView={1}
        spaceBetween={0}
        grabCursor
        keyboard
        mousewheel={{ forceToAxis: true }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-bullet-active",
          bulletClass: "swiper-bullet",
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        className="!h-full !w-full card-swiper"
      >
        {/* Slide 1 — image */}
        <SwiperSlide className="!h-full">
          <div className="relative h-full w-full">
            <img
              src={project.image}
              alt={c.title}
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
              {c.category}
            </span>
          </div>
        </SwiperSlide>

        {/* Slide 2 — charcoal matt with outcome */}
        <SwiperSlide className="!h-full">
          <div className="flex h-full w-full flex-col items-center justify-center bg-ink px-4 text-center">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              {t("projects.outcome")}
            </span>
            <span className="mt-2 text-xl font-semibold leading-tight tracking-tight text-white">
              {c.metric}
            </span>
          </div>
        </SwiperSlide>

        {/* Slide 3 — orange matt with stack */}
        <SwiperSlide className="!h-full">
          <div className="flex h-full w-full flex-col items-center justify-center bg-brand px-4 text-center">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white/70">
              {t("projects.stack")}
            </span>
            <span className="mt-2 text-[13px] font-semibold leading-tight text-white">
              {project.tags.slice(0, 2).join(" · ")}
            </span>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Swipe hint */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 0.8, duration: 2.4, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-2.5 right-3 rounded-full bg-black/30 px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm"
      >
        {t("projects.swipe")}
      </motion.span>
    </div>
  );
}

/* ---------- Dialog ---------- */

function ProjectDialog({
  project,
  lang,
  onClose,
}: {
  project: Project;
  lang: Lang;
  onClose: () => void;
}) {
  const c = project[lang];
  const { t } = useI18n();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-md sm:items-center sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.45, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          className="scroll-area relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-background sm:rounded-3xl"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white focus-brand"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-t-3xl">
            <img
              src={project.image}
              alt={c.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {c.category}
                </span>
                <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                  {c.metric}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {c.title}
              </h3>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-pretty text-[15px] leading-relaxed text-ink-muted">
              {c.summary}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-brand-soft/50 p-5">
                <div className="flex items-center gap-2 text-brand-foreground">
                  <Target className="h-4 w-4" />
                  <span className="text-[12px] font-semibold uppercase tracking-wider">
                    {t("projects.challenge")}
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-ink">
                  {c.challenge}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-center gap-2 text-brand">
                  <Lightbulb className="h-4 w-4" />
                  <span className="text-[12px] font-semibold uppercase tracking-wider">
                    {t("projects.solution")}
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-ink">
                  {c.solution}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-2.5 py-1 text-[11.5px] font-medium text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

