const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./src/middlewares/errorHandler')

const authRoutes = require('./src/routes/authRoutes')
const productosRoutes = require('./src/routes/productosRoutes')
const usuariosRoutes = require('./src/routes/usuariosRoutes')
const logsRoutes = require('./src/routes/logsRoutes')
const rolesRoutes = require('./src/routes/rolesRoutes')

const app = express()

// Seguridad
app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))

// Parsers
app.use(express.json())
app.use(cookieParser())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/productos', productosRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/logs', logsRoutes)
app.use('/api/roles', rolesRoutes)

// Manejo global de errores
app.use(errorHandler)

module.exports = app