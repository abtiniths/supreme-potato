const getAllTasks = async (req, res) => {
    res.send('get all tasks')
}

const getTask = async (req, res) => {
    res.send('get task')
}

const createTask = async (req, res) => {
    res.send('create task')
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