import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Alert from "../ui/Alert";
import Input from "../ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../api/axios";

// Esquema de validación con Zod
const schema = z.object({
    email: z.string().email("Correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

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
            const res = await axios.post(
                "/api/auth/login",
                data,
                { withCredentials: true }
            );

            login(res.user);

            navigate("/app/usuarios");

        } catch (error) {
            console.error("Error login:", error);

            // Manejo más realista
            if (error.response?.status === 401) {
                setErrorMsg("Credenciales inválidas");
            } else {
                setErrorMsg("Error del servidor. Intente nuevamente.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* 🔴 ALERTA */}
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