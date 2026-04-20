import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/products/ProductForm";
import axios from "../../api/axios";

export default function CreateProduct() {
    const navigate = useNavigate();

    const handleCreate = async (data) => {
        try {
            await axios.post("/api/productos", data);
            navigate("/app/productos");
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Crear Producto
            </h1>

            <ProductForm mode="create" onSubmit={handleCreate} />

            <button
                onClick={() => navigate("/productos")}
                className="mt-4 text-[#64748B]"
            >
                ← Volver
            </button>

        </div>
    );
}