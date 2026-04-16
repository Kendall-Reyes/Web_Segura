const { z } = require('zod')

/**
 * Esquema para validar credenciales de inicio de sesión.
 */
const loginSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es obligatorio' })
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),

  password: z
    .string({ message: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres')
}).strict()

module.exports = {
  loginSchema
}