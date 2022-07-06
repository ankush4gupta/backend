const app = require("./index");
const connect = require("./configs/db");
const port = process.env.PORT || 3008;
app.listen(port, async () => {
    try {
        await connect();
        console.log("listening port 3008")
    } catch (error) {
        console.error(error.message)
    }
})