const config = require("config");

const port = config.get("port")

const run = async(app) => {
    app.listen(port, () => {
        console.log(port)
    })
}


module.exports = run