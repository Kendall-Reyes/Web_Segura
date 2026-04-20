import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Auth
import AuthPage from "../pages/AuthPage";

// Usuarios
import Usuarios from "../pages/user/Usuarios";
import CreateUser from "../pages/user/CreateUser";
import EditUser from "../pages/user/EditUser";

// Roles
import Roles from "../pages/roles/roles";
import EditRole from "../pages/roles/EditRole";
import CreateRole from "../pages/roles/CreateRole";

// Productos
import Productos from "../pages/productos/Productos";
import EditProducto from "../pages/productos/EditProducto";
import CreateProducto from "../pages/productos/CreateProducto";

// Logs
import Logs from "../pages/Logs";

// No autorizado
import NoAutorizado from "../pages/NoAutorizado";

export default function AppRoutes() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <Routes>

                {/* 🔓 LOGIN */}
                <Route path="/" element={<AuthPage setUser={setUser} />} />

                {/* 🔐 ZONA PROTEGIDA (LAYOUT GLOBAL) */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            user={user}
                            rolesPermitidos={["SuperAdmin", "Auditor", "Registrador"]}
                        >
                            <DashboardLayout user={user} />
                        </ProtectedRoute>
                    }
                >

                    {/* ===== DASHBOARD DEFAULT ===== */}
                    <Route index element={<Navigate to="/usuarios" />} />

                    {/* ========================= */}
                    {/* 👤 USUARIOS */}
                    {/* ========================= */}

                    {/* Lectura: TODOS pueden ver */}
                    <Route
                        path="usuarios"
                        element={
                            <ProtectedRoute
                                user={user}
                                rolesPermitidos={["SuperAdmin", "Auditor", "Registrador"]}
                            >
                                <Usuarios />
                            </ProtectedRoute>
                        }
                    />

                    {/* Crear: SOLO SuperAdmin */}
                    <Route
                        path="usuarios/crear"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["SuperAdmin"]}>
                                <CreateUser />
                            </ProtectedRoute>
                        }
                    />

                    {/* Editar: SOLO SuperAdmin */}
                    <Route
                        path="usuarios/editar/:id"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["SuperAdmin"]}>
                                <EditUser />
                            </ProtectedRoute>
                        }
                    />

                    {/* ========================= */}
                    {/* 🔐 ROLES */}
                    {/* ========================= */}

                    {/* Solo SuperAdmin */}
                    <Route
                        path="roles"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["SuperAdmin"]}>
                                <Roles />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="roles/crear"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["SuperAdmin"]}>
                                <CreateRole />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="roles/editar/:id"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["SuperAdmin"]}>
                                <EditRole />
                            </ProtectedRoute>
                        }
                    />

                    {/* ========================= */}
                    {/* 📦 PRODUCTOS */}
                    {/* ========================= */}

                    {/* Lectura: Auditor + Registrador */}
                    <Route
                        path="productos"
                        element={
                            <ProtectedRoute
                                user={user}
                                rolesPermitidos={["Auditor", "Registrador"]}
                            >
                                <Productos />
                            </ProtectedRoute>
                        }
                    />

                    {/* CRUD: SOLO Registrador */}
                    <Route
                        path="productos/crear"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["Registrador"]}>
                                <CreateProducto />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="productos/editar/:id"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["Registrador"]}>
                                <EditProducto />
                            </ProtectedRoute>
                        }
                    />

                    {/* ========================= */}
                    {/* 📜 LOGS */}
                    {/* ========================= */}

                    {/* Solo SuperAdmin */}
                    <Route
                        path="logs"
                        element={
                            <ProtectedRoute user={user} rolesPermitidos={["SuperAdmin"]}>
                                <Logs />
                            </ProtectedRoute>
                        }
                    />

                </Route>

                {/* 🚫 NO AUTORIZADO */}
                <Route path="/no-autorizado" element={<NoAutorizado />} />

                {/* 🔄 CUALQUIER RUTA DESCONOCIDA */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}