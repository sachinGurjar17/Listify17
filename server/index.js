import 'dotenv/config'
const express = require('express')
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

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

const mongoUrl = process.env.MONGO_URL
mongoose.connect( mongoUrl , { dbName: "TodoApplication" });
