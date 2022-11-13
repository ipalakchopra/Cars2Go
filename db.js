const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect('mongodb+srv://carrental:carrental@cluster0.ngjra87.mongodb.net/cars2go' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successful')
         
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })

}

connectDB()

module.exports = mongoose
