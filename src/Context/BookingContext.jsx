import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingInfo, setBookingInfo] = useState({
        tripType: '',
        departure: '',
        destination: '',
        deptDate: '',
        returnDate: '',
        travelerInfo: {
            title: '',
            firstName: '',
            lastName: '',
            citizenId: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            countryCode: '',
            phoneNumber: '',
            dob: ''
        },
        cartItems: [],
        outboundFlight: {},
        returnFlight: {},
        passengerNumber: '',
        outboundSeatType: '',
        returnSeatType: ''
    });

    return (
        <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
            {children}
        </BookingContext.Provider>
    );
};