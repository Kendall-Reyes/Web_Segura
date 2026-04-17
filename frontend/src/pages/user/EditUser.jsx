import UserForm from "../../components/users/UserForm";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 🔥 Mock (luego viene del backend)
    const user = {
        id,
        nombre: "Admin",
        email: "admin@test.com",
        rol: "SuperAdmin",
    };

    const handleUpdate = async (data) => {
        console.log("Actualizar usuario:", id, data);

        // 🔐 luego: axios PUT

        navigate("/usuarios");
    };

    return (
        <div className="max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Editar Usuario
            </h1>

            <UserForm
                mode="edit"
                defaultValues={user}
                onSubmit={handleUpdate}
            />

        </div>
    );
}