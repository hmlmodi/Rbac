const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');
dotenv.config();

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        // console.log("Received Token:", token);

        if (!token) return res.status(401).json({ error: 'Access denied' });

        const extractedToken = token.startsWith("Bearer ") ? token.slice(7) : token;
        // console.log("Extracted Token:", extractedToken);

        const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(400).json({ error: 'Invalid token' });
    }
};

const authorize = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.userId).populate('role');
            if (!user || !user.role) {
                return res.status(403).json({ error: 'Access forbidden' });
            }

            if (!requiredRoles.includes(user.role.roleName)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }

            next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
};

module.exports = { authenticate, authorize };
