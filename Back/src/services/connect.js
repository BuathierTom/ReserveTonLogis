const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://corneil:03092021@cluster0.vcq4uz9.mongodb.net/?retryWrites=true&w=majority"
const dbName = "ReserveTonLogis";

const client = new MongoClient(uri)

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        console.log("Connecting to the db...");
        await client.connect();
        console.log("Client successfully connected to server");
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(error) {
        console.log(error)
        await client.close();
    }
}

module.exports = {
    run
};
