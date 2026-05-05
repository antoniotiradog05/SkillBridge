const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Leer el token del header Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado o formato incorrecto.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadir payload del usuario a la request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;
