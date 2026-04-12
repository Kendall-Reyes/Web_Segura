const { ZodError } = require('zod')

/**
 * Valida request.body, request.params o request.query con un esquema Zod.
 * Guarda el resultado validado en req.validatedData[source].
 * @param {import('zod').ZodSchema} schema Esquema Zod a aplicar.
 * @param {'body'|'params'|'query'} source Fuente de datos a validar.
 * @returns {import('express').RequestHandler} Middleware de validación.
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const parsedData = schema.parse(req[source])

      req.validatedData = req.validatedData || {}
      req.validatedData[source] = parsedData

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          ok: false,
          message: 'Datos de entrada inválidos',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        })
      }

      next(error)
    }
  }
}

module.exports = validate