import LogRow from "./RecordRow";

export default function LogsTable({ logs }) {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full text-sm text-left">

                {/* Header */}
                <thead className="bg-gray-100 text-[#64748B] uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Usuario</th>
                        <th className="px-4 py-3">Acción</th>
                        <th className="px-4 py-3">Detalle</th>
                        <th className="px-4 py-3">IP Origen</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {logs.map((log) => (
                        <LogRow key={log.id} log={log} />
                    ))}
                </tbody>

            </table>

        </div>
    );
}