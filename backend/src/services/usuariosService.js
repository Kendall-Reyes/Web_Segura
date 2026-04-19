const bcrypt = require('bcrypt')
const pool = require('../config/db')

/**
 * Lista todos los usuarios con su rol asociado.
 * @returns {Promise<Array>}
 */
const listar = async () => {
  const query = `
    SELECT
      u.id,
      u.nombre,
      u.email,
      r.role AS rol,
      u.ultimo_login,
      u.rol_id AS "rolId"
    FROM usuarios u
    INNER JOIN roles r ON r.id = u.rol_id
    ORDER BY u.id ASC
  `

  const result = await pool.query(query)
  return result.rows
}

/**
 * Obtiene un usuario por su id con el rol asociado.
 * @param {number} id Id del usuario.
 * @returns {Promise<Object|null>}
 */
const obtenerPorId = async (id) => {
  const query = `
    SELECT
      u.id,
      u.nombre,
      u.email,
      r.role AS rol,
      u.ultimo_login,
      u.rol_id AS "rolId"
    FROM usuarios u
    INNER JOIN roles r ON r.id = u.rol_id
    WHERE u.id = $1
    LIMIT 1
  `

  const result = await pool.query(query, [id])
  return result.rows[0] || null
}

/**
 * Crea un usuario nuevo con contraseña hasheada.
 * @param {{ nombre: string, email: string, password: string, rolId: number }} data Datos del usuario.
 * @returns {Promise<Object>}
 */
const crear = async ({ nombre, email, password, rolId }) => {
  const hash = await bcrypt.hash(password, 12)

  const query = `
    INSERT INTO usuarios (nombre, email, contrasena, rol_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `

  try {
    const result = await pool.query(query, [nombre, email, hash, rolId])
    return await obtenerPorId(result.rows[0].id)
  } catch (error) {
    if (error.code === '23505') {
      const customError = new Error('Ya existe un usuario con ese email')
      customError.statusCode = 409
      throw customError
    }

    if (error.code === '23503') {
      const customError = new Error('El rol seleccionado no existe')
      customError.statusCode = 400
      throw customError
    }

    throw error
  }
}

/**
 * Actualiza un usuario existente.
 * @param {number} id Id del usuario.
 * @param {{ nombre?: string, email?: string, password?: string, rolId?: number }} data Datos a actualizar.
 * @returns {Promise<Object|null>}
 */
const actualizar = async (id, data) => {
  const usuarioActual = await obtenerPorId(id)

  if (!usuarioActual) {
    return null
  }

  let hash = null

  if (data.password) {
    hash = await bcrypt.hash(data.password, 12)
  }

  const query = `
    UPDATE usuarios
    SET
      nombre = COALESCE($2, nombre),
      email = COALESCE($3, email),
      contrasena = COALESCE($4, contrasena),
      rol_id = COALESCE($5, rol_id)
    WHERE id = $1
    RETURNING id
  `

  try {
    const result = await pool.query(query, [
      id,
      data.nombre ?? null,
      data.email ?? null,
      hash,
      data.rolId ?? null
    ])

    if (result.rows.length === 0) {
      return null
    }

    return await obtenerPorId(id)
  } catch (error) {
    if (error.code === '23505') {
      const customError = new Error('Ya existe un usuario con ese email')
      customError.statusCode = 409
      throw customError
    }

    if (error.code === '23503') {
      const customError = new Error('El rol seleccionado no existe')
      customError.statusCode = 400
      throw customError
    }

    throw error
  }
}

/**
 * Elimina un usuario existente.
 * @param {number} id Id del usuario.
 * @returns {Promise<boolean>}
 */
const eliminar = async (id) => {
  const query = `
    DELETE FROM usuarios
    WHERE id = $1
    RETURNING id
  `

  const result = await pool.query(query, [id])
  return result.rows.length > 0
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
}