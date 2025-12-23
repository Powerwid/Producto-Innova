import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Categoria {
    id_categoria: number;
    nombre: string;
}

export default function ProductoNuevo() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
        id_categoria: "",
    });

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingCategorias, setLoadingCategorias] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/categoria")
            .then((res) => res.json())
            .then((data) => setCategorias(data))
            .catch((err) =>
                console.error("Error cargando categorías:", err)
            )
            .finally(() => setLoadingCategorias(false));
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 🔒 VALIDACIÓN CLAVE (evita id_categoria = 0)
        if (!form.id_categoria) {
            alert("Debe seleccionar una categoría");
            return;
        }

        const body = {
            nombre: form.nombre,
            descripcion: form.descripcion || undefined,
            precio: Number(form.precio),
            stock: Number(form.stock),
            id_categoria: Number(form.id_categoria),
        };

        try {
            const res = await fetch("http://localhost:3000/producto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("Error backend:", error);
                return;
            }

            navigate("/shop/producto");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Crear Nuevo Producto
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        className="w-full p-2 border rounded-lg"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        rows={3}
                        className="w-full p-2 border rounded-lg"
                        value={form.descripcion}
                        onChange={handleChange}
                    />
                </div>

                {/* Precio */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Precio
                    </label>
                    <input
                        type="number"
                        name="precio"
                        className="w-full p-2 border rounded-lg"
                        value={form.precio}
                        onChange={handleChange}
                        required
                        min={0}
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        className="w-full p-2 border rounded-lg"
                        value={form.stock}
                        onChange={handleChange}
                        required
                        min={0}
                    />
                </div>

                {/* Categoría */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Categoría
                    </label>
                    <select
                        name="id_categoria"
                        className="w-full p-2 border rounded-lg"
                        value={form.id_categoria}
                        onChange={handleChange}
                        required
                        disabled={loadingCategorias}
                    >
                        <option value="">
                            {loadingCategorias
                                ? "Cargando categorías..."
                                : "Seleccione una categoría"}
                        </option>

                        {categorias.map((cat) => (
                            <option
                                key={cat.id_categoria}
                                value={cat.id_categoria}
                            >
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Imagen URL */}
                <div>
                    <label className="block text-gray-700 font-medium">
                        Imagen (URL)
                    </label>
                    <input
                        type="text"
                        name="imagen"
                        className="w-full p-2 border rounded-lg"
                        value={form.imagen}
                        onChange={handleChange}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/shop/producto")}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        disabled={loadingCategorias}
                    >
                        Crear Producto
                    </button>
                </div>
            </form>
        </div>
    );
}
