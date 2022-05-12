const Task = require("../../models/Task");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const req = require("express/lib/request");

const ToggleTaskDoneUndone = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: taskId },
    } = req;
    const task = await Task.findOneAndUpdate({ createdBy: userId }, [
      { $set: { done: { $eq: [false, "$done"] } } },
    ]);
    res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    throw new NotFoundError(`could not find any task to update`);
  }
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { title, client, text, createdBy } = req.body;
  try {
    const task = await Task.create({
      title,
      client,
      text,
      createdBy,
    });
    res.status(StatusCodes.CREATED).json({ task });
  } catch (error) {
    throw new NotFoundError("Something went wrong, could not create Task");
  }
};

const getAllLoggedInUserTasks = async (req, res) => {
  if (req.user.role == "worker" || "client") {
    const tasks = await Task.find({
      $or: [{ createdBy: req.user.userId }, { client: req.user.userId }],
    }).sort("createdAt");
    res.status(StatusCodes.OK).json({ count: tasks.length, tasks });
  }
};

const getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  const task = await Task.findOne({
    $or: [
      {
        createdBy: userId,
      },
      { client: userId },
    ],
  });
  if (!task) {
    throw new NotFoundError(
      `no task with id ${taskId} that belongs to user ${userId}`
    );
  }
  res.status(StatusCodes.OK).json({ task });
};

const sendMsg = async (req, res) => {
  try {
    const {
      msg,
      params: { id: taskId },
    } = req;

    const task = await Task.findByIdAndUpdate(
      { _id: taskId },
      { $push: { Messages: { msg: msg } } },
      { safe: true, upsert: true }
    );
    res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    throw new BadRequestError("no");
  }
};
const uploadSingleImg = async (req, res) => {
  const {
    params: { id: taskId },
  } = req;
  try {
    await Task.updateOne({ taskImage: req.file.filename });
    res.status(StatusCodes.OK).json("Image upload was a success!");
  } catch (error) {
    throw new BadRequestError("no");
  }
};

module.exports = {
  getAllLoggedInUserTasks,
  getTask,
  createTask,
  ToggleTaskDoneUndone,
  uploadSingleImg,
  sendMsg,
};
