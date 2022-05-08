const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({

user: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
 task: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Task"
        },
        body: String
},{timestamps:true})

module.exports = mongoose.model('Message',MessageSchema)