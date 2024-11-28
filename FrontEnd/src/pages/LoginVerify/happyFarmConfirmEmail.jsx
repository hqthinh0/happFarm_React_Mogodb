import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import warning from '../../assets/images/warning.png';
import CountdownTime from '../../components/acccount/CountdownTime.jsx';



const HappyFarmConfirmEmail = () => {
    let navigate = useNavigate();

    const handleResendEmail = (e) => {
        // Implement your email resend logic here, such as making an API call to resend the email

        e.preventDefault();
        navigate('/resend-email');
        console.log('Resending verification email...');
    };
    return (
        <>
            <div className='success'>
                <div className='grid-row gird-success'>
                    <img src={warning} alt="warning" />
                    <div>
                        <p className='success--p'>Đã gởi Email xác thực cho bạn</p>
                        <p className='success--p'>nếu không có Email hãy nhấn <a href="#" onClick={handleResendEmail}> tại đây </a></p>
                        <p className='success--p'>thời gian xác thực Email còn lại </p>
                        <CountdownTime time={300} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default HappyFarmConfirmEmail;