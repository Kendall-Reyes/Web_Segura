const logService = require('../services/logService')

/**
 * Permite acceso solo a usuarios con rol SuperAdmin.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const soloSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.rol !== 'SuperAdmin') {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ACCESO_RESTRINGIDO',
        detalle: `Acceso denegado a la ruta ${req.originalUrl} para el rol ${req.user?.rol || 'desconocido'}`,
        ipOrigen: req.ip,
        resultado: 'DENEGADO'
      })

      return res.status(403).json({
        ok: false,
        message: 'Acceso denegado'
      })
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  soloSuperAdmin
}