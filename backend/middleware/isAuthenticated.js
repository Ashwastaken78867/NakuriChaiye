import jwt from "jsonwebtoken";

// Middleware to check user authentication
const isAuthenticated = async (req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Authentication failed",
            success: false
        });
    }
};

export default isAuthenticated;
