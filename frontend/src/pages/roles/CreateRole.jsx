import RoleForm from "../components/roles/RoleForm";
import { useNavigate } from "react-router-dom";

export default function CreateRole() {
    const navigate = useNavigate();

    const handleCreate = (data) => {
        console.log("Crear rol:", data);
        navigate("/roles");
    };

    return (
        <div className="max-w-md mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Crear Rol
            </h1>

            <RoleForm mode="create" onSubmit={handleCreate} />

            <button
                onClick={() => navigate("/roles")}
                className="mt-4 text-[#64748B]"
            >
                ← Volver
            </button>

        </div>
    );
}