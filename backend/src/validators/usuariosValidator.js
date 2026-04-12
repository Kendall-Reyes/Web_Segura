const { z } = require('zod')

/**
 * Esquema para crear un usuario.
 */
const createUsuarioSchema = z.object({
  username: z
    .string({ message: 'El username es obligatorio' })
    .trim()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(50, 'El username no puede exceder 50 caracteres')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'El username contiene caracteres no permitidos'),

  password: z
    .string({ message: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres'),

  email: z
    .string({ message: 'El email es obligatorio' })
    .trim()
    .email('El email no es válido')
    .max(150, 'El email no puede exceder 150 caracteres'),

  rolId: z
    .number({ message: 'El rol es obligatorio' })
    .int('El rol debe ser un entero')
    .positive('El rol debe ser mayor que cero')
}).strict()

/**
 * Esquema para actualizar un usuario.
 */
const updateUsuarioSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(50, 'El username no puede exceder 50 caracteres')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'El username contiene caracteres no permitidos')
    .optional(),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres')
    .optional(),

  email: z
    .string()
    .trim()
    .email('El email no es válido')
    .max(150, 'El email no puede exceder 150 caracteres')
    .optional(),

  rolId: z
    .number()
    .int('El rol debe ser un entero')
    .positive('El rol debe ser mayor que cero')
    .optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: 'Debe enviar al menos un campo para actualizar'
})

/**
 * Esquema para validar el parámetro id de usuario.
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