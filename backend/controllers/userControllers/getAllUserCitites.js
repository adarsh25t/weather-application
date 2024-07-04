const prisma = require("../../config/prismaConfig");


const getAllUserCities = async (req, res) => {
    try {

        // Fetch all user cities from the database
        const userCities = await prisma.user.findUnique({ where: { id: req.user.id } })

        // Check if user exists
        if (!userCities) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            message: "User's cities fetched successfully",
            success: true,
            data: {
                cities: userCities?.favoritecities
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = getAllUserCities;