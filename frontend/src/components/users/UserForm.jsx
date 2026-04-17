import { useForm } from "react-hook-form";
import Input from "../ui/Input";

export default function UserForm({ mode = "create", defaultValues, onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Input
                label="Nombre"
                name="nombre"
                register={register}
                error={errors.nombre}
            />

            <Input
                label="Correo"
                name="email"
                register={register}
                error={errors.email}
            />

            <Input
                label="Contraseña"
                type="password"
                name="password"
                register={register}
                error={errors.password}
            />

            {/* Select de roles */}
            <div>
                <label className="block text-sm text-[#64748B] mb-1">Rol</label>
                <select
                    {...register("rol")}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Auditor">Auditor</option>
                    <option value="Registrador">Registrador</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0EA5E9] text-white py-2 rounded-lg font-medium
                hover:bg-sky-600 transition disabled:opacity-50"
            >
                {isSubmitting
                    ? "Guardando..."
                    : mode === "edit"
                        ? "Actualizar Usuario"
                        : "Crear Usuario"}
            </button>

        </form>
    );
}