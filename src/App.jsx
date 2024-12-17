
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom'
import Home from './pages/User/Home/Home'
import Explore from './pages/User/Explore/Explore'
import Booking from './pages/User/Booking/Booking.jsx'
import About from './pages/User/About/About.jsx'
import MainLayout from "./layouts/MainLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import Manage from "./pages/User/Manage/Manage.jsx";
import Signup from "./pages/Signup/Signup.jsx"
import Company from "./pages/User/About/Company/Company.jsx";
import Career from "./pages/User/About/Career/Career.jsx";
import Partners from "./pages/User/About/Partners/Partners.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";
import Users from "./pages/Admin/Users/Users.jsx";
import Flights from "./pages/Admin/Flights/Flights.jsx";
import Planes from "./pages/Admin/Planes/Planes.jsx";
import Bookings from "./pages/Admin/Bookings/Bookings.jsx";
import Posts from "./pages/Admin/Posts/Posts.jsx";
import SearchResults from "./pages/User/Booking/Search/SearchResults.jsx";
import FlightConfirmation from "./pages/User/Booking/FlightConfirmation/FlightConfirmation.jsx";
import Traveler from "./pages/User/Booking/TravelerInfo/Traveler.jsx";
import {BookingProvider} from "./Context/BookingContext.jsx";
import Airports from "./pages/Admin/Airports/Airports.jsx";
import Ticket from "./components/Booking/Ticket/Ticket.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>} />
            <Route path="booking" element={<Booking/>}/>
            <Route path='/booking/outbound/availability' element={<SearchResults/>} />
            <Route path='/booking/return/availability' element={<SearchResults/>} />
            <Route path='/booking/shopping-cart' element={<FlightConfirmation/>} />
            <Route path='/booking/traveler' element={<Traveler/>} />
            <Route path="manage" element={<Manage/>} />
            <Route path="about" element={<About/>}>
                <Route path="company" element={<Company/>} />
                <Route path="partners" element={<Partners/>} />
                <Route path="career" element={<Career/>} />
            </Route>
            <Route path="explore" element={<Explore/>} />
            <Route path="login" element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='booking/ticket-info' element={<Ticket/>} />
        </Route>
        <Route path="admin" element={<AdminLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path="users" element={<Users/>} />
            <Route path="flights" element={<Flights/>} />
            <Route path="planes" element={<Planes/>} />
            <Route path="airports" element={<Airports/>} />
            <Route path="bookings" element={<Bookings/>} />
            <Route path="posts" element={<Posts/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
