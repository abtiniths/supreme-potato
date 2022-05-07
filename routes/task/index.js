const express = require('express')
const router = express.Router()
const authorize = require('../../middlewares/authorize')
const auth = require('../../middlewares/authentication')


const {

getAllWorkerTasks,
getTask,
createTask,
updateTask,
deleteTask

} = require('../../controllers/task')


// get & post route for createTask, getAll, workerTasks
router.route('/')
   .post(createTask)
   .get(auth, getAllWorkerTasks)

// get, delete & patch route for getTask, deleteTask, update
router.route('/:id')
   .get(getTask)
   .delete(deleteTask)
   .patch(updateTask)




module.exports = router