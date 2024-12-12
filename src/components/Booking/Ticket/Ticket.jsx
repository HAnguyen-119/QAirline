import LabelElement from "../../Form/LabelElement.jsx";
import HorizontalRule from "../../HorizontalRule.jsx";
import Logo from "../../Logo.jsx";
import {useLocation} from "react-router-dom";
import ('./Ticket.css')

export default function Ticket() {

    const location = useLocation();
    const { outboundFlight, returnFlight, passengerNumber, outboundSeatType, returnSeatType } = location.state;

    return (
           <div>
                <h1>Traveler Details</h1>
                <div>
                    <h2>Outbound Flight</h2>
                    <p>Flight Number: {outboundFlight}</p>
                    <p>Departure Time: {outboundFlight?.departureTime}</p>
                    <p>Arrival Time: {outboundFlight?.arrivalTime}</p>
                    <p>Seat Type: {outboundSeatType}</p>
                </div>
                {returnFlight && (
                    <div>
                        <h2>Return Flight</h2>
                        <p>Flight Number: {returnFlight}</p>
                        <p>Departure Time: {returnFlight?.departureTime}</p>
                        <p>Arrival Time: {returnFlight?.arrivalTime}</p>
                        <p>Seat Type: {returnSeatType}</p>
                    </div>
                )}
                <div>
                    <h2>Passenger Number</h2>
                    <p>{passengerNumber}</p>
                </div>
                <button onClick={() => console.log('Submit to backend')}>Continue</button>
            </div>
    )
}