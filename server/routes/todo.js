const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { authenticateJwt , SECRET} = require('../middlewares')
const { Todo } = require('../database');

const router = express.Router();

router.post('/todos', authenticateJwt, (req, res) => {
    const {id , todo , completed , description , date , time , priority , tags} = req.body;
    const userId = req.userId ;
    const newTodo = new Todo({id , todo ,completed , userId , description , date , time , priority , tags});
    newTodo.save()
      .then((savedTodo) => {
        res.status(201).json(savedTodo);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
      });
  });

  router.get('/todos', authenticateJwt, (req, res) => {
    const userId = req.userId;
    Todo.find({ userId })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
      });
  });

  router.post('/deleteTodo',authenticateJwt , (req , res)=>{
    const todoId = req.body.todoId ;
    console.log({_id : todoId});
    
    Todo.findOneAndDelete({id : todoId})
    .then((todos)=>{
      res.json({message:'todo deleted successfully'})
    })
    .catch((err)=>{
      res.status(500).json({error: 'failed to retrive todo'})
    })
  
  })

  router.post('/updateTodo',authenticateJwt,(req , res)=>{
      const newTodo = req.body.newTodo.todo;

      Todo.findOneAndUpdate({userId:req.userId},newTodo,{new:true})
      .then((todos)=>{
        res.json({message:'todo updated successfully'})
      })
      .catch((err)=>{
        res.status(500).json({error: 'failed to retrive todo'})
      })
      
  })

  router.post('/statusChange',authenticateJwt,(req,res)=>{
    const todoId = req.body.todoId ;
    const completedOrNot = req.body.completedOrNot ;
  
    Todo.findOneAndUpdate({id:todoId}, { completed: completedOrNot } , {new : true})
    .then((status)=>{
      res.json({message:'status changed'}) 
    })
    .catch((err)=>{
      res.status(500).json({error:'failed to change the status of todo'})
    })
  })

  

module.exports = router 