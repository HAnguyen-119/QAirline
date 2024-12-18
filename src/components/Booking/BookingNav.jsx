import React from "react";
import DivContainer from "../DivContainer.jsx";
import Button from "../Button/Button.jsx";
import Icon from "../Icon/icon.jsx";
import {faPlane} from "@fortawesome/free-solid-svg-icons/faPlane";
import {faTicket} from "@fortawesome/free-solid-svg-icons/faTicket";

export default function BookingNav({ activeForm, setActiveForm }) {
    return (
        <div className='form-selector'>
            <DivContainer parentClass='form-button-container'>
                <Button type='button' buttonClass={`form-button ${activeForm === 'search-flight' ? 'active' : ''}`} onClick={() => setActiveForm('search-flight')} text=' Search Flight' icon={faPlane} />
            </DivContainer>
            <DivContainer parentClass='form-button-container'>
                <Button type='button' buttonClass={`form-button ${activeForm === 'search-booking' ? 'active' : ''}`} onClick={() => setActiveForm('search-booking')} text=' Manage Booking' icon={faTicket}/>
            </DivContainer>
        </div>
    );
}