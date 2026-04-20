export const menu = [
    {
        label: "Usuarios",
        path: "/app/usuarios",
        roles: ["SuperAdmin", "Auditor", "Registrador"],
    },
    {
        label: "Roles",
        path: "/app/roles",
        roles: ["SuperAdmin"],
    },
    {
        label: "Productos",
        path: "/app/productos",
        roles: ["Registrador", "Auditor"],
    },
    {
        label: "Logs",
        path: "/app/logs",
        roles: ["SuperAdmin"],
    },
];