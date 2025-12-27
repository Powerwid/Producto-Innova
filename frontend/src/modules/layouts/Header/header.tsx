import { useState } from "react";
import { Search, User, ShoppingCart, Menu, ChevronRight } from "lucide-react";

import LoginModal from "@/modules/auth/sign-in/LoginModal";
import RegisterModal from "@/modules/auth/sign-up/RegisterModal";
import { useAuth } from "@/context/AuthContext";

export default function Header({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, isLogged, logout } = useAuth();

  return (
    <>
      <header className="w-full bg-white relative">
        <div className="mx-auto h-16 flex items-center gap-6 px-4">

          {/* Botón Sidebar */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-200 transition-all duration-300"
          >
            {isSidebarOpen ? <Menu size={22} /> : <ChevronRight size={22} />}
          </button>

          {/* Navegación */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm">
            <a className="hover:text-blue-600 cursor-pointer">Inicio</a>
            <a className="hover:text-blue-600 cursor-pointer">Productos</a>
            <a className="hover:text-blue-600 cursor-pointer">Promociones</a>
            <a className="hover:text-blue-600 cursor-pointer">Soporte</a>
            <a className="hover:text-blue-600 cursor-pointer">Contacto</a>
          </nav>

          {/* Iconos */}
          <div className="flex items-center gap-5 relative">

            <Search size={20} className="cursor-pointer hover:text-blue-600" />

            {/* Usuario */}
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
              <div className="relative">
                <User
                  size={20}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => setShowUserMenu((prev) => !prev)}
                />

                {/* Submenú */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowRegister(true);
                      }}
                    >
                      Crear cuenta
                    </button>

                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowLogin(true);
                      }}
                    >
                      Iniciar sesión
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Carrito */}
            <div className="relative cursor-pointer hover:text-blue-600">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Modales */}
      {showLogin && (
        <LoginModal close={() => setShowLogin(false)} />
      )}

      {showRegister && (
        <RegisterModal close={() => setShowRegister(false)} />
      )}
    </>
  );
}