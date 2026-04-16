const jwt = require('jsonwebtoken')
const authService = require('../services/authService')

/**
 * Autentica un usuario con credenciales previamente validadas.
 * Consulta el usuario en la base de datos, valida la contraseña
 * y genera un JWT firmado en una cookie HttpOnly.
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

    const isProduction = process.env.NODE_ENV === 'production'

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
    })

    return res.status(200).json({
      ok: true,
      message: 'Login exitoso'
    })
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Credenciales inválidas'
    })
  }
}

/**
 * Cierra la sesión del usuario eliminando la cookie de autenticación.
 * @param {import('express').Request} req Solicitud HTTP.
 * @param {import('express').Response} res Respuesta HTTP.
 * @param {import('express').NextFunction} next Middleware siguiente.
 * @returns {Promise<void>}
 */
const logout = async (req, res, next) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production'

    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict'
    })

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