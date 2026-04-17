import { menu } from "../../utils/menuConfig";

export default function Navbar({ user, onRoleChange }) {
    return (
        <nav className="w-full bg-[#1E3A5F] text-white px-6 py-4 flex justify-between items-center">

            {/* Logo */}
            <h1 className="text-lg font-semibold">Secure System</h1>

            {/* Links dinámicos, los extraemos del menú (utils/menuConfig.js)*/}
            <div className="flex gap-6">
                {menu
                    .filter((item) => item.roles.includes(user.rol))
                    .map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            className="hover:text-[#0EA5E9] transition"
                        >
                            {item.label}
                        </a>
                    ))}
            </div>

            {/* Selector de rol (solo para pruebas) */}
            <select
                value={user.rol}
                onChange={(e) => onRoleChange(e.target.value)}
                className="text-black px-2 py-1 rounded"
            >
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="Auditor">Auditor</option>
                <option value="Registrador">Registrador</option>
            </select>

        </nav>
    );
}