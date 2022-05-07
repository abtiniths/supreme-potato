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
    },
   client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:[true]
   },
   body: String,
   messages: [{
   text: String,
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   }  
   }]
},{timestamps:true})

module.exports = mongoose.model('Task',TaskSchema)