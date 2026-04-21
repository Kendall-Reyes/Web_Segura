import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/products/ProductTable";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Productos() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/productos")
            .then(data => setProductos(data))
            .catch(() => setError("Error al cargar productos"))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        setProductos(prev => prev.filter(p => p.id !== id));
    };

    if (loading) return <p className="text-gray-500">Cargando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    return (
        <div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Gestión de Productos
                </h1>
                {/* 🔐 SOLO Registrador puede crear */}
                {user?.rol === "Registrador" && (
                    <button
                        onClick={() => navigate("/app/productos/crear")}
                        className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg
                        hover:bg-sky-600 transition"
                    >
                        + Crear Producto
                    </button>
                )}

            </div>

            <ProductTable productos={productos} onDelete={handleDelete} />

        </div>
    );
}