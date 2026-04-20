import UserTable from "../../components/users/UserTable";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
    const navigate = useNavigate();

    // 🔥 Mock data (luego viene del backend)
    const users = [
        {
            id: 1,
            nombre: "Admin",
            email: "admin@test.com",
            password: "********",
            rol: "SuperAdmin",
        },
        {
            id: 2,
            nombre: "Auditor",
            email: "auditor@test.com",
            password: "********",
            rol: "Auditor",
        },
    ];

    return (
        <div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Gestión de Usuarios
                </h1>

                <button
                    onClick={() => navigate("/app/usuarios/crear")}
                    className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg font-medium
                    hover:bg-sky-600 transition"
                >
                    + Crear Usuario
                </button>
            </div>

            {/* Tabla */}
            <UserTable users={users} />

        </div>
    );
}