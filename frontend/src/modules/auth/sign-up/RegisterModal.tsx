import { X } from "lucide-react";

interface Props {
    close: () => void;
}

export default function RegisterModal({ close }: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 relative">

                {/* Cerrar */}
                <button
                    onClick={close}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    Crear cuenta
                </h2>

                <form className="space-y-4">

                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        type="text"
                        placeholder="Apellido"
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        type="tel"
                        placeholder="Teléfono (opcional)"
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        type="text"
                        placeholder="Dirección (opcional)"
                        className="w-full border rounded px-3 py-2"
                    />

                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
}
