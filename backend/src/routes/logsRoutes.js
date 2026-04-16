const express = require('express')
const router = express.Router()
const { verificarToken } = require('../middlewares/auth')
const { soloSuperAdmin } = require('../middlewares/roles')
const { listarLogs } = require('../controllers/logsController')

/**
 * Lista los logs del sistema.
 */
router.get('/', verificarToken, soloSuperAdmin, listarLogs)

module.exports = router