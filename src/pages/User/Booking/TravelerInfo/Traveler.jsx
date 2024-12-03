import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../../../../Context/BookingContext.jsx';
import InputElement from "../../../../components/Form/InputElement.jsx";
import SelectElement from "../../../../components/Form/SelectElement.jsx";

import './Traveler.css';


export default function UserInfo() {
    const { bookingInfo, setBookingInfo } = useContext(BookingContext);
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [citizenId, setCitizenId] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!acceptTerms) {
            alert('You must accept the terms and conditions.');
            return;
        }
        const updatedBookingInfo = {
            ...bookingInfo,
            travelerInfo: {
                title, firstName, lastName, citizenId, address, city, postalCode, country, countryCode, phoneNumber, dob
            }
        };
        setBookingInfo(updatedBookingInfo);
        console.log('Updated Booking Info:', updatedBookingInfo); // Log the updated booking info
        navigate('/booking/ticket-info');
    };

    return (
        <div>
            <div className='form customer-data'>
                <h1>CUSTOMER DATA</h1>
                <form onSubmit={handleSubmit}>
                    <SelectElement htmlFor='title' description='Title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} options={['Mr', 'Mrs', 'Miss']}/>
                    <InputElement htmlFor='first-name' description='First Name' type='text' id='first-name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <InputElement htmlFor='last-name' description='Last Name' type='text' id='last-name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <InputElement htmlFor='citizen-id' description='Citizen ID' type='text' id='citizen-id' value={citizenId} onChange={(e) => setCitizenId(e.target.value)}/>
                    <InputElement htmlFor='address' description='Address' type='text' id='address' value={address} onChange={(e) => setAddress(e.target.value)}/>
                    <InputElement htmlFor='city' description='City' type='text' id='city' value={city} onChange={(e) => setCity(e.target.value)}/>
                    <InputElement htmlFor='postal-code' description='Postal Code' type='text' id='postal-code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
                    <InputElement htmlFor='country' description='Country' type='text' id='country' value={country} onChange={(e) => setCountry(e.target.value)}/>
                    <SelectElement htmlFor='country-code' description='Country Code' id='country-code' value={countryCode} onChange={(e) => setCountryCode(e.target.value)} options={['Vietnam (+84)', 'USA (+1)', 'UK (+44)']}/>
                    <InputElement htmlFor='phone-number' description='Phone Number' type='text' id='phone-number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <InputElement htmlFor='dob' description='Date of Birth' type='date' id='dob' value={dob} onChange={(e) => setDob(e.target.value)}/>
                    <div>
                        <input type='checkbox' id='accept-terms' checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                        <label htmlFor='accept-terms'>I accept the terms and conditions</label>
                    </div>
                    <button className='submit' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}