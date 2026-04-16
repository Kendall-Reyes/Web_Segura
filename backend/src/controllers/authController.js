const jwt = require('jsonwebtoken')
const authService = require('../services/authService')

/**
 * Autentica un usuario con credenciales previamente validadas.
 * Consulta el usuario en la base de datos, valida la contraseña
 * y genera un JWT firmado si las credenciales son correctas.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const login = async (req, res, next) => {
  try {
    const credentials = req.validatedData?.body
    const user = await authService.login(credentials)

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).json({
      ok: true,
      message: 'Login exitoso',
      token
    })
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Credenciales inválidas'
    })
  }
}

/**
 * Gestiona el cierre de sesión del usuario.
 * Actualmente responde de forma básica y se preparará después
 * para limpiar la cookie HttpOnly cuando el login use cookies.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const logout = async (req, res, next) => {
  try {
    return res.status(200).json({
      ok: true,
      message: 'Logout exitoso'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  logout
}