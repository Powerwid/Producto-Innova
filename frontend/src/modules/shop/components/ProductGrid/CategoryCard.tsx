
import prueba_1 from "@images/prueba_1.webp"
import prueba_2 from "@images/prueba_2.webp"
import prueba_3 from "@images/prueba_3.webp"
import prueba_4 from "@images/prueba_4.webp"

type Category = {
  id: string;
  title: string;
  image: string;
};

const categories: Category[] = [
  {
    id: "basic",
    title: "Venta de Zapatillas",
    image: prueba_1,
  },
  {
    id: "active",
    title: "Venta Activa",
    image: prueba_2,
  },
  {
    id: "laceless",
    title: "Venta sin Cordones",
    image: prueba_3,
  },
  {
    id: "outdoor",
    title: "Venta Exterior",
    image: prueba_4,
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full py-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="
              group relative h-[600px]
              rounded-3xl overflow-hidden cursor-pointer
              transition-[border-radius] duration-600
              hover:rounded-[999px]
            "
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300" />

            <div
              className="
                absolute inset-0 flex flex-col items-center justify-center
                gap-3 text-white text-center
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              <span className="text-sm tracking-[0.18em] uppercase">
                {cat.title}
              </span>

              <button
                className="
                  px-6 py-1.5 rounded-full border border-white/90
                  text-xs font-medium tracking-wide
                  bg-white/5 hover:bg-white/20
                  transition-colors
                "
              >
                Ver productos
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
