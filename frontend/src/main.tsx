import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import './index.css';

import App from './App.tsx';

// Auth
import SignIn from "./modules/auth/sign-in/sign-in";

// Pages principales
import Page from "./pages/HomePage.tsx";
import NotFound from './error/page.tsx';
import CartPage from "./modules/shop/carrito/Carrito.tsx";

// Perfil
import Perfil from "@shop/perfil";
import EditarPerfil from "@shop/perfil/EditarPerfil";
import MiActividad from "@shop/perfil/MiActividad";
import Calendario from "@shop/perfil/Calendario";

//Usuarios
import ListaUsuarios from "@shop/usuarios/ListaUsuarios";
import NuevoUsuario from "@shop/usuarios/NuevoUsuario";

// Producto
import ProductoLista from "@shop/producto/ProductoLista";
import ProductoNuevo from "@shop/producto/ProductoNuevo";
import ProductoEditar from "@shop/producto/ProductoEditar";

// Paquetes
import PaqueteLista from "@shop/paquetes/PaqueteLista";
import PaqueteNuevo from "@shop/paquetes/PaqueteNuevo";

// Descuentos
import DescuentoLista from "@shop/descuentos/DescuentoLista";
import DescuentoNuevo from "@shop/descuentos/DescuentoNuevo";
import Cupones from "@shop/descuentos/Cupones";

// Reportes
import Reportes from "@shop/reportes/Reportes";

// Redes
import Redes from "@shop/redes/Redes";

// Chat
import Chat from "@shop/chat/Chat";

// Terminos
import Terminos from "@shop/terminos/Terminos";

<<<<<<< HEAD
// Definición de rutas
=======

>>>>>>> 7ae097a (feat: cambios en la base de datos, nuevo modulo de address y modificacion del modulo usuario)
// Definición de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Home
      { index: true, element: <Page /> },

      // Auth
      { path: 'sign-in', element: <SignIn /> },

      // Carrito
      { path: 'cart', element: <CartPage /> },

      // Perfil
      { path: 'perfil', element: <Perfil /> },
      { path: 'perfil/editar', element: <EditarPerfil /> },
      { path: 'perfil/actividad', element: <MiActividad /> },
      { path: 'perfil/calendario', element: <Calendario /> },

      // Producto
      { path: 'producto', element: <ProductoLista /> },
      { path: 'producto/nuevo', element: <ProductoNuevo /> },
      { path: 'producto/editar/:id', element: <ProductoEditar /> },

      // Usuarios
      { path: 'usuarios', element: <ListaUsuarios /> },
      { path: 'usuarios/nuevo', element: <NuevoUsuario /> },

      // Paquetes
      { path: 'paquetes', element: <PaqueteLista /> },
      { path: 'paquetes/nuevo', element: <PaqueteNuevo /> },

      // Descuentos
      { path: 'descuentos', element: <DescuentoLista /> },
      { path: 'descuentos/nuevo', element: <DescuentoNuevo /> },
      { path: 'cupones', element: <Cupones /> },

      // Reportes
      { path: 'reportes', element: <Reportes /> },

      // Chat
      { path: 'chat', element: <Chat /> },

      // Redes
      { path: 'redes', element: <Redes /> },

      // Términos
      { path: 'terminos', element: <Terminos /> },

      // Página 404
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);