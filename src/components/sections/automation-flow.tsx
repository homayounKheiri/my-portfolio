"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Mail,
  CalendarClock,
  Users,
  Phone,
  FileBarChart,
  LayoutDashboard,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Instagram icon (not available in lucide-react). */
function Instagram({ className, strokeWidth = 1.9 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/**
 * Minimal circular infographic: a central AI core with 8 circular nodes
 * evenly distributed around it, connected by thin curved lines.
 * Subtle animations: rotating rings, pulsing nodes, flowing dots,
 * gentle breathing of the core. Purely circular UI, premium & futuristic.
 */
export function AutomationFlow() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  // 8 nodes evenly placed around the circle (every 45°).
  // Start at -90° (top) and go clockwise.
  const NODES = [
    { icon: MessageSquare, labelKey: "flow.node.chat", angle: -90 },
    { icon: Mail, labelKey: "flow.node.email", angle: -45 },
    { icon: CalendarClock, labelKey: "flow.node.calendar", angle: 0 },
    { icon: Users, labelKey: "flow.node.crm", angle: 45 },
    { icon: Phone, labelKey: "flow.node.calls", angle: 90 },
    { icon: Instagram, labelKey: "flow.node.instagram", angle: 135 },
    { icon: FileBarChart, labelKey: "flow.node.reports", angle: 180 },
    { icon: LayoutDashboard, labelKey: "flow.node.dashboard", angle: 225 },
  ] as const;

  // Geometry (in % of the square container)
  const RADIUS = 38; // distance from center to node center
  const CENTER = 50;

  const polar = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: CENTER + r * Math.cos(rad),
      y: CENTER + r * Math.sin(rad),
    };
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Outer soft glow behind everything */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.10),transparent_65%)]"
      />

      {/* Rotating dashed rings — drawn in SVG so they share the exact center */}
      {!reduce && (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <motion.circle
            cx="50"
            cy="50"
            r="47"
            stroke="rgba(17,24,39,0.08)"
            strokeWidth="0.3"
            strokeDasharray="1.5 2"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" } as React.CSSProperties}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="34"
            stroke="rgba(249,115,22,0.22)"
            strokeWidth="0.3"
            strokeDasharray="1.5 2"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" } as React.CSSProperties}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="24"
            stroke="rgba(17,24,39,0.06)"
            strokeWidth="0.3"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" } as React.CSSProperties}
          />
        </svg>
      )}

      {/* SVG: curved connectors + flowing dots */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="conn" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(249,115,22,0.05)" />
            <stop offset="50%" stopColor="rgba(249,115,22,0.45)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0.05)" />
          </linearGradient>
        </defs>

        {NODES.map((node, i) => {
          const p = polar(node.angle, RADIUS);
          // Quadratic curve from center to node, with a slight bow.
          const midAngle = node.angle + 12;
          const mid = polar(midAngle, RADIUS * 0.55);
          const d = `M ${CENTER} ${CENTER} Q ${mid.x} ${mid.y} ${p.x} ${p.y}`;
          return (
            <g key={node.labelKey}>
              <path
                d={d}
                stroke="url(#conn)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
              {/* flowing dot along the curve */}
              {!reduce && (
                <motion.circle
                  r="0.9"
                  fill="#F97316"
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  style={{
                    offsetPath: `path("${d}")`,
                    filter: "drop-shadow(0 0 2px rgba(249,115,22,0.9))",
                  } as React.CSSProperties}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Central AI core — breathing + pulsing.
          Use framer-motion x/y for centering so the transform is fully
          managed by motion and the scale animation can't knock it off-center. */}
      <motion.div
        className="absolute"
        style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.06, 1], opacity: [1, 0.92, 1] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-orange-400 text-white shadow-[0_16px_40px_-12px_rgba(249,115,22,0.7)] sm:h-24 sm:w-24"
        >
          <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />
          {/* Seamless pulse ring — opacity starts AND ends at 0 so the loop
              boundary is invisible (no pop). Scale grows linearly; the
              reset from 1.8→1 happens while opacity is 0. */}
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full border border-brand/50"
              animate={{
                scale: [1, 1.9],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.35, 1],
              }}
            />
          )}
          {/* Second staggered pulse for a continuous breathing feel */}
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full border border-brand/40"
              animate={{
                scale: [1, 1.9],
                opacity: [0, 0.45, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.35, 1],
                delay: 1.4,
              }}
            />
          )}
        </motion.div>
      </motion.div>
      {/* AI Core label — positioned absolutely below the core so it doesn't
          shift the core's center off the shared concentric center point. */}
      <p
        className="pointer-events-none absolute left-1/2 top-[calc(50%+3.25rem)] -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted sm:top-[calc(50%+3.75rem)]"
      >
        {t("flow.aiCore")}
      </p>

      {/* Surrounding nodes */}
      {NODES.map((node, i) => {
        const p = polar(node.angle, RADIUS);
        const Icon = node.icon;
        const label = t(node.labelKey);
        return (
          <motion.div
            key={node.labelKey}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: EASE,
              delay: 0.4 + i * 0.08,
            }}
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : { scale: [1, 1.08, 1] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-ink shadow-[0_8px_22px_-10px_rgba(17,24,39,0.25)] sm:h-14 sm:w-14"
            >
              <Icon className="h-5 w-5 text-ink/70 sm:h-5.5 sm:w-5.5" strokeWidth={1.9} />
            </motion.div>
            <p className="mt-1.5 text-center text-[10px] font-medium text-ink-muted">
              {label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
