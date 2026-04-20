import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../../components/users/UserForm";
import axios from "../../api/axios";

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get(`/api/usuarios/${id}`)
        .then(data => setUser(data))
        .catch(err => console.error("Error al cargar usuario:", err))
        .finally(() => setLoading(false));
    }, [id]);

    const handleUpdate = async (data) => {
        try {
            // Extraer solo los campos que el backend acepta
            const { nombre, email, password, rolId } = data;
            const payload = { nombre, email, rolId };
            
            // Solo incluir password si se llenó
            if (password) payload.password = password;

            await axios.put(`/api/usuarios/${id}`, payload);
            navigate("/app/usuarios");
        } catch (error) {
            console.error("Error al actualizar usuarios", error);
        }
    };

    if (loading) return <p className="text-gray-500">Cargando...</p>

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