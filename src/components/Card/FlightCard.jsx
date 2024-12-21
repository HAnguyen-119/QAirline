import Button from "../Button/Button.jsx";
import DivContainer from "../DivContainer.jsx";
import { useState } from "react";
import Icon from "../Icon/icon.jsx";
import {faMoneyCheck, faRightLeft, faRightLong} from "@fortawesome/free-solid-svg-icons";
import {format} from "../../utils/Time.js";
import {calculateTravelTime} from "../../utils/CalculateTime.js";
import {faSuitcase} from "@fortawesome/free-solid-svg-icons/faSuitcase";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";
import {faChair} from "@fortawesome/free-solid-svg-icons/faChair";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons/faBriefcase";
import {faSuitcaseRolling} from "@fortawesome/free-solid-svg-icons/faSuitcaseRolling";
import {faCouch} from "@fortawesome/free-solid-svg-icons/faCouch";
import {faAsterisk} from "@fortawesome/free-solid-svg-icons/faAsterisk";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons/faInfoCircle";

import ('./FlightCard.css');

export default function FlightCard({ flight, tripType, handleBookNow }) {
    const [openPopup, setOpenPopup] = useState('');

    const deptTime = flight.departureTime;
    const destTime = flight.arrivalTime;

    const date1 = new Date(deptTime);
    const date2 = new Date(destTime);

    const timeDifference = date2 - date1;

    const h = Math.floor(timeDifference / (1000 * 60 * 60));
    const m = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let flightTime = `${h}:${m}:${s}`;
    flightTime = format(flightTime);

    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    }

    const handleOpenPopup = (type) => {
        setOpenPopup(type);
    }

    const handleClosePopup = () => {
        setOpenPopup('');
    }

    return (
        <DivContainer parentClass='flight-card-container'>
            <DivContainer parentClass={`flight-card ${openDropdown ? 'show' : 'hide'}`}>
                <DivContainer parentClass='flight-info'>
                    <DivContainer parentClass='flight-info-dept-time'>
                        <DivContainer parentClass='flight-info-left'>
                            <p>{flight.departureAirport.name}</p>
                            <p>{deptTime.split('T')[1]}</p>
                        </DivContainer>
                    </DivContainer>
                    <DivContainer parentClass='middle-line'>
                        {tripType === 'one-way' && (
                            <Icon name='trip-arrow' iconName={faRightLong}/>
                        )}
                        {tripType === 'round-trip' && (
                            <Icon name='trip-arrow' iconName={faRightLeft}/>
                        )}
                        <p>{calculateTravelTime(deptTime, destTime)}</p>
                    </DivContainer>
                    <DivContainer parentClass='flight-info-arrival-time'>
                        <DivContainer parentClass='flight-info-right'>
                            <p>{flight.arrivalAirport.name}</p>
                            <p>{destTime.split('T')[1]}</p>
                        </DivContainer>
                    </DivContainer>
                </DivContainer>
                <DivContainer parentClass='flight-price'>
                    <Button buttonClass='button' onClick={toggleDropdown} text={`${openDropdown ? 'Close' : 'Select'}`}/>
                </DivContainer>
            </DivContainer>
                {openDropdown && (
                    <div className='dropdown-content'>
                        <div className='dropdown-option'>
                            <div className='ticket-type'>
                                <h2><Icon iconName={faCouch}/> Economy</h2>
                                <button onClick={() => handleOpenPopup('ECONOMY')}><Icon iconName={faInfoCircle}/></button>
                            </div>
                            <span className="seat-price">${flight.economyPrice}</span>
                            <p>Price/Pax</p>
                            <div className="seat-details">
                                <div className="seat-details-baggage">
                                    <strong>Baggage</strong>
                                    <span><Icon iconName={faSuitcase}/> Cabin Baggage 7kg</span>
                                    <span><Icon iconName={faBan}/> Checked Baggage</span>
                                </div>
                                <div className="seat-details-flexibility">
                                    <strong>Flexibility</strong>
                                    <span><Icon iconName={faBan}/> Less Preferential</span>
                                    <span><Icon iconName={faBan}/> No Online Payment</span>
                                </div>
                            </div>
                            <span><Icon iconName={faChair}/> Seats available: {flight.airplane.economySeatNumber - flight.economySeatBookedNumber}</span>
                            <Button buttonClass='button' onClick={() => handleBookNow(flight.id, 'ECONOMY')} text='Book now!' />
                        </div>
                        <div className='dropdown-option'>
                            <div className='ticket-type'>
                                <h2><Icon iconName={faBriefcase}/> Business</h2>
                                <button onClick={() => handleOpenPopup('BUSINESS')}><Icon iconName={faInfoCircle}/></button>
                            </div>
                            <span className="seat-price">${flight.businessPrice}</span>
                            <p>Price/Pax</p>
                            <div className="seat-details">
                                <div className="seat-details-baggage">
                                    <strong>Baggage</strong>
                                    <span><Icon iconName={faSuitcase}/> Cabin Baggage 7kg</span>
                                    <span><Icon iconName={faSuitcaseRolling}/> Checked Baggage 20kg</span>
                                </div>
                                <div className="seat-details-flexibility">
                                    <strong>Flexibility</strong>
                                    <span><Icon iconName={faAsterisk}/> Attractive Preferential</span>
                                    <span><Icon iconName={faMoneyCheck}/> Online Payment</span>
                                </div>
                            </div>
                            <span><Icon iconName={faChair}/> Seats available: {flight.airplane.businessSeatNumber - flight.businessSeatBookedNumber}</span>
                            <Button buttonClass='button' onClick={() => handleBookNow(flight.id, 'BUSINESS')} text='Book now!' />
                        </div>
                    </div>
                )}
            {openPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h2>{openPopup} SEAT</h2>
                        {openPopup === 'ECONOMY' && (
                            <>
                                <span className="seat-price">${flight.economyPrice}</span>
                                <p>Price/Pax</p>
                                <div className="seat-details">
                                    <div className="seat-details-baggage">
                                        <strong>Baggage</strong>
                                        <span><Icon iconName={faSuitcase}/> Cabin Baggage 7kg</span>
                                        <span><Icon iconName={faBan}/> Checked Baggage</span>
                                    </div>
                                    <div className="seat-details-flexibility">
                                        <strong>Flexibility</strong>
                                        <span><Icon iconName={faBan}/> Less Preferential</span>
                                        <span><Icon iconName={faBan}/> No Online Payment</span>
                                    </div>
                                </div>
                            </>
                        )}
                        {openPopup === 'BUSINESS' && (
                            <>
                                <span className="seat-price">${flight.businessPrice}</span>
                                <p>Price/Pax</p>
                                <div className="seat-details">
                                    <div className="seat-details-baggage">
                                        <strong>Baggage</strong>
                                        <span><Icon iconName={faSuitcase}/> Cabin Baggage 7kg</span>
                                        <span><Icon iconName={faSuitcaseRolling}/> Checked Baggage 20kg</span>
                                    </div>
                                    <div className="seat-details-flexibility">
                                        <strong>Flexibility</strong>
                                        <span><Icon iconName={faAsterisk}/> Attractive Preferential</span>
                                        <span><Icon iconName={faMoneyCheck}/> Online Payment</span>
                                    </div>
                                </div>
                            </>
                        )}
                        <Button buttonClass='button' onClick={handleClosePopup} text='Close' />
                    </div>
                </div>
            )}
        </DivContainer>
    )
}