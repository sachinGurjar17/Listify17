const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express');
const { authenticateJwt } = require('../middlewares');
const {User} = require('../database')


const router = express.Router();

const SECRET = process.env.JWT_SECRET

router.post('/signup',async (req,res)=>{
    const {username , password} = req.body ;
    const user = await User.findOne({username});

    if(user){
        res.status(403).json({message : "User already exist"});
    }else{
        const newUser = new User({username , password});
        await newUser.save();

        const token = jwt.sign({ id: newUser._id , email : username }, SECRET, { expiresIn: '1h' });
        res.json({message : 'user created successfully',token});

    }   
})

router.post('/signin' , async(req , res)=>{
    const {username , password} = req.body ;
    const user = await User.findOne({username,password});

    if(user){
        const token = jwt.sign({ id: user._id ,email : username  }, SECRET, { expiresIn: '1h' });
        res.json({message : 'Logged in successfully',token});
    }else{
        res.json({message : "incorrect username or password"});
    }
})


router.get('/me', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(403).json({ message: 'User not logged in' });
    }
  });

module.exports = router ;

