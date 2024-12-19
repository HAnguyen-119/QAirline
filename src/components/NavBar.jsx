import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

import "./NavBar.css";

import Sun from "../assets/images/sun1.png";
import Moon from "../assets/images/moon1.png";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
export default function NavBar({ isAdmin, switchMode, isLightMode }) {
  if (isAdmin) {
    return (
      <div className="navBar">
        <Logo />
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/flights">Flights</NavLink>
        <NavLink to="/admin/planes">Planes</NavLink>
        <NavLink to="/admin/airports">Airports</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/posts">Posts</NavLink>
        <div className="switchMode" onClick={switchMode}>
          <div className={`sun ${isLightMode ? "" : " dark"}`}>
            <img src="../src/assets/images/sun1.png" />
          </div>
          <div className={`moon ${isLightMode ? "" : " dark"}`}>
            <img src="../src/assets/images/moon1.png" />
          </div>
        </div>
        <div
          className="menu"
          onClick={() => {
            let navBarHeight = document.querySelector(".navBar").style.height;
            if (navBarHeight === "300px") {
              document.querySelector(".navBar").style.height = "60px";
            } else {
              document.querySelector(".navBar").style.height = "300px";
            }
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        {/* <NavLink to='/login' className="login" onClick={() => {
                    document.querySelector(".navBar").style.height = "60px"
                }}><FontAwesomeIcon icon={faUser}/></NavLink> */}
        <NavLink to="/admin/logout" className="logout">
          Logout
        </NavLink>
      </div>
    );
  } else
    return (
      <div className="navBar">
        <Logo />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/booking">Booking</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/about">About</NavLink>
        <div className="switchMode" onClick={switchMode}>
          <div className={`sun ${isLightMode ? "" : " dark"}`}>
            <img src="src/assets/images/sun1.png" />
          </div>
          <div className={`moon ${isLightMode ? "" : " dark"}`}>
            <img src="src/assets/images/moon1.png" />
          </div>
        </div>
        <div
          className="menu"
          onClick={() => {
            let navBarHeight = document.querySelector(".navBar").style.height;
            if (navBarHeight === "300px") {
              document.querySelector(".navBar").style.height = "60px";
            } else {
              document.querySelector(".navBar").style.height = "300px";
            }
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <NavLink
          to="/login"
          className="login"
          onClick={() => {
            document.querySelector(".navBar").style.height = "60px";
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </div>
    );
}

window.onresize = () => {
  if (window.innerWidth > 768) {
    document.querySelector(".navBar").style.height = "60px";
  }
};
