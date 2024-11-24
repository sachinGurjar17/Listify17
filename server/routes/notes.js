const express = require("express");
const { authenticateJwt } = require("../middlewares");
const router = express.Router();

const {Notes} = require('../database')

router.post('/addNotes',authenticateJwt , (req ,res)=>{
      
    const userId = req.userId ;
    const {content} = req.body ;

    const newNote = new Notes({userId , content})
    
    newNote.save()
    .then((savedNote)=>{
        res.status(201).json(savedNote)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
    
});

router.get('/getNotes' , authenticateJwt , (req,res)=>{
    const userId = req.userId ;

    Notes.find({userId})
    .then((notes)=>{
        res.status(200).json(notes);
    })
    .catch((err)=>{
        res.status(500).json({message :"error in fetching the notes"})
    });
});

module.exports = router 