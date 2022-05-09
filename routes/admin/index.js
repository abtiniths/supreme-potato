const express = require('express')
const router = express.Router()


const {

   getAllUsers,
   updateUser,
   getAllTasks,
   updateTask,
   deleteTask

      } = require('../../controllers/admin')
   


//testing admin routes in seperate route/folder

//USER ROUTES
router.get('/users',  getAllUsers )
router.post('/users/:id',updateUser)

//TASKS ROUTES
router.get('/tasks',getAllTasks)
router.route('/task/:id')
   .delete( deleteTask)
   .patch( updateTask)

 




module.exports = router