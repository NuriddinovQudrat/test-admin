const config = require("config");
const jwt = require("jsonwebtoken");

const isAuth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token)
        return res.status(401).json({ errorMessage: "Unauthorized" });
    jwt.verify(token, config.get("jwtSecretKey"), (err, user) => {
        if(err)
            return res.status(401).json({ errorMessage: "Unauthorized" });
        req.decoded = user
        next();
    });
};

module.exports = isAuth;