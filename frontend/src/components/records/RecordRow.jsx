export default function LogRow({ log }) {
    return (
        <tr className="border-b hover:bg-gray-50">

            <td className="px-4 py-3">{log.usuario}</td>

            <td className="px-4 py-3 font-medium">
                {log.accion}
            </td>

            <td className="px-4 py-3 text-[#64748B]">
                {log.detalle}
            </td>

            <td className="px-4 py-3 font-mono text-xs">
                {log.ip_origen}
            </td>

        </tr>
    );
}