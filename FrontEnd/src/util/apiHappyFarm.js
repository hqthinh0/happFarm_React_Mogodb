import axios from './axios.customsize';


const createUserAPI = (firstname, lastname, username, email, password, confirmpassword) => {
    const URL_API = "/api/register";

    console.log("datacreateUserAPI", firstname, lastname, username, email, password, confirmpassword);

    const data = {
        firstname, lastname, username, email, password, confirmpassword
    }
    return axios.post(URL_API, data);
}


const loginUserAPI = (username, password) => {
    const URL_API = "/api/login";

    console.log("username, password", username, password);


    const loginAPI = {
        username, password,
    }
    return axios.post(URL_API, loginAPI);
}

const forGotPassword = (email) => {
    const URL_API = "/api/forgotpassword";

    const forgotpassword = {
        email,
    }
    return axios.post(URL_API, forgotpassword);
}

const resendEmail = (email) => {
    const URL_API = "/api/resendemail";

    const resendemailcheck = {
        email,
    }
    return axios.post(URL_API, resendemailcheck);
}



const verifyEmailAccount = (token) => {
    const URL_API = `/api/verify/${token}`;
    return axios.get(URL_API);
}


const EmailAccountResetPassword = (id, token, password, confirmPassword) => {
    const URL_API = `/api/reset-password/${id}/${token}`;
    return axios.post(URL_API, { password, confirmPassword });
};

export {
    createUserAPI,
    loginUserAPI,
    forGotPassword,
    verifyEmailAccount,
    EmailAccountResetPassword,
    resendEmail
}