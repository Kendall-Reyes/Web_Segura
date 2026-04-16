const express = require('express')
const router = express.Router()

const { verificarToken } = require('../middlewares/auth')
const { permitirRoles } = require('../middlewares/roles')
const validate = require('../validators/validate')

const {
  createUsuarioSchema,
  updateUsuarioSchema,
  usuarioIdParamSchema
} = require('../validators/usuariosValidator')

const {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
} = require('../controllers/usuariosController')

// GET /api/usuarios
router.get(
  '/',
  verificarToken,
  permitirRoles('SuperAdmin', 'Auditor', 'Registrador'),
  listar
)

// GET /api/usuarios/:id
router.get(
  '/:id',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(usuarioIdParamSchema, 'params'),
  obtener
)

// POST /api/usuarios
router.post(
  '/',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(createUsuarioSchema),
  crear
)

// PUT /api/usuarios/:id
router.put(
  '/:id',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(usuarioIdParamSchema, 'params'),
  validate(updateUsuarioSchema),
  actualizar
)

// DELETE /api/usuarios/:id
router.delete(
  '/:id',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(usuarioIdParamSchema, 'params'),
  eliminar
)

module.exports = router