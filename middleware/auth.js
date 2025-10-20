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