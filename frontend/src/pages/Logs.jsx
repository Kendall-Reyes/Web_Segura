import LogsTable from "../components/records/RecordTable";

export default function Logs() {

    // 🔥 Mock data (luego viene del backend)
    const logs = [
        {
            id: 1,
            usuario: "Admin",
            accion: "LOGIN",
            detalle: "Inicio de sesión exitoso",
            ip_origen: "192.168.1.10",
        },
        {
            id: 2,
            usuario: "Auditor",
            accion: "VIEW_PRODUCTOS",
            detalle: "Consulta de productos",
            ip_origen: "192.168.1.15",
        },
    ];

    return (
        <div>

            <h1 className="text-2xl font-bold text-[#0F172A] mb-6">
                Logs de Auditoría
            </h1>

            <LogsTable logs={logs} />

        </div>
    );
}