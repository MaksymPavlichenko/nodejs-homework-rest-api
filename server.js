const { app } = require("./src/app");
require("dotenv").config();
const { connectMongo } = require("./src/db/connection");
const start = async () => {
    try {
        await connectMongo();
        app.listen(process.env.PORT, (err) => {
            if (err) console.error("Error at server:", err);
            console.log(`Server running. Use our API on port: ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

start();