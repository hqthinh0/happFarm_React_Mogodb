import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forGotPassword } from '../../util/apiHappyFarm';

const HappyFarmForGotPassword = () => {
    const navigate = useNavigate();


    const [values, setValues] = useState({
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmitForgotpassword = async (e) => {
        e.preventDefault();

        const { email } = values;
        console.log("Requesting password reset for:", email);

        try {
            const res = await forGotPassword(email);

            console.log("res", res.data.data.email);


            if (res.data.status == 404) {
                console.log("sai email");

            } else {
                console.log("đang đổi pass của ", res.data.data.email);
            }
        } catch (error) {
            console.error("Lỗi login", error);
        }
    }

    return (
        <>
            <form method="post" className="login-form" onSubmit={handleSubmitForgotpassword}>
                <div className='form'>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Email" name="email" value={values.email} onChange={handleInputChange} />
                </div>
                <button type="submit" className='btn btn-button'>SendEmail</button>
            </form>
        </>
    )

}

export default HappyFarmForGotPassword;