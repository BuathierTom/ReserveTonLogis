const mongoose = require('mongoose');

const uri = "mongodb+srv://corneil:03092021@cluster0.vcq4uz9.mongodb.net/?retryWrites=true&w=majority";
const dbName = "ReserveTonLogis";

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName,
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