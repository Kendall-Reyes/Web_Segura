// TODO - Stiven
// Verificar JWT en cada request
// - Extraer token de cookie HttpOnly
// - Validar firma y expiración
// - Rechazar algoritmo 'none'
// - Adjuntar usuario a req.user
const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
    // Stiven implementa aquí
    next()
}

module.exports = { verificarToken }