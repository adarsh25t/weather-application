const jwt = require('jsonwebtoken');


// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // Check if token exists in headers
    if (!token) {
        return res.status(401).json({
            message: 'User not logged in'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'authentication failed'
            });
        }
        // If token is valid, add user to request object
        req.user = user;
        next();
    });
};

module.exports = authenticateToken