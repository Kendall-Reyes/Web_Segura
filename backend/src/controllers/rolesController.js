const rolesService = require('../services/rolesService')
const logService = require('../services/logService')
const { EXITOSO, FALLIDO, NO_ENCONTRADO } = require('../constants/logResults')

/**
 * Lista los roles disponibles.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
const listar = async (req, res, next) => {
  try {
    const roles = await rolesService.listar()

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_ROLES',
      detalle: `Listado de roles consultado por ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Listado de roles obtenido correctamente',
      data: roles
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_ROLES',
      detalle: `Error al listar roles: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Obtiene un rol por id.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
const obtener = async (req, res, next) => {
  try {
    const { id } = req.validatedData.params
    const rol = await rolesService.obtenerPorId(id)

    if (!rol) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'OBTENER_ROL',
        detalle: `Rol con id ${id} no encontrado`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Rol no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'OBTENER_ROL',
      detalle: `Consulta del rol con id ${id}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Rol obtenido correctamente',
      data: rol
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'OBTENER_ROL',
      detalle: `Error al obtener rol: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Crea un rol nuevo.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
const crear = async (req, res, next) => {
  try {
    const data = req.validatedData.body
    const rol = await rolesService.crear(data)

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'CREAR_ROL',
      detalle: `Creación del rol ${rol.role}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(201).json({
      ok: true,
      message: 'Rol creado correctamente',
      data: rol
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'CREAR_ROL',
      detalle: `Error al crear rol: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    return res.status(error.statusCode || 500).json({
      ok: false,
      message: error.message || 'Error al crear rol'
    })
  }
}

/**
 * Actualiza un rol existente.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
const actualizar = async (req, res, next) => {
  try {
    const { id } = req.validatedData.params
    const data = req.validatedData.body

    const rol = await rolesService.actualizar(id, data)

    if (!rol) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ACTUALIZAR_ROL',
        detalle: `Rol con id ${id} no encontrado para actualización`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Rol no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ACTUALIZAR_ROL',
      detalle: `Actualización del rol con id ${id}. Cambios: ${JSON.stringify(data)}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Rol actualizado correctamente',
      data: rol
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ACTUALIZAR_ROL',
      detalle: `Error al actualizar rol: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    return res.status(error.statusCode || 500).json({
      ok: false,
      message: error.message || 'Error al actualizar rol'
    })
  }
}

/**
 * Elimina un rol existente si no está en uso.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
const eliminar = async (req, res, next) => {
  try {
    const { id } = req.validatedData.params
    const resultado = await rolesService.eliminar(id)

    if (resultado.motivo === 'NO_ENCONTRADO') {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ELIMINAR_ROL',
        detalle: `Rol con id ${id} no encontrado para eliminación`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Rol no encontrado'
      })
    }

    if (resultado.motivo === 'EN_USO') {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ELIMINAR_ROL',
        detalle: `No se pudo eliminar el rol con id ${id} porque está asignado a uno o más usuarios`,
        ipOrigen: req.ip,
        resultado: FALLIDO
      })

      return res.status(409).json({
        ok: false,
        message: 'No se puede eliminar el rol porque está asignado a usuarios'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ELIMINAR_ROL',
      detalle: `Eliminación del rol con id ${id}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Rol eliminado correctamente'
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ELIMINAR_ROL',
      detalle: `Error al eliminar rol: ${error.message}`,
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