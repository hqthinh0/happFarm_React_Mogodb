import React, { useState } from "react";

const HappyFarmPasswordReset = () => {

    const [values, setValues] = useState({
        password: '',
        confirmpassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <>
            <form className="login-form">
                <div className='form'>
                    <label htmlFor="email">password</label>
                    <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleInputChange} />
                </div>
                <div className='form'>
                    <label htmlFor="confirmpasword">Confirm Password</label>
                    <input type="password" name="confirmpassword" placeholder="Password" value={values.confirmpassword} onChange={handleInputChange} />
                </div>
                <button className='btn btn-button'>SendEmail</button>
            </form>
        </>
    )

}

export default HappyFarmPasswordReset;