import CategoryGrid from "@/modules/shop/components/ProductGrid/CategoryCard";
import CarouselPromotion from "@/modules/shop/components/CarouselProduct/CarouselPromotion"
import CarouselSoftware from "@/modules/shop/components/CarouselProduct/CaoruselSoftware";



export default function HomePage() {
  return (
    <div className="flex">
      <div className="flex-1">
        <CarouselPromotion />
        <CategoryGrid />
        <CarouselSoftware />
      </div>
    </div>
  );
}