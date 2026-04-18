const { z } = require('zod')

/**
 * Esquema para crear un rol.
 */
const createRolSchema = z.object({
  role: z
    .string({ message: 'El nombre del rol es obligatorio' })
    .trim()
    .min(3, 'El nombre del rol debe tener al menos 3 caracteres')
    .max(50, 'El nombre del rol no puede exceder 50 caracteres')
}).strict()

/**
 * Esquema para actualizar un rol.
 */
const updateRolSchema = z.object({
  role: z
    .string()
    .trim()
    .min(3, 'El nombre del rol debe tener al menos 3 caracteres')
    .max(50, 'El nombre del rol no puede exceder 50 caracteres')
    .optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: 'Debe enviar al menos un campo para actualizar'
})

/**
 * Esquema para validar el id del rol.
 */
const rolIdParamSchema = z.object({
  id: z.coerce
    .number({ message: 'El id debe ser numérico' })
    .int('El id debe ser un entero')
    .positive('El id debe ser mayor que cero')
}).strict()

module.exports = {
  createRolSchema,
  updateRolSchema,
  rolIdParamSchema
}