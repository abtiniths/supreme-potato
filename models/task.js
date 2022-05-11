const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Task",
      maxlength: 25,
    },
    done: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    Messages: [
      {
        msg: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
  { minimize: false }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
