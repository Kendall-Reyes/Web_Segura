import ProductTable from "../../components/products/ProductTable";
import { useNavigate } from "react-router-dom";

export default function Productos() {
    const navigate = useNavigate();

    // 🔥 Mock data
    const productos = [
        {
            id: 1,
            codigo: "P001",
            nombre: "Laptop",
            descripcion: "Laptop empresarial",
            cantidad: 10,
            precio: 750.5,
        },
        {
            id: 2,
            codigo: "P002",
            nombre: "Mouse",
            descripcion: "Mouse inalámbrico",
            cantidad: 50,
            precio: 15.99,
        },
    ];

    return (
        <div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Gestión de Productos
                </h1>

                <button
                    onClick={() => navigate("/productos/crear")}
                    className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg
                    hover:bg-sky-600 transition"
                >
                    + Crear Producto
                </button>
            </div>

            <ProductTable productos={productos} />

        </div>
    );
}