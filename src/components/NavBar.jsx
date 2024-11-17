import {NavLink} from "react-router-dom";
import Logo from "./Logo.jsx";

// eslint-disable-next-line react/prop-types
export default function NavBar({switchMode, isLightMode}) {
    return (
        <div className='navBar'>
            <Logo/>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/booking'>Booking</NavLink>
            <NavLink to='/manage'>Manage</NavLink>
            <NavLink to='/explore'>Explore</NavLink>
            <NavLink to='/about'>About</NavLink>
            <div className="switchMode" onClick={switchMode}>
                <div className={`sun ${isLightMode ? "" : "dark"}`}><img src="src/assets/images/sun1.png"/></div>
                <div className={`moon ${isLightMode ? "" : "dark"}`}><img src="src/assets/images/moon1.png"/></div>
            </div>
            <NavLink to='/login' className="login">Log in</NavLink>
        </div>
    )
}