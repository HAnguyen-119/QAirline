import {NavLink} from "react-router-dom";
import Logo from "./Logo.jsx";

import Sun from "../assets/images/sun1.png";
import Moon from "../assets/images/moon1.png";

// eslint-disable-next-line react/prop-types
export default function NavBar({isAdmin, switchMode, isLightMode}) {
    if (isAdmin) {
        return (
            <div className='navBar'>
                <Logo/>
                <NavLink to='/admin' end>Dashboard</NavLink>
                <NavLink to='/admin/users'>Users</NavLink>
                <NavLink to='/admin/flights'>Flights</NavLink>
                <NavLink to='/admin/planes'>Planes</NavLink>
                <NavLink to='/admin/airports'>Airports</NavLink>
                <NavLink to='/admin/booked'>Booked</NavLink>
                <NavLink to='/admin/information'>Information</NavLink>
                <div className="switchMode" onClick={switchMode}>
                    <div className={`sun ${isLightMode ? "" : " dark"}`}><img src={Sun}/></div>
                    <div className={`moon ${isLightMode ? "" : " dark"}`}><img src={Moon}/></div>
                </div>
            </div>
        )
    } else
        return (
            <div className='navBar'>
                <Logo/>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/booking'>Booking</NavLink>
                <NavLink to='/manage'>Manage</NavLink>
                <NavLink to='/explore'>Explore</NavLink>
                <NavLink to='/about'>About</NavLink>
                <div className="switchMode" onClick={switchMode}>
                    <div className={`sun ${isLightMode ? "" : " dark"}`}><img src="src/assets/images/sun1.png"/></div>
                    <div className={`moon ${isLightMode ? "" : " dark"}`}><img src="src/assets/images/moon1.png"/></div>
                </div>
                <NavLink to='/login' className="login">Log in</NavLink>
            </div>
        )
}