require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const saltRounds = 10;



const createUserService = async (firstname, lastname, username, email, password, confirmpassword) => {

    try {
        const userExists = await User.findOne({ email });


        if (userExists) {
            return { status: process.env.STATUS_220, message: 'tài khoản đã tồn tại rồi' }
        }

        //hash User Password
        const hashPassWord = await bcrypt.hash(password, saltRounds);
        if (password !== confirmpassword) {

            return { status: process.env.STATUS_300, message: " mật khẩu không giống" };
        }
        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashPassWord,
            verified: false,
        });

        console.log("newUser>> serivce", newUser);

        await newUser.save()

        const token = jwt.sign({ userId: newUser._id }, 'verifyEmail', { expiresIn: "600s" });
        const url = `http://127.0.0.1:5173/verify/${token}`;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            to: newUser.email,
            subject: 'Verify your email',
            html: `Please click this link to verify your email: <a href="${url}">${url}</a>`,
        });

        return { status: process.env.STATUS_200, message: 'Registration successful, please check your email to verify your account' };

    } catch (error) {
        console.log(error);
        return { status: process.env.STATUS_500, message: 'error' };
    }
}

const TokenUserNew = async (token) => {

    try {
        const decoded = jwt.verify(token, 'verifyEmail');
        const user = await User.findById(decoded.userId);

        if (!user) {
            return { status: process.env.STATUS_300, message: "token không hợp lệ" };
        }
        user.isVerified = true;
        await user.save();
        return { status: process.env.STATUS_200, message: "token hợp lệ" };

    } catch (error) {
        console.log("error", error);
        return { status: process.env.STATUS_500, message: "lỗi" };
    }

}


const loginUserService = async (nameLogin, passwordLogin) => {
    try {
        //fect user by user
        const user = await User.findOne({ username: nameLogin })

        console.log("user", user);

        if (user) {

            const isMatchPassword = await bcrypt.compare(passwordLogin, user.password);
            if (!isMatchPassword) {
                return { status: process.env.STATUS_300 };
            } else {
                const payload = {
                    email: user.email,
                    username: user.username
                }

                const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                });

                return {
                    status: process.env.STATUS_200, accessToken: accessToken, user: {
                        email: user.email,
                        username: user.username,
                        isVerified: user.isVerified,
                    }
                };
            }

        } else {
            return {
                status: process.env.STATUS_500, accessToken: '', user: {
                    email: '',
                    username: '',
                    isVerified: '',
                }
            };
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const ResendEmail = async (emailcheck) => {
    try {
        const email = await User.findOne({ email: emailcheck });

        if (!email) {
            return { status: process.env.STATUS_404, message: 'Email chưa tồn tại' }
        }

        const token = jwt.sign({ userId: email._id }, 'verifyEmail', { expiresIn: "600s" });
        const url = `http://127.0.0.1:5173/verify/${token}`;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            to: email.email,
            subject: 'Verify your email',
            html: `Please click this link to verify your email: <a href="${url}">${url}</a>`,
        });
        return { status: process.env.STATUS_200, message: 'đã gởi mã email mới' };

    } catch (error) {
        console.log(error);
        return { status: process.env.STATUS_500, message: 'error' };
    }

}

module.exports = {
    createUserService,
    loginUserService, TokenUserNew,
    ResendEmail
}