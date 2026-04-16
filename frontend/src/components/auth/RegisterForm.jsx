import { useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "../ui/Alert";
import Input from "../ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../api/axios";

// Esquema de validación con Zod para el formulario de registro
const schema = z.object({
    nombre: z.string().min(3, "Nombre requerido"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
});

// Componente de formulario de registro
export default function RegisterForm() {

    // ✅ Estados para alertas
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setErrorMsg(null);
        setSuccessMsg(null);

        try {
            await axios.post("/usuarios", data, {
                withCredentials: true,
            });

            setSuccessMsg("Usuario creado correctamente");

        } catch (error) {
            setErrorMsg("Error al registrar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* ✅ ALERTAS */}
            {errorMsg && <Alert type="error" message={errorMsg} />}
            {successMsg && <Alert type="success" message={successMsg} />}

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

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#059669] text-white py-2 rounded-lg font-medium
                hover:bg-green-700 transition disabled:opacity-50"
            >
                {isSubmitting ? "Creando..." : "Registrar"}
            </button>
        </form>
    );
}