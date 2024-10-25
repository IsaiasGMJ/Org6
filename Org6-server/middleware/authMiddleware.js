// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Asegúrate de que la ruta sea correcta

const protect = async (req, res, next) => {
    let token;

    // Verificar el encabezado de autorización
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token de Bearer
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token y decodificar
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Agregar el usuario a la solicitud
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    // Si no hay token
    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

module.exports = { protect };
