import InputElement from "../../Form/InputElement.jsx";
import Button from "../../Button/Button.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../api/userAPI.jsx";
import {CodeReformatation, CodeValidation, NameValidation} from "../../../utils/Validation.js";
import {NAME_REGEX} from "../../../data/RegEx.js";

import './Search.css'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";

export default function Search() {
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [lastName, setLastName] = useState('');
    const [nameTooltip, setNameTooltip] = useState({ message: 'Fill your last name!', type: 'hint', visible: false });
    const [codeTooltip, setCodeTooltip] = useState({ message: 'Fill your Booking Code!', type: 'hint', visible: false });

    const handleSearchBookingSubmit = (event) => {
        event.preventDefault();
        if (focusFirstError()) {
            return;
        }

        const searchBooking = async () => {
            const searchData = {
                'code': CodeReformatation(code),
                'lastname': NameValidation(lastName)
            };
            try {
                const booking = await userAPI.searchBooking(searchData);
                navigate(`/booking/details?booking-code=${CodeReformatation(code)}`, { state: { booking, lastName } });
            } catch (error) {
                document.getElementById('booking-code').focus();
                setCodeTooltip({ ...codeTooltip, type: 'error', message: 'Booking not found!' });
            }
        };
        searchBooking();
    };

    const handleInputChange = (field, value) => {
        if (field === 'name') {
            if (value === '') {
                setNameTooltip({ ...nameTooltip, type: 'error', message: 'Please fill your name!' });
            } else if (!NAME_REGEX.test(value)) {
                setNameTooltip({ ...nameTooltip, type: 'error', message: 'Names must contain only letters and spaces (a-z, A-Z)!' });
            } else {
                setNameTooltip({ ...nameTooltip, type: 'hint', message: 'Your name validated!' });
            }
        }

        if (field === 'code') {
            if (value.length !== 6) {
                setCodeTooltip({ ...codeTooltip, type: 'error', message: 'Booking code must be 6 characters long!' });
            } else if (!CodeValidation(value)) {
                setCodeTooltip({ ...codeTooltip, type: 'error', message: 'Booking code must contain only letters and numbers (a-z, A-Z, 0-9)!' });
            } else {
                setCodeTooltip({ ...codeTooltip, type: 'hint', message: 'Your booking code validated!' });
            }
        }

        field === 'code' ? setCode(value) : field === 'name' && setLastName(value);
    };

    const focusFirstError = () => {
        if (codeTooltip.type === 'error') {
            document.getElementById('booking-code').focus();
            return true;
        } else if (nameTooltip.type === 'error') {
            document.getElementById('last-name').focus();
            return true;
        }
        return false;
    };

    return (
        <div className='search'>
            <h1>SEARCH BOOKING</h1>
            <form className='search-form' onSubmit={handleSearchBookingSubmit}>
                <div className='input-group'>
                    <div className='input-container'>
                        <InputElement
                            htmlFor={`booking-code`}
                            description='Booking Code'
                            type='text'
                            id={`booking-code`}
                            value={code}
                            required={true}
                            onChange={(e) => handleInputChange('code', e.target.value)}
                            onFocus={() => setCodeTooltip({ ...codeTooltip, visible: true })}
                            onBlur={() => setCodeTooltip({ ...codeTooltip, visible: false })}
                        />
                        {codeTooltip.visible && (
                            <div className={`tooltip ${codeTooltip.type}`}>
                                {codeTooltip.message}
                            </div>
                        )}
                    </div>
                    <div className='input-container'>
                        <InputElement
                            htmlFor={`last-name`}
                            description='Last Name'
                            type='text'
                            id={`last-name`}
                            value={lastName}
                            required={true}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            onFocus={() => setNameTooltip({ ...nameTooltip, visible: true })}
                            onBlur={() => setNameTooltip({ ...nameTooltip, visible: false })}
                        />
                        {nameTooltip.visible && (
                            <div className={`tooltip ${nameTooltip.type}`}>
                                {nameTooltip.message}
                            </div>
                        )}
                    </div>
                </div>
                <Button buttonClass='button' type='submit' icon={faMagnifyingGlass} text=' Search' onClick={handleSearchBookingSubmit} />
            </form>
        </div>
    );
}