const express = require('express')
const router = express.Router()
const { loginLimiter } = require('../middlewares/rateLimiter')
const validate = require('../validators/validate')
const { loginSchema } = require('../validators/authValidator')
const { login, logout } = require('../controllers/authController')

// POST /api/auth/login
router.post('/login', loginLimiter, validate(loginSchema), login)

// POST /api/auth/logout
router.post('/logout', logout)

module.exports = router