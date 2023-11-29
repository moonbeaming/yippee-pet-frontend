const express = require("express");
const { MongoClient } = require("mongodb");

const port = 8000;
const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log("The server on port 8000 is active");
});

// app.get("/devices", async (req, res) => {
//     try {
//       const cursor = collection.find({})
//       const devices = await cursor.toArray()
//       res.json(devices)
//     } catch (err) {
//       console.error(err)
//       res.status(500).send("Server error")
//     }
//  })

// const uri =
//   "mongodb+srv://yippeeAdmin :thisisautismcreature@workcluster.scg9dor.mongodb.net/?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//   client.connect(err => {
//     if (err) throw err
//     const collection = client.db("yippeepet").collectionllection("devices");

// const server = '127.0.0.1:27017';
// const database = 'MyDB';
// class Database {
//   constructor() {
//     this._connect();
//   }
//   _connect() {
//     mongoose
//       .connect(`mongodb://${server}/${database}`)
//       .then(() => {
//         console.log('Database connection successful');
//       })
//       .catch((err) => {
//         console.error('Database connection failed');
//       });
//   }
// }

// module.exports = new Database();
