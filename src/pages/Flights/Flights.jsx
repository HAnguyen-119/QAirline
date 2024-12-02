import './Flights.css'

export default function Flights() {
    return (
        <div className="flights">
            <table>
                <tbody>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Plane Id</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure Time</th>
                        <th>Number of seats</th>
                        <th>Booked</th>
                        <th>Edit</th>
                    </tr>
                    {flightsInfo.map((flight, index) => <tr key={flight.id}>
                        <td>{index + 1}</td>
                        <td>{flight.id}</td>
                        <td>{flight.planeId}</td>
                        <td>{flight.from}</td>
                        <td>{flight.to}</td>
                        <td>{flight.departureTime}</td>
                        <td>{flight.seats}</td>
                        <td>{flight.booked}</td>
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