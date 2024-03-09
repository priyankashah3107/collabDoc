const mongoose = require("mongoose")
const dotenv = require("dotenv");
const connectToMongoDb = require("../server/db/connectToMongoDb.js");

dotenv.config();

// Connect to MongoDB
connectToMongoDb()
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Unable to Connect with MongoDB", err.message);
  });

const io = require("socket.io")(3003, {
  
  cors:{
     origin: "http://localhost:5173",
     methods: ["GET", "POST"]
  },
})


io.on("connection", socket => {
  connectToMongoDb
  socket.on('send-changes', delta => {
    // console.log(delta)
    socket.broadcast.emit("recive-changes", delta)
  })
 
})