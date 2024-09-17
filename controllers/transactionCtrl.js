const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAlltransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, userid, type } = req.body;

    // Construct query based on frequency
    const query = {
      userid: userid,
    };

    if (type && type !== 'all') {
      // Add type filter if it's not 'all'
      query.type = type;
    }

    if (frequency === 'custom' && selectedDate && selectedDate.length === 2) {
      // Ensure selectedDate has two dates
      query.date = {
        $gte: new Date(selectedDate[0]),
        $lte: new Date(selectedDate[1]),
      };
    } else if (frequency !== 'custom') {
      // For non-custom frequencies
      query.date = {
        $gt: moment().subtract(Number(frequency), 'd').toDate(),
      };
    }

    const transactions = await transactionModel.find(query);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const deleteTransactions=async (req,res)=>{
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send('Transaction Deleted')
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error deleting transaction',error});

  }
}
const editTransactions = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
    res.status(200).send('Transaction updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating transaction', error });
  }
};


const addAlltransactions = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send('Transaction created');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAlltransactions, addAlltransactions,editTransactions,deleteTransactions };
