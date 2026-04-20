import RoleForm from "../../components/roles/RoleForm";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRole() {
    const { id } = useParams();
    const navigate = useNavigate();

    const role = {
        id,
        nombre: "SuperAdmin",
    };

    const handleUpdate = (data) => {
        console.log("Actualizar rol:", id, data);
        navigate("/roles");
    };

    return (
        <div className="max-w-md mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Editar Rol
            </h1>

            <RoleForm
                mode="edit"
                defaultValues={role}
                onSubmit={handleUpdate}
            />

            <button
                onClick={() => navigate("/roles")}
                className="mt-4 text-[#64748B]"
            >
                ← Volver
            </button>

        </div>
    );
}