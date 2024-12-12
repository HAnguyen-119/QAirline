import { useState } from 'react';

import './Booking.css';
import BookingNav from "../../../components/Booking/BookingNav.jsx";
import Itinerary from "../../../components/Booking/Itinerary/Itinerary.jsx";
import Search from "../../../components/Booking/Search.jsx";
import {useOutletContext} from "react-router-dom";

export default function Booking() {
    const [activeForm, setActiveForm] = useState('search-flight');
    const isLightMode = useOutletContext();

    return (
        <div className='booking-container'>
            <div className={`booking ${isLightMode ? '' : 'dark'}`}>
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