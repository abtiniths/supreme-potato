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
   const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const client = req.body.client
    const task = await Task.create(req.body)
    const user = await User.findOne({ userId: client.userId})
   user.populate({
      path: "Task", 
      mod:"Task",
      populate: {
        path: "User",
        model:"User" ,// in Task, populate message
        select:"email name"
     }

   })
    res.status(StatusCodes.CREATED).json({ task })
}



// find out how to merge theese two togheter 

// function to get all the logged in users tasks
const getAllWorkerTasks = async (req, res) => {
    const tasks = await Task.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: tasks.length, tasks })
}
const getAllClientTasks = async (req, res) => {
    const tasks = await Task.find({client:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: tasks.length, tasks })
}


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
        throw new NotFoundError(`no task with id ${taskId}`)
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

// function for admin (and worker?) to update a task
const updateTask = async (req, res) => {
    const {body:{titel,done},user:{userId}, params:{id:taskId}} = req

    const task = await Task.findByIdAndUpdate({_id:taskId, createdBy:userId}, req.body, {new:true, runValidators:true})
    if(!task){
        throw new NotFoundError(`no task with id ${taskId}`)
    }
    res.status(StatusCodes.OK).json({ task })
}

// function for admin to delete a task
const deleteTask = async (req, res) => {
    const {user:{userId}, params:{id:taskId}} = req
    const task = await Task.findByIdAndRemove({
        _id:taskId,
        createdBy:userId
    })
    if(!task){
        throw new NotFoundError(`no task with id ${taskId}`)
    }
    res.status(StatusCodes.OK).send(`task assigned to workerId: ${userId} with taskId: ${taskId} deleted from database`)
}







module.exports = {
    getAllWorkerTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask,
    getAllClientTasks
}