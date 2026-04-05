'use client';

import { useRef, useState } from 'react';
import ProjectCard from './Components/ProjectCard/ProjectCard';
import SweepingLight from '@/components/SweepingLight/SweepingLight';
import background from '@/app/assets/images/bg_gr_light.png';
import ProjectInfo from './Components/ProjectInfo/ProjectInfo';
import { cn } from '@/lib/utils';
import { useScroll, useTransform } from 'motion/react';
import { motion } from 'motion/react';
import projectsData, { TProject } from '@/app/data/ProjectsData';

export default function Projects() {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

  const [showInfo, setShowInfo] = useState<boolean>(false);

  /* -------------------------------------------------------------------------- */
  /*                                     Ref                                    */
  /* -------------------------------------------------------------------------- */

  const showInfoRef = useRef<HTMLDivElement | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                  Function                                  */
  /* -------------------------------------------------------------------------- */

  const handleShowProject = (project: TProject) => {
    setSelectedProject(project);
    setShowInfo(true);
    window.lenis?.scrollTo("#projects", {
      duration: 1.5,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                    Const                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      className="relative overflow-hidden w-[100vw]"
      id="projects"
      // ref={layoutRef}
    >
      <SweepingLight />

      <div
        className="relative z-[2]"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className={cn(
            'flex flex-row w-full transition-transform py-10 md:py-20 duration-1000',
            showInfo ? '-translate-x-[100vw]' : ''
          )}
        >
          <div className="w-[100vw] shrink-0 ">
            <div className="container lg:max-w-[1100px] mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
                {projectsData.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: '-100px', once: true }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <ProjectCard
                      project={project}
                      className="mx-auto"
                      onShow={handleShowProject}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[100vw] shrink-0 md:-mt-10" ref={showInfoRef}>
            {selectedProject && (
              <ProjectInfo
                onBack={() => setShowInfo(false)}
                project={selectedProject}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
