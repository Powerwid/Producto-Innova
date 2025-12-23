import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // <--- IMPORTANTE

interface LoginModalProps {
    close: () => void;
}

export default function LoginModal({ close }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth(); // <--- IMPORTANTE

    const handleLogin = async () => {
        setError("");

        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();
            console.log("TOKEN:", data.access_token);

            if (!res.ok) {
                setError("Correo o contraseña incorrectos");
                return;
            }

            // GUARDAR TOKEN EN CONTEXTO Y LOCALSTORAGE
            login(data.access_token);  // <---- AQUÍ SE GUARDA SESIÓN

            close(); // cerrar modal
        } catch {
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 rounded-xl w-80 shadow-lg">

                <h2 className="text-xl font-semibold mb-4">Iniciar sesión</h2>

                {error && (
                    <p className="text-red-600 text-sm mb-2">{error}</p>
                )}

                <input
                    className="w-full border p-2 mb-3 rounded"
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full border p-2 mb-4 rounded"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Entrar
                </button>

                <button
                    className="mt-3 text-gray-500 text-sm w-full hover:text-black transition"
                    onClick={close}
                >
                    Cancelar
                </button>

            </div>
        </div>
    );
}
