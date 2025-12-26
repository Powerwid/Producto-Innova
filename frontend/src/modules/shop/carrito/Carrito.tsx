<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProductoCarrito {
    id_producto: number;
    nombre: string;
    precio: number;
    imagen?: string;
    cantidad: number;
}

export default function Carrito() {
    const { isLogged } = useAuth();

    // 🛒 Carrito
    const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
        const data = localStorage.getItem("carrito");
        return data ? JSON.parse(data) : [];
    });

    // 📍 Modal dirección
    const [showDireccion, setShowDireccion] = useState(false);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");

    // 💾 Sync carrito
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // ➕➖ Cantidad
    const aumentarCantidad = (id: number) => {
        setCarrito(prev =>
            prev.map(p =>
                p.id_producto === id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        );
    };

    const disminuirCantidad = (id: number) => {
        setCarrito(prev =>
            prev.map(p =>
                p.id_producto === id
                    ? { ...p, cantidad: Math.max(1, p.cantidad - 1) }
                    : p
            )
        );
    };

    // ❌ Eliminar
    const eliminarProducto = (id: number) => {
        if (!confirm("¿Eliminar este producto del carrito?")) return;
        setCarrito(prev => prev.filter(p => p.id_producto !== id));
    };

    const vaciarCarrito = () => {
        if (!confirm("¿Vaciar carrito completo?")) return;
        setCarrito([]);
    };

    // 💰 Total
    const total = carrito.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    );

    // 🧠 CONTINUAR COMPRA
    const continuarCompra = () => {
        if (!isLogged) {
            alert("Debes iniciar sesión para continuar con la compra");
            return;
        }

        setShowDireccion(true);
    };

    // 📦 Confirmar datos
    const confirmarDireccion = () => {
        if (!nombre || !direccion) {
            alert("Completa nombre y dirección");
            return;
        }

        console.log("Pedido listo:", {
            nombre,
            direccion,
            carrito,
            total,
        });

        setShowDireccion(false);
        alert("Datos guardados correctamente ✅");
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🛒 Carrito</h1>

            {carrito.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p className="mb-4">Tu carrito está vacío</p>
                    <Link to="/producto" className="text-blue-600 hover:underline">
                        Volver a productos
                    </Link>
                </div>
            ) : (
                <>
                    {/* LISTA */}
                    <div className="space-y-4">
                        {carrito.map(p => (
                            <div
                                key={p.id_producto}
                                className="flex gap-4 bg-white shadow rounded-lg p-4 items-center"
                            >
                                <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                    {p.imagen ? (
                                        <img
                                            src={p.imagen}
                                            alt={p.nombre}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">
                                            Sin imagen
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h2 className="font-semibold">{p.nombre}</h2>
                                    <p className="text-gray-600">S/. {p.precio}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        disabled={p.cantidad === 1}
                                        onClick={() => disminuirCantidad(p.id_producto)}
                                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        −
                                    </button>
                                    <span>{p.cantidad}</span>
                                    <button
                                        onClick={() => aumentarCantidad(p.id_producto)}
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="w-28 text-right">
                                    S/. {(p.precio * p.cantidad).toFixed(2)}
                                </div>

                                <button
                                    onClick={() => eliminarProducto(p.id_producto)}
                                    className="text-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RESUMEN */}
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow flex justify-between items-center">
                        <button
                            onClick={vaciarCarrito}
                            className="text-red-600"
                        >
                            Vaciar carrito
                        </button>

                        <div className="text-right">
                            <p className="text-xl font-semibold">
                                Total: S/. {total.toFixed(2)}
                            </p>
                            <button
                                onClick={continuarCompra}
                                className="mt-3 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Continuar compra
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* 📍 MODAL DIRECCIÓN */}
            {showDireccion && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            Datos de entrega
                        </h2>

                        <input
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Nombre completo"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />

                        <input
                            className="w-full border p-2 mb-4 rounded"
                            placeholder="Dirección"
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                        />

                        <button
                            onClick={confirmarDireccion}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        >
                            Confirmar
                        </button>

                        <button
                            onClick={() => setShowDireccion(false)}
                            className="mt-3 text-sm w-full text-gray-500"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
=======
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProductoCarrito {
    id_producto: number;
    nombre: string;
    precio: number;
    imagen?: string;
    cantidad: number;
}

export default function Carrito() {
    const { isLogged } = useAuth();

    // 🛒 Carrito
    const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
        const data = localStorage.getItem("carrito");
        return data ? JSON.parse(data) : [];
    });

    // 📍 Modal dirección
    const [showDireccion, setShowDireccion] = useState(false);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");

    // 💾 Sync carrito
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // ➕➖ Cantidad
    const aumentarCantidad = (id: number) => {
        setCarrito(prev =>
            prev.map(p =>
                p.id_producto === id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        );
    };

    const disminuirCantidad = (id: number) => {
        setCarrito(prev =>
            prev.map(p =>
                p.id_producto === id
                    ? { ...p, cantidad: Math.max(1, p.cantidad - 1) }
                    : p
            )
        );
    };

    // ❌ Eliminar
    const eliminarProducto = (id: number) => {
        if (!confirm("¿Eliminar este producto del carrito?")) return;
        setCarrito(prev => prev.filter(p => p.id_producto !== id));
    };

    const vaciarCarrito = () => {
        if (!confirm("¿Vaciar carrito completo?")) return;
        setCarrito([]);
    };

    // 💰 Total
    const total = carrito.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    );

    // 🧠 CONTINUAR COMPRA
    const continuarCompra = () => {
        if (!isLogged) {
            alert("Debes iniciar sesión para continuar con la compra");
            return;
        }

        setShowDireccion(true);
    };

    // 📦 Confirmar datos
    const confirmarDireccion = () => {
        if (!nombre || !direccion) {
            alert("Completa nombre y dirección");
            return;
        }

        console.log("Pedido listo:", {
            nombre,
            direccion,
            carrito,
            total,
        });

        setShowDireccion(false);
        alert("Datos guardados correctamente ✅");
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🛒 Carrito</h1>

            {carrito.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p className="mb-4">Tu carrito está vacío</p>
                    <Link to="/producto" className="text-blue-600 hover:underline">
                        Volver a productos
                    </Link>
                </div>
            ) : (
                <>
                    {/* LISTA */}
                    <div className="space-y-4">
                        {carrito.map(p => (
                            <div
                                key={p.id_producto}
                                className="flex gap-4 bg-white shadow rounded-lg p-4 items-center"
                            >
                                <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                    {p.imagen ? (
                                        <img
                                            src={p.imagen}
                                            alt={p.nombre}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">
                                            Sin imagen
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h2 className="font-semibold">{p.nombre}</h2>
                                    <p className="text-gray-600">S/. {p.precio}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        disabled={p.cantidad === 1}
                                        onClick={() => disminuirCantidad(p.id_producto)}
                                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    >
                                        −
                                    </button>
                                    <span>{p.cantidad}</span>
                                    <button
                                        onClick={() => aumentarCantidad(p.id_producto)}
                                        className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="w-28 text-right">
                                    S/. {(p.precio * p.cantidad).toFixed(2)}
                                </div>

                                <button
                                    onClick={() => eliminarProducto(p.id_producto)}
                                    className="text-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RESUMEN */}
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow flex justify-between items-center">
                        <button
                            onClick={vaciarCarrito}
                            className="text-red-600"
                        >
                            Vaciar carrito
                        </button>

                        <div className="text-right">
                            <p className="text-xl font-semibold">
                                Total: S/. {total.toFixed(2)}
                            </p>
                            <button
                                onClick={continuarCompra}
                                className="mt-3 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Continuar compra
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* 📍 MODAL DIRECCIÓN */}
            {showDireccion && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            Datos de entrega
                        </h2>

                        <input
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Nombre completo"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />

                        <input
                            className="w-full border p-2 mb-4 rounded"
                            placeholder="Dirección"
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                        />

                        <button
                            onClick={confirmarDireccion}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        >
                            Confirmar
                        </button>

                        <button
                            onClick={() => setShowDireccion(false)}
                            className="mt-3 text-sm w-full text-gray-500"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
>>>>>>> 7ae097a (feat: cambios en la base de datos, nuevo modulo de address y modificacion del modulo usuario)
