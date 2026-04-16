import { useForm } from "react-hook-form";
import { useState } from "react";
import Alert from "../ui/Alert";
import Input from "../ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../api/axios";

// Esquema de validación con Zod para el login
const schema = z.object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
});

// Componente de formulario de login con validación y manejo de errores
export default function LoginForm() {

    // Estado DEBE ir dentro del componente
    const [errorMsg, setErrorMsg] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setErrorMsg(null);

        try {
            await axios.post(
                "/login",
                data,
                { withCredentials: true } // 🔐 IMPORTANTE
            );

            // Aquí luego irá context + navegación

        } catch (error) {
            setErrorMsg("Credenciales inválidas");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* ✅ ALERTA */}
            {errorMsg && <Alert type="error" message={errorMsg} />}

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
                className="w-full bg-[#0EA5E9] text-white py-2 rounded-lg font-medium
                hover:bg-sky-600 transition disabled:opacity-50"
            >
                {isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
        </form>
    );
}