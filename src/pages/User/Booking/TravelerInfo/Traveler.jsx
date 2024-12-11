import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputElement from "../../../../components/Form/InputElement.jsx";
import TitleSelector from "../../../../components/Form/TitleSelector.jsx";
import './Traveler.css';
import CountryCodeSelector from "../../../../components/Form/CountryCodeSelector.jsx";

export default function Traveler() {
    const location = useLocation();
    const { outboundFlight, returnFlight, adults, children, infants, outboundSeatType, returnSeatType } = location.state;

    const [acceptTerms, setAcceptTerms] = useState(false);
    const [adultDetails, setAdultDetails] = useState(Array(adults).fill({ title: '', firstName: '', lastName: '', dob: '' }));
    const [childDetails, setChildDetails] = useState(Array(children).fill({ firstName: '', lastName: '', dob: '' }));
    const [infantDetails, setInfantDetails] = useState(Array(infants).fill({ firstName: '', lastName: '', dob: '' }));
    const [contactInfo, setContactInfo] = useState({ email: '', phoneNumber: '', citizenId: '', country: '' });

    const navigate = useNavigate();

    const handleInputChange = (index, field, value, type) => {
        const updatedDetails = type === 'adult' ? [...adultDetails] : type === 'child' ? [...childDetails] : [...infantDetails];
        updatedDetails[index] = { ...updatedDetails[index], [field]: value };
        type === 'adult' ? setAdultDetails(updatedDetails) : type === 'child' ? setChildDetails(updatedDetails) : setInfantDetails(updatedDetails);
    };

    const handleContactChange = (field, value) => {
        setContactInfo({ ...contactInfo, [field]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!acceptTerms) {
            alert('You must accept the terms and conditions.');
        }
        //update backend database
    };

    return (
        <div>
            <div className='form customer-data'>
                <h1>CUSTOMER DATA</h1>
                <form onSubmit={handleSubmit}>
                    {adultDetails.map((adult, index) => (
                        <div key={index}>
                            <h2>Adult {index + 1}</h2>
                            <TitleSelector
                                htmlFor={`title-${index}`}
                                description='Title'
                                id={`title-${index}`}
                                value={adult.title}
                                onChange={(e) => handleInputChange(index, 'title', e.target.value, 'adult')}
                                required={true}
                            />
                            <InputElement
                                htmlFor={`first-name-${index}`}
                                description='First Name'
                                type='text'
                                id={`first-name-${index}`}
                                value={adult.firstName}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value, 'adult')}
                            />
                            <InputElement
                                htmlFor={`last-name-${index}`}
                                description='Last Name'
                                type='text'
                                id={`last-name-${index}`}
                                value={adult.lastName}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'lastName', e.target.value, 'adult')}
                            />
                            <InputElement
                                htmlFor={`dob-${index}`}
                                description='Date of Birth'
                                type='date'
                                id={`dob-${index}`}
                                value={adult.dob}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'dob', e.target.value, 'adult')}
                            />
                        </div>
                    ))}
                    {childDetails.map((child, index) => (
                        <div key={index}>
                            <h2>Child {index + 1}</h2>
                            <InputElement
                                htmlFor={`child-first-name-${index}`}
                                description='First Name'
                                type='text'
                                id={`child-first-name-${index}`}
                                value={child.firstName}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value, 'child')}
                            />
                            <InputElement
                                htmlFor={`child-last-name-${index}`}
                                description='Last Name'
                                type='text'
                                id={`child-last-name-${index}`}
                                value={child.lastName}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'lastName', e.target.value, 'child')}
                            />
                            <InputElement
                                htmlFor={`child-dob-${index}`}
                                description='Date of Birth'
                                type='date'
                                id={`child-dob-${index}`}
                                value={child.dob}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'dob', e.target.value, 'child')}
                            />
                        </div>
                    ))}
                    {infantDetails.map((infant, index) => (
                        <div key={index}>
                            <h2>Infant {index + 1}</h2>
                            <InputElement
                                htmlFor={`infant-first-name-${index}`}
                                description='First Name'
                                type='text'
                                id={`infant-first-name-${index}`}
                                value={infant.firstName}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value, 'infant')}
                            />
                            <InputElement
                                htmlFor={`infant-last-name-${index}`}
                                description='Last Name'
                                type='text'
                                id={`infant-last-name-${index}`}
                                value={infant.lastName}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'lastName', e.target.value, 'infant')}
                            />
                            <InputElement
                                htmlFor={`infant-dob-${index}`}
                                description='Date of Birth'
                                type='date'
                                id={`infant-dob-${index}`}
                                value={infant.dob}
                                required={true}
                                onChange={(e) => handleInputChange(index, 'dob', e.target.value, 'infant')}
                            />
                        </div>
                    ))}
                    <h2>Contact Information</h2>
                    <InputElement
                        htmlFor='email'
                        description='Email'
                        type='email'
                        id='email'
                        value={contactInfo.email}
                        required={true}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                    />
                    <CountryCodeSelector htmlFor={'country'} description={'Country'} id={'country'} value={contactInfo.country} onChange={(e) => handleContactChange('country', e.target.value)} />
                    <InputElement
                        htmlFor='phone-number'
                        description='Phone Number'
                        type='text'
                        id='phone-number'
                        value={contactInfo.phoneNumber}
                        onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
                    />
                    <InputElement
                        htmlFor='citizen-id'
                        description='Citizen ID'
                        type='text'
                        id='citizen-id'
                        value={contactInfo.citizenId}
                        onChange={(e) => handleContactChange('citizenId', e.target.value)}
                    />
                    <div>
                        <input type='checkbox' id='accept-terms' checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                        <label htmlFor='accept-terms'>I accept the terms and conditions</label>
                    </div>
                    <button type='submit' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}