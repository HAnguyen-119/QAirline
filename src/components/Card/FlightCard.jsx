import Button from "../Button/Button.jsx";
import DivContainer from "../DivContainer.jsx";
import React from "react";
import Icon from "../Icon/icon.jsx";
import {faRightLeft, faRightLong} from "@fortawesome/free-solid-svg-icons";
import Logo from "../Logo.jsx";

import ('./FlightCard.css');

export default function FlightCard({ flight, handleBookNow }) {
    var isBusiness = flight.id % 2 !== 0;

    return (
        <DivContainer parentClass='flight-card'>
            <DivContainer parentClass={`flight-class`}>
                {isBusiness && (
                    <p className='business'>Business</p>
                )}
                {!isBusiness && (
                    <p className='economy'>Economy</p>
                )}
                <Logo/>
            </DivContainer>
            <DivContainer parentClass='flight-info'>
                <DivContainer parentClass='flight-info-dept-time'>
                    <DivContainer parentClass='flight-info-left'>
                        <p>{flight.departure}</p>
                        <p>{flight.deptTime}</p>
                    </DivContainer>
                </DivContainer>
                <DivContainer parentClass='middle-line'>
                    {flight.tripType === 'one-way' && (
                        <Icon name='trip-arrow' iconName={faRightLong}/>
                    )}
                    {flight.tripType === 'round-trip' && (
                        <Icon name='trip-arrow' iconName={faRightLeft}/>
                    )}
                    <p>{flight.deptDate}</p>
                </DivContainer>
                <DivContainer parentClass='flight-info-arrival-time'>
                    <DivContainer parentClass='flight-info-right'>
                        <p>{flight.destination}</p>
                        <p>{flight.arrivalTime}</p>
                    </DivContainer>
                </DivContainer>
            </DivContainer>
            <DivContainer parentClass='flight-price'>
                <DivContainer parentClass='flight-price-left'>
                    Starting at
                    {isBusiness && (
                        <p>${flight.bus_cost}</p>
                    )}
                    {!isBusiness && (
                        <p>${flight.eco_cost}</p>
                    )}
                </DivContainer>
                <Button buttonClass='submit' onClick={() => handleBookNow(flight.id)} text='Book now!'></Button>
            </DivContainer>

        </DivContainer>
    )
}