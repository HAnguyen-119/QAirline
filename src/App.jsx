
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

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/Explore" element={<Explore/>} />
        <Route path="/Login" element={<Login/>} />
    </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
