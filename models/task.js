const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title:{
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
   text: String,
   picture: String,
   // find out the best way to handle msgs between worker-client, embed or reff=? will this application ever need somthing like a hybrid pattern to handle data ex. Outlier Pattern?
   messages: {
   type: Object,
   default: {}
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   }  
   
},{timestamps:true}, {minimize: false})

module.exports = mongoose.model('Task',TaskSchema)