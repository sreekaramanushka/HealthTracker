const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // Provide a robust fallback key if process.env.JWT_SECRET is undefined to prevent crash
    const secret = process.env.JWT_SECRET || 'health_tracker_default_jwt_secret_key_development_prod_fallback';
    
    if (!process.env.JWT_SECRET) {
        console.warn('Warning: JWT_SECRET environment variable is missing. Using fallback key.');
    }

    return jwt.sign({ id }, secret, {
        expiresIn: '7d',
    });
};

module.exports = generateToken;
