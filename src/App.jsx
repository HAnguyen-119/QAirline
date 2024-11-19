
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

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/manage" element={<Manage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
    </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
