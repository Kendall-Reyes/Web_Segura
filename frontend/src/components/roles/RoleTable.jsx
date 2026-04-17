import RoleRow from "./RoleRow";

export default function RoleTable({ roles }) {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full text-sm text-left">

                <thead className="bg-gray-100 text-[#64748B] uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Rol</th>
                        <th className="px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {roles.map((role) => (
                        <RoleRow key={role.id} role={role} />
                    ))}
                </tbody>

            </table>

        </div>
    );
}