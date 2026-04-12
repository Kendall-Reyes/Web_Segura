const express = require('express')
const router = express.Router()
const { verificarToken } = require('../middlewares/auth')
const { soloSuperAdmin } = require('../middlewares/roles')
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

router.get('/', verificarToken, soloSuperAdmin, listar)

router.get('/:id', verificarToken, soloSuperAdmin, validate(usuarioIdParamSchema, 'params'), obtener)

router.post('/', verificarToken, soloSuperAdmin, validate(createUsuarioSchema), crear)

router.put(
  '/:id',
  verificarToken,
  soloSuperAdmin,
  validate(usuarioIdParamSchema, 'params'),
  validate(updateUsuarioSchema),
  actualizar
)

router.delete('/:id', verificarToken, soloSuperAdmin, validate(usuarioIdParamSchema, 'params'), eliminar)

module.exports = router