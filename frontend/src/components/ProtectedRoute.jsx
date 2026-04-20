import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, rolesPermitidos, children }) {
    // Si no hay usuario, redirigir al login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Si el rol no está permitido, redirigir a no autorizado
    if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
        return <Navigate to="/no-autorizado" replace />;
    }

    return children;
}