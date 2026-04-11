// TODO - Stiven
// Verificar que req.user.rol sea el requerido
const soloSuperAdmin = (req, res, next) => {
    // Stiven implementa aquí
    next()
}

module.exports = { soloSuperAdmin }