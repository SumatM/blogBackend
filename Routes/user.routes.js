const express = require('express');
const { userModel } = require('../model/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// creating route for /user endpoint 
const  userRoute = express.Router();

// getting key from .env
const KEY = process.env.PRIVATEKEY;

userRoute.post('/signup',async(req,res)=>{
    const {password} = req.body
    try{
    bcrypt.hash(password,2, async (err, hash)=>{
        const user = await new userModel({...req.body,password:hash});
        user.save();
        res.status(200).json({message:'user Added',user})
    })       
    }catch(err){
        res.status(400).json({error:err})
    }
})



userRoute.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
    const user = await userModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
             if(result){
            const token = jwt.sign({username: user.username,userId:user._id},KEY,{expiresIn:'7d'})
            res.status(200).json({message:'user loged in',token})

             }else{
                res.status(400).json({error:'wrong password'})
             }
        })
    }else{
        res.status(400).json({error:'user not found'})
    }

    }catch(err){
        console.log(err);
        res.status(400).json({error:err})
    }
})


module.exports = {userRoute}


