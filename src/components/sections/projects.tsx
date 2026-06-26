"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Target,
  Lightbulb,
  X,
} from "lucide-react";
import projectsData from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  image: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  tags: string[];
  metric: string;
};

const TABS = [
  { id: "automation", label: "Automation" },
  { id: "websites", label: "Websites" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  const [tab, setTab] = useState<TabId>("automation");
  const [selected, setSelected] = useState<Project | null>(null);

  const list = (projectsData as Record<TabId, Project[]>)[tab];

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand"
            >
              <span className="h-px w-6 bg-brand/50" />
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[44px]"
            >
              Projects with real outcomes
            </motion.h2>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="relative flex rounded-2xl border border-border bg-white/60 p-1 backdrop-blur-sm"
          >
            {TABS.map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative z-10 rounded-xl px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-300"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 -z-0 rounded-xl bg-ink shadow-[0_8px_22px_-8px_rgba(17,24,39,0.55)]"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Tab body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-10"
          >
            {tab === "automation" && (
              <p className="mb-8 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-muted">
                Behind every project lies a real challenge and an intelligent
                solution. Select a project to explore it.
              </p>
            )}

            <Slider items={list} onSelect={setSelected} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail dialog */}
      <AnimatePresence>
        {selected && (
          <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Slider ---------- */

function Slider({
  items,
  onSelect,
}: {
  items: Project[];
  onSelect: (p: Project) => void;
}) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    embla.on("select", sync);
    embla.on("reInit", sync);
    // Defer the initial sync out of the synchronous effect body.
    queueMicrotask(sync);
    return () => {
      embla.off("select", sync);
      embla.off("reInit", sync);
    };
  }, [embla]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {items.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onSelect={onSelect} />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-ink transition-all duration-300 hover:border-ink/30 hover:bg-white enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 focus-brand"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-ink transition-all duration-300 hover:border-ink/30 hover:bg-white enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 focus-brand"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <span className="text-[12.5px] font-medium text-ink-muted">
          Drag or use arrows to explore
        </span>
      </div>
    </div>
  );
}

/* ---------- Card ---------- */

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      className="flex-[0_0_88%] sm:flex-[0_0_46%] lg:flex-[0_0_31.5%]"
    >
      <button
        onClick={() => onSelect(project)}
        className="lift group block w-full overflow-hidden rounded-3xl border border-border bg-white text-left shadow-[0_4px_24px_-12px_rgba(17,24,39,0.12)] hover:border-ink/15 hover:shadow-[0_24px_60px_-24px_rgba(17,24,39,0.28)] focus-brand"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-60" />
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
            {project.category}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {project.metric}
          </span>
          {/* Hover explore chip */}
          <span className="absolute bottom-4 right-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[11.5px] font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Explore
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="text-[17px] font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-ink-muted">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-secondary px-2.5 py-1 text-[11px] font-medium text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

/* ---------- Dialog ---------- */

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-md sm:items-center sm:p-6"
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
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                {project.category}
              </span>
              <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm">
                {project.metric}
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-pretty text-[15px] leading-relaxed text-ink-muted">
            {project.summary}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-brand-soft/50 p-5">
              <div className="flex items-center gap-2 text-brand-foreground">
                <Target className="h-4 w-4" />
                <span className="text-[12px] font-semibold uppercase tracking-wider">
                  The Challenge
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink">
                {project.challenge}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="flex items-center gap-2 text-brand">
                <Lightbulb className="h-4 w-4" />
                <span className="text-[12px] font-semibold uppercase tracking-wider">
                  The Solution
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-secondary px-2.5 py-1 text-[11.5px] font-medium text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
