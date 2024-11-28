import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { verifyEmailAccount } from '../../util/apiHappyFarm';
import success from '../../assets/images/check.png';

const HappyFarmVerifyEmail = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await verifyEmailAccount(token);
                // const response = await axios.get(`http://localhost:8080/api/verify/${token}`);
                setMessage(res.data.message);
            } catch (err) {
                setMessage('Verification failed or token expired');
            }
        };

        verifyToken();
    }, [token]);

    return (
        <>
            <div className='success'>
                <div className='grid-row gird-success'>
                    <img src={success} alt="success" />
                    <p className='success--p'>bạn đã xác thực email thành công </p>
                </div>
            </div>

        </>
    )
};

export default HappyFarmVerifyEmail;