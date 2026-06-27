"use client";

import { useEffect, useRef } from "react";

/**
 * A continuous cursor glow that appears only within a set of tracked
 * sections (e.g. Hero + Why Automation), but transitions seamlessly
 * across their shared boundary — never clipped at the bottom of the
 * first section.
 *
 * Uses position: fixed so the glow itself is never cropped by any
 * section's overflow-hidden. The glow is shown (opacity) only while the
 * mouse is within one of the tracked sections' bounding rects, and fades
 * out smoothly when it leaves the tracked area.
 *
 * mix-blend-mode: screen makes the orange glow lighten whatever is below
 * it — visible over both white and dark backgrounds without obscuring
 * content. z-30 keeps it above section content but below modals (z-60).
 */
export function ContinuousCursorGlow({
  sectionIds,
  size = 560,
  opacity = 0.35,
  smoothing = 0.12,
}: {
  sectionIds: string[];
  size?: number;
  opacity?: number;
  smoothing?: number;
}) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      glow.style.opacity = "0";
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let active = false;
    let raf = 0;

    const isInTrackedSections = (x: number, y: number) => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          return true;
        }
      }
      return false;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const inside = isInTrackedSections(mouseX, mouseY);
      if (inside && !active) {
        active = true;
        glow.style.opacity = String(opacity);
      } else if (!inside && active) {
        active = false;
        glow.style.opacity = "0";
      }
    };

    const loop = () => {
      curX += (mouseX - curX) * smoothing;
      curY += (mouseY - curY) * smoothing;
      glow.style.transform = `translate3d(${curX - size / 2}px, ${
        curY - size / 2
      }px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [sectionIds, size, opacity, smoothing]);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 rounded-full opacity-0 transition-opacity duration-500"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at center, rgba(249,115,22,0.55), rgba(249,115,22,0.2) 35%, transparent 70%)",
        filter: "blur(60px)",
        mixBlendMode: "screen",
        willChange: "transform, opacity",
      }}
    />
  );
}
