const mongoose=require('mongoose')


const transactionSchem=new mongoose.Schema({
    userid:{
        type:String,
        required:[true,'userid is required']
    },
    amount:{
        type:Number,
        required:[true,'amount is required']
    },
    type:{
        type:String,
        required:[true,'type is required']
    },
    category:{
        type:String,
        required:[true,'cat is required']
    },
    reference:{
        type:String
    },
    description:{
        type:String,
        required:[true,'desc is required']
    },
    date:{
        type:Date,
        reuired:[true,'date is required']
    }
},{timestamps:true});

const transactionModel=mongoose.model('transactions',transactionSchem)
module.exports=transactionModel;