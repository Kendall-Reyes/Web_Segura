const express = require('express')
const router = express.Router()
const { verificarToken } = require('../middlewares/auth')
const { soloSuperAdmin } = require('../middlewares/roles')

// GET /api/logs
router.get('/', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Ver logs - pendiente' })
})

module.exports = router