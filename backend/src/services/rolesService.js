const pool = require('../config/db')

/**
 * Lista todos los roles registrados.
 * @returns {Promise<Array<{id:number, role:string}>>}
 */
const listar = async () => {
  const query = `
    SELECT id, role
    FROM roles
    ORDER BY id ASC
  `

  const result = await pool.query(query)
  return result.rows
}

/**
 * Obtiene un rol por su id.
 * @param {number} id Id del rol.
 * @returns {Promise<{id:number, role:string} | null>}
 */
const obtenerPorId = async (id) => {
  const query = `
    SELECT id, role
    FROM roles
    WHERE id = $1
    LIMIT 1
  `

  const result = await pool.query(query, [id])
  return result.rows[0] || null
}

/**
 * Obtiene un rol por su nombre sin importar mayúsculas/minúsculas.
 * @param {string} role Nombre del rol.
 * @returns {Promise<{id:number, role:string} | null>}
 */
const obtenerPorNombre = async (role) => {
  const query = `
    SELECT id, role
    FROM roles
    WHERE lower(role) = lower($1)
    LIMIT 1
  `

  const result = await pool.query(query, [role])
  return result.rows[0] || null
}

/**
 * Crea un nuevo rol normalizando su nombre a minúscula.
 * @param {{role:string}} data Datos del rol.
 * @returns {Promise<{id:number, role:string}>}
 */
const crear = async ({ role }) => {
  const roleNormalizado = role.trim().toLowerCase()

  const existente = await obtenerPorNombre(roleNormalizado)

  if (existente) {
    const error = new Error('El rol ya existe')
    error.statusCode = 409
    throw error
  }

  const query = `
    INSERT INTO roles (role)
    VALUES ($1)
    RETURNING id, role
  `

  const result = await pool.query(query, [roleNormalizado])
  return result.rows[0]
}

/**
 * Actualiza un rol existente normalizando el nombre si fue enviado.
 * @param {number} id Id del rol.
 * @param {{role?:string}} data Datos a actualizar.
 * @returns {Promise<{id:number, role:string} | null>}
 */
const actualizar = async (id, { role }) => {
  const rolActual = await obtenerPorId(id)

  if (!rolActual) {
    return null
  }

  let roleNormalizado = null

  if (role) {
    roleNormalizado = role.trim().toLowerCase()

    const rolDuplicado = await obtenerPorNombre(roleNormalizado)

    if (rolDuplicado && rolDuplicado.id !== id) {
      const error = new Error('Ya existe otro rol con ese nombre')
      error.statusCode = 409
      throw error
    }
  }

  const query = `
    UPDATE roles
    SET role = COALESCE($2, role)
    WHERE id = $1
    RETURNING id, role
  `

  const result = await pool.query(query, [id, roleNormalizado])
  return result.rows[0] || null
}

/**
 * Elimina un rol si no está siendo usado por usuarios.
 * @param {number} id Id del rol.
 * @returns {Promise<{eliminado:boolean, motivo?:string}>}
 */
const eliminar = async (id) => {
  const rolActual = await obtenerPorId(id)

  if (!rolActual) {
    return { eliminado: false, motivo: 'NO_ENCONTRADO' }
  }

  const queryUso = `
    SELECT COUNT(*)::int AS total
    FROM usuarios
    WHERE rol_id = $1
  `

  const usoResult = await pool.query(queryUso, [id])
  const totalUso = usoResult.rows[0].total

  if (totalUso > 0) {
    return { eliminado: false, motivo: 'EN_USO' }
  }

  const queryDelete = `
    DELETE FROM roles
    WHERE id = $1
  `

  await pool.query(queryDelete, [id])

  return { eliminado: true }
}

module.exports = {
  listar,
  obtenerPorId,
  obtenerPorNombre,
  crear,
  actualizar,
  eliminar
}