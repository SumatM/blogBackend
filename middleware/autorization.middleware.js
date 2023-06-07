const jwt = require('jsonwebtoken')
require('dotenv').config()
// getting key from .env
const KEY = process.env.PRIVATEKEY;

// authorization middleware 
function AuthMiddleware(req,res,next){
// getting token 
const token = req.headers.authorization.split(' ')[1];

try{
// decoding the jwt 
const decode = jwt.verify(token,KEY)
// if decode is true 
if(decode){
    // adding username and userId to req.body
    req.body.author = decode.username,
    req.body.userId = decode.userId;
    next();
}else{
    // sending error 
    res.status(400).json({error:"Wrong Token"})
}
}catch(err){
    // sending error 
    res.status(400).json({error:err})
}
}


module.exports={AuthMiddleware}