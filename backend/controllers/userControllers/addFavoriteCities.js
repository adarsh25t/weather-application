const prisma = require("../../config/prismaConfig");


const addFavoriteCity = async (req, res) => {
    try {

        const { city } = req.body;

        // Validate city name
        if (!city) {
            return res.status(400).json({
                message: 'City is required',
                success: false
            });
        }

        // Add city to favorites array
        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                favoritecities: {
                    push: city
                }
            }
        })

        res.status(201).json({
            message: 'City added to favorites',
            success: true
        })

    } catch (error) {
        return res.status(200).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = {
    addFavoriteCity
};