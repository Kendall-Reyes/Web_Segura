import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function ProductRow({ producto, onDelete }) {
    const navigate = useNavigate();

     const handleDelete = async () => {
        if (!window.confirm(`¿Estás seguro de eliminar ${producto.nombre}?`)) return;
        try {
            await axios.delete(`/api/productos/${producto.id}`);
            onDelete(producto.id);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    return (
        <tr className="border-b hover:bg-gray-50">

            <td className="px-4 py-3 font-mono">{producto.codigo}</td>
            <td className="px-4 py-3">{producto.nombre}</td>
            <td className="px-4 py-3 text-[#64748B]">
                {producto.descripcion}
            </td>
            <td className="px-4 py-3">{producto.cantidad}</td>
            <td className="px-4 py-3 font-medium">
                ${producto.precio}
            </td>

            <td className="px-4 py-3 flex gap-2 justify-center">

                <button
                    onClick={() => navigate(`/app/productos/editar/${producto.id}`)}
                    className="bg-[#0EA5E9] text-white px-3 py-1 rounded-md text-xs
                    hover:bg-sky-600 transition"
                >
                    Editar
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-[#DC2626] text-white px-3 py-1 rounded-md text-xs
                    hover:bg-red-700 transition"
                >
                    Eliminar
                </button>

            </td>

        </tr>
    );
}