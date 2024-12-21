import './Dashboard.css'
import {useOutletContext} from "react-router-dom";
import DashboardItem from "../../../components/Dashboard/DashboardItem.jsx";
import {faMapLocationDot, faNewspaper, faPlaneDeparture, faUser} from "@fortawesome/free-solid-svg-icons";
import {faPlane} from "@fortawesome/free-solid-svg-icons/faPlane";
import {faTicket} from "@fortawesome/free-solid-svg-icons/faTicket";
import {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI.jsx";

export default function Dashboard() {
    const isLightMode = useOutletContext();

    const [planeData, setPlaneData] = useState([]);
    const [flightData, setFlightData] = useState([]);
    const [airportData, setAirportData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const airports = await userAPI.getAllAirports();
                const flights = await userAPI.getAllFlights();
                const planes = await userAPI.getAllPlanes();
                const bookings = await userAPI.getAllBookings();
                const posts = await userAPI.getAllPosts();

                setAirportData(airports);
                setFlightData(flights);
                setPlaneData(planes);
                setBookingData(bookings);
                setPostData(posts);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={`dashboard ${isLightMode ? "" : "dark"}`}>
            <h1>WELCOME BACK, ADMIN !</h1>
            <div className="dashboard-container">
                <DashboardItem icon={faUser} title="ACCOUNT" isAccount={true}/>
                <DashboardItem icon={faPlaneDeparture} title="FLIGHTS" page="flights">
                    <div>
                        <div>Total flights: {flightData.length}</div>
                        <ul>
                            <li>Scheduled: {flightData.filter(flight => flight.flightStatus === "SCHEDULED").length}</li>
                            <li>In Air: {flightData.filter(flight => flight.flightStatus === "IN_AIR").length}</li>
                            <li>Arrived: {flightData.filter(flight => flight.flightStatus === "ARRIVED").length}</li>
                            <li>Cancelled: {flightData.filter(flight => flight.flightStatus === "CANCELLED").length}</li>
                        </ul>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faPlane} title="PLANES" page="planes">
                    <div>
                        <div>Total planes: {planeData.length}</div>
                        <ul>
                            <li>Active: {planeData.filter(plane => plane.isActive === true).length}</li>
                            <li>Inactive: {flightData.filter(plane => plane.isActive === false).length}</li>
                        </ul>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faMapLocationDot} title="AIRPORTS" page="airports">
                    <div>
                        <div>Total airports: {airportData.length}</div>
                        <ul>
                            <li>Active: {airportData.filter(airport => airport.isActive === true).length}</li>
                            <li>Inactive: {airportData.filter(airport => airport.isActive === false).length}</li>
                        </ul>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faTicket} title="BOOKINGS" page="bookings">
                    <div>
                        <div>Total bookings: {bookingData.length}</div>
                        <ul>
                            <li>Pending: {bookingData.filter(booking => booking.bookingStatus === "PENDING").length}</li>
                            <li>Cancelled: {bookingData.filter(booking => booking.bookingStatus === "CANCELLED").length}</li>
                            <li>Completed: {bookingData.filter(booking => booking.bookingStatus === "COMPLETED").length}</li>
                        </ul>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faNewspaper} title="POSTS" page="posts">
                    <div>
                        <div>Total posts: {postData.length}</div>
                        <ul>
                            <li>News: {postData.filter(post => post.type.toLowerCase() === "news").length}</li>
                            <li>Discount: {postData.filter(post => post.type.toLowerCase() === "discount").length}</li>
                        </ul>
                    </div>
                </DashboardItem>
            </div>
        </div>
    )
}