import { useLocation, useNavigate } from 'react-router-dom';
import './FlightConfirmation.css';
import H1Text from "../../../../components/H1Text.jsx";
import DivContainer from "../../../../components/DivContainer.jsx";
import {useEffect, useState} from "react";
import userAPI from "../../../../api/userAPI.jsx";
import ConfirmationCard from "../../../../components/Card/ConfirmationCard.jsx";
import {format} from "../../../../utils/Time.js";
import {calculateTravelTime} from "../../../../utils/CalculateTime.js";
import {CalculateFee} from "../../../../utils/CalculateFee.js";
import {CalculateTax} from "../../../../utils/CalculateTax.js";
import FeeDetails from "../../../../components/Booking/Flights/FeeDetails.jsx";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import Icon from "../../../../components/Icon/icon.jsx";
import HorizontalRule from "../../../../components/HorizontalRule.jsx";
import BoardingPass from "../../../../components/Booking/BoardingPass/BoardingPass.jsx";

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

    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    }

    const totalOutbound = CalculateFee({ flight: outboundFlight, seatType: outboundSeatType, adults, children, infants });
    const totalReturn = tripType === 'round-trip' ? CalculateFee({ flight: returnFlight, seatType: returnSeatType, adults, children, infants }) : 0;

    const outboundTax = CalculateTax(totalOutbound, passengerNumber);
    const returnTax = tripType === 'round-trip' ? CalculateTax(totalReturn, passengerNumber) : 0;

    const total = totalOutbound + outboundTax + totalReturn + returnTax;

    const handleContinue = () => {
        navigate('/booking/traveler', { state: { outboundFlight, returnFlight, adults, children, infants, outboundSeatType, returnSeatType, total } });
    };

    const handleGoBack = (num) => {
        navigate(-num);
    }

    return (
        <div className='cart-container'>
            <H1Text content={'Flight Itineraries'}/>
            <DivContainer parentClass={'cart-content'}>
                <BoardingPass tripType={tripType} outboundFlight={outboundFlight} returnFlight={returnFlight} passengerNumber={passengerNumber} outboundSeatType={outboundSeatType} returnSeatType={returnSeatType} handleOutbound={() => handleGoBack(tripType === 'one-way' ? 1 : 2)} handleReturn={() => handleGoBack(1)} hasButton={true}/>
                <DivContainer parentClass={'cart-summary'}>
                    <DivContainer parentClass={'summary-header'}>
                        <h2>Cart Summary</h2>
                        <p>Total Passenger: {passengerNumber}</p>
                    </DivContainer>
                    <DivContainer parentClass={'summary-content'}>
                        <DivContainer parentClass={'summary-item'}>
                            <div className='summary-comp'>
                                <strong>Departure Flight</strong>
                                <p>${totalOutbound}</p>
                                <HorizontalRule/>
                            </div>
                            <div className='summary-comp'>
                                <strong>Tax</strong>
                                <p>${outboundTax}</p>
                                <HorizontalRule/>
                            </div>
                        </DivContainer>
                        {tripType === 'round-trip' && (
                            <DivContainer parentClass={'summary-item'}>
                                <div className='summary-comp'>
                                    <strong>Return Flight</strong>
                                    <p>${totalReturn}</p>
                                    <HorizontalRule/>
                                </div>
                                <div className='summary-comp'>
                                    <strong>Tax</strong>
                                    <p>${returnTax}</p>
                                    <HorizontalRule/>
                                </div>
                            </DivContainer>
                        )}
                        <DivContainer parentClass={'flight-total'}>
                            <strong>Total</strong>
                            <DivContainer parentClass={'total-price'}>
                                <p>${total}</p>
                                <button onClick={handleOpenPopup}><Icon iconName={faInfoCircle}/></button>
                            </DivContainer>
                            <FeeDetails isOpen={isPopupOpen} onClose={handleClosePopup} />
                        </DivContainer>
                    </DivContainer>
                    <DivContainer parentClass={'submit-container'}>
                        <button className='button' onClick={handleContinue}>Continue</button>
                    </DivContainer>
                </DivContainer>
            </DivContainer>
        </div>
    );
}