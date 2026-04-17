import ProductForm from "../../components/products/ProductForm";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const navigate = useNavigate();

    const handleCreate = (data) => {
        console.log("Crear producto:", data);
        navigate("/productos");
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