const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
  },
  { timestamps: true }
);

Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
