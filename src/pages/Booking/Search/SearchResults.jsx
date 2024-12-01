import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import FilterModal from '../FilterModal/FilterModal.jsx';

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

    const flights = [
        { id: 1, flight: 'Flight 1', departure, destination, deptDate, returnDate }
    ];

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

    return (
        <div className='search-results'>
            <h1>Search Results</h1>
            <button className='submit' onClick={handleFilter}>Filter</button>
            <ul>
                {flights.map(flight => (
                    <li key={flight.id}>
                        {flight.flight} - {flight.departure} to {flight.destination} on {flight.deptDate} {flight.returnDate}
                        <button className='submit' onClick={() => handleBookNow(flight.id)}>Book Now</button>
                    </li>
                ))}
            </ul>
            <FilterModal isOpen={isFilterOpen} onClose={handleCloseFilter} />
        </div>
    );
}