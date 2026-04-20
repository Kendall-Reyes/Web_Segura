import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoleForm from "../../components/roles/RoleForm";
import axios from "../../api/axios";

export default function EditRole() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/roles/${id}`)
            .then(data => setRole(data))
            .catch(err => console.error("Error al cargar rol:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleUpdate = async (data) => {
        try {
            await axios.put(`/api/roles/${id}`, { role: data.nombre });
            navigate("/app/roles");
        } catch (error) {
            console.error("Error al actualizar rol:", error);
        }
    };

    if (loading) return <p className="text-gray-500">Cargando...</p>;

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

        </div>
    );
}