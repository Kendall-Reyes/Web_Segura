import { useNavigate } from "react-router-dom";

export default function UserRow({ user }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        // 🔐 luego: confirmación + llamada API
        console.log("Eliminar usuario:", user.id);
    };

    return (
        <tr className="border-b hover:bg-gray-50">

            <td className="px-4 py-3">{user.nombre}</td>
            <td className="px-4 py-3">{user.email}</td>
            <td className="px-4 py-3">{user.password}</td>
            <td className="px-4 py-3">{user.rol}</td>

            <td className="px-4 py-3 flex gap-2 justify-center">

                {/* Editar */}
                <button
                    onClick={() => navigate(`/usuarios/editar/${user.id}`)}
                    className="bg-[#0EA5E9] text-white px-3 py-1 rounded-md text-xs
                    hover:bg-sky-600 transition"
                >
                    Editar
                </button>

                {/* Eliminar */}
                <button
                    onClick={handleDelete}
                    className="bg-[#DC2626] text-white px-3 py-1 rounded-md text-xs
                    hover:bg-red-700 transition"
                >
                    Eliminar
                </button>

            </td>
        </tr>
    );
}