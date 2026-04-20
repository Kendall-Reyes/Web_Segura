import { useEffect, useState } from "react";
import LogsTable from "../components/records/RecordTable";

export default function Logs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/logs", {
                    credentials: "include" 
                });

                const data = await res.json();

                if (data.ok) {
                    setLogs(data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#0F172A] mb-6">
                Logs de Auditoría
            </h1>

            <LogsTable logs={logs} />
        </div>
    );
}