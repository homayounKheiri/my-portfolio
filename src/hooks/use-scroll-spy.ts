"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently active in the viewport.
 * Used to highlight nav links as the user scrolls.
 */
export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + offset;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      // Snap to last section when near the bottom of the page.
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 80
      ) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids, offset]);

  return active;
}
