

const UserLogOut = (req, res) => {

    try {

        return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Successfully logged out " });

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            success: false
        });
    }
}

module.exports = UserLogOut;