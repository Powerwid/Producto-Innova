import { useState, useEffect } from "react";
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

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                    <Home size={18} />
                    <span className={`${expanded ? "inline" : "hidden"} whitespace-nowrap`}>Inicio</span>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                    <ShoppingCart size={18} />
                    <span className={`${expanded ? "inline" : "hidden"} whitespace-nowrap`}>
                        Carrito de Compras
                    </span>
                </div>
                <div>
                    <button
                        onClick={() => toggle("perfil")}
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <span className="flex items-center gap-3">
                            <User size={18} />
                            Perfil
                        </span>

                        {open === "perfil" ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>

                    <div
                        className={`
                    ml-10 mt-1 space-y-3 overflow-hidden transition-all duration-500
                    ${open === "perfil" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                `}
                    >
                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <UserCog size={18} />
                            <span>Editar Perfil</span>
                        </div>

                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <ShoppingBag size={18} />
                            <span>Mi Actividad</span>
                        </div>

                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <Calendar size={18} />
                            <span>Calendario</span>
                        </div>
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
                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <UserSearch size={18} />
                            <span>Lista de Usuarios</span>
                        </div>

                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <UserRoundPlus size={18} />
                            <span>Nuevo Usuario</span>
                        </div>
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
                        className={`ml-10 mt-1 space-y-3 overflow-hidden transition-all duration-500 
                    ${open === "producto" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                `}
                    >
                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <Cuboid size={18} />
                            <span>Lista de Productos</span>
                        </div>

                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <SquarePlus size={18} />
                            <span>Nuevo Producto</span>
                        </div>
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
                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <PackageSearch size={18} />
                            <span>Lista de Paquetes</span>
                        </div>

                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <PackagePlus size={18} />
                            <span>Nuevo Paquete</span>
                        </div>
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
                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <Tag size={18} />
                            <span>Tipos de Descuentos</span>
                        </div>

                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <Tags size={18} />
                            <span>Crear Descuento</span>
                        </div>

                        <div className="cursor-pointer hover:text-gray-900 flex gap-2 items-center">
                            <Tickets size={18} />
                            <span>Cupones</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                    <BarChart size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>Reportes</span>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                    <MessageCircle size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>Chat</span>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                    <Share2 size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>Redes Sociales</span>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                    <ReceiptText size={18} />
                    <span className={`${isOpen || isHovered ? "inline" : "hidden"}`}>Términos y Condiciones</span>
                </div>

            </nav>

            <div className="mt-auto flex items-center gap-3 text-gray-600 cursor-pointer hover:text-gray-900 transition">
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
            </div>
        </aside>
    );
}