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
        <div className='dashboard'>
            <h1>WELCOME BACK, ADMIN !</h1>
            <div className="dashboard-container">
                <DashboardItem icon={faUser} title="USERS" page="users">
                    <div>
                        Total
                    </div>
                </DashboardItem>
                <DashboardItem icon={faPlaneDeparture} title="FLIGHTS" page="flights">
                    <div>
                        <div>Total flights: {flightData.length}</div>
                        <div>Scheduled</div>
                        <div>In air</div>
                        <div>Arrived</div>
                        <div>Cancelled</div>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faPlane} title="PLANES" page="planes">
                    <div>
                        <div>Total planes: {planeData.length}</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faMapLocationDot} title="AIRPORTS" page="airports">
                    <div>
                        <div>Total airports: {airportData.length}</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faTicket} title="BOOKINGS" page="bookings">
                    <div>
                        <div>Total bookings: {bookingData.length}</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
                <DashboardItem icon={faNewspaper} title="POSTS" page="posts">
                    <div>
                        <div>Total posts: {postData.length}</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
            </div>
        </div>
    )
}