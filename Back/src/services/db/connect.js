const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME,
        });
        console.log("Connected to MongoDB :)");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

function getCollection(collectionName) {
    return mongoose.connection.db.collection(collectionName);
}

module.exports = {
    connectToDatabase,
    getCollection,
};