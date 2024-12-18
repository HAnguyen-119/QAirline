import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import FilterModal from '../FilterModal/FilterModal.jsx';
import { getDeptDays, getRetDays } from "../../../../utils/ActiveDays.js";
import Days from "../../../../components/Booking/Date/Days.jsx";
import DivContainer from "../../../../components/DivContainer.jsx";
import FlightCard from "../../../../components/Card/FlightCard.jsx";

import EmptyFlight from '../../../../assets/images/empty.png';
import userAPI from "../../../../api/userAPI.jsx";
import FlightList from "../../../../components/Booking/Flights/FlightList.jsx";

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const fullParams = new URLSearchParams(location.pathname);

    const deptAirportId = searchParams.get('dept-id');
    const destAirportId = searchParams.get('arr-id');
    const deptDate = searchParams.get('dept-date');
    const retDate = searchParams.get('ret-date');
    const passengerNumber = searchParams.get('passenger');

    let tripType = 'one-way';
    if (retDate !== '' || (retDate === '' && fullParams.toString().includes('return'))) {
        tripType = 'round-trip';
    }

    let activeIndex = 0;
    const today = new Date();

    const deptDays = getDeptDays(deptDate);
    const retDays = tripType === 'round-trip' ? getRetDays(deptDate) : [];


    if (fullParams.toString().includes('outbound')) {
        if (deptDate === today.toISOString().split('T')[0]) {
            activeIndex = 0;
        } else  {
            activeIndex = - today.getDate() + new Date(deptDate).getDate();
        }
    } else {
        activeIndex = 0;
    }

    const [flights, setFlights] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeOutbound, setActiveOutbound] = useState(activeIndex);
    const [activeReturn, setActiveReturn] = useState(fullParams.toString().includes('return') ? 0 : null);
    const [filters, setFilters] = useState({ priceRange: 'all', sortOrder: 'asc', flightTime: 'all' });
    const [filteredFlights, setFilteredFlights] = useState([]);


    const activeDeptDate = activeOutbound !== null
        ? `${deptDays[activeOutbound][3]}-${deptDays[activeOutbound][2]}-${deptDays[activeOutbound][1]}`
        : deptDate;
    useEffect(() => {
        const today = new Date();
        const deptDateObj = new Date(deptDate);
        const retDateObj = retDate ? new Date(retDate) : null;

        if (deptDateObj < today.getDate() || (retDateObj && retDateObj < today.getDate())) {
            navigate('/booking');
            return;
        }
        const fetchFlights = async () => {
            try {
                const searchData = {
                    "departureAirportId": deptAirportId !== '' ? deptAirportId : 1,
                    "arrivalAirportId": destAirportId !== '' ? destAirportId : 1,
                    "departureDate": activeDeptDate,
                    "passengerNumber": passengerNumber
                };
                const response = await userAPI.findFlight(searchData);
                setFlights(response);
                setFilteredFlights(response);
            } catch (error) {
                console.error("Error finding flights:", error);
            }
        };
        fetchFlights();

    }, [deptAirportId, destAirportId, deptDate, retDate, passengerNumber, activeOutbound, activeReturn]);


    const handleBookNow = (id, type) => {
        const flight = flights.find(flight => flight.id === id);
        let params;
        if (tripType === 'one-way') {
            params = new URLSearchParams({
                'passenger': passengerNumber,
                'outbound-id': flight.id,
                'outbound-seat': type
            }).toString();
            navigate(`/booking/shopping-cart?${params}`, { state: location.state });
        } else {
            if (fullParams.toString().includes('outbound')) {
                const retParams = new URLSearchParams({
                    "dept-id": destAirportId,
                    "arr-id": deptAirportId,
                    "dept-date": retDate,
                    "ret-date": "",
                    "passenger": 2
                }).toString();
                params = new URLSearchParams({
                    'dept-date': deptDate,
                    'passenger': passengerNumber,
                    'outbound-id': flight.id,
                    'outbound-seat': type
                }).toString();
                navigate(`/booking/return/availability?${retParams}&${params}`, { state: location.state });
            } else {
                params = new URLSearchParams({
                    'passenger': passengerNumber,
                    'return-id': flight.id,
                    'return-seat': type
                }).toString();
                let param = searchParams.toString().split('&');
                navigate(`/booking/shopping-cart?${param[param.length - 2]}&${param[param.length - 1]}&${params}`, { state: location.state });
            }
        }
    };

    const handleOpenFilter = () => {
        setIsFilterOpen(true);
    };

    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };

    const applyFilters = (filter) => {
        let filtered = flights;
        if (filter.priceRange !== 'all') {
            filtered = filtered.filter(flight => {
                const price = flight.economyPrice;
                if (filter.priceRange === '<1000') {
                    return price < 1000;
                } else if (filter.priceRange === '<2000') {
                    return price >= 1000 && price < 2000;
                } else if (filter.priceRange === '<3000') {
                    return price >= 2000 && price < 3000;
                } else {
                    return price >= 3000;
                }
            });
        }

        if (filter.sortOrder === 'asc') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        if (filter.flightTime !== 'all') {
            filtered = filtered.filter(flight => {
                const time = parseInt(flight.departureTime.split('T')[1].split(':')[0]);
                if (filter.flightTime === 'nighttime') {
                    return time >= 0 && time < 6;
                } else if (filter.flightTime === 'morning') {
                    return time >= 6 && time < 12;
                } else if (filter.flightTime === 'afternoon') {
                    return time >= 12 && time < 18;
                } else if (filter.flightTime === 'evening') {
                    return time >= 18 && time < 24;
                }
            });
        }
        return filtered;
    }

    const handleFilters = (filter) => {
        setFilters(filter)
        console.log(filter)
        const filtered = applyFilters(filter);
        console.log(filtered)
        setFilteredFlights(filtered);
    }


    let activeOutboundString = activeOutbound !== null
        ? `${deptDays[activeOutbound][3]}-${deptDays[activeOutbound][2]}-${deptDays[activeOutbound][1]}`
        : null;
    let activeReturnString = activeReturn !== null
        ? `${retDays[activeReturn][3]}-${retDays[activeReturn][2]}-${retDays[activeReturn][1]}`
        : null;

    const filteredOutbound = filteredFlights.filter(flight => {
        const flightDate = flight.departureTime.split('T')[0];
        return flightDate === activeOutboundString;
    });

    const filteredReturn = filteredFlights.filter(flight => {
        const flightDate = flight.departureTime.split('T')[0];
        return flightDate === activeReturnString;
    });

    const isOutboundEmpty = filteredOutbound.length === 0;
    const isReturnEmpty = filteredReturn.length === 0;

    return (
        <div className='search-results'>
            {fullParams.toString().includes('outbound') && (
                <div className='outbound-result'>
                    <h1>Outbound flights</h1>
                    <Days days={deptDays} activeDate={activeOutbound} setActiveDate={setActiveOutbound} />
                    <button className='' onClick={handleOpenFilter}>Filter</button>
                    <FlightList isEmpty={isOutboundEmpty} flights={filteredOutbound} tripType={tripType} handleBookNow={handleBookNow} />
                    <FilterModal isOpen={isFilterOpen} onClose={handleCloseFilter} onFilters={handleFilters} />
                </div>
            )}
            {!fullParams.toString().includes('outbound') && (
                <div className='outbound-result'>
                    <h1>Return Flights</h1>
                    <Days days={retDays} activeDate={activeReturn} setActiveDate={setActiveReturn} />
                    <button className='' onClick={handleOpenFilter}>Filter</button>
                    <FlightList isEmpty={isReturnEmpty} flights={filteredReturn} tripType={tripType} handleBookNow={handleBookNow} />
                    <FilterModal isOpen={isFilterOpen} onClose={handleCloseFilter} onFilters={handleFilters}/>
                </div>
            )}
        </div>
    );
}