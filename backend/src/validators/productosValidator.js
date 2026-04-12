const { z } = require('zod')

/**
 * Esquema para crear un producto.
 */
const createProductoSchema = z.object({
  codigo: z
    .string({ message: 'El código es obligatorio' })
    .trim()
    .min(2, 'El código debe tener al menos 2 caracteres')
    .max(30, 'El código no puede exceder 30 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'El código debe ser alfanumérico'),

  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),

  descripcion: z
    .string({ message: 'La descripción es obligatoria' })
    .trim()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),

  cantidad: z
    .number({ message: 'La cantidad debe ser numérica' })
    .int('La cantidad debe ser un entero')
    .min(0, 'La cantidad no puede ser negativa')
    .max(1000000, 'La cantidad excede el máximo permitido'),

  precio: z
    .number({ message: 'El precio debe ser numérico' })
    .min(0, 'El precio no puede ser negativo')
    .max(999999999.99, 'El precio excede el máximo permitido')
}).strict()

/**
 * Esquema para actualizar un producto.
 */
const updateProductoSchema = createProductoSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  })

/**
 * Esquema para validar el parámetro id de producto.
 */
const productoIdParamSchema = z.object({
  id: z.coerce
    .number({ message: 'El id debe ser numérico' })
    .int('El id debe ser un entero')
    .positive('El id debe ser mayor que cero')
}).strict()

module.exports = {
  createProductoSchema,
  updateProductoSchema,
  productoIdParamSchema
}