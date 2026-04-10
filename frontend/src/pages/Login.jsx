function Login() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">

                <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center mb-6">
                    <span className="text-white text-lg font-bold">A</span>
                </div>

                <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs px-3 py-1 rounded-md mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Sistema activo
                </span>

                <h1 className="text-xl font-medium text-gray-900 mb-1">Iniciar sesión</h1>
                <p className="text-sm text-gray-500 mb-6">Ingresa tus credenciales para continuar</p>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        placeholder="admin@empresa.com"
                        className="w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full h-9 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <a href="#" className="block text-right text-xs text-indigo-500 mb-5">
                    ¿Olvidaste tu contraseña?
                </a>

                <button className="w-full h-9 bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Ingresar
                </button>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-100"></div>
                    <span className="text-xs text-gray-400">o</span>
                    <div className="flex-1 h-px bg-gray-100"></div>
                </div>

                <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Rol demo</p>
                        <p className="text-sm font-medium text-gray-800">SuperAdmin</p>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Sesión</p>
                        <p className="text-sm font-medium text-gray-800">5 min · JWT</p>
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Panel de administración</span>
                    <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-0.5">v1.0.0</span>
                </div>

            </div>
        </div>
    )
}

export default Login