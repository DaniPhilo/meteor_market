import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/user_context'

export default function GuestLogin() {

    const { setIsAuthenticated } = useContext(UserContext);

    const navigate = useNavigate();

    const loginGuest = async () => {
        const data = {
            email: 'estanislao@gmail.com',
            password: 'Presidente73!'
        }

        const request = await fetch('https://pure-chamber-96021.herokuapp.com/api/auth/signIn', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const response = await request.json();
        if (!response.authenticated) {
            console.log(response.message);
            // setErrorMessage('Wrong username or password.');
            return
        }
        setIsAuthenticated(true);
        navigate('/home');
    }

    

    return (
        <div className="guest-container">
            <h3>Or sign in as a guest</h3>
            <button type='button' className='guest-btn' onClick={loginGuest}>Guest</button>
        </div>
    )
}
