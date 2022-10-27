const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../helpers/apiHelpers");
const {
    registrationController,
    loginController,
    subscriptionController,
    changeAvatarController,
    verificationController,
    repeatVerifyController,
} = require("../controllers/authController");
const {
    signUpValidation,
    loginValidation,
    logoutValidation,
    currentUserValidation,
    subscriptionValidation,
    tokenValidation,
    repeatVerifyValidation,
} = require("../midlewares/authMidleware");
const { uploadMidlewares } = require("../midlewares/uploadMidlewares")

router.post("/signup", signUpValidation, asyncWrapper(registrationController));
router.get("/verify/:verificationToken", asyncWrapper(verificationController));
router.post("/verify", repeatVerifyValidation, asyncWrapper(repeatVerifyController));
router.post("/login", loginValidation, asyncWrapper(loginController));
router.get("/logout", logoutValidation);
router.get("/current", currentUserValidation);
router.patch("/", subscriptionValidation, subscriptionController);
router.patch("/avatars", uploadMidlewares.single("avatar"), tokenValidation, asyncWrapper(changeAvatarController));

module.exports = { authRouter: router };