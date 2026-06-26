"use client";

import { useEffect, useRef } from "react";

/**
 * Soft orange cursor glow that gently follows the mouse inside an element.
 * Uses a positioned div updated via rAF + spring-like smoothing for a
 * premium, low-opacity depth effect. Respects prefers-reduced-motion.
 */
export function useCursorGlow<T extends HTMLElement>(opts?: {
  size?: number;
  opacity?: number;
  smoothing?: number;
}) {
  const ref = useRef<T | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const size = opts?.size ?? 520;
  const opacity = opts?.opacity ?? 0.5;
  const smoothing = opts?.smoothing ?? 0.14;

  useEffect(() => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    // Respect reduced motion — hide the glow entirely.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      glow.style.opacity = "0";
      return;
    }

    let mouseX = el.clientWidth / 2;
    let mouseY = el.clientHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let active = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!active) {
        active = true;
        glow.style.opacity = String(opacity);
      }
    };

    const onLeave = () => {
      active = false;
      glow.style.opacity = "0";
    };

    const loop = () => {
      curX += (mouseX - curX) * smoothing;
      curY += (mouseY - curY) * smoothing;
      glow.style.transform = `translate3d(${curX - size / 2}px, ${
        curY - size / 2
      }px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [size, opacity, smoothing]);

  return { ref, glowRef, size, opacity };
}
