const User = require("../models/User.js");

/**
 * checks for the presence of VUNetID in the request headers
 * @param {*} req - request object
 * @param {*} res - response object
 * @param {*} next - next middleware function
 * @returns - proceeds to next middleware if authenticated, else returns 401 Unauthorized
 */
const authenticate = (req, res, next) => {
    const vuNetId = req.headers["remote-user-vunetid"];
    if (!vuNetId) {
        return res
            .status(401)
            .send({ message: "Unauthorized: Missing VUNetID." });
    }
    next();
};

/**
 * checks if the user has one of the required roles
 * @param {*} roles - array of roles allowed to access the route
 * @returns - middleware function that verifies user role
 */
const requireRole = async (roles) => {
    return async (req, res, next) => {
        try {
            const vuNetId = req.headers["remote-user-vunetid"];
            const user = await User.findOne(
                { vuNetId: vuNetId },
                { role: 1, _id: 0 }
            );
            if (!user || !roles.includes(user.role)) {
                return res
                    .status(403)
                    .send({ message: "Forbidden: Insufficient permissions." });
            }
            next();
        } catch (err) {
            console.error("Error in role verification:", err);
            return res.status(500).send({ message: "Internal server error." });
        }
    };
};

module.exports = {
    authenticate,
    requireRole,
};
