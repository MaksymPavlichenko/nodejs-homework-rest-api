const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
require("dotenv").config();
const {
    NotAutorizedError,
    RegistrationConflictError,
} = require("../helpers/errors");
const { User } = require("../db/authModel");
const {
    uploadPatch,
    downloadPatch,
} = require("../midlewares/uploadMidlewares");
const registration = async (email, password) => {
    const dublicateUser = await User.findOne({ email });
    
    if (dublicateUser) {
        throw new RegistrationConflictError("Email in use");
    }
  
    const user = new User({
      email,
      password,
      avatarUrl: gravatar.url(email),
    });
    await user.save();
    return user;
};
  
const login = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new NotAutorizedError("Email or password is wrong");
    }
  
    if (!(await bcrypt.compare(password, user.password))) {
        throw new NotAutorizedError("Email or password is wrong");
    }
  
    const token = jsonwebtoken.sign(
        {
            _id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET
    );
  
    await User.findByIdAndUpdate(user.id, {
        $set: { token },
    });
  
    return { token, user };
};
  
const changeSubscription = async (user, subscription) => {
    await User.findOneAndUpdate(
        { _id: user._id },
        {
            $set: { subscription: subscription },
        }
    );
};
const changeAvatar = async (_id, file) => {
    Jimp.read(`${uploadPatch}/${file.filename}`)
        .then((avatar) => {
            return avatar.resize(250, 250).write(`${downloadPatch}/${file.filename}`);
        })
        .catch((err) => {
            console.error(err);
        });
  
    const avatarURL = `http://localhost:${process.env.PORT}/avatars/${file.filename}`;
    await User.findOneAndUpdate(
        { _id },
        {
            $set: { avatarURL },
        }
    );
  
    return avatarURL;
};

module.exports = {
    registration,
    login,
    changeSubscription,
    changeAvatar,
};