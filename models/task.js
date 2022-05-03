const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    titel:{
        type:String,
        default: 'Task',
        maxlength: 25
    },
    done:{
        type:Boolean,
        default: false
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true]
    }
},{timestamps:true})

module.exports = mongoose.model('Task',TaskSchema)