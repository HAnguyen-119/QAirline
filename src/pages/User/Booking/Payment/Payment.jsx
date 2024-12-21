import React, {useEffect, useState} from 'react';
import './Payment.css';
import {useLocation, useNavigate} from "react-router-dom";
import {sendEmailWithText} from "../../../../utils/SendEmail.js";
import userAPI from "../../../../api/userAPI.jsx";

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

    const handleConfirm = async () => {
        if (payOnline) {
            try {
                const data = {
                    id: booking.id,
                    bookingStatus: 'COMPLETED'
                }
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        const subject = 'THANK YOU!';
        const title = 'Payment';
        const text = `Your booking code is: ${booking.code}. Please show your ticket to the staff before enter the area. You can get the ticket in the outer lobby on the left hand side near the GE2 building door. Please show your identify card or passport to get the ticket. Wish you and your family have a great trip!`;
        sendEmailWithText(booking.email, booking.passengers[0].lastname, subject, title, text)
        alert('Thank you for booking with us! Please check your email for the information.')
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
                    <button className='button' onClick={!payOnline ? handlePayOnline : handleConfirm}>{`${payOnline ? `Confirm` : `Pay Online`}`}</button>
                    <button className='button' onClick={handleConfirm}>Check Later</button>
                </div>
            </div>
        </div>
    )
}