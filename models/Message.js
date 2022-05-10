const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    content: String,
    from: Object,
    socketid: String,
    time: String,
    date: String,
    to: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    body: String,
  },
  { timestamps: true }
);

Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
