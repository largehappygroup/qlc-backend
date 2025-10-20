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
module.exports = {
    authenticate,
};