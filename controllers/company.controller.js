const express = require("express");
const Company = require("../models/company.model");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let company = await Company.create(req.body);
        res.send(company)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// getting all companies details
router.get("/", async (req, res) => {
    // setting up default page number and items per page and sorting method by accending method
    const page = req.query.page || 1;
    const item = req.query.items || 10;
    let sort = req.query.sort || "sort_acc"
    try {

        let filter = {};
        if (req.query.loaction) {
            filter.loaction = { $in: req.query.loaction }
        }
        if (req.query.role) {
            filter.role = { $in: req.query.role }
        }
        if (sort == "sort_acc") {
            sort = { "discount_price": 1 }
        } else {
            sort = { "discount_price": -1 }
        }
        let companies = await Company.find(filter, { role: 1, companyName: 1, location: 1, logo: 1, CTC: 1 }).skip((page - 1) * item).sort(sort).limit(item).lean().exec();
        // let companies = 
        let pagecount = await Company.find(filter).countDocuments()
        pagecount = Math.ceil(pagecount / item)
        res.status(201).send({ companies, pagecount })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
router.get("/:id", async (req, res) => {
    try {
        let company = await Company.findById(req.params.id).lean().exec();
        if (!company) {
            return res.status(400).send({})
        }
        return res.status(201).send(company)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
module.exports = router