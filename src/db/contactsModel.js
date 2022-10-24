const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Set name"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

const Contact = mongoose.model("contact", contactsSchema);

module.export = {
    Contact,
}