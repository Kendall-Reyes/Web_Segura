import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

export default function RoleRow({ role, onDelete }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleDelete = async () => {
        if (!window.confirm(`¿Estás seguro de eliminar el rol ${role.role}?`)) return;

        try {
            await axios.delete(`/api/roles/${role.id}`);
            onDelete(role.id);
        } catch (error) {
            console.error("Error al eliminar rol:", error);
        }
    };

    return (
        <tr className="border-b hover:bg-gray-50">

            <td className="px-4 py-3 font-medium">
                {role.role}
            </td>

            <td className="px-4 py-3 flex gap-2 justify-center">

                {/* 🔐 SOLO SuperAdmin puede ver acciones */}
                {user?.rol === "SuperAdmin" && (
                    <>
                        <button
                            onClick={() => navigate(`/app/roles/editar/${role.id}`)}
                            className="bg-[#0EA5E9] text-white px-3 py-1 rounded-md text-xs
                            hover:bg-sky-600 transition"
                        >
                            Editar
                        </button>

                        <button
                            onClick={handleDelete}
                            className="bg-[#DC2626] text-white px-3 py-1 rounded-md text-xs
                            hover:bg-red-700 transition"
                        >
                            Eliminar
                        </button>
                    </>
                )}

            </td>

        </tr>
    );
}