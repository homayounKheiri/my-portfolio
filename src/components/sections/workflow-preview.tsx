"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Interactive workflow preview — a glassmorphism automation dashboard.
 * Connected nodes with execution status, animated data flowing along the
 * connectors, a live stats strip, and a small log feed. Purely decorative
 * but feels alive.
 */
export function WorkflowPreview() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* Main glass panel */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="relative overflow-hidden rounded-[26px] border border-border bg-white/70 p-5 shadow-[0_40px_90px_-50px_rgba(17,24,39,0.45)] backdrop-blur-2xl"
      >
        {/* top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

        {/* Panel header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-orange-400 text-white shadow-[0_8px_20px_-8px_rgba(249,115,22,0.7)]">
              <WorkflowIcon className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[13px] font-semibold leading-tight text-ink">
                Lead Routing Workflow
              </p>
              <p className="text-[11px] text-ink-muted">automation · v2.4</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-green-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            Live
          </span>
        </div>

        {/* Workflow canvas */}
        <div className="relative mt-5 h-[260px] overflow-hidden rounded-2xl border border-border bg-[linear-gradient(180deg,#FAFAF9,#FFFFFF)] sm:h-[280px]">
          {/* grid bg inside canvas */}
          <div className="absolute inset-0 bg-grid opacity-60" />

          {/* SVG connectors with flowing data dots */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 360 280"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#F97316" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {/* horizontal-ish connector paths between nodes */}
            <path
              d="M86 70 C 140 70, 150 140, 200 140"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M86 210 C 140 210, 150 140, 200 140"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M244 140 C 280 140, 290 70, 320 70"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M244 140 C 280 140, 290 210, 320 210"
              stroke="url(#flow)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* flowing data dots travelling along the connectors */}
          {!reduce && (
            <>
              <FlowDot className="left-[86px] top-[70px]" to="translate(118px,70px)" delay={0} />
              <FlowDot className="left-[86px] top-[210px]" to="translate(118px,-70px)" delay={0.6} />
              <FlowDot className="left-[244px] top-[140px]" to="translate(76px,-70px)" delay={1.1} />
              <FlowDot className="left-[244px] top-[140px]" to="translate(76px,70px)" delay={1.6} />
            </>
          )}

          {/* Nodes */}
          <Node
            className="left-3 top-[42px]"
            title="Trigger"
            sub="new lead"
            status="done"
            icon={<BoltIcon className="h-3.5 w-3.5" />}
          />
          <Node
            className="left-3 top-[182px]"
            title="Enrich"
            sub="firmographic"
            status="done"
            icon={<DatabaseIcon className="h-3.5 w-3.5" />}
          />
          <Node
            className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            title="AI Score"
            sub="LLM intent"
            status="running"
            icon={<SparkIcon className="h-3.5 w-3.5" />}
            highlight
          />
          <Node
            className="right-3 top-[42px]"
            title="Notify"
            sub="Slack"
            status="queued"
            icon={<BellIcon className="h-3.5 w-3.5" />}
          />
          <Node
            className="right-3 top-[182px]"
            title="CRM"
            sub="sync"
            status="queued"
            icon={<SyncIcon className="h-3.5 w-3.5" />}
          />
        </div>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <StatCard label="Runs today" value="1,284" trend="+12%" />
          <StatCard label="Avg latency" value="812ms" trend="-9%" good />
          <StatCard label="Auto-resolved" value="64%" trend="+3%" />
        </div>

        {/* Live log feed */}
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-white/60">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-muted">
              Live events
            </span>
            <span className="text-[10px] text-ink-muted">streaming</span>
          </div>
          <div className="scroll-area h-[88px] overflow-hidden px-3 py-2">
            <LogFeed />
          </div>
        </div>
      </motion.div>

      {/* floating mini badges around the panel */}
      <FloatingBadge
        className="-left-3 top-10"
        delay={0.5}
        label="AI"
        value="online"
      />
      <FloatingBadge
        className="-right-3 bottom-24"
        delay={1.1}
        label="ops/min"
        value="312"
      />
    </div>
  );
}

/* ---------- Node ---------- */
function Node({
  className,
  title,
  sub,
  status,
  icon,
  highlight,
}: {
  className?: string;
  title: string;
  sub: string;
  status: "done" | "running" | "queued";
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  const statusColor =
    status === "done"
      ? "bg-green-500"
      : status === "running"
        ? "bg-brand"
        : "bg-stone-300";
  return (
    <div
      className={`absolute ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`flex items-center gap-2 rounded-xl border bg-white/90 px-2.5 py-2 backdrop-blur-md ${
          highlight
            ? "border-brand/40 shadow-[0_10px_30px_-10px_rgba(249,115,22,0.5)]"
            : "border-border shadow-[0_6px_18px_-10px_rgba(17,24,39,0.25)]"
        }`}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-lg ${
            highlight ? "bg-brand text-white" : "bg-secondary text-ink"
          }`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold leading-tight text-ink">
            {title}
          </p>
          <p className="text-[9px] leading-tight text-ink-muted">{sub}</p>
        </div>
        <span className={`ml-0.5 h-1.5 w-1.5 rounded-full ${statusColor}`} />
      </motion.div>
    </div>
  );
}

/* ---------- Flowing data dot ---------- */
function FlowDot({
  className,
  to,
  delay,
}: {
  className?: string;
  to: string;
  delay: number;
}) {
  return (
    <motion.span
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(249,115,22,0.8)] ${className}`}
      animate={{ transform: [to.split(" ").length ? "translate(0,0)" : to, to] }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ---------- Stat card ---------- */
function StatCard({
  label,
  value,
  trend,
  good,
}: {
  label: string;
  value: string;
  trend: string;
  good?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-white/70 px-3 py-2.5 backdrop-blur-sm">
      <p className="text-[9.5px] font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-0.5 text-[15px] font-semibold leading-tight text-ink">
        {value}
      </p>
      <p
        className={`text-[9.5px] font-semibold ${
          good ? "text-green-600" : "text-brand"
        }`}
      >
        {trend}
      </p>
    </div>
  );
}

/* ---------- Live log feed (auto-scrolling) ---------- */
function LogFeed() {
  const lines = [
    { t: "08:14:02", m: "Lead #4821 → scored 0.92 (hot)", c: "text-brand" },
    { t: "08:14:01", m: "Enrichment OK · Acme Inc.", c: "text-ink-muted" },
    { t: "08:14:00", m: "Trigger fired · new inbound", c: "text-ink-muted" },
    { t: "08:13:58", m: "Synced 3 leads to CRM", c: "text-green-600" },
    { t: "08:13:55", m: "AI Score: intent=buy", c: "text-brand" },
  ];
  return (
    <div className="flex flex-col gap-1">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: EASE }}
          className="flex items-center gap-2 text-[10.5px]"
        >
          <span className="font-mono text-stone-400">{l.t}</span>
          <span className={`font-medium ${l.c}`}>{l.m}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Floating badge ---------- */
function FloatingBadge({
  className,
  delay,
  label,
  value,
}: {
  className?: string;
  delay: number;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className={`absolute hidden rounded-2xl border border-border bg-white/90 px-3 py-2 shadow-[0_18px_40px_-18px_rgba(17,24,39,0.4)] backdrop-blur-xl lg:block ${className}`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="text-[13px] font-bold leading-tight text-ink">{value}</p>
    </motion.div>
  );
}

/* ---------- Inline icons ---------- */
function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6" />
    </svg>
  );
}
function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z" />
    </svg>
  );
}
function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}
function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l1.8 5.5L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.5z" />
    </svg>
  );
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
function SyncIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5M3 21v-5h5" />
    </svg>
  );
}
