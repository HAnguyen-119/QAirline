import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import InputElement from "../../../../components/Form/InputElement.jsx";
import TitleSelector from "../../../../components/Form/TitleSelector.jsx";
import './Traveler.css';
import CountryCodeSelector from "../../../../components/Form/CountryCodeSelector.jsx";
import {NUMBER_REGEX, SPECIAL_CHAR_REGEX} from "../../../../data/RegEx.js";
import {
    EmailValidation,
    getAdultDay,
    getChildDay, getInfantDay,
    NameValidation,
    PhoneValidation
} from "../../../../utils/Validation.js";
import userAPI from "../../../../api/userAPI.jsx";

export default function Traveler() {
    const location = useLocation();
    const { outboundFlight, returnFlight, adults, children, infants, outboundSeatType, returnSeatType, total } = location.state;

    const [acceptTerms, setAcceptTerms] = useState(false);
    const [adultDetails, setAdultDetails] = useState(Array(adults).fill({ title: '', firstName: '', lastName: '', dob: '', firstNameTooltip: { message: 'Names must contain only letters and spaces (a-z, A-Z).', type: 'hint', visible: false }, lastNameTooltip: { message: 'Names must contain only letters and spaces (a-z, A-Z).', type: 'hint', visible: false }, dobTooltip: { message: 'Please enter a valid date of birth (over 12yrs).', type: 'error', visible: false } }));
    const [childDetails, setChildDetails] = useState(Array(children).fill({ firstName: '', lastName: '', dob: '', firstNameTooltip: { message: 'Names must contain only letters and spaces (a-z, A-Z).', type: 'hint', visible: false }, lastNameTooltip: { message: 'Names must contain only letters and spaces (a-z, A-Z).', type: 'hint', visible: false }, dobTooltip: { message: 'Please enter a valid date of birth (between 2 and 12 yrs).', type: 'error', visible: false } }));
    const [infantDetails, setInfantDetails] = useState(Array(infants).fill({ firstName: '', lastName: '', dob: '', firstNameTooltip: { message: 'Names must contain only letters and spaces (a-z, A-Z).', type: 'hint', visible: false }, lastNameTooltip: { message: 'Names must contain only letters and spaces (a-z, A-Z).', type: 'hint', visible: false }, dobTooltip: { message: 'Please enter a valid date of birth (under 2yrs).', type: 'error', visible: false } }));
    const [contactInfo, setContactInfo] = useState({ email: '', phoneNumber: '', citizenId: '', country: '', emailTooltip: {message: 'eg: abc@def.fgh', type:'hint', visible: false }, phoneTooltip: {message: 'eg: 0123456789', type:'hint', visible: false } });

    const navigate = useNavigate();

    const handleInputChange = (index, field, value, type) => {
        const updatedDetails = type === 'adult' ? [...adultDetails] : type === 'child' ? [...childDetails] : [...infantDetails];
        updatedDetails[index] = { ...updatedDetails[index], [field]: value };

        if (field === 'firstName') {
            if (value === '') {
                updatedDetails[index].firstNameTooltip = { message: 'This field is required!', type: 'error', visible: true };
            } else if (NUMBER_REGEX.test(value)) {
                updatedDetails[index].firstNameTooltip = { message: 'Name cannot contain numbers.', type: 'error', visible: true };
            } else if (SPECIAL_CHAR_REGEX.test(value)) {
                updatedDetails[index].firstNameTooltip = { message: 'Name cannot contain special characters.', type: 'error', visible: true };
            } else {
                updatedDetails[index].firstNameTooltip = { message: 'Your name validated!', type: 'hint', visible: true };
            }
        }

        if (field === 'lastName') {
            if (value === '') {
                updatedDetails[index].lastNameTooltip = { message: 'This field is required!', type: 'error', visible: true };
            } else if (NUMBER_REGEX.test(value)) {
                updatedDetails[index].lastNameTooltip = { message: 'Name cannot contain numbers.', type: 'error', visible: true };
            } else if (SPECIAL_CHAR_REGEX.test(value)) {
                updatedDetails[index].lastNameTooltip = { message: 'Name cannot contain special characters.', type: 'error', visible: true };
            } else {
                updatedDetails[index].lastNameTooltip = { message: 'Your name validated!', type: 'hint', visible: true };
            }
        }

        if (field === 'dob') {
            console.log(value);
            let isValid = false;
            let message = '';

            if (type === 'adult') {
                isValid = new Date(value) <= new Date(getAdultDay());
                message = isValid ? 'Your date of birth validated!' : 'Please enter a valid date of birth (over 12yrs).';
            } else if (type === 'child') {
                const { minDate, maxDate } = getChildDay();
                isValid = new Date(value) >= new Date(minDate) && new Date(value) <= new Date(maxDate);
                message = isValid ? 'Your date of birth validated!' : 'Please enter a valid date of birth (between 2 and 12 yrs).';
            } else if (type === 'infant') {
                isValid = new Date(value) >= new Date(getInfantDay()) && new Date(value) <= new Date();
                message = isValid ? 'Your date of birth validated!' : 'Please enter a valid date of birth (under 2yrs).';
            }

            updatedDetails[index].dobTooltip = { message, type: isValid ? 'hint' : 'error', visible: true };
        }

        type === 'adult' ? setAdultDetails(updatedDetails) : type === 'child' ? setChildDetails(updatedDetails) : setInfantDetails(updatedDetails);
    };

    const handleContactChange = (field, value) => {
        const updatedContactInfo = { ...contactInfo, [field]: value };

        if (field === 'email') {
            if (value === '') {
                updatedContactInfo.emailTooltip = { message: 'This field is required!', type: 'error', visible: true };
            } else if (!EmailValidation(value)) {
                updatedContactInfo.emailTooltip = { message: 'Invalid email format!', type: 'error', visible: true };
            } else {
                updatedContactInfo.emailTooltip = { message: 'Your email validated!', type: 'hint', visible: true };
            }
        }

        if (field === 'phoneNumber') {
            if (value === '') {
                updatedContactInfo.phoneTooltip = { message: 'This field is required!', type: 'error', visible: true };
            } else if (!NUMBER_REGEX.test(value)) {
                updatedContactInfo.phoneTooltip = { message: 'Phone number only includes numbers!', type: 'error', visible: true };
            } else if (!PhoneValidation(value)) {
                updatedContactInfo.phoneTooltip = { message: 'Phone number has 10 digits!', type: 'error', visible: true };
            } else {
                updatedContactInfo.phoneTooltip = { message: 'Your phone number validated!', type: 'hint', visible: true };
            }
        }

        setContactInfo(updatedContactInfo);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (focusFirstError()) {
            return;
        }

        if (!acceptTerms) {
            alert('You must accept the terms and conditions.');
            return;
        }

        const bookingData = {
            email: contactInfo.email,
            phoneNumber: contactInfo.phoneNumber,
            seatClass: outboundSeatType,
            returnSeatClass: returnFlight.id != null ? returnSeatType : null,
            price: total,
            isRoundTrip: returnFlight.id != null,
            bookingStatus: "PENDING",
            flight: {
                id: outboundFlight.id
            },
            returnFlight: returnFlight.id != null ? { id: returnFlight.id } : null,
            passengers: [
                ...adultDetails.map(adult => ({
                    passengerTitle: adult.title === '' ? 'MR' : adult.title,
                    firstname: NameValidation(adult.firstName),
                    lastname: NameValidation(adult.lastName),
                    passengerType: "ADULT",
                    dob: adult.dob
                })),
                ...childDetails.map(child => ({
                    passengerTitle: child.title,
                    firstname: NameValidation(child.firstName),
                    lastname: NameValidation(child.lastName),
                    passengerType: "CHILD",
                    dob: child.dob
                })),
                ...infantDetails.map(infant => ({
                    passengerTitle: infant.title,
                    firstname: NameValidation(infant.firstName),
                    lastname: NameValidation(infant.lastName),
                    passengerType: "INFANT",
                    dob: infant.dob
                }))
            ]
        };
        console.log(bookingData)
        try {
            const response = await userAPI.addBooking(bookingData);
            console.log(response)
            navigate('/booking/payment', { state: { booking: response } });
        } catch (error) {
            console.error("Error adding booking:", error);
        }
    };

    const focusFirstError = () => {
        const findError = (details) => {
            for (let i = 0; i < details.length; i++) {
                if (details[i].firstNameTooltip.type === 'error') {
                    document.getElementById(`first-name-${i}`).focus();
                    return true;
                }
                if (details[i].lastNameTooltip.type === 'error') {
                    document.getElementById(`last-name-${i}`).focus();
                    return true;
                }
                if (details[i].dobTooltip.type === 'error') {
                    document.getElementById(`dob-${i}`).focus();
                    return true;
                }
                console.log(details[i].dobTooltip.type);
            }
            return false;
        };

        if (findError(adultDetails) || findError(childDetails) || findError(infantDetails)) {
            return true;
        }

        if (contactInfo.emailTooltip.type === 'error') {
            document.getElementById('email').focus();
            return true;
        }
        if (contactInfo.phoneTooltip.type === 'error') {
            document.getElementById('phone-number').focus();
            return true;
        }

        return false;
    };

    return (
        <div className='form customer-data'>
            <h1>CUSTOMER DATA</h1>
            <form onSubmit={handleSubmit}>
                <div className='passenger-info'>
                    {adultDetails.map((adult, index) => (
                        <div className='passenger-data' key={index}>
                            <h2>Adult {index + 1}</h2>
                            <TitleSelector
                                htmlFor={`title-${index}`}
                                description='Title'
                                id={`title-${index}`}
                                value={adult.title}
                                onChange={(e) => handleInputChange(index, 'title', e.target.value, 'adult')}
                                required={true}
                            />
                            <div className='name'>
                                <div className='input-container'>
                                    <InputElement
                                        htmlFor={`first-name-${index}`}
                                        description='First Name'
                                        type='text'
                                        id={`first-name-${index}`}
                                        value={adult.firstName}
                                        required={true}
                                        onChange={(e) => handleInputChange(index, 'firstName', e.target.value, 'adult')}
                                        onFocus={() => setAdultDetails(adultDetails.map((a, i) => i === index ? { ...a, firstNameTooltip: { ...a.firstNameTooltip, visible: true } } : a))}
                                        onBlur={() => setAdultDetails(adultDetails.map((a, i) => i === index ? { ...a, firstNameTooltip: { ...a.firstNameTooltip, visible: false } } : a))}
                                    />
                                    {adult.firstNameTooltip.visible && (
                                        <div className={`tooltip ${adult.firstNameTooltip.type}`}>
                                            {adult.firstNameTooltip.message}
                                        </div>
                                    )}
                                </div>
                                <div className='input-container'>
                                    <InputElement
                                        htmlFor={`last-name-${index}`}
                                        description='Last Name'
                                        type='text'
                                        id={`last-name-${index}`}
                                        value={adult.lastName}
                                        required={true}
                                        onChange={(e) => handleInputChange(index, 'lastName', e.target.value, 'adult')}
                                        onFocus={() => setAdultDetails(adultDetails.map((a, i) => i === index ? { ...a, lastNameTooltip: { ...a.lastNameTooltip, visible: true } } : a))}
                                        onBlur={() => setAdultDetails(adultDetails.map((a, i) => i === index ? { ...a, lastNameTooltip: { ...a.lastNameTooltip, visible: false } } : a))}
                                    />
                                    {adult.lastNameTooltip.visible && (
                                        <div className={`tooltip ${adult.lastNameTooltip.type}`}>
                                            {adult.lastNameTooltip.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='input-container'>
                                <InputElement
                                    htmlFor={`dob-${index}`}
                                    description='Date of Birth'
                                    type='date'
                                    id={`dob-${index}`}
                                    value={adult.dob}
                                    required={true}
                                    onChange={(e) => handleInputChange(index, 'dob', e.target.value, 'adult')}
                                    maxDate={getAdultDay()}
                                    onFocus={() => setAdultDetails(adultDetails.map((a, i) => i === index ? { ...a, dobTooltip: { ...a.dobTooltip, visible: true } } : a))}
                                    onBlur={() => setAdultDetails(adultDetails.map((a, i) => i === index ? { ...a, dobTooltip: { ...a.dobTooltip, visible: false } } : a))}
                                />
                                {adult.dobTooltip.visible && (
                                    <div className={`tooltip ${adult.dobTooltip.type}`}>
                                        {adult.dobTooltip.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {childDetails.map((child, index) => (
                        <div className='passenger-data' key={index}>
                            <h2>Child {index + 1}</h2>
                            <TitleSelector
                                htmlFor={`title-${index}`}
                                description='Title'
                                id={`title-${index}`}
                                value={child.title}
                                onChange={(e) => handleInputChange(index, 'title', e.target.value, 'child')}
                                required={true}
                            />
                            <div className='name'>
                                <div className='input-container'>
                                    <InputElement
                                        htmlFor={`child-first-name-${index}`}
                                        description='First Name'
                                        type='text'
                                        id={`child-first-name-${index}`}
                                        value={child.firstName}
                                        required={true}
                                        onChange={(e) => handleInputChange(index, 'firstName', e.target.value, 'child')}
                                        onFocus={() => setChildDetails(childDetails.map((c, i) => i === index ? { ...c, firstNameTooltip: { ...c.firstNameTooltip, visible: true } } : c))}
                                        onBlur={() => setChildDetails(childDetails.map((c, i) => i === index ? { ...c, firstNameTooltip: { ...c.firstNameTooltip, visible: false } } : c))}
                                    />
                                    {child.firstNameTooltip.visible && (
                                        <div className={`tooltip ${child.firstNameTooltip.type}`}>
                                            {child.firstNameTooltip.message}
                                        </div>
                                    )}
                                </div>
                                <div className='input-container'>
                                    <InputElement
                                        htmlFor={`child-last-name-${index}`}
                                        description='Last Name'
                                        type='text'
                                        id={`child-last-name-${index}`}
                                        value={child.lastName}
                                        required={true}
                                        onChange={(e) => handleInputChange(index, 'lastName', e.target.value, 'child')}
                                        onFocus={() => setChildDetails(childDetails.map((c, i) => i === index ? { ...c, lastNameTooltip: { ...c.lastNameTooltip, visible: true } } : c))}
                                        onBlur={() => setChildDetails(childDetails.map((c, i) => i === index ? { ...c, lastNameTooltip: { ...c.lastNameTooltip, visible: false } } : c))}
                                    />
                                    {child.lastNameTooltip.visible && (
                                        <div className={`tooltip ${child.lastNameTooltip.type}`}>
                                            {child.lastNameTooltip.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='input-container'>
                                <InputElement
                                    htmlFor={`child-dob-${index}`}
                                    description='Date of Birth'
                                    type='date'
                                    id={`child-dob-${index}`}
                                    value={child.dob}
                                    required={true}
                                    onChange={(e) => handleInputChange(index, 'dob', e.target.value, 'child')}
                                    minDate={getChildDay().minDate}
                                    maxDate={getChildDay().maxDate}
                                    onFocus={() => setChildDetails(childDetails.map((c, i) => i === index ? { ...c, dobTooltip: { ...c.dobTooltip, visible: true } } : c))}
                                    onBlur={() => setChildDetails(childDetails.map((c, i) => i === index ? { ...c, dobTooltip: { ...c.dobTooltip, visible: false } } : c))}
                                />
                                {child.dobTooltip.visible && (
                                    <div className={`tooltip ${child.dobTooltip.type}`}>
                                        {child.dobTooltip.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {infantDetails.map((infant, index) => (
                        <div className='passenger-data' key={index}>
                            <h2>Infant {index + 1}</h2>
                            <TitleSelector
                                htmlFor={`title-${index}`}
                                description='Title'
                                id={`title-${index}`}
                                value={infant.title}
                                onChange={(e) => handleInputChange(index, 'title', e.target.value, 'infant')}
                                required={true}
                            />
                            <div className='name'>
                                <div className='input-container'>
                                    <InputElement
                                        htmlFor={`infant-first-name-${index}`}
                                        description='First Name'
                                        type='text'
                                        id={`infant-first-name-${index}`}
                                        value={infant.firstName}
                                        required={true}
                                        onChange={(e) => handleInputChange(index, 'firstName', e.target.value, 'infant')}
                                        onFocus={() => setInfantDetails(infantDetails.map((i, j) => j === index ? { ...i, firstNameTooltip: { ...i.firstNameTooltip, visible: true } } : i))}
                                        onBlur={() => setInfantDetails(infantDetails.map((i, j) => j === index ? { ...i, firstNameTooltip: { ...i.firstNameTooltip, visible: false } } : i))}
                                    />
                                    {infant.firstNameTooltip.visible && (
                                        <div className={`tooltip ${infant.firstNameTooltip.type}`}>
                                            {infant.firstNameTooltip.message}
                                        </div>
                                    )}
                                </div>
                                <div className='input-container'>
                                    <InputElement
                                        htmlFor={`infant-last-name-${index}`}
                                        description='Last Name'
                                        type='text'
                                        id={`infant-last-name-${index}`}
                                        value={infant.lastName}
                                        required={true}
                                        onChange={(e) => handleInputChange(index, 'lastName', e.target.value, 'infant')}
                                        onFocus={() => setInfantDetails(infantDetails.map((i, j) => j === index ? { ...i, lastNameTooltip: { ...i.lastNameTooltip, visible: true } } : i))}
                                        onBlur={() => setInfantDetails(infantDetails.map((i, j) => j === index ? { ...i, lastNameTooltip: { ...i.lastNameTooltip, visible: false } } : i))}
                                    />
                                    {infant.lastNameTooltip.visible && (
                                        <div className={`tooltip ${infant.lastNameTooltip.type}`}>
                                            {infant.lastNameTooltip.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='input-container'>
                                <InputElement
                                    htmlFor={`infant-dob-${index}`}
                                    description='Date of Birth'
                                    type='date'
                                    id={`infant-dob-${index}`}
                                    value={infant.dob}
                                    required={true}
                                    onChange={(e) => handleInputChange(index, 'dob', e.target.value, 'infant')}
                                    minDate={getInfantDay()}
                                    maxDate={new Date().toISOString().split('T')[0]}
                                    onFocus={() => setInfantDetails(childDetails.map((c, i) => i === index ? { ...c, dobTooltip: { ...c.dobTooltip, visible: true } } : c))}
                                    onBlur={() => setInfantDetails(childDetails.map((c, i) => i === index ? { ...c, dobTooltip: { ...c.dobTooltip, visible: false } } : c))}
                                />
                                {infant.dobTooltip.visible && (
                                    <div className={`tooltip ${infant.dobTooltip.type}`}>
                                        {infant.dobTooltip.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='contact-info'>
                    <h2>Contact Information</h2>
                    <div className='input-container'>
                        <InputElement
                            htmlFor='email'
                            description='Email'
                            type='email'
                            id='email'
                            value={contactInfo.email}
                            required={true}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                            onFocus={() => setContactInfo({ ...contactInfo, emailTooltip: { ...contactInfo.emailTooltip, visible: true } })}
                            onBlur={() => setContactInfo({ ...contactInfo, emailTooltip: { ...contactInfo.emailTooltip, visible: false } })}
                        />
                        {contactInfo.emailTooltip.visible && (
                            <div className={`tooltip ${contactInfo.emailTooltip.type}`}>
                                {contactInfo.emailTooltip.message}
                            </div>
                        )}
                    </div>
                    <CountryCodeSelector htmlFor={'country'} description={'Country'} id={'country'} value={contactInfo.country} onChange={(e) => handleContactChange('country', e.target.value)} />
                    <div className='input-container'>
                        <InputElement
                            htmlFor='phone-number'
                            description='Phone Number'
                            type='text'
                            id='phone-number'
                            value={contactInfo.phoneNumber}
                            required={true}
                            onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
                            onFocus={() => setContactInfo({ ...contactInfo, phoneTooltip: { ...contactInfo.phoneTooltip, visible: true } })}
                            onBlur={() => setContactInfo({ ...contactInfo, phoneTooltip: { ...contactInfo.phoneTooltip, visible: false } })}
                        />
                        {contactInfo.phoneTooltip.visible && (
                            <div className={`tooltip ${contactInfo.phoneTooltip.type}`}>
                                {contactInfo.phoneTooltip.message}
                            </div>
                        )}

                    </div>
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
                </div>
            </form>
            <button className='button' type='submit' onClick={handleSubmit}>Checkout</button>
        </div>
    );
}