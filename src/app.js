const logger = require("morgan");
const morgan = require("morgan");
const express = require("express");

const app = express();

const { contactsRouter } = require("./routers/contactsRouter");
const { authRouter } = require("./routers/authRouter");
const { uploadPatch } = require("./midlewares/uploadMidlewares");
const { errorHandler } = require("./helpers/apiHelpers");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/avatars", express.static(uploadPatch));

app.use(errorHandler);

module.exports = {
    app,
};