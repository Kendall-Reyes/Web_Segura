import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Usuarios from "./pages/user/Usuarios";
import CreateUser from "./pages/user/CreateUser";
import EditUser from "./pages/user/EditUser";
import Logs from "./pages/Logs";
import Roles from "./pages/roles/roles";
import Productos from "./pages/productos/Productos";
import AuthPage from "./pages/AuthPage";

// páginas
const Home = () => <h1>Inicio</h1>;
//const Usuarios = () => <h1>Usuarios</h1>;
//const Roles = () => <h1>Roles</h1>;
//const Productos = () => <h1>Productos</h1>;
//const Logs = () => <h1>Logs</h1>;
const Reportes = () => <h1>Reportes</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;