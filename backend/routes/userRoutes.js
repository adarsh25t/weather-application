const express = require('express');
const { createNewUser } = require('../controllers/userControllers/createNewUser');
const LoginUser = require('../controllers/userControllers/loginUser');

const userRoute = express.Router();

userRoute.post('/register', createNewUser);
userRoute.post('/login',LoginUser);

module.exports = userRoute