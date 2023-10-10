const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { addLog } = require("../logs/logs");

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME,
        });
        console.log("Connected to MongoDB :)"); // Enlever plus tard !!
        addLog("info", "Connected to MongoDB", "connect.js");
    } catch (error) {
        addLog("error", error, "connect.js");
    }
};

const getCollection = (collectionName) => {
    return mongoose.connection.db.collection(collectionName);
};


module.exports = {
    connectToDatabase,
    getCollection,
};