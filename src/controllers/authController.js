const {
    registration,
    login,
    changeSubscription,
    changeAvatar,
    verification,
    repeatVerify,
} = require("../services/authServices");

const registrationController = async (req, res) => {
    const { email, password } = req.body;
    await registration(email, password);

    res.json({
        message: "We have sent a link to your email address, please confirm your email by clicking on the link",
    });
};

const verificationController = async (req, res) => {
    const { verificationToken } = req.params;
  
    const user = await verification(verificationToken);
    res.json({
        message: "Verification successful",
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const repeatVerifyController = async (req, res) => {
    const { email } = req.body;
    await repeatVerify(email);
  
    res.json({ message: "Verification email sent" });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await login(email, password);

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const subscriptionController = async (req, res) => {
    const user = req.user;
    const { subscription } = req.body;

    await changeSubscription(user, subscription);

    res.status(200).json({ subscription: subscription });
};

const changeAvatarController = async (req, res) => {
    const id = req.user._id;
    const avatarUrl = await changeAvatar(id, req.file);
    res.json({ avatarUrl });
}

module.exports = {
    registrationController,
    loginController,
    subscriptionController,
    changeAvatarController,
    verificationController,
    repeatVerifyController,
}