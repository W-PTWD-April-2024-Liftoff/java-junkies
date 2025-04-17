import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";


const LogOut = () => {
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth0();

    const handleLogout = async () => {
        try {

            const passwordLogin = localStorage.getItem('passwordLogin') === 'true';

            if (passwordLogin) {
                const response = await fetch('http://localhost:5176/api/user/logout', {
                    method: 'POST',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to log out from password login');
                }
                localStorage.removeItem('passwordLogin');
                navigate('/user/login');
            } else if (isAuthenticated) {
                logout({
                    logoutParams: {
                        returnTo: `${window.location.origin}/user/login`
                    }
                });
            }
        } catch (error) {
            console.error('Error logging out: ', error);
            alert('Error logging out. Try again.');
        }
    };

    return (
        <Button
            variant='link'
            className='nav-link'
            text='Log Out'
            onClick={handleLogout}
        />
    );
};

export default LogOut;