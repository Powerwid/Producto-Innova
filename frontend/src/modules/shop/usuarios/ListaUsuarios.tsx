<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Usuario {
    id_user: number;
    id_rol: number;
    name: string;
    lastname: string;
    email: string;
    telefono?: string;
    direccion?: string;
    estado: string;
}

export default function UsuarioLista() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    // Cargar usuarios
    useEffect(() => {
        fetch("http://localhost:3000/usuario")
            .then((res) => res.json())
            .then((data) => setUsuarios(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    // Eliminar usuario
    const eliminarUsuario = (id_user: number) => {
        if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

        fetch(`http://localhost:3000/usuario/${id_user}`, {
            method: "DELETE",
        })
            .then(() =>
                setUsuarios((prev) =>
                    prev.filter((u) => u.id_user !== id_user)
                )
            )
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Lista de Usuarios
            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Teléfono</th>
                            <th className="px-4 py-3">Dirección</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((u) => (
                            <tr
                                key={u.id_user}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 font-medium">
                                    {u.name} {u.lastname}
                                </td>

                                <td className="px-4 py-3">{u.email}</td>

                                <td className="px-4 py-3">
                                    {u.telefono || "—"}
                                </td>

                                <td className="px-4 py-3">
                                    {u.direccion || "—"}
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${u.estado === "activo"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {u.estado}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-right space-x-3">
                                    <Link
                                        to={`/admin/usuario/editar/${u.id_user}`}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() =>
                                            eliminarUsuario(u.id_user)
                                        }
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {usuarios.length === 0 && (
                <p className="mt-10 text-center text-gray-500">
                    No hay usuarios registrados.
                </p>
            )}
        </div>
    );
}
=======
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Usuario {
    id_user: number;
    id_rol: number;
    name: string;
    lastname: string;
    email: string;
    telefono?: string;
    direccion?: string;
    estado: string;
}

export default function UsuarioLista() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    // Cargar usuarios
    useEffect(() => {
        fetch("http://localhost:3000/usuario")
            .then((res) => res.json())
            .then((data) => setUsuarios(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    // Eliminar usuario
    const eliminarUsuario = (id_user: number) => {
        if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

        fetch(`http://localhost:3000/usuario/${id_user}`, {
            method: "DELETE",
        })
            .then(() =>
                setUsuarios((prev) =>
                    prev.filter((u) => u.id_user !== id_user)
                )
            )
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Lista de Usuarios
            </h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Teléfono</th>
                            <th className="px-4 py-3">Dirección</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((u) => (
                            <tr
                                key={u.id_user}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 font-medium">
                                    {u.name} {u.lastname}
                                </td>

                                <td className="px-4 py-3">{u.email}</td>

                                <td className="px-4 py-3">
                                    {u.telefono || "—"}
                                </td>

                                <td className="px-4 py-3">
                                    {u.direccion || "—"}
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${u.estado === "activo"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {u.estado}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-right space-x-3">
                                    <Link
                                        to={`/admin/usuario/editar/${u.id_user}`}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() =>
                                            eliminarUsuario(u.id_user)
                                        }
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {usuarios.length === 0 && (
                <p className="mt-10 text-center text-gray-500">
                    No hay usuarios registrados.
                </p>
            )}
        </div>
    );
}
>>>>>>> 7ae097a (feat: cambios en la base de datos, nuevo modulo de address y modificacion del modulo usuario)
