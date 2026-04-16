const logService = require('../services/logService')
const { EXITOSO, FALLIDO, NO_ENCONTRADO } = require('../constants/logResults')

/**
 * Lista los usuarios disponibles.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const listar = async (req, res, next) => {
  try {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_USUARIOS',
      detalle: `Listado de usuarios consultado por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Listar usuarios - pendiente implementación',
      data: []
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_USUARIOS',
      detalle: `Error al listar usuarios: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Obtiene un usuario por su identificador.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const obtener = async (req, res, next) => {
  try {
    const params = req.validatedData?.params

    // Temporal hasta conectar BD real
    const usuario = null

    if (!usuario) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'OBTENER_USUARIO',
        detalle: `Usuario con id ${params.id} no encontrado`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'OBTENER_USUARIO',
      detalle: `Consulta del usuario con id ${params.id} por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Usuario obtenido correctamente',
      data: usuario
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'OBTENER_USUARIO',
      detalle: `Error al obtener usuario: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Crea un usuario con datos previamente validados.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const crear = async (req, res, next) => {
  try {
    const data = req.validatedData?.body

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'CREAR_USUARIO',
      detalle: `Creación del usuario ${data.nombre} con rol ${data.rol} por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(201).json({
      ok: true,
      message: 'Crear usuario - pendiente implementación',
      data: {
        nombre: data.nombre,
        email: data.email,
        rol: data.rol
      }
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'CREAR_USUARIO',
      detalle: `Error al crear usuario: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Actualiza un usuario existente.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const actualizar = async (req, res, next) => {
  try {
    const params = req.validatedData?.params
    const data = req.validatedData?.body

    // Temporal hasta conectar BD real
    const usuarioExiste = false

    if (!usuarioExiste) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ACTUALIZAR_USUARIO',
        detalle: `Usuario con id ${params.id} no encontrado para actualización`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ACTUALIZAR_USUARIO',
      detalle: `Actualización del usuario con id ${params.id} por el usuario ${req.user?.nombre || 'desconocido'}. Cambios: ${JSON.stringify(data)}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Usuario actualizado correctamente',
      data: {
        id: params.id,
        cambios: data
      }
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ACTUALIZAR_USUARIO',
      detalle: `Error al actualizar usuario: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Elimina un usuario por su identificador.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const eliminar = async (req, res, next) => {
  try {
    const params = req.validatedData?.params

    // Temporal hasta conectar BD real
    const usuarioExiste = false

    if (!usuarioExiste) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ELIMINAR_USUARIO',
        detalle: `Usuario con id ${params.id} no encontrado para eliminación`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ELIMINAR_USUARIO',
      detalle: `Eliminación del usuario con id ${params.id} por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Usuario eliminado correctamente',
      data: {
        id: params.id
      }
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ELIMINAR_USUARIO',
      detalle: `Error al eliminar usuario: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
}