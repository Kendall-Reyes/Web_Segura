const jwt = require('jsonwebtoken')
const authService = require('../services/authService')
const logService = require('../services/logService')
const { EXITOSO, FALLIDO } = require('../constants/logResults')

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

    await logService.registrarLog({
      usuarioId: user.id,
      accion: 'LOGIN',
      detalle: `Inicio de sesión exitoso para el usuario ${user.nombre}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      }
    })
  } catch (error) {
    await logService.registrarLog({
      accion: 'LOGIN',
      detalle: `Intento fallido de inicio de sesión para el email ${req.validatedData?.body?.email || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

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

    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LOGOUT',
      detalle: `Cierre de sesión del usuario ${req.user?.nombre || 'desconocido'}`,
      ipOrigen: req.ip,
      resultado: EXITOSO
    })

    return res.status(200).json({
      ok: true,
      message: 'Logout exitoso'
    })
  } catch (error) {
    await logService.registrarLog({
      usuarioId: req.user?.id || null,
      accion: 'LOGOUT',
      detalle: `Error durante el cierre de sesión: ${error.message}`,
      ipOrigen: req.ip,
      resultado: FALLIDO
    })

    next(error)
  }
}

module.exports = {
  login,
  logout
}