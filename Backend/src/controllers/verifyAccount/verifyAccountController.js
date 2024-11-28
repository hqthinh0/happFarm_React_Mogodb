require('dotenv').config();
const { TokenUserNew } = require("../../services/userService");

const tokenUserVerify = async (req, res) => {

    const { token } = req.params;
    const data = await TokenUserNew(token);

    return res.json({
        status: process.env.STATUS_200,
        data
    });

}

module.exports = {
    tokenUserVerify,
}