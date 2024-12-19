import { useLocation, useNavigate } from "react-router-dom";
import { format } from "../../../../utils/Time.js";
import BoardingPass from "../../../../components/Booking/BoardingPass/BoardingPass.jsx";
import { calculateCancelTime } from "../../../../utils/CalculateTime.js";
import './BookingDetails.css';
import { useState } from "react";
import { sendEmail } from "../../../../utils/OTPCancelEmail.js";
import {EMAIL_REGEX} from "../../../../data/RegEx.js";
import userAPI from "../../../../api/userAPI.jsx";

export default function BookingDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    const params = new URLSearchParams(location.search);

    const booking = state.bookingDetails;
    const tripType = booking.isRoundTrip ? 'round-trip' : 'one-way';
    const cancelTime = calculateCancelTime(booking.reservationTime);

    const [randomOTP, setRandomOTP] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [cancel, setCancel] = useState(false);

    const handleCancel = () => {
        setCancel(true);
    }

    const handleBack = () => {
        navigate('/booking');
    }

    const handleSendEmail = () => {
        const email = document.getElementById('cancel-email').value;
        if (email.toLowerCase() !== booking.email.toLowerCase()) {
            setErrorMessage('Invalid email. Please enter the email used for booking.');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            setErrorMessage('Invalid email format.');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        const random = Math.floor(100000 + Math.random() * 900000).toString();
        setRandomOTP(random);
        sendEmail(state.lastName, random, email)
        setSuccessMessage('Email sent successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    }

    const handleConfirm = (value) => {
        if (!value) {
            setCancel(false);
            return;
        }
        const otpUserInput = document.getElementById('otp').value;
        if (otpUserInput === randomOTP) {
            try {
                const deleteBooking = async () => {
                    await userAPI.deleteBooking(booking.id);
                    alert('Booking deleted successfully!');
                    navigate('/booking');
                }
                deleteBooking()
            } catch (error) {
                console.log(error);
            }
            setSuccessMessage('')
            setErrorMessage('');

        } else {
            setErrorMessage('Incorrect OTP. Please try again.');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    }

    return (
        <div className='booking-details-container'>
            <h1>BOOKING DETAILS</h1>
            <div className='booking-details-form'>
                <div className='booking-details'>
                    <p>Hi, {state.lastName}</p>
                    <p>Your Booking code is: {params.get('bookingCode')}</p>
                    <p>Your reservation date is: {booking.reservationTime.split('T')[0]}</p>
                    <p>You booked our flights at: {format(booking.reservationTime.split('T')[1])}</p>
                    <p>You can cancel your flights until: {cancelTime.toISOString().split('T')[0]} at {format(cancelTime.toString().split(' ')[4])}</p>
                    <div className='cancel-buttons'>
                        <button className='button' onClick={handleCancel}>Cancel flight</button>
                        <button className='button' onClick={handleBack}>Return to booking</button>
                    </div>
                </div>
                {cancel && (
                    <div className='modal-overlay'>
                        <div className='modal-content'>
                            <p>Are you sure you want to cancel your flight?</p>
                            <div className='cancel-email'>
                                <input type='email' id='cancel-email' name='cancel-email' placeholder='Enter your email' required={true} />
                                <div className='filter-button'>
                                    <button onClick={handleSendEmail}>Send</button>
                                </div>
                            </div>
                            <input type='text' id='otp' name='otp' placeholder='OTP' required={true} />
                            {successMessage && <div className='success-message'>{successMessage}</div>}
                            {errorMessage && <div className='error-message'>{errorMessage}</div>}
                            <span></span>
                            <div className='filter-button'>
                                <button className='exit-button' onClick={() => handleConfirm(false)}>Exit</button>
                                <button className='' onClick={() => handleConfirm(true)}>Confirm</button>
                            </div>
                        </div>
                    </div>
                )}
                <p>For more information</p>
                <BoardingPass tripType={tripType} passengerNumber={booking.passengers.length} outboundSeatType={"ECONOMY"} returnSeatType={"ECONOMY"} outboundFlight={booking.flight} returnFlight={booking.returnFLight} hasButton={false} />
            </div>
        </div>
    );
}