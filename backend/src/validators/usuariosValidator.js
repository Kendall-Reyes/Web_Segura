const { z } = require('zod')

/**
 * Esquema para crear un usuario.
 */
const createUsuarioSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),

  email: z
    .string({ message: 'El email es obligatorio' })
    .trim()
    .email('El email no es válido')
    .max(150, 'El email no puede exceder 150 caracteres'),

  password: z
    .string({ message: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres'),

  rolId: z.coerce
    .number({ message: 'El rol es obligatorio' })
    .int('El rol debe ser un entero')
    .positive('El rol debe ser mayor que cero')
}).strict()

/**
 * Esquema para actualizar un usuario.
 */
const updateUsuarioSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .optional(),

  email: z
    .string()
    .trim()
    .email('El email no es válido')
    .max(150, 'El email no puede exceder 150 caracteres')
    .optional(),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres')
    .optional(),

  rolId: z.coerce
    .number()
    .int('El rol debe ser un entero')
    .positive('El rol debe ser mayor que cero')
    .optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: 'Debe enviar al menos un campo para actualizar'
})

/**
 * Esquema para validar el id del usuario.
 */
const usuarioIdParamSchema = z.object({
  id: z.coerce
    .number({ message: 'El id debe ser numérico' })
    .int('El id debe ser un entero')
    .positive('El id debe ser mayor que cero')
}).strict()

module.exports = {
  createUsuarioSchema,
  updateUsuarioSchema,
  usuarioIdParamSchema
}