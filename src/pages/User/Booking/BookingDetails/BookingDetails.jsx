import {useLocation} from "react-router-dom";

export default function BookingDetails() {
    const location = useLocation();
    const state = location.state;
    const params = new URLSearchParams(location.search);
    console.log(params)
    console.log(state.bookingDetails)
    return (
        <div>
            <h1>BOOKING DETAILS</h1>
            <p>Hi, {state.lastName}</p>
            <p>Your Booking code is: {params.get('bookingCode')}</p>
        </div>
    )
}