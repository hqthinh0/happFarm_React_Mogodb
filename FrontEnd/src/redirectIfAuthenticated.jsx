import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ element }) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = sessionStorage.getItem('access_token');
    console.log("accessToken RedirectIfAuthenticated", accessToken);


    if (accessToken) {
        return <Navigate to="/index" />; // Điều hướng đến trang chính nếu đã đăng nhập
    }

    return element;
};

export default RedirectIfAuthenticated;