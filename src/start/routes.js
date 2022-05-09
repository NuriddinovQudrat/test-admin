const express = require("express");

const isAuth = require("../middlewares/isAuth");
const auth = require("../routes/auth");
const user = require("../routes/users");

const routes = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/auth", auth)
    app.use("/api/user", isAuth, user)
};

module.exports = routes