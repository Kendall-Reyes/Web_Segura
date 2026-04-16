const express = require('express')
const router = express.Router()

const { verificarToken } = require('../middlewares/auth')
const { permitirRoles } = require('../middlewares/roles')
const { listarLogs } = require('../controllers/logsController')

// GET /api/logs
router.get(
  '/',
  verificarToken,
  permitirRoles('SuperAdmin'),
  listarLogs
)

module.exports = router