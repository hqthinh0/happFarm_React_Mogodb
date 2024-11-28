const express = require('express');
require('dotenv').config();
const { createUser, loginUser, resendEmailCheck } = require('../controllers/Users/userController');
const { forGotPassword, resetPassword, changedPassword } = require('../controllers/resetPassword/resetPassword');
const { tokenUserVerify } = require('../controllers/verifyAccount/verifyAccountController');
const routerAPI = express.Router();

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')




// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI); 





routerAPI.get("/", (req, res) => {
    return res.status(200).json('hello word');
})

routerAPI.post('/register', createUser);
routerAPI.get('/verify/:token', tokenUserVerify);

routerAPI.post('/login', loginUser);
routerAPI.post('/forgotpassword', forGotPassword);

routerAPI.get('/reset-password/:id/:token', resetPassword);
routerAPI.post('/reset-password/:id/:token', changedPassword);

routerAPI.post('/resendemail', resendEmailCheck);
module.exports = routerAPI; //export default