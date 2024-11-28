import React, { useState } from "react";
import { loginUserAPI } from '../util/apiHappyFarm';
import { useNavigate } from "react-router-dom";

//import { validateForm } from '../util/Validation/happyFarmValidation';
import { showSuccessToast, showErrorToast, ToastConfig, showWarningToast } from '../util/Toast/Toastify';

const HappyFarmLogin = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmitLoginAPI = async (e) => {
        e.preventDefault();

        const { username, password } = values;
        try {
            if (!username || !password) {
                showErrorToast('Trường đăng nhập thiếu UserName hoặc Password');
                return;
            }
            const res = await loginUserAPI(username, password);
            console.log("res", res.data);

            if (res.data.status == 200) {
                if (res.data.isVerified === true) {
                    sessionStorage.setItem("access_token", res.data.accessToken);
                    showSuccessToast(`bạn đã đăng nhập thành công!, xin chào ${res.data.username}`);
                    navigate('/index');
                }
                else {
                    showWarningToast("bạn chưa xác thực tài khoản");
                    setTimeout(() => {
                        navigate('/resend-email');
                    }, 1000);
                }
            }
            else {
                showErrorToast('sai userName hoặc password');
            }

        } catch (error) {
            console.error("Lỗi login", error);
        }
    }

    return (
        <>
            <form method="post" className="login-form" onSubmit={handleSubmitLoginAPI}>
                <div className='form'>
                    <label htmlFor="username or email">User Name</label>
                    <input type="text" placeholder="username" name="username" className={errors.username ? "error-border" : ""} value={values.username} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="pasword">Password</label>
                    <input type="password" placeholder="password" name="password" autoComplete="on" className={errors.username ? "error-border" : ""} value={values.password} onChange={handleInputChange} />
                </div>
                <button type="submit" className='btn btn-button'>login</button>
            </form>

        </>
    )


}

export default HappyFarmLogin;