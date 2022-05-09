const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const Users = require("../models/users");
const isAuth = require("../middlewares/isAuth");
const Joi = require("joi");

router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body
        
        const user = await Users.findOne({ username });
        
        if(!user)
            return res.status(401).json({ message: "Uncorrected username or password" });

        const pass = await bcrypt.compare(password, user.password);
        if(!pass)
            return res.status(401).json({ message: "Uncorrected username or password" });

        const token = jwt.sign({ userId: user._id });
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    };
});

router.post("/registration", isAuth, async(req, res) => {
    try {
        const { username, password, firstname } = req.body

        const Schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            firstname: Joi.string().required()
        })

        const { error } = Schema.validate({ username, password, firstname })
        if(error)
            return res.status(400).json({ message: error.message })
        
        const user = await Users.findOne({ username });
        
        if(user)
            return res.status(400).json({ message: "User already has been occupied" });
        const pass = await bcrypt.hash(password, 12)
        const newUser = new Users({
            firstname,
            username,
            password: pass
        })
        await newUser.save()
        const token = jwt.sign({ userId: newUser._id });
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    };
});

module.exports = router