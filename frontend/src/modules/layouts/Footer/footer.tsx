import { Mail, Facebook, Instagram, Twitter, Youtube, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" w-full bg-[#0A1A3A] text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4">

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* AYUDA */}
          <div>
            <h3 className="font-semibold mb-3 border-b border-white/20 pb-1">AYUDA</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Atención Al Cliente</li>
              <li>Envío Y Devoluciones</li>
              <li>Garantías Extendidas</li>
              <li>Programa De Reparaciones De Equipos</li>
              <li>Limpieza Y Cuidado</li>
              <li>Contáctanos</li>
              <li>Términos Y Condiciones</li>
              <li>Política De Privacidad</li>
              <li>Política De Cookies</li>
            </ul>
          </div>

          {/* COMPRAR PRODUCTOS */}
          <div>
            <h3 className="font-semibold mb-3 border-b border-white/20 pb-1">COMPRAR PRODUCTOS</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Comprar Todos Los Productos</li>
              <li>Sistemas Básicos</li>
              <li>Sistemas Profesionales</li>
              <li>Soluciones Cloud</li>
              <li>Equipos Para Móvil</li>
              <li>Carteras</li>
              <li>Fundas Y Pasaportes</li>
              <li>Bloqueo RFID</li>
              <li>Accesorios</li>
            </ul>
          </div>

          {/* DESCUBRIR LA GAMA */}
          <div>
            <h3 className="font-semibold mb-3 border-b border-white/20 pb-1">DESCUBRIR LA GAMA</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Colecciones</li>
              <li>Acceso Anticipado Black Friday</li>
              <li>Bestsellers</li>
              <li>Nuevos Lanzamientos</li>
              <li>El Outlet</li>
              <li>Sets Promocionales</li>
              <li>Muy Pronto</li>
            </ul>
          </div>

          {/* ACERCA DE */}
          <div>
            <h3 className="font-semibold mb-3 border-b border-white/20 pb-1">ACERCA DE</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Nuestra Historia</li>
              <li>Nuestros Materiales</li>
              <li>Empresa Responsable</li>
              <li>Embajadores</li>
              <li>Diario</li>
              <li>Colaboraciones</li>
              <li>Buscador De Tiendas</li>
              <li>Programa De Afiliados</li>
              <li>Regalos Corporativos</li>
              <li>Estudiantes</li>
              <li>Prensa</li>
              <li>Trabaja Con Nosotros</li>
            </ul>
          </div>

        </div>

        {/* CONTACTO + REDES */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Correo */}
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Mail size={18} />
            contacto@sistemasfacturacion.com
          </div>

          {/* Redes */}
          <div className="flex items-center gap-4 text-gray-300">
            <span className="text-sm">Síguenos:</span>
            <Facebook className="cursor-pointer hover:text-white" size={18} />
            <Instagram className="cursor-pointer hover:text-white" size={18} />
            <Twitter className="cursor-pointer hover:text-white" size={18} />
            <Youtube className="cursor-pointer hover:text-white" size={18} />
            <Linkedin className="cursor-pointer hover:text-white" size={18} />
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-6 text-center text-xs text-gray-400">
          © 2025 Sistemas de Facturación. Todos los derechos reservados.
        </div>

        {/* BURBUJA DE AYUDA */}
        <div className="fixed bottom-4 right-4 bg-blue-600 p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700">
          <MessageCircle size={20} className="text-white" />
        </div>

      </div>
    </footer>
  );
}
