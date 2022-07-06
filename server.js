const express = require("express");
const app = express();
const projectRoutes = require("./server/routes/ProjectRoutes");
const scheduleRoutes = require("./server/routes/ScheduleRoutes");
const authRoutes = require("./server/routes/authRoutes");
const userRoutes = require("./server/routes/userRoutes");
const messageRoutes = require("./server/routes/messageRoutes");

const passport = require("passport");
const session = require("express-session");
const {
  getConversations,
  getMessages,
  updateMessages,
} = require("./model/messaging");
app.use(session({ secret: "apple", cookie: { maxAge: 60000 } }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/api", projectRoutes);

app.use("/api", authRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api", userRoutes);
app.use("/api", messageRoutes);

const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}

//creating socket server for messenger
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

let connectedUsers = {};

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.sockets.on("connect", (socket) => {
  // Join a conversation
  // const { roomId } = socket.handshake.query;
  // socket.join(roomId);

  // // Listen for new messages
  // socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
  //   io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  // });
  // connectedUsers[socket.id] = socket;
  // console.log("connected users", connectedUsers);
  // console.log("socket is connected", socket.id);
  // socket.emit("connected", socket.id);
  // socket.on("join", (data) => {
  //   // const { roomId } = data;
socket.on('join', (data) => {
  socket.join(data)
  console.log(`${data} joined the room`)
}
   
    )
  
  socket.on("chat", (chat) => {
    // console.log("socket chat", chat);
    updateMessages(chat)
      .then((messages) => {
        // console.log("messages", messages);
      })
      .catch((err) => {
        console.log("error is", err);
      });
  });

  socket.on("notify", (data) => {
    console.log("socket notify", data);
    io.in("socket").emit("notification", data);
  }
    )


  // socket.on("chat", (chat) => {
  //   // console.log("socket chat", chat);
  //   updateMessages(chat);
  // });

  // socket.on("user", (user) => {
  //   console.log("user socket", user);
  // });

  // socket.on("join", (user) => {
  //   console.log("user socket", user);
  // });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    // socket.leave(roomId);
    console.log("socket is disconnected", socket.id);
  });
});

server.listen(PORT, echoPortNumber);
