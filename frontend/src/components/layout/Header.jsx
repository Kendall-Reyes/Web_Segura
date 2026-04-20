import { useAuth } from "../../context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    return (
        <header className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">

            <h2 className="text-xl font-semibold text-[#0F172A]">
                Dashboard
            </h2>

            <button
            onClick={logout}
            className="text-sm text-red-500"
            >
                Cerrar sesión
            </button>

        </header>
    );
}