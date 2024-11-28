import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from './App.jsx'
import HappyFarmRegister from './pages/happyFarmRegister.jsx';
import HappyFarmLogin from './pages/happyFarmLogin.jsx';
import HappyFarmForGotPassword from './pages/ForgotPassword/happyFarmForgotPasword.jsx';
import HappyFarmPasswordReset from './pages/ForgotPassword/happyFarmForgotPasword.jsx';
import HappyFarmSuccess from './pages/ForgotPassword/happyFarmForgotSuccess.jsx';
import HappyFarmVerifyEmail from './pages/LoginVerify/happyFarmCheckVerifyEmail.jsx';
import HappyFarmChangedPassword from './pages/ChangedPassword/happyFarmChangedPassword.jsx';
import HappyFarmConfirmEmail from './pages/LoginVerify/happyFarmConfirmEmail.jsx';
import HappyFarmResendPassword from './pages/LoginVerify/happyFarmResendActiveEmail.jsx';
import HappyFarmGameIndex from './pages/HappyFarmGame/happyFarmGame.jsx';

import RedirectIfAuthenticated from './redirectIfAuthenticated.jsx';
import ProtectedRoute from './protectedRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <RedirectIfAuthenticated element={<HappyFarmLogin />} />,
      },
      {
        path: "/login",
        element: <RedirectIfAuthenticated element={<HappyFarmLogin />} />,
      },
      {
        path: "/register",
        element: <RedirectIfAuthenticated element={<HappyFarmRegister />} />,
      },
      {
        path: "/forgotpassword",
        element: <RedirectIfAuthenticated element={<HappyFarmForGotPassword />} />,
      },
      {
        path: "/reset-password",
        element: <RedirectIfAuthenticated element={<HappyFarmPasswordReset />} />,
      },
      {
        path: "/reset-password/:id/:token",
        element: <RedirectIfAuthenticated element={<HappyFarmChangedPassword />} />,
      },
      {
        path: "/success",
        element: <RedirectIfAuthenticated element={<HappyFarmSuccess />} />,
      },
      {
        path: "/confirm-email",
        element: <RedirectIfAuthenticated element={<HappyFarmConfirmEmail />} />,
      },
      {
        path: "/verify/:token",
        element: <RedirectIfAuthenticated element={<HappyFarmVerifyEmail />} />,
      },
      {
        path: "/resend-email",
        element: <RedirectIfAuthenticated element={<HappyFarmResendPassword />} />,
      },
    ],
  },
  {
    path: "/index",
    element: <ProtectedRoute element={<HappyFarmGameIndex />} />, // Trang yêu cầu đăng nhập
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
