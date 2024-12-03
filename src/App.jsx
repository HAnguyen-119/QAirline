
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
import Booked from "./pages/Admin/Booked/Booked.jsx";
import Information from "./pages/Admin/Information/Information.jsx";
import SearchResults from "./pages/User/Booking/Search/SearchResults.jsx";
import ShoppingCart from "./pages/User/Booking/ShoppingCart/ShoppingCart.jsx";
import Traveler from "./pages/User/Booking/TravelerInfo/Traveler.jsx";
import {BookingProvider} from "./Context/BookingContext.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>} />
            <Route path="booking" element={<Booking/>}/>
            <Route path='/booking/outbound/availability' element={<SearchResults/>} />
            <Route path='/booking/return/availability' element={<SearchResults/>} />
            <Route path='/booking/shopping-cart' element={<ShoppingCart/>} />
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
        </Route>
        <Route path="admin" element={<AdminLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path="users" element={<Users/>} />
            <Route path="flights" element={<Flights/>} />
            <Route path="planes" element={<Planes/>} />
            <Route path="booked" element={<Booked/>} />
            <Route path="information" element={<Information/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </>
))

function App() {
  return (
      <BookingProvider>
          <RouterProvider router={router} />
      </BookingProvider>
  )
}

export default App
