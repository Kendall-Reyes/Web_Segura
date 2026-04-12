const express = require('express')
const router = express.Router()
const { verificarToken } = require('../middlewares/auth')
const { soloSuperAdmin } = require('../middlewares/roles')
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
router.get('/', verificarToken, listar)

// GET /api/productos/:id
router.get('/:id', verificarToken, validate(productoIdParamSchema, 'params'), obtener)

// POST /api/productos
router.post('/', verificarToken, soloSuperAdmin, validate(createProductoSchema), crear)

// PUT /api/productos/:id
router.put(
  '/:id',
  verificarToken,
  soloSuperAdmin,
  validate(productoIdParamSchema, 'params'),
  validate(updateProductoSchema),
  actualizar
)

// DELETE /api/productos/:id
router.delete('/:id', verificarToken, soloSuperAdmin, validate(productoIdParamSchema, 'params'), eliminar)

module.exports = router