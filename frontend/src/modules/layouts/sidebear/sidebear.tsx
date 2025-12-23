import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@images/logopestana.png"
import {
    Home,
    Users,
    Calendar,
    BarChart,
    ShoppingCart,
    MessageCircle,
    User,
    ReceiptText,
    Package,
    Percent,
    UserRoundPlus,
    ShoppingBag,
    LogOut,
    ChevronRight,
    ChevronDown,
    UserCog,
    UserSearch,
    PackageSearch,
    PackagePlus,
    Tag,
    Tickets,
    Tags,
    Archive,
    Cuboid,
    SquarePlus,
    Share2,
} from "lucide-react";

export default function Sidebear({ isOpen }: { isOpen: boolean }) {
    const [open, setOpen] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const expanded = isOpen || isHovered;
    useEffect(() => {
        if (!expanded) setOpen(null);
    }, [expanded]);

    const toggle = (item: string) => {
        if (!expanded) return;
        setOpen(open === item ? null : item);
    };

    return (
        <aside
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                bg-white 
                text-gray-700
                border-r 
                border-white
                p-4 flex flex-col h-screen sticky top-0
                transition-all duration-300 ease-in-out
                ${expanded ? "w-64" : "w-20"}
                overflow-hidden
            `}
        >
            <div className="flex items-center gap-2 text-3xl font-bold mb-5 text-blue-600">
                <img
                    src={logo}
                    alt="Logo de Innova"
                    className="w-[42px] h-[42px] object-contain"
                />
                <span className={`${expanded ? "inline" : "hidden"} whitespace-nowrap`}>
                    Innova
                </span>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">

                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                    <Home size={18} />
                    <span className={`${expanded ? "inline" : "hidden"} whitespace-nowrap`}>Inicio</span>
                </Link>

                <Link
                    to="/cart"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                    <ShoppingCart size={18} />
                    <span className={`${expanded ? "inline" : "hidden"} whitespace-nowrap`}>
                        Carrito de Compras
                    </span>
                </Link>

                <div>
                    <button
                        onClick={() => toggle("perfil")}
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <span className="flex items-center gap-3">
                            <User size={18} />
                            <span className={`${expanded ? "inline" : "hidden"} whitespace-nowrap`}>
                                Perfil
                            </span>
                        </span>

                        {open === "perfil" ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>

                    {/* SUBMENÚ */}
                    <div
                        className={`
                    ml-10 mt-1 space-y-3 overflow-hidden transition-all duration-500
                    ${open === "perfil" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                    `}
                    >

                        <Link
                            to="/perfil/editar"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <UserCog size={18} />
                            <span>Editar Perfil</span>
                        </Link>

                        <Link
                            to="/perfil/actividad"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <ShoppingBag size={18} />
                            <span>Mi Actividad</span>
                        </Link>

                        <Link
                            to="/perfil/calendario"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <Calendar size={18} />
                            <span>Calendario</span>
                        </Link>

                    </div>
                </div>


                <div>
                    <button
                        onClick={() => toggle("usuario")}
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <span className="flex items-center gap-3">
                            <Users size={18} />
                            Usuarios
                        </span>

                        {open === "usuario" ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>

                    <div
                        className={`
                            ml-10 mt-1 space-y-3 overflow-hidden transition-all duration-500
                            ${open === "usuario" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                        `}
                    >
                        {/* Lista de Usuarios */}
                        <Link
                            to="/usuarios"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <UserSearch size={18} />
                            <span>Lista de Usuarios</span>
                        </Link>

                        {/* Nuevo Usuario */}
                        <Link
                            to="/usuarios/nuevo"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <UserRoundPlus size={18} />
                            <span>Nuevo Usuario</span>
                        </Link>
                    </div>
                </div>

                <div>
                    <button
                        onClick={() => toggle("producto")}
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <span className="flex items-center gap-3">
                            <Archive size={18} />
                            Producto
                        </span>

                        {open === "producto" ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>

                    <div
                        className={`
                            ml-10 mt-1 space-y-3 overflow-hidden transition-all duration-500 
                            ${open === "producto" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                        `}
                    >
                        <Link
                            to="/producto"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <Cuboid size={18} />
                            <span>Lista de Productos</span>
                        </Link>

                        <Link
                            to="/producto/nuevo"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <SquarePlus size={18} />
                            <span>Nuevo Producto</span>
                        </Link>
                    </div>
                </div>


                <div>
                    <button
                        onClick={() => toggle("paquetes")}
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <span className="flex items-center gap-3">
                            <Package size={18} />
                            Paquetes
                        </span>

                        {open === "paquetes" ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>

                    <div
                        className={`
                            ml-10 mt-1 space-y-3 overflow-hidden transition-all duration-500
                            ${open === "paquetes" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                        `}
                    >
                        <Link
                            to="/paquetes"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <PackageSearch size={18} />
                            <span>Lista de Paquetes</span>
                        </Link>

                        <Link
                            to="/paquetes/nuevo"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <PackagePlus size={18} />
                            <span>Nuevo Paquete</span>
                        </Link>
                    </div>
                </div>


                <div>
                    <button
                        onClick={() => toggle("descuentos")}
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <span className="flex items-center gap-3">
                            <Percent size={18} />
                            Descuentos
                        </span>

                        {open === "descuentos" ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>

                    <div
                        className={`
                            ml-10 mt-1 space-y-3 overflow-hidden transition-all duration-500
                            ${open === "descuentos" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                        `}
                    >
                        {/* Tipos de Descuentos */}
                        <Link
                            to="/descuentos"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <Tag size={18} />
                            <span>Tipos de Descuentos</span>
                        </Link>

                        {/* Crear Descuento */}
                        <Link
                            to="/descuentos/nuevo"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <Tags size={18} />
                            <span>Crear Descuento</span>
                        </Link>

                        {/* Cupones (si quieres una vista aparte) */}
                        <Link
                            to="/cupones"
                            className="cursor-pointer hover:text-gray-900 flex gap-2 items-center"
                        >
                            <Tickets size={18} />
                            <span>Cupones</span>
                        </Link>
                    </div>
                </div>

                <Link
                    to="/reportes"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                    <BarChart size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>
                        Reportes
                    </span>
                </Link>

                <Link
                    to="/chat"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                    <MessageCircle size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>Chat</span>
                </Link>

                <Link
                    to="/redes"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                    <Share2 size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>Redes Sociales</span>
                </Link>

                <Link
                    to="/terminos"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                    <ReceiptText size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>Términos y Condiciones</span>
                </Link>

            </nav>

            <div className="mt-auto flex items-center gap-3 text-gray-600 cursor-pointer hover:text-gray-900 transition">
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
            </div>
        </aside>
    );
}