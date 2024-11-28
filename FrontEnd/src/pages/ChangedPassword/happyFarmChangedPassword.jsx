// HappyFarmChangedPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { EmailAccountResetPassword } from '../../util/apiHappyFarm';
import { showSuccessToast, showErrorToast, ToastConfig, showWarningToast } from '../../util/Toast/Toastify';

const HappyFarmChangedPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
    });




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmitChangedPassword = async (e) => {
        const { password, confirmPassword } = values;
        e.preventDefault();

        try {

            const response = await EmailAccountResetPassword(id, token, password, confirmPassword);

            if (response.data.status == 220) {
                showErrorToast('vui lòng nhập đủ thông tin password và confirmPassword');
                return;
            }

            if (response.data.status == 400) {
                showWarningToast("mật khẩu của bạn không trùng khớp");
            }
            if (response.data.status == 200) {
                showSuccessToast("mật khẩu đã được đổi thành công, 3s sau sẽ về lại trang đăng nhập");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            }

        } catch (error) {
            showErrorToast('Lỗi khi đặt lại mật khẩu.')
        }
    };

    return (
        <div className='resetpass'>
            <h3 className='hdg-lv3'>Đặt Lại Mật Khẩu</h3>
            <p >Xin chào bạn!, bạn hãy đổi lại mật khẩu của mình </p>
            <form method="post" className="login-form" onSubmit={handleSubmitChangedPassword}>
                <div className='form'>
                    <label htmlFor="email">Password</label>
                    <input type="text" placeholder="Mật khẩu mới" name="password" value={values.password} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="email">confirmPassword</label>
                    <input type="text" placeholder="Nhập Lại Mật khẩu mới" name="confirmPassword" value={values.confirmPassword} onChange={handleInputChange} />
                </div>
                <button type="submit" className='btn btn-button'>Reset Password</button>
            </form>
        </div>
    );
};

export default HappyFarmChangedPassword;