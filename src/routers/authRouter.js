const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../helpers/apiHelpers");
const {
    registrationController,
    loginController,
    subscriptionController,
} = require("../controllers/authController");
const {
    signUpValidation,
    loginValidation,
    logoutValidation,
    currentUserValidation,
    subscriptionValidation,
} = require("../midlewares/authMidleware");

router.post("/signup", signUpValidation, asyncWrapper(registrationController));
router.post("/login", loginValidation, asyncWrapper(loginController));
router.get("/logout", logoutValidation);
router.get("/current", currentUserValidation);
router.patch("/", subscriptionValidation, subscriptionController);

module.exports = { authRouter: router };