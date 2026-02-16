const mongoose = require('mongoose')

const dotenv = require('dotenv').config()

const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('mongo DB connected successfully')
        }).catch((error)=>{
            console.log('not connected mongoDB')
        })
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectToDB