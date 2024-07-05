
// Protected route to check login status
const protectedRoute = async (req,res) => {

    try {
        // Check if user is logged in
        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized',
                success: false
            });
        }
        
        // If user is logged in, return their data
        return res.status(200).json({
            message: 'Logged in successfully',
            success: true,
            data: req.user
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

module.exports = protectedRoute;