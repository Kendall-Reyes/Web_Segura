const express = require('express')
const router = express.Router()
const { loginLimiter } = require('../middlewares/rateLimiter')
// const { login, logout } = require('../controllers/authController')

// POST /api/auth/login
router.post('/login', loginLimiter, (req, res) => {
    res.json({ message: 'Login - pendiente implementación' })
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout - pendiente implementación' })
})

module.exports = router