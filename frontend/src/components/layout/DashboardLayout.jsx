import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
    const { user } = useAuth();
    return (
        <div className="flex">

            <Sidebar user={user} />

            <div className="flex-1 bg-gray-50 min-h-screen">
                <Header user={user} />

                <main className="p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}