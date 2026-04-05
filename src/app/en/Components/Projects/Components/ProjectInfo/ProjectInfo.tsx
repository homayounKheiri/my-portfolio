'use client';

import CustomImage from '@/components/CustomImage/CustomImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, FocusIcon } from 'lucide-react';
import PreviewImage from '../PreviewImage/PreviewImage';
import { useEffect, useState } from 'react';
import { TProjectInfoProps } from './ProjectInfo.type';
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';

export default function ProjectInfo({ project, onBack }: TProjectInfoProps) {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  Animation                                 */
  /* -------------------------------------------------------------------------- */

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const lenis = window.lenis;
    if (!lenis) return;

    const onScroll = () => {
      const maxScroll = lenis.limit || 1;
      const progress = lenis.scroll / maxScroll;
      scrollYProgress.set(progress);
    };

    lenis.on('scroll', onScroll);

    return () => lenis.off('scroll', onScroll);
  }, []);

  const scrollY1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scrollY3 = useTransform(scrollYProgress, [0, 1], [0, 600]);

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  if (!project) return null;

  return (
    <>
      <div className="relative mx-auto container px-4 box-border max-w-[min(100%,800px)] flex flex-col gap-4">
        <motion.div
          className="hidden md:block fixed mt-10 bg-gray-400 w-[300px] h-[300px] rounded-full opacity-5"
          style={{ y: scrollY1, x: '-10vw' }}
        />

        <motion.div
          className="hidden md:block fixed mt-80 bg-gray-400 w-[100px] h-[100px] rounded-full opacity-5"
          style={{ y: scrollY2, x: '50vw' }}
        />

        <motion.div
          className="fixed mt-[300px] bg-gray-400 w-[150px] h-[150px] rounded-full opacity-5"
          style={{ y: scrollY3, x: '20vw' }}
        />

        <div>
          <Button
            variant={'default'}
            size={'icon-sm'}
            className="rounded-[100px] bg-gray-400 hover:bg-gray-500"
            onClick={() => onBack()}
          >
            <ArrowLeftIcon className="size-5" />
          </Button>
        </div>

        <h3 className="text-xl font-semibold">{project.name}</h3>

        <motion.div layoutId='image'>
          <Carousel className="rounded-lg overflow-hidden">
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem className="select-none" key={index}>
                  <CustomImage
                    key={index}
                    src={image}
                    alt={`${project.name} image ${index + 1}`}
                    width={400}
                    height={500}
                    parentClassName="aspect-video"
                    className="object-cover pointer-events-none"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <Button
              variant={'outline'}
              size={'icon-lg'}
              onClick={() => setOpenPreviewModal(true)}
              className="text-primary shadow-lg border-none shadow-[#00000066] p-4 rounded-[50%] absolute bottom-4 left-4"
            >
              <FocusIcon className="size-5" />
            </Button>
          </Carousel>
        </motion.div>

        <div className="flex flex-col gap-6 grow">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-600 text-primary-foreground rounded-full text-sm"
                >
                  {tec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PreviewImage
        open={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        images={project.images}
        currentImageIndex={0}
      />
    </>
  );
}
