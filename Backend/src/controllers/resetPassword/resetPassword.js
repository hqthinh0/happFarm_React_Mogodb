require('dotenv').config();
const { requestForGotPassword, requestResetPasword, changedPassWordForgot } = require("../../services/resetPassword/resetPassword");

const forGotPassword = async (req, res) => {

    const { email } = req.body;
    const data = await requestForGotPassword(email);
    return res.json({
        status: data.status,
        data: data.user,
    });

}

const resetPassword = async (req, res) => {
    const { id, token } = req.params;

    const reset = await requestResetPasword(id, token);
    console.log("req.params", reset);
    return res.json({
        status: reset.status,
        email: reset.verify.email,
        firstname: reset.verify.firstname,
        lastname: reset.verify.lastname
    });

}

const changedPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;
    const change = await changedPassWordForgot(id, token, password, confirmPassword);
    return res.json({
        status: change.status,
    });



    //res.render('sample.ejs');


}


module.exports = {
    forGotPassword, resetPassword, changedPassword
}