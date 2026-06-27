"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Sparkles,
  Workflow,
  Database,
  LineChart,
  Users,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Minimal interactive infographic representing an AI-powered automation flow.
 * Clean premium cards (Email → AI → Automation → Database → Dashboard)
 * connected by thin animated lines with slow data flow + pulsing status.
 */
export function AutomationFlow() {
  const reduce = useReducedMotion();

  const NODES = [
    { icon: Mail, label: "Email", sub: "inbound", status: "live" },
    { icon: Sparkles, label: "AI", sub: "intake", status: "live" },
    { icon: Workflow, label: "Automation", sub: "orchestrate", status: "live" },
    { icon: Database, label: "Database", sub: "store", status: "live" },
    { icon: LineChart, label: "Dashboard", sub: "report", status: "live" },
  ] as const;

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-white/80 p-6 shadow-[0_40px_90px_-50px_rgba(17,24,39,0.4)] backdrop-blur-xl sm:p-8"
      >
        {/* top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Live workflow
            </p>
            <p className="mt-0.5 text-[15px] font-semibold tracking-tight text-ink">
              Lead automation pipeline
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            Active
          </span>
        </div>

        {/* Flow — vertical on small screens, vertical stack with connectors */}
        <div className="relative mt-7 flex flex-col gap-0">
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isLast = i === NODES.length - 1;
            return (
              <div key={node.label} className="relative">
                {/* Node card */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.35 + i * 0.1 }}
                  className="relative z-10 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-[0_6px_20px_-12px_rgba(17,24,39,0.18)]"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      node.label === "AI"
                        ? "bg-gradient-to-br from-brand to-orange-400 text-white shadow-[0_8px_20px_-8px_rgba(249,115,22,0.65)]"
                        : "bg-secondary text-ink"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold leading-tight text-ink">
                      {node.label}
                    </p>
                    <p className="text-[10.5px] uppercase tracking-wider text-ink-muted">
                      {node.sub}
                    </p>
                  </div>
                  {/* pulsing status */}
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                </motion.div>

                {/* Connector line + flowing dot */}
                {!isLast && (
                  <div className="relative ml-[2.6rem] h-7 w-px">
                    <div className="absolute inset-0 bg-gradient-to-b from-border to-border/40" />
                    {!reduce && (
                      <motion.span
                        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_8px_rgba(249,115,22,0.9)]"
                        animate={{ top: ["-2px", "26px"] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5 + i * 0.35,
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer stat strip */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-[#FAFAF9] px-4 py-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-brand" strokeWidth={1.9} />
            <span className="text-[12px] font-medium text-ink-muted">
              Processed today
            </span>
          </div>
          <span className="text-[15px] font-bold tracking-tight text-ink">
            1,284
            <span className="ml-1 text-[11px] font-semibold text-brand">
              +12%
            </span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
