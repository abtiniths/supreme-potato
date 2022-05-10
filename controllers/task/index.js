const Task = require('../../models/Task')
const User = require('../../models/User')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../../errors')



/*
const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const client = req.body.client
    const task = await Task.create(req.body)

    const user = await User.findOne({ userId: client.userId });
    user.populated('Task'); // null
    
    // Call the `populate()` method on a document to populate a path.
    await user.populate('Task');
    
    user.populated('stoTask'); // Array of ObjectIds
    user.Task[0].name; // 'Casino Royale'

}

*/

// function for worker/admin to create a new task that is asigned to a client
// CREATE TASK
/*
   const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const client = req.body.client
    const task = await Task.create(req.body)
    const user = await User.findOne({ userId: client.userId})
   user.populate({
      path: "Task", 
      model:"Task",
      populate: {
        path: "User",
        model:"User" ,
        select:"email name"
     }

   })
    res.status(StatusCodes.CREATED).json({ task })
}
*/

const createTask = async (req, res) => {
    try { 
        req.body.createdBy = req.user.userId
    const { titel, picture, client, text} = req.body
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({ task })
} catch(error){
// throw new NotFoundError('Something went wrong, could not create Task')
console.log(error)
}
}



// find out how to merge theese two togheter 
// function to get all the logged in users tasks
// GET WORKER AND CLIENT TASKS
const getAllWorkerTasks = async (req, res) => {
    const tasks = await Task.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: tasks.length, tasks })
}
const getAllClientTasks = async (req, res) => {
    const tasks = await Task.find({client:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: tasks.length, tasks })
}

// GET TASK
//function to get the logged in a single user task
const getTask = async (req, res) => {
    const {user:{userId}, params:{id:taskId}} = req
   // const { params:{id:taskId}} = req
    const task = await Task.findOne({
        $or:[{
            createdBy: userId},
            {client:userId}]
    })
    if(!task){
        throw new NotFoundError(`no task with id ${taskId} that belongs to user ${userId}`)
    }
    res.status(StatusCodes.OK).json({ task })
}
/*
const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({ task })

}
*/








module.exports = {
    getAllWorkerTasks,
    getTask,
    createTask,
    getAllClientTasks
}