const jwt = require('jsonwebtoken')

/**
 * Verifica un JWT válido desde cookie HttpOnly o header Authorization.
 * Adjunta el payload decodificado a req.user.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {void}
 */
const verificarToken = (req, res, next) => {
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
      return res.status(401).json({
        ok: false,
        message: 'No autorizado - token requerido'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token inválido o expirado'
    })
  }
}

module.exports = {
  verificarToken
}