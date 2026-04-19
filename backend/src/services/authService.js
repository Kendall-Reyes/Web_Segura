const bcrypt = require('bcrypt')
const pool = require('../config/db')

/**
 * Busca un usuario por nombre, valida su contraseña y devuelve su rol real.
 * @param {{ nombre: string, password: string }} credentials Credenciales del usuario.
 * @returns {Promise<{ id: number, nombre: string, rol: string }>} Usuario autenticado.
 */
const login = async ({ nombre, password }) => {
  const query = `
    SELECT
      u.id,
      u.nombre,
      u.contrasena,
      r.role AS rol
    FROM usuarios u
    INNER JOIN roles r ON r.id = u.rol_id
    WHERE u.nombre = $1
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