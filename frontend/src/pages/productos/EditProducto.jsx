import ProductForm from "../../components/products/ProductForm";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const producto = {
        id,
        codigo: "P001",
        nombre: "Laptop",
        descripcion: "Laptop empresarial",
        cantidad: 10,
        precio: 750.5,
    };

    const handleUpdate = (data) => {
        console.log("Actualizar producto:", id, data);
        navigate("/productos");
    };

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

            <button
                onClick={() => navigate("/productos")}
                className="mt-4 text-[#64748B]"
            >
                ← Volver
            </button>

        </div>
    );
}