import {NavLink} from "react-router-dom";
import Logo from "./Logo.jsx";

export default function NavBar() {
    return (
        <div className='navBar'>
            <NavLink className="josefin-sans" to='/about'>About</NavLink>
            <NavLink to='/explore'>Explore</NavLink>
            <NavLink to='/booking'>Booking</NavLink>
            <NavLink to='/'>Home</NavLink>
            <Logo/>
        </div>
    )
}