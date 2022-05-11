const express = require("express");
const router = express.Router();
const authUser = require("../../middlewares/authentication");
const { adminAuth } = require("../../middlewares/rolesAuth");
const {
  getAllUsers,
  updateUser,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../../controllers/admin");

router.get("/users", authUser, adminAuth, getAllUsers);
router.post("/users/:id", authUser, adminAuth, updateUser);

router.get("/tasks", authUser, adminAuth, getAllTasks);
router
  .route("/task/:id")
  .delete(authUser, adminAuth, deleteTask)
  .patch(authUser, adminAuth, updateTask);

module.exports = router;
