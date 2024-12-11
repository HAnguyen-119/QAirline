import { useLocation, useNavigate } from 'react-router-dom';
import './FlightConfirmation.css';
import H1Text from "../../../../components/H1Text.jsx";
import DivContainer from "../../../../components/DivContainer.jsx";
import {useEffect, useState} from "react";
import userAPI from "../../../../api/userAPI.jsx";
import ConfirmationCard from "../../../../components/Card/ConfirmationCard.jsx";
import {format} from "../../../../utils/Time.js";
import {calculateTravelTime} from "../../../../utils/CalculateTime.js";

export default function FlightConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const {adults, children, infants} = location.state;

    const passengerNumber = searchParams.get('passenger');
    const outboundId = searchParams.get('outbound-id');
    const outboundSeatType = searchParams.get('outbound-seat')
    const returnId = searchParams.toString().includes('return-id') ? searchParams.get('return-id') : '';
    const returnSeatType = searchParams.toString().includes('return-seat') ? searchParams.get('return-seat') : '';

    const tripType = returnId !== '' ? 'round-trip' : 'one-way';

    const [outboundFlight, getOutboundFlight] = useState({});
    const [returnFlight, getReturnFlight] = useState({});

    useEffect(() => {
        try {
            const fetchFlights = async() => {
                const outboundFlight = await userAPI.findFlightById(outboundId);
                getOutboundFlight(outboundFlight);
                if (tripType === 'round-trip') {
                    const returnFlight = await userAPI.findFlightById(returnId);
                    getReturnFlight(returnFlight);
                }
            }
            fetchFlights()
        } catch (error) {
            console.error("Error finding flights:", error);
        }
    }, []);

    console.log(outboundFlight)

    const handleContinue = () => {
        navigate('/booking/traveler', { state: { outboundFlight, returnFlight, adults, children, infants, outboundSeatType, returnSeatType } });
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleGoBack = (num) => {
        navigate(-num);
    }

    return (
        <div className='cart-container'>
            <H1Text content={'Flight Itineraries'}/>
            <DivContainer parentClass={'cart-content'}>
                <DivContainer parentClass={'boarding-pass'}>
                    <DivContainer parentClass={'departure-flight'}>
                        <DivContainer parentClass={'flight-name'}>
                            Departure Flight
                        </DivContainer>
                        <DivContainer parentClass={'departure-card'}>
                            <ConfirmationCard flight={outboundFlight} passengerNumber={passengerNumber} seatType={outboundSeatType} handle={() => handleGoBack(tripType === 'one-way' ? 1 : 2)} type={'DEP'}/>
                        </DivContainer>
                    </DivContainer>
                    {tripType === 'round-trip' && (
                        <DivContainer parentClass={'return-flight'}>
                            <DivContainer parentClass={'flight-name'}>
                                Return Flight
                            </DivContainer>
                            <DivContainer parentClass={'return-card'}>
                                <ConfirmationCard flight={returnFlight} passengerNumber={passengerNumber} seatType={returnSeatType} handle={() => handleGoBack(1)} type={'RET'}/>
                            </DivContainer>
                        </DivContainer>
                    )}

                </DivContainer>
                <DivContainer parentClass={'cart-summary'}>
                    <DivContainer parentClass={'cart-header'}>
                        <h2>Cart Summary</h2>
                        <p>Total Passenger: {passengerNumber}</p>
                    </DivContainer>
                    <DivContainer parentClass={'cart-content'}>
                        <DivContainer parentClass={'dept-summary'}>
                            <p>Outbound Flight: {outboundFlight?.flightNumber}</p>
                            <p>Departure Time: {outboundFlight?.departureTime && format(outboundFlight.departureTime.split('T')[1])}</p>
                            <p>Arrival Time: {outboundFlight?.arrivalTime && format(outboundFlight.arrivalTime.split('T')[1])}</p>
                            <p>Seat Type: {outboundSeatType}</p>
                            <p>Total Travel Time: {calculateTravelTime(outboundFlight?.departureTime, outboundFlight?.arrivalTime)}</p>
                        </DivContainer>
                        {tripType === 'round-trip' && (
                            <DivContainer parentClass={'ret-summary'}>
                                <p>Return Flight: {returnFlight?.flightNumber}</p>
                                <p>Departure Time: {returnFlight?.departureTime && format(returnFlight.departureTime.split('T')[1])}</p>
                                <p>Arrival Time: {returnFlight?.arrivalTime && format(returnFlight.arrivalTime.split('T')[1])}</p>
                                <p>Seat Type: {returnSeatType}</p>
                                <p>Total Travel Time: {calculateTravelTime(returnFlight?.departureTime, returnFlight?.arrivalTime)}</p>
                            </DivContainer>
                        )}
                    </DivContainer>
                    <DivContainer parentClass={'submit-container'}>
                        <button onClick={handleContinue}>Continue</button>
                        <button onClick={handleLogin}>Login to Continue</button>
                    </DivContainer>
                </DivContainer>
            </DivContainer>
        </div>
    );
}