const io = require("socket.io")(3003, {
  cors:{
     origin: "http://localhost:5173",
     methods: ["GET", "POST"]
  },
})


io.on("connection", socket => {
  socket.on('send-changes', delta => {
    // console.log(delta)
    socket.broadcast.emit("recive-changes", delta)
  })
 
})