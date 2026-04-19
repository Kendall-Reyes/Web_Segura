const pool = require('../config/db')

/**
 * Lista todos los productos registrados.
 * @returns {Promise<Array>}
 */
const listar = async () => {
  const query = `
    SELECT
      id,
      codigo,
      nombre,
      descripcion,
      cantidad,
      precio
    FROM productos
    ORDER BY id ASC
  `

  const result = await pool.query(query)
  return result.rows
}

/**
 * Obtiene un producto por su id.
 * @param {number} id Id del producto.
 * @returns {Promise<Object|null>}
 */
const obtenerPorId = async (id) => {
  const query = `
    SELECT
      id,
      codigo,
      nombre,
      descripcion,
      cantidad,
      precio
    FROM productos
    WHERE id = $1
    LIMIT 1
  `

  const result = await pool.query(query, [id])
  return result.rows[0] || null
}

/**
 * Crea un producto nuevo.
 * @param {{codigo:string,nombre:string,descripcion:string,cantidad:number,precio:number}} data Datos del producto.
 * @returns {Promise<Object>}
 */
const crear = async ({ codigo, nombre, descripcion, cantidad, precio }) => {
  const query = `
    INSERT INTO productos (codigo, nombre, descripcion, cantidad, precio)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      codigo,
      nombre,
      descripcion,
      cantidad,
      precio
  `

  try {
    const result = await pool.query(query, [
      codigo,
      nombre,
      descripcion ?? null,
      cantidad,
      precio
    ])

    return result.rows[0]
  } catch (error) {
    if (error.code === '23505') {
      const customError = new Error('Ya existe un producto con ese código')
      customError.statusCode = 409
      throw customError
    }

    throw error
  }
}

/**
 * Actualiza un producto existente.
 * @param {number} id Id del producto.
 * @param {{codigo?:string,nombre?:string,descripcion?:string,cantidad?:number,precio?:number}} data Datos a actualizar.
 * @returns {Promise<Object|null>}
 */
const actualizar = async (id, data) => {
  const productoActual = await obtenerPorId(id)

  if (!productoActual) {
    return null
  }

  const query = `
    UPDATE productos
    SET
      codigo = COALESCE($2, codigo),
      nombre = COALESCE($3, nombre),
      descripcion = COALESCE($4, descripcion),
      cantidad = COALESCE($5, cantidad),
      precio = COALESCE($6, precio)
    WHERE id = $1
    RETURNING
      id,
      codigo,
      nombre,
      descripcion,
      cantidad,
      precio
  `

  try {
    const result = await pool.query(query, [
      id,
      data.codigo ?? null,
      data.nombre ?? null,
      data.descripcion ?? null,
      data.cantidad ?? null,
      data.precio ?? null
    ])

    return result.rows[0] || null
  } catch (error) {
    if (error.code === '23505') {
      const customError = new Error('Ya existe un producto con ese código')
      customError.statusCode = 409
      throw customError
    }

    throw error
  }
}

/**
 * Elimina un producto por su id.
 * @param {number} id Id del producto.
 * @returns {Promise<boolean>}
 */
const eliminar = async (id) => {
  const query = `
    DELETE FROM productos
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