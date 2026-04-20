import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ rolesPermitidos, children }) {

    const { user } = useAuth();

    // No autenticado
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // No autorizado
    if (!rolesPermitidos.includes(user.rol)) {
        return <Navigate to="/no-autorizado" replace />;
    }

    return children;
}