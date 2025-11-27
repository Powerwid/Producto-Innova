import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerSlide?: number;
  height?: string;
}

export function Carousel<T>({
  items,
  renderItem,
  itemsPerSlide = 4,
  height = "h-auto",
}: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full">
      <div className={`overflow-hidden w-full ${height}`} ref={emblaRef}>
        <div className="flex">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex-[0_0_400px] px-3" 
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="
          absolute left-2 top-1/2 -translate-y-1/2
          bg-white shadow rounded-full px-3 py-2 hover:bg-gray-100
        "
      >
        ‹
      </button>

      <button
        onClick={scrollNext}
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          bg-white shadow rounded-full px-3 py-2 hover:bg-gray-100
        "
      >
        ›
      </button>
    </div>
  );
}
