require('dotenv').config();
const { createUserService, loginUserService, ResendEmail } = require("../../services/userService");


const createUser = async (req, res) => {

    const { firstname, lastname, username, email, password, confirmpassword } = req.body;
    const data = await createUserService(firstname, lastname, username, email, password, confirmpassword);

    console.log("data", data);


    return res.json({
        status: data.status,
        message: data.message,
    });
}


const loginUser = async (req, res) => {

    const { username, password } = req.body;
    const data = await loginUserService(username, password);

    console.log("data", data);

    return res.json({
        status: data.status,
        accessToken: data.accessToken,
        username: data.user.username,
        isVerified: data.user.isVerified,
        message: data.user.message,
    });
}


const resendEmailCheck = async (req, res) => {
    const { email } = req.body;
    const data = await ResendEmail(email);

    return res.json({
        status: data.status,
        message: data.message,
    });


}


module.exports = {
    createUser,
    loginUser,
    resendEmailCheck,

}