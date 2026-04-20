import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../ui/Input";
import axios from "../../api/axios";

export default function UserForm({ mode = "create", defaultValues, onSubmit }) {
    const [roles, setRoles] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    useEffect(() => {
        axios.get("/api/roles")
            .then(data => setRoles(data))
            .catch(err => console.error("Error al cargar roles:", err));
    }, []);

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

            {/* Select de roles desde la BD */}
            <div>
                <label className="block text-sm text-[#64748B] mb-1">Rol</label>
                <select
                    {...register("rolId", { valueAsNumber: true })}
                    className="w-full border rounded-lg px-3 py-2"
                >
                    <option value="">Seleccionar rol</option>
                    {roles.map(rol => (
                        <option key={rol.id} value={rol.id}>
                            {rol.role}
                        </option>
                    ))}
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