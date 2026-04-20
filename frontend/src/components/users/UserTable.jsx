import UserRow from "./UserRow";

export default function UserTable({ users, onDelete }) {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full text-sm text-left">

                {/* Header */}
                <thead className="bg-gray-100 text-[#64748B] uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Correo</th>
                        <th className="px-4 py-3">Contraseña</th>
                        <th className="px-4 py-3">Rol</th>
                        <th className="px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {users.map((user) => (
                        <UserRow key={user.id} user={user} onDelete={onDelete} />
                    ))}
                </tbody>

            </table>

        </div>
    );
}