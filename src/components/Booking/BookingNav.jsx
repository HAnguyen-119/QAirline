import React from "react";
import DivContainer from "../DivContainer.jsx";
import Button from "../Button/Button.jsx";

export default function BookingNav({ activeForm, setActiveForm }) {
    return (
        <div className='form-selector'>
            <DivContainer parentClass='form-button-container'>
                <Button type='button' buttonClass={`form-button ${activeForm === 'search-flight' ? 'active' : ''}`} onClick={() => setActiveForm('search-flight')} text='Search Flight' />
            </DivContainer>
            <DivContainer parentClass='form-button-container'>
                <Button type='button' buttonClass={`form-button ${activeForm === 'search-booking' ? 'active' : ''}`} onClick={() => setActiveForm('search-booking')} text='Search Booking'/>
            </DivContainer>
        </div>
    );
}