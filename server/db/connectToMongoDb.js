// import mongoose from "mongoose";

// import dotenv from "dotenv"

// dotenv.config()

// const connectToMongoDb = mongoose
//                         .connect(process.env.MONGO_DB_URI)
//                         .then(() => {
//                           console.log("Successfully Connected to MongoDb")
//                         })
//                         .catch((err) => {
//                           console.log("Unable to Connect with MongoDB", err.message)
//                         })


const mongoose = require("mongoose");

const connectToMongoDb = () => {
  return mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


module.exports = connectToMongoDb;
