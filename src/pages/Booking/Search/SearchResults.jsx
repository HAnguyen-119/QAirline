import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import FilterModal from '../FilterModal/FilterModal.jsx';
import { getNextSevenDays } from "../../../utils/NextSevenDays.js";
import Days from "../../../components/Booking/Date/Days.jsx";

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const tripType = searchParams.get('tripType');
    const departure = searchParams.get('departure');
    const destination = searchParams.get('destination');
    const deptDate = searchParams.get('dept-date');
    const returnDate = searchParams.get('return-date');

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeDate, setActiveDate] = useState(null);

    const flights = [
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'', returnArrivalTime:'' },
        { id: 2, tripType:'one-way', flight: 'Flight 2', departure, destination, deptDate: '2024-12-03', returnDate: '2023-12-08',deptTime:'06:00', arrivalTime: '08:00', returnDeptTime: '', returnArrivalTime: '' },
        { id: 3, tripType:'one-way', flight: 'Flight 3', departure, destination, deptDate: '2024-12-02', returnDate: '2023-12-08' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 4, tripType:'one-way', flight: 'Flight 4', departure, destination, deptDate: '2024-12-03', returnDate: '2023-12-08' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 5, tripType:'one-way', flight: 'Flight 5', departure, destination, deptDate: '2024-12-04', returnDate: '2023-12-08' },
        { id: 6, tripType:'one-way', flight: 'Flight 6', departure, destination, deptDate: '2024-12-05', returnDate: '2023-12-08' },
        { id: 7, tripType:'one-way', flight: 'Flight 7', departure, destination, deptDate: '2024-12-06', returnDate: '2023-12-08' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 1, tripType:'one-way', flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00' },
        { id: 8, tripType:'one-way', flight: 'Flight 8', departure, destination, deptDate: '2024-12-06', returnDate: '2023-12-08' }

    ];

    const nextSevenDays = getNextSevenDays(deptDate);

    const handleBookNow = (flightId) => {
        const params = new URLSearchParams({
            'tripType': tripType,
            'departure': departure,
            'destination': destination,
            'dept-date': deptDate,
            'return-date': returnDate
        }).toString();
        navigate(`/booking/shopping-cart?${params}`);
    };

    const handleFilter = () => {
        setIsFilterOpen(true);
    };

    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };

    const activeDateString = activeDate !== null ? nextSevenDays[activeDate][1] : null;

    const filteredFlights = flights.filter(flight => {
        const flightDate = new Date(flight.deptDate).getDate().toString();
        return flightDate === activeDateString;
    });

    return (
        <div className='search-results'>
            <h1>Search Results</h1>
            <Days days={nextSevenDays} activeDate={activeDate} setActiveDate={setActiveDate} />
            <button className='submit' onClick={handleFilter}>Filter</button>
            <div className='flights'>
                {filteredFlights.map(flight => (
                    <li key={flight.id}>
                        {flight.flight} - {flight.departure} to {flight.destination} on {flight.deptDate} {flight.returnDate}
                        <button className='submit' onClick={() => handleBookNow(flight.id)}>Book Now</button>
                    </li>
                ))}
            </div>

            <FilterModal isOpen={isFilterOpen} onClose={handleCloseFilter} />
        </div>
    );
}