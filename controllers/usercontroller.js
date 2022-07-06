const express = require("express");
const { findById } = require("../models/user.model");
const router = express.Router();
const User = require("../models/user.model");

//  finding single user by id
router.get("/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id).lean().exec();
        if (!user) {
            return res.status(400).send({})
        }
        return res.status(201).send(user)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// updating user's data after applied for job

router.patch("/:id", async (req, res) => {
    try {
        let updateduser = await User.updateOne(
            { _id: req.params.id },
            { $push: { applyjob: req.body } }
        );
        if (updateduser){

            let user =  await findById(req.params.id).lean().exec()
            return res.status(200).send({ updateduser,user});
        }
        res.send("Not able to apply")


    } catch (error) {
        res.status(500).send({ message: "error", error: error.message })
    }
})
module.exports = router