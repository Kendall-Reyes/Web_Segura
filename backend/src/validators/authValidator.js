const { z } = require('zod')

/**
 * Esquema para validar credenciales de inicio de sesión.
 */
const loginSchema = z.object({
  email: z
    .string({ message: 'El email es obligatorio' })
    .trim()
    .email('El email no es válido')
    .max(150),
    
  password: z
    .string({ message: 'La contraseña es obligatoria' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder 72 caracteres')
}).strict()

module.exports = {
  loginSchema
}