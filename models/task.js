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
    text: String,
    taskImage: String,
    messages: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
  { minimize: false }
);
TaskSchema.virtual("taskImgPath").get(function () {
  if (this.taskImage != null && this.taskImageType != null) {
    return `data:${this.taskImageType};charset=utf-8;base64,
        ${this.taskImage.toString("base64")}`;
  }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
