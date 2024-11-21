import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import FormElement from "../../components/Authentication/FormElement.jsx";

export default function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Register successfully!')
        console.log('username: ', username)
        console.log('password: ', password)
        console.log('email: ', email)
    }

    return (
        <div className='authentication-form'>
            <div className='inner'>
                <form>
                    <h1>SIGN UP</h1>
                    <div className='name-grid'>
                        <FormElement htmlFor='firstname' description='First Name' type='text' id='firstname'
                                     value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <FormElement htmlFor='lastname' description='Last Name' type='text' id='lastname'
                                     value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <FormElement htmlFor='email' description='Email' type='email' id='email' value={email}
                                 onChange={(e) => setEmail(e.target.value)}/>
                    <FormElement htmlFor='password' description='Password' type='password' id='password'
                                 value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <FormElement htmlFor='confirm-password' description='Confirm Password' type='password'
                                 id='confirm-password' value={confirmPassword}
                                 onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <div className='checkbox'>
                        <input type='checkbox' id='terms'/>
                        <label htmlFor='terms'>I agree to the terms and conditions</label>
                    </div>
                    <button className='submit'>REGISTER NOW</button>
                    <div className='switch'>
                        <p>Already have an account?</p>
                        <NavLink to='/login'>Log in</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}