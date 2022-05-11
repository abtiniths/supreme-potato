const Task = require("../models/Task");

module.exports = (io) => {
  io.on("connection", (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/task/:id/messages").sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    socket.emit("users", users);
  });
  socket.on("join", async (taskId) => {
    try {
      let result = await Task.findOne({ _id: taskId });
      if (!result) {
        await Task.insertOne({ id: taskId, messages: [] });
      }
      socket.join(taskId);
      socket.emit("Ingebrabygg", taskId);
      socket.activeRoom = taskId;
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("message", (message) => {
    Task.updateOne(
      { _id: socket.activeRoom },
      {
        $push: {
          messages: message,
        },
      }
    );
    io.to(socket.activeRoom).emit("message", message);
  });

  socket.on("get-task", () => {
    console.log("server - get task called");
  });
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
};
/*
app.get("/msg", async (req, res) => {
  try {
    let result = await Task.findOne({ _id: req.query.taskId});
    res.send(result);
  } catch (error) {
    console.log(error)
  }
});
*/
