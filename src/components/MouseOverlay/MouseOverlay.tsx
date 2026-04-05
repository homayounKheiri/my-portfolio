'use client';

import { useEffect, useState } from 'react';
import './MouseOverlay.style.css';

export default function MouseOverlay() {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const [mouseLatLang, setMouseLatLang] = useState({ x: 500, y: 500 });

  /* -------------------------------------------------------------------------- */
  /*                                   Effect                                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const mouseListener = (ev: globalThis.MouseEvent) => {
      setMouseLatLang({ x: ev.x, y: ev.y });
    };

    addEventListener('mousemove', mouseListener);

    return () => {
      removeEventListener('mousemove', mouseListener);
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                  Callback                                  */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      className={
        'mouse_overlay fixed w-28 h-28 opacity-25 bg-gray-300 pointer-events-none rounded-[100px]'
      }
      style={{
        top: `${mouseLatLang.y - 54}px`,
        left: `${mouseLatLang.x - 54}px`,
        zIndex: 100000,
      }}
    />
  );
}
