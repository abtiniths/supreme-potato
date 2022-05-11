const Task = require("../../models/Task");
const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../errors");
const { Types } = require("mongoose");

const updateTask = async (req, res) => {
  const {
    body: { titel, done },
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true, context: "query" }
  );
  if (!task) {
    throw new NotFoundError(`no task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: taskId },
    } = req;
    const task = await Task.findByIdAndRemove({
      _id: taskId,
      createdBy: userId,
    });
    if (!task) {
      throw new NotFoundError(`no task with id ${taskId}`);
    }
    res
      .status(StatusCodes.OK)
      .send(
        `task assigned to workerId: ${userId} with taskId: ${taskId} deleted from database`
      );
  } catch (error) {
    throw new NotFoundError(`Could not find any task to delete`);
  }
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ count: tasks.length, tasks });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({ count: users.length, users });
  } catch (error) {
    throw new NotFoundError(`Could not connect to dB`);
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      params: { id: userId },
    } = req;
    // try to prevent admin to be able to remove thyself from the admin role
    if (req.user.id === id) {
      throw new BadRequestError("Admin cannot remove his own role as admin");
    }
    // Check for valid mongoose objectID
    if (!Types.ObjectId.isValid(id)) {
      throw new UnauthenticatedError("Invalid authentication");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (!user) {
      throw new NotFoundError(`no user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    throw new NotFoundError(`Could not connect to dB`);
  }
};

module.exports = {
  updateTask,
  deleteTask,
  getAllUsers,
  updateUser,
  getAllTasks,
};
