const logService = require('../services/logService')
const { EXITOSO, FALLIDO, NO_ENCONTRADO } = require('../constants/logResults')

/**
 * Lista los productos disponibles.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const listar = async (req, res, next) => {
  try {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_PRODUCTOS',
      detalle: `Listado de productos consultado por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Listar productos - pendiente implementación',
      data: []
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_PRODUCTOS',
      detalle: `Error al listar productos: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Obtiene un producto por su identificador.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const obtener = async (req, res, next) => {
  try {
    const params = req.validatedData?.params

    // Temporal hasta conectar BD real
    const producto = null

    if (!producto) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'OBTENER_PRODUCTO',
        detalle: `Producto con id ${params.id} no encontrado`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'OBTENER_PRODUCTO',
      detalle: `Consulta del producto con id ${params.id} por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Producto obtenido correctamente',
      data: producto
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'OBTENER_PRODUCTO',
      detalle: `Error al obtener producto: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Crea un producto con datos validados.
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
      accion: 'CREAR_PRODUCTO',
      detalle: `Creación de producto con código ${data.codigo} por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(201).json({
      ok: true,
      message: 'Crear producto - pendiente implementación',
      data
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'CREAR_PRODUCTO',
      detalle: `Error al crear producto: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Actualiza un producto existente.
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
    const productoExiste = false

    if (!productoExiste) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ACTUALIZAR_PRODUCTO',
        detalle: `Producto con id ${params.id} no encontrado para actualización`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ACTUALIZAR_PRODUCTO',
      detalle: `Actualización del producto con id ${params.id} por el usuario ${req.user?.nombre || 'desconocido'}. Cambios: ${JSON.stringify(data)}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Producto actualizado correctamente',
      data: {
        id: params.id,
        cambios: data
      }
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ACTUALIZAR_PRODUCTO',
      detalle: `Error al actualizar producto: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

/**
 * Elimina un producto por su identificador.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const eliminar = async (req, res, next) => {
  try {
    const params = req.validatedData?.params

    // Temporal hasta conectar BD real
    const productoExiste = false

    if (!productoExiste) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ELIMINAR_PRODUCTO',
        detalle: `Producto con id ${params.id} no encontrado para eliminación`,
        ipOrigen: req.ip,
        resultado: NO_ENCONTRADO
      })

      return res.status(404).json({
        ok: false,
        message: 'Producto no encontrado'
      })
    }

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ELIMINAR_PRODUCTO',
      detalle: `Eliminación del producto con id ${params.id} por el usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Producto eliminado correctamente',
      data: {
        id: params.id
      }
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'ELIMINAR_PRODUCTO',
      detalle: `Error al eliminar producto: ${error.message}`,
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