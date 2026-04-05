import Image from 'next/image';
import { TCustomImageProps } from './CustomImage.type';
import { cn } from '@/lib/utils';

export default function CustomImage({
  className,
  parentClassName,
  alt,
  ...props
}: TCustomImageProps) {
  return (
    <div
      className={cn('relative overflow-hidden aspect-square', parentClassName)}
    >
      <Image
        alt={alt}
        className={cn('w-full h-full object-cover', className)}
        {...props}
      />
    </div>
  );
}
