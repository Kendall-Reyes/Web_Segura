const jwt = require('jsonwebtoken')

/**
 * Middleware que verifica un JWT válido en cookie HttpOnly o header Authorization.
 * Adjunta el payload decodificado a req.user si es válido.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {void}
 */
const verificarToken = (req, res, next) => {
  try {
    // 1) Obtener token desde cookie (preferido) o header
    const tokenFromCookie = req.cookies?.token
    const authHeader = req.headers['authorization']

    let token = null

    if (tokenFromCookie) {
      token = tokenFromCookie
    } else if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    }

    // 2) Validar existencia
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: 'No autorizado - token requerido'
      })
    }

    // 3) Verificar token (firma + expiración)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 4) Adjuntar usuario al request
    req.user = decoded

    next()
  } catch (error) {
    // Token inválido o expirado
    return res.status(401).json({
      ok: false,
      message: 'Token inválido o expirado'
    })
  }
}

module.exports = {
  verificarToken
}