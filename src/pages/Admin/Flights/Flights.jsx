import './Flights.css'
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Flights() {
    const isLightMode = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    const [flightData, setFlightData] = useState([]);
    const [planeData, setPlaneData] = useState([]);
    const [airportData, setAirportData] = useState([]);

    const [isRefresh, setIsRefresh] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatingFlight, setUpdatingFlight] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState([0, ""]);
    const [isDuplicatedId, setIsDuplicatedId] = useState(false);

    const [selectingPlane, setSelectingPlane] = useState(null);
    const [selectingDepartureAirport, setSelectingDepartureAirport] = useState(null);
    const [selectingArrivalAirport, setSelectingArrivalAirport] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const flights = await userAPI.getAllFlights();
            setFlightData(flights);
            // console.log(flights);
            const planes = await userAPI.getAllPlanes();
            setPlaneData(planes);
            // console.log(planes);
            const airports = await userAPI.getAllAirports();
            setAirportData(airports);
        }
        fetchData();
    }, [isRefresh])

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const planeId = searchParams.get('planeId');
    const departureAirport = searchParams.get("departureAirport");
    const departureDate = searchParams.get('departureDate');
    const arrivalAirport = searchParams.get("arrivalAirport");
    const arrivalDate = searchParams.get('arrivalDate');
    const status = searchParams.get('status');

    const checkDuplicateId = (newId) => {
        if (newId.length === 0) return false;
        const flightIds = flightData.map(flight => flight.flightNumber);
        for (let i = 0; i < flightIds.length; i++) {
            if (flightIds[i] === newId) return true;
        }
        return false
    }

    const clearFilters = () => {
        const idFilter = document.getElementById("id-filter");
        const planeIdFilter = document.getElementById("plane-id-filter");
        const departureAirportFilter = document.getElementById("departure-airport-filter");
        const arrivalAirportFilter = document.getElementById("arrival-airport-filter");
        const departureDateFilter = document.getElementById("departure-date-filter");
        const arrivalDateFilter = document.getElementById("arrival-date-filter");
        const statusFilter = document.getElementById("status-filter");
        idFilter.value = "";
        planeIdFilter.value = "";
        departureAirportFilter.value = "";
        arrivalAirportFilter.value = "";
        departureDateFilter.value = "";
        arrivalDateFilter.value = "";
        statusFilter.value = "";
        searchWithFilter();
    }

    const searchWithFilter = () => {
        const idValue = document.getElementById("id-filter").value.trim();
        const planeIdValue = document.getElementById("plane-id-filter").value.trim();
        const departureAirportValue = document.getElementById("departure-airport-filter").value.trim();
        const arrivalAirportValue = document.getElementById("arrival-airport-filter").value.trim();
        const departureDateValue = document.getElementById("departure-date-filter").value;
        const arrivalDateValue = document.getElementById("arrival-date-filter").value;
        const statusValue = document.getElementById("status-filter").value.trim();
        let params = new URLSearchParams({
            'id': idValue,
            'planeId': planeIdValue,
            'departureAirport': departureAirportValue,
            'arrivalAirport': arrivalAirportValue,
            'departureDate': departureDateValue,
            'arrivalDate': arrivalDateValue,
            'status': statusValue,
        }).toString();
        navigate(`?${params}`);
        console.log(filteredFlights);
    }

    const filteredFlights = flightData.filter((flight) => {
        return (!id || flight.flightNumber === id.toUpperCase())
            && (!planeId || flight.airplane.code === planeId.toUpperCase())
            && (!departureAirport || flight.departureAirport.code === departureAirport.toUpperCase())
            && (!departureDate || flight.departureTime.substring(0, 10) === departureDate)
            && (!arrivalAirport || flight.arrivalAirport.code === arrivalAirport.toUpperCase())
            && (!arrivalDate || flight.arrivalTime.substring(0, 10) === arrivalDate)
            && (!status || flight.flightStatus === status.toUpperCase());
    })

    const handleCancel = () => {
        setIsAdding(false);
        setIsUpdating(false);
        setIsDeleting(false);
        setIsDuplicatedId(false);
        setIsRefresh(!isRefresh);
    }

    const handleAdd = async () => {
        const newId = document.getElementById("id-new").value.trim();
        const newPlaneId = document.getElementById("plane-id-new").value.trim();
        const newDepartureAirport = document.getElementById("departure-airport-new").value.trim();
        const newArrivalAirport = document.getElementById("arrival-airport-new").value.trim();
        const newDepartureDate = document.getElementById("departure-date-new").value.trim();
        const newDepartureTime = document.getElementById("departure-time-new").value.trim();
        const newArrivalDate = document.getElementById("arrival-date-new").value.trim();
        const newArrivalTime = document.getElementById("arrival-time-new").value.trim();
        const newEconomyPrice = document.getElementById("economy-price-new").value;
        const newBusinessPrice = document.getElementById("business-price-new").value;
        const isValid = newId.length > 0
            && newId.length > 0
            && newPlaneId.length > 0
            && newDepartureAirport.length > 0
            && newArrivalAirport.length > 0
            && newDepartureDate.length > 0
            && newArrivalDate.length > 0
        const newFlightData = {"flightNumber": newId,
            "departureTime": `${newDepartureDate}T${newDepartureTime}`,
            "arrivalTime": `${newArrivalDate}T${newArrivalTime}`,
            "flightStatus": "SCHEDULED",
            "economyPrice": newEconomyPrice,
            "businessPrice": newBusinessPrice,
            "economySeatBookedNumber": 0,
            "businessSeatBookedNumber": 0,
            "airplane": {"id": selectingPlane.id},
            "departureAirport": {"id": selectingDepartureAirport.id},
            "arrivalAirport": {"id": selectingArrivalAirport.id}
        };
        console.log(selectingDepartureAirport);
        console.log(selectingArrivalAirport);
        console.log(newFlightData);
        try {
            if (isValid) {
                if (checkDuplicateId(newId)) {
                    setIsDuplicatedId(true);
                } else {
                    setIsDuplicatedId(false);
                    await userAPI.addFlight(newFlightData);
                    setIsAdding(false);
                    setIsRefresh(!isRefresh);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        const newId = document.getElementById("id-new").value.trim();
        const newPlaneId = document.getElementById("plane-id-new").value.trim();
        const newDepartureAirport = document.getElementById("departure-airport-new").value.trim();
        const newArrivalAirport = document.getElementById("arrival-airport-new").value.trim();
        const newDepartureDate = document.getElementById("departure-date-new").value.trim();
        const newDepartureTime = document.getElementById("departure-time-new").value.trim();
        const newArrivalDate = document.getElementById("arrival-date-new").value.trim();
        const newArrivalTime = document.getElementById("arrival-time-new").value.trim();
        const newEconomyPrice = document.getElementById("economy-price-new").value;
        const newBusinessPrice = document.getElementById("business-price-new").value;
        const newStatus = document.getElementById("status-new").value;
        const isValid = newId.length > 0
            && newId.length > 0
            && newPlaneId.length > 0
            && newDepartureAirport.length > 0
            && newArrivalAirport.length > 0
            && newDepartureDate.length > 0
            && newArrivalDate.length > 0
        && newStatus.length > 0
        const newFlightData = {"flightNumber": newId,
            "departureTime": `${newDepartureDate}T${newDepartureTime}`,
            "arrivalTime": `${newArrivalDate}T${newArrivalTime}`,
            "flightStatus": newStatus,
            "economyPrice": newEconomyPrice,
            "businessPrice": newBusinessPrice,
            "economySeatBookedNumber": 0,
            "businessSeatBookedNumber": 0,
            "airplane": {"id": selectingPlane.id},
            "departureAirport": {"id": selectingDepartureAirport.id},
            "arrivalAirport": {"id": selectingArrivalAirport.id},
        };
        console.log(newFlightData);
        try {
            if (isValid) {
                if (checkDuplicateId(newId) && updatingFlight.flightNumber !== newId) {
                    setIsDuplicatedId(true);
                } else {
                    setIsDuplicatedId(false);
                    await userAPI.updateFlight(updatingFlight.id, newFlightData);
                    setIsUpdating(false);
                    setIsRefresh(!isRefresh);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (flight) => {
        try {
            await userAPI.deleteFlight(flight);
            setIsDeleting(false);
            setIsRefresh(!isRefresh);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="flights">
            <div className="flights-filter">
                <button className="josefin-sans" id="add-Bt" onClick={() => {
                    setIsAdding(true)
                }}>Add new flight
                </button>
                <div className="filters">
                    <div>ID<input type="text" id="id-filter" className="josefin-sans"/></div>
                    <div>Plane ID <input type="text" id="plane-id-filter" className="josefin-sans"/></div>
                    <div>Departure Airport <input type="text" id="departure-airport-filter" className="josefin-sans"/></div>
                    <div>Arrival Airport <input type="text" id="arrival-airport-filter" className="josefin-sans"/></div>
                    <div>Departure Date <input type="date" id="departure-date-filter" className="josefin-sans"/></div>
                    <div>Arrival Date <input type="date" id="arrival-date-filter" className="josefin-sans"/></div>
                    <div>Status <select id="status-filter" className="josefin-sans">
                        <option value="">{""}</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="En route">En route</option>
                        <option value="Arrived">Arrived</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select></div>
                </div>
                <div>
                    <button className="josefin-sans" onClick={searchWithFilter}>Search</button>
                    <button className="josefin-sans" onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>
            <table className={`${isLightMode ? "" : "dark"}`}>
                <caption>TOTAL NUMBER OF FLIGHTS : {flightData.length}</caption>
                <tbody>
                <tr>
                    <th rowSpan={2}>No</th>
                    <th rowSpan={2}>ID</th>
                    <th rowSpan={2}>Plane ID</th>
                    <th rowSpan={2}>Departure Airport</th>
                    <th rowSpan={2}>Arrival Airport</th>
                    <th rowSpan={2}>Departure Time</th>
                    <th rowSpan={2}>Arrival Time</th>
                    <th colSpan={2}>Price ($)</th>
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
                {filteredFlights.map((flight, index) => <tr key={flight.flightNumber}>
                    <td>{index + 1}</td>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.airplane.code}</td>
                    <td>{flight.departureAirport.code}</td>
                    <td>{flight.arrivalAirport.code}</td>
                    <td>{flight.departureTime.replace("T", " ")}</td>
                    <td>{flight.arrivalTime.replace("T", " ")}</td>
                    <td>{flight.economyPrice}</td>
                    <td>{flight.businessPrice}</td>
                    <td>{flight.airplane.economySeatNumber}</td>
                    <td>{flight.airplane.businessSeatNumber}</td>
                    <td>{flight.economySeatBookedNumber}</td>
                    <td>{flight.businessSeatBookedNumber}</td>
                    <td>{flight.flightStatus}</td>
                    <td>
                        <button className="edit" onClick={() => {
                            setIsUpdating(true);
                            setUpdatingFlight(flight);
                            setSelectingPlane(flight.airplane);
                            console.log(flight.airplane);
                            setSelectingDepartureAirport(flight.departureAirport);
                            setSelectingArrivalAirport(flight.arrivalAirport);
                        }}><FontAwesomeIcon icon={faPenToSquare}/></button>
                        <button className="delete" onClick={() => {
                            setIsDeleting(true)
                            setDeletingId([flight.id, flight.flightNumber]);
                        }}><FontAwesomeIcon icon={faTrash}/></button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            {(isAdding || isUpdating) ?
                <div className="add-flight-window">
                    <div></div>
                    <div className="add-flight-form">
                        <h1>{isAdding ? "New flight" : "Update flight"}</h1>
                        <div className="input-fields">
                            <div>
                                <span>Flight Number <span
                                    style={{color: "red"}}>* {isDuplicatedId ? "ID existed ! Try another ID" : ""}</span></span>
                                <input type="text" id="id-new" className="josefin-sans" required={true}
                                       defaultValue={isUpdating ? updatingFlight.flightNumber : ""}/>
                            </div>
                            <div>
                                <span>Plane ID <span style={{color: "red"}}>* </span></span>
                                <select id="plane-id-new" className="josefin-sans" required={true}
                                        defaultValue={isUpdating ? updatingFlight.airplane.code : ""}
                                        onChange={(e) => {
                                            const selectedPlaneCode = e.target.value;
                                            const selectedPlane = planeData.find((plane) => plane.code === selectedPlaneCode);
                                            setSelectingPlane(selectedPlane);
                                            console.log(selectedPlane);
                                        }}>
                                    <option></option>
                                    {planeData.map((plane) => {
                                        return (
                                            <option key={plane.code} value={plane.code}>
                                                {`${plane.code} (E: ${plane.economySeatNumber}, B: ${plane.businessSeatNumber})`}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <span>Departure Airport <span style={{color: "red"}}>* </span></span>
                                <select id="departure-airport-new" className="josefin-sans" required={true}
                                        defaultValue={isUpdating ? updatingFlight.departureAirport.code : ""}
                                        onChange={(e) => {
                                            const selectedAirportCode = e.target.value;
                                            const selectedAirport = airportData.find((airport) => airport.code === selectedAirportCode);
                                            setSelectingDepartureAirport(selectedAirport);
                                            console.log(selectedAirport);
                                        }}>
                                    <option></option>
                                    {airportData.map((airport) => {
                                        return (
                                            <option key={airport.code} value={airport.code}>
                                                {`${airport.name} (${airport.code})`}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <span>Arrival Airport <span style={{color: "red"}}>* </span></span>
                                <select id="arrival-airport-new" className="josefin-sans" required={true}
                                        defaultValue={isUpdating ? updatingFlight.arrivalAirport.code : ""}
                                        onChange={(e) => {
                                            const selectedAirportCode = e.target.value;
                                            const selectedAirport = airportData.find((airport) => airport.code === selectedAirportCode);
                                            setSelectingArrivalAirport(selectedAirport);
                                            console.log(selectedAirport);
                                        }}>
                                    <option></option>
                                    {airportData.map((airport) => {
                                        return (
                                            <option key={airport.code} value={airport.code}>
                                                {`${airport.name} (${airport.code})`}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <span>Departure Time <span style={{color: "red"}}>* </span></span>
                                <div className="time">
                                    <input type="date" id="departure-date-new" className="josefin-sans" required={true}
                                           defaultValue={isUpdating ? updatingFlight.departureTime.substring(0, 10) : ""}/>
                                    <input type="time" id="departure-time-new" className="josefin-sans" required={true}
                                           defaultValue={isUpdating ? updatingFlight.departureTime.substring(11) : ""}/>
                                </div>
                            </div>
                            <div>
                                <span>Arrival Time <span style={{color: "red"}}>* </span></span>
                                <div className="time">
                                    <input type="date" id="arrival-date-new" className="josefin-sans" required={true}
                                           defaultValue={isUpdating ? updatingFlight.arrivalTime.substring(0, 10) : ""}/>
                                    <input type="time" id="arrival-time-new" className="josefin-sans" required={true}
                                           defaultValue={isUpdating ? updatingFlight.arrivalTime.substring(11) : ""}/>
                                </div>
                            </div>
                            <div>
                                <span>Economy price ($)<span style={{color: "red"}}>*</span></span>
                                <input type="number" min={1} id="economy-price-new" className="josefin-sans"
                                       required={true}
                                       defaultValue={isUpdating ? updatingFlight.economyPrice : ""}/>
                            </div>
                            <div>
                                <span>Business price ($)<span style={{color: "red"}}>*</span></span>
                                <input type="number" min={1} id="business-price-new" className="josefin-sans"
                                       required={true}
                                       defaultValue={isUpdating ? updatingFlight.businessPrice : ""}/>
                            </div>
                            <div>
                                <span>Status</span>
                                {isAdding ?
                                    <input type="text" id="status-new" className="josefin-sans"
                                            value={"SCHEDULED"}/> :
                                    <select id="status-new" className="josefin-sans"
                                            defaultValue={updatingFlight.flightStatus}>
                                        <option value="">{""}</option>
                                        <option value="SCHEDULED">Scheduled</option>
                                        <option value="EN ROUTE">En route</option>
                                        <option value="ARRIVED">Arrived</option>
                                        <option value="DELAYED">Delayed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>}
                            </div>
                            <div className="buttons">
                                <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                                {isAdding ?
                                    <button className="josefin-sans" onClick={handleAdd}>ADD</button> :
                                    <button className="josefin-sans" onClick={handleUpdate}>SAVE</button>}
                            </div>
                        </div>
                    </div>
                </div> : null}
            {isDeleting ?
                <div className="delete-flight-window">
                    <div></div>
                    <div className="delete-flight-form">
                        <h3>Delete flight with ID {deletingId[1]} ?</h3>
                        <div className="buttons">
                            <button className="josefin-sans" onClick={handleCancel}>CANCEL</button>
                            <button className="josefin-sans" onClick={() => {handleDelete(deletingId[0]);}}>DELETE</button>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}

