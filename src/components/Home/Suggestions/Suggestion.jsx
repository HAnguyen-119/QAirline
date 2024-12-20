import {NavLink} from "react-router-dom";
import ('./Suggestion.css')

// eslint-disable-next-line react/prop-types
export default function Suggestion({imageURL, location, price, isLightMode}) {
    return (
        <div>
            <div className={`suggestion${isLightMode ? "" : " dark"}`}>
                <div><img src={imageURL} alt="img"/></div>
                <p>{location}</p>
                <p>{price}</p>
                <NavLink to="/booking">Book now</NavLink>
            </div>
        </div>
    )
}