import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "¡Mega Descuentos!",
    subtitle: "Hasta 50% OFF en sistemas seleccionados",
    description: "Aprovecha nuestras ofertas especiales en sistemas de facturación premium",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=800&fit=crop"
  },
  {
    id: 2,
    title: "Black Friday Extendido",
    subtitle: "40% de descuento en todos los planes anuales",
    description: "Compra ahora y ahorra en tu suscripción anual",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=800&fit=crop"
  },
  {
    id: 3,
    title: "Nuevos Clientes",
    subtitle: "30% OFF en tu primera compra",
    description: "Únete a miles de empresas que confían en nosotros",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&h=800&fit=crop"
  }
];

export default function CarouselPromotion() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[550px] overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: "brightness(0.6)"
            }}
          />

          <div className="absolute inset-0 from-blue-700/70 to-blue-500/60" />

          <div className="relative h-full flex items-center px-10 max-w-7xl mx-auto text-white">
            <div className="w-full md:w-[55%]">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-2xl md:text-3xl mb-4">
                {slide.subtitle}
              </p>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                {slide.description}
              </p>

              <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold text-lg shadow hover:bg-gray-100 transition">
                Ver Ofertas
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg backdrop-blur transition"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg backdrop-blur transition"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 rounded-full transition-all ${
              current === i ? "w-8 bg-white" : "w-3 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
