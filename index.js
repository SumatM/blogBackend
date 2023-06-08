const express = require('express');
const { connection } = require('./db');
const { userRoute } = require('./Routes/user.routes');
const { blogRoute } = require('./Routes/blogs.route');
require('dotenv').config()
const cors = require('cors')

// setting a port 
const PORT = process.env.PORT || 3000

// creating instance of express
const app = express();

// usins cors for cross orgin platform
    app.use(cors())

// using a inbuld middleware to parse the req.body;
    app.use(express.json())

// request /user will go to userRoute
    app.use("/user",userRoute)

// requrest /blog will go to blogRoute
    app.use("/blog",blogRoute)


// listening the server 
 app.listen( PORT, async ()=>{
    try{
        await connection
        console.log()
    }catch(error){
        console.log(error)
    }
})