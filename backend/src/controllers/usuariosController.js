const usuariosService = require('../services/usuariosService')
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
    const usuarios = await usuariosService.listar()

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_USUARIOS',
      detalle: `Listado de usuarios consultado por ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Listado de usuarios obtenido correctamente',
      data: usuarios
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
    const { id } = req.validatedData.params
    const usuario = await usuariosService.obtenerPorId(id)

    if (!usuario) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'OBTENER_USUARIO',
        detalle: `Usuario con id ${id} no encontrado`,
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
      detalle: `Consulta del usuario con id ${id}`,
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
 * Crea un usuario nuevo.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const crear = async (req, res, next) => {
  try {
    const data = req.validatedData.body
    const usuario = await usuariosService.crear(data)

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'CREAR_USUARIO',
      detalle: `Creación del usuario ${usuario.nombre} con rol ${usuario.rol}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(201).json({
      ok: true,
      message: 'Usuario creado correctamente',
      data: usuario
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
    const { id } = req.validatedData.params
    const data = req.validatedData.body
    const usuario = await usuariosService.actualizar(id, data)

    if (!usuario) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ACTUALIZAR_USUARIO',
        detalle: `Usuario con id ${id} no encontrado para actualización`,
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
      detalle: `Usuario con id ${id} actualizado`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Usuario actualizado correctamente',
      data: usuario
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
 * Elimina un usuario existente.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const eliminar = async (req, res, next) => {
  try {
    const { id } = req.validatedData.params
    const eliminado = await usuariosService.eliminar(id)

    if (!eliminado) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ELIMINAR_USUARIO',
        detalle: `Usuario con id ${id} no encontrado para eliminación`,
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
      detalle: `Usuario con id ${id} eliminado`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Usuario eliminado correctamente'
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