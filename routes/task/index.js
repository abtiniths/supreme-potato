const express = require('express')
const router = express.Router()
const authorize = require('../../middlewares/authorize')
const auth = require('../../middlewares/authentication')
const {adminAuth,workerAuth, clientAuth} = require('../../middlewares/rolesAuth')

const {

getAllWorkerTasks,
getAllClientTasks,
getTask,
createTask,
updateTask,
deleteTask

} = require('../../controllers/task')


// get & post route for createTask, getAll, workerTasks
router.route('/')
   .post(workerAuth, createTask)
   .get(workerAuth, getAllWorkerTasks)
   .get(clientAuth, getAllClientTasks)

// get, delete & patch route for getTask, deleteTask, update
router.route('/:id')
   .get( workerAuth, getTask)
   .delete(adminAuth, deleteTask)
   .patch(adminAuth, updateTask)




module.exports = router