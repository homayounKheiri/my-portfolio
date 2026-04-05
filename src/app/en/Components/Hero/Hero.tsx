'use client';

import SweepingLight from '@/components/SweepingLight/SweepingLight';
import { Button } from '@/components/ui/button';
import {
  FileDownIcon,
  GithubIcon,
  LinkedinIcon,
  PhoneIcon,
} from 'lucide-react';
import Link from 'next/link';
import background from '@/app/assets/images/bg_gr_dark.png';
import { Fragment } from 'react/jsx-runtime';
import { motion } from 'motion/react';
import downloadFile from '@/utils/downloadFile/downloadFile';

export default function Hero() {
  /* -------------------------------------------------------------------------- */
  /*                                    Const                                   */
  /* -------------------------------------------------------------------------- */

  const socials = [
    {
      id: 1,
      link: '',
      icon: <GithubIcon className="size-5" />,
    },
    {
      id: 2,
      link: 'https://linkedin.com/in/homayoun-kheiri',
      icon: <LinkedinIcon className="size-5" />,
    },
    {
      id: 3,
      link: 'tel:09130654757',
      icon: <PhoneIcon className="size-5" />,
    },
    {
      id: 10,
      link: '#',
      icon: <FileDownIcon className="size-5" />,
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* --------------------------------------------------------------------------  */
  return (
    <div
      id="info"
      className="bg-gray-700 h-[min(400px,70vw)] relative flex flex-col overflow-hidden  box-content"
    >
      <SweepingLight dark />

      <div
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 2,
        }}
        className="w-full mx-auto flex flex-col items-center justify-center h-full py-3 md:py-6"
      >
        <div className="flex flex-col items-center gap-[min(5vw,24px)] mt-[min(60px,10vw)]">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-[min(7vw,60px)] mx-10 bg-linear-150 from-gray-400 leading-normal to-white bg-clip-text text-transparent font-semibold"
          >
            Homayoun Kheiri
          </motion.h1>

          <motion.hr
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="w-full border-gray-500"
          />

          <motion.h4
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="text-gray-400 text-[min(4vw,20px)]"
          >
            Web Developper
          </motion.h4>
        </div>

        <div className="flex flex-row items-center gap-2 mt-auto">
          {socials.map((item, idx) => (
            <Fragment key={item.id}>
              <Link
                href={item.link}
                onClick={() =>
                  item.id === 10
                    ? downloadFile(
                        '/HomayounKheiri-Portfolio.pdf',
                        'HomayounKheiri-Portfolio'
                      )
                    : null
                }
                target={item.link !== '#' ? '_blank' : '_self'}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: 0.2 * idx + 0.5,
                  }}
                >
                  <Button
                    className="rounded-[100px] text-white p-5 hover:scale-110 hover:bg-white hover:text-primary"
                    size="icon-sm"
                    variant={'link'}
                  >
                    {item.icon}
                  </Button>
                </motion.div>
              </Link>
              {idx < socials.length - 1 && (
                <div className="h-6 w-[1px] bg-gray-600" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
