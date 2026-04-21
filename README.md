# Web_Segura

## Librerías instaladas
### Backend
1. npm install express pg bcrypt jsonwebtoken helmet cors express-rate-limit dotenv swagger-ui-express yamljs cookie-parser
2. npm install -D nodemon

|      Librería      	| Versión 	|                                                                          Uso en el proyecto                                                                          	|                       Vulnerabilidades conocidas                       	|                                              Por qué no afecta al proyecto                                             	|
|:------------------:	|:-------:	|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:	|:----------------------------------------------------------------------:	|:----------------------------------------------------------------------------------------------------------------------:	|
| express            	| 5.2.1   	| Framework principal del servidor. Gestiona rutas, middlewares y el ciclo de vida de las peticiones HTTP                                                              	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| pg                 	| 8.20.0  	| Conecta el backend con PostgreSQL. Utiliza consultas parametrizadas para prevenir SQL Injection (RS-01)                                                              	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| bcrypt             	| 6.0.0   	| Encripta las contraseñas de los usuarios con un factor de costo mínimo de 12 antes de almacenarlas en la base de datos                                               	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| jsonwebtoken       	| 9.0.3   	| Genera y verifica los tokens JWT usados para autenticar cada petición. Rechaza explícitamente el algoritmo none                                                      	| CVE-2022-23529 — manipulación del token si el secreto es un objeto     	| El secreto se define como string en .env, nunca como objeto, lo que invalida el vector de ataque                       	|
| helmet             	| 8.1.0   	| Aplica automáticamente los headers de seguridad HTTP requeridos: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security (RS-06) 	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| cors               	| 2.8.6   	| Restringe qué orígenes pueden hacer peticiones a la API, bloqueando dominios no autorizados                                                                          	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| express-rate-limit 	| 8.3.2   	| Bloquea el endpoint de login tras 5 intentos fallidos durante 5 minutos (RS-07)                                                                                      	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| dotenv             	| 17.4.1  	| Carga las variables de entorno desde el archivo .env al proceso de Node.js                                                                                           	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| cookie-parser      	| 1.4.7   	| Permite leer las cookies HttpOnly donde se almacena el JWT, evitando su exposición a JavaScript (RS-05)                                                              	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| swagger-ui-express 	| 5.0.1   	| Genera la documentación interactiva de los endpoints de la API disponible en /api/docs                                                                               	| Ninguna conocida actualmente                                           	| —                                                                                                                      	|
| yamljs             	| 0.3.0   	| Lee los archivos de configuración de Swagger en formato YAML                                                                                                         	| CVE-2016-10540 — denegación de servicio al parsear entradas maliciosas 	| El archivo YAML lo genera el equipo de desarrollo, nunca proviene de input del usuario, eliminando el vector de ataque 	|
| nodemon (dev)      	| 3.1.14  	| Reinicia automáticamente el servidor al detectar cambios en el código durante el desarrollo                                                                          	| glob@7.2.3 deprecado internamente — fuga de memoria potencial          	| Es una dependencia exclusiva de desarrollo. No se incluye en el contenedor de producción ni en el servidor público     	|
| zod                               | 4.3.6     | Librería de validación de esquemas en backend. Se utiliza para validar y sanear datos de entrada (body, params, query), evitar lógica de validación duplicada y asegurar que solo datos estructuralmente válidos lleguen a la capa de negocio. Mejora la mantenibilidad y reduce riesgos asociados a inputs malformados. | Versiones anteriores (< 3.22.3) presentaron vulnerabilidad de denegación de servicio (CVE-2023-4316). Versiones actuales 4.3.6 no presentan vulnerabilidades conocidas |


### Frontend
1. npm install react-router-dom axios react-hook-form zod @hookform/resolvers
2. npm install -D tailwindcss @tailwindcss/vite

|              Librería             	| Versión 	|                                                     Uso en el proyecto                                                    	|  Vulnerabilidades conocidas  	|   	|
|:---------------------------------:	|:-------:	|:-------------------------------------------------------------------------------------------------------------------------:	|:----------------------------:	|---	|
| react                             	| 19.2.4  	| Librería principal para construir la interfaz de usuario mediante componentes reutilizables                               	| Ninguna conocida actualmente 	|   	|
| react-dom                         	| 19.2.4  	| Renderiza los componentes de React en el DOM del navegador                                                                	| Ninguna conocida actualmente 	|   	|
| react-router-dom                  	| 7.14.0  	| Navegación entre páginas y rutas protegidas por rol                                                                       	| Ninguna conocida actualmente 	|   	|
| axios                             	| 1.15.0  	| Cliente HTTP para comunicarse con la API. Permite adjuntar el JWT automáticamente en cada petición mediante interceptores 	| Ninguna conocida actualmente 	|   	|
| react-hook-form                   	| 7.72.1  	| Manejo de formularios con validación eficiente sin re-renders innecesarios                                                	| Ninguna conocida actualmente 	|   	|
| zod                               	| 4.3.6   	| Definición de esquemas de validación para los inputs del usuario en el frontend                                           	| Ninguna conocida actualmente 	|   	|
| @hookform/resolvers               	| 5.2.2   	| Adaptador que conecta Zod con React Hook Form para ejecutar las validaciones automáticamente                              	| Ninguna conocida actualmente 	|   	|
| tailwindcss (dev)                 	| 4.2.2   	| Framework de estilos CSS utilitario para construir la interfaz de forma rápida y consistente                              	| Ninguna conocida actualmente 	|   	|
| @tailwindcss/vite (dev)           	| 4.2.2   	| Plugin oficial que integra Tailwind directamente en el pipeline de Vite                                                   	| Ninguna conocida actualmente 	|   	|
| vite (dev)                        	| 8.0.4   	| Herramienta de desarrollo y construcción del proyecto. Provee servidor local con recarga en caliente                      	| Ninguna conocida actualmente 	|   	|
| @vitejs/plugin-react (dev)        	| 6.0.1   	| Plugin que habilita el soporte de JSX y Fast Refresh de React dentro de Vite                                              	| Ninguna conocida actualmente 	|   	|
| eslint (dev)                      	| 9.39.4  	| Analizador estático de código que detecta errores y malas prácticas durante el desarrollo                                 	| Ninguna conocida actualmente 	|   	|
| eslint-plugin-react-hooks (dev)   	| 7.0.1   	| Reglas de ESLint específicas para el uso correcto de los hooks de React                                                   	| Ninguna conocida actualmente 	|   	|
| eslint-plugin-react-refresh (dev) 	| 0.5.2   	| Reglas de ESLint para garantizar compatibilidad con el Fast Refresh de Vite                                               	| Ninguna conocida actualmente 	|   	|
| globals (dev)                     	| 17.4.0  	| Provee las definiciones de variables globales del navegador y Node.js para la configuración de ESLint                     	| Ninguna conocida actualmente 	|   	|
| @types/react (dev)                	| 19.2.14 	| Definiciones de tipos para React, útiles para autocompletado en editores como VS Code                                     	| Ninguna conocida actualmente 	|   	|
| @types/react-dom (dev)            	| 19.2.3  	| Definiciones de tipos para React DOM, complemento de @types/react                                                         	| Ninguna conocida actualmente 	|   	|

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
#### src/api/
Contiene la configuración de Axios para comunicarse con el backend. Aquí se definen los interceptores que adjuntan automáticamente el token JWT a cada petición y manejan errores globales de autenticación.
####  src/components/
Componentes reutilizables de la interfaz como la barra de navegación, la tabla de datos y las rutas protegidas por rol. Se usan en múltiples páginas sin repetir código.
####  src/context/
Maneja el estado global de la sesión del usuario mediante React Context. Almacena la información del usuario autenticado y su rol, accesible desde cualquier parte de la aplicación.
####  src/pages/
Contiene las pantallas principales de la aplicación: Login, Productos, Usuarios y Logs de Auditoría. Cada archivo representa una vista completa del sistema.
####  src/routes/
Define la navegación de la aplicación y las rutas protegidas. Controla el acceso a las páginas según el rol del usuario, redirigiendo a quienes no tienen los permisos necesarios.
####  src/utils/
Funciones auxiliares y esquemas de validación con Zod. Define las reglas que deben cumplir los datos ingresados en los formularios antes de enviarse al backend.
####  .env
Archivo de variables de entorno. Contiene la URL base de la API. Este archivo nunca se sube al repositorio por razones de seguridad.
####  Dockerfile
Instrucciones para construir el contenedor Docker del frontend. Permite que el servicio se levante de forma consistente en cualquier máquina con docker-compose up.

## Estructura del directorio backend
backend/  
├── src/  
│   ├── config/  
│   │   ├── db.js  
│   │   └── swagger.js  
│   ├── controllers/  
│   │   ├── authController.js  
│   │   ├── productosController.js  
│   │   ├── usuariosController.js  
│   │   └── logsController.js  
│   ├── middlewares/  
│   │   ├── auth.js  
│   │   ├── roles.js  
│   │   ├── rateLimiter.js  
│   │   └── errorHandler.js  
│   ├── routes/  
│   │   ├── authRoutes.js  
│   │   ├── productosRoutes.js  
│   │   ├── usuariosRoutes.js  
│   │   └── logsRoutes.js  
│   └── db/  
│       └── schema.sql  
├── app.js  
├── server.js  
├── .env  
└── Dockerfile  


### Contexto de archivos y directorios relevantes

#### src/config/db.js
Configura y exporta el pool de conexiones a PostgreSQL usando la librería pg. Lee las credenciales desde las variables de entorno definidas en .env. Todos los controladores importan este archivo para ejecutar consultas a la base de datos.
#### src/config/swagger.js
Configura la documentación interactiva de los endpoints de la API. Una vez levantado el servidor, la documentación estará disponible en /api/docs.

#### src/controllers/authController.js
Maneja el login y logout del sistema. Verifica las credenciales del usuario contra la base de datos, compara la contraseña con bcrypt y genera el token JWT que se envía al cliente en una cookie HttpOnly.
#### src/controllers/productosController.js
Contiene la lógica del CRUD de productos. Todas las operaciones de escritura (crear, editar, eliminar) están restringidas al rol SuperAdmin. Las consultas se ejecutan con parámetros para prevenir SQL Injection.
#### src/controllers/usuariosController.js
Contiene la lógica del CRUD de usuarios. Gestiona la creación de usuarios con contraseña encriptada, actualización de datos y eliminación. Solo accesible por SuperAdmin.
#### src/controllers/logsController.js
Consulta y devuelve los registros de auditoría almacenados en la tabla log_auditoria. Únicamente accesible por el SuperAdmin.

#### src/middlewares/auth.js
Se ejecuta antes de cada endpoint protegido. Extrae el token JWT de la cookie HttpOnly, verifica su firma y expiración, y adjunta los datos del usuario a req.user para que los controladores puedan usarlos.
#### src/middlewares/roles.js
Verifica que el usuario autenticado tenga el rol necesario para acceder a un recurso. Si el rol no coincide, retorna un error 403 Forbidden y registra el acceso denegado en el log de auditoría.
#### src/middlewares/rateLimiter.js
Bloquea el endpoint de login tras 5 intentos fallidos consecutivos durante un período de 5 minutos. Cada bloqueo queda registrado en el log de auditoría con la IP de origen.
#### src/middlewares/errorHandler.js
Captura cualquier error no controlado de la aplicación y devuelve una respuesta JSON estructurada. Evita que el servidor exponga mensajes de error internos al cliente.

#### src/routes/authRoutes.js
Define los endpoints de autenticación. Aplica el middleware de rate limiting al login antes de pasar al controlador.
- POST  /api/auth/login
- POST  /api/auth/logout
#### src/routes/productosRoutes.js
Define los endpoints del CRUD de productos. Todas las rutas requieren token válido y las de escritura requieren rol SuperAdmin.
- GET     /api/productos
- POST    /api/productos
- PUT     /api/productos/:id
- DELETE  /api/productos/:id
#### src/routes/usuariosRoutes.js
Define los endpoints del CRUD de usuarios. Todas las rutas están protegidas y restringidas al SuperAdmin.
-GET     /api/usuarios
-POST    /api/usuarios
-PUT     /api/usuarios/:id
-DELETE  /api/usuarios/:id
#### src/routes/logsRoutes.js
Define el endpoint de consulta del log de auditoría. Solo accesible por SuperAdmin.
- GET  /api/logs

#### src/db/schema.sql
Script SQL que define la estructura completa de la base de datos. Contiene la creación de las tablas usuarios, productos y log_auditoria. Docker ejecuta este archivo automáticamente al levantar el contenedor de PostgreSQL por primera vez.

#### app.js
Punto de configuración de Express. Registra los middlewares globales de seguridad (helmet, cors, cookie-parser) y conecta todas las rutas bajo el prefijo /api.
#### server.js
Punto de entrada de la aplicación. Lee el puerto desde las variables de entorno e inicia el servidor HTTP.
#### .env
Archivo de variables de entorno. Contiene las credenciales de la base de datos, el secreto para firmar los JWT y el puerto del servidor. Este archivo nunca se sube al repositorio.
#### Dockerfile
Instrucciones para construir el contenedor Docker del backend. Permite que el servicio se levante de forma consistente en cualquier máquina junto al frontend y la base de datos mediante docker-compose up.

## Guía de ejecución a nivel local
- frontend
1. npm install
2. npm run dev
   
- backend
1. npm install
2. npm run dev

## Guía de ejecución con Docker
1. Para eliminar alguna BD existente:
```bash
docker compose down -v
```
2. Para construir los contenedores (Backend, Frontend, Base de Datos):
```bash
docker compose up --build
```
3. Para apagar los contenedores:
```bash
docker compose down
```
4. Para levantar los contenedores:
```bash
docker compose up
```

## Guía de uso de Swagger

1. Levantar el backend (si no está corriendo):
```bash
docker compose up
```

2. Acceder a la documentación Swagger desde el navegador:
```
http://localhost:3000/api-docs
```

3. Explorar los endpoints disponibles:
- Auth
- Usuarios
- Productos
- Roles
- Logs

4. Probar un endpoint:
- Selecciona el endpoint
- Presiona **“Try it out”**
- Completa los datos (si aplica)
- Presiona **“Execute”**

5. Autenticarse con JWT (para endpoints protegidos):
- Presiona el botón **“Authorize”** (arriba a la derecha)
- Ingresa el token en formato:
```
Bearer TU_TOKEN
```
- Presiona **“Authorize”**

6. Ejecutar endpoints protegidos:
- Una vez autenticado, puedes probar rutas como:
  - `/api/productos`
  - `/api/usuarios`
  - `/api/roles`
  - `/api/logs`

7. Revisar la respuesta:
Swagger mostrará:
- código de estado HTTP
- request enviado
- response del servidor

---

## ⚠️ Notas importantes

- Swagger ejecuta **peticiones reales** al backend (no simulaciones)
- Si el login usa cookies HttpOnly, Swagger puede no mantener la sesión correctamente
- Para pruebas más completas, se recomienda usar JWT manual (Bearer Token)

---

## 🧾 Ejemplo de login en Swagger

```json
{
  "email": "jodacarvajal@gmail.com",
  "password": "12345678"
}
```

