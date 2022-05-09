const config = require("config");
const jwt = require("jsonwebtoken");
const secretKey = config.get("jwtSecretKey");

const sign = (payload) => jwt.sign(payload, secretKey);
const verify = (payload) => jwt.verify(payload, secretKey);

module.exports = {
    sign,
    verify
};