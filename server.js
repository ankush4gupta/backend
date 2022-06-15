const app =  require("./index");
const connect =  require("./configs/db");
const port = 3008
app.listen(port,async()=>{
    try {
        await connect();
        console.log("listening on port 3008")
    } catch (error) {
        console.error(error.message)
    }
})