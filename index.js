const express = require("express");
const app = express();
app.use(express.json())
const { register, login } = require("./controllers/Authentication");
const companycontroller = require("./controllers/company.controller")
const usercontroller = require("./controllers/usercontroller");
// login and registration
app.post("/register", register);
app.post("/login", login);
app.use("/company", companycontroller)
app.use("/user", usercontroller)

module.exports = app