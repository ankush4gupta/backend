const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: false },
    applyjob: [{
        jobId: { type: String },
        role: { type: String },
        companyName: { type: String },
        location: { type: String },
        CTC: { type: Number }
    }],


})

UserSchema.pre("save", function () {
    if (!this.isModified("password")) return next;

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return hash;
});
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", UserSchema);