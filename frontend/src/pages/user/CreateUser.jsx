import UserForm from "../../components/users/UserForm";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function CreateUser() {
    const navigate = useNavigate();

    const handleCreate = async (data) => {
        try {
            const { nombre, email, password, rolId } = data;
            await axios.post("/api/usuarios", { nombre, email, password, rolId });
            navigate("/app/usuarios");
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
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