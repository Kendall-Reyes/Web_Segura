const { z } = require('zod')

/**
 * Esquema para validar credenciales de inicio de sesión.
 */
const loginSchema = z.object({
  username: z
    .string({ message: 'El username es obligatorio' })
    .trim()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(50, 'El username no puede exceder 50 caracteres'),

  password: z
    .string({ message: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres')
}).strict()

module.exports = {
  loginSchema
}