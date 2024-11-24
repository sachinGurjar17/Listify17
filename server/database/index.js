const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username:String,
    password: String,
})

const todoSchema = new Mongoose.Schema({
   id:Number,
   todo:String,
   completed:Boolean,
   description:String,
   priority : String,
   date : String ,
   time:String,
   tags : [],
   userId : String 
})

const notesSchema = new Mongoose.Schema({
   userId :String ,
   content : String
})

const User = Mongoose.model('User',userSchema);
const Todo = Mongoose.model('Todo',todoSchema);
const Notes = Mongoose.model('Notes', notesSchema)

module.exports = {
   User,
   Todo,
   Notes
}

