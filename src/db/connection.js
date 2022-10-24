const mongoose = require("mongoose");

const connectMongo = async () => {
    return mongoose.connect(
        process.env.MONGO_URL,
        {
            dbName: "db-contacts",
        },
        () => console.log("Database connection successful")
    );
};

module.exports = {
    connectMongo,
};