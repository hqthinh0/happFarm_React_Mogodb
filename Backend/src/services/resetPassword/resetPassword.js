require("dotenv").config();
const User = require("../../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const requestForGotPassword = async (emailReset) => {
    try {
        const userForgotPassword = await User.findOne({ email: emailReset });

        console.log("userForgotPassword", userForgotPassword);


        if (userForgotPassword) {

            const secret = process.env.JWT_SECRET + userForgotPassword.password;

            const payloadUserForgotPassword = {
                email: userForgotPassword.email,
                firstname: userForgotPassword.firstname,
                lastname: userForgotPassword.lastname,
                id: userForgotPassword._id,
            }

            const accessToken = jwt.sign(payloadUserForgotPassword, secret, { expiresIn: "300s" });


            const resetLink = `http://127.0.0.1:5173/reset-password/${userForgotPassword._id}/${accessToken}`;

            console.log("resetLink", resetLink);


            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            //https://www.youtube.com/watch?v=AClnCg_WCJk
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: payloadUserForgotPassword.email,
                subject: "Password Reset",
                html: `<p>You requested for password reset</p><h5>Click on this <a href="${resetLink}">link</a> to reset your password</h5>`,
            });
            return {
                status: process.env.STATUS_200,
                user: {
                    email: userForgotPassword.email,
                    firstname: userForgotPassword.firstname,
                    lastname: userForgotPassword.lastname,
                },
                resetLink: resetLink,
            };

        } else {
            return {
                status: (process.env.STATUS_404),
            }
        }
    } catch (error) {
        return {
            status: process.env.STATUS_500,
        }
    }

}

const requestResetPasword = async (id, token) => {

    const user_id = await User.findOne({ _id: id });

    if (user_id) {

        const secret = process.env.JWT_SECRET + user_id.password;
        try {
            const verify = jwt.verify(token, secret)
            return { status: 200, verify: verify, message: "verify" }

        } catch (error) {
            console.log("error", error);

            return { status: 250, message: "not verify" }
        }

    } else {
        return { status: 300, message: "user not Exits!!" }
    }

}

const changedPassWordForgot = async (id, token, passwordhasChanged, confirmpasswordChanged) => {

    const userChangedPassword = await User.findOne({ _id: id });


    if (userChangedPassword) {

        const secret = process.env.JWT_SECRET + userChangedPassword.password;
        const verify = jwt.verify(token, secret);
        try {
            if (!passwordhasChanged || !confirmpasswordChanged) {
                return { status: 220, message: "không để thiếu trường" };
            }

            if (passwordhasChanged !== confirmpasswordChanged) {
                return { status: 400, message: "Mật khẩu và mật khẩu xác nhận không trùng khớp" };
            }
            const enyctyptedPassword = await bcrypt.hash(passwordhasChanged, 10);

            await User.updateOne(
                { _id: id },
                {
                    $set: {
                        password: enyctyptedPassword,
                    }
                }
            );
            return { status: 200, message: "đã update password" }

        } catch (error) {
            console.log("error", error);

            return { status: 250, message: "not verify" }
        }

    } else {
        return { status: 300, message: "error" }
    }


}

module.exports = {
    requestForGotPassword, requestResetPasword, changedPassWordForgot
}