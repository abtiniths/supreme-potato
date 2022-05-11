const Task = require("../models/Task");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", async (taskId) => {
      try {
        let result = await Task.findOne({ _id: taskId });
        if (!result) {
          await Task.insertOne({ id: taskId, messages: [] });
        }
        socket.join(taskId);
        socket.emit("Ingebrabygg", taskId);
        socket.activeRoom = taskId;
      } catch (e) {
        console.error(e);
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
  });
};
