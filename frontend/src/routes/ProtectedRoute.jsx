import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, rolesPermitidos, children }) {

    // No autenticado
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // No tiene permiso
    if (!rolesPermitidos.includes(user.rol)) {
        return <Navigate to="/no-autorizado" replace />;
    }

    // Si tiene acceso, renderizamos el contenido protegido
    return children;
}