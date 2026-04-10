# Web_Segura

## Librerías instaladas
1. npm install react-router-dom axios react-hook-form zod @hookform/resolvers
2. npm install -D tailwindcss @tailwindcss/vite

## Estructura del directorio frontend
frontend/  
├── src/  
│   ├── api/            
│   ├── components/     
│   ├── context/        
│   ├── pages/          
│   ├── routes/         
│   └── utils/          
├── .env                
└── Dockerfile

### Contexto de archivos y directorios relevantes
#### _src/api/_
Contiene la configuración de Axios para comunicarse con el backend. Aquí se definen los interceptores que adjuntan automáticamente el token JWT a cada petición y manejan errores globales de autenticación.
####  _src/components/_
Componentes reutilizables de la interfaz como la barra de navegación, la tabla de datos y las rutas protegidas por rol. Se usan en múltiples páginas sin repetir código.
####  _src/context/_
Maneja el estado global de la sesión del usuario mediante React Context. Almacena la información del usuario autenticado y su rol, accesible desde cualquier parte de la aplicación.
####  _src/pages/_
Contiene las pantallas principales de la aplicación: Login, Productos, Usuarios y Logs de Auditoría. Cada archivo representa una vista completa del sistema.
####  _src/routes/_
Define la navegación de la aplicación y las rutas protegidas. Controla el acceso a las páginas según el rol del usuario, redirigiendo a quienes no tienen los permisos necesarios.
####  _src/utils/_
Funciones auxiliares y esquemas de validación con Zod. Define las reglas que deben cumplir los datos ingresados en los formularios antes de enviarse al backend.
####  _.env_
Archivo de variables de entorno. Contiene la URL base de la API. Este archivo nunca se sube al repositorio por razones de seguridad.
####  _Dockerfile_
Instrucciones para construir el contenedor Docker del frontend. Permite que el servicio se levante de forma consistente en cualquier máquina con docker-compose up.


## Guía de ejecución
1. cd frontend
2. npm install
3. npm run dev