import './Bookings.css'
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";

export default function Bookings() {
    const isLightMode = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    const [bookingData, setBookingData] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookings = await userAPI.getAllBookings();
                setBookingData(bookings);
                console.log(bookings);
                console.log(isRefresh);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [isRefresh]);

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('id');
    const model = searchParams.get('model');
    const manufacturer = searchParams.get("manufacturer");
    const capacity = searchParams.get('capacity');
    const status = searchParams.get('status');

    const checkCapacity = (seat, range) => {
        switch(range) {
            case '< 100':
                return parseInt(seat) < 100
            case '100 - 200':
                return parseInt(seat) >= 100 && parseInt(seat) <= 200
            case '> 200':
                return parseInt(seat) > 200
            default:
                return true;
        }
    }


    const filteredBookings = bookingData.filter((booking) => {
        return (!code || booking.code === code)
            && (!model || booking.model === model)
            && (!manufacturer || booking.manufacturer === manufacturer)
            && (!status || booking.isActive === (status === "Active"))
            && (checkCapacity(booking.economySeatNumber + booking.businessSeatNumber, capacity));
    })

    const clearFilters = () => {
        const idFilter = document.getElementById("id-filter");
        const modelFilter = document.getElementById("model-filter");
        const manufacturerFilter = document.getElementById("manufacturer-filter");
        const statusFilter = document.getElementById("status-filter");
        const capacityFilter = document.getElementById("capacity-filter");
        idFilter.value = "";
        modelFilter.value = "";
        manufacturerFilter.value = "";
        statusFilter.value = "";
        capacityFilter.value = "";
        searchWithFilter();
    }

    const searchWithFilter = () => {
        const idValue = document.getElementById("id-filter").value.trim();
        const modelValue = document.getElementById("model-filter").value.trim();
        const manufacturerValue = document.getElementById("manufacturer-filter").value.trim();
        const statusValue = document.getElementById("status-filter").value.trim();
        const capacityValue = document.getElementById("capacity-filter").value.trim();
        let params = new URLSearchParams({
            'id': idValue,
            'model': modelValue,
            'manufacturer': manufacturerValue,
            'status': statusValue,
            'capacity': capacityValue,
        }).toString();
        navigate(`?${params}`);
    }

    const countPassengerTypes = (passengers) => {
        const counts = passengers.reduce((counts, passenger) => {
            counts[passenger.passengerType] = (counts[passenger.passengerType] || 0) + 1;
            return counts;
        }, {});

        return {
            adults: counts.ADULT || 0,
            children: counts.CHILD || 0,
            infants: counts.INFANT || 0
        };
    }

    return (
        <div className="bookings">
            <div className="bookings-filter">
                <div className="filters">
                    <div>ID<input type="text" id="id-filter" className="josefin-sans"/></div>
                    <div>Flight<input type="text" id="plane-id-filter" className="josefin-sans"/></div>
                    <div>Departure Airport <input type="text" id="departure-airport-filter" className="josefin-sans"/>
                    </div>
                    <div>Class <select id="class-filter" className="josefin-sans">
                        <option value="">{""}</option>
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                    </select></div>
                    <div>Reservation Date <input type="date" id="reservation-date-filter" className="josefin-sans"/>
                    </div>
                    <div>Status <select id="status-filter" className="josefin-sans">
                        <option value="">{""}</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="En route">En route</option>
                    </select></div>
                </div>
                <div>
                    <button className="josefin-sans" onClick={searchWithFilter}>Search</button>
                    <button className="josefin-sans" onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>
            <table className={`${isLightMode ? "" : "dark"}`}>
                <caption>TOTAL NUMBER OF Bookings : {bookingData.length}</caption>
                <tbody>
                <tr>
                    <th rowSpan={2}>No</th>
                    <th rowSpan={2}>ID</th>
                    <th rowSpan={2}>Outbound Flight</th>
                    <th rowSpan={2}>Return Flight</th>
                    <th rowSpan={2}>Email</th>
                    <th rowSpan={2}>Phone</th>
                    <th colSpan={3}>Passenger</th>
                    <th rowSpan={2}>Class</th>
                    <th rowSpan={2}>Price</th>
                    <th rowSpan={2}>Reservation Time</th>
                    <th rowSpan={2}>Status</th>
                </tr>
                <tr>
                    <th>Infants</th>
                    <th>Children</th>
                    <th>Adults</th>
                </tr>
                {filteredBookings.map((booking, index) =>
                    <tr key={booking.code}>
                        <td>{index + 1}</td>
                        <td>{booking.code}</td>
                        <td>{booking.flight.flightNumber}</td>
                        <td>{booking.returnFlight && booking.returnFlight.flightNumber}</td>
                        <td>{booking.email}</td>
                        <td>{booking.phoneNumber}</td>
                        <td>{countPassengerTypes(booking.passengers).infants}</td>
                        <td>{countPassengerTypes(booking.passengers).children}</td>
                        <td>{countPassengerTypes(booking.passengers).adults}</td>
                        <td>{booking.seatClass}</td>
                        <td>{booking.price}</td>
                        <td>{booking.reservationTime.substring(0, 10) + " " + booking.reservationTime.substring(12, 19)}</td>
                        <td>{booking.bookingStatus}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

