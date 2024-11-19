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
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Register successfully!')
        console.log('username: ', username)
        console.log('password: ', password)
        console.log('email: ', email)
    }

    return (
        <div className='signup-form'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='name'>
                    <FormElement htmlFor='firstname' description='First Name' type='text' id='firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <FormElement htmlFor='lastname' description='Last Name' type='text' id='lastname' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <FormElement htmlFor='email' description='Email' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <FormElement htmlFor='username' description='Username' type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <FormElement htmlFor='password' description='Password' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <FormElement htmlFor='confirmPassword' description='Confirm Password' type='password' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <FormElement htmlFor='phoneNumber' description='Phone Number' type='text' id='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                <FormElement htmlFor='dateOfBirth' description='Date of Birth' type='date' id='dateOfBirth' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                <div className='gender'>
                    <label>Gender</label>
                    <FormElement htmlFor='male' description='Male' type='radio' id='male' name='gender' value='Male' onChange={(e) => setGender(e.target.value)}/>
                    <FormElement htmlFor='female' description='Female' type='radio' id='male' name='gender' value='Female' onChange={(e) => setGender(e.target.value)}/>
                </div>
                <button className='submit'>Sign up</button>
            </form>
            <div className='switchToLogin'>
                <p>Already have an account?</p>
                <NavLink to='/login'>Log in</NavLink>
            </div>
        </div>
    )
}