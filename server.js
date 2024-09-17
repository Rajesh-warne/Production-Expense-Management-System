const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');

dotenv.config();

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//user Routes
app.use('/api/v1/user', require('./routes/userRoutes'));

//transaction Routes
app.use('/api/v1/transactions',require('./routes/transactionRoutes'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
