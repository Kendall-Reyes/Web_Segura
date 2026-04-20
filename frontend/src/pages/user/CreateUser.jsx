import UserForm from "../../components/users/UserForm";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate();

    const handleCreate = async (data) => {
        console.log("Crear usuario:", data);

        // 🔐 luego: axios POST

        navigate("/app/usuarios");
    };

    return (
        <div className="max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Crear Usuario
            </h1>

            <UserForm mode="create" onSubmit={handleCreate} />

        </div>
    );
}