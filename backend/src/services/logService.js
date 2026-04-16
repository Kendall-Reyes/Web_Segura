const pool = require('../config/db')

/**
 * Registra un evento de log en la tabla log_auditoria.
 * @param {Object} log Datos del evento.
 * @param {number|null} [log.usuarioId] Id del usuario asociado.
 * @param {string} log.accion Acción realizada o evento detectado.
 * @param {string|null} [log.detalle] Detalle descriptivo del evento.
 * @param {string|null} [log.ipOrigen] Dirección IP de origen.
 * @param {string|null} [log.resultado] Resultado del evento.
 * @returns {Promise<void>}
 */
const registrarLog = async ({
  usuarioId = null,
  accion,
  detalle = null,
  ipOrigen = null,
  resultado = null
}) => {
  const query = `
    INSERT INTO log_auditoria (usuario_id, accion, detalle, ip_origen, resultado)
    VALUES ($1, $2, $3, $4, $5)
  `

  await pool.query(query, [
    usuarioId,
    accion,
    detalle,
    ipOrigen,
    resultado
  ])
}

module.exports = {
  registrarLog
}