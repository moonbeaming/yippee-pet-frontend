const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.scg9dor.mongodb.net/${process.env.MONGO_DB}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("MongoDB Connected"));
  } catch {
    (err) => console.log("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
