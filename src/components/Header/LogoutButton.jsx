import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutButton() {
    const dispatch = useDispatch();

    // as in authService the logout() (from appwrite) gives a promise back
    // we used then with it.. to handle the logout functionality properly.
    // and ran dispatch within it, so that the state stay updated, that the user is logged out.
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    };
    return (
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-700 rounded-full'
        style={{ color: "white" }}
        onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutButton;


