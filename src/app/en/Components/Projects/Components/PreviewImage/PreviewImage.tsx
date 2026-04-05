import CustomImage from '@/components/CustomImage/CustomImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { TPreviewImageProps } from './PreviewImage.type';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function PreviewImage({
  open,
  onClose,
  images,
  currentImageIndex,
}: TPreviewImageProps) {
  return (
    <Dialog open={open} onOpenChange={(b) => !b && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-transparent border-none min-w-full h-full p-0 "
      >
        <div
          className={'bg-[#000000aa] flex items-center justify-center w-full'}
          onClick={() => {
            onClose();
          }}
          style={{ zIndex: 100 }}
        >
          <Carousel
            className="w-full h-full flex items-center justify-center "
            opts={{ startIndex: currentImageIndex }}
          >
            <CarouselContent className="min-w-full">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  <CustomImage
                    src={image}
                    unoptimized
                    alt={`image ${index + 1}`}
                    width={400}
                    height={500}
                    className="object-contain"
                    parentClassName="md:max-h-[90vh]  px-4"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
