const express = require('express')
const router = express.Router()

const { verificarToken } = require('../middlewares/auth')
const { permitirRoles } = require('../middlewares/roles')
const validate = require('../validators/validate')

const {
  createRolSchema,
  updateRolSchema,
  rolIdParamSchema
} = require('../validators/rolesValidator')

const {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
} = require('../controllers/rolesController')

// GET /api/roles
router.get(
  '/',
  verificarToken,
  permitirRoles('SuperAdmin'),
  listar
)

// GET /api/roles/:id
router.get(
  '/:id',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(rolIdParamSchema, 'params'),
  obtener
)

// POST /api/roles
router.post(
  '/',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(createRolSchema),
  crear
)

// PUT /api/roles/:id
router.put(
  '/:id',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(rolIdParamSchema, 'params'),
  validate(updateRolSchema),
  actualizar
)

// DELETE /api/roles/:id
router.delete(
  '/:id',
  verificarToken,
  permitirRoles('SuperAdmin'),
  validate(rolIdParamSchema, 'params'),
  eliminar
)

module.exports = router