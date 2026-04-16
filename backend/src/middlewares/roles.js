const logService = require('../services/logService')
const { FALLIDO } = require('../constants/logResults')

/**
 * Permite el acceso solo a usuarios cuyo rol esté incluido en los roles permitidos.
 * Registra un log cuando el acceso es denegado.
 * @param {...string} rolesPermitidos Roles autorizados para acceder al recurso.
 * @returns {import('express').RequestHandler} Middleware de autorización.
 */
const permitirRoles = (...rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      const user = req.user

      if (!user || !rolesPermitidos.includes(user.rol)) {
        await logService.registrarLog({
          usuarioId: user?.id || null,
          accion: 'ACCESO_RESTRINGIDO',
          detalle: `Acceso denegado a ${req.originalUrl} para el rol ${user?.rol || 'desconocido'}`,
          ipOrigen: req.ip,
          resultado: FALLIDO
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
}

module.exports = {
  permitirRoles
}