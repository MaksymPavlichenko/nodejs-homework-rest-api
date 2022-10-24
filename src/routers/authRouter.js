const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../helpers/apiHelpers");
const {
    registrationController,
    loginController,
    subscriptionController,
    changeAvatarController,
} = require("../controllers/authController");
const {
    signUpValidation,
    loginValidation,
    logoutValidation,
    currentUserValidation,
    subscriptionValidation,
    tokenValidation,
} = require("../midlewares/authMidleware");
const { uploadMidlewares } = require("../midlewares/uploadMidlewares")

router.post("/signup", signUpValidation, asyncWrapper(registrationController));
router.post("/login", loginValidation, asyncWrapper(loginController));
router.get("/logout", logoutValidation);
router.get("/current", currentUserValidation);
router.patch("/", subscriptionValidation, subscriptionController);
router.patch("/avatars", uploadMidlewares.single("avatar"), tokenValidation, asyncWrapper(changeAvatarController));

module.exports = { authRouter: router };