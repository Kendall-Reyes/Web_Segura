const pool = require('../config/db')

/**
 * Lista los registros almacenados en log_auditoria.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const listarLogs = async (req, res, next) => {
  try {
    const query = `
      SELECT id, timestamp, usuario_id, accion, detalle, ip_origen, resultado
      FROM log_auditoria
      ORDER BY timestamp DESC
      LIMIT 100
    `

    const result = await pool.query(query)

    return res.status(200).json({
      ok: true,
      message: 'Listado de logs obtenido correctamente',
      data: result.rows
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarLogs
}