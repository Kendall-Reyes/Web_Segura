import RoleTable from "../../components/roles/RoleTable";
import { useNavigate } from "react-router-dom";

export default function Roles() {
    const navigate = useNavigate();

    // 🔥 Mock data
    const roles = [
        { id: 1, nombre: "SuperAdmin" },
        { id: 2, nombre: "Auditor" },
        { id: 3, nombre: "Registrador" },
    ];

    return (
        <div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Gestión de Roles
                </h1>

                <button
                    onClick={() => navigate("/app/roles/crear")}
                    className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg font-medium
                    hover:bg-sky-600 transition"
                >
                    + Crear Rol
                </button>
            </div>

            <RoleTable roles={roles} />

        </div>
    );
}