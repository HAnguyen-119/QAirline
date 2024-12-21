import DivContainer from "../DivContainer.jsx";
import Icon from "../Icon/icon.jsx";
import { faPlane } from "@fortawesome/free-solid-svg-icons/faPlane";
import { format } from "../../utils/Time.js";
import { calculateTravelTime } from "../../utils/CalculateTime.js";
import { useOutletContext } from "react-router-dom";
import html2canvas from "html2canvas";

import './ConfirmationCard.css';

export default function ConfirmationCard({ flight, passengerNumber, seatType, handle, type, hasButton }) {
    const departureDate = flight?.departureTime?.split('T')[0];
    const arrivalDate = flight?.arrivalTime?.split('T')[0];

    const isLightMode = useOutletContext();


    const handleCapture = async () => {
        let element;
        if (type === 'DEP') {
            element = document.querySelector('.departure-card>.card-container');
        } else {
            element = document.querySelector('.return-card>.card-container');
        }
        const canvas = await html2canvas(element);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.style.backgroundColor = 'red';
        link.href = dataUrl;
        link.download = 'ticket.png';
        link.click();
    };

    return (
        <>
            <DivContainer parentClass={`card-container ${isLightMode ? "" : "dark"}`}>
                <DivContainer parentClass={`card card-top ${isLightMode ? "" : "dark"}`}>
                    <DivContainer parentClass={'dept-left'}>
                        {flight?.departureAirport && (
                            <>
                                <h1> {flight.departureAirport.code}</h1>
                                <p>{flight.departureAirport.city.split(',')[0]}</p>
                            </>
                        )}
                    </DivContainer>
                    <DivContainer parentClass={'mid-icon'}>
                        <Icon name='trip-arrow' iconName={faPlane} />
                    </DivContainer>
                    <DivContainer parentClass={'dest-right'}>
                        {flight?.arrivalAirport && (
                            <>
                                <h1>{flight.arrivalAirport.code}  </h1>
                                <p>{flight.arrivalAirport.city.split(',')[0]}</p>
                            </>
                        )}
                    </DivContainer>
                </DivContainer>
                <DivContainer parentClass={`card-divider ${isLightMode ? "" : "dark"}`} />
                <DivContainer parentClass={`card card-bottom ${isLightMode ? "" : "dark"}`}>
                    <DivContainer parentClass={'dept-top'}>
                        <DivContainer parentClass={'passenger-number'}>
                            <DivContainer parentClass={'title passenger-title'}>
                                <p>Passenger</p>
                            </DivContainer>
                            <DivContainer parentClass={'passenger-number-info'}>
                                <p>{passengerNumber}</p>
                            </DivContainer>
                        </DivContainer>
                        <DivContainer parentClass={'dept-date'}>
                            <DivContainer parentClass={'title date-title'}>
                                <p>Date</p>
                            </DivContainer>
                            <DivContainer parentClass={'date-info'}>
                                {departureDate === arrivalDate ? (
                                    <p>{departureDate}</p>
                                ) : (
                                    <>
                                        <p>{departureDate}</p>
                                        <DivContainer parentClass={'mid-icon'} />
                                        <p>{arrivalDate}</p>
                                    </>
                                )}
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
                {hasButton && <button className='button' onClick={handle}>Change Flight</button>}
                <button className='button' onClick={handleCapture}>Download</button>
            </DivContainer>

        </>
    )
}