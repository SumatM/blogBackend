const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB = process.env.MONGODB

// making connection with mongoose Atlas
const connection = mongoose.connect(MONGODB)


module.exports = {connection}