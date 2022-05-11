const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./uploads");
  },

  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const authUser = require("../../middlewares/authentication");

const { workerAuth, clientAuth } = require("../../middlewares/rolesAuth");

const {
  getAllLoggedInUserTasks,
  getTask,
  createTask,
  ToggleTaskDoneUndone,
  uploadSingleImg,
  sendMsg,
} = require("../../controllers/task");

router
  .route("/")
  .post(authUser, workerAuth, createTask)
  .get(authUser, clientAuth, getAllLoggedInUserTasks);

router
  .route("/:id")
  .get(authUser, workerAuth, getTask)
  .put(authUser, workerAuth, ToggleTaskDoneUndone);

router
  .route("/:id/images")
  .post(upload.single("taskImage"), authUser, uploadSingleImg);
router.post("/:id/sendmessage", authUser, sendMsg);
module.exports = router;
