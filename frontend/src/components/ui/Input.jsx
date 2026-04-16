// Componente de entrada (input) reutilizable con validación y estilos
export default function Input({
    label,
    type = "text",
    register,
    name,
    error,
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-[#0F172A] mb-1">
                {label}
            </label>

            <input
                type={type}
                {...register(name)}
                className={`w-full px-3 py-2 rounded-lg border text-sm 
        focus:outline-none focus:ring-2 transition
        ${error
                        ? "border-[#DC2626] focus:ring-[#DC2626]"
                        : "border-gray-300 focus:ring-[#0EA5E9]"
                    }`}
            />

            {error && (
                <p className="text-xs text-[#DC2626] mt-1">{error.message}</p>
            )}
        </div>
    );
}