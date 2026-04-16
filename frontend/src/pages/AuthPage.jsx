import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex bg-neutral-50">
            {/* Lado izquierdo (branding - opcional en mobile) */}
            <div className="hidden md:flex w-1/2 bg-[#1E3A5F] text-white items-center justify-center p-10">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Secure System</h1>
                    <p className="text-lg text-blue-100">
                        Plataforma de gestión segura con control de accesos y auditoría.
                    </p>
                </div>
            </div>

            {/* Lado derecho formulario de autenticación o de registro */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                    <h2 className="text-2xl font-semibold text-[#0F172A] mb-6 text-center">
                        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                    </h2>
                    
                    {/* Validación de formulario */}
                    {isLogin ? <LoginForm /> : <RegisterForm />}

                    <div className="mt-6 text-center text-sm text-[#64748B]">
                        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-[#0EA5E9] font-medium hover:underline"
                        >
                            {/* Botón para alternar entre login y registro */}
                            {isLogin ? "Registrarse" : "Iniciar sesión"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}