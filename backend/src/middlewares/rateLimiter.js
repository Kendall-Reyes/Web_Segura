// TODO - Stiven
// Bloquear login tras 5 intentos fallidos (RS-07)
// Bloqueo mínimo: 5 minutos
const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: { error: 'Demasiados intentos. Intenta en 5 minutos.' }
})

module.exports = { loginLimiter }