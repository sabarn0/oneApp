require('dotenv').config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
let connected;

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("project0"); 
        connected = true;
    } catch (err) {
        console.error(err);
        connected = false;
    }
};

const getDB = () => db;

const isConnected = () => connected;

module.exports = { connectDB, getDB, isConnected };
