import { useNavigate } from "react-router-dom";
import RoleForm from "../../components/roles/RoleForm";
import axios from "../../api/axios";

export default function CreateRole() {
    const navigate = useNavigate();

    const handleCreate = async (data) => {
        try {
            await axios.post("/api/roles", { role: data.nombre });
            navigate("/app/roles");
        } catch (error) {
            console.error("Error al crear rol:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Crear Rol
            </h1>

            <RoleForm mode="create" onSubmit={handleCreate} />

            <button
                onClick={() => navigate("/app/roles")}
                className="mt-4 text-[#64748B]"
            >
                ← Volver
            </button>

        </div>
    );
}