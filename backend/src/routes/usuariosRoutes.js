const express = require('express')
const router = express.Router()
const { verificarToken } = require('../middlewares/auth')
const { soloSuperAdmin } = require('../middlewares/roles')

router.get('/', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Listar usuarios - pendiente' })
})

router.post('/', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Crear usuario - pendiente' })
})

router.put('/:id', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Editar usuario - pendiente' })
})

router.delete('/:id', verificarToken, soloSuperAdmin, (req, res) => {
    res.json({ message: 'Eliminar usuario - pendiente' })
})

module.exports = router