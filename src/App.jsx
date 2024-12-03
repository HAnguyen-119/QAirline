
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import Booking from './pages/Booking/Booking'
import About from './pages/About/About'
import MainLayout from "./layouts/MainLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import Manage from "./pages/Manage/Manage.jsx";
import Signup from "./pages/Signup/Signup.jsx"
import Company from "./pages/About/Company/Company.jsx";
import Career from "./pages/About/Career/Career.jsx";
import Partners from "./pages/About/Partners/Partners.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Users from "./pages/Users/Users.jsx";
import Flights from "./pages/Flights/Flights.jsx";
import Planes from "./pages/Planes/Planes.jsx";
import Booked from "./pages/Booked/Booked.jsx";
import Information from "./pages/Information/Information.jsx";
import SearchResults from "./pages/Booking/Search/SearchResults.jsx";
import ShoppingCart from "./pages/Booking/ShoppingCart/ShoppingCart.jsx";
import Traveler from "./pages/Booking/TravelerInfo/Traveler.jsx";
import {BookingProvider} from "./Context/BookingContext.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>} />
            <Route path="booking" element={<Booking/>} />
            <Route path="manage" element={<Manage/>} />
            <Route path="about" element={<About/>}>
                <Route path="company" element={<Company/>} />
                <Route path="partners" element={<Partners/>} />
                <Route path="career" element={<Career/>} />
            </Route>
            <Route path="explore" element={<Explore/>} />
            <Route path="login" element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='/booking/availability' element={<SearchResults/>} />
            <Route path='/booking/shopping-cart' element={<ShoppingCart/>} />
            <Route path='/booking/traveler' element={<Traveler/>} />
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
