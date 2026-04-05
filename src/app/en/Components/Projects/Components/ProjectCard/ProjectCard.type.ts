import { TProject } from '@/app/data/ProjectsData';

export type TProjectCardProps = {
  project: TProject;
  className?: string;
  onShow: (project: TProject) => void;
};
