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
   // find out the best way to handle msgs between worker-client, embed or reff=? will this application ever need somthing like a hybrid pattern to handle data ex. Outlier Pattern?
   messages: [{
   text: String,
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   }  
   }]
},{timestamps:true})

module.exports = mongoose.model('Task',TaskSchema)