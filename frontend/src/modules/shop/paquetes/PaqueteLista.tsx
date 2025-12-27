import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Pack {
    id_pack: number;
    nombre: string;
    descripcion?: string;
    precio_final: number;
    estado: string;
    created_at: string;
    updated_at: string;
}

export default function PaqueteLista() {
    const [packs, setPacks] = useState<Pack[]>([]);

    // Cargar paquetes
    useEffect(() => {
        fetch("http://localhost:3000/pack")
            .then((res) => res.json())
            .then((data) => {
                // 👇 AQUÍ ESTÁ LA CORRECCIÓN
                setPacks(Array.isArray(data) ? data : data.data || []);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    // Eliminar paquete
    const eliminarPack = (id_pack: number) => {
        if (!confirm("¿Seguro que deseas eliminar este paquete?")) return;

        fetch(`http://localhost:3000/pack/${id_pack}`, {
            method: "DELETE",
        })
            .then(() => {
                setPacks((prev) =>
                    prev.filter((p) => p.id_pack !== id_pack)
                );
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Lista de Paquetes
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packs.map((p) => (
                    <div
                        key={p.id_pack}
                        className="bg-white rounded-xl shadow p-4"
                    >
                        <h2 className="text-lg font-semibold">
                            {p.nombre}
                        </h2>

                        <p className="text-sm text-gray-600 line-clamp-2">
                            {p.descripcion || "Sin descripción"}
                        </p>

                        <p className="mt-2 font-medium">
                            Precio: S/. {p.precio_final}
                        </p>

                        <p
                            className={`text-sm font-semibold ${p.estado === "activo"
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            Estado: {p.estado}
                        </p>

                        <div className="mt-4 flex justify-between">
                            <Link
                                to={`/pack/editar/${p.id_pack}`}
                                className="text-blue-600 hover:underline"
                            >
                                Editar
                            </Link>

                            <button
                                onClick={() => eliminarPack(p.id_pack)}
                                className="text-red-600 hover:underline"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {packs.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No hay paquetes registrados.
                </p>
            )}
        </div>
    );
}
