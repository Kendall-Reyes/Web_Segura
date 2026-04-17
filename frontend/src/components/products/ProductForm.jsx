import { useForm } from "react-hook-form";

export default function ProductForm({ mode = "create", defaultValues, onSubmit }) {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <input {...register("codigo")} placeholder="Código"
                className="w-full border rounded-lg px-3 py-2" />

            <input {...register("nombre")} placeholder="Nombre"
                className="w-full border rounded-lg px-3 py-2" />

            <input {...register("descripcion")} placeholder="Descripción"
                className="w-full border rounded-lg px-3 py-2" />

            <input type="number" {...register("cantidad")}
                placeholder="Cantidad"
                className="w-full border rounded-lg px-3 py-2" />

            <input type="number" step="0.01" {...register("precio")}
                placeholder="Precio"
                className="w-full border rounded-lg px-3 py-2" />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0EA5E9] text-white py-2 rounded-lg
        hover:bg-sky-600 transition"
            >
                {mode === "edit" ? "Actualizar Producto" : "Crear Producto"}
            </button>

        </form>
    );
}