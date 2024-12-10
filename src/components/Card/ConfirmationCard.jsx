import DivContainer from "../DivContainer.jsx";
import Icon from "../Icon/icon.jsx";
import {faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import {faPlane} from "@fortawesome/free-solid-svg-icons/faPlane";
import {faPlaneArrival} from "@fortawesome/free-solid-svg-icons/faPlaneArrival";
import {format} from "../../utils/Time.js";
import {calculateTravelTime} from "../../utils/CalculateTime.js";

import ('./ConfirmationCard.css');

export default function ConfirmationCard({flight, passengerNumber, seatType, handle}) {
    return (
        <>
            <DivContainer parentClass={'card-container'}>
                <DivContainer parentClass={'card card-top'}>
                    <DivContainer parentClass={'dept-left'}>
                        {flight?.departureAirport && (
                            <>
                                <h1> {flight.departureAirport.code} <Icon iconName={faPlaneDeparture}/> </h1>
                                <p>{flight.departureAirport.name}</p>
                            </>
                        )}
                    </DivContainer>
                    <DivContainer parentClass={'mid-icon'}>
                        <Icon name='trip-arrow' iconName={faPlane}/>
                    </DivContainer>
                    <DivContainer parentClass={'dest-right'}>
                        {flight?.arrivalAirport && (
                            <>
                                <h1><Icon iconName={faPlaneArrival}/> {flight.arrivalAirport.code}  </h1>
                                <p>{flight.arrivalAirport.name}</p>
                            </>
                        )}
                    </DivContainer>
                </DivContainer>
                <DivContainer parentClass={'card card-bottom'}>
                    <DivContainer parentClass={'dept-top'}>
                        <DivContainer parentClass={'passenger-number'}>
                            <DivContainer parentClass={'title passenger-title'}>
                                <p>Passenger</p>
                            </DivContainer>
                            <DivContainer parentClass={'passenger-info'}>
                                <p>{passengerNumber}</p>
                            </DivContainer>
                        </DivContainer>
                        <DivContainer parentClass={'dept-date'}>
                            <DivContainer parentClass={'title date-title'}>
                                <p>Date</p>
                            </DivContainer>
                            <DivContainer parentClass={'date-info'}>
                                <p>{flight?.departureTime}</p>
                                <DivContainer parentClass={'mid-icon'}/>
                                <p>{flight?.arrivalTime}</p>
                            </DivContainer>
                        </DivContainer>
                    </DivContainer>
                    <DivContainer parentClass={'dept-middle'}>
                        <DivContainer parentClass={'flight-number'}>
                            <DivContainer parentClass={'title flight-title'}>
                                <p>Flight Number</p>
                            </DivContainer>
                            <DivContainer parentClass={'flight-info'}>
                                <p>{flight?.flightNumber}</p>
                            </DivContainer>
                        </DivContainer>
                        <DivContainer parentClass={'airplane-model'}>
                            <DivContainer parentClass={'title airplane-title'}>
                                <p>Airplane</p>
                            </DivContainer>
                            <DivContainer parentClass={'airplane-info'}>
                                <p>{flight?.airplane?.model}</p>
                            </DivContainer>
                        </DivContainer>
                        <DivContainer parentClass={'seat-type'}>
                            <DivContainer parentClass={'title seat-title'}>
                                <p>Seat Type</p>
                            </DivContainer>
                            <DivContainer parentClass={'seat-info'}>
                                <p>{seatType}</p>
                            </DivContainer>
                        </DivContainer>
                    </DivContainer>
                    <DivContainer parentClass={'dept-bottom'}>
                        <DivContainer parentClass={'boarding-time'}>
                            <DivContainer parentClass={'title boarding-title'}>
                                <p>Boarding Time</p>
                            </DivContainer>
                            <DivContainer parentClass={'boarding-info'}>
                                {
                                    flight?.departureTime &&
                                    <p>{format(flight?.departureTime?.split('T')[1])}</p>
                                }
                            </DivContainer>
                        </DivContainer>
                        <DivContainer parentClass={'traveling-time'}>
                            <DivContainer parentClass={'title traveling-title'}>
                                <p>Traveling Time</p>
                            </DivContainer>
                            <DivContainer parentClass={'traveling-info'}>
                                <p>{calculateTravelTime(flight?.departureTime, flight?.arrivalTime)}</p>
                            </DivContainer>
                        </DivContainer>
                        <DivContainer parentClass={'arrival-time'}>
                            <DivContainer parentClass={'title arrival-title'}>
                                <p>Arrival Time</p>
                            </DivContainer>
                            <DivContainer parentClass={'arrival-info'}>
                                {
                                    flight?.arrivalTime &&
                                    <p>{format(flight?.arrivalTime?.split('T')[1])}</p>
                                }
                            </DivContainer>
                        </DivContainer>
                    </DivContainer>
                </DivContainer>
            </DivContainer>
            <DivContainer parentClass={'change-flight'}>
                <button onClick={handle}>Change Flight</button>
            </DivContainer>
        </>
    )
}