import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import FilterModal from '../FilterModal/FilterModal.jsx';
import { getDeptDays, getReturnDays } from "../../../../utils/ActiveDays.js";
import Days from "../../../../components/Booking/Date/Days.jsx";
import DivContainer from "../../../../components/DivContainer.jsx";
import FlightCard from "../../../../components/Card/FlightCard.jsx";

import EmptyFlight from '../../../../assets/images/empty.png';
import userAPI from "../../../../api/userAPI.jsx";

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

    const [flights, setFlights] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeOutbound, setActiveOutbound] = useState(null);
    const [activeReturn, setActiveReturn] = useState(null);

    const deptDays = getDeptDays(deptDate);

    const retDays = tripType === 'round-trip' ? getDeptDays(deptDate) : [];

    const activeDeptDate = activeOutbound !== null
        ? `${new Date().getFullYear()}-${deptDays[activeOutbound][2].trim()}-${deptDays[activeOutbound][1].trim()}`
        : deptDate;
    console.log(activeDeptDate)
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const searchData = {
                    "departureAirportId": deptAirportId,
                    "arrivalAirportId": destAirportId,
                    "departureDate": activeDeptDate,
                    "passengerNumber": passengerNumber
                };

                console.log(searchData)

                const response = await userAPI.findFlight(searchData);
                setFlights(response);
            } catch (error) {
                console.error("Error finding flights:", error);
            }
        };
        fetchFlights();

        const activeOutboundIndex = deptDays.findIndex(day => day[1] === new Date(deptDate).getDate().toString());
        const activeReturnIndex = retDate !== '' ? retDays.findIndex(day => day[1] === new Date(retDate).getDate().toString()) : -1;

        console.log(deptDays)
        console.log(retDays)


        if (activeOutboundIndex !== -1) {
            setActiveOutbound(activeOutboundIndex);
        }
        if (activeReturnIndex !== -1) {
            setActiveReturn(activeReturnIndex);
        }
    }, [deptAirportId, destAirportId, deptDate, retDate, passengerNumber, activeOutbound, activeReturn]);

    console.log(flights)

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

    const handleFilter = () => {
        setIsFilterOpen(true);
    };

    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };

    let activeOutboundString = activeOutbound !== null ? deptDays[activeOutbound][1] : null;
    let activeReturnString = activeReturn !== null ? retDays[activeReturn][1] : null;

    console.log(activeOutboundString)

    const filteredOutbound = flights.filter(flight => {
        const flightDate = flight.departureTime.split('T')[0].split('-')[2];
        return flightDate === activeOutboundString;
    });

    console.log(filteredOutbound)

    const filteredReturn = flights.filter(flight => {
        const flightDate = flight.departureTime.split('T')[0].split('-')[2];
        return flightDate === activeReturnString;
    });

    const isOutboundEmpty = filteredOutbound.length === 0;
    const isReturnEmpty = filteredReturn.length === 0;

    console.log(isOutboundEmpty)

    return (
        <div className='search-results'>
            {fullParams.toString().includes('outbound') && (
                <div className='outbound-result'>
                    <h1>Outbound</h1>
                    <Days days={deptDays} activeDate={activeOutbound} setActiveDate={setActiveOutbound} />
                    <button className='submit' onClick={handleFilter}>Filter</button>
                    <div className='flights-list'>
                        {!isOutboundEmpty && filteredOutbound.map(flight => (
                            <FlightCard flight={flight} tripType={tripType} handleBookNow={(id, type) => handleBookNow(id, type)} />
                        ))}
                        {isOutboundEmpty && (
                            <DivContainer parentClass='empty'>
                                <img src={EmptyFlight} />
                            </DivContainer>
                        )}
                    </div>

                    <FilterModal isOpen={isFilterOpen} onClose={handleCloseFilter} />
                </div>
            )}
            {!fullParams.toString().includes('outbound') && (
                <div className='outbound-result'>
                    <h1>Return</h1>
                    <Days days={retDays} activeDate={activeReturn} setActiveDate={setActiveReturn} />
                    <button className='submit' onClick={handleFilter}>Filter</button>
                    <div className='flights-list'>
                        {!isReturnEmpty && filteredReturn.map(flight => (
                            <FlightCard flight={flight} tripType={tripType} handleBookNow={(id, type) => handleBookNow(id, type)} />
                        ))}
                        {isReturnEmpty && (
                            <DivContainer parentClass='empty'>
                                <img src={EmptyFlight} />
                            </DivContainer>
                        )}
                    </div>

                    <FilterModal isOpen={isFilterOpen} onClose={handleCloseFilter} />
                </div>
            )}
        </div>
    );
}