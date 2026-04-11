const express = require('express')
const router = express.Router()
const { verificarToken } = require('../middlewares/auth')
const { soloSuperAdmin } = require('../middlewares/roles')

// GET /api/productos
router.get('/', verificarToken, (req, res) => {
    res.json({ message: 'Listar productos - pendiente' })
})

// POST /api/productos
router.post('/', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Crear producto - pendiente' })
})

// PUT /api/productos/:id
router.put('/:id', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Editar producto - pendiente' })
})

// DELETE /api/productos/:id
router.delete('/:id', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Eliminar producto - pendiente' })
})

module.exports = router