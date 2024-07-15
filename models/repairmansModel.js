const mongoose = require('mongoose');

const repairmanShema = new mongoose.Schema({
    repairman:{
        type:String,
        required: [true, 'Repairman cannot be empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required: [true, 'Rating cannot be empty']
    },
    service:{
        type:mongoose.Schema.ObjectId,
        ref:'Service',
        required: [true, 'You must select service']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: [true, 'You must select user']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

repairmanShema.pre(/^find/,function(next){
    this.populate({
        path:'hotel',
        select:'name'
    }).populate({
        path:'user',
        select:'name'
    })
    next()
})

const Repairman = mongoose.model('Repairman',repairmanShema);

module.exports = Repairman;