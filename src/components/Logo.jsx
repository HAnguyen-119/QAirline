import AppLogo from '../assets/images/logo.png'
import {NavLink} from "react-router-dom";

export default function Logo() {
    return (
        <NavLink to="/" className="logo">
            <img src={AppLogo} alt="logo"/>
            <p>AIRLINE</p>
        </NavLink>
    )
}