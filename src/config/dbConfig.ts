// const mongoose = require('mongoose')
import mongoose from 'mongoose';

export const connect = async() => {
    try{
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log('MongDB connected successfully!')
        })

        connection.on('error',(err:any)=>{
            console.log('MongoDB connection error'+err)
            process.exit()
        })

    }catch(err){
        console.log('Database is not connected')
        console.log(err)
    }
}