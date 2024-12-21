import React, {useEffect, useState} from 'react';
import './Payment.css';
import {useLocation, useNavigate} from "react-router-dom";
import {sendEmailWithText} from "../../../../utils/SendEmail.js";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation()
    const state = location.state

    const booking = state.booking;


    const [payOnline, setPayOnline] = useState(false);

    useEffect(() => {
        const handleBackNavigation = (e) => {
            e.preventDefault();
            navigate("/booking");
        };

        window.addEventListener("popstate", handleBackNavigation);

        return () => {
            window.removeEventListener("popstate", handleBackNavigation);
        };
    }, [navigate]);
    console.log(state)

    const handlePayOnline = () => {
        setPayOnline(true);
    }

    const handleCheckLater = () => {
        const subject = 'THANK YOU!';
        const title = 'Payment';
        const text = `Your booking code is: ${booking.code}. Please show your ticket to the staff before enter the area. You can get the ticket in the outer lobby on the left hand side near the GE2 building door. Please show your identify card or passport to get the ticket. Wish you and your family have a great trip!`;
        sendEmailWithText(booking.email, booking.passengers[0].lastname, subject, title, text)
        navigate('/booking');
    }
    return (
        <div className='payment'>
            <h1>Payment</h1>
            <div className='payment-container'>
                <p>Your booking code is: {booking.code}</p>
                <p>Would you like to pay online or check your payment later?</p>
                {payOnline && (
                    <img src='https://raw.githubusercontent.com/Raphael9143/PermanentImage/refs/heads/main/QAirline%20Payment.png' alt="QR Code"/>
                )}
                <div className={'payment-options'}>
                    <button className='button' onClick={handlePayOnline}>Pay Online</button>
                    <button className='button' onClick={handleCheckLater}>Check Later</button>
                </div>
            </div>
        </div>
    )
}