import { useState } from 'react';

import './Booking.css';
import BookingNav from "../../../components/Booking/BookingNav.jsx";
import Itinerary from "../../../components/Booking/Itinerary/Itinerary.jsx";
import Search from "../../../components/Booking/Search.jsx";

export default function Booking() {
    const [activeForm, setActiveForm] = useState('search-flight');

    return (
        <div className='booking-container'>
            <div className='booking'>
                <BookingNav activeForm={activeForm} setActiveForm={setActiveForm} />
                {activeForm === 'search-flight' && (
                    <Itinerary/>
                )}
                {activeForm === 'search-booking' && (
                    <Search/>
                )}
            </div>
        </div>
    )
}