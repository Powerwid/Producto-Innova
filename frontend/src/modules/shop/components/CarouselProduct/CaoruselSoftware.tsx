import prueba_1 from "@images/prueba_1.webp";
import prueba_2 from "@images/prueba_2.webp";
import prueba_3 from "@images/prueba_3.webp";
import prueba_4 from "@images/prueba_4.webp";0
import { Carousel } from "@/common/ui/Carousel/Carousel";

export default function CaoruselSoftware() {
  const systems = [
    {
      id: "basic",
      title: "Sistema Básico",
      category: "Ideal para pequeños negocios",
      price: 299,
      image: prueba_1,
    },
    {
      id: "express",
      title: "Facturación Express",
      category: "Rápido y eficiente",
      price: 399,
      image: prueba_2,
    },
    {
      id: "pos",
      title: "Sistema POS",
      category: "Para punto de venta",
      price: 499,
      image: prueba_3,
    },
    {
      id: "mobile",
      title: "Facturador Móvil",
      category: "Factura desde tu celular",
      price: 349,
      image: prueba_4,
    },
    
  ];

  return (
    <section className="w-full py-14 px-6 bg-[#f3f4f6]">

      <h2 className="text-3xl font-semibold mb-2">
        <span className="text-blue-600">Todos</span> los sistemas. Elige el tuyo.
      </h2>

      <Carousel
        items={systems}
        itemsPerSlide={4}
        height="h-auto"
        renderItem={(sys) => (
          <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-lg transition cursor-pointer">

            <div className="text-xs tracking-wider text-orange-600 font-semibold mb-3">
              NUEVO
            </div>

            <h3 className="text-xl font-semibold">{sys.title}</h3>
            <p className="text-gray-500 text-sm mb-6">{sys.category}</p>

            <div className="mb-6">
              <img
                src={sys.image}
                className="w-full h-[250px] object-cover rounded-xl"
                alt={sys.title}
              />
            </div>

            <p className="text-gray-700 text-sm mb-4">
              Desde{" "}
              <span className="font-semibold text-gray-900">${sys.price}</span>
            </p>

            <button
              className="
                bg-blue-600 hover:bg-blue-700
                text-white text-sm font-medium
                px-5 py-2 rounded-full
                w-full transition
              "
            >
              Comprar
            </button>

          </div>
        )}
      />
    </section>
  );
}
