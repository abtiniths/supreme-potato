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

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const authUser = require("../../middlewares/authentication");

const {
  adminAuth,
  workerAuth,
  clientAuth,
} = require("../../middlewares/rolesAuth");

const {
  getAllLoggedInUserTasks,
  getTask,
  createTask,
  ToggleTaskDoneUndone,
  uploadSingleImg,
} = require("../../controllers/task");

// get & post route for createTask, getAll, workerTasks
router
  .route("/")
  .post(upload.single("taskImage"), authUser, workerAuth, createTask)
  .get(authUser, clientAuth, getAllLoggedInUserTasks);

// get, delete & patch route for getTask, deleteTask, update
router
  .route("/:id")
  .get(authUser, workerAuth, getTask)
  .put(authUser, workerAuth, ToggleTaskDoneUndone);
// .delete(adminAuth, deleteTask)
// .patch(adminAuth, updateTask)

router.route("/:id/images").post(upload.single("taskImage"), uploadSingleImg);

module.exports = router;
