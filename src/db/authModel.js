const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "bussiness"],
        default: "starter",
    },
    avatarUrl: {
        type: String,
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
    },
});

authSchema.pre("save", async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = mongoose.model("user", authSchema);

module.exports = {
    User,
};