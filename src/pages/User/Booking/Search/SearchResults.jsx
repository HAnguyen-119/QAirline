import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import FilterModal from '../FilterModal/FilterModal.jsx';
import { getNextSevenDays } from "../../../../utils/NextSevenDays.js";
import Days from "../../../../components/Booking/Date/Days.jsx";
import DivContainer from "../../../../components/DivContainer.jsx";
import FlightCard from "../../../../components/Card/FlightCard.jsx";

import EmptyFlight from '../../../../assets/images/empty.png';
import userAPI from "../../../../api/userAPI.jsx";

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const fullParams = new URLSearchParams(location.pathname)
    console.log(fullParams.toString())


    const deptAirportId = searchParams.get('dept-id');
    const destAirportId = searchParams.get('arr-id');
    const deptDate = searchParams.get('dept-date');
    const retDate = searchParams.get('ret-date');
    const passengerNumber = searchParams.get('passenger');

    let tripType = 'one-way';
    if (retDate !== '' || (retDate === '' && fullParams.toString().includes('return'))) {
        tripType = 'round-trip';
    }

    console.log(tripType)

    const [flights, setFlights] = useState([])
    let searchData;

    useEffect( () => {
        const fetchFlights = async () => {
            try {
                // if (tripType === 'one-way') {
                //     searchData = {
                //         "departureAirportId": deptAirportId,
                //         "arrivalAirportId": destAirportId,
                //         "departureDate": deptDate,
                //         "passengerNumber": passengerNumber
                //     }
                // } else {
                //     if (fullParams.toString().includes('outbound')) {
                //         searchData = {
                //             "departureAirportId": deptAirportId,
                //             "arrivalAirportId": destAirportId,
                //             "departureDate": deptDate,
                //             "passengerNumber": passengerNumber
                //         }
                //     } else {
                //         searchData = {
                //             "departureAirportId": deptAirportId,
                //             "arrivalAirportId": destAirportId,
                //             "departureDate": deptDate,
                //             "passengerNumber": passengerNumber
                //         }
                //     }
                // }
                searchData = {
                    "departureAirportId": deptAirportId,
                    "arrivalAirportId": destAirportId,
                    "departureDate": deptDate,
                    "passengerNumber": passengerNumber
                }

                console.log(searchData)

                const response = await userAPI.findFlight(searchData);
                setFlights(response);
            } catch (error) {
                console.error("Error finding flights:", error);
            }
        }
        fetchFlights()
    }, [deptAirportId, destAirportId, deptDate, retDate, passengerNumber]);


    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeOutbound, setActiveOutbound] = useState(null);
    const [activeReturn, setActiveReturn] = useState(null);

    const nextSevenDaysDept = getNextSevenDays(deptDate);
    // const nextSevenDaysReturn = retDate !== '' ? getNextSevenDays(retDate) : null;

    const handleBookNow = (id, type) => {
        const flight = flights.find(flight => flight.id === id);
        let params;
        if (tripType === 'one-way') {
            params = new URLSearchParams({
                'passenger': passengerNumber,
                'outbound-id': flight.id,
                'outbound-seat': type
            }).toString();
            navigate(`/booking/shopping-cart?${params}`);
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
                navigate(`/booking/return/availability?${retParams}&${params}`);
            } else {
                params = new URLSearchParams({
                    'passenger': passengerNumber,
                    'return-id': flight.id,
                    'return-seat': type
                }).toString();
                let param = searchParams.toString().split('&');
                navigate(`/booking/shopping-cart?${param[param.length - 2]}&${param[param.length - 1]}&${params}`);
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
    let activeReturnString = activeReturn !== null ? nextSevenDaysDept[activeReturn][1] : null;


    const filteredOutbound = flights.filter(flight => {
        const flightDate = new Date(flight.departureTime).getDate().toString();
        return flightDate === activeOutboundString;
    });

    const filteredReturn = flights.filter(flight => {
        const flightDate = new Date(flight.departureTime).getDate().toString();
        return flightDate === activeReturnString;
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
                            <FlightCard flight={flight} tripType={tripType} handleBookNow={(id, type) => handleBookNow(id, type)}/>
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
                    <Days days={nextSevenDaysDept} activeDate={activeReturn} setActiveDate={setActiveReturn} />
                    <button className='submit' onClick={handleFilter}>Filter</button>
                    <div className='flights'>
                        {!isReturnEmpty && filteredReturn.map(flight => (
                            <FlightCard flight={flight} tripType={tripType} handleBookNow={(id, type) => handleBookNow(id, type)}/>
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