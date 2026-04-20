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
      SELECT 
        l.id,
        l.timestamp,
        l.usuario_id,
        u.nombre AS usuario,
        l.accion,
        l.detalle,
        l.ip_origen,
        l.resultado
      FROM log_auditoria l
      LEFT JOIN usuarios u ON l.usuario_id = u.id
      ORDER BY l.timestamp DESC
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