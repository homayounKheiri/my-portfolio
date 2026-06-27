"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Multi-layered, very subtle living background.
 * - warm gradient base
 * - slow floating blurred orbs (orange + charcoal)
 * - extremely slow panning grid
 * - faint dot pattern + noise
 * Everything is fixed and pointer-events-none so it never blocks UX.
 */
export function AnimatedBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Warm base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#FFFFFF_0%,#FBFAF8_45%,#F7F3EE_100%)]" />

      {/* Soft top sheen */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-[linear-gradient(180deg,rgba(249,115,22,0.06),transparent)]" />

      {/* Slow panning grid */}
      <div className="absolute inset-0 bg-grid animate-grid-pan opacity-70" />

      {/* Floating orbs */}
      <motion.div
        className="orb"
        style={{
          width: 460,
          height: 460,
          left: "-6%",
          top: "8%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.55), rgba(249,115,22,0.15) 60%, transparent 70%)",
        }}
        animate={reduce ? undefined : { y: [0, -34, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{
          width: 520,
          height: 520,
          right: "-8%",
          top: "30%",
          background:
            "radial-gradient(circle at 60% 40%, rgba(17,24,39,0.18), rgba(17,24,39,0.06) 60%, transparent 70%)",
        }}
        animate={
          reduce ? undefined : { y: [0, 28, 0], x: [0, -18, 0], scale: [1, 0.96, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb"
        style={{
          width: 380,
          height: 380,
          left: "30%",
          bottom: "-6%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(251,146,60,0.4), rgba(251,146,60,0.1) 60%, transparent 70%)",
        }}
        animate={reduce ? undefined : { y: [0, -22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots opacity-40" />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-multiply" />

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-[linear-gradient(180deg,transparent,rgba(251,250,248,0.9))]" />
    </div>
  );
}
