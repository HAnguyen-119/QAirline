import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingInfo, setBookingInfo] = useState({
        tripType: '',
        departure: '',
        destination: '',
        deptDate: '',
        returnDate: '',
        travelerInfo: {},
        cartItems: []
    });

    return (
        <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
            {children}
        </BookingContext.Provider>
    );
};