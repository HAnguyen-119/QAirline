import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import FilterModal from '../FilterModal/FilterModal.jsx';
import { getNextSevenDays } from "../../../utils/NextSevenDays.js";
import Days from "../../../components/Booking/Date/Days.jsx";
import DivContainer from "../../../components/DivContainer.jsx";
import FlightCard from "../../../components/Card/FlightCard.jsx";

import EmptyFlight from '../../../assets/images/empty.png';
import HorizontalRule from "../../../components/HorizontalRule.jsx";

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const fullParams = new URLSearchParams(location.pathname)

    const tripType = searchParams.get('tripType');
    const departure = searchParams.get('departure');
    const destination = searchParams.get('destination');
    const deptDate = searchParams.get('dept-date');
    const returnDate = searchParams.get('return-date');

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeOutbound, setActiveOutbound] = useState(null);
    const [activeReturn, setActiveReturn] = useState(null);

    //test
    const flights = [
        { id: 1, tripType, flight: 'Flight 1', departure, destination, deptDate, returnDate, deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'', returnArrivalTime:'', eco_cost:100, bus_cost:200 },
        { id: 2, tripType:'one-way', flight: 'Flight 2', departure, destination, deptDate: '2024-12-05', returnDate: '',deptTime:'06:00', arrivalTime: '08:00', returnDeptTime: '', returnArrivalTime: '', eco_cost:100, bus_cost:200 },
        { id: 3, tripType:'one-way', flight: 'Flight 3', departure, destination, deptDate: '2024-12-02', returnDate: '', deptTime:'06:00', arrivalTime: '08:00', returnDeptTime: '', returnArrivalTime: '', eco_cost:100, bus_cost:200 },
        { id: 4, tripType:'round-trip', flight: 'Flight 4', departure, destination, deptDate: '2024-12-05', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 5, tripType:'round-trip', flight: 'Flight 5', departure, destination, deptDate: '2024-12-06', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 6, tripType:'one-way', flight: 'Flight 6', departure, destination, deptDate: '2024-12-03', returnDate: '', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'', returnArrivalTime:'', eco_cost:100, bus_cost:200 },
        { id: 7, tripType:'round-trip', flight: 'Flight 7', departure, destination, deptDate: '2024-12-03', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 8, tripType:'round-trip', flight: 'Flight 8', departure, destination, deptDate: '2024-12-07', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 9, tripType:'round-trip', flight: 'Flight 9', departure, destination, deptDate: '2024-12-08', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 10, tripType:'round-trip', flight: 'Flight 10', departure, destination, deptDate: '2024-12-09', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 11, tripType:'round-trip', flight: 'Flight 11', departure, destination, deptDate: '2024-12-04', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 12, tripType:'one-way', flight: 'Flight 12', departure, destination, deptDate: '2024-12-05', returnDate: '', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'', returnArrivalTime:'', eco_cost:100, bus_cost:200 },
        { id: 13, tripType:'round-trip', flight: 'Flight 13', departure, destination, deptDate: '2024-12-06', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 14, tripType:'round-trip', flight: 'Flight 14', departure, destination, deptDate: '2024-12-04', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 },
        { id: 15, tripType:'one-way', flight: 'Flight 15', departure, destination, deptDate: '2024-12-03', returnDate: '', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'', returnArrivalTime:'', eco_cost:100, bus_cost:200 },
        { id: 16, tripType:'round-trip', flight: 'Flight 6', departure, destination, deptDate: '2024-12-06', returnDate: '2023-12-08', deptTime:'05:00', arrivalTime:'07:00', returnDeptTime:'05:00', returnArrivalTime:'07:00', eco_cost:100, bus_cost:200 }

    ];

    console.log(returnDate)

    const nextSevenDaysDept = getNextSevenDays(deptDate);
    const nextSevenDaysReturn = returnDate !== '' ? getNextSevenDays(returnDate) : null;

    const handleBookNow = (id) => {
        const flight = flights.find(flight => flight.id === id);
        let params;
        if (flight.tripType === 'one-way') {
            params = new URLSearchParams({
                'outbound-id': flight.id
            }).toString();
            navigate(`/booking/shopping-cart?${params}`);
        } else {
            if (fullParams.toString().includes('outbound')) {
                params = new URLSearchParams({
                    'outbound-id': flight.id
                }).toString();
                navigate(`/booking/return/availability?${searchParams}&${params}`);
            } else {
                params = new URLSearchParams({
                    'return-id': flight.id
                }).toString();
                let param = searchParams.toString().split('&');
                navigate(`/booking/shopping-cart?${param[param.length - 1]}&${params}`);
            }
        }
    };

    const handleFilter = () => {
        setIsFilterOpen(true);
    };

    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };

    let activeOutboundString = activeOutbound !== null ? nextSevenDaysDept[activeOutbound][1] : null;
    let activeReturnString = activeReturn !== null ? nextSevenDaysReturn[activeReturn][1] : null;

    const filteredOutbound = flights.filter(flight => {
        const flightDate = new Date(flight.deptDate).getDate().toString();
        return flightDate === activeOutboundString && flight.tripType === tripType;
    });

    const filteredReturn = flights.filter(flight => {
        const flightDate = new Date(flight.deptDate).getDate().toString();
        return flightDate === activeReturnString && flight.tripType === tripType;
    });

    const isOutboundEmpty = filteredOutbound.length === 0;
    const isReturnEmpty = filteredReturn.length === 0;

    return (
        <div className='search-results'>
            { fullParams.toString().includes('outbound') && (
                <div className='outbound-result'>
                    <h1>Outbound</h1>
                    <Days days={nextSevenDaysDept} activeDate={activeOutbound} setActiveDate={setActiveOutbound} />
                    <button className='submit' onClick={handleFilter}>Filter</button>
                    <div className='flights'>
                        {!isOutboundEmpty && filteredOutbound.map(flight => (
                            <FlightCard flight={flight} handleBookNow={() => handleBookNow(flight.id)}/>
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
            {!fullParams.toString().includes('outbound')  && (
                <div className='outbound-result'>
                    <h1>Return</h1>
                    <Days days={nextSevenDaysReturn} activeDate={activeReturn} setActiveDate={setActiveReturn} />
                    <button className='submit' onClick={handleFilter}>Filter</button>
                    <div className='flights'>
                        {!isReturnEmpty && filteredReturn.map(flight => (
                            <FlightCard flight={flight} handleBookNow={() => handleBookNow(flight.id)}/>
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