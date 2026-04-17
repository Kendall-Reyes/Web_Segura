import { useForm } from "react-hook-form";

export default function RoleForm({ mode = "create", defaultValues, onSubmit }) {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
                <label className="block text-sm text-[#64748B] mb-1">
                    Nombre del Rol
                </label>
                <input
                    {...register("nombre")}
                    className="w-full border rounded-lg px-3 py-2"
                />
            </div>

            <div className="flex gap-3">

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg
                    hover:bg-sky-600 transition"
                >
                    {mode === "edit" ? "Actualizar" : "Crear"}
                </button>

            </div>

        </form>
    );
}