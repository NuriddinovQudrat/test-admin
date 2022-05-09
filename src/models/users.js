const { Schema, model } = require("mongoose");

const users = new Schema({
    firstname: {
        type:String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = model("User", users);