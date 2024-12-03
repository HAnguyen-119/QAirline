import './Flights.css'
import {useEffect, useState} from "react";
import axios from "axios";
import userAPI from "../../../api/userAPI.jsx";

export default function Flights() {
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
            <table>
                <tbody>
                    <tr>
                        <th rowSpan={2}>No</th>
                        <th rowSpan={2}>Id</th>
                        <th rowSpan={2}>Plane Id</th>
                        <th rowSpan={2}>Departure Airport</th>
                        <th rowSpan={2}>Arrival Airport</th>
                        <th rowSpan={2}>Departure Time</th>
                        <th rowSpan={2}>Arrival Time</th>
                        <th colSpan={2}>Number of seats</th>
                        <th colSpan={2}>Booked</th>
                        <th rowSpan={2}>Status</th>
                        <th rowSpan={2}>Edit</th>
                    </tr>
                    <tr>
                        <th>Economy</th>
                        <th>Business</th>
                        <th>Economy</th>
                        <th>Business</th>
                    </tr>
                    {flightsData.map((flight, index) => <tr key={flight.flightNumber}>
                        <td>{index + 1}</td>
                        <td>{flight.flightNumber}</td>
                        <td></td>
                        <td>{((Object)(flight.departureAirport)).city + " (" + ((Object)(flight.departureAirport)).code + ")"}</td>
                        <td></td>
                        <td>{flight.departureTime}</td>
                        <td>{flight.arrivalTime}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{flight.status}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export const flightsInfo = [
    {
        id : "efee",
        planeId: "awe3",
        from: "Hanoi (HAN)",
        to: "Ho Chi Minh City (SGN)",
        departureTime: "2018-02-05 15:00",
        seats: "100",
        booked: "90",
    },
    {
        id : "sf4t",
        planeId: "vgs4",
        from: "Hanoi (HAN)",
        to: "Ho Chi Minh City (SGN)",
        departureTime: "2018-02-05 15:00",
        seats: "100",
        booked: "90",
    },
    {
        id : "grg",
        planeId: "a2fwf",
        from: "Hanoi (HAN)",
        to: "Ho Chi Minh City (SGN)",
        departureTime: "2018-02-05 15:00",
        seats: "100",
        booked: "90",
    },
    {
        id : "4tte",
        planeId: "sd0g",
        from: "Hanoi (HAN)",
        to: "Ho Chi Minh City (SGN)",
        departureTime: "2018-02-05 15:00",
        seats: "100",
        booked: "90",
    }
]