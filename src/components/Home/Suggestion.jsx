// eslint-disable-next-line react/prop-types
import {NavLink} from "react-router-dom";

export default function Suggestion({imageURL, location, price, isLightMode}) {
    return (
        <div className={`suggestion ${isLightMode ? "" : "dark"}`}>
            <div><img src={imageURL}/></div>
            <p>{location}</p>
            <p>{price}</p>
            <NavLink to="/booking">Book now</NavLink>
        </div>
    )
}