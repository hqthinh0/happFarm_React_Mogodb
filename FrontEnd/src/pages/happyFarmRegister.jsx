
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import { createUserAPI } from '../util/apiHappyFarm';
import { showSuccessToast, showErrorToast, ToastConfig, showWarningToast } from '../util/Toast/Toastify';


const HappyFarmRegister = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ firstname: '', lastname: '', username: '', email: '', password: '', confirmpassword: '', });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };



    const handleSubmitRegisterAPI = async (e) => {

        e.preventDefault();

        const { firstname, lastname, username, email, password, confirmpassword } = values;



        if (!firstname || !lastname || !username || !email || !password || !confirmpassword) {
            showWarningToast('vui lòng nhập đầy đủ thông tin');
        }
        else {
            try {
                const res = await createUserAPI(firstname, lastname, username, email, password, confirmpassword);
                if (res.data.status == 220) {
                    showWarningToast("Email đã tồn tại vui lòng sử dụng email khác");
                }
                if (res.data.status == 300) {
                    showWarningToast("mật khẩu không giống nhau vui lòng kiểm tra lại");
                }
                if (res.data.status == 200) {
                    showSuccessToast("Đã đăng ký thành công vui lòng xác thực email");
                    setTimeout(() => {
                        navigate('/confirm-email');
                    }, 1000);

                }


            } catch (error) {
                console.error("Error during registration:", error);
            }
        }
    };


    return (
        <>
            <form method="post" className="login-form register-form" onSubmit={handleSubmitRegisterAPI} >
                <div className='form'>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="firstname" placeholder="firstname" value={values.firstname} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" name="lastname" placeholder="Lastname" value={values.lastname} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="username">User Name</label>
                    <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" placeholder="Email" value={values.email} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="pasword">Password</label>
                    <input type="password" name="password" autoComplete="on" placeholder="Password" value={values.password} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="confirmpasword">Confirm Password</label>
                    <input type="password" name="confirmpassword" autoComplete="on" placeholder="Confirm Password" value={values.confirmpassword} onChange={handleInputChange} />
                </div>
                <button type="submit" className='btn btn-button'>Register</button>
            </form>
        </>
    )


}

export default HappyFarmRegister;