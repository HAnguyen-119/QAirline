import DivContainer from "../../DivContainer.jsx";
import Button from "../../Button/Button.jsx";
import FlightsSelector from "../../Form/FlightsSelector.jsx";
import Icon from "../../Icon/icon.jsx";
import {faRightLeft, faRightLong} from "@fortawesome/free-solid-svg-icons";
import InputElement from "../../Form/InputElement.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {faPlaneUp} from "@fortawesome/free-solid-svg-icons/faPlaneUp";
import {faRotate} from "@fortawesome/free-solid-svg-icons/faRotate";
import userAPI from "../../../api/userAPI.jsx";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faBabyCarriage} from "@fortawesome/free-solid-svg-icons/faBabyCarriage";
import {faChild} from "@fortawesome/free-solid-svg-icons/faChild";
import Passenger from "../Passenger/Passenger.jsx";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";

import ('./Itinerary.css');

export default function Itinerary() {
    const navigate = useNavigate();

    const [tripType, setTripType] = useState('one-way');
    const [deptID, setDeptID] = useState('');
    const [destID, setDestID] = useState('');
    const [deptDate, setDeptDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const [passengers, setPassengers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const [airports, setAirports] = useState([]);

    const handleSearchFlightSubmit = async (event) => {
        event.preventDefault();
        try {
            // const searchData = {
            //     'departureAirportId': deptID,
            //     'arrivalAirportId': destID,
            //     'departureDate': deptDate,
            //     'arrivalDate': tripType === 'round-trip' ? arrivalDate : '',
            //     'passengerNumber': passengers.adults + passengers.children
            // };

            const searchDept = {
                "dept-id": 1,
                "arr-id": 2,
                "dept-date": "2024-10-04",
                "ret-date": "2024-12-10",
                "passenger": 2,
            }


            const params = new URLSearchParams(searchDept).toString();
            const response = await userAPI.getAllAirports();
            setAirports(response);


            navigate(`/booking/outbound/availability?${params}`, {state: {adults: passengers.adults, children: passengers.children, infants: passengers.infants}});
        } catch (error) {
            console.error("Error finding flights:", error);
        }
    }

    return (
        <div className='itinerary'>
            <h1>ITINERARY</h1>
            <form className='booking-form' onSubmit={handleSearchFlightSubmit}>
                <DivContainer parentClass='type'>
                    <Button type='button' buttonClass={`button ${tripType === 'one-way' ? 'active' : ''}`} onClick={() => setTripType('one-way')} text=' One-way Trip' icon={faPlaneUp}/>
                    <Button type='button' buttonClass={`button ${tripType === 'round-trip' ? 'active' : ''}`} onClick={() => setTripType('round-trip')} text=' Round Trip' icon={faRotate   }/>
                </DivContainer>
                <div className='info'>
                    <FlightsSelector htmlFor='departure' description='Departure Airport' id='departure' name='departure' required={true} value={deptID} onChange={(e) => setDeptID(e.target.value)}/>
                    <Icon name='trip-arrow' iconName={tripType === 'round-trip' ? faRightLeft : faRightLong} />
                    <FlightsSelector htmlFor='destination' description='Destination Airport' id='destination' name='destination' required={true} value={destID} onChange={(e) => setDestID(e.target.value)}/>
                    <InputElement htmlFor='dept-date' description='Start Date' id='dept-date' name='dept-date' type='date' required={true} onChange={(e) => setDeptDate(e.target.value)} minDate={today}/>
                    <div className={'return-date-choice'} style={{ visibility: tripType === 'round-trip' ? 'visible' : 'hidden', marginLeft: '10px'}}>
                        <InputElement htmlFor='return-date' description='Return Date' id='return-date' name='return-date' type='date' required={tripType === 'round-trip'} onChange={(e) => setArrivalDate(e.target.value)} minDate={deptDate}/>
                    </div>
                </div>
                <p>Passenger</p>
                <Passenger passengers={passengers} setPassengers={setPassengers}/>
                <button className='button' type='submit' ><Icon iconName={faMagnifyingGlass}/> Search </button>
            </form>
        </div>
    )
}