const mongoose = require("mongoose");
const CompanySchema = mongoose.Schema({
    companyName: { type: String, required: true },
    logo: { type: String },
    role: { type: String, required: true },
    location: { type: String, required: true, },
    CTC: { type: Number, required: true },
    jobSummary: [],
    jobType: { type: String }


})
module.exports = mongoose.model("company", CompanySchema);