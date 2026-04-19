const express = require('express')
const router = express.Router()

const { verificarToken } = require('../middlewares/auth')
const { permitirRoles } = require('../middlewares/roles')
const validate = require('../validators/validate')

const {
  createProductoSchema,
  updateProductoSchema,
  productoIdParamSchema
} = require('../validators/productosValidator')

const {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
} = require('../controllers/productosController')

// GET /api/productos
router.get(
  '/',
  verificarToken,
  permitirRoles('Auditor', 'Registrador'),
  listar
)

// GET /api/productos/:id
router.get(
  '/:id',
  verificarToken,
  permitirRoles('Registrador'),
  validate(productoIdParamSchema, 'params'),
  obtener
)

// POST /api/productos
router.post(
  '/',
  verificarToken,
  permitirRoles('Registrador'),
  validate(createProductoSchema),
  crear
)

// PUT /api/productos/:id
router.put(
  '/:id',
  verificarToken,
  permitirRoles('Registrador'),
  validate(productoIdParamSchema, 'params'),
  validate(updateProductoSchema),
  actualizar
)

// DELETE /api/productos/:id
router.delete(
  '/:id',
  verificarToken,
  permitirRoles('Registrador'),
  validate(productoIdParamSchema, 'params'),
  eliminar
)

module.exports = router