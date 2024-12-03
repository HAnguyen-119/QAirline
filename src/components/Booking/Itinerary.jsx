import DivContainer from "../DivContainer.jsx";
import Button from "../Button/Button.jsx";
import SelectElement from "../Form/SelectElement.jsx";
import Icon from "../Icon/icon.jsx";
import {faRightLeft, faRightLong} from "@fortawesome/free-solid-svg-icons";
import InputElement from "../Form/InputElement.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {faPlaneUp} from "@fortawesome/free-solid-svg-icons/faPlaneUp";
import {faRotate} from "@fortawesome/free-solid-svg-icons/faRotate";
import userAPI from "../../api/userAPI.jsx";

export default function Itinerary() {
    const navigate = useNavigate();

    const [tripType, setTripType] = useState('');
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [deptDate, setDeptDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    let airports;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    "departureAirportId": 1,
                    "arrivalAirportId": 2,
                    "departureDate": "2024-01-10",
                    "arrivalDate": "2024-01-12",
                    "passengerNumber": 2

                }

                const resFlights = userAPI.findFlight(data);
                console.log(resFlights)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


    const handleSearchFlightSubmit = (event) => {
        event.preventDefault();
        if (returnDate && returnDate < deptDate) {
            alert('Return date must be after the departure date.');
            return;
        }
        const searchParams = new URLSearchParams({
            'tripType': tripType,
            'departure': departure,
            'destination': destination,
            'dept-date': deptDate,
            'return-date': returnDate
        }).toString();
        navigate(`/booking/outbound/availability?${searchParams}`);
    }

    return (
        <div className='itinerary'>
            <h1>ITINERARY</h1>
            <form className='booking-form' onSubmit={handleSearchFlightSubmit}>
                <DivContainer parentClass='type'>
                    <Button type='button' buttonClass={`trip-button ${tripType === 'one-way' ? 'active' : ''}`} onClick={() => setTripType('one-way')} text='One-way Trip' icon={faPlaneUp}/>
                    <Button type='button' buttonClass={`trip-button ${tripType === 'round-trip' ? 'active' : ''}`} onClick={() => setTripType('round-trip')} text='Round Trip' icon={faRotate   }/>
                </DivContainer>
                <div className='info'>
                    <SelectElement htmlFor='departure' description='Departure Airport' id='departure' name='departure' required={true} onChange={(e) => setDeparture(e.target.value)}/>
                    <Icon name='trip-arrow' iconName={tripType === 'round-trip' ? faRightLeft : faRightLong} />
                    <SelectElement htmlFor='destination' description='Destination Airport' id='destination' name='destination' required={true} onChange={(e) => setDestination(e.target.value)}/>
                    <InputElement htmlFor='dept-date' description='Start Date' id='dept-date' name='dept-date' type='date' required={true} onChange={(e) => setDeptDate(e.target.value)}/>
                    <div style={{ visibility: tripType === 'round-trip' ? 'visible' : 'hidden' }}>
                        <InputElement htmlFor='return-date' description='Return Date' id='return-date' name='return-date' type='date' onChange={(e) => setReturnDate(e.target.value)}/>
                    </div>
                </div>
                <button className='submit' type='submit' >Search</button>
            </form>
        </div>
    )
}