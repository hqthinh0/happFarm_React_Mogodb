import HappyFarmRegister from "../pages/happyFarmRegister";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';


const TabLoginAndRegister = ({ }) => {

    const [activeTab, setActiveTab] = useState('login');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('/register')) {
            setActiveTab('register');
        } else if (location.pathname.includes('/login')) {
            setActiveTab('login');
        }
    }, [location.pathname]);

    const isLinkDisableLogin = location.pathname === '/forgotpassword' || location.pathname === '/success' || location.pathname === '/confirm-email' || location.pathname.startsWith('/verify/') || location.pathname.startsWith('/reset-password/') || location.pathname === '/reset-password' || location.pathname === '/resend-email';

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };


    return (
        <>
            <div className='box__inner'>
                <div className='box__grid grid-row'>
                    <div className='box__content'>
                        <div className='box__block'>
                            {!isLinkDisableLogin && (<div className='box__tab'>

                                <div className='box__tab--grid grid-row'>
                                    <div className={`box__tab--col ${activeTab === 'login' ? 'box__tab--active' : ''}`} onClick={() => handleTabClick('login')}  >
                                        <h4 className='hdg-lv4'>
                                            <NavLink to="/login">Login</NavLink>
                                        </h4>
                                    </div>
                                    <div className={`box__tab--col ${activeTab === 'register' ? 'box__tab--active' : ''}`} onClick={() => handleTabClick('register')}  >
                                        <h4 className='hdg-lv4'>
                                            <NavLink to="/register">Register</NavLink>
                                        </h4>
                                    </div>
                                </div>
                            </div>)}
                            <Outlet />
                            {!isLinkDisableLogin && (
                                <div className="forgotpassword">
                                    <NavLink to="/forgotpassword">Forgot Password!</NavLink>
                                </div>
                            )}
                            {location.pathname.startsWith('/verify/') && (
                                <div className="forgotpassword">
                                    <NavLink to="/login">Login</NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TabLoginAndRegister;