import Button from "../Button/Button.jsx";
import DivContainer from "../DivContainer.jsx";
import React, { useState } from "react";
import Icon from "../Icon/icon.jsx";
import { faRightLeft, faRightLong } from "@fortawesome/free-solid-svg-icons";
import Logo from "../Logo.jsx";

import ('./FlightCard.css');

export default function FlightCard({ flight, tripType, handleBookNow }) {
    const economyClass = flight.seatClasses.find(seatClass => seatClass.seatClassType === 'STANDARD');
    const businessClass = flight.seatClasses.find(seatClass => seatClass.seatClassType === 'BUSINESS');
    const deptTime = flight.departureTime;
    const destTime = flight.arrivalTime;

    const date1 = new Date(deptTime);
    const date2 = new Date(destTime);

    const timeDifference = date2 - date1;

    const h = Math.floor(timeDifference / (1000 * 60 * 60));
    const m = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const [dropdownOpenEconomy, setDropdownOpenEconomy] = useState(false);
    const [dropdownOpenBusiness, setDropdownOpenBusiness] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (type) => {
        setOpenDropdown(openDropdown === type ? null : type);
    }

    const toggleDropdownEconomy = () => {
        setDropdownOpenEconomy(!dropdownOpenEconomy);
        if (dropdownOpenBusiness) {
            setDropdownOpenBusiness(false);
        }
    };

    const toggleDropdownBusiness = () => {
        setDropdownOpenBusiness(!dropdownOpenBusiness);
        if (dropdownOpenEconomy) {
            setDropdownOpenEconomy(false);
        }
    };

    return (
        <DivContainer parentClass='flight-card-container'>
            <DivContainer parentClass='flight-card'>
                <DivContainer parentClass='flight-info'>
                    <DivContainer parentClass='flight-info-dept-time'>
                        <DivContainer parentClass='flight-info-left'>
                            <p>{flight.departure}</p>
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
                        <p>{`${h}:${m}:${s}`}</p>
                    </DivContainer>
                    <DivContainer parentClass='flight-info-arrival-time'>
                        <DivContainer parentClass='flight-info-right'>
                            <p>{flight.destination}</p>
                            <p>{destTime.split('T')[1]}</p>
                        </DivContainer>
                    </DivContainer>
                </DivContainer>
                <DivContainer parentClass='flight-price'>
                    <Button buttonClass='dropdown-button' onClick={() => toggleDropdown('economy')} text={`Economy - ${economyClass.price}`}/>
                    <Button buttonClass='dropdown-button' onClick={() => toggleDropdown('business')} text={`Business - ${businessClass.price}`}/>
                </DivContainer>
            </DivContainer>
            <DivContainer className='flight-ticket'>
                <DivContainer className={`dropdown ${openDropdown === 'economy' ? 'show' : 'hide'}`}>
                    {openDropdown === 'economy' && (
                        <div className='dropdown-content'>
                            <div>
                                Seats available: {economyClass.totalNumber - economyClass.bookedNumber}
                            </div>
                            <Button buttonClass='submit' onClick={() => handleBookNow(flight.id, 'STANDARD')} text='Book now!' />
                        </div>
                    )}
                </DivContainer>
                <DivContainer className={`dropdown ${openDropdown === 'business' ? 'show' : 'hide'}`}>
                    {openDropdown === 'business' && (
                        <div className='dropdown-content'>
                            <div>
                                Seats available: {businessClass.totalNumber - businessClass.bookedNumber}
                            </div>
                            <Button buttonClass='submit' onClick={() => handleBookNow(flight.id, 'BUSINESS')} text='Book now!' />
                        </div>
                    )}
                </DivContainer>
            </DivContainer>
        </DivContainer>
    )
}