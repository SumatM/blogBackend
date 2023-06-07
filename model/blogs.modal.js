const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    title: String,
    notes: String,
    author:String,
    userId: String,
    category:String,
},{
    versionKey: false
})

const blogModel = mongoose.model('blog',blogSchema)


module.exports = {blogModel}