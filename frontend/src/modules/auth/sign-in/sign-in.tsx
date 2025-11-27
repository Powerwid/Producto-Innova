export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-8 mt-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo o nombre */}
                <div className="text-lg font-semibold text-white">
                    MiTiendaasfafsa fasfasfas© {new Date().getFullYear()}
                </div>

                {/* Enlaces rápidos */}
                <nav className="flex gap-6 text-sm">
                    <a href="/" className="hover:text-white transition">Inicio</a>
                    <a href="/shop" className="hover:text-white transition">Tienda</a>
                    <a href="/contact" className="hover:text-white transition">Contacto</a>
                </nav>

                {/* Redes sociales */}
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white transition">Facebook</a>
                    <a href="#" className="hover:text-white transition">Instagram</a>
                    <a href="#" className="hover:text-white transition">WhatsApp</a>
                </div>

            </div>
        </footer>
    );
}