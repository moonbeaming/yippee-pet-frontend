const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
// const router = require("./routes/router");
const Pet = require("./models/schema");
const connectDB = require("./server");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.post("/createload", async (req, res) => {
  try {
    const petName = req.body.petName;
    console.log(typeof petName, "we getting there");
    const pet = await Pet.find({ name: petName }); // Find pet in db, if any
    if (pet.length !== 0) {
      res.send({ message: "Pet exists", data: pet[0] });
    } else {
      // create entry in db
      res.send({ message: "Pet does not exist" });
      console.log("aint nothing in db");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/pet", async (req, res) => {
  try {
    const petName = req.body.petName;
    console.log(typeof petName, "we getting there");
    const pet = await Pet.find({ name: petName }); // Retrieve all users
    if (pet.length !== 0) {
      res.send(pet[0]);
    } else {
      console.log("aint nothing in db");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

// app.post("/users", async (req, res) => {
//   try {
//     const { username, email } = req.body;
//     const newUser = new User({ username, email });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://yippeeAdmin:thisisautismcreature@workcluster.scg9dor.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
