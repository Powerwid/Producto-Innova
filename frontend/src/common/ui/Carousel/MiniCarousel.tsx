// @common/ui/Carousel/MiniCarousel.tsx
import useEmblaCarousel from "embla-carousel-react";

interface MiniProps {
  images: string[];
  height?: string;
}

export default function MiniCarousel({ images, height = "h-[180px]" }: MiniProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="w-full">
      <div className={`overflow-hidden rounded-2xl ${height}`} ref={emblaRef}>
        <div className="flex">
          {images.map((img, idx) => (
            <div key={idx} className="flex-[0_0_100%]">
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`slide-${idx}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
