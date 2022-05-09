const { Router } = require("express")
const router = Router()
const bcrypt = require("bcrypt")

const Users = require("../models/users")

router.get("/", async(req, res) => {
    try {
        const { skip, limit, username } = req.query

        const sk = skip === 1 ? 1 : skip

        const users = username ? await Users.findOne({ username }) : await Users.find().skip(skip).limit(sk * limit)

        res.status(200).json({ users })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
})

router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params
        const { firstname, password } = req.body
        const Schema = Joi.object({
            password: Joi.string().required(),
            firstname: Joi.string().required()
        })

        const { error } = Schema.validate({ password, firstname })
        if(error)
            return res.status(400).json({ message: error.message })
        
        const pass = await bcrypt.hash(password, 12)
        
        await Users.findByIdAndUpdate(id, {
            $set: {
                password: pass,
                firstname
            }
        })
        res.status(200).json({ message: "Updated" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params
        await Users.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
})

module.exports = router