import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { resendEmail } from '../../util/apiHappyFarm';
import { showSuccessToast, showErrorToast, ToastConfig, showWarningToast } from '../../util/Toast/Toastify';

const HappyFarmResendPassword = () => {
    const navigate = useNavigate();


    const [values, setValues] = useState({
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmitResendPassword = async (e) => {
        e.preventDefault();

        const { email } = values;
        console.log("Requesting password reset for:", email);
        if (email === '') {
            showErrorToast("bạn chưa điền email!");
            return;
        }

        try {
            const res = await resendEmail(email);
            if (res.data.status == 404) {
                showWarningToast("email bạn nhập không tồn tại")
            }
            if (res.data.status == 200) {
                showSuccessToast("bạn vui lòng kiểm tra hòm thư email của mình");
                setTimeout(() => {
                    navigate('/confirm-email');
                }, 1000);
            }
        } catch (error) {
            console.error("Lỗi login", error);
        }
    }

    return (
        <>
            <form method="post" className="login-form" onSubmit={handleSubmitResendPassword}>
                <div className='form'>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" name="email" value={values.email} onChange={handleInputChange} />
                </div>
                <button type="submit" className='btn btn-button'>Resend Email</button>
            </form>
        </>
    )

}

export default HappyFarmResendPassword;