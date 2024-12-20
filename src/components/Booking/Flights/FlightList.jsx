import FlightCard from "../../Card/FlightCard.jsx";
import DivContainer from "../../DivContainer.jsx";
import EmptyFlight from "../../../assets/images/empty.png";
import React from "react";

export default function FlightList({isEmpty, flights, tripType, handleBookNow}) {
    return (
        <div className='flights-list'>
            {!isEmpty && flights.map(flight => (
                <FlightCard flight={flight} tripType={tripType} handleBookNow={(id, type) => handleBookNow(id, type)} />
            ))}
            {isEmpty && (
                <DivContainer parentClass='empty'>
                    <h3>Oops! There's no flights that depart on this day. Please try another day!</h3>
                </DivContainer>
            )}
        </div>
    )
}