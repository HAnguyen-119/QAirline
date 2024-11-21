import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import FormElement from "../../components/Authentication/FormElement.jsx"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Username: ', username)
        console.log('Password: ', password)
    }

    return (
        <div className='authentication-form'>
            <div className='inner'>
                <form onSubmit={handleSubmit}>
                    <h1>LOGIN</h1>
                    <FormElement htmlFor='email' description='Email' type='email' id='email' value={email}
                                 onChange={(e) => setEmail(e.target.value)}/>
                    <FormElement htmlFor='password' description='Password' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className='submit'>Login</button>
                    <div className='switch'>
                        <p>Don't have an account?</p>
                        <NavLink to='/signup'>Sign up</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}