import React, { useState } from 'react'
import {NavLink} from "react-router-dom";
import FormElement from "../../components/Authentication/FormElement.jsx"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Username: ', username)
        console.log('Password: ', password)
    }

    return (
        <div className='login-form'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <FormElement htmlFor='username' description='Username' type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <FormElement htmlFor='password' description='Password' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
            <div className='switchToSignup'>
                <p>Don't have an account?</p>
                <NavLink to='/signup'>Sign up</NavLink>
            </div>
        </div>
    )
}