import { menu } from "../../utils/menuConfig";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

export default function Sidebar({ user }) {
    return (
        <aside className="w-64 h-screen bg-[#1E3A5F] text-white flex flex-col">

            <div className="p-6 border-b border-blue-900 flex items-center justify-center">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="w-24 object-contain"
                />
            </div>

            {/* Menú */}
            <nav className="flex-1 p-4 space-y-2">
                {menu
                    .filter((item) => item.roles.includes(user.rol))
                    .map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg transition ${
                                    isActive
                                        ? "bg-[#0EA5E9]"
                                        : "hover:bg-[#2D5F9E]"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
            </nav>

            {/* Usuario */}
            <div className="p-4 border-t border-blue-900 text-sm">
                {user.nombre} <br />
                <span className="text-blue-200">{user.rol}</span>
            </div>
        </aside>
    );
}