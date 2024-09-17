const userModel = require('../models/userModel');  // Correct import path

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login Request:', { email, password });  // Log request data
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send('User Not Found');
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Login Error:', error);  // Log any errors
        res.status(400).json({
            success: false,
            error
        });
    }
};

const registerController = async (req, res) => {
    try {
        console.log('Register Request:', req.body);  // Log request data

        // Create a new user with the received data
        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(201).json({
            success: true,
            newUser
        });
    } catch (error) {
        console.error('Register Error:', error);  // Log error details

        // Send error response with more detailed message
        res.status(400).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
};

module.exports = { loginController, registerController };
