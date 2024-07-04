const jwt = require('jsonwebtoken');

const generateJWTToken = (user) => {
    
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return token;
}



module.exports = {
    generateJWTToken,
};