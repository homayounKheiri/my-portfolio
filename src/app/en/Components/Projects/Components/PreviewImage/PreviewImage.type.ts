import { TProject } from '@/app/data/ProjectsData';

export type TPreviewImageProps = {
  open: boolean;
  onClose: () => void;
  images: TProject['images'];
  currentImageIndex: number;
};
