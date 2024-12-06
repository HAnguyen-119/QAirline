import './Flights.css'
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";
import {useOutletContext} from "react-router-dom";

export default function Flights() {
    const isLightMode = useOutletContext();
    const [flightsData, setFlightsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const flights = await userAPI.getAllFlights();
            setFlightsData(flights);
            console.log(flights);
        }
        fetchData();
    }, [])

    // const flightsDataFiltered = flightsData.filter(flight => {
    //
    // })

    return (
        <div className="flights">
            <table className={`${isLightMode ? "" : "dark"}`}>
                <caption>TOTAL NUMBER OF FLIGHTS : {flightsData.length}</caption>
                <tbody>
                    <tr>
                        <th rowSpan={2}>No</th>
                        <th rowSpan={2}>ID</th>
                        <th rowSpan={2}>Plane ID</th>
                        <th rowSpan={2}>Departure Airport</th>
                        <th rowSpan={2}>Arrival Airport</th>
                        <th rowSpan={2}>Departure Time</th>
                        <th rowSpan={2}>Arrival Time</th>
                        <th colSpan={2}>Price</th>
                        <th colSpan={2}>Seats</th>
                        <th colSpan={2}>Booked</th>
                        <th rowSpan={2}>Status</th>
                        <th rowSpan={2}>Edit</th>
                    </tr>
                    <tr>
                        <th>Economy</th>
                        <th>Business</th>
                        <th>Economy</th>
                        <th>Business</th>
                        <th>Economy</th>
                        <th>Business</th>
                    </tr>
                    {flightsData.map((flight, index) => <tr key={flight.flightNumber}>
                        <td>{index + 1}</td>
                        <td>{flight.flightNumber}</td>
                        <td>{flight.airplane.code}</td>
                        <td>{flight.departureAirport.code}</td>
                        <td>{flight.arrivalAirport.code}</td>
                        <td>{flight.departureTime}</td>
                        <td>{flight.arrivalTime}</td>
                        <td>{flight.economyPrice}</td>
                        <td>{flight.businessPrice}</td>
                        <td>{flight.airplane.economySeatNumber}</td>
                        <td>{flight.airplane.businessSeatNumber}</td>
                        <td>{flight.economySeatBookedNumber}</td>
                        <td>{flight.businessSeatBookedNumber}</td>
                        <td>{flight.flightStatus}</td>
                        <td>
                            <button className="edit" onClick={() => {

                            }}></button>
                            <button className="delete" onClick={() => {

                            }}></button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

