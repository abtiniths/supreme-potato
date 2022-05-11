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

//testing admin routes in seperate route/folder

//USER ROUTES
router.get("/users", authUser, adminAuth, getAllUsers);
router.post("/users/:id", authUser, adminAuth, updateUser);

//TASKS ROUTES
router.get("/tasks", authUser, adminAuth, getAllTasks);
router
  .route("/task/:id")
  .delete(authUser, adminAuth, deleteTask)
  .patch(authUser, adminAuth, updateTask);

module.exports = router;
