import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ user, onRoleChange, children }) {
    return (
        <div className="flex">

            <Sidebar user={user} />

            <div className="flex-1 bg-gray-50 min-h-screen">
                <Header user={user} onRoleChange={onRoleChange} />

                <main className="p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}