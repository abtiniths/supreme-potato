// SOCKET IO TEST
/*
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
