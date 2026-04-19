const productosService = require('../services/productosService')
const logService = require('../services/logService')
const { EXITOSO, FALLIDO, NO_ENCONTRADO } = require('../constants/logResults')

/**
 * Lista todos los productos disponibles.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const listar = async (req, res, next) => {
  try {
    const productos = await productosService.listar()

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LISTAR_PRODUCTOS',
      detalle: `Listado de productos consultado por ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Listado de productos obtenido correctamente',
      data: productos
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
    const { id } = req.validatedData.params
    const producto = await productosService.obtenerPorId(id)

    if (!producto) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'OBTENER_PRODUCTO',
        detalle: `Producto con id ${id} no encontrado`,
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
      detalle: `Consulta del producto con id ${id}`,
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
 * Crea un producto nuevo.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const crear = async (req, res, next) => {
  try {
    const data = req.validatedData.body
    const producto = await productosService.crear(data)

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'CREAR_PRODUCTO',
      detalle: `Creación del producto con código ${producto.codigo}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(201).json({
      ok: true,
      message: 'Producto creado correctamente',
      data: producto
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
    const { id } = req.validatedData.params
    const data = req.validatedData.body

    const producto = await productosService.actualizar(id, data)

    if (!producto) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ACTUALIZAR_PRODUCTO',
        detalle: `Producto con id ${id} no encontrado para actualización`,
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
      detalle: `Producto con id ${id} actualizado`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Producto actualizado correctamente',
      data: producto
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
 * Elimina un producto existente.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const eliminar = async (req, res, next) => {
  try {
    const { id } = req.validatedData.params
    const eliminado = await productosService.eliminar(id)

    if (!eliminado) {
      await logService.registrarLog({
        usuarioId: req.user?.id || null,
        accion: 'ELIMINAR_PRODUCTO',
        detalle: `Producto con id ${id} no encontrado para eliminación`,
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
      detalle: `Producto con id ${id} eliminado`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Producto eliminado correctamente'
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