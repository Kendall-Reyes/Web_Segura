import ProductRow from "./ProductRow";

export default function ProductTable({ productos }) {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full text-sm text-left">

                <thead className="bg-gray-100 text-[#64748B] uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Código</th>
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Descripción</th>
                        <th className="px-4 py-3">Cantidad</th>
                        <th className="px-4 py-3">Precio</th>
                        <th className="px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map((p) => (
                        <ProductRow key={p.id} producto={p} />
                    ))}
                </tbody>

            </table>

        </div>
    );
}