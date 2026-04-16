const jwt = require('jsonwebtoken')
const logService = require('../services/logService')

/**
 * Verifica un JWT válido desde cookie HttpOnly o header Authorization.
 * Adjunta el payload decodificado a req.user.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const verificarToken = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies?.token
    const authHeader = req.headers.authorization

    let token = null

    if (tokenFromCookie) {
      token = tokenFromCookie
    } else if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    }

    if (!token) {
      await logService.registrarLog({
        accion: 'ACCESO',
        detalle: `Acceso sin token a la ruta ${req.originalUrl}`,
        ipOrigen: req.ip,
        resultado: 'NO_AUTORIZADO'
      })

      return res.status(401).json({
        ok: false,
        message: 'No autorizado - token requerido'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
  } catch (error) {
    await logService.registrarLog({
      accion: 'ACCESO',
      detalle: `Token inválido o expirado al acceder a la ruta ${req.originalUrl}`,
      ipOrigen: req.ip,
      resultado: 'TOKEN_INVALIDO'
    })

    return res.status(401).json({
      ok: false,
      message: 'Token inválido o expirado'
    })
  }
}

module.exports = {
  verificarToken
}