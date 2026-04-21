import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/users/UserTable";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Usuarios() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/usuarios")
            .then(data => setUsers(data))
            .catch(() => setError("Error al cargar usuarios"))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    if (loading) return <p className="text-gray-500">Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Gestión de Usuarios
                </h1>

                {/* 🔐 SOLO SuperAdmin puede crear */}
                {user?.rol === "SuperAdmin" && (
                    <button
                        onClick={() => navigate("/app/usuarios/crear")}
                        className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg font-medium
                        hover:bg-sky-600 transition"
                    >
                        + Crear Usuario
                    </button>
                )}
            </div>

            {/* Tabla */}
            <UserTable users={users} onDelete={handleDelete} />

        </div>
    );
}