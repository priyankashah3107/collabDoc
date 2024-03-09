const mongoose = require("mongoose")
const dotenv = require("dotenv");
const connectToMongoDb = require("../server/db/connectToMongoDb.js");
const Document = require("../server/Document.js")

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

const defaultValue = ""

io.on("connection", socket => {
  // connectToMongoDb
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    // Id wise room mei join krna
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on('send-changes', delta => {
      // console.log(delta)
      // socket.broadcast.emit("recive-changes", delta)
      socket.broadcast.to(documentId).emit("recive-changes", delta)
    })

    //updating the value by id 
    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, {data})
    })
  })
 
})


async function findOrCreateDocument(id) {
  if(id == null) return;

  const document = await Document.findById(id)
  if(document) return document
  return await Document.create({ _id: id, data: defaultValue})
}