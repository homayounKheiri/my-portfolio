'use client';

import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Sidebar() {
  /* -------------------------------------------------------------------------- */
  /*                                   Router                                   */
  /* -------------------------------------------------------------------------- */

  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                                    Const                                   */
  /* -------------------------------------------------------------------------- */

  const items = [
    {
      id: 1,
      icon: <InfoIcon />,
      to: 'info',
    },
    {
      id: 2,
      icon: <InfoIcon />,
      to: 'projects',
    },
    {
      id: 3,
      icon: <InfoIcon />,
      to: 'chat',
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                  Function                                  */
  /* -------------------------------------------------------------------------- */

  const handleItemClick = (to: string) => {
    router.push(`#${to}`, { scroll: true });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      style={{ zIndex: 40 }}
      className="fixed flex flex-row left-1/2 -translate-x-1/2 top-4 md:flex-col md:top-1/2 md:left-4 md:translate-x-0 md:-translate-y-1/2 backdrop-blur-lg bg-[#ffffff55] shadow-lg border border-gray-200 gap-1 p-2 rounded-[100px]"
    >
      {items.map((item) => (
        <Button
          variant={'link'}
          onClick={() => handleItemClick(item.to)}
          key={item.id}
          className="text-gray-800 size-6 md:size-10  hover:bg-gray-300 rounded-[50%]"
        >
          <span /* className="drop-shadow-primary drop-shadow-md" */>
            {item.icon}
          </span>
        </Button>
      ))}
    </div>
  );
}
