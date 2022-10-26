const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const uploadPatch = path.resolve("./tmp")
const downloadPatch = path.resolve("./public/avatars");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPatch);
    },
    filename: function (req, file, cb) {
        // eslint-disable-next-line no-unused-vars
        const [_, extension] = file.originalname.split(".");
        cb(null, `${uuidv4()}.${extension}`);
    },
});

const uploadMidlewares = multer({ storage });

module.exports = {
    uploadMidlewares,
    uploadPatch,
    downloadPatch,
}