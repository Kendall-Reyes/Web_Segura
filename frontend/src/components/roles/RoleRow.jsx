import { useNavigate } from "react-router-dom";

export default function RoleRow({ role }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        console.log("Eliminar rol:", role.id);
    };

    return (
        <tr className="border-b hover:bg-gray-50">

            <td className="px-4 py-3 font-medium">
                {role.nombre}
            </td>

            <td className="px-4 py-3 flex gap-2 justify-center">

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

            </td>

        </tr>
    );
}