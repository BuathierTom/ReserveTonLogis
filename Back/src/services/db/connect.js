const mongoose = require('mongoose');

const uri = "mongodb+srv://corneil:03092021@cluster0.vcq4uz9.mongodb.net/?retryWrites=true&w=majority";
const dbName = "ReserveTonLogis";

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
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














// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://corneil:03092021@cluster0.vcq4uz9.mongodb.net/?retryWrites=true&w=majority"
// const dbName = "ReserveTonLogis";

// const client = new MongoClient(uri)

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         console.log("Connecting to the db...");
//         await client.connect();
//         console.log("Client successfully connected to server");
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch(error) {
//         console.log(error)
//     }
//     finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     } 
// }

// function getCollection(collectionName) {
//     return client.db(dbName).collection(collectionName);
// }

// module.exports = {
//     run,
//     getCollection,
// };
