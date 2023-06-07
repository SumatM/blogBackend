const express  = require('express');
const { blogModel } = require('../model/blogs.modal');
const { AuthMiddleware } = require('../middleware/autorization.middleware');


const blogRoute = express.Router();

// applying authMiddlware 
blogRoute.use(AuthMiddleware)


blogRoute.get('/',async(req,res)=>{

    const {userId,author} = req.body

    try{
    const blogs = await blogModel.find({userId:userId})
    res.status(200).json({blogs})

    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
})


blogRoute.post('/',async(req,res)=>{
    try{
    const blog = new blogModel(req.body)
        blog.save()
    res.status(200).json({blog})

    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
})



blogRoute.patch('/:blogId',async(req,res)=>{

    const id = req.params.blogId;
    const userId = req.body.userId;


    try{      
        let update = await blogModel.findOneAndUpdate({_id:id,userId},req.body)
      if(update){
        res.status(200).json({message:"blog Updated"})
       }else{
        res.status(400).json({error:"blog Id is invalid"})
       }
       
    }catch(err){
            console.log(err);
            res.status(400).json({err})
    }

})



blogRoute.delete('/:blogId',async(req,res)=>{

    const id = req.params.blogId;
    const userId = req.body.userId;


    try{      
        let update = await blogModel.findOneAndDelete({_id:id,userId},req.body)
      if(update){
        res.status(200).json({message:"blog deleted"})
       }else{
        res.status(400).json({error:"blog Id is invalid"})
       }
       
    }catch(err){
            console.log(err);
            res.status(400).json({err})
    }

    
})






module.exports = {blogRoute}