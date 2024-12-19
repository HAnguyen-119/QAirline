import {useLocation, useNavigate} from "react-router-dom";
import {format} from "../../../../utils/Time.js";
import BoardingPass from "../../../../components/Booking/BoardingPass/BoardingPass.jsx";
import {calculateCancelTime} from "../../../../utils/CalculateTime.js";

import './BookingDetails.css';

export default function BookingDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state;
    const params = new URLSearchParams(location.search);
    const booking = state.bookingDetails;
    const tripType = booking.isRoundTrip ? 'round-trip' : 'one-way';
    const cancelTime = calculateCancelTime(booking.reservationTime);

    const handleCancel = () => {
        //cancel

    }

    const handleBack = () => {
        navigate('/booking')
    }

    console.log(params)
    console.log(state.bookingDetails)
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
                    <p>For more information</p>
                    <BoardingPass tripType={tripType} passengerNumber={booking.passengers.length} outboundSeatType={"ECONOMY"} returnSeatType={"ECONOMY"} outboundFlight={booking.flight} returnFlight={booking.returnFLight} hasButton={false} />
                </div>
            </div>
    )
}