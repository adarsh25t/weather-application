const express = require('express');
const { createNewUser } = require('../controllers/userControllers/createNewUser');
const LoginUser = require('../controllers/userControllers/loginUser');
const { addFavoriteCity } = require('../controllers/userControllers/addFavoriteCities');
const authenticateToken = require('../middleware/authenticateToken');
const getAllUserCities = require('../controllers/userControllers/getAllUserCitites');
const UserLogOut = require('../controllers/userControllers/userLogout');

const userRoute = express.Router();

userRoute.post('/register', createNewUser);
userRoute.post('/login',LoginUser);
userRoute.get('/logout',authenticateToken, UserLogOut);
userRoute.post('/favourite',authenticateToken, addFavoriteCity);
userRoute.get('/favourite', authenticateToken, getAllUserCities);

module.exports = userRoute