require("dotenv").config();
const User = require("../../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



const verifyAccountSend = async (emailSendVerifyAccount, subjectAccount, textAccount) => {

    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            // service: process.env.SERVICE,
            // post: Number(process.env.EMAIL_PORT),
            // secure: Boolean(process.env.SECURE),
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },

        })
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailSendVerifyAccount,
            subject: subjectAccount,
            html: textAccount,
        });

        console.log("email send thafnh coong");

    } catch (error) {
        console.log("error", error);

    }

}

module.exports = {
    verifyAccountSend,
}