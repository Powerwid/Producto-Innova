import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    imagen?: string;
}

export default function ProductoEditar() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);

    // Cargar producto por ID
    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/producto/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProducto(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!producto) return;

        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        });
    };

    const guardarCambios = () => {
        if (!producto) return;

        fetch(`http://localhost:3000/producto/${producto.id_producto}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        })
            .then(() => {
                alert("Producto actualizado");
                navigate("/shop/productos");
            })
            .catch(() => alert("Error al guardar"));
    };

    if (loading) return <p className="p-6">Cargando...</p>;
    if (!producto) return <p className="p-6">Producto no encontrado</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>

            <div className="space-y-4">
                <input
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    placeholder="Nombre"
                />

                <textarea
                    name="descripcion"
                    value={producto.descripcion || ""}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    placeholder="Descripción"
                />

                <input
                    name="precio"
                    type="number"
                    value={producto.precio}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />

                <input
                    name="stock"
                    type="number"
                    value={producto.stock}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />

                <div className="flex gap-4">
                    <button
                        onClick={guardarCambios}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="border px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
