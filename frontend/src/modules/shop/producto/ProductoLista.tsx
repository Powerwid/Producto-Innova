import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    imagen?: string;
}

interface ProductoCarrito {
    id_producto: number;
    nombre: string;
    precio: number;
    imagen?: string;
    cantidad: number;
}

export default function ProductoLista() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [seleccionados, setSeleccionados] = useState<number[]>([]);

    // 🔹 Cargar productos
    useEffect(() => {
        fetch("http://localhost:3000/producto")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProductos(data);
                } else if (Array.isArray(data.data)) {
                    setProductos(data.data);
                } else if (Array.isArray(data.productos)) {
                    setProductos(data.productos);
                } else {
                    setProductos([]);
                }
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    // 🔹 Cargar selección desde localStorage
    useEffect(() => {
        const guardados = localStorage.getItem("productos_seleccionados");
        if (guardados) {
            setSeleccionados(JSON.parse(guardados));
        }
    }, []);

    // 🔹 Guardar selección en localStorage
    useEffect(() => {
        localStorage.setItem(
            "productos_seleccionados",
            JSON.stringify(seleccionados)
        );
    }, [seleccionados]);

    // 🔹 Marcar / desmarcar producto
    const toggleSeleccion = (id: number) => {
        setSeleccionados((prev) =>
            prev.includes(id)
                ? prev.filter((p) => p !== id)
                : [...prev, id]
        );
    };

    // 🔹 Añadir al carrito
    const añadirAlCarrito = () => {
        if (seleccionados.length === 0) return;

        const carritoActual: ProductoCarrito[] = JSON.parse(
            localStorage.getItem("carrito") || "[]"
        );

        const productosSeleccionados = productos.filter((p) =>
            seleccionados.includes(p.id_producto)
        );

        const carritoActualizado = [...carritoActual];

        productosSeleccionados.forEach((producto) => {
            const existente = carritoActualizado.find(
                (p) => p.id_producto === producto.id_producto
            );

            if (existente) {
                existente.cantidad += 1;
            } else {
                carritoActualizado.push({
                    id_producto: producto.id_producto,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    cantidad: 1,
                });
            }
        });

        localStorage.setItem(
            "carrito",
            JSON.stringify(carritoActualizado)
        );

        // Limpiar selección
        setSeleccionados([]);

        alert("Productos añadidos al carrito 🛒");
    };

    // 🔹 Eliminar producto
    const eliminarProducto = (id_producto: number) => {
        if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

        fetch(`http://localhost:3000/producto/${id_producto}`, {
            method: "DELETE",
        })
            .then(() => {
                setProductos((prev) =>
                    prev.filter((p) => p.id_producto !== id_producto)
                );
                setSeleccionados((prev) =>
                    prev.filter((id) => id !== id_producto)
                );
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Lista de Productos
            </h1>

            {/* 🔹 Barra superior */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700">
                    Productos seleccionados:{" "}
                    <span className="font-semibold">
                        {seleccionados.length}
                    </span>
                </p>

                {seleccionados.length > 0 && (
                    <div className="flex gap-3">
                        <button
                            onClick={añadirAlCarrito}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Añadir al carrito
                        </button>

                        <button
                            onClick={() => setSeleccionados([])}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Limpiar selección
                        </button>
                    </div>
                )}
            </div>

            {/* 🔹 Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productos.map((p) => (
                    <div
                        key={p.id_producto}
                        className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >
                        {/* 🔹 Checkbox */}
                        <div className="absolute top-3 right-3 z-10 bg-white rounded p-1 shadow">
                            <input
                                type="checkbox"
                                checked={seleccionados.includes(
                                    p.id_producto
                                )}
                                onChange={() =>
                                    toggleSeleccion(p.id_producto)
                                }
                                className="w-5 h-5 accent-blue-600 cursor-pointer"
                            />
                        </div>

                        {/* 🔹 Imagen */}
                        <div className="h-56 bg-gray-100 flex justify-center items-center">
                            {p.imagen ? (
                                <img
                                    src={p.imagen}
                                    className="w-full h-full object-cover"
                                    alt={p.nombre}
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">
                                    Sin imagen
                                </span>
                            )}
                        </div>

                        {/* 🔹 Contenido */}
                        <div className="p-4">
                            <h2 className="font-semibold text-lg text-gray-800">
                                {p.nombre}
                            </h2>

                            <p className="text-gray-600 text-sm line-clamp-2">
                                {p.descripcion || "Sin descripción"}
                            </p>

                            <p className="mt-2 text-gray-800 font-medium">
                                Precio: S/. {p.precio}
                            </p>

                            <p className="text-gray-700 text-sm">
                                Stock: {p.stock}
                            </p>

                            <div className="mt-4 flex justify-between items-center">
                                <Link
                                    to={`/shop/producto/editar/${p.id_producto}`}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Editar
                                </Link>

                                <button
                                    onClick={() =>
                                        eliminarProducto(p.id_producto)
                                    }
                                    className="text-red-600 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔹 Sin productos */}
            {productos.length === 0 && (
                <p className="mt-10 text-center text-gray-500">
                    No hay productos registrados.
                </p>
            )}
        </div>
    );
}
