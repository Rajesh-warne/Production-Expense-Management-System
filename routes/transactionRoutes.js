const express=require('express')
const { addAlltransactions, getAlltransactions ,editTransactions
    ,deleteTransactions
} = require('../controllers/transactionCtrl')

//router object
const router=express.Router()

//routes
//add transaction Post method
router.post('/add-transactions',addAlltransactions)

//Edit transaction 
router.post('/edit-transactions',editTransactions)

//delete transaction
router.post('/delete-transactions',deleteTransactions)

//get all transactions get method
router.post('/get-transactions',getAlltransactions)

module.exports=router