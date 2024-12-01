import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectElement from "../../components/Form/SelectElement.jsx";
import InputElement from "../../components/Form/InputElement.jsx";

import ('./Booking.css');

export default function Booking() {
    const navigate = useNavigate();

    const [tripType, setTripType] = useState('');
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [deptDate, setDeptDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (returnDate && returnDate <= deptDate) {
            alert('Return date must be after the departure date.');
            return;
        }
        const searchParams = new URLSearchParams({
            'tripType': tripType,
            'departure': departure,
            'destination': destination,
            'dept-date': deptDate,
            'return-date': returnDate
        }).toString();
        navigate(`/booking/availability?${searchParams}`);
    }

    return (
        <div className='booking-container'>
            <div className='booking'>
                <div className='form itinerary'>
                    <h1>ITINERARY</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='type'>
                            <InputElement htmlFor='one-way' description='One-way Trip' type='radio' id='one-way' name='tripType' value='one-way' required={true} onChange={(e) => setTripType(e.target.value)}/>
                            <InputElement htmlFor='round-trip' description='Round Trip' type='radio' id='round-trip' name='tripType' value='round-trip' required={true} onChange={(e) => setTripType(e.target.value)}/>
                        </div>
                        <SelectElement htmlFor='departure' description='Departure Airport' id='departure' name='departure' required={true} onChange={(e) => setDeparture(e.target.value)} options={['Airport 1', 'Airport 2', 'Airport 3', 'Airport 4', 'etc']}/>
                        <SelectElement htmlFor='destination' description='Destination Airport' id='destination' name='destination' required={true} onChange={(e) => setDestination(e.target.value)} options={['Airport A', 'Airport B', 'Airport C', 'Airport D', 'etc']}/>
                        <InputElement htmlFor='dept-date' description='Start Date' id='dept-date' name='dept-date' type='date' required={true} onChange={(e) => setDeptDate(e.target.value)}/>
                        {tripType === 'round-trip' && (
                            <InputElement htmlFor='return-date' description='Return Date' id='return-date' name='return-date' type='date' required={true} onChange={(e) => setReturnDate(e.target.value)}/>
                        )}
                        <button className='submit' type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}