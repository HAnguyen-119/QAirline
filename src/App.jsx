
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
import SearchResults from "./pages/Booking/Search/SearchResults.jsx";
import ShoppingCart from "./pages/Booking/ShoppingCart/ShoppingCart.jsx";
import Traveler from "./pages/Booking/TravelerInfo/Traveler.jsx";
import {BookingProvider} from "./Context/BookingContext.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/manage" element={<Manage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/booking/outbound/availability' element={<SearchResults/>} />
        <Route path='/booking/shopping-cart' element={<ShoppingCart/>} />
        <Route path='/booking/traveler' element={<Traveler/>} />
        <Route path='/booking/return/availability' element={<SearchResults/>} />
    </Route>
))

function App() {
  return (
      <BookingProvider>
          <RouterProvider router={router} />
      </BookingProvider>
  )
}

export default App
