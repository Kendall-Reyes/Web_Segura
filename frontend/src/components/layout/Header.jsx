export default function Header({ user, onRoleChange }) {
    return (
        <header className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">

            <h2 className="text-xl font-semibold text-[#0F172A]">
                Dashboard
            </h2>

            {/* Selector de rol (modo prueba) */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-[#64748B]">
                    {user.nombre}
                </span>

                <select
                    value={user.rol}
                    onChange={(e) => onRoleChange(e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Auditor">Auditor</option>
                    <option value="Registrador">Registrador</option>
                </select>
            </div>

        </header>
    );
}