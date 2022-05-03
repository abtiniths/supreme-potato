const Task = require('../../models/Task')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../../errors')




const getAllTasks = async (req, res) => {
    
}

const getTask = async (req, res) => {
    res.send('get task')
}

const createTask = async (req, res) => {
   
    
}

const updateTask = async (req, res) => {
    res.send('update task')
}

const deleteTask = async (req, res) => {
    res.send('delete task')
}







module.exports = {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
}