const {
    registration,
    login,
    changeSubscription,
    changeAvatar,
} = require("../services/authServices");

const registrationController = async (req, res) => {
    const { email, password } = req.body;
    const user = await registration(email, password);

    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
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
}