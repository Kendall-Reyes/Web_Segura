export const menu = [
    {
        label: "Usuarios",
        path: "/usuarios",
        roles: ["SuperAdmin", "Auditor"],
    },
    {
        label: "Roles",
        path: "/roles",
        roles: ["SuperAdmin"],
    },
    {
        label: "Productos",
        path: "/productos",
        roles: ["Registrador", "Auditor"],
    },
    {
        label: "Logs",
        path: "/logs",
        roles: ["SuperAdmin"],
    },
    {
        label: "Reportes",
        path: "/reportes",
        roles: ["SuperAdmin"],
    },
];