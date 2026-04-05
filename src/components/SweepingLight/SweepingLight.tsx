import React from 'react';

import './SweepingLight.style.css';
import { cn } from '@/lib/utils';

export default function SweepingLight({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <div
        className={cn(
          'sweeping_light absolute top-0 opacity-50 bottom-0 w-60 rotate-12 scale-130',
          dark ? 'bg-gray-600' : 'bg-gray-200'
        )}
        style={{ zIndex: 1 }}
      />

      <div
        className={cn(
          'sweeping_light absolute top-0 opacity-50 bottom-0 w-60 rotate-12 scale-130',
          dark ? 'bg-gray-600' : 'bg-gray-200'
        )}
        style={{ animationDelay: '4s', zIndex: 1 }}
      />
    </>
  );
}
