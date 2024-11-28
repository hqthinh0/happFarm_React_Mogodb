import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = sessionStorage.getItem('access_token');
    console.log("accessToken RedirectIfAuthenticated", accessToken);
    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;