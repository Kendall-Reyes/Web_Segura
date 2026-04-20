import { useEffect, useState } from "react";
import RoleTable from "../../components/roles/RoleTable";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function Roles() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/roles")
            .then(data => setRoles(data))
            .catch(() => setError("Error al cargar roles"))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        setRoles(prev => prev.filter(r => r.id !== id));
    };

    if (loading) return <p className="text-gray-500">Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

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

            <RoleTable roles={roles} onDelete={handleDelete} />

        </div>
    );
}