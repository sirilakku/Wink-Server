const express = require("express")
const app = express()
const projectRoutes = require("./server/routes/ProjectRoutes")
const scheduleRoutes = require("./server/routes/ScheduleRoutes")

app.use(express.json())
app.use("/api", projectRoutes)
app.use("/api", scheduleRoutes)

const PORT=4000
function echoPortNumber(){
    console.log(`Listening on port ${PORT}`)
}

//creating socket server for messenger
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});


server.listen(PORT, echoPortNumber);