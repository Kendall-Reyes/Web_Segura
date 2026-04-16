const pool = require('../config/db')
const bcrypt = require('bcrypt')

/**
 * Busca usuario por nombre y valida contraseña.
 * @param {{ nombre: string, password: string }} credentials
 * @returns {Promise<{ id: number, nombre: string, rol: string }>}
 */
const login = async ({ nombre, password }) => {
  const query = `
    SELECT id, nombre, contrasena, rol
    FROM usuarios
    WHERE nombre = $1
    LIMIT 1
  `

  const result = await pool.query(query, [nombre])

  if (result.rows.length === 0) {
    throw new Error('Credenciales inválidas')
  }

  const user = result.rows[0]

  const passwordValida = await bcrypt.compare(password, user.contrasena)

  if (!passwordValida) {
    throw new Error('Credenciales inválidas')
  }

  return {
    id: user.id,
    nombre: user.nombre,
    rol: user.rol
  }
}

module.exports = {
  login
}