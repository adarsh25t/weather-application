const prisma = require("../../config/prismaConfig");
const bcrypt = require('bcryptjs');


const createNewUser = async (req,res) => {

    try {

        // Validate the request body
        const { name, email, password } = req.body;
        if (!name ||!email ||!password) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }

        // Check if the email already exists
        const user = await prisma.user.findUnique({where: {email: email }})
        if (user) {
            return res.status(409).json({
                message: 'Email already exists',
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                favoritecities: []
            }
        });

        // Send a welcome email
        res.status(201).json({ 
            message: 'User created successfully',
            success: true,
            user: newUser
        });

        
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success: false
        });
    }
}

module.exports = {
    createNewUser
};