require('dotenv').config()
const jwt = require('jsonwebtoken')

console.log('JWT_SECRET:', JSON.stringify(process.env.JWT_SECRET))

const token = jwt.sign(
  { id: 1, nombre: 'admin01', rol: 'SuperAdmin' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
)

console.log(token)