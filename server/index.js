const express = require('express')
const app = express();
const mongoose = require('mongoose');

const cors = require('cors') ;

const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
const notesRoutes = require('./routes/notes');

app.use(cors());
app.use(express.json());

app.use("/user",userRoutes);
app.use("/todo",todoRoutes);
app.use("/notes",notesRoutes);


app.listen(3000,()=>{
        console.log("example app listening at port 3000");
})

mongoose.connect('mongodb+srv://sachinGurjar:Sachin%40123@cluster0.8fkp40v.mongodb.net/', { dbName: "TodoApplication" });
