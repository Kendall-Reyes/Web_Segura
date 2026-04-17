export default function NoAutorizado() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow text-center">
                <h1 className="text-2xl font-bold text-[#DC2626] mb-2">
                    Acceso denegado
                </h1>
                <p className="text-[#64748B]">
                    No tienes permisos para acceder a esta sección.
                </p>
            </div>
        </div>
    );
}