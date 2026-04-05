import CustomImage from '@/components/CustomImage/CustomImage';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import card_bubble from '@/app/assets/images/card_bubble.svg';
import Image from 'next/image';
import { TProjectCardProps } from './ProjectCard.type';
import { motion } from 'motion/react';

export default function ProjectCard({
  project,
  className,
  onShow,
}: TProjectCardProps) {
  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex flex-col items-center transition-all drop-shadow-gray-300 hover:drop-shadow-xl hover:scale-[1.01]">
      <div
        className={cn(
          'flex flex-col rounded-lg overflow-hidden drop-shadow-md',
          className
        )}
      >
        <motion.div layoutId="image">
          <Carousel
            opts={{
              loop: true,
            }}
            className="relative"
          >
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index} className="select-none">
                  <CustomImage
                    key={index}
                    src={image}
                    alt={`${project.name} image ${index + 1}`}
                    width={400}
                    height={200}
                    parentClassName="aspect-3/2"
                    className="pointer-events-none"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        <div className="h-4 w-full bg-white" />
        <div className="flex flex-row relative h-9">
          <div className="bg-white h-full flex-1" />
          <Image
            src={card_bubble}
            alt=""
            style={{ flex: 0 }}
            className="scale-105 pointer-events-none select-none"
          />
          <div className="bg-white h-full flex-1" />
        </div>
      </div>
      <div className="flex justify-between items-start mx-auto mt-4 -mb-[20px]">
        {/* <h3 className="text-xl font-bold mb-4">{project.name}</h3> */}
        <Button
          variant="outline"
          className="rounded-[100px] -mt-10 p-4 w-12 h-12 text-primary hover:text-white hover:bg-primary hover:scale-115"
          style={{ zIndex: 2 }}
          size={'icon'}
          onClick={() => onShow(project)}
          aria-label={`View details for ${project.name}`}
        >
          <InfoIcon className="size-6" />
        </Button>
      </div>
    </div>
  );
}
