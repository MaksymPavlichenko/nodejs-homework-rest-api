const nodemailer = require("nodemailer");
require("dotenv").config();
const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "maksstair@gmail.com",
        pass: process.env.API_KEY,
    },
};
const trasporter = nodemailer.createTransport(config);

module.exports = {
    trasporter,
}