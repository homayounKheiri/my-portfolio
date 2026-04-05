'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // init lenis
  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduce) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.12,
    });

    lenisRef.current = lenis;

    // (optional) quick way to use it anywhere:
    window.lenis = lenis;

    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  // scroll to top on route change (Next App Router)
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <div ref={wrapperRef} style={{ height: '100vh', overflow: 'hidden' }}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
