const mongoose = require("mongoose");
module.exports = () => {
    mongoose.connect("mongodb+srv://jobportal:ankush123@cluster0.yxy7j.mongodb.net/?retryWrites=true&w=majority")
}