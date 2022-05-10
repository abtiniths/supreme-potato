const path = require("path");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const cors = require("cors");

// express engine/confg
const express = require("express");
const app = express();
const server = require("http").createServer(app);
app.use(cors());

// SOCKET IO TEST
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

// get messages ordered by date
async function getLastMessage(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

// change the date format from 01/11/1011 -> 10110111 to make it easier to use date for diffrent functions
function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

//when client connects
io.on("connection", (socket) => {
  //tell everyone a new user has joined ----> remove later
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
  });

  //event to join room
  socket.on("join-room", async (room) => {
    socket.join(room);
    let roomMessages = await getLastMessage(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  //writing the message
  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessage(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);

    //sending message to "room/task"
    io.to(room).emit("room-messages", roomMessages);

    socket.broadcast.emit("notification", room);
  });
});

/*
socket.emit('message', 'Welcome bitches')

//send and get msg
socket.on('Sendmessage',({senderId,recieverId, text}) => {
  const user = getUser(recieverId);
  io.to(user.socketId).emit("getMessage", {
    senderId,
    text,
  })
  
})
*/

// error handler midddleware
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

//auth middlewares
const { adminAuth } = require("./middlewares/rolesAuth");
const authUser = require("./middlewares/authentication");

//connectDB
const connectDB = require("./database/connection");

//routers
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const adminRouter = require("./routes/admin");

// dotenv
require("dotenv").config();
let port = process.env.PORT || 3000;
let host = process.env.HOST;

// express middleware && static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use(cookieParser());

//routes
app.use("/auth", authRouter);
app.use("/task", authUser, taskRouter);
app.use("/admin", authUser, adminAuth, adminRouter);

//connect error middleware to our app
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server is listening on ${host}:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
