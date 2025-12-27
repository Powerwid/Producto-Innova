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

type PasoCheckout = "envio" | "pago";

export default function Carrito() {
    const { isLogged } = useAuth();

    // Carrito
    const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
        const data = localStorage.getItem("carrito");
        return data ? JSON.parse(data) : [];
    });

    // Modal / pasos
    const [showModal, setShowModal] = useState(false);
    const [paso, setPaso] = useState<PasoCheckout>("envio");

    // Envío
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");

    // Pago (demo)
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [mes, setMes] = useState("");
    const [anio, setAnio] = useState("");
    const [cvv, setCvv] = useState("");

    // Sync carrito
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

    // Eliminar
    const eliminarProducto = (id: number) => {
        if (!confirm("¿Eliminar este producto del carrito?")) return;
        setCarrito(prev => prev.filter(p => p.id_producto !== id));
    };

    const vaciarCarrito = () => {
        if (!confirm("¿Vaciar carrito completo?")) return;
        setCarrito([]);
    };

    // Total
    const total = carrito.reduce(
        (acc, p) => acc + p.precio * p.cantidad,
        0
    );

    // Continuar
    const continuarCompra = () => {
        if (!isLogged) {
            alert("Debes iniciar sesión para continuar");
            return;
        }
        setShowModal(true);
        setPaso("envio");
    };

    // Confirmar envío
    const confirmarEnvio = () => {
        if (
            !email ||
            !nombre ||
            !telefono ||
            !direccion ||
            !ciudad ||
            !codigoPostal
        ) {
            alert("Completa todos los datos de envío");
            return;
        }
        setPaso("pago");
    };

    // Confirmar pago (demo)
    const confirmarPago = () => {
        if (!numeroTarjeta || !mes || !anio || !cvv) {
            alert("Completa los datos de pago");
            return;
        }

        console.log("PEDIDO FINAL:", {
            envio: {
                email,
                nombre,
                telefono,
                direccion,
                ciudad,
                codigoPostal,
            },
            pago: {
                numeroTarjeta,
                mes,
                anio,
                cvv,
            },
            carrito,
            total,
        });

        alert("Pago realizado correctamente");

        setShowModal(false);
        setPaso("envio");
        setCarrito([]);
        localStorage.removeItem("carrito");
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
                                <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                                    {p.imagen ? (
                                        <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400">Sin imagen</span>
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
                                        className="px-3 py-1 bg-gray-200 rounded"
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
                        <button onClick={vaciarCarrito} className="text-red-600">
                            Vaciar carrito
                        </button>

                        <div className="text-right">
                            <p className="text-xl font-semibold">
                                Total: S/. {total.toFixed(2)}
                            </p>
                            <button
                                onClick={continuarCompra}
                                className="mt-3 px-6 py-2 bg-black text-white rounded"
                            >
                                Continuar compra
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* MODAL CHECKOUT */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-6 rounded-xl w-full max-w-5xl">
                        {paso === "envio" && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">
                                    Información de Envío
                                </h2>

                                <div className="space-y-3">
                                    <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                    <input className="w-full border p-2 rounded" placeholder="Nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} />
                                    <input className="w-full border p-2 rounded" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
                                    <input className="w-full border p-2 rounded" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
                                    <div className="flex gap-3">
                                        <input className="w-full border p-2 rounded" placeholder="Ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)} />
                                        <input className="w-full border p-2 rounded" placeholder="Código postal" value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} />
                                    </div>
                                </div>

                                <button
                                    onClick={confirmarEnvio}
                                    className="w-full mt-5 bg-black text-white py-2 rounded"
                                >
                                    Continuar al Pago
                                </button>
                            </>
                        )}

                        {paso === "pago" && (
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Información de Pago
                                    </h2>

                                    <input className="w-full border p-2 mb-3 rounded" placeholder="Número de tarjeta" value={numeroTarjeta} onChange={e => setNumeroTarjeta(e.target.value)} />

                                    <div className="flex gap-3 mb-3">
                                        <input className="w-full border p-2 rounded" placeholder="MM" value={mes} onChange={e => setMes(e.target.value)} />
                                        <input className="w-full border p-2 rounded" placeholder="YY" value={anio} onChange={e => setAnio(e.target.value)} />
                                    </div>

                                    <input className="w-full border p-2 rounded" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} />

                                    <button
                                        onClick={confirmarPago}
                                        className="w-full mt-4 bg-black text-white py-2 rounded"
                                    >
                                        Pagar S/. {total.toFixed(2)}
                                    </button>

                                    <button
                                        onClick={() => setPaso("envio")}
                                        className="mt-3 text-sm text-gray-500"
                                    >
                                        ← Volver a envío
                                    </button>
                                </div>

                                <div className="bg-gray-50 p-4 rounded">
                                    <h3 className="font-semibold mb-3">
                                        Resumen del Pedido
                                    </h3>

                                    {carrito.map(p => (
                                        <div key={p.id_producto} className="flex justify-between text-sm mb-2">
                                            <span>{p.nombre} x{p.cantidad}</span>
                                            <span>S/. {(p.precio * p.cantidad).toFixed(2)}</span>
                                        </div>
                                    ))}

                                    <hr className="my-3" />

                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span className="text-green-600">
                                            S/. {total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setShowModal(false);
                                setPaso("envio");
                            }}
                            className="mt-4 text-sm w-full text-gray-500"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
