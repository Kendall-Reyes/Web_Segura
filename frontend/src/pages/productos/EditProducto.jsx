import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../../components/products/ProductForm";
import axios from "../../api/axios";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/productos/${id}`)
            .then(data => setProducto(data))
            .catch(err => console.error("Error al cargar producto:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleUpdate = async (data) => {
        try {
            const { codigo, nombre, descripcion, cantidad, precio } = data;
            await axios.put(`/api/productos/${id}`, { codigo, nombre, descripcion, cantidad, precio });
            navigate("/app/productos");
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    if (loading) return <p className="text-gray-500">Cargando...</p>;

    return (
        <div className="max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Editar Producto
            </h1>

            <ProductForm
                mode="edit"
                defaultValues={producto}
                onSubmit={handleUpdate}
            />

        </div>
    );
}