const prisma = require("../../config/prismaConfig");
const bcrypt = require('bcryptjs');
const { generateJWTToken } = require("../../middleware/generateToken");

const LoginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validate input data
        if (!email || !password) {
            return res.status(200).json({
                message: " Please enter your email address and password",
                success: false
            });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email: email } })
        if (!user) {
            return res.status(200).json({
                message: "User not found",
                success: false
            });
        }

        // compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(200).json({
                message: "Incorrect password",
                success: false
            });
        }

        // Create JWT token
        const token = generateJWTToken(user);

        // send the response
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
        })
        .status(200)
        .json({
            message: "Logged in successfully",
            success: true,
            data: user
        });

    } catch (error) {
        return res.status(200).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = LoginUser;