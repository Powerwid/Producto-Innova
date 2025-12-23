import { useState } from "react";
import { Search, User, ShoppingCart, Menu, ChevronRight } from "lucide-react";
import LoginModal from "@/modules/auth/sign-in/LoginModal";
import { useAuth } from "@/context/AuthContext";

export default function Header({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {

  const [showLogin, setShowLogin] = useState(false);
  const { user, isLogged, logout } = useAuth();

  return (
    <>
      <header className="w-full bg-white">
        <div className="mx-auto h-16 flex items-center gap-6 px-4">

          {/* Botón de Sidebar */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            {isSidebarOpen ? <Menu size={22} /> : <ChevronRight size={22} />}
          </button>

          {/* Navegación */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm">
            <a className="hover:text-blue-600 hover:cursor-pointer">Inicio</a>
            <a className="hover:text-blue-600 hover:cursor-pointer">Productos</a>
            <a className="hover:text-blue-600 hover:cursor-pointer">Promociones</a>
            <a className="hover:text-blue-600 hover:cursor-pointer">Soporte</a>
            <a className="hover:text-blue-600 hover:cursor-pointer">Contacto</a>
          </nav>

          {/* Iconos */}
          <div className="flex items-center gap-5 p-5">
            <Search size={20} className="cursor-pointer hover:text-blue-600" />

            {/* Si está logueado, mostrar saludo + logout */}
            {isLogged ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  Hola, {user?.email}
                </span>
                <button
                  onClick={logout}
                  className="text-red-600 text-sm hover:underline"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <User
                size={20}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setShowLogin(true)}
              />
            )}

            <div className="relative cursor-pointer hover:text-blue-600">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
    </>
  );
}
